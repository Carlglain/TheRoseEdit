-- Supports webhook idempotency for checkout.session.completed (PROJECT_CONTEXT.md §6/§7).
--
-- The unique constraint on download_grants is the atomic gate: the webhook handler always
-- tries to INSERT grants for an order, and relies on a unique-violation (rather than a
-- check-then-insert race) to detect "this order was already fulfilled." That guarantees
-- exactly one concurrent/duplicate delivery of the same event wins.
--
-- email_sent_at is tracked separately from order status so that a retry after a failed Resend
-- send (grants already created, but the email never went out) can still complete the email
-- without re-creating grants or double-fulfilling.

alter table public.orders
  add column email_sent_at timestamptz;

alter table public.download_grants
  add constraint download_grants_order_product_unique unique (order_id, product_id);
