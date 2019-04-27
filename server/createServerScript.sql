- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2019 at 10:27 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gradebook`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `C_ID` int(11) NOT NULL,
  `CNAME` varchar(30) NOT NULL,
  `ASSIGNMENTS` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`C_ID`, `CNAME`, `ASSIGNMENTS`) VALUES
(1, 'Database Systems', 'Project 1'),
(1, 'Database Systems', 'Project 2'),
(1, 'Database Systems', 'Project 3'),
(2, 'DAMT', 'Assignment 1'),
(2, 'DAMT', 'Assignment 2'),
(2, 'DAMT', 'Assignment 3'),
(3, 'WDM', 'Project 1'),
(3, 'WDM', 'Project 2'),
(3, 'WDM', 'Project 3');

-- --------------------------------------------------------

--
-- Table structure for table `grades`
--

CREATE TABLE `grades` (
  `S_ID` int(11) NOT NULL,
  `C_ID` int(11) NOT NULL,
  `ASSIGNMENTS` varchar(20) NOT NULL,
  `GRADE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `grades`
--

INSERT INTO `grades` (`S_ID`, `C_ID`, `ASSIGNMENTS`, `GRADE`) VALUES
(1001, 1, 'Project 1', 80),
(1001, 1, 'Project 2', 90),
(1001, 1, 'Project 3', 78),
(1002, 1, 'Project 1', 88),
(1002, 1, 'Project 2', 60),
(1002, 1, 'Project 3', 81),
(1003, 1, 'Project 1', 98),
(1003, 1, 'Project 2', 71),
(1003, 1, 'Project 3', 84),
(1004, 1, 'Project 1', 88),
(1004, 1, 'Project 2', 74),
(1004, 1, 'Project 3', 66),
(1005, 1, 'Project 1', 68),
(1005, 1, 'Project 2', 50),
(1005, 1, 'Project 3', 95),
(1002, 2, 'Assignment 1', 87),
(1002, 2, 'Assignment 2', 65),
(1002, 2, 'Assignment 3', 84),
(1007, 2, 'Assignment 1', 97),
(1007, 2, 'Assignment 2', 69),
(1007, 2, 'Assignment 3', 74),
(1004, 2, 'Assignment 1', 83),
(1004, 2, 'Assignment 2', 69),
(1004, 2, 'Assignment 3', 94),
(1003, 3, 'Project 1', 57),
(1003, 3, 'Project 2', 75),
(1003, 3, 'Project 3', 77),
(1006, 3, 'Project 1', 97),
(1006, 3, 'Project 2', 85),
(1006, 3, 'Project 3', 78),
(1008, 3, 'Project 1', 47),
(1008, 3, 'Project 2', 95),
(1008, 3, 'Project 3', 97),
(1010, 3, 'Project 1', 67),
(1010, 3, 'Project 2', 65),
(1010, 3, 'Project 3', 87),
(1003, 2, 'Assignment 1', 47),
(1003, 2, 'Assignment 2', 85),
(1003, 2, 'Assignment 3', 97),
(1001, 2, 'Assignment 1', 67),
(1001, 2, 'Assignment 2', 89),
(1001, 2, 'Assignment 3', 87);

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `P_ID` int(11) NOT NULL,
  `PFNAME` varchar(20) NOT NULL,
  `PLNAME` varchar(20) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL,
  `C_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`P_ID`, `PFNAME`, `PLNAME`, `EMAIL`, `PASSWORD`, `C_ID`) VALUES
(2001, 'Ranjan', 'Dash', 'ranjandash@gmail.com', 'ranjandash', 1),
(2002, 'Jean', 'Gao', 'jeangao@gmail.com', 'jeangao', 2),
(2003, 'Elizabeth', 'Diaz', 'elizabethdiaz@gmail.com', 'elizabethdiaz', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `S_ID` int(11) NOT NULL,
  `FNAME` varchar(20) NOT NULL,
  `LNAME` varchar(20) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`S_ID`, `FNAME`, `LNAME`, `EMAIL`, `PASSWORD`) VALUES
(1001, 'David', 'Brown', 'davidbrown@gmail.com', 'davidbrown'),
(1002, 'Ria', 'Ghosh', 'riaghosh@gmail.com', 'riaghosh'),
(1003, 'Mark', 'White', 'markwhite@gmail.com', 'markwhite'),
(1004, 'Akshay', 'Pol', 'akshaypol@gmail.com', 'akshaypol'),
(1005, 'Jeet', 'Patel', 'jeetpatel@gmail.com', 'jeetpatel'),
(1006, 'Devaki', 'Kamat', 'devakikamat@gmail.com', 'devakikamat'),
(1007, 'Jatin', 'Pai', 'jatinpai@gmail.com', 'jatinpai'),
(1008, 'Elsy', 'Macwan', 'elsymacwan@gmail.com', 'elsymacwan'),
(1009, 'Ashwin', 'Shah', 'ashwinshah@gmail.com', 'ashwinshah'),
(1010, 'Emma', 'Watson', 'emmawatson@gmail.com', 'emmawatson');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`C_ID`,`ASSIGNMENTS`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`P_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`S_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
