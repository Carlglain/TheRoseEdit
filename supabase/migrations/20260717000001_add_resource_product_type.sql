-- Allow shop-only "resource" products (not ebook / course / vendor_list).
alter table public.products
  drop constraint if exists products_type_check;

alter table public.products
  add constraint products_type_check
  check (type in ('ebook', 'course', 'vendor_list', 'resource'));
