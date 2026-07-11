-- Core schema for RoseAudit (PROJECT_CONTEXT.md §8).
-- RLS is enabled on every table with no policies for anon/authenticated — the service-role
-- key (which bypasses RLS) is the only way in, used from server actions / route handlers.
-- See lib/supabase/server.ts.

create extension if not exists pgcrypto;

-- ─── products ──────────────────────────────────────────────────────────────
create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  type text not null check (type in ('ebook', 'course', 'vendor_list')),
  description text not null default '',
  price_minor integer not null check (price_minor >= 0),
  currency text not null default 'NOK',
  is_published boolean not null default true,
  is_coming_soon boolean not null default false,
  cover_image_url text,
  storage_path text,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

create index products_type_idx on public.products (type);
create index products_is_published_idx on public.products (is_published);

alter table public.products enable row level security;

-- ─── orders ────────────────────────────────────────────────────────────────
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  payment_provider text not null check (payment_provider in ('stripe', 'paypal')),
  provider_ref text,
  amount_minor integer not null check (amount_minor >= 0),
  currency text not null,
  created_at timestamptz not null default now(),
  -- Webhook idempotency (PROJECT_CONTEXT.md §10): look up by (provider, ref) before fulfilling.
  unique (payment_provider, provider_ref)
);

create index orders_email_idx on public.orders (email);

alter table public.orders enable row level security;

-- ─── order_items ───────────────────────────────────────────────────────────
create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  price_minor integer not null check (price_minor >= 0)
);

create index order_items_order_id_idx on public.order_items (order_id);
create index order_items_product_id_idx on public.order_items (product_id);

alter table public.order_items enable row level security;

-- ─── download_grants ───────────────────────────────────────────────────────
create table public.download_grants (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  token text not null unique,
  expires_at timestamptz not null,
  max_downloads integer not null default 5 check (max_downloads > 0),
  download_count integer not null default 0 check (download_count >= 0)
);

create index download_grants_order_id_idx on public.download_grants (order_id);

alter table public.download_grants enable row level security;

-- ─── leads ─────────────────────────────────────────────────────────────────
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text,
  created_at timestamptz not null default now()
);

create index leads_email_idx on public.leads (email);

alter table public.leads enable row level security;

-- ─── bookings ──────────────────────────────────────────────────────────────
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  scheduled_for timestamptz not null,
  order_id uuid references public.orders (id) on delete set null
);

create index bookings_order_id_idx on public.bookings (order_id);

alter table public.bookings enable row level security;
