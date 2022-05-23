CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  reviewer_name TEXT,
  content TEXT,
  rating INTEGER,
  snack_id INTEGER,
  FOREIGN KEY (snack_id) REFERENCES snacks(id) ON DELETE CASCADE
);