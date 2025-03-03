-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2025 at 08:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_portal`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` enum('PENDING','REVIEWED','SHORTLISTED','REJECTED') DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `job_id`, `user_id`, `name`, `email`, `cover_letter`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'John Doe', 'john@example.com', 'Interested in this position', 'PENDING', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(2, 2, 2, 'Jane Doe', 'jane@example.com', 'Backend development experience', 'REVIEWED', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(3, 2, 3, 'sss', 'sss@ss.com', 'ssss', 'PENDING', '2025-02-26 19:02:34', '2025-02-26 19:02:34');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `type` enum('FULL_TIME','PART_TIME','CONTRACT','INTERNSHIP') NOT NULL,
  `description` text NOT NULL,
  `requirements` text NOT NULL,
  `salary` varchar(50) DEFAULT NULL,
  `skills` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `jobs`
--

INSERT INTO `jobs` (`id`, `title`, `company`, `location`, `type`, `description`, `requirements`, `salary`, `skills`, `created_at`, `updated_at`) VALUES
(1, 'Senior Frontend Developer', 'TechCorp', 'New York, NY', 'FULL_TIME', 'Frontend developer role', '5 years React experience', '120k - 150k', 'React, TypeScript, Redux', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(2, 'Backend Engineer', 'DataSys', 'Remote', 'FULL_TIME', 'Backend developer role', 'Node.js, SQL experience', '100k - 130k', 'Node.js, PostgreSQL, Docker', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(3, 'UI/UX Designer', 'CreativeStudio', 'San Francisco, CA', 'CONTRACT', 'UI/UX role', 'Portfolio required', '90k - 110k', 'Figma, Sketch, Adobe XD', '2025-02-26 19:02:34', '2025-02-26 19:02:34');

-- --------------------------------------------------------

--
-- Table structure for table `saved_jobs`
--

CREATE TABLE `saved_jobs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_jobs`
--

INSERT INTO `saved_jobs` (`id`, `user_id`, `job_id`, `created_at`) VALUES
(1, 1, 2, '2025-02-26 19:02:35'),
(2, 2, 1, '2025-02-26 19:02:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `username`, `dob`, `created_at`, `updated_at`) VALUES
(1, 'john@example.com', 'hashed_password1', 'johndoe', '1990-01-15', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(2, 'jane@example.com', 'hashed_password2', 'janedoe', '1992-03-20', '2025-02-26 19:02:34', '2025-02-26 19:02:34'),
(3, 'user@123.com', 'hashed_password3', 'user_123', '2025-02-22', '2025-02-26 19:02:34', '2025-02-26 19:02:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_user_job` (`user_id`,`job_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `saved_jobs`
--
ALTER TABLE `saved_jobs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
