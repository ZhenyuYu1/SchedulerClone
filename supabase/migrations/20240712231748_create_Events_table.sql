create table
Events (
id uuid primary key default gen_random_uuid(),
title text,
descript text,
startTime text,
endTime text,
loc text,
timezone text,
mode text,
config json,
creator uuid references Users(id)
);