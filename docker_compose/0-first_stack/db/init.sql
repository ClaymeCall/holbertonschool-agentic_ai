-- Create the items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO items (content) VALUES ('Sample item 1');
INSERT INTO items (content) VALUES ('Sample item 2');
