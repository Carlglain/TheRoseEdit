-- Private bucket for product deliverables (e-books, course files). No public read access —
-- downloads are served via short-lived signed URLs generated server-side with the service-role
-- client (PROJECT_CONTEXT.md §6). No storage.objects policies are added, so anon/authenticated
-- get zero access by default; only the service role (which bypasses storage RLS) can read/write.

insert into storage.buckets (id, name, public)
values ('product-files', 'product-files', false)
on conflict (id) do nothing;
