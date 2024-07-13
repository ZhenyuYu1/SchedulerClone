create table
Attendees (
id uuid primary key default gen_random_uuid(),
eventID float,
attendee uuid references Users(id)
);