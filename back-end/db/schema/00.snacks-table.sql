CREATE TABLE snacks (
  id SERIAL PRIMARY KEY,
  name TEXT,
  image TEXT DEFAULT 'https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image',
  fiber INT DEFAULT 0,
  protein INT DEFAULT 0,
  added_sugar INT DEFAULT 0,
  is_healthy BOOLEAN
);