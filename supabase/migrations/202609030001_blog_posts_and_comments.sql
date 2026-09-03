create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
    id bigint generated always as identity primary key,
    slug text not null unique,
    media_type text not null,
    date_label text not null,
    published_at date not null,
    title text not null,
    preview_image text,
    preview_alt text,
    source_label text,
    source_url text,
    source_destination text,
    content_html text not null,
    is_published boolean not null default true,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint blog_posts_slug_format check (
        slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
    )
);

create table if not exists public.blog_comments (
    id uuid primary key default gen_random_uuid(),
    post_id bigint not null references public.blog_posts(id) on delete cascade,
    name varchar(80) not null,
    body varchar(2000) not null,
    is_visible boolean not null default true,
    created_at timestamptz not null default now(),
    constraint blog_comments_name_not_blank check (length(trim(name)) > 0),
    constraint blog_comments_body_not_blank check (length(trim(body)) > 0)
);

create index if not exists blog_posts_published_at_idx
    on public.blog_posts (published_at desc)
    where is_published = true;

create index if not exists blog_comments_post_created_at_idx
    on public.blog_comments (post_id, created_at desc)
    where is_visible = true;

alter table public.blog_posts enable row level security;
alter table public.blog_comments enable row level security;

revoke all on table public.blog_posts from anon, authenticated;
revoke all on table public.blog_comments from anon, authenticated;
revoke all on sequence public.blog_posts_id_seq from anon, authenticated;

comment on table public.blog_posts is
    'Published blog content. Images remain repository assets and are referenced by path.';

comment on table public.blog_comments is
    'Publicly submitted named comments. Visibility can be managed from the Supabase dashboard.';
