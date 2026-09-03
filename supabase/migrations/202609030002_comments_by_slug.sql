alter table public.blog_comments
    add column if not exists post_slug text;

update public.blog_comments as comments
set post_slug = posts.slug
from public.blog_posts as posts
where comments.post_id = posts.id
    and comments.post_slug is null;

alter table public.blog_comments
    alter column post_slug set not null;

alter table public.blog_comments
    alter column post_id drop not null;

create index if not exists blog_comments_slug_created_at_idx
    on public.blog_comments (post_slug, created_at desc)
    where is_visible = true;

comment on table public.blog_comments is
    'Publicly submitted named comments associated with repository blog posts by slug.';
