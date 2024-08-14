create table
users (
id uuid primary key default gen_random_uuid(),
name text
);