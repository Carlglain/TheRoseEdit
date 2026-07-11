-- Seed data for local development. Run automatically by `supabase db reset`.
-- Prices/currency taken from client intake (PROJECT_CONTEXT.md §5): written as USD ($27) —
-- NOK vs USD is still unconfirmed with the client, flagged in PROJECT_CONTEXT.md §3.
-- is_published=true + is_coming_soon=true means "listed with a Coming Soon badge", not hidden.

insert into public.products (slug, name, type, description, price_minor, currency, is_published, is_coming_soon)
values
  (
    'rebrand-to-resell',
    'How to Rebrand PLR Products',
    'ebook',
    'The Rebrand to Resell Master Guide: a step-by-step customization workflow, a plug-and-play rebranding checklist, and high-converting product description templates.',
    2700,
    'USD',
    true,
    false
  ),
  (
    'wealth-architecture-blueprint',
    'Wealth Architecture Blueprint',
    'course',
    'A structured course on building corporate-grade financial systems for personal and business income.',
    19700,
    'USD',
    true,
    true
  ),
  (
    'vendor-masterlist',
    'Vendor Masterlist',
    'vendor_list',
    'A curated, vetted list of vendors for sourcing and reselling.',
    4700,
    'USD',
    true,
    true
  )
on conflict (slug) do nothing;
