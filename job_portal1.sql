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
