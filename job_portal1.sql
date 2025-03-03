CREATE DATABASE IF NOT EXISTS job_portal;
USE job_portal;

-- Users Table
-- Made by Shabbir and Haris
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  username VARCHAR(100) NOT NULL,
  dob DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Jobs Table
-- Made by AhmedQ and Zeshan
CREATE TABLE IF NOT EXISTS jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  type ENUM('FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP') NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  salary VARCHAR(50),
  skills TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Applications Table
--Made by Haris And Shamas
CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  job_id INT NOT NULL,
  user_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  cover_letter TEXT,
  status ENUM('PENDING','REVIEWED','SHORTLISTED','REJECTED') DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Saved Jobs Table
--Made by Adam and AhmedA
CREATE TABLE IF NOT EXISTS saved_jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  job_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_job (user_id, job_id)
);

-- Sample Data
INSERT INTO users (id, email, password, username, dob) VALUES
  (1, 'john@example.com', 'hashed_password1', 'johndoe', '1990-01-15'),
  (2, 'jane@example.com', 'hashed_password2', 'janedoe', '1992-03-20'),
  (3, 'user@123.com', 'hashed_password3', 'user_123', '2025-02-22');

INSERT INTO jobs (id, title, company, location, type, description, requirements, salary, skills) VALUES
  (1, 'Senior Frontend Developer', 'TechCorp', 'New York, NY', 'FULL_TIME', 'Frontend developer role', '5 years React experience', '120k - 150k', 'React, TypeScript, Redux'),
  (2, 'Backend Engineer', 'DataSys', 'Remote', 'FULL_TIME', 'Backend developer role', 'Node.js, SQL experience', '100k - 130k', 'Node.js, PostgreSQL, Docker'),
  (3, 'UI/UX Designer', 'CreativeStudio', 'San Francisco, CA', 'CONTRACT', 'UI/UX role', 'Portfolio required', '90k - 110k', 'Figma, Sketch, Adobe XD');

INSERT INTO applications (id, job_id, user_id, name, email, cover_letter, status) VALUES
  (1, 1, 1, 'John Doe', 'john@example.com', 'Interested in this position', 'PENDING'),
  (2, 2, 2, 'Jane Doe', 'jane@example.com', 'Backend development experience', 'REVIEWED'),
  (3, 2, 3, 'sss', 'sss@ss.com', 'ssss', 'PENDING');

INSERT INTO saved_jobs (id, user_id, job_id) VALUES
  (1, 1, 2),
  (2, 2, 1);

