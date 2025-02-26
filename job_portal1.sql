-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2025 at 03:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- Made by Shabbir Ahmad
-- Dumping structure for table job_portal.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table job_portal.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `email`, `password`, `username`, `dob`, `created_at`, `updated_at`) VALUES
	(1, 'john@example.com', '$2b$10$YfxB1EwfZh.hSq3pU1lxI.ulQI9HRJz9GJ41uR3NCvQTBk8FNB82K', 'johndoe', '1990-01-15', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(2, 'jane@example.com', '$2b$10$YfxB1EwfZh.hSq3pU1lxI.ulQI9HRJz9GJ41uR3NCvQTBk8FNB82K', 'janedoe', '1992-03-20', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(3, 'user@123.com', '$2b$10$VYB6h8NfbaK7YCnw2VTKw.YnbSgR.3K0XbNdqQLAL.N95sl6gdmvi', 'user_123', '2025-02-22', '2025-02-21 20:10:41', '2025-02-21 20:10:41');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

--
-- Database: `job_portal1`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
-- Made by Haris Mahmood and Ahmed Qadoura
CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` enum('PENDING','REVIEWED','SHORTLISTED','REJECTED') DEFAULT 'PENDING',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `job_id`, `user_id`, `name`, `email`, `cover_letter`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'John Doe', 'john@example.com', 'I am very interested in this position...', 'PENDING', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
(2, 2, 2, 'Jane Doe', 'jane@example.com', 'I have extensive experience in backend development...', 'REVIEWED', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
(3, 2, 3, 'sss', 'sss@ss.com', 'ssss', 'PENDING', '2025-02-21 20:14:42', '2025-02-21 20:14:42'),
(4, 2, 3, 'sss', 'sss@ss.com', 'sssss', 'PENDING', '2025-02-21 20:21:27', '2025-02-21 20:21:27'),
(5, 1, 3, 'sss', 'sss@ss.com', 'sadadadadsa', 'PENDING', '2025-02-21 20:23:34', '2025-02-21 20:23:34');

-- Dumping structure for table job_portal.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `type` enum('FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP') NOT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `salary` varchar(50) DEFAULT NULL,
  `skills` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table job_portal.jobs: ~3 rows (approximately)
INSERT INTO `jobs` (`id`, `title`, `company`, `location`, `type`, `description`, `requirements`, `salary`, `skills`, `created_at`, `updated_at`) VALUES
	(1, 'Senior Frontend Developer', 'TechCorp', 'New York, NY', 'FULL_TIME', 'Looking for an experienced frontend developer to join our team.', 'Minimum 5 years experience with React\nStrong TypeScript skills\nExperience with state management', '120k - 150k', 'React, TypeScript, Redux, CSS', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(2, 'Backend Engineer', 'DataSys', 'Remote', 'FULL_TIME', 'Join our backend team to build scalable services.', 'Experience with Node.js\nKnowledge of SQL and NoSQL databases\nMicroservices architecture', '100k - 130k', 'Node.js, PostgreSQL, MongoDB, Docker', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(3, 'UI/UX Designer', 'CreativeStudio', 'San Francisco, CA', 'CONTRACT', 'Create beautiful and intuitive user interfaces for our products.', 'Portfolio showing web and mobile designs\nExperience with Figma\nUser research skills', '90k - 110k', 'Figma, Sketch, Adobe XD, Prototyping', '2025-02-21 20:01:21', '2025-02-21 20:01:21');

-- Dumping structure for table job_portal.saved_jobs
CREATE TABLE IF NOT EXISTS `saved_jobs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `job_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_user_job` (`user_id`,`job_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `saved_jobs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `saved_jobs_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table job_portal.saved_jobs: ~2 rows (approximately)
INSERT INTO `saved_jobs` (`id`, `user_id`, `job_id`, `created_at`) VALUES
	(1, 1, 2, '2025-02-21 20:01:21'),
	(2, 2, 1, '2025-02-21 20:01:21');

-- Dumping structure for table job_portal.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table job_portal.users: ~2 rows (approximately)
INSERT INTO `users` (`id`, `email`, `password`, `username`, `dob`, `created_at`, `updated_at`) VALUES
	(1, 'john@example.com', '$2b$10$YfxB1EwfZh.hSq3pU1lxI.ulQI9HRJz9GJ41uR3NCvQTBk8FNB82K', 'johndoe', '1990-01-15', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(2, 'jane@example.com', '$2b$10$YfxB1EwfZh.hSq3pU1lxI.ulQI9HRJz9GJ41uR3NCvQTBk8FNB82K', 'janedoe', '1992-03-20', '2025-02-21 20:01:21', '2025-02-21 20:01:21'),
	(3, 'user@123.com', '$2b$10$VYB6h8NfbaK7YCnw2VTKw.YnbSgR.3K0XbNdqQLAL.N95sl6gdmvi', 'user_123', '2025-02-22', '2025-02-21 20:10:41', '2025-02-21 20:10:41');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
