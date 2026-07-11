import { NextResponse } from "next/server";
import { getGrantByToken, incrementGrantDownloadCount } from "@/lib/downloadGrants";
import { createServiceRoleClient } from "@/lib/supabase/server";

const SIGNED_URL_TTL_SECONDS = 60;

export async function GET(request: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invalidUrl = new URL("/download/invalid", request.url);

  // A paying customer clicking a download link should never see a raw error page — any
  // failure (bad token, expired, Supabase unreachable, storage error) lands on the same
  // on-brand "link expired, contact support" page instead of a 500.
  try {
    const grant = await getGrantByToken(token);
    if (!grant) {
      return NextResponse.redirect(invalidUrl);
    }

    const isExpired = new Date(grant.expiresAt).getTime() < Date.now();
    const isExhausted = grant.downloadCount >= grant.maxDownloads;
    if (isExpired || isExhausted) {
      return NextResponse.redirect(invalidUrl);
    }

    const supabase = createServiceRoleClient();
    const { data: product, error: productError } = await supabase
      .from("products")
      .select("storage_path")
      .eq("id", grant.productId)
      .maybeSingle();

    if (productError || !product?.storage_path) {
      console.error(`Download route: missing storage_path for product ${grant.productId}`, productError);
      return NextResponse.redirect(invalidUrl);
    }

    const { data: signed, error: signError } = await supabase.storage
      .from("product-files")
      .createSignedUrl(product.storage_path, SIGNED_URL_TTL_SECONDS);

    if (signError || !signed?.signedUrl) {
      console.error(`Download route: failed to sign URL for ${product.storage_path}`, signError);
      return NextResponse.redirect(invalidUrl);
    }

    // Increment after successfully signing, not before — a signing failure shouldn't burn one
    // of the customer's 5 download attempts.
    await incrementGrantDownloadCount(grant);

    return NextResponse.redirect(signed.signedUrl);
  } catch (err) {
    console.error(`Download route: unexpected error for token ${token}`, err);
    return NextResponse.redirect(invalidUrl);
  }
}
