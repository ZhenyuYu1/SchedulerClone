create table
Events (
id uuid primary key default gen_random_uuid(),
title text,
description text,
startTime text,
endTime text,
location text,
timezone text,
mode text,
config json,
creator uuid references Users(id)
);