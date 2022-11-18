-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 17, 2022 at 05:24 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `factorydb`
--

-- --------------------------------------------------------

--
-- Table structure for table `articleComments`
--

CREATE TABLE `articleComments` (
  `id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `task` int(11) NOT NULL,
  `writtenOn` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` varchar(50) NOT NULL,
  `topic` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `category`, `topic`) VALUES
(7, 'Grammar', 1),
(8, 'Vocabulary', 1),
(9, 'Relevant', 2),
(10, 'Correctness', 2),
(11, 'On topic', 5),
(12, 'Category', 5),
(13, 'Orthography', 1),
(15, 'Details', 2),
(16, 'TestCat2', 5);

-- --------------------------------------------------------

--
-- Table structure for table `classesEnrolled`
--

CREATE TABLE `classesEnrolled` (
  `classId` int(11) NOT NULL,
  `username` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classesEnrolled`
--

INSERT INTO `classesEnrolled` (`classId`, `username`) VALUES
(8, 'student1'),
(8, 'student2');

-- --------------------------------------------------------

--
-- Table structure for table `classroomcodes`
--

CREATE TABLE `classroomcodes` (
  `classId` int(11) NOT NULL,
  `studentJoinCode` varchar(5) NOT NULL,
  `studentFullName` varchar(50) NOT NULL,
  `parentEmail` varchar(100) DEFAULT NULL,
  `codeUsed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classroomcodes`
--

INSERT INTO `classroomcodes` (`classId`, `studentJoinCode`, `studentFullName`, `parentEmail`, `codeUsed`) VALUES
(1, '12145', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '14663', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '19462', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '20074', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '21756', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '29137', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '32729', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '63662', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '67739', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '70320', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '75093', 'Student One', 'luciana.kolbeck@ik.me', 0),
(1, '81399', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '90335', 'Student Two', 'luciana.kolbeck@ik.me', 0),
(1, '93653', 'Student One', 'luciana.kolbeck@ik.me', 0);

-- --------------------------------------------------------

--
-- Table structure for table `classrooms`
--

CREATE TABLE `classrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `teacherUsername` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classrooms`
--

INSERT INTO `classrooms` (`id`, `name`, `teacherUsername`) VALUES
(1, 'Class 1', 'testTeacher10'),
(4, 'Class 2', 'testTeacher10'),
(6, 'Class 3', 'testTeacher10'),
(8, 'Class 4', 'testTeacher10');

-- --------------------------------------------------------

--
-- Table structure for table `gradings`
--

CREATE TABLE `gradings` (
  `id` int(11) NOT NULL,
  `task` int(11) NOT NULL,
  `category` int(11) NOT NULL,
  `grade` smallint(6) NOT NULL,
  `comment` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stickers`
--

CREATE TABLE `stickers` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `path` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stickersOnTasks`
--

CREATE TABLE `stickersOnTasks` (
  `taskId` int(11) NOT NULL,
  `stickerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `username` varchar(50) NOT NULL,
  `fullName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`username`, `fullName`) VALUES
('student1', 'Student One'),
('student2', 'Student Two');

-- --------------------------------------------------------

--
-- Table structure for table `taskCategories`
--

CREATE TABLE `taskCategories` (
  `taskId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskCategories`
--

INSERT INTO `taskCategories` (`taskId`, `categoryId`) VALUES
(7, 7),
(7, 8),
(7, 9),
(8, 7),
(8, 8),
(8, 9);

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `type` int(11) NOT NULL,
  `assignedToStudent` varchar(50) DEFAULT NULL,
  `assignedByTeacher` varchar(50) NOT NULL,
  `startdate` date NOT NULL,
  `duedate` date DEFAULT NULL,
  `donedate` date DEFAULT NULL,
  `gradeddate` date DEFAULT NULL,
  `status` int(11) NOT NULL,
  `concernsArticle` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `type`, `assignedToStudent`, `assignedByTeacher`, `startdate`, `duedate`, `donedate`, `gradeddate`, `status`, `concernsArticle`) VALUES
(7, 'Your favourite artist', 'Write a new article about your favourite artist', 1, 'student1', 'testTeacher10', '2022-11-12', '2022-11-21', NULL, NULL, 1, 'No article selected'),
(8, 'Your favourite artist', 'Write a new article about your favourite artist', 1, 'student2', 'testTeacher10', '2022-11-12', '2022-11-21', NULL, NULL, 1, 'No article selected');

-- --------------------------------------------------------

--
-- Table structure for table `taskStatus`
--

CREATE TABLE `taskStatus` (
  `id` int(11) NOT NULL,
  `taskStatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskStatus`
--

INSERT INTO `taskStatus` (`id`, `taskStatus`) VALUES
(2, 'Assigned'),
(1, 'Created'),
(5, 'Done'),
(7, 'Finished'),
(6, 'Grading'),
(3, 'In Progress'),
(4, 'Needs Help');

-- --------------------------------------------------------

--
-- Table structure for table `taskType`
--

CREATE TABLE `taskType` (
  `id` int(11) NOT NULL,
  `taskType` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskType`
--

INSERT INTO `taskType` (`id`, `taskType`) VALUES
(1, 'Write an article about...');

-- --------------------------------------------------------

--
-- Table structure for table `teacherAuth`
--

CREATE TABLE `teacherAuth` (
  `username` varchar(50) NOT NULL,
  `authCode` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherAuth`
--

INSERT INTO `teacherAuth` (`username`, `authCode`) VALUES
('testTeacher10', '68788');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `fullName` varchar(100) DEFAULT NULL,
  `isVerified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`username`, `email`, `fullName`, `isVerified`) VALUES
('testTeacher10', 'luciana.kolbeck@ik.me', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `shortname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `name`, `shortname`) VALUES
(1, 'Language', 'Language'),
(2, 'Media Literacy', 'Media'),
(5, 'Subject understanding', 'Subject');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articleComments`
--
ALTER TABLE `articleComments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task` (`task`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `category` (`category`),
  ADD KEY `topic` (`topic`);

--
-- Indexes for table `classesEnrolled`
--
ALTER TABLE `classesEnrolled`
  ADD UNIQUE KEY `index` (`classId`,`username`),
  ADD KEY `students` (`username`);

--
-- Indexes for table `classroomcodes`
--
ALTER TABLE `classroomcodes`
  ADD UNIQUE KEY `studentJoinCode` (`studentJoinCode`),
  ADD KEY `classId` (`classId`);

--
-- Indexes for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `teacherUsername` (`teacherUsername`);

--
-- Indexes for table `gradings`
--
ALTER TABLE `gradings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task` (`task`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `stickers`
--
ALTER TABLE `stickers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stickersOnTasks`
--
ALTER TABLE `stickersOnTasks`
  ADD KEY `taskId` (`taskId`),
  ADD KEY `stickerId` (`stickerId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `taskCategories`
--
ALTER TABLE `taskCategories`
  ADD KEY `taskId` (`taskId`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `type` (`type`),
  ADD KEY `assignedToStudent` (`assignedToStudent`),
  ADD KEY `assignedByTeacher` (`assignedByTeacher`);

--
-- Indexes for table `taskStatus`
--
ALTER TABLE `taskStatus`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskStatus` (`taskStatus`);

--
-- Indexes for table `taskType`
--
ALTER TABLE `taskType`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `taskType` (`taskType`);

--
-- Indexes for table `teacherAuth`
--
ALTER TABLE `teacherAuth`
  ADD UNIQUE KEY `authCode` (`authCode`),
  ADD KEY `username` (`username`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articleComments`
--
ALTER TABLE `articleComments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `classrooms`
--
ALTER TABLE `classrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `gradings`
--
ALTER TABLE `gradings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stickers`
--
ALTER TABLE `stickers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `taskStatus`
--
ALTER TABLE `taskStatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `taskType`
--
ALTER TABLE `taskType`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articleComments`
--
ALTER TABLE `articleComments`
  ADD CONSTRAINT `articleComments_ibfk_1` FOREIGN KEY (`task`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`topic`) REFERENCES `topics` (`id`);

--
-- Constraints for table `classesEnrolled`
--
ALTER TABLE `classesEnrolled`
  ADD CONSTRAINT `classes` FOREIGN KEY (`classId`) REFERENCES `classrooms` (`id`),
  ADD CONSTRAINT `students` FOREIGN KEY (`username`) REFERENCES `students` (`username`);

--
-- Constraints for table `classrooms`
--
ALTER TABLE `classrooms`
  ADD CONSTRAINT `teacher` FOREIGN KEY (`teacherUsername`) REFERENCES `teachers` (`username`);

--
-- Constraints for table `gradings`
--
ALTER TABLE `gradings`
  ADD CONSTRAINT `gradings_ibfk_1` FOREIGN KEY (`task`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `gradings_ibfk_2` FOREIGN KEY (`category`) REFERENCES `categories` (`id`);

--
-- Constraints for table `stickers`
--
ALTER TABLE `stickers`
  ADD CONSTRAINT `stickers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `stickersOnTasks` (`stickerId`);

--
-- Constraints for table `stickersOnTasks`
--
ALTER TABLE `stickersOnTasks`
  ADD CONSTRAINT `stickersOnTasks_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`);

--
-- Constraints for table `taskCategories`
--
ALTER TABLE `taskCategories`
  ADD CONSTRAINT `taskCategories_ibfk_1` FOREIGN KEY (`taskId`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `taskCategories_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assignedByTeacher`) REFERENCES `teachers` (`username`),
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`assignedToStudent`) REFERENCES `students` (`username`),
  ADD CONSTRAINT `tasks_ibfk_4` FOREIGN KEY (`type`) REFERENCES `taskType` (`id`),
  ADD CONSTRAINT `tasks_ibfk_5` FOREIGN KEY (`status`) REFERENCES `taskStatus` (`id`);

--
-- Constraints for table `teacherAuth`
--
ALTER TABLE `teacherAuth`
  ADD CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `teachers` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
