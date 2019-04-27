-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2019 at 11:23 PM
-- Generation Time: Apr 27, 2019 at 05:41 PM
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
  `ASSIGNMENTS` varchar(20) NOT NULL,
  `dateAssigned` date NOT NULL,
  `dueDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `course`
--
INSERT INTO `course` (`C_ID`, `CNAME`, `ASSIGNMENTS`, `dateAssigned`, `dueDate`) VALUES
(1, 'Database Systems', 'Project 1', '2019-01-15', '2019-01-25'),
(1, 'Database Systems', 'Project 2', '2019-01-22', '2019-02-02'),
(1, 'Database Systems', 'Project 3', '2019-01-29', '2019-02-09'),
(2, 'DAMT', 'Assignment 1', '2019-01-16', '2019-01-26'),
(2, 'DAMT', 'Assignment 2', '2019-01-23', '2019-02-03'),
(2, 'DAMT', 'Assignment 3', '2019-01-30', '2019-02-10'),
(3, 'WDM', 'Project 1', '2019-01-17', '2019-01-27'),
(3, 'WDM', 'Project 2', '2019-01-24', '2019-02-04'),
(3, 'WDM', 'Project 3', '2019-01-31', '2019-02-11');
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
(1001, 2, 'Assignment 1', 67),
(1001, 2, 'Assignment 2', 89),
(1001, 2, 'Assignment 3', 87),
(1002, 1, 'Project 1', 88),
(1002, 1, 'Project 2', 60),
(1002, 1, 'Project 3', 81),
(1002, 2, 'Assignment 1', 87),
(1002, 2, 'Assignment 2', 65),
(1002, 2, 'Assignment 3', 84),
(1003, 1, 'Project 1', 98),
(1003, 1, 'Project 2', 71),
(1003, 1, 'Project 3', 84),
(1003, 2, 'Assignment 1', 47),
(1003, 2, 'Assignment 2', 85),
(1003, 2, 'Assignment 3', 97),
(1003, 3, 'Project 1', 57),
(1003, 3, 'Project 2', 75),
(1003, 3, 'Project 3', 77),
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
(1005, 1, 'Project 1', 68),
(1005, 1, 'Project 2', 50),
(1005, 1, 'Project 3', 95),
(1006, 3, 'Project 1', 97),
(1006, 3, 'Project 2', 85),
(1006, 3, 'Project 3', 78),
(1007, 2, 'Assignment 1', 97),
(1007, 2, 'Assignment 2', 69),
(1007, 2, 'Assignment 3', 74),
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
(1010, 3, 'Project 3', 87);

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--
CREATE TABLE `professor` (
  `P_ID` int(11) NOT NULL,
  `PFNAME` varchar(20) NOT NULL,
  `PLNAME` varchar(20) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(32) NOT NULL,
  `C_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`P_ID`, `PFNAME`, `PLNAME`, `EMAIL`, `PASSWORD`, `C_ID`) VALUES
(2001, 'Ranjan', 'Dash', 'ranjandash@gmail.com', 'c032a45edc466ce376db91724d3abc63', 1),
(2002, 'Jean', 'Gao', 'jeangao@gmail.com', '7c6f5868ba52d9f5cd0bdef8dca062b1', 2),
(2003, 'Elizabeth', 'Diaz', 'elizabethdiaz@gmail.com', 'cf53e452b1847e9b7388ba631611101c', 3);
(2001, 'Ranjan', 'Dash', 'ranjandash@gmail.com', '362e212806801acc300f16e06bdd7448', 1),
(2002, 'Jean', 'Gao', 'jeangao@gmail.com', 'c462106350f1fcc0b77fbfca4445cfb5', 2),
(2003, 'Elizabeth', 'Diaz', 'elizabethdiaz@gmail.com', '8372cccd8e722f1a6c401e380252b51c', 3);

-- --------------------------------------------------------

--
-- Table structure for table `student`
--
CREATE TABLE `student` (
  `S_ID` int(11) NOT NULL,
  `FNAME` varchar(20) NOT NULL,
  `LNAME` varchar(20) NOT NULL,
  `EMAIL` varchar(30) NOT NULL,
  `PASSWORD` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--
-- Dumping data for table `student`
--

INSERT INTO `student` (`S_ID`, `FNAME`, `LNAME`, `EMAIL`, `PASSWORD`) VALUES
(1001, 'David', 'Brown', 'davidbrown@gmail.com', '2148fd26e4dac7909098215ff9a47cd3'),
(1002, 'Ria', 'Ghosh', 'riaghosh@gmail.com', 'bb7de2bc753159da5872c378a02a8f19'),
(1003, 'Mark', 'White', 'markwhite@gmail.com', '2d66a7e3987dd0fd93b3507e619b7082'),
(1004, 'Akshay', 'Pol', 'akshaypol@gmail.com', '610e3eab435cc7c4aff802b296110181'),
(1005, 'Jeet', 'Patel', 'jeetpatel@gmail.com', '6797877a4a428dfa20e24a8c1da0b1fb'),
(1006, 'Devaki', 'Kamat', 'devakikamat@gmail.com', 'e26c49d46b76004aac45f5ae739597ce'),
(1007, 'Jatin', 'Pai', 'jatinpai@gmail.com', '02c6348dc0b003e5102bb396b1f02f2e'),
(1008, 'Elsy', 'Macwan', 'elsymacwan@gmail.com', 'a12fdfcba79574fc38f33b87182ea3ac'),
(1009, 'Ashwin', 'Shah', 'ashwinshah@gmail.com', '8949a16b1865be542fc11b4a412b4c8c'),
(1010, 'Emma', 'Watson', 'emmawatson@gmail.com', '78973eb0ed4ed8aa7ba5b167b6828c46');
(1001, 'David', 'Brown', 'davidbrown@gmail.com', 'fe34ae5b5005b9661f2685fd36e68a0f'),
(1002, 'Ria', 'Ghosh', 'riaghosh@gmail.com', 'e4afcab9cb5cd68fba4e9ee48e3034db'),
(1003, 'Mark', 'White', 'markwhite@gmail.com', '85a3b4d198cc8404e76302c0b7647b09'),
(1004, 'Akshay', 'Pol', 'akshaypol@gmail.com', '66b228ffad43fdc61a1612a6a1d530ca'),
(1005, 'Jeet', 'Patel', 'jeetpatel@gmail.com', '374dfb0684ed4a8417cadfa84989f09c'),
(1006, 'Devaki', 'Kamat', 'devakikamat@gmail.com', '30457cc53536122808b7e3d02a429d5a'),
(1007, 'Jatin', 'Pai', 'jatinpai@gmail.com', '8a80a49ed2a31e7ce501fb8d1248a0f5'),
(1008, 'Elsy', 'Macwan', 'elsymacwan@gmail.com', 'e7d559190c16f7d7add9cb49a204f8eb'),
(1009, 'Ashwin', 'Shah', 'ashwinshah@gmail.com', '276786d8fea17c472aa850bc383aefe1'),
(1010, 'Emma', 'Watson', 'emmawatson@gmail.com', 'b60870bf57665f454c2f7185ae1e9541');

--
-- Indexes for dumped tables
--
--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`C_ID`,`ASSIGNMENTS`);

--
-- Indexes for table `grades`
--
ALTER TABLE `grades`
  ADD PRIMARY KEY (`S_ID`,`C_ID`,`ASSIGNMENTS`),
  ADD KEY `FK1` (`C_ID`);

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

--
-- Constraints for dumped tables
--

--
-- Constraints for table `grades`
--
ALTER TABLE `grades`
  ADD CONSTRAINT `FK1` FOREIGN KEY (`C_ID`) REFERENCES `course` (`C_ID`),
  ADD CONSTRAINT `FK3` FOREIGN KEY (`S_ID`) REFERENCES `student` (`S_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
