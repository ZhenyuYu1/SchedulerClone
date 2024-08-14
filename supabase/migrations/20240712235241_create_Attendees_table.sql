create table
attendees (
id uuid primary key default gen_random_uuid(),
eventID float,
attendee uuid references Users(id)
);