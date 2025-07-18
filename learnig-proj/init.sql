-- Create the texts table
CREATE TABLE IF NOT EXISTS texts (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);