import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/Button";
import { CartLineItem } from "@/components/cart/CartLineItem";
import { PaymentSection } from "@/components/cart/PaymentSection";
import { CART_COOKIE_NAME, parseCartCookie } from "@/lib/cart";
import { getProductsByIds } from "@/lib/products";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function CartPage() {
  const cookieStore = await cookies();
  const cartIds = parseCartCookie(cookieStore.get(CART_COOKIE_NAME)?.value);
  const products = cartIds.length > 0 ? await getProductsByIds(cartIds).catch(() => []) : [];

  // .in() doesn't guarantee row order — re-sort to match the order items were added in.
  const items = cartIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (items.length === 0) {
    return (
      <main>
        <Section>
          <Container>
            <div className="mx-auto max-w-md text-center">
              <Heading level={1}>Your Cart</Heading>
              <p className="mt-4 text-muted">Your cart is empty.</p>
              <div className="mt-8">
                <Button href="/shop">Continue Shopping</Button>
              </div>
            </div>
          </Container>
        </Section>
      </main>
    );
  }

  const subtotalMinor = items.reduce((sum, p) => sum + p.priceMinor, 0);
  const currency = items[0].currency;

  return (
    <main>
      <Section>
        <Container>
          <Heading level={1} className="mb-10">
            Your Cart
          </Heading>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4 lg:col-span-2">
              {items.map((product) => (
                <CartLineItem key={product.id} product={product} />
              ))}
            </div>

            <div className="h-fit rounded-brand border border-line bg-white p-6 lg:sticky lg:top-24">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted">Subtotal</span>
                <span className="font-medium text-ink">
                  {formatPrice(subtotalMinor, currency)}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted">Taxes calculated at checkout.</p>

              <div className="mt-6 border-t border-line pt-6">
                <PaymentSection />
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
