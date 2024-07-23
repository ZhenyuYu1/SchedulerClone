insert into Users
  (id, name)
values
  ('00569fb6-acee-4edc-93c0-09ac8b814daf', 'Sutton Gibson'),
  ('fb511b72-8d6d-450c-be69-dd5e82dfda5b', 'Tyler Williams'),
  ('9e33186f-95db-4385-a974-ee38c8e07547', 'Bryson Glenn');

insert into Events
  (title, description, startTime, endTime, location, timezone, mode, config, creator)
values
  (
  'Bowling', 
  'Bowling event', 
  '2024-07-12T23:11:25.000Z', 
  '2024-07-12T23:11:25.000Z', 
  'Bowling alley', 
  'PST', 
  'weekly', 
  ('{
    "Mon": true,
    "Tue": true,
    "Wed": false,
    "Thu": false,
    "Fri": false,
    "Sat": false,
    "Sun": false
  }'), 
  '00569fb6-acee-4edc-93c0-09ac8b814daf'),
  ('Reading Club', 
  'Reading club meeting', 
  '2024-07-12T23:11:25.000Z', 
  '2024-07-12T23:11:25.000Z', 
  'Library', 
  'UTC', 
  'specific', 
  ('{"days": ["2024-01-01"]}'), 
  '9e33186f-95db-4385-a974-ee38c8e07547'
  ),
  ('Track Meet', 
  'Track', 
  '2024-07-12T23:11:25.000Z', 
  '2024-07-12T23:11:25.000Z', 
  'Track field', 
  'EST', 
  'weekly', 
  ('{
  "Mon": true,
  "Tue": true,
  "Wed": false,
  "Thu": false,
  "Fri": false,
  "Sat": false,
  "Sun": false
  }'), 
  '9e33186f-95db-4385-a974-ee38c8e07547'
  );

insert into Attendees
  (eventID, attendee)
values
  (1, '9e33186f-95db-4385-a974-ee38c8e07547'),
  (2, '9e33186f-95db-4385-a974-ee38c8e07547'),
  (3, '9e33186f-95db-4385-a974-ee38c8e07547');