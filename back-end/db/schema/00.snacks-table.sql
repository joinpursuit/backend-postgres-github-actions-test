CREATE TABLE snacks (
  id SERIAL PRIMARY KEY,
  name TEXT,
  image TEXT,
  fiber INT,
  protein INT,
  added_sugar INT,
  is_healthy BOOLEAN
);