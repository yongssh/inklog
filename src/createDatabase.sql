CREATE DATABASE submissionDB;
USE submissionDB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);


CREATE TABLE submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  journal_name VARCHAR(255),
  submission_date DATE,
  pieces TEXT,  -- Comma-separated pieces
  response_date DATE,
  response_decision ENUM('Accepted', 'Rejected', 'Pending'),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
