insert into Users
  (name)
values
  ('Sutton Gibson'),
  ('Tyler Williams'),
  ('Bryson Glenn');

insert into Events
  (title, descript, startTime, endTime, loc, timezone, mode, config)
values
  ('Bowling', 'Bowling event', '2024-07-12T23:11:25.000Z', '2024-07-12T23:11:25.000Z', 'Bowling alley', 'PST', 'weekly', ('{"monday": "true"}')),
  ('Reading Club', 'Reading club meeting', '2024-07-12T23:11:25.000Z', '2024-07-12T23:11:25.000Z', 'Library', 'UTC', 'specific', ('{"days": ["July 8, 2024", "July 10, 2024"]}')),
  ('Track Meet', 'Track', '2024-07-12T23:11:25.000Z', '2024-07-12T23:11:25.000Z', 'Track field', 'EST', 'weekly', ('{"monday": "true"}'));

insert into Attendees
  (eventID)
values
  (1),
  (2),
  (3);