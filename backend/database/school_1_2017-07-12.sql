# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.17-0ubuntu0.16.04.1)
# Database: ehl_school_system
# Generation Time: 2017-03-22 03:37:08 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table school
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school`;

CREATE TABLE `school` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `s_name` varchar(255) NOT NULL,
  `s_number` varchar(32) NOT NULL,
  `s_address` varchar(255) NOT NULL,
  `s_description` text,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;

INSERT INTO `school` (`id`, `s_name`, `s_number`, `s_address`, `s_description`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(1,'Poly 小學','','','Poly 直升大學',NULL,'0000-00-00 00:00:00','0000-00-00 00:00:00');

/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_academics
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_academics`;

CREATE TABLE `school_academics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `school_id` int(11) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `year` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `school_id` (`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_academics` WRITE;
/*!40000 ALTER TABLE `school_academics` DISABLE KEYS */;

INSERT INTO `school_academics` (`id`, `school_id`, `semester`, `year`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,1,1,'2016-2017','2017-03-19 11:15:39','2017-03-19 11:15:41',NULL),
	(2,1,2,'2016-2017','2017-03-19 11:15:39','2017-03-19 11:15:41',NULL),
	(3,2,1,NULL,'2017-03-19 11:15:39','2017-03-19 11:15:41',NULL),
	(4,2,2,NULL,'2017-03-19 11:15:39','2017-03-19 11:15:41',NULL),
	(5,1,1,'2017-2018','2017-03-19 12:15:39','2017-03-19 11:15:41',NULL),
	(6,1,2,'2017-2018','2017-03-19 12:15:39','2017-03-19 11:15:41',NULL);

/*!40000 ALTER TABLE `school_academics` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_assignment_item_questions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_assignment_item_questions`;

CREATE TABLE `school_assignment_item_questions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `assignment_id` int(11) DEFAULT NULL,
  `weakness_id` int(11) DEFAULT NULL,
  `question_id` int(11) DEFAULT NULL,
  `is_correct` tinyint(1) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  `latest` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_assignment_item_questions` WRITE;
/*!40000 ALTER TABLE `school_assignment_item_questions` DISABLE KEYS */;

INSERT INTO `school_assignment_item_questions` (`id`, `student_id`, `assignment_id`, `weakness_id`, `question_id`, `is_correct`, `answer`, `latest`, `created_at`, `updated_at`)
VALUES
	(1,1,1,3040,100,1,'A',NULL,'2017-03-19 21:54:41','2017-03-19 00:12:38'),
	(2,1,1,3040,101,0,'B',NULL,'2017-03-19 21:54:41','2017-03-19 00:12:38'),
	(3,1,1,244,200,1,'C',1,'2017-03-19 00:12:36','2017-03-19 00:12:38'),
	(4,1,1,244,222,1,'C',1,'2017-03-19 00:12:36','2017-03-19 00:12:38'),
	(5,2,1,3040,102,0,'D',1,'2017-03-19 23:09:19','2017-03-19 00:12:38'),
	(6,2,2,3040,103,0,'D',1,'2017-03-19 23:09:19','2017-03-19 00:12:38'),
	(7,2,2,100,103,1,'D',NULL,'2017-03-19 00:12:36','2017-03-19 00:12:38'),
	(8,3,3,3039,100,0,NULL,1,'2017-03-19 21:54:41','2017-03-19 00:12:38'),
	(9,50,3,3039,743,1,NULL,1,'2017-03-19 21:54:41','2017-03-19 00:12:38'),
	(10,64,4,3039,245,0,NULL,1,'2017-03-19 22:54:57','2017-03-19 00:12:38'),
	(11,64,4,100,936,1,NULL,1,'2017-03-19 00:12:36','2017-03-19 00:12:38'),
	(12,64,4,3040,447,0,NULL,0,'2017-03-19 23:08:10','2017-03-19 00:12:38'),
	(13,22,3,188,135,0,NULL,1,'2017-03-19 00:12:36','2017-03-19 00:12:38');

/*!40000 ALTER TABLE `school_assignment_item_questions` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_assignment_items
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_assignment_items`;

CREATE TABLE `school_assignment_items` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `assignment_id` int(10) NOT NULL,
  `weakness_id` int(255) NOT NULL,
  `question_qty` int(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_assignment_items` WRITE;
/*!40000 ALTER TABLE `school_assignment_items` DISABLE KEYS */;

INSERT INTO `school_assignment_items` (`id`, `assignment_id`, `weakness_id`, `question_qty`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(3,2,161,2,'0000-00-00 00:00:00','2017-03-19 15:24:39','2017-03-19 15:24:39'),
	(4,2,259,3,'0000-00-00 00:00:00','2017-03-19 15:24:39','2017-03-19 15:24:39'),
	(13,7,3039,3,'2017-03-18 16:28:59','2017-03-18 16:28:59',NULL),
	(14,7,3041,3,'2017-03-18 16:29:00','2017-03-18 16:29:00',NULL),
	(15,8,3039,3,'2017-03-18 16:31:22','2017-03-19 09:14:26','2017-03-19 09:14:26'),
	(16,8,3040,3,'2017-03-18 16:31:22','2017-03-19 09:14:26','2017-03-19 09:14:26'),
	(19,10,3039,3,'2017-03-18 16:34:25','2017-03-19 09:10:15','2017-03-19 09:10:15'),
	(20,11,3039,3,'2017-03-18 16:34:45','2017-03-19 15:23:14','2017-03-19 15:23:14'),
	(21,12,3039,3,'2017-03-18 16:35:49','2017-03-18 16:35:49',NULL),
	(22,12,3040,3,'2017-03-18 16:35:49','2017-03-18 16:35:49',NULL),
	(29,16,166,3,'2017-03-19 07:40:29','2017-03-19 07:40:29',NULL),
	(30,16,166,3,'2017-03-19 07:40:30','2017-03-19 07:40:30',NULL),
	(31,10,3039,3,'2017-03-19 09:10:15','2017-03-19 09:13:33','2017-03-19 09:13:33'),
	(32,10,3040,3,'2017-03-19 09:10:15','2017-03-19 09:13:33','2017-03-19 09:13:33'),
	(33,10,3043,3,'2017-03-19 09:10:15','2017-03-19 09:13:33','2017-03-19 09:13:33'),
	(34,10,3039,3,'2017-03-19 09:13:34','2017-03-19 09:13:51','2017-03-19 09:13:51'),
	(35,10,3040,3,'2017-03-19 09:13:34','2017-03-19 09:13:51','2017-03-19 09:13:51'),
	(36,10,3043,3,'2017-03-19 09:13:34','2017-03-19 09:13:51','2017-03-19 09:13:51'),
	(37,10,3039,3,'2017-03-19 09:13:51','2017-03-19 09:13:51',NULL),
	(38,10,3040,3,'2017-03-19 09:13:51','2017-03-19 09:13:51',NULL),
	(39,10,3043,3,'2017-03-19 09:13:51','2017-03-19 09:13:51',NULL),
	(40,8,3042,3,'2017-03-19 09:14:27','2017-03-19 09:15:13','2017-03-19 09:15:13'),
	(41,8,3039,3,'2017-03-19 09:15:13','2017-03-19 09:16:24','2017-03-19 09:16:24'),
	(42,8,3042,3,'2017-03-19 09:15:13','2017-03-19 09:16:24','2017-03-19 09:16:24'),
	(43,8,3039,3,'2017-03-19 09:16:24','2017-03-19 09:16:51','2017-03-19 09:16:51'),
	(44,8,3042,3,'2017-03-19 09:16:24','2017-03-19 09:16:51','2017-03-19 09:16:51'),
	(45,8,3039,3,'2017-03-19 09:16:51','2017-03-19 15:23:36','2017-03-19 15:23:36'),
	(46,8,3042,3,'2017-03-19 09:16:51','2017-03-19 15:23:36','2017-03-19 15:23:36'),
	(47,17,3039,3,'2017-03-19 09:18:08','2017-03-19 09:21:26','2017-03-19 09:21:26'),
	(48,17,3040,3,'2017-03-19 09:18:08','2017-03-19 09:21:26','2017-03-19 09:21:26'),
	(49,17,3041,3,'2017-03-19 09:18:08','2017-03-19 09:21:26','2017-03-19 09:21:26'),
	(50,17,3039,3,'2017-03-19 09:21:26','2017-03-19 09:21:52','2017-03-19 09:21:52'),
	(51,17,3040,3,'2017-03-19 09:21:26','2017-03-19 09:21:52','2017-03-19 09:21:52'),
	(52,17,3041,3,'2017-03-19 09:21:26','2017-03-19 09:21:52','2017-03-19 09:21:52'),
	(53,17,3039,3,'2017-03-19 09:21:52','2017-03-19 09:21:52',NULL),
	(54,17,3040,3,'2017-03-19 09:21:53','2017-03-19 09:21:53',NULL),
	(55,17,3041,3,'2017-03-19 09:21:53','2017-03-19 09:21:53',NULL),
	(56,11,3039,3,'2017-03-19 15:23:14','2017-03-19 15:23:14',NULL),
	(57,11,3040,3,'2017-03-19 15:23:14','2017-03-19 15:23:14',NULL),
	(58,8,3039,3,'2017-03-19 15:23:37','2017-03-19 15:23:37',NULL),
	(59,19,439,3,'2017-03-19 15:26:59','2017-03-19 15:26:59',NULL),
	(60,19,449,3,'2017-03-19 15:26:59','2017-03-19 15:26:59',NULL),
	(61,20,3043,3,'2017-03-21 05:38:45','2017-03-21 05:38:45',NULL),
	(62,20,3044,3,'2017-03-21 05:38:45','2017-03-21 05:38:45',NULL),
	(63,20,3045,3,'2017-03-21 05:38:45','2017-03-21 05:38:45',NULL);

/*!40000 ALTER TABLE `school_assignment_items` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_assignments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_assignments`;

CREATE TABLE `school_assignments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_class_subject_id` int(10) NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '1=assessment,2=exercise,3=exam',
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `start_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_date` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `published` tinyint(1) DEFAULT NULL,
  `compulsory` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_assignments` WRITE;
/*!40000 ALTER TABLE `school_assignments` DISABLE KEYS */;

INSERT INTO `school_assignments` (`id`, `teacher_class_subject_id`, `type`, `name`, `description`, `start_date`, `end_date`, `updated_at`, `deleted_at`, `created_at`, `published`, `compulsory`)
VALUES
	(2,2,'exercise','test','test','2016-02-22 11:00:00','2016-02-23 22:00:00','2017-03-19 15:24:39',NULL,'2017-03-14 15:20:08',0,0),
	(3,2,'examination','examination','examination','2016-02-21 10:00:00','2016-02-21 10:00:00','2017-03-14 15:20:08',NULL,'2017-03-14 15:20:08',0,1),
	(4,2,'assessment','assessment','assessment','2016-02-21 10:00:00','2016-02-21 10:00:00','2016-02-21 10:00:00',NULL,'2016-02-21 10:00:00',0,1),
	(6,2,NULL,'test','test','2017-03-19 00:26:04','2017-03-25 00:26:00','2017-03-18 16:26:22',NULL,'2017-03-18 16:26:22',NULL,1),
	(7,2,NULL,'test','test','2017-03-19 00:28:47','2017-03-25 00:28:00','2017-03-18 16:28:59',NULL,'2017-03-18 16:28:59',NULL,1),
	(8,2,'assessment','test create','test create','2017-03-18 00:31:00','2017-03-19 00:31:06','2017-03-19 15:23:36',NULL,'2017-03-18 16:31:22',NULL,1),
	(10,2,'assessment','ddd','ddd','2017-03-21 06:35:00','2017-03-25 00:34:00','2017-03-19 09:13:33',NULL,'2017-03-18 16:34:25',NULL,0),
	(11,2,'assessment','dd2222','222','2017-03-19 00:34:40','2017-03-19 00:34:40','2017-03-18 16:34:45',NULL,'2017-03-18 16:34:45',NULL,1),
	(12,2,'examination','exam 2',NULL,'2017-03-14 00:35:00','2017-03-31 00:35:00','2017-03-18 16:35:49',NULL,'2017-03-18 16:35:49',NULL,1),
	(16,2,NULL,'test','test','2016-02-21 10:00:00','2016-02-23 22:00:00','2017-03-19 07:40:29',NULL,'2017-03-19 07:40:29',NULL,NULL),
	(17,2,'exercise','exercise','exercise','2017-03-22 18:25:00','2017-03-25 17:15:00','2017-03-19 09:21:52',NULL,'2017-03-19 09:18:07',NULL,1),
	(18,9,'assessment',NULL,NULL,'2017-03-19 23:04:02','2017-03-19 23:04:02','2017-03-19 15:04:05',NULL,'2017-03-19 15:04:05',NULL,0),
	(19,8,'assessment','new ass','new ass','2017-03-19 23:26:43','2017-03-19 23:26:47','2017-03-19 15:26:59',NULL,'2017-03-19 15:26:59',NULL,1),
	(20,5,'assessment','Testing','bla bla bla ...','2017-03-23 14:10:00','2017-03-29 13:38:00','2017-03-21 05:38:45',NULL,'2017-03-21 05:38:45',NULL,1);

/*!40000 ALTER TABLE `school_assignments` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_classes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_classes`;

CREATE TABLE `school_classes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(255) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_classes` WRITE;
/*!40000 ALTER TABLE `school_classes` DISABLE KEYS */;

INSERT INTO `school_classes` (`id`, `c_name`, `is_deleted`, `create_ts`, `update_ts`)
VALUES
	(1,'1A',0,'2016-06-03 11:17:40','2017-03-06 23:20:37'),
	(2,'1B',0,'2016-06-03 11:33:44','2017-03-06 23:20:23'),
	(3,'2A',0,'2016-06-03 11:33:44','2017-03-06 23:20:27'),
	(4,'2B',0,'2016-06-03 11:33:44','2017-03-06 23:20:29'),
	(5,'1A',0,'2017-03-06 23:20:42','2017-03-06 23:20:54');

/*!40000 ALTER TABLE `school_classes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_curriculum_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_curriculum_settings`;

CREATE TABLE `school_curriculum_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `academic_id` int(11) NOT NULL,
  `weakness_id` int(11) NOT NULL,
  `level` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_curriculum_settings` WRITE;
/*!40000 ALTER TABLE `school_curriculum_settings` DISABLE KEYS */;

INSERT INTO `school_curriculum_settings` (`id`, `academic_id`, `weakness_id`, `level`, `created_at`, `updated_at`)
VALUES
	(5,5,166,'P2','2017-03-19 16:01:28','2017-03-19 16:01:28'),
	(6,6,167,'P2','2017-03-19 16:01:28','2017-03-19 16:01:28');

/*!40000 ALTER TABLE `school_curriculum_settings` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_subjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_subjects`;

CREATE TABLE `school_subjects` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `s_name_en` varchar(255) NOT NULL DEFAULT '',
  `s_name_zh` varchar(255) DEFAULT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_subjects` WRITE;
/*!40000 ALTER TABLE `school_subjects` DISABLE KEYS */;

INSERT INTO `school_subjects` (`id`, `s_name_en`, `s_name_zh`, `is_deleted`, `create_ts`, `update_ts`)
VALUES
	(1,'Chinese','中文',0,'2017-03-04 15:11:22','2017-03-04 15:36:00'),
	(2,'English','英文',0,'2017-03-04 15:11:26','2017-03-04 15:36:04'),
	(3,'Math','數學',0,'2017-03-04 15:14:59','2017-03-04 15:36:08'),
	(4,'Computer','電腦',0,'2017-03-06 22:12:59','0000-00-00 00:00:00');

/*!40000 ALTER TABLE `school_subjects` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_teacher_class_subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_teacher_class_subject`;

CREATE TABLE `school_teacher_class_subject` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_id` int(10) NOT NULL,
  `class_id` int(10) NOT NULL,
  `subject_id` int(10) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacher_class_subject` (`teacher_id`,`class_id`,`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_teacher_class_subject` WRITE;
/*!40000 ALTER TABLE `school_teacher_class_subject` DISABLE KEYS */;

INSERT INTO `school_teacher_class_subject` (`id`, `teacher_id`, `class_id`, `subject_id`, `is_deleted`)
VALUES
	(1,53,3,1,0),
	(2,53,3,2,0),
	(3,53,4,3,0),
	(5,53,4,2,0),
	(6,52,4,2,0),
	(7,53,2,4,0),
	(8,66,3,1,0),
	(9,66,2,2,0),
	(10,66,4,1,0);

/*!40000 ALTER TABLE `school_teacher_class_subject` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_teaching_progresses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_teaching_progresses`;

CREATE TABLE `school_teaching_progresses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_class_subject_id` int(10) NOT NULL,
  `weakness_id` int(10) NOT NULL,
  `updated_at` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `school_teaching_progresses` WRITE;
/*!40000 ALTER TABLE `school_teaching_progresses` DISABLE KEYS */;

INSERT INTO `school_teaching_progresses` (`id`, `teacher_class_subject_id`, `weakness_id`, `updated_at`, `created_at`)
VALUES
	(36,2,3039,'2017-03-18 14:20:11','2017-03-18 14:20:11'),
	(37,2,3040,'2017-03-18 14:20:11','2017-03-18 14:20:11'),
	(38,2,3043,'2017-03-18 14:20:11','2017-03-18 14:20:11'),
	(39,8,439,'2017-03-19 07:09:23','2017-03-19 07:09:23'),
	(40,8,449,'2017-03-19 07:09:23','2017-03-19 07:09:23'),
	(41,8,450,'2017-03-19 07:09:23','2017-03-19 07:09:23'),
	(42,8,452,'2017-03-19 07:09:23','2017-03-19 07:09:23'),
	(43,8,457,'2017-03-19 07:09:23','2017-03-19 07:09:23'),
	(44,8,458,'2017-03-19 07:09:24','2017-03-19 07:09:24'),
	(45,8,475,'2017-03-19 07:09:24','2017-03-19 07:09:24'),
	(46,5,3041,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(47,5,3042,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(48,5,3043,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(49,5,3044,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(50,5,3045,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(51,5,3207,'2017-03-21 05:37:48','2017-03-21 05:37:48'),
	(52,5,3208,'2017-03-21 05:37:48','2017-03-21 05:37:48');

/*!40000 ALTER TABLE `school_teaching_progresses` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(50) NOT NULL DEFAULT '',
  `user_group` int(11) NOT NULL DEFAULT '5',
  `sc_token` varchar(100) NOT NULL DEFAULT '',
  `fb_token` varchar(100) NOT NULL DEFAULT '',
  `acc_type` enum('paying','free','free_trial','unlimited') NOT NULL DEFAULT 'paying',
  `status` enum('non-active','active') NOT NULL DEFAULT 'non-active',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00' ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `is_deleted` (`is_deleted`),
  KEY `username` (`username`),
  KEY `sc_token` (`sc_token`),
  KEY `fb_token` (`fb_token`),
  KEY `login` (`username`,`password`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;

INSERT INTO `user` (`id`, `username`, `password`, `user_group`, `sc_token`, `fb_token`, `acc_type`, `status`, `is_deleted`, `create_ts`, `update_ts`)
VALUES
	(1,'moonctpa@gmail.com','e10adc3949ba59abbe56e057f20f883e',1,'','','paying','active',0,'2016-08-31 01:23:00','2017-03-02 12:31:56'),
	(2,'hahatest2@test.com','e10adc3949ba59abbe56e057f20f883e',4,'f60b64589fd227c8b9f7680d24f64660','','paying','active',0,'2016-09-01 21:00:36','2016-12-30 17:32:05'),
	(3,'','',4,'8168d07c9032ebf731e4a9475e9d3734','','paying','active',1,'2016-09-01 21:00:36','2016-09-09 20:42:31'),
	(4,'','',5,'544801c58df9e8b025a00a03de74387a','','free','active',0,'2016-09-01 21:01:13','2016-10-15 01:41:33'),
	(5,'','',5,'1dd1d49289bd5da0686ab15fb001724b','','paying','active',0,'2016-09-01 21:01:13','0000-00-00 00:00:00'),
	(6,'hahatest5@test.com','alkghadlkhgaklsdjgf',4,'','','paying','active',0,'2016-09-03 00:45:38','2016-09-20 02:35:55'),
	(7,'hahatest6@test.com','alkghadlkhgaklsdjgf',3,'','','paying','active',0,'2016-09-03 00:46:43','2016-09-20 02:36:15'),
	(8,'hahatest7@test.com','alkghadlkhgaklsdjgf',3,'','','paying','non-active',0,'2016-09-03 00:48:15','0000-00-00 00:00:00'),
	(9,'hahatest9@test.com','alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-03 01:11:40','0000-00-00 00:00:00'),
	(10,'hahatest10@test.com','alkghadlkhgaklsdjgf',3,'','','paying','active',0,'2016-09-03 01:12:57','2016-09-23 00:53:55'),
	(11,'hahatest11@test.com','alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-03 01:14:27','2016-09-23 01:18:00'),
	(12,'','',5,'3ee6c083f615c785cb15833ced07df83','','paying','active',0,'2016-09-05 23:29:29','0000-00-00 00:00:00'),
	(13,'','',5,'9e6f6c2e6d9d8e1dffac091ff97bf432','','paying','active',0,'2016-09-05 23:29:29','0000-00-00 00:00:00'),
	(14,'','',5,'e00c5c6f28ff61b0b558ad27848e2c43','','paying','active',0,'2016-09-05 23:31:54','0000-00-00 00:00:00'),
	(15,'','',5,'9a3a7bb6204ae7236e8c98fe2889ae0e','','paying','active',0,'2016-09-05 23:31:54','0000-00-00 00:00:00'),
	(16,'','',5,'073484ed44be1b83777867866b487a7d','','paying','active',0,'2016-09-05 23:32:50','0000-00-00 00:00:00'),
	(17,'','',5,'dcf10556c986130ccaec54915ad551c0','','paying','active',0,'2016-09-05 23:32:50','0000-00-00 00:00:00'),
	(18,'','',5,'a615b1b6d40cd5de8996918734036cef','','paying','active',0,'2016-09-07 19:37:29','0000-00-00 00:00:00'),
	(19,'','',5,'58a1b464f4478d71e281f81bffc84145','','paying','active',0,'2016-09-07 19:37:29','0000-00-00 00:00:00'),
	(20,'','',5,'f579bd4eaaedc37ed54c2f110835995e','','paying','non-active',0,'2016-09-07 20:23:11','0000-00-00 00:00:00'),
	(21,'','',5,'469f9cb64525e437f73b83e246e4638d','','paying','non-active',0,'2016-09-07 20:23:11','0000-00-00 00:00:00'),
	(22,'','',5,'fba7ba75a564b9edc044d51778c5734e','','paying','non-active',0,'2016-09-07 23:13:37','0000-00-00 00:00:00'),
	(23,'','',5,'575639c8d1847c4d8e1e8abae8d1a052','','paying','non-active',0,'2016-09-07 23:13:37','0000-00-00 00:00:00'),
	(24,'moonctp1@gmail.com','asasasas',1,'','','paying','active',0,'2016-09-07 23:36:58','2016-09-09 19:52:50'),
	(25,'hahatest12@test.com','alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 20:37:04','0000-00-00 00:00:00'),
	(26,'hahatest13@test.com','alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 20:37:31','0000-00-00 00:00:00'),
	(27,'hahatest14@test.com','alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 20:38:25','0000-00-00 00:00:00'),
	(28,'','',5,'cd16cfe09d5da1182ff1f5007e5b6839','','paying','non-active',0,'2016-09-08 23:32:50','0000-00-00 00:00:00'),
	(29,'','',5,'987a2e10d05d14c83884bc0a24e0c514','','paying','non-active',0,'2016-09-08 23:48:55','0000-00-00 00:00:00'),
	(30,'','',5,'2255961c4c64d66c2c1e687575eba8ae','','paying','non-active',0,'2016-09-08 23:49:41','0000-00-00 00:00:00'),
	(31,'hahatest113@test.com','asasasas',1,'','','paying','non-active',0,'2016-09-08 23:50:02','2016-09-08 23:56:31'),
	(32,'hahatest112@test.com','e219b56989281a7846dd836161d7a2bd',1,'','','paying','active',0,'2016-09-08 23:56:34','2016-09-09 20:43:35'),
	(34,'','',5,'f73722773cd0b2a76c1fa66294a049cd','','paying','non-active',0,'2016-09-10 01:10:42','0000-00-00 00:00:00'),
	(35,'testing@gmail.com','',5,'04e80538773a0f4251cfcf39b5c15ea0','','paying','active',0,'2016-09-10 01:10:42','2017-02-22 23:09:01'),
	(36,'moonctp2@gmail.com','25d55ad283aa400af464c76d713c07ad',3,'','','paying','active',0,'2016-09-10 01:14:07','2016-12-13 15:24:23'),
	(37,'','',5,'66ffc66d321aaf8c289eed06777c2541','','paying','non-active',0,'2016-10-15 01:24:58','0000-00-00 00:00:00'),
	(38,'test1','25d55ad283aa400af464c76d713c07ad',5,'e1dc44d9ebc910b81847fa060b4ae79f','','paying','non-active',0,'2016-10-15 01:24:58','2017-01-07 11:58:21'),
	(39,'','',5,'f786a21f14b6be2fd31e71bfd52b0c80','','free','active',0,'2016-10-15 01:27:06','0000-00-00 00:00:00'),
	(40,'','',5,'24dab63fb5a1bee3059db416f95babb4','','free','active',0,'2016-10-15 01:27:06','0000-00-00 00:00:00'),
	(42,'test2','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:54','0000-00-00 00:00:00'),
	(43,'test3','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:54','0000-00-00 00:00:00'),
	(44,'test4','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:54','0000-00-00 00:00:00'),
	(45,'test5','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:55','0000-00-00 00:00:00'),
	(46,'test6','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:55','0000-00-00 00:00:00'),
	(47,'test7','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:55','0000-00-00 00:00:00'),
	(48,'test8','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:55','0000-00-00 00:00:00'),
	(49,'test9','25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 18:10:55','2016-12-06 09:41:33'),
	(52,'kyo@gmail.com','e10adc3949ba59abbe56e057f20f883e',1,'','','paying','active',0,'2016-12-06 16:52:33','2016-12-06 16:54:31'),
	(53,'hong304@gmail.com','e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-12-06 16:52:42','2017-03-15 00:38:00'),
	(54,'tonykung06@hotmail.com','ae2b1fca515949e5d54fb22b8ed95575',4,'','','paying','active',0,'2016-12-06 17:32:53','2016-12-06 17:47:48'),
	(55,'fukkuen@gmail.com','5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2016-12-07 11:31:11','2017-02-18 23:19:38'),
	(56,'kyo1@gmail.com','e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-15 18:02:43','0000-00-00 00:00:00'),
	(57,'kyofight@gmail.com','e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-15 23:50:24','0000-00-00 00:00:00'),
	(58,'kyo12@gmail.com','bafc1dec2abfc3aa2eb326f8881c6f6a',5,'','','paying','non-active',0,'2016-12-16 00:09:27','0000-00-00 00:00:00'),
	(59,'kyo123@gmail.com','3aace69300a218eb72fe4ade64158f9e',5,'','','paying','non-active',0,'2016-12-16 00:17:39','0000-00-00 00:00:00'),
	(60,'hong@gmail.com','e10adc3949ba59abbe56e057f20f883e',5,'','','paying','active',0,'2016-12-19 15:53:01','2016-12-19 15:54:14'),
	(61,'af@aag.com','a4cb14f0c468232636bc915047ef1180',5,'','','paying','non-active',0,'2016-12-23 20:38:35','0000-00-00 00:00:00'),
	(62,'kk@gmail.com','e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-27 02:08:45','0000-00-00 00:00:00'),
	(63,'fwr@asfs.com','96e79218965eb72c92a549dd5a330112',5,'','','paying','non-active',0,'2016-12-27 02:12:09','0000-00-00 00:00:00'),
	(64,'moonctpdw1@gmail.com','e10adc3949ba59abbe56e057f20f883e',4,'','','paying','non-active',0,'2016-12-27 02:13:39','0000-00-00 00:00:00'),
	(65,'sgsf@sfdf.com','96e79218965eb72c92a549dd5a330112',4,'','','paying','non-active',0,'2016-12-27 02:23:46','0000-00-00 00:00:00'),
	(66,'ggg@gmail.com','e10adc3949ba59abbe56e057f20f883e',5,'','','paying','active',0,'2016-12-27 02:38:06','2016-12-30 18:31:21'),
	(67,'testing@mail.com','87ffe0353dd626ef6efee0c5a7871d0d',5,'','','paying','non-active',0,'2016-12-31 10:07:45','0000-00-00 00:00:00'),
	(68,'testing2@mail.com','87ffe0353dd626ef6efee0c5a7871d0d',4,'','','paying','non-active',0,'2016-12-31 10:08:44','0000-00-00 00:00:00'),
	(69,'kkk@gmail.com','25d55ad283aa400af464c76d713c07ad',5,'','','paying','non-active',0,'2017-01-01 10:12:37','0000-00-00 00:00:00'),
	(70,'test@gmail.com','7dd05f4bf93b416b650331c4db018cdd',4,'','','paying','non-active',0,'2017-01-04 15:11:06','0000-00-00 00:00:00'),
	(71,'bill','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-06 12:55:46','2017-02-08 13:23:47'),
	(72,'asdf@gg.com','789488a3ba254518497b8ad55e70ef28',4,'','','paying','non-active',0,'2017-01-09 12:27:33','0000-00-00 00:00:00'),
	(73,'eric','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-10 10:52:15','2017-01-10 10:52:25'),
	(74,'fukkuen_child@gmail.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-01-12 11:55:23','2017-01-13 17:58:10'),
	(75,'henry','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 10:14:44','0000-00-00 00:00:00'),
	(76,'davis','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 10:14:44','0000-00-00 00:00:00'),
	(77,'yanson','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 10:14:44','0000-00-00 00:00:00'),
	(78,'fukkuen.work@gmail.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-01-16 15:42:21','2017-01-18 11:40:21'),
	(79,'zart@s.bloq.ro','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-01-18 12:39:23','0000-00-00 00:00:00'),
	(80,'iqrr@mymailto.cf','a2d1cbd1a6656e68feee580f4c1fc5f6',5,'','','paying','non-active',0,'2017-01-19 09:40:54','0000-00-00 00:00:00'),
	(81,'pun','25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-20 12:50:13','0000-00-00 00:00:00'),
	(82,'test11','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(83,'test12','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(84,'test13','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(85,'test14','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(86,'test15','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(87,'test16','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(88,'test17','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(89,'test18','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','0000-00-00 00:00:00'),
	(90,'test19@gmail.com','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 12:54:58','2017-01-20 16:14:28'),
	(91,'p1','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:48:51','2017-01-25 18:13:08'),
	(92,'hong@whoami.pw','e94ab5a3e2d72c7c325045f3ce30f141',4,'','','paying','active',0,'2017-01-25 14:02:50','2017-02-18 15:45:28'),
	(93,'p2','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:14','2017-01-25 18:15:00'),
	(94,'p3','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:17','2017-01-25 18:15:01'),
	(95,'p4','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:19','2017-01-25 18:15:01'),
	(96,'p5','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:21','2017-01-25 18:15:01'),
	(97,'p6','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:24','2017-01-25 18:15:01'),
	(98,'s1','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:28','2017-01-25 18:15:01'),
	(99,'s2','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:13:32','2017-01-25 18:15:01'),
	(100,'s3','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:15:06','2017-01-25 18:16:03'),
	(101,'s4','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:15:08','2017-01-25 18:16:03'),
	(102,'s5','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:15:10','2017-01-25 18:16:03'),
	(103,'s6','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 18:15:12','2017-01-25 18:16:03'),
	(104,'billchan@gmail.com','25d55ad283aa400af464c76d713c07ad',5,'0b1ece72b40328bb569092e564938020','','paying','active',0,'2017-01-28 17:18:29','2017-03-14 15:19:56'),
	(105,'','',5,'dfb14f5e6cfb00f6c3299deb0f59bee2','','free_trial','active',0,'2017-01-29 16:25:30','0000-00-00 00:00:00'),
	(106,'','',5,'4420ff214001ba2c9ed3cee7b6be9dab','','free_trial','active',0,'2017-01-29 16:27:12','0000-00-00 00:00:00'),
	(107,'','',5,'6f36e1ec401cedb23f42dd57081dae31','','free_trial','active',0,'2017-01-29 16:28:47','0000-00-00 00:00:00'),
	(108,'','',5,'d5a14a040d456d79083c433cf05c1fe1','','free_trial','active',0,'2017-01-29 16:34:13','0000-00-00 00:00:00'),
	(109,'','',5,'ad0230dbf1fe27774120177305dcac3c','','free_trial','active',0,'2017-01-29 16:48:53','0000-00-00 00:00:00'),
	(110,'','',5,'1edcaf8a7862617fd404d6b201edf19e','','free_trial','active',0,'2017-01-29 16:50:54','0000-00-00 00:00:00'),
	(111,'','',5,'aa9b9180d964dfe3dadfaf1178953b0f','','free_trial','active',0,'2017-01-29 16:51:24','0000-00-00 00:00:00'),
	(112,'','',5,'2d4928282fba1e52ac239ff9857ecd26','','free_trial','active',0,'2017-01-29 16:52:01','0000-00-00 00:00:00'),
	(113,'','',5,'9731178166acabe5828dbc587fc2a1b4','','free_trial','active',0,'2017-01-29 16:52:46','0000-00-00 00:00:00'),
	(114,'','',5,'34a1b846f0bd15a7edafdcc0349558ae','','free_trial','active',0,'2017-01-29 16:55:43','0000-00-00 00:00:00'),
	(115,'','',5,'4d08b0cc3ac9a5e014bdbad623adf2d8','','free_trial','active',0,'2017-01-29 16:58:06','0000-00-00 00:00:00'),
	(116,'','',5,'93e61a267700932b33384e066807746a','','free_trial','active',0,'2017-01-29 16:58:32','0000-00-00 00:00:00'),
	(117,'','',5,'93b86f9731aff08ab233c65e27cdb8f5','','free_trial','active',0,'2017-01-29 17:50:21','0000-00-00 00:00:00'),
	(118,'','',5,'c0a49cd85f8faa62095787e1f12cc1cc','','free_trial','active',0,'2017-01-29 17:51:03','0000-00-00 00:00:00'),
	(119,'','',5,'2cb3b8f691fae2297ac4e7c66be45c2c','','free_trial','active',0,'2017-01-29 17:51:16','0000-00-00 00:00:00'),
	(120,'','',5,'cdc369b6743da2425ce5eaffe941875d','','free_trial','active',0,'2017-01-29 17:51:42','0000-00-00 00:00:00'),
	(121,'','',5,'bb81f841432af57afe935fb4390a87fb','','free_trial','active',0,'2017-01-29 17:51:55','0000-00-00 00:00:00'),
	(122,'','',5,'14467fc15c3ce0ae3446fba7788a041a','','free_trial','active',0,'2017-01-29 17:52:10','0000-00-00 00:00:00'),
	(123,'','',5,'5cef4775ae4a86877f11cfc84ec4059d','','free_trial','active',0,'2017-01-29 17:57:24','0000-00-00 00:00:00'),
	(124,'','',5,'b03d39abe86934ddcd6174b02b8d39cd','','free_trial','active',0,'2017-01-29 17:57:42','0000-00-00 00:00:00'),
	(125,'','',5,'d948088bb3cde69bd21e4fa7f6a63904','','free_trial','active',0,'2017-01-29 18:05:55','0000-00-00 00:00:00'),
	(126,'','',5,'67101eafa7519b85316b22c99e64fed6','','free_trial','active',0,'2017-01-30 00:34:15','0000-00-00 00:00:00'),
	(127,'','',5,'775c9976056a6d6597b7f7a614d8fd13','','free_trial','active',0,'2017-01-30 00:34:32','0000-00-00 00:00:00'),
	(128,'','',5,'34a55357eda40f36a00aaa43ecd90e07','','free_trial','active',0,'2017-01-30 00:36:52','0000-00-00 00:00:00'),
	(129,'','',5,'2887af207eeb77fa764447acdb4b6d87','','free_trial','active',0,'2017-01-30 00:37:03','0000-00-00 00:00:00'),
	(130,'','',5,'c9348f3f66d15711d6128b9f7b2be1e1','','free_trial','active',0,'2017-01-30 00:58:45','0000-00-00 00:00:00'),
	(131,'','',5,'5cf4caad2a9eb0589d232ec5fb164f23','','free_trial','active',0,'2017-01-30 00:59:41','0000-00-00 00:00:00'),
	(132,'','',5,'df41e63a00e3cd94002239eae1c5171b','','free_trial','active',0,'2017-01-30 16:46:12','0000-00-00 00:00:00'),
	(133,'','',5,'b398a4a4d04906ff2cbbcdb6cf0b6f76','','free_trial','active',0,'2017-01-30 16:55:14','0000-00-00 00:00:00'),
	(134,'','',5,'a94112f98a2ffd5d6932144b40277d5e','','free_trial','active',0,'2017-01-31 00:39:02','0000-00-00 00:00:00'),
	(135,'','',5,'9c057812cf9305a76b4783429855db07','','free_trial','active',0,'2017-01-31 18:01:37','0000-00-00 00:00:00'),
	(136,'','',5,'ff746cd149d0aed0a095ce05496872a9','','free_trial','active',0,'2017-02-01 02:08:38','0000-00-00 00:00:00'),
	(137,'admin1','25d55ad283aa400af464c76d713c07ad',1,'b64a36429ef0abe0dc1cce6745c479b3','','paying','active',0,'2017-02-01 16:06:31','2017-02-01 16:07:29'),
	(138,'admin2','25d55ad283aa400af464c76d713c07ad',1,'58e798cc3934b425dc4073caeeb3519a','','paying','active',0,'2017-02-01 16:06:34','2017-02-01 16:07:29'),
	(139,'admin3','25d55ad283aa400af464c76d713c07ad',1,'1922402e8758a2c84cdf25e0d8c2418e','','paying','active',0,'2017-02-01 16:06:36','2017-02-01 16:07:29'),
	(140,'admin4','25d55ad283aa400af464c76d713c07ad',1,'2dd68500b855fa7037a0c07bee66def1','','paying','active',0,'2017-02-01 16:06:39','2017-02-01 16:07:29'),
	(141,'admin5','25d55ad283aa400af464c76d713c07ad',1,'7962b3731a75ea99188bd4ce60a629df','','paying','active',0,'2017-02-01 16:06:41','2017-02-01 16:07:29'),
	(142,'admin6','25d55ad283aa400af464c76d713c07ad',1,'375121a345665cc9e0cc22d5dd805083','','paying','active',0,'2017-02-01 16:06:43','2017-02-01 16:07:29'),
	(143,'','',5,'686e5d16281ad9c3df4875d13bfe7ba3','','free_trial','active',0,'2017-02-01 21:39:34','0000-00-00 00:00:00'),
	(144,'','',5,'d9f4c115e1d09e863e7e4a534d57597e','','free_trial','active',0,'2017-02-02 00:06:06','0000-00-00 00:00:00'),
	(145,'','',5,'26ce48a08f902aacb662c9a621d3dc50','','free_trial','active',0,'2017-02-02 22:56:09','0000-00-00 00:00:00'),
	(146,'','',5,'4c6b5ec56ec9a1706726e821b3de2282','','free_trial','active',0,'2017-02-02 22:59:52','0000-00-00 00:00:00'),
	(147,'','',5,'8cd409fc083a07073e81d819a836a37e','','free_trial','active',0,'2017-02-03 00:00:35','0000-00-00 00:00:00'),
	(148,'','',5,'4f9cf337df8b2bceb874b7021b811093','','free_trial','active',0,'2017-02-04 10:50:54','0000-00-00 00:00:00'),
	(149,'','',5,'2c7643d71a2f5894feb263b088073541','','free_trial','active',0,'2017-02-04 14:56:59','0000-00-00 00:00:00'),
	(150,'','',5,'988eb2e8e9425007a8e6c40671a3f4db','','free_trial','active',0,'2017-02-05 21:37:33','0000-00-00 00:00:00'),
	(151,'','',5,'a5617468b7a845223eb4719df9b88b32','','free_trial','active',0,'2017-02-05 21:37:38','0000-00-00 00:00:00'),
	(152,'','',5,'cdf75a952dbd0dd266a15f0b04ce5a00','','free_trial','active',0,'2017-02-05 22:08:20','0000-00-00 00:00:00'),
	(153,'','',5,'bfbc75e3c279995d6484a48aafbc4995','','free_trial','active',0,'2017-02-06 00:18:05','0000-00-00 00:00:00'),
	(154,'eve','25d55ad283aa400af464c76d713c07ad',1,'cab9c819ff015409f663754bfc5caca3','','paying','active',0,'2017-02-06 11:09:48','2017-02-06 11:10:55'),
	(155,'','',5,'6ea569286161e1558e54c0717ecf7596','','free_trial','active',0,'2017-02-06 16:41:45','0000-00-00 00:00:00'),
	(156,'','',5,'7f06a5a4ae8492ee9e5bc6f8feec5e1b','','free_trial','active',0,'2017-02-06 16:56:55','0000-00-00 00:00:00'),
	(157,'','',5,'260d43b364abd15332405581962d9fb2','','free_trial','active',0,'2017-02-06 19:25:06','0000-00-00 00:00:00'),
	(158,'','',5,'4e8614a05877b4d22b83c467bb77e241','','free_trial','active',0,'2017-02-06 19:59:43','0000-00-00 00:00:00'),
	(159,'','',5,'6fc84158fca1ddb44bc24c2bfbaec6eb','','free_trial','active',0,'2017-02-06 20:01:04','0000-00-00 00:00:00'),
	(160,'','',5,'0d22338abb6d51681c9f6889d0206aef','','free_trial','active',0,'2017-02-06 21:14:10','0000-00-00 00:00:00'),
	(161,'','',5,'8e307229b77470565b73114109057731','','free_trial','active',0,'2017-02-07 06:02:07','0000-00-00 00:00:00'),
	(162,'','',5,'bb6243f712ed742101271ec4a2d35077','','free_trial','active',0,'2017-02-07 13:57:12','0000-00-00 00:00:00'),
	(163,'shadow.ctp@gmail.com','698f6173bb4378ee5bda0e857a819419',5,'','','paying','active',0,'2017-02-07 15:13:46','2017-02-07 15:19:15'),
	(164,'applereview','25d55ad283aa400af464c76d713c07ad',5,'bf5c7a3433249c743cff5367c7b7d780','','free_trial','active',0,'2017-02-07 20:31:40','2017-03-02 12:36:57'),
	(165,'','',5,'7f95a9b27c4e2ecf1a67bc75173ee8ae','','free_trial','active',0,'2017-02-07 23:23:51','0000-00-00 00:00:00'),
	(166,'moonctp@gmail.com','698f6173bb4378ee5bda0e857a819419',5,'','','paying','active',0,'2017-02-08 11:43:10','2017-02-08 11:43:38'),
	(167,'','',5,'500c63c1c15e2c33c5150f568f9b35e6','','free_trial','active',0,'2017-02-08 22:18:18','0000-00-00 00:00:00'),
	(168,'','',5,'6050879f71a74ccc07dc2cc9147976c0','','free_trial','active',0,'2017-02-08 23:27:25','0000-00-00 00:00:00'),
	(169,'','',5,'fa8f6c94e66858fdc0209090d6eed36a','','free_trial','active',0,'2017-02-09 14:07:59','0000-00-00 00:00:00'),
	(170,'','',5,'55776797add8d55c91835fc0a1f21e5a','','free_trial','active',0,'2017-02-10 14:13:28','0000-00-00 00:00:00'),
	(171,'','',5,'0d44f4dcf5cb093d5966bc38ebe2aab2','','free_trial','active',0,'2017-02-10 15:29:18','0000-00-00 00:00:00'),
	(172,'','',5,'e1f5f1df077ee4e1a1f6ddcde45cad3c','','free_trial','active',0,'2017-02-10 15:33:06','0000-00-00 00:00:00'),
	(173,'','',5,'79455541c61393743050d1bed98e4ac1','','free_trial','active',0,'2017-02-10 16:29:00','0000-00-00 00:00:00'),
	(174,'','',5,'7665da55c700a2a253118a3ab3f46f5c','','free_trial','active',0,'2017-02-10 17:50:54','0000-00-00 00:00:00'),
	(175,'','',5,'469a7af0946bc6b641286fa445e02f3f','','free_trial','active',0,'2017-02-10 17:51:10','0000-00-00 00:00:00'),
	(176,'','',5,'b4269c3388c61585d0a85c12ee64a401','','free_trial','active',0,'2017-02-10 17:51:29','0000-00-00 00:00:00'),
	(177,'','',5,'2cb4304c8f39da56733157f7a11b7134','','free_trial','active',0,'2017-02-10 17:51:44','0000-00-00 00:00:00'),
	(178,'','',5,'c9931adf79fa5e2456fddfcee3adda73','','free_trial','active',0,'2017-02-10 17:52:00','0000-00-00 00:00:00'),
	(179,'','',5,'79fe3932eeed27889b4275db9f947b0e','','free_trial','active',0,'2017-02-10 18:04:27','0000-00-00 00:00:00'),
	(180,'','',5,'f3d1a6d912e06e7be58edfbeb615298b','','free_trial','active',0,'2017-02-10 18:04:49','0000-00-00 00:00:00'),
	(181,'','',5,'4c2b1c11192bec9e7006e0d29f914fe4','','free_trial','active',0,'2017-02-10 18:05:09','0000-00-00 00:00:00'),
	(182,'','',5,'bc748ded00a16fcb99be2ce6e05cfa15','','free_trial','active',0,'2017-02-10 18:05:22','0000-00-00 00:00:00'),
	(183,'','',5,'a2509eeb71b117371fe2db052e88b659','','free_trial','active',0,'2017-02-10 18:05:36','0000-00-00 00:00:00'),
	(184,'','',5,'cf02ebe80283ecc531b9971da452a7b6','','free_trial','active',0,'2017-02-10 18:05:48','0000-00-00 00:00:00'),
	(185,'','',5,'2236b565a99a782e39f6dd30ad8d1b03','','free_trial','active',0,'2017-02-10 18:06:05','0000-00-00 00:00:00'),
	(186,'','',5,'2347e4e4b84582a0a13406ef2455fa2d','','free_trial','active',0,'2017-02-11 00:39:00','0000-00-00 00:00:00'),
	(187,'','',5,'7f543095ae75ea4711c434ecd353888e','','free_trial','active',0,'2017-02-11 00:52:13','0000-00-00 00:00:00'),
	(188,'','',5,'299a793d5fb7db36fbaef16cbd7ce882','','free_trial','active',0,'2017-02-11 14:21:17','0000-00-00 00:00:00'),
	(189,'','',5,'a0b056040f12b987660937ef5e72df95','','free_trial','active',0,'2017-02-11 16:36:37','0000-00-00 00:00:00'),
	(190,'','',5,'dcb4c60215f184181caa53baaaaebeb3','','free_trial','active',0,'2017-02-11 17:34:10','0000-00-00 00:00:00'),
	(191,'','',5,'4e7dac3aedbc5f0fc02976e94e0c063a','','free_trial','active',0,'2017-02-12 14:39:58','0000-00-00 00:00:00'),
	(192,'','',5,'b1f13f169401712cc01266f9e4e1b5ce','','free_trial','active',0,'2017-02-12 16:02:32','0000-00-00 00:00:00'),
	(193,'','',5,'5386dadc3750e67f56e1d16ea7259849','','free_trial','active',0,'2017-02-12 19:35:35','0000-00-00 00:00:00'),
	(194,'','',5,'960ae96cddc6e6b9cf81ba2d303629d8','','free_trial','active',0,'2017-02-12 23:06:10','0000-00-00 00:00:00'),
	(195,'','',5,'0f71a446e4757a6efe967165732d1fee','','free_trial','active',0,'2017-02-13 01:24:41','0000-00-00 00:00:00'),
	(196,'bill@gmail.com','25d55ad283aa400af464c76d713c07ad',5,'7845b99b4d18eb6f0c5e4d69b8cd7645','','paying','active',0,'2017-02-13 17:37:46','2017-02-13 17:40:18'),
	(197,'','',5,'a841291d0084a5d3dedcaecfc19395e1','','free_trial','active',0,'2017-02-13 20:27:35','0000-00-00 00:00:00'),
	(198,'dennis','25d55ad283aa400af464c76d713c07ad',1,'fba4a711a96008ea7c0c308013cc1cf3','','paying','active',0,'2017-02-13 20:27:50','2017-02-21 11:07:30'),
	(199,'','',5,'f749b7df092d71b961a902477e618729','','free_trial','active',0,'2017-02-13 23:50:13','0000-00-00 00:00:00'),
	(200,'','',5,'d30def67eaec8a92c50794ba043a4d5a','','free_trial','active',0,'2017-02-14 08:54:43','0000-00-00 00:00:00'),
	(201,'','',5,'3f4205b65d17ee54e091327460b12d6b','','free_trial','active',0,'2017-02-14 10:42:55','0000-00-00 00:00:00'),
	(202,'rrmz@xing886.uu.gl','d0544a2974d464ba3cc31cf65c31b664',4,'','','paying','active',0,'2017-02-14 14:49:12','2017-02-14 14:50:09'),
	(203,'ad@gmadsi.com','21f31943a89f875264caac435beabcb6',5,'','','paying','non-active',0,'2017-02-14 15:04:27','0000-00-00 00:00:00'),
	(204,'','',5,'3f3d6bc66712916e6e7e1ffa65a9939f','','free_trial','active',0,'2017-02-14 15:48:32','0000-00-00 00:00:00'),
	(205,'','',5,'323a5b8d752399aa0debcb928b47ea59','','free_trial','active',0,'2017-02-14 16:26:07','0000-00-00 00:00:00'),
	(206,'','',5,'eea309b306af09e24069d405486409b6','','free_trial','active',0,'2017-02-14 17:13:22','0000-00-00 00:00:00'),
	(207,'','',5,'11559d729b2f8a6bba8da77bd79542d8','','free_trial','active',0,'2017-02-14 18:01:59','0000-00-00 00:00:00'),
	(208,'','',5,'99e78fb4bc391e1bd2787aaf8b277419','','free_trial','active',0,'2017-02-14 18:57:52','0000-00-00 00:00:00'),
	(209,'','',5,'d32914bfbd7ce9771756aa15621b12b1','','free_trial','active',0,'2017-02-14 21:11:02','0000-00-00 00:00:00'),
	(210,'','',5,'e70a855e9fda89b439626ede38ff611f','','free_trial','active',0,'2017-02-15 19:29:09','0000-00-00 00:00:00'),
	(211,'','',5,'9942680d1bb5cbb31aa8f01b90f2edde','','free_trial','active',0,'2017-02-15 19:29:19','0000-00-00 00:00:00'),
	(212,'','',5,'f3b0a2af38f423ecba77a26cbee87610','','free_trial','active',0,'2017-02-15 19:31:39','0000-00-00 00:00:00'),
	(213,'','',5,'3968ba65679acaca4220bf0bf9c319c8','','free_trial','active',0,'2017-02-15 19:31:50','0000-00-00 00:00:00'),
	(214,'','',5,'89b25b8676d6cd591519a60bb70b70d4','','free_trial','active',0,'2017-02-15 19:32:00','0000-00-00 00:00:00'),
	(215,'','',5,'615c5b9f5b28544440fb4b86be99150d','','free_trial','active',0,'2017-02-16 00:15:20','0000-00-00 00:00:00'),
	(216,'','',5,'6047a57ab8e7cda52095b57aba3cf1a3','','free_trial','active',0,'2017-02-16 17:09:12','0000-00-00 00:00:00'),
	(217,'','',5,'f3e2125ea927dc53a6d37be71960f176','','free_trial','active',0,'2017-02-16 18:44:44','0000-00-00 00:00:00'),
	(218,'','',5,'51132a7d04d009d470527d4c0a586092','','free_trial','active',0,'2017-02-16 19:54:47','0000-00-00 00:00:00'),
	(219,'','',5,'a0186f26e231edf54471d1feb0b506ed','','free_trial','active',0,'2017-02-16 20:46:49','0000-00-00 00:00:00'),
	(220,'','',5,'d86c76ab55094128946dd5c04de36ac5','','free_trial','active',0,'2017-02-16 23:26:37','0000-00-00 00:00:00'),
	(221,'','',5,'986f83a631f154de54913db41286c7c4','','free_trial','active',0,'2017-02-17 14:14:16','0000-00-00 00:00:00'),
	(222,'','',5,'dcc68165f7c3e25052dd68275ca12937','','free_trial','active',0,'2017-02-17 18:23:29','0000-00-00 00:00:00'),
	(223,'','',5,'f5b63406ef66d8d6e7a237d56eea621f','','free_trial','active',0,'2017-02-17 20:25:31','0000-00-00 00:00:00'),
	(224,'','',5,'48970d96af039af12103ffd84e4ac340','','free_trial','active',0,'2017-02-17 20:25:45','0000-00-00 00:00:00'),
	(225,'','',5,'a68acc2ec6ee34f7f74ca6f2771ce53d','','free_trial','active',0,'2017-02-17 20:26:36','0000-00-00 00:00:00'),
	(226,'','',5,'ceb3543a55f8de6782f4055de1d0dec9','','free_trial','active',0,'2017-02-17 20:26:47','0000-00-00 00:00:00'),
	(227,'','',5,'41a7d570922a6b06eaf8f35dbc97f04d','','free_trial','active',0,'2017-02-17 20:29:01','0000-00-00 00:00:00'),
	(228,'','',5,'b554e7c11699f2757d46f666ad954431','','free_trial','active',0,'2017-02-17 20:30:59','0000-00-00 00:00:00'),
	(229,'','',5,'14aba339f68e06abc7b2c143240d298d','','free_trial','active',0,'2017-02-17 20:36:27','0000-00-00 00:00:00'),
	(230,'','',5,'8c6a9382894a71d46a866dd9ac6317fb','','free_trial','active',0,'2017-02-17 20:38:43','0000-00-00 00:00:00'),
	(231,'','',5,'69a5b6ef5c921e168a366f1efc43e60a','','free_trial','active',0,'2017-02-17 20:43:26','0000-00-00 00:00:00'),
	(232,'','',5,'418844870ce60b5bcedfc00cf6e5374b','','free_trial','active',0,'2017-02-17 20:43:44','0000-00-00 00:00:00'),
	(233,'','',5,'7667aff19a446ed8dac7bbb37cfd6a22','','free_trial','active',0,'2017-02-17 22:38:29','0000-00-00 00:00:00'),
	(234,'','',5,'7ecc0848d7d3a4b423814df72858b57e','','free_trial','active',0,'2017-02-17 22:38:40','0000-00-00 00:00:00'),
	(235,'','',5,'1613db136cad7321ab9965fe3b690ab8','','free_trial','active',0,'2017-02-17 22:38:52','0000-00-00 00:00:00'),
	(236,'','',5,'f1e2b9549e612d7e2bc28c5988bd5ff4','','free_trial','active',0,'2017-02-17 22:40:06','0000-00-00 00:00:00'),
	(237,'','',5,'ef30dcf229a182fd0bf64215e58e4f1c','','free_trial','active',0,'2017-02-17 22:54:40','0000-00-00 00:00:00'),
	(238,'','',5,'37adac590b85a51b7c59e9e44598e069','','free_trial','active',0,'2017-02-17 22:54:48','0000-00-00 00:00:00'),
	(239,'','',5,'536a7d0582bfd6ad12b5fba809cb3856','','free_trial','active',0,'2017-02-17 22:54:56','0000-00-00 00:00:00'),
	(240,'','',5,'792fe006f25c7e6242d5133458a9c3ae','','free_trial','active',0,'2017-02-18 01:09:46','0000-00-00 00:00:00'),
	(241,'','',5,'50c8c96d9946bf184c45cc7232e4337a','','free_trial','active',0,'2017-02-18 01:12:31','0000-00-00 00:00:00'),
	(242,'','',5,'7d30c5cfb8803f9d2221d66e3ef826d0','','free_trial','active',0,'2017-02-18 12:05:13','0000-00-00 00:00:00'),
	(243,'','',5,'86b0ee3f33e801fd0046caacf2d1f39e','','free_trial','active',0,'2017-02-18 16:17:42','0000-00-00 00:00:00'),
	(244,'','',5,'41e3513d4d81efd1b1f14b879d8d77f9','','free_trial','active',0,'2017-02-18 16:26:36','0000-00-00 00:00:00'),
	(245,'test1@whoami.pw','25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-02-18 17:44:17','2017-02-18 17:47:37'),
	(246,'','',5,'b287d1e23c9127090a18cd4b50023b44','','free_trial','active',0,'2017-02-18 20:43:14','0000-00-00 00:00:00'),
	(247,'','',5,'ccd2b22e81546e922ff2bc9ae5e5ab14','','free_trial','active',0,'2017-02-18 21:35:53','0000-00-00 00:00:00'),
	(248,'dquu@o.idigo.org','dd4b21e9ef71e1291183a46b913ae6f2',5,'','','paying','active',0,'2017-02-18 22:22:28','2017-02-18 22:23:36'),
	(249,'','',5,'ff7af32c40ebd7aa575e68ff94a18eb1','','free_trial','active',0,'2017-02-18 23:06:29','0000-00-00 00:00:00'),
	(250,'','',5,'1c893a9a782fb5f0eeac9c6c70c389b9','','free_trial','active',0,'2017-02-19 08:02:56','0000-00-00 00:00:00'),
	(251,'','',5,'a41647556a3fa382f1c25141cc5c823c','','free_trial','active',0,'2017-02-19 11:08:58','0000-00-00 00:00:00'),
	(252,'','',5,'1d2af2c33bb4e4d7cbf62f26b3d12d3b','','free_trial','active',0,'2017-02-19 11:21:44','0000-00-00 00:00:00'),
	(253,'','',5,'5cf21a694348602dc6285a5d2f9f315d','','free_trial','active',0,'2017-02-19 15:44:13','0000-00-00 00:00:00'),
	(254,'','',5,'1c5e903c82ecc2003cef2c07bac7bdd5','','free_trial','active',0,'2017-02-19 15:44:25','0000-00-00 00:00:00'),
	(255,'','',5,'1885d290fd7f0bd329a650d29f5b40ee','','free_trial','active',0,'2017-02-19 16:23:57','0000-00-00 00:00:00'),
	(256,'','',5,'6a4a1724f95ad59b093d4c82df65891e','','free_trial','active',0,'2017-02-19 17:26:22','0000-00-00 00:00:00'),
	(257,'','',5,'3bcb13e8068e9fd6e5436d554ab514db','','free_trial','active',0,'2017-02-20 00:38:49','0000-00-00 00:00:00'),
	(258,'','',5,'aa1c47c2bcf1af8441249c0704eda8b4','','free_trial','active',0,'2017-02-20 14:43:16','0000-00-00 00:00:00'),
	(259,'','',5,'2bc778adf7c5c481149b2d49e4959125','','free_trial','active',0,'2017-02-20 14:43:34','0000-00-00 00:00:00'),
	(260,'','',5,'a0ba96afaad7ef774b1dba44087cc8aa','','free_trial','active',0,'2017-02-20 14:43:45','0000-00-00 00:00:00'),
	(261,'','',5,'de654de3bde825b28b55cfe30c4b2596','','free_trial','active',0,'2017-02-20 14:43:55','0000-00-00 00:00:00'),
	(262,'','',5,'dd304fdfbd9f944808636e510badc0cf','','free_trial','active',0,'2017-02-20 14:44:02','0000-00-00 00:00:00'),
	(263,'','',5,'3650445a7c9f862fca608339de531452','','free_trial','active',0,'2017-02-20 14:44:10','0000-00-00 00:00:00'),
	(264,'','',5,'f45bfae6b5114a2f9e5a97ee80f1a1c4','','free_trial','active',0,'2017-02-20 14:44:20','0000-00-00 00:00:00'),
	(265,'','',5,'23330e3e46c184b63720723f25b1803b','','free_trial','active',0,'2017-02-20 14:44:30','0000-00-00 00:00:00'),
	(266,'','',5,'6ed172ad7ab5136cb2ef209b0e0c2545','','free_trial','active',0,'2017-02-20 14:44:38','0000-00-00 00:00:00'),
	(267,'','',5,'87917542822a41457904e4d585d62628','','free_trial','active',0,'2017-02-20 14:44:48','0000-00-00 00:00:00'),
	(268,'','',5,'7c76069abaece49f6c3c9f116b0f79d8','','free_trial','active',0,'2017-02-20 18:51:48','0000-00-00 00:00:00'),
	(269,'','',5,'690d5eb3108801a9cb92cc82356038e6','','free_trial','active',0,'2017-02-20 20:19:32','0000-00-00 00:00:00'),
	(270,'','',5,'c8601dd2d08be680c4e8b352ba7518e8','','free_trial','active',0,'2017-02-20 21:21:29','0000-00-00 00:00:00'),
	(271,'','',5,'0b81c4358be8133856cfb8740603ad62','','free_trial','active',0,'2017-02-20 22:19:45','0000-00-00 00:00:00'),
	(272,'','',5,'77e528e5bcd5fac7d86e596afd9f5465','','free_trial','active',0,'2017-02-20 22:19:56','0000-00-00 00:00:00'),
	(273,'','',5,'c55f3cd7c85cde0d3459b20c728670bc','','free_trial','active',0,'2017-02-20 23:19:19','0000-00-00 00:00:00'),
	(274,'','',5,'12c259c08921c5f092edcf64abeeaffe','','free_trial','active',0,'2017-02-20 23:24:11','0000-00-00 00:00:00'),
	(275,'demo1','25d55ad283aa400af464c76d713c07ad',5,'336f9ca37df6cd467e03a35ee99e9796','','paying','active',0,'2017-02-20 23:35:44','2017-02-28 15:34:05'),
	(276,'demo2','25d55ad283aa400af464c76d713c07ad',5,'351937adf2bc9b97b08570d603750357','','paying','active',0,'2017-02-20 23:35:46','2017-02-28 15:34:05'),
	(277,'demo3','25d55ad283aa400af464c76d713c07ad',5,'d9e373aae938b972131c3d2ffeb6812b','','paying','active',0,'2017-02-20 23:35:53','2017-02-28 15:34:05'),
	(278,'demo4','25d55ad283aa400af464c76d713c07ad',5,'a2e2d83387b7d11e7f4e3c894033de61','','paying','active',0,'2017-02-20 23:35:56','2017-02-28 15:28:32'),
	(279,'demo5','25d55ad283aa400af464c76d713c07ad',1,'1ee0fbddcd8adbacc536636f9480e3d0','','paying','active',0,'2017-02-20 23:35:58','2017-02-20 23:36:51'),
	(280,'demo6','25d55ad283aa400af464c76d713c07ad',1,'7d7a2b1e59f4a10d3d29ffe28123fc36','','paying','active',0,'2017-02-20 23:36:01','2017-02-20 23:36:50'),
	(281,'demo11','25d55ad283aa400af464c76d713c07ad',1,'b591ce75aeb6cf49fc6bfa4bfc45ac6d','','paying','active',0,'2017-02-20 23:37:00','2017-02-20 23:37:50'),
	(282,'demo22','25d55ad283aa400af464c76d713c07ad',1,'cec8b98c0470edba7374217f58cf42e8','','paying','active',0,'2017-02-20 23:37:02','2017-02-20 23:37:50'),
	(283,'demo33','25d55ad283aa400af464c76d713c07ad',1,'22da1082499d1b2e27a99b85671f7e0b','','paying','active',0,'2017-02-20 23:37:05','2017-02-20 23:37:51'),
	(284,'demo44','25d55ad283aa400af464c76d713c07ad',1,'bbdc284aa1e56a266e942a7f6a8949a7','','paying','active',0,'2017-02-20 23:37:07','2017-02-20 23:37:51'),
	(285,'demo55','25d55ad283aa400af464c76d713c07ad',1,'0e1a0340c13bd1b58facb1ab5cad1934','','paying','active',0,'2017-02-20 23:37:10','2017-02-20 23:37:52'),
	(286,'demo66','25d55ad283aa400af464c76d713c07ad',1,'996fbbd37a31a8770e55465b0000bc4e','','paying','active',0,'2017-02-20 23:37:12','2017-02-20 23:37:52'),
	(287,'','',5,'2c9591403355f08066acfaa7ffb713d1','','free_trial','active',0,'2017-02-21 00:14:12','0000-00-00 00:00:00'),
	(288,'','',5,'4b9a5e9b12642c7a628b030e52b45840','','free_trial','active',0,'2017-02-21 00:16:03','0000-00-00 00:00:00'),
	(289,'','',5,'3c21fe50e688a30652676f5155c48c0f','','free_trial','active',0,'2017-02-21 09:21:04','0000-00-00 00:00:00'),
	(290,'','',5,'9aec9344441a81473393fc3976335a7a','','free_trial','active',0,'2017-02-21 09:40:02','0000-00-00 00:00:00'),
	(291,'','',5,'9f1c343d5872d71ed891bb77909aaabf','','free_trial','active',0,'2017-02-21 10:00:57','0000-00-00 00:00:00'),
	(292,'','',5,'85d0d78173447113e318d17d703b203e','','free_trial','active',0,'2017-02-21 10:01:05','0000-00-00 00:00:00'),
	(293,'','',5,'247a7b342799128b248a919294d2b57b','','free_trial','active',0,'2017-02-21 10:01:15','0000-00-00 00:00:00'),
	(294,'','',5,'4a201875bce8c60e69c912bd1d7bd320','','free_trial','active',0,'2017-02-21 10:01:22','0000-00-00 00:00:00'),
	(295,'','',5,'3016c9c718258ba987e4110c5cc9814c','','free_trial','active',0,'2017-02-21 14:31:09','0000-00-00 00:00:00'),
	(296,'','',5,'a76a41cde5d61f75317b3c9b793df526','','free_trial','active',0,'2017-02-21 14:42:32','0000-00-00 00:00:00'),
	(297,'','',5,'f691e7d0f3b15bb0b03dd363c736c3c3','','free_trial','active',0,'2017-02-21 14:54:59','0000-00-00 00:00:00'),
	(298,'','',5,'cc1fd69f2d9793745789c712df516d3c','','free_trial','active',0,'2017-02-21 15:03:14','0000-00-00 00:00:00'),
	(299,'','',5,'1bf98420a1c0a93d79a009f94a7a54de','','free_trial','active',0,'2017-02-21 15:03:28','0000-00-00 00:00:00'),
	(300,'','',5,'4e919c13c3639c8e5d8fba0da70b2fe6','','free_trial','active',0,'2017-02-21 15:03:46','0000-00-00 00:00:00'),
	(301,'','',5,'c4dda9c0098835badbb26e860263c8ba','','free_trial','active',0,'2017-02-21 15:03:57','0000-00-00 00:00:00'),
	(302,'','',5,'5313ca96749383180b4a18d8df4637b9','','free_trial','active',0,'2017-02-21 15:04:09','0000-00-00 00:00:00'),
	(303,'','',5,'f839d6c959eecf9c6110e76b07fbac8f','','free_trial','active',0,'2017-02-21 15:04:18','0000-00-00 00:00:00'),
	(304,'','',5,'e4bd18acba7b39cbda666ace61d0ed6d','','free_trial','active',0,'2017-02-21 15:04:27','0000-00-00 00:00:00'),
	(305,'','',5,'3bf3dfce84a95e2de1aa69a59726f441','','free_trial','active',0,'2017-02-21 15:04:36','0000-00-00 00:00:00'),
	(306,'','',5,'43967200d00de2f3e4b93f1616283ad9','','free_trial','active',0,'2017-02-21 15:04:44','0000-00-00 00:00:00'),
	(307,'','',5,'5fb28a9da6916e1b14eb0ff861ba4865','','free_trial','active',0,'2017-02-21 15:36:28','0000-00-00 00:00:00'),
	(308,'uktest','25d55ad283aa400af464c76d713c07ad',5,'814c0cb502c7894a365627acd6a334a3','','paying','active',0,'2017-02-21 16:52:34','2017-02-21 16:54:38'),
	(309,'','',5,'125bde7501c3bfff8322c26038b05b25','','free_trial','active',0,'2017-02-21 17:33:22','0000-00-00 00:00:00'),
	(310,'','',5,'03e95a8ed0e9468fe37b8a9651978b47','','free_trial','active',0,'2017-02-21 21:18:24','0000-00-00 00:00:00'),
	(311,'','',5,'5e9f2a9e1e86828fda0ee583c9b93f50','','free_trial','active',0,'2017-02-21 21:22:44','0000-00-00 00:00:00'),
	(312,'','',5,'9a625d60116ab16b7cd7c2b41e8e8a95','','free_trial','active',0,'2017-02-21 21:26:30','0000-00-00 00:00:00'),
	(313,'','',5,'ce7ce9a483689e9d7618f9c0013b7398','','free_trial','active',0,'2017-02-21 22:52:30','0000-00-00 00:00:00'),
	(314,'','',5,'e448b39759f9421d84efdfdd1c3c0574','','free_trial','active',0,'2017-02-21 22:54:35','0000-00-00 00:00:00'),
	(315,'','',5,'6d97000675ed6cce9086be99c7b755e3','','free_trial','active',0,'2017-02-21 22:54:52','0000-00-00 00:00:00'),
	(316,'','',5,'cad1bdcdbd82ea11b426378fee5e46f9','','free_trial','active',0,'2017-02-21 22:55:02','0000-00-00 00:00:00'),
	(317,'','',5,'44392c095ddfa61a2468d971ef370069','','free_trial','active',0,'2017-02-21 22:55:12','0000-00-00 00:00:00'),
	(318,'','',5,'607e4cb06fa0aa4d97ae4fefc057aa56','','free_trial','active',0,'2017-02-21 22:55:27','0000-00-00 00:00:00'),
	(319,'','',5,'c089e094eb0f94c68d35f05985a46131','','free_trial','active',0,'2017-02-21 22:55:38','0000-00-00 00:00:00'),
	(320,'','',5,'d6cd8e4443230054ad571dafed805b44','','free_trial','active',0,'2017-02-21 23:09:59','0000-00-00 00:00:00'),
	(321,'','',5,'141bb288a82132291d748f9fd05c9355','','free_trial','active',0,'2017-02-21 23:16:25','0000-00-00 00:00:00'),
	(322,'','',5,'638caa067decccf310b16ade46588e29','','free_trial','active',0,'2017-02-21 23:29:03','0000-00-00 00:00:00'),
	(323,'','',5,'c93939f303769b10d797e443748f1b9f','','free_trial','active',0,'2017-02-21 23:29:14','0000-00-00 00:00:00'),
	(324,'','',5,'8ce031ddeae51e4e7195e29c24382b80','','free_trial','active',0,'2017-02-21 23:29:25','0000-00-00 00:00:00'),
	(325,'','',5,'7625311a29541048958aa12a2f8ad9d4','','free_trial','active',0,'2017-02-21 23:32:09','0000-00-00 00:00:00'),
	(326,'','',5,'4d11e550ac5e03991fe15c4d871baf26','','free_trial','active',0,'2017-02-22 09:40:29','0000-00-00 00:00:00'),
	(327,'','',5,'e3903a0170813df10c80d7f0d85d5bb2','','free_trial','active',0,'2017-02-22 19:55:57','0000-00-00 00:00:00'),
	(328,'','',5,'cdf74b07415e61fb748d8c347309b626','','free_trial','active',0,'2017-02-23 16:27:46','0000-00-00 00:00:00'),
	(329,'','',5,'8fed5e004c4d748cd68c03546723b200','','free_trial','active',0,'2017-02-23 16:57:11','0000-00-00 00:00:00'),
	(330,'','',5,'bad7532953ae92ccd08f02be2616df7f','','free_trial','active',0,'2017-02-24 01:20:21','0000-00-00 00:00:00'),
	(331,'','',5,'f84439aa03f3fe17058b305a3d7ea1b1','','free_trial','active',0,'2017-02-24 02:23:02','0000-00-00 00:00:00'),
	(332,'','',5,'6288e36fb2dd7bcd836a26f5f9c466c0','','free_trial','active',0,'2017-02-24 17:35:00','0000-00-00 00:00:00'),
	(333,'','',5,'765d3ededb56156443e9d3da338a5506','','free_trial','active',0,'2017-02-24 17:35:09','0000-00-00 00:00:00'),
	(334,'','',5,'215089c5e13d7201f3cc44ed20294434','','free_trial','active',0,'2017-02-24 19:05:07','0000-00-00 00:00:00'),
	(335,'','',5,'db875c07159112bfd155ad44a293c714','','free_trial','active',0,'2017-02-24 19:05:17','0000-00-00 00:00:00'),
	(336,'','',5,'7e4d0b6570b6dc3b6df11ebf10fe2d56','','free_trial','active',0,'2017-02-24 19:37:30','0000-00-00 00:00:00'),
	(337,'','',5,'0b5b8a1a6b7ef706bc0b30325a9b8c8c','','free_trial','active',0,'2017-02-24 19:37:50','0000-00-00 00:00:00'),
	(338,'','',5,'afe8753c8680e6d0b47df6a07698c8c2','','free_trial','active',0,'2017-02-25 13:58:22','0000-00-00 00:00:00'),
	(339,'','',5,'e086503b065ff9ab7a024e462863cfa3','','free_trial','active',0,'2017-02-25 19:45:02','0000-00-00 00:00:00'),
	(340,'','',5,'903b815bcd78b0274787f9513d8034f7','','free_trial','active',0,'2017-02-25 21:56:09','0000-00-00 00:00:00'),
	(341,'','',5,'bb591f9f98b836f717d1fad62f9bc0d8','','free_trial','active',0,'2017-02-26 12:38:27','0000-00-00 00:00:00'),
	(342,'','',5,'1ebdbb8611684546f849e5cab8884bad','','free_trial','active',0,'2017-02-26 13:27:02','0000-00-00 00:00:00'),
	(343,'','',5,'1871a4ad9e4ca366e7bfc0bd71786e8e','','free_trial','active',0,'2017-02-26 13:27:14','0000-00-00 00:00:00'),
	(344,'','',5,'7ca19b6fc8419488414825e2ede873e2','','free_trial','active',0,'2017-02-26 13:27:27','0000-00-00 00:00:00'),
	(345,'','',5,'52cfb2dc0c25c861b8b6dab5993b5f05','','free_trial','active',0,'2017-02-26 13:27:39','0000-00-00 00:00:00'),
	(346,'','',5,'205c8f197b7b18c610d3c13eb9b26c1e','','free_trial','active',0,'2017-02-26 13:27:48','0000-00-00 00:00:00'),
	(347,'','',5,'1d94b62c20b05e330b328877a0831e6e','','free_trial','active',0,'2017-02-26 13:27:58','0000-00-00 00:00:00'),
	(348,'','',5,'63691b0cca1d69524300275a926674e4','','free_trial','active',0,'2017-02-26 13:28:19','0000-00-00 00:00:00'),
	(349,'','',5,'960a4a8010fb28ebaf9188245988916c','','free_trial','active',0,'2017-02-26 13:28:29','0000-00-00 00:00:00'),
	(350,'','',5,'560f5c59cfa0c59617ef6b2cf95e07f5','','free_trial','active',0,'2017-02-26 13:28:47','0000-00-00 00:00:00'),
	(351,'','',5,'46125ece9c56e30f9beb5b9e17c50793','','free_trial','active',0,'2017-02-26 13:28:58','0000-00-00 00:00:00'),
	(352,'','',5,'1a87c281c587548a4474d8c6c28d137c','','free_trial','active',0,'2017-02-26 13:29:13','0000-00-00 00:00:00'),
	(353,'','',5,'16fdc189262b8c2f06ad126627e8e2e8','','free_trial','active',0,'2017-02-26 13:29:22','0000-00-00 00:00:00'),
	(354,'','',5,'e758ea048c068405b70c99a3a074229e','','free_trial','active',0,'2017-02-26 13:29:31','0000-00-00 00:00:00'),
	(355,'','',5,'864990cae1b6930aeaa7302e2698ea04','','free_trial','active',0,'2017-02-26 13:29:41','0000-00-00 00:00:00'),
	(356,'','',5,'5ea3d977f57f171816e1816f38a12158','','free_trial','active',0,'2017-02-26 17:04:45','0000-00-00 00:00:00'),
	(357,'','',5,'223b370f5d1ba688363aab10505912cd','','free_trial','active',0,'2017-02-26 21:15:54','0000-00-00 00:00:00'),
	(358,'','',5,'07e7e62746c55d9b6900cd599a3a135f','','free_trial','active',0,'2017-02-26 21:19:13','0000-00-00 00:00:00'),
	(359,'','',5,'c69efccb57d5c729cf02df74700a83ab','','free_trial','active',0,'2017-02-26 23:46:41','0000-00-00 00:00:00'),
	(360,'','',5,'7fdfa86c52953249d1d8d7d8480e35d9','','free_trial','active',0,'2017-02-27 06:34:27','0000-00-00 00:00:00'),
	(361,'','',5,'6877d26ba81872830040af46a81f28f2','','free_trial','active',0,'2017-02-27 09:42:30','0000-00-00 00:00:00'),
	(362,'','',5,'29410da59683ea38f6e126e8f7b7aa7e','','free_trial','active',0,'2017-02-27 09:44:11','0000-00-00 00:00:00'),
	(363,'','',5,'bb64e11c45339a57a4b6e9e90f31fac6','','free_trial','active',0,'2017-02-27 09:46:30','0000-00-00 00:00:00'),
	(364,'','',5,'2d6c049c1582aa1e5795f2ee7500cfe2','','free_trial','active',0,'2017-02-27 14:05:42','0000-00-00 00:00:00'),
	(365,'','',5,'51707b8450311b3939ea3076f3f1a68f','','free_trial','active',0,'2017-02-27 14:06:14','0000-00-00 00:00:00'),
	(366,'','',5,'9756e2c972832cc2f392ad94a5d23fb4','','free_trial','active',0,'2017-02-27 14:36:39','0000-00-00 00:00:00'),
	(367,'','',5,'db95b247328820cb9fa5ae17bb42467d','','free_trial','active',0,'2017-02-27 14:57:18','0000-00-00 00:00:00'),
	(368,'','',5,'8691afb77aa7dad73788ed0c4301c546','','free_trial','active',0,'2017-02-27 15:52:33','0000-00-00 00:00:00'),
	(369,'','',5,'9c5c6d0724fc8ebaa559dfae0aa5adbb','','free_trial','active',0,'2017-02-27 15:53:48','0000-00-00 00:00:00'),
	(370,'','',5,'c5426ed69601dcbf0f8e028d5d927e89','','free_trial','active',0,'2017-02-27 16:27:35','0000-00-00 00:00:00'),
	(371,'','',5,'a9e38a580e2d56a53d88fbe6e3eec866','','free_trial','active',0,'2017-02-27 19:12:56','0000-00-00 00:00:00'),
	(372,'','',5,'ad4f4b2c8cdf351df756a867027b1bac','','free_trial','active',0,'2017-02-28 00:04:48','0000-00-00 00:00:00'),
	(373,'','',5,'eeb6242db626af15ea72849ec3a094b1','','free_trial','active',0,'2017-02-28 00:49:22','0000-00-00 00:00:00'),
	(374,'','',5,'5c5de7e02799db2f0c888078ef61a86a','','free_trial','active',0,'2017-02-28 01:22:18','0000-00-00 00:00:00'),
	(375,'','',5,'720894b679416f197ee87aec68bc792d','','free_trial','active',0,'2017-02-28 07:36:15','0000-00-00 00:00:00'),
	(376,'','',5,'af1395dacf149ac7e3fafb64b98ffe21','','free_trial','active',0,'2017-02-28 08:52:15','0000-00-00 00:00:00'),
	(377,'','',5,'bb0c852ceba4062ac63491deece2e827','','free_trial','active',0,'2017-02-28 09:07:06','0000-00-00 00:00:00'),
	(378,'','',5,'4b8b89b1c0771167e6bb29ddf97893e0','','free_trial','active',0,'2017-02-28 10:56:28','0000-00-00 00:00:00'),
	(379,'','',5,'4a171a702af9794f6c941e2fe462ff09','','free_trial','active',0,'2017-02-28 11:15:59','0000-00-00 00:00:00'),
	(380,'','',5,'5b2ca4510695575de342cd990fcf7b36','','free_trial','active',0,'2017-02-28 13:57:53','0000-00-00 00:00:00'),
	(381,'furlong1','25d55ad283aa400af464c76d713c07ad',5,'1c21c5683cb83995202273960072dc8f','','paying','active',0,'2017-02-28 15:29:28','2017-02-28 15:30:39'),
	(382,'furlong2','25d55ad283aa400af464c76d713c07ad',5,'1da37c619a8860b80ecc6268b5c48126','','paying','active',0,'2017-02-28 15:30:14','2017-02-28 15:30:39'),
	(383,'tkou@vssms.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-02-28 17:17:12','2017-02-28 17:17:48'),
	(384,'xemkr@xww.ro','5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-02-28 17:18:53','2017-02-28 17:19:09'),
	(385,'','',5,'0e5b0b8527bc78c0feb08ed8f9d626b0','','free_trial','active',0,'2017-02-28 17:45:33','0000-00-00 00:00:00'),
	(386,'','',5,'e941b47a9396ffa325749deac1cd173d','','free_trial','active',0,'2017-02-28 19:03:26','0000-00-00 00:00:00'),
	(387,'','',5,'4988d435878157e94b37c92fb31f968e','','free_trial','active',0,'2017-02-28 19:17:07','0000-00-00 00:00:00'),
	(388,'','',5,'c4a64cc041ebae21ab21bf0366bfdba7','','free_trial','active',0,'2017-02-28 19:17:15','0000-00-00 00:00:00'),
	(389,'','',5,'8d13404f5464b21c392c231ab205dafa','','free_trial','active',0,'2017-02-28 19:17:52','0000-00-00 00:00:00'),
	(390,'','',5,'3b309efbd756798dcb672a9c1ca1ce76','','free_trial','active',0,'2017-02-28 19:17:58','0000-00-00 00:00:00'),
	(391,'','',5,'3e8e5839bf3ec8f8819420018a265619','','free_trial','active',0,'2017-02-28 19:18:05','0000-00-00 00:00:00'),
	(392,'','',5,'727931e6991a7ce7df479082707854e8','','free_trial','active',0,'2017-02-28 19:18:14','0000-00-00 00:00:00'),
	(393,'','',5,'ee2e86f1102272cb8f1cfe27ab6676d2','','free_trial','active',0,'2017-02-28 19:18:21','0000-00-00 00:00:00'),
	(394,'','',5,'0a3b64e7560d7f05b4a2dac1c770dea5','','free_trial','active',0,'2017-02-28 21:42:56','0000-00-00 00:00:00'),
	(395,'','',5,'17acdd480131a82bbfd92a44d0313072','','free_trial','active',0,'2017-02-28 22:00:17','0000-00-00 00:00:00'),
	(396,'','',5,'ee1ace7fdfc1248d6de498a722ee6162','','free_trial','active',0,'2017-02-28 22:02:27','0000-00-00 00:00:00'),
	(397,'','',5,'94e2ae66f05f494ff4f9363146671a49','','free_trial','active',0,'2017-02-28 23:15:26','0000-00-00 00:00:00'),
	(398,'','',5,'2ea6e396b4935b15bd063f18dcfbb3ab','','free_trial','active',0,'2017-03-01 00:19:43','0000-00-00 00:00:00'),
	(399,'','',5,'965bf875e9f79616ae7163cc7bf65163','','free_trial','active',0,'2017-03-01 00:33:33','0000-00-00 00:00:00'),
	(400,'','',5,'9e68318542bd6fe30ec8a22bcfb65d71','','free_trial','active',0,'2017-03-01 00:49:31','0000-00-00 00:00:00'),
	(401,'','',5,'a5baf0833d4bc5e3529e4abb5ad5aa0b','','free_trial','active',0,'2017-03-01 00:49:48','0000-00-00 00:00:00'),
	(402,'','',5,'428d5d4473430d1b20ffbc715d25289d','','free_trial','active',0,'2017-03-01 14:37:37','0000-00-00 00:00:00'),
	(403,'','',5,'2ff9438fb1c9abdcb955109c3e165cde','','free_trial','active',0,'2017-03-01 14:44:22','0000-00-00 00:00:00'),
	(404,'','',5,'e3ef22d2c34e261cbb7a060589c12ad8','','free_trial','active',0,'2017-03-01 14:44:51','0000-00-00 00:00:00'),
	(405,'','',5,'01a58cbf7e8279737243e554c6af10e1','','free_trial','active',0,'2017-03-01 14:45:05','0000-00-00 00:00:00'),
	(406,'','',5,'0e4cbbad2862b22ba361a11c41a38962','','free_trial','active',0,'2017-03-01 17:08:04','0000-00-00 00:00:00'),
	(407,'','',5,'11c83a0f3d22d51623c3a3431bcebf74','','free_trial','active',0,'2017-03-01 17:08:47','0000-00-00 00:00:00'),
	(408,'','',5,'4e4fe703af121554b86f7a2e58341581','','free_trial','active',0,'2017-03-01 20:31:55','0000-00-00 00:00:00'),
	(409,'','',5,'2d5176597190e4ec292a63eb748873f0','','free_trial','active',0,'2017-03-01 22:18:19','0000-00-00 00:00:00'),
	(410,'','',5,'acd428fc191b03aa0db3b5b261bd4c93','','free_trial','active',0,'2017-03-01 22:53:48','0000-00-00 00:00:00'),
	(411,'','',5,'1fcea38f5144ec8bf7fd6c075e62b8f6','','free_trial','active',0,'2017-03-01 22:54:05','0000-00-00 00:00:00'),
	(412,'','',5,'fad07d61ff800ca8de632d63a76b06a8','','free_trial','active',0,'2017-03-01 22:57:21','0000-00-00 00:00:00'),
	(413,'','',5,'cd4d3c22cc8393b2e398ac671306a1d6','','free_trial','active',0,'2017-03-02 00:22:52','0000-00-00 00:00:00'),
	(414,'','',5,'51d5a49be94e0f7bc82b851564009980','','free_trial','active',0,'2017-03-02 00:43:31','0000-00-00 00:00:00'),
	(415,'','',5,'927b11354ae8a9c24e7620ae3641fefe','','free_trial','active',0,'2017-03-02 01:11:57','0000-00-00 00:00:00'),
	(416,'','',5,'236f766b92d056b5d2cda1b8a67365e8','','free_trial','active',0,'2017-03-02 02:15:03','0000-00-00 00:00:00'),
	(417,'','',5,'e033f437c7907f2ad1b053b670257892','','free_trial','active',0,'2017-03-02 08:09:33','0000-00-00 00:00:00'),
	(418,'','',5,'4abe98da80891f3636213d3051ae84da','','free_trial','active',0,'2017-03-02 09:17:11','0000-00-00 00:00:00'),
	(419,'','',5,'b041ef831b2e4acf9457a68b5f9d0151','','free_trial','active',0,'2017-03-02 13:55:07','0000-00-00 00:00:00'),
	(420,'','',5,'a9d82e9505433556b91dfb552ecdace0','','free_trial','active',0,'2017-03-02 13:56:24','0000-00-00 00:00:00'),
	(421,'','',5,'1b793af1b96bb9b8ade8449258422c5d','','free_trial','active',0,'2017-03-02 13:57:41','0000-00-00 00:00:00'),
	(422,'','',5,'2648256f18f937926107411ec0d561a3','','free_trial','active',0,'2017-03-02 13:58:34','0000-00-00 00:00:00'),
	(423,'','',5,'bcc33a6ddc971ff2c6169bf1fc9ae1b8','','free_trial','active',0,'2017-03-02 17:16:47','0000-00-00 00:00:00'),
	(424,'','',5,'e66545c4eac0baa580e69803e83e8d22','','free_trial','active',0,'2017-03-02 17:20:25','0000-00-00 00:00:00'),
	(425,'','',5,'10485435b6007e5eec3fe669096b383b','','free_trial','active',0,'2017-03-02 18:39:21','0000-00-00 00:00:00'),
	(426,'','',5,'ecf46d01a4746b342b8465099d28d984','','free_trial','active',0,'2017-03-02 19:00:44','0000-00-00 00:00:00'),
	(427,'','',5,'884b53d6abf38e7137bb7536e20ecc81','','free_trial','active',0,'2017-03-02 22:00:18','0000-00-00 00:00:00'),
	(428,'','',5,'66d118367e6ea54ba208a96dd9af024e','','free_trial','active',0,'2017-03-02 22:01:47','0000-00-00 00:00:00'),
	(429,'','',5,'b85c93bddb93baaf48223b899710ddb9','','free_trial','active',0,'2017-03-02 22:03:37','0000-00-00 00:00:00'),
	(430,'','',5,'d7f27cd5577dee1fe601b249b0ccdafe','','free_trial','active',0,'2017-03-02 22:16:15','0000-00-00 00:00:00'),
	(431,'','',5,'d3d9d0ceb40470d5a8e77b187aeb398c','','free_trial','active',0,'2017-03-02 22:18:33','0000-00-00 00:00:00'),
	(432,'','',5,'8f911ab922ba7413b860c0c212ad6f22','','free_trial','active',0,'2017-03-02 22:30:01','0000-00-00 00:00:00'),
	(433,'','',5,'fc6b84a61930aa004952c4737420c43e','','free_trial','active',0,'2017-03-02 22:51:33','0000-00-00 00:00:00'),
	(434,'','',5,'16e9ff1501be05de177e8e7df7627788','','free_trial','active',0,'2017-03-02 22:56:48','0000-00-00 00:00:00'),
	(435,'','',5,'edda0e0dbffc5fda1c6075f822452417','','free_trial','active',0,'2017-03-02 22:57:22','0000-00-00 00:00:00'),
	(436,'','',5,'a98e30ce4146f6aadc0d714f2d421a7d','','free_trial','active',0,'2017-03-02 23:24:16','0000-00-00 00:00:00'),
	(437,'','',5,'6fa0f4120100bb0adc2184a15e1d8010','','free_trial','active',0,'2017-03-02 23:45:25','0000-00-00 00:00:00'),
	(438,'','',5,'475b9f6cd105ec8596f5d85069cb1a08','','free_trial','active',0,'2017-03-02 23:50:47','0000-00-00 00:00:00'),
	(439,'','',5,'b3f543f05f4dea9885a6923bdc32de51','','free_trial','active',0,'2017-03-02 23:52:58','0000-00-00 00:00:00'),
	(440,'','',5,'c3a29e510cd72a1125ae12b56a5081ec','','free_trial','active',0,'2017-03-02 23:53:10','0000-00-00 00:00:00'),
	(441,'','',5,'63e689f2920e2a1d7943dd483133b654','','free_trial','active',0,'2017-03-02 23:55:25','0000-00-00 00:00:00'),
	(442,'','',5,'54d56d28f0cc02589214f98a4b1e7207','','free_trial','active',0,'2017-03-03 00:39:27','0000-00-00 00:00:00'),
	(443,'','',5,'51419711f87e0f29121d4eaa7a21c028','','free_trial','active',0,'2017-03-03 00:43:07','0000-00-00 00:00:00'),
	(444,'','',5,'5d38808dc0ea874af69b2484c52b6084','','free_trial','active',0,'2017-03-03 00:49:46','0000-00-00 00:00:00'),
	(445,'','',5,'eb795868ff0ee28e75f8490fbffe719b','','free_trial','active',0,'2017-03-03 00:50:36','0000-00-00 00:00:00'),
	(446,'','',5,'0185503ad402ab21746634ee05cbebbe','','free_trial','active',0,'2017-03-03 00:52:11','0000-00-00 00:00:00'),
	(447,'','',5,'9bd5345bb333c315ac47a59d69704ab3','','free_trial','active',0,'2017-03-03 13:04:00','0000-00-00 00:00:00'),
	(448,'','',5,'411a1ecdbfd22427d97863a69047b44e','','free_trial','active',0,'2017-03-03 13:10:37','0000-00-00 00:00:00'),
	(449,'','',5,'2269447cf6ea50606649cfc16b5793c2','','free_trial','active',0,'2017-03-03 13:13:45','0000-00-00 00:00:00'),
	(450,'','',5,'4f35f755e86f000f443b94cb219ca240','','free_trial','active',0,'2017-03-03 13:17:56','0000-00-00 00:00:00'),
	(451,'','',5,'dd998f003ad4d98773c6d745aa674750','','free_trial','active',0,'2017-03-03 13:24:18','0000-00-00 00:00:00'),
	(452,'','',5,'818aa3fb1a7070f314194d464253640a','','free_trial','active',0,'2017-03-03 15:32:16','0000-00-00 00:00:00'),
	(453,'','',5,'791bf26df2cd55b7c1c6fa75291fbaf7','','free_trial','active',0,'2017-03-03 16:30:35','0000-00-00 00:00:00'),
	(454,'','',5,'fbcd30db00ccc8b9e78c0df7527001fc','','free_trial','active',0,'2017-03-03 19:31:24','0000-00-00 00:00:00'),
	(455,'','',5,'5ae2d7527bd54d47997e38cff8c95f33','','free_trial','active',0,'2017-03-03 19:33:02','0000-00-00 00:00:00'),
	(456,'','',5,'d23b4c7c9cddbd3c35b70c6e0dec7327','','free_trial','active',0,'2017-03-03 22:06:22','0000-00-00 00:00:00'),
	(457,'','',5,'ae3e4894907c167eb38d8ff1ab13956d','','free_trial','active',0,'2017-03-03 22:36:44','0000-00-00 00:00:00'),
	(458,'','',5,'d4b0df595e73aa03390953f50d014e08','','free_trial','active',0,'2017-03-03 23:46:40','0000-00-00 00:00:00'),
	(459,'','',5,'4862359cc7dd2a36c0c5928a518b4401','','free_trial','active',0,'2017-03-03 23:59:25','0000-00-00 00:00:00'),
	(460,'','',5,'d3cbfc1f844cda8fe7d0026c8f644f6d','','free_trial','active',0,'2017-03-04 00:16:48','0000-00-00 00:00:00'),
	(461,'','',5,'94b622ffce192b52a1a0500fe99527ff','','free_trial','active',0,'2017-03-04 11:53:53','0000-00-00 00:00:00'),
	(462,'','',5,'6b65335ecdc3b128b85935538aaece79','','free_trial','active',0,'2017-03-04 12:28:08','0000-00-00 00:00:00'),
	(463,'','',5,'1ea0200b710bb27b3101032273252d36','','free_trial','active',0,'2017-03-04 13:01:09','0000-00-00 00:00:00'),
	(464,'','',5,'33c91452af3dfa6d53340b5299b0e2b9','','free_trial','active',0,'2017-03-04 13:08:57','0000-00-00 00:00:00'),
	(465,'','',5,'c6934829258687430ea0f5b4279e5605','','free_trial','active',0,'2017-03-04 13:25:05','0000-00-00 00:00:00'),
	(466,'','',5,'99dbcbe838d64e02bcd78fed0da7bba7','','free_trial','active',0,'2017-03-04 13:35:33','0000-00-00 00:00:00'),
	(467,'','',5,'64dcffd4c17421c010de27644a0a90c2','','free_trial','active',0,'2017-03-04 14:43:19','0000-00-00 00:00:00'),
	(468,'','',5,'6694988c953918c5b4ef6520b9a1ce50','','free_trial','active',0,'2017-03-04 15:42:03','0000-00-00 00:00:00'),
	(469,'','',5,'280825851673d82d9f4f656a2165ecf9','','free_trial','active',0,'2017-03-04 15:52:15','0000-00-00 00:00:00'),
	(470,'','',5,'6549b747700c6cf828b5c842dc4f272e','','free_trial','active',0,'2017-03-04 16:05:40','0000-00-00 00:00:00'),
	(471,'','',5,'d87fda819a61823f4f30d479b3f5960a','','free_trial','active',0,'2017-03-04 16:12:24','0000-00-00 00:00:00'),
	(472,'','',5,'133efcea2421c7812b956a474f567066','','free_trial','active',0,'2017-03-04 16:17:00','0000-00-00 00:00:00'),
	(473,'','',5,'946426990dcb88c253f1172f0d6911cf','','free_trial','active',0,'2017-03-04 16:21:03','0000-00-00 00:00:00'),
	(474,'','',5,'2923cd66f9c1204e5a328cb0241b39f0','','free_trial','active',0,'2017-03-04 16:37:58','0000-00-00 00:00:00'),
	(475,'','',5,'650808f75618bb6af5782134bcef50e1','','free_trial','active',0,'2017-03-04 23:41:17','0000-00-00 00:00:00'),
	(476,'','',5,'d921acc65ac53e6f68e43733a96c5092','','free_trial','active',0,'2017-03-05 00:02:13','0000-00-00 00:00:00'),
	(477,'','',5,'c45f18f3cfb1e01e8be892562a0b7b89','','free_trial','active',0,'2017-03-05 00:11:05','0000-00-00 00:00:00'),
	(478,'','',5,'e8c4dea69c38bcb5b2aeb93a24426eb2','','free_trial','active',0,'2017-03-05 00:15:31','0000-00-00 00:00:00'),
	(479,'','',5,'a221d541f3f37feff18c3ce4aa606817','','free_trial','active',0,'2017-03-05 01:45:06','0000-00-00 00:00:00'),
	(480,'','',5,'d9ebc4c7714030cc9a08e0a806ed729b','','free_trial','active',0,'2017-03-05 09:55:39','0000-00-00 00:00:00'),
	(481,'','',5,'b5c2aed0389999ca6acd1e242ec36d83','','free_trial','active',0,'2017-03-05 14:09:19','0000-00-00 00:00:00'),
	(482,'','',5,'2f0d74b2140bd44c49281b229b8a5a50','','free_trial','active',0,'2017-03-05 14:47:57','0000-00-00 00:00:00'),
	(483,'','',5,'86739fb93c3cd098d66a723ccb37f817','','free_trial','active',0,'2017-03-05 16:20:00','0000-00-00 00:00:00'),
	(484,'','',5,'b5160a0685c2b914fa562a37809133bf','','free_trial','active',0,'2017-03-05 16:59:00','0000-00-00 00:00:00'),
	(485,'','',5,'8f687e94924212cf967c034bcefbbd18','','free_trial','active',0,'2017-03-05 17:28:09','0000-00-00 00:00:00'),
	(486,'','',5,'da0d0d4a2c6904828b3275ced701cd7d','','free_trial','active',0,'2017-03-05 17:28:34','0000-00-00 00:00:00'),
	(487,'','',5,'bdd303d77705af98b02da070e9a4c7f6','','free_trial','active',0,'2017-03-05 18:01:05','0000-00-00 00:00:00'),
	(488,'','',5,'e56142d01fb45b3b5f3e9dd6787ff535','','free_trial','active',0,'2017-03-05 18:06:01','0000-00-00 00:00:00'),
	(489,'','',5,'019b73abebabb21fed737f0c5c59a272','','free_trial','active',0,'2017-03-05 19:23:00','0000-00-00 00:00:00'),
	(490,'','',5,'3061acd642153e9f79ffa41954d80320','','free_trial','active',0,'2017-03-05 19:31:05','0000-00-00 00:00:00'),
	(491,'','',5,'bbe36f76dad411105aae5b2592f92ca9','','free_trial','active',0,'2017-03-05 19:36:33','0000-00-00 00:00:00'),
	(492,'','',5,'b84715c1c2060b8d78a9fd25a413c181','','free_trial','active',0,'2017-03-05 22:38:52','0000-00-00 00:00:00'),
	(493,'','',5,'7fb160727f5e5caf9bd17cc61582b52a','','free_trial','active',0,'2017-03-05 22:43:22','0000-00-00 00:00:00'),
	(494,'','',5,'c1eb64f4fa6aa0cc0cc7a91f135c30d6','','free_trial','active',0,'2017-03-05 23:31:27','0000-00-00 00:00:00'),
	(495,'','',5,'4fdde9ee4ec4f98a2535cba1fd701f43','','free_trial','active',0,'2017-03-05 23:31:31','0000-00-00 00:00:00'),
	(496,'','',5,'7189637ecc008839d29650d0859b2039','','free_trial','active',0,'2017-03-05 23:36:22','0000-00-00 00:00:00'),
	(497,'','',5,'c4a574fabe771cb74af01d3fdc0203d2','','free_trial','active',0,'2017-03-05 23:38:02','0000-00-00 00:00:00'),
	(498,'','',5,'397b5bb081506e1376a208630f099db0','','free_trial','active',0,'2017-03-05 23:46:45','0000-00-00 00:00:00'),
	(499,'','',5,'fd9968103573d64418436b918954292e','','free_trial','active',0,'2017-03-06 00:05:07','0000-00-00 00:00:00'),
	(500,'','',5,'4512f45f140d6f5a9ed5622f6942e5a5','','free_trial','active',0,'2017-03-06 00:06:18','0000-00-00 00:00:00'),
	(501,'','',5,'b6e3818b56f9d41ffc77b02f5deab2dc','','free_trial','active',0,'2017-03-06 00:06:22','0000-00-00 00:00:00'),
	(502,'','',5,'bcc9cf63167d3b2f2e584bd1529f745e','','free_trial','active',0,'2017-03-06 00:15:48','0000-00-00 00:00:00'),
	(503,'','',5,'52cf504c9f7bee9c47dd54d7873272f8','','free_trial','active',0,'2017-03-06 15:02:26','0000-00-00 00:00:00'),
	(504,'','',5,'07d56682c1626ae23029f7157827e025','','free_trial','active',0,'2017-03-06 15:47:21','0000-00-00 00:00:00'),
	(505,'','',5,'99d88527e20b37799a5070c72350a755','','free_trial','active',0,'2017-03-06 16:44:10','0000-00-00 00:00:00'),
	(506,'','',5,'76c563b1066d43d9f18fa40d23a16601','','free_trial','active',0,'2017-03-06 17:48:56','0000-00-00 00:00:00'),
	(507,'','',5,'3a536a6b45bfe2e89a31af32870199d5','','free_trial','active',0,'2017-03-06 18:53:52','0000-00-00 00:00:00'),
	(508,'','',5,'59c520ca6c885dc3302269070db4b303','','free_trial','active',0,'2017-03-06 18:58:05','0000-00-00 00:00:00'),
	(509,'','',5,'6d62860f3587e7360b6dea28308249b6','','free_trial','active',0,'2017-03-06 21:08:12','0000-00-00 00:00:00'),
	(510,'','',5,'eab814459b0533fe5ee896a655591230','','free_trial','active',0,'2017-03-06 21:42:34','0000-00-00 00:00:00'),
	(511,'','',5,'8a4dacee11be1ffb5473f844699f7615','','free_trial','active',0,'2017-03-06 23:23:19','0000-00-00 00:00:00'),
	(512,'','',5,'3c24ba6f053b806f0d20e492b032c508','','free_trial','active',0,'2017-03-07 00:04:30','0000-00-00 00:00:00'),
	(513,'','',5,'d63b4caf565f75fc03be8d0da885dc29','','free_trial','active',0,'2017-03-07 00:09:53','0000-00-00 00:00:00'),
	(514,'','',5,'cf1d5e5fd15b9aa1bf587bc4d42ae011','','free_trial','active',0,'2017-03-07 00:29:51','0000-00-00 00:00:00'),
	(515,'','',5,'96d86924cdbce5302996844c998e7c0a','','free_trial','active',0,'2017-03-07 01:08:49','0000-00-00 00:00:00'),
	(516,'','',5,'e42abe5681e36185e79620bdff76ce39','','free_trial','active',0,'2017-03-07 01:15:30','0000-00-00 00:00:00'),
	(517,'','',5,'e5e1717e06ceb392ac77889a44af7a94','','free_trial','active',0,'2017-03-07 01:25:21','0000-00-00 00:00:00'),
	(518,'','',5,'2bae5d266f2885a68a06619a54fe9983','','free_trial','active',0,'2017-03-07 01:26:14','0000-00-00 00:00:00'),
	(519,'','',5,'020217bcd9c81568e5cf09e1d8afce5b','','free_trial','active',0,'2017-03-07 01:29:48','0000-00-00 00:00:00'),
	(520,'','',5,'64914e507331c11c9e6039a556e76119','','free_trial','active',0,'2017-03-07 11:08:46','0000-00-00 00:00:00'),
	(521,'','',5,'c4d8f11793cb99b60f0d17d426729454','','free_trial','active',0,'2017-03-07 12:03:10','0000-00-00 00:00:00'),
	(522,'','',5,'cb96409d09442d0dfa8a361e400d2f1f','','free_trial','active',0,'2017-03-07 12:29:59','0000-00-00 00:00:00'),
	(523,'','',5,'34fd56ad0eccec6c390f056120c9ddb1','','free_trial','active',0,'2017-03-07 13:03:26','0000-00-00 00:00:00'),
	(524,'','',5,'1df3998044b6b48574763c6b53e63c49','','free_trial','active',0,'2017-03-07 17:27:07','0000-00-00 00:00:00'),
	(525,'','',5,'b62980e8e93152141000182c5b560b78','','free_trial','active',0,'2017-03-07 17:27:18','0000-00-00 00:00:00'),
	(526,'','',5,'e3c62ef022990bcfca3760ec9a43fc79','','free_trial','active',0,'2017-03-07 17:38:02','0000-00-00 00:00:00'),
	(527,'','',5,'405ad6e048a18866928a40d9d270c0d2','','free_trial','active',0,'2017-03-07 18:47:18','0000-00-00 00:00:00'),
	(528,'','',5,'2565d135bf26cf2e86bf0703503c490f','','free_trial','active',0,'2017-03-07 23:27:04','0000-00-00 00:00:00'),
	(529,'','',5,'b3341d5e88ebd06d905d6848934026ad','','free_trial','active',0,'2017-03-07 23:27:33','0000-00-00 00:00:00'),
	(530,'','',5,'d577e6b42778d7e0f6a59d1bc139d7e6','','free_trial','active',0,'2017-03-07 23:29:19','0000-00-00 00:00:00'),
	(531,'','',5,'1d4fd9e0c8ab839976cb08b477574740','','free_trial','active',0,'2017-03-07 23:58:35','0000-00-00 00:00:00'),
	(532,'','',5,'8d3fd9e75c617821ca9e259606a1187f','','free_trial','active',0,'2017-03-08 00:04:51','0000-00-00 00:00:00'),
	(533,'','',5,'0b6f695c91b76ce733717607f847cf30','','free_trial','active',0,'2017-03-08 12:46:07','0000-00-00 00:00:00'),
	(534,'','',5,'6ec0b61ca9cddd2eb43c4df445ebe8e9','','free_trial','active',0,'2017-03-08 14:58:32','0000-00-00 00:00:00'),
	(535,'','',5,'efab11b1fe8e2b2a5b0e428260e3825b','','free_trial','active',0,'2017-03-08 21:25:07','0000-00-00 00:00:00'),
	(536,'','',5,'bad85d25686964a3b28c090c5b39b0b3','','free_trial','active',0,'2017-03-08 21:29:24','0000-00-00 00:00:00'),
	(537,'','',5,'d22990a4098cfc58402b20d6a3f7dc71','','free_trial','active',0,'2017-03-08 21:32:05','0000-00-00 00:00:00'),
	(538,'','',5,'68a42b6abffd56157d3615f6d3b0667d','','free_trial','active',0,'2017-03-09 07:26:27','0000-00-00 00:00:00'),
	(539,'','',5,'0b29332fd78c2d309f63668f1cc3abf4','','free_trial','active',0,'2017-03-09 10:54:25','0000-00-00 00:00:00'),
	(540,'test@test.com','26746c0f1b04825525b0a1fd4facb478',5,'','','paying','non-active',0,'2017-03-09 16:57:10','0000-00-00 00:00:00'),
	(541,'fksv@l.safdv.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-09 16:59:56','2017-03-09 17:00:35'),
	(542,'xbtx@1clck2.com','5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-03-09 17:09:42','2017-03-09 17:09:57'),
	(543,'dlyv@s.proprietativalcea.ro','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-09 17:11:27','2017-03-09 17:11:43'),
	(544,'','',5,'404a89199f2725e42e7d69eafd82a795','','free_trial','active',0,'2017-03-09 18:07:29','0000-00-00 00:00:00'),
	(545,'','',5,'f95d93a67fc8348e876cfdbed0028b53','','free_trial','active',0,'2017-03-09 18:23:36','0000-00-00 00:00:00'),
	(546,'','',5,'262aacb86d1537fd9d1d32ff226d9814','','free_trial','active',0,'2017-03-09 18:43:42','0000-00-00 00:00:00'),
	(547,'','',5,'1c556bc6aecbe88665de34bc4aec498e','','free_trial','active',0,'2017-03-09 18:44:52','0000-00-00 00:00:00'),
	(548,'','',5,'856d99b6d30e34772696f287d1e17cc1','','free_trial','active',0,'2017-03-09 23:29:16','0000-00-00 00:00:00'),
	(549,'','',5,'55da23894b2e56ff5b1c76705946c504','','free_trial','active',0,'2017-03-10 08:51:21','0000-00-00 00:00:00'),
	(550,'','',5,'734f55c92b83cc0f24f45b9d6eb8144b','','free_trial','active',0,'2017-03-10 11:00:29','0000-00-00 00:00:00'),
	(551,'','',5,'0b0d02f8501921c04d7b4e5b339094d5','','free_trial','active',0,'2017-03-10 21:33:45','0000-00-00 00:00:00'),
	(552,'','',5,'a2e1393c1c6b0c1a0bc4d199cb36c370','','free_trial','active',0,'2017-03-11 02:30:15','0000-00-00 00:00:00'),
	(553,'','',5,'ab439ef0825f71ddd13b896f3fdd0304','','free_trial','active',0,'2017-03-11 18:31:38','0000-00-00 00:00:00'),
	(554,'','',5,'df58711d90f2e45ce25f32dea5d66996','','free_trial','active',0,'2017-03-12 16:54:02','0000-00-00 00:00:00'),
	(555,'','',5,'54b33696620610bdc94690881a02ebb4','','free_trial','active',0,'2017-03-12 18:16:13','0000-00-00 00:00:00'),
	(556,'','',5,'7f13b09e3687bff24965e19b56197b39','','free_trial','active',0,'2017-03-12 19:20:56','0000-00-00 00:00:00'),
	(557,'','',5,'59f28d193003cedb4ff947104b9c4c6d','','free_trial','active',0,'2017-03-12 19:57:38','0000-00-00 00:00:00'),
	(558,'','',5,'7471451bb7ece25f6c58fb75fc03650c','','free_trial','active',0,'2017-03-12 20:47:37','0000-00-00 00:00:00'),
	(559,'','',5,'66d905b5e0fcb0bb5f23b6c5358e5e73','','free_trial','active',0,'2017-03-12 20:55:55','0000-00-00 00:00:00'),
	(560,'','',5,'959ad97531cd7b727b5714573e730afc','','free_trial','active',0,'2017-03-12 21:34:34','0000-00-00 00:00:00'),
	(561,'','',5,'53ca01f96439897516032e9d9e35344a','','free_trial','active',0,'2017-03-12 21:35:23','0000-00-00 00:00:00'),
	(562,'','',5,'9911f569258d9972eeb3545e960b8c16','','free_trial','active',0,'2017-03-12 21:35:39','0000-00-00 00:00:00'),
	(563,'','',5,'4e13fb1c4839f857b258375d06895b22','','free_trial','active',0,'2017-03-12 21:45:12','0000-00-00 00:00:00'),
	(564,'','',5,'b6cad68c2b68a785472d92b26e5e661b','','free_trial','active',0,'2017-03-12 21:46:26','0000-00-00 00:00:00'),
	(565,'','',5,'3ca71c85e3936d9031d5546310679de8','','free_trial','active',0,'2017-03-12 22:42:35','0000-00-00 00:00:00'),
	(566,'','',5,'f9c51e3769c89ab33e2cf08ac658362d','','free_trial','active',0,'2017-03-12 22:55:36','0000-00-00 00:00:00'),
	(567,'','',5,'5fca22e4a648e5bbce903c32f41e33ac','','free_trial','active',0,'2017-03-13 00:15:55','0000-00-00 00:00:00'),
	(568,'','',5,'f3245b2055e8b29f93d8e2b6fb48e71f','','free_trial','active',0,'2017-03-13 08:50:21','0000-00-00 00:00:00'),
	(569,'','',5,'a7ba9655bc550fd559584cbbbcac5506','','free_trial','active',0,'2017-03-13 10:42:24','0000-00-00 00:00:00'),
	(570,'arbkr@maildx.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 11:24:04','2017-03-13 11:24:22'),
	(571,'xwns@msrc.ml','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 11:43:12','2017-03-13 11:43:34'),
	(572,'ueyv@i.ryanb.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 11:51:25','2017-03-13 11:51:41'),
	(573,'eofv@e.wupics.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 11:57:56','2017-03-13 11:58:10'),
	(574,'gxsz@drivetagdev.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 12:04:54','2017-03-13 17:41:38'),
	(575,'jtfv@c.wlist.ro','5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-03-13 12:28:09','2017-03-13 12:28:29'),
	(576,'','',5,'f5ddb53e56917b561ed9f7e1f0b0165e','','free_trial','active',0,'2017-03-13 17:39:39','0000-00-00 00:00:00'),
	(577,'','',5,'a9c07cbb9bfbf513db7f11b50c0414cc','','free_trial','active',0,'2017-03-13 21:03:32','0000-00-00 00:00:00'),
	(578,'','',5,'65dabf5ac7d193da5743b427cd074e02','','free_trial','active',0,'2017-03-13 21:55:31','0000-00-00 00:00:00'),
	(579,'','',5,'c4f17d108714a59ce930ef96c8be9edc','','free_trial','active',0,'2017-03-13 22:46:50','0000-00-00 00:00:00'),
	(580,'','',5,'684de3ad5f287c76c92654cdc8bcd056','','free_trial','active',0,'2017-03-13 22:59:43','0000-00-00 00:00:00'),
	(581,'','',5,'6170f44a3f619b76f76c42b931bdee2d','','free_trial','active',0,'2017-03-13 23:16:06','0000-00-00 00:00:00'),
	(582,'','',5,'b6b74b48d8476adb9fd0f38fa1e09e68','','free_trial','active',0,'2017-03-14 09:19:13','0000-00-00 00:00:00'),
	(583,'saly@bst-72.com','5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','non-active',0,'2017-03-14 11:04:42','0000-00-00 00:00:00'),
	(584,'','',5,'865b0732f422d7a4be18bb180ffc3ce4','','free_trial','active',0,'2017-03-14 13:34:50','0000-00-00 00:00:00'),
	(585,'gg@gggggh.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-03-14 14:03:35','0000-00-00 00:00:00'),
	(586,'goos@twkly.ml','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-14 14:04:57','2017-03-14 14:05:29'),
	(587,'saly@bst-7d2.com','5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-03-14 14:15:03','0000-00-00 00:00:00'),
	(588,'morris','25d55ad283aa400af464c76d713c07ad',1,'f564f7ceef5b61ba3e07dcd37d278b73','','paying','active',0,'2017-03-14 15:08:21','2017-03-14 15:09:01'),
	(589,'','',5,'16531f3629c92ec2934944689b241ef2','','free_trial','active',0,'2017-03-14 16:40:16','0000-00-00 00:00:00'),
	(590,'','',5,'9f8ff217eb6c8433bf635b911b20dd9c','','free_trial','active',0,'2017-03-14 16:51:10','0000-00-00 00:00:00'),
	(591,'','',5,'c2d674a39fd90d0b1c5e13b56da8869f','','free_trial','active',0,'2017-03-14 17:12:19','0000-00-00 00:00:00'),
	(592,'','',5,'9f767b24260f504ad0d5d7c8242264ff','','free_trial','active',0,'2017-03-14 21:56:41','0000-00-00 00:00:00'),
	(593,'','',5,'82f201760fba812c97f38dd819980c38','','free_trial','active',0,'2017-03-14 22:49:59','0000-00-00 00:00:00'),
	(594,'','',5,'24fc2db140ccc1b92430fabb91607cce','','free_trial','active',0,'2017-03-14 23:04:44','0000-00-00 00:00:00'),
	(595,'','',5,'29604fae3b38022d12298a34e4cb051d','','free_trial','active',0,'2017-03-14 23:08:50','0000-00-00 00:00:00'),
	(596,'','',5,'4ff735af5e3c888c6871e83e810b66a8','','free_trial','active',0,'2017-03-15 13:22:36','0000-00-00 00:00:00'),
	(597,'','',5,'d1eb82eede0026763032739ef50db3de','','free_trial','active',0,'2017-03-15 13:27:35','0000-00-00 00:00:00'),
	(598,'','',5,'823055f44257a4e942c38e639e2f6318','','free_trial','active',0,'2017-03-15 13:27:47','0000-00-00 00:00:00'),
	(599,'','',5,'d3ec80befca3e5d384ea79c67afdd4c0','','free_trial','active',0,'2017-03-16 17:07:47','0000-00-00 00:00:00'),
	(600,'','',5,'4673da4e7fdc6451a7696ea74f347ec4','','free_trial','active',0,'2017-03-16 17:52:27','0000-00-00 00:00:00'),
	(601,'','',5,'8debdd44ccaf1dcf37a260c985a9a0ae','','free_trial','active',0,'2017-03-16 18:04:49','0000-00-00 00:00:00'),
	(602,'','',5,'8f49e160cdb67b846780471ae2a1309d','','free_trial','active',0,'2017-03-16 19:38:29','0000-00-00 00:00:00'),
	(603,'','',5,'13b5b7780b01754cf5bb89e3b82dd16c','','free_trial','active',0,'2017-03-16 19:38:38','0000-00-00 00:00:00'),
	(604,'','',5,'f43792a375be999dc84817c36ec45141','','free_trial','active',0,'2017-03-16 19:38:48','0000-00-00 00:00:00'),
	(605,'','',5,'00e8bbcd8e0f0f56c113b75bafdb36fd','','free_trial','active',0,'2017-03-16 19:38:57','0000-00-00 00:00:00'),
	(606,'','',5,'16975e86f553c9a305db61b4c7fcffe7','','free_trial','active',0,'2017-03-16 19:39:06','0000-00-00 00:00:00'),
	(607,'','',5,'cd25697f814f396399202b8e4f434581','','free_trial','active',0,'2017-03-16 19:39:14','0000-00-00 00:00:00'),
	(608,'','',5,'baecc3285e55efe1d0b2d11212aff4de','','free_trial','active',0,'2017-03-16 19:39:22','0000-00-00 00:00:00'),
	(609,'','',5,'745340f415b726f5c2321e69251dc43d','','free_trial','active',0,'2017-03-16 19:39:37','0000-00-00 00:00:00'),
	(610,'','',5,'f214e5ab5a16151f0dc56f084dbae6cf','','free_trial','active',0,'2017-03-16 19:47:02','0000-00-00 00:00:00'),
	(611,'','',5,'56387ddca459c3401fbbed0c7b1a9ae7','','free_trial','active',0,'2017-03-16 22:30:10','0000-00-00 00:00:00'),
	(612,'','',5,'36c482165a540d6ec70f2c13ea80ae80','','free_trial','active',0,'2017-03-16 23:11:05','0000-00-00 00:00:00'),
	(613,'','',5,'55c11732ca96ae4d8ce989cb35fecb5f','','free_trial','active',0,'2017-03-17 07:13:44','0000-00-00 00:00:00'),
	(614,'','',5,'50433b5e9dbaa6b5a5abe55e104a6b1a','','free_trial','active',0,'2017-03-17 14:35:15','0000-00-00 00:00:00'),
	(615,'','',5,'2236926427860c07ff5c209c2981132e','','free_trial','active',0,'2017-03-17 19:19:31','0000-00-00 00:00:00'),
	(616,'','',5,'2bd744ecb99220433451d2434bf92b53','','free_trial','active',0,'2017-03-18 13:57:06','0000-00-00 00:00:00'),
	(617,'','',5,'44da8be05405ee6c6b5080fc0f441657','','free_trial','active',0,'2017-03-18 14:32:00','0000-00-00 00:00:00'),
	(618,'','',5,'55f8fb6a5f0e74a683250f5622b4f5cc','','free_trial','active',0,'2017-03-18 15:51:09','0000-00-00 00:00:00'),
	(619,'','',5,'724c89bf8a62351a877db1f165cbc38d','','free_trial','active',0,'2017-03-18 15:51:39','0000-00-00 00:00:00'),
	(620,'','',5,'f977b2154365a8ee42b2d434420eaf54','','free_trial','active',0,'2017-03-18 15:51:50','0000-00-00 00:00:00'),
	(621,'','',5,'7e51a0f8f511ffac98e2b9bd8c1d3489','','free_trial','active',0,'2017-03-18 15:52:01','0000-00-00 00:00:00'),
	(622,'','',5,'910d24c3c848c54a760ae9806e98f8df','','free_trial','active',0,'2017-03-18 15:52:13','0000-00-00 00:00:00'),
	(623,'','',5,'4aee14866c2c1e50b1c7a9014e270322','','free_trial','active',0,'2017-03-18 16:17:04','0000-00-00 00:00:00'),
	(624,'','',5,'f1eeac482ad1540027302b519053ff2d','','free_trial','active',0,'2017-03-18 17:11:17','0000-00-00 00:00:00'),
	(625,'','',5,'db14554e00cdab76d0ba239cca1c87f8','','free_trial','active',0,'2017-03-18 23:20:18','0000-00-00 00:00:00'),
	(626,'','',5,'32c10d9894e94c7021a005eca38e7084','','free_trial','active',0,'2017-03-19 11:53:55','0000-00-00 00:00:00'),
	(627,'','',5,'1eefb4716b0b06747e765f743ab030ce','','free_trial','active',0,'2017-03-19 12:11:17','0000-00-00 00:00:00'),
	(628,'test@test2.com','25d55ad283aa400af464c76d713c07ad',4,'','','paying','non-active',0,'2017-03-19 14:05:48','0000-00-00 00:00:00'),
	(629,'','',5,'6e64c7b5779a621da8f16099e5a93870','','free_trial','active',0,'2017-03-19 14:12:41','0000-00-00 00:00:00'),
	(630,'eric.hui@emcchk.com','25d55ad283aa400af464c76d713c07ad',4,'','','paying','non-active',0,'2017-03-19 14:36:44','0000-00-00 00:00:00'),
	(631,'erichui.phone@gmail.com','25d55ad283aa400af464c76d713c07ad',4,'','','paying','active',0,'2017-03-19 14:41:32','2017-03-19 14:43:25'),
	(632,'','',5,'583f7d5eec1fe789c11a3fac92ec62b8','','free_trial','active',0,'2017-03-19 23:27:22','0000-00-00 00:00:00'),
	(633,'','',5,'0956e95d9e96da76d91d6ac630fff40e','','free_trial','active',0,'2017-03-20 16:25:00','0000-00-00 00:00:00'),
	(634,'','',5,'1f18f4d1987ba32baf97031da178c533','','free_trial','active',0,'2017-03-20 22:59:58','0000-00-00 00:00:00'),
	(635,'','',5,'a83194d2cc5f85f5f10994b21ef604c8','','free_trial','active',0,'2017-03-20 23:10:39','0000-00-00 00:00:00'),
	(636,'','',5,'cee97178d738e10612234cc427ef0561','','free_trial','active',0,'2017-03-21 00:33:06','0000-00-00 00:00:00');

/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

DELIMITER ;;
/*!50003 SET SESSION SQL_MODE="" */;;
/*!50003 CREATE */ /*!50017 DEFINER=`ehl_usr_mdl_mtr`@`%` */ /*!50003 TRIGGER `after_soft_delete_user` AFTER UPDATE ON `user` FOR EACH ROW begin
	IF (NEW.is_deleted <> OLD.is_deleted) THEN
		CALL soft_delete_user_session(NEW.id);
		-- check user role and delete relative relationship
		IF (OLD.user_group = 4) THEN
			CALL soft_delete_parent_x_children_on_parent(NEW.id, NEW.is_deleted);
		END IF;
		IF (OLD.user_group = 5) THEN
			CALL soft_delete_parent_x_children_on_children(NEW.id, NEW.is_deleted);
			CALL soft_delete_student_x_subject_on_student(NEW.id, NEW.is_deleted);
		END IF;
		IF (OLD.user_group = 3) THEN
			CALL soft_delete_teacher_x_class_x_subject_on_teacher(NEW.id, NEW.is_deleted);
		END IF;
	END IF;

	IF (NEW.status = 'non-active') THEN
		CALL soft_delete_user_session(NEW.id);
	END IF;
end */;;
DELIMITER ;
/*!50003 SET SESSION SQL_MODE=@OLD_SQL_MODE */;


# Dump of table user_info
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_info`;

CREATE TABLE `user_info` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `credit_account` int(10) DEFAULT NULL,
  `stripe_id` int(10) NOT NULL DEFAULT '0',
  `school_id` int(10) DEFAULT NULL,
  `class_id` int(10) DEFAULT NULL,
  `level` varchar(100) DEFAULT NULL,
  `nickname` varchar(100) NOT NULL,
  `student_num` varchar(12) DEFAULT NULL,
  `email` varchar(50) NOT NULL DEFAULT '',
  `birthday` date DEFAULT NULL,
  `gender` enum('na','m','f') NOT NULL DEFAULT 'na',
  `contact_num` varchar(32) DEFAULT NULL,
  `district` text,
  `address` text,
  `avatar` int(10) DEFAULT NULL,
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `user_school_class` (`user_id`,`school_id`,`class_id`),
  UNIQUE KEY `user_school` (`user_id`,`school_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

LOCK TABLES `user_info` WRITE;
/*!40000 ALTER TABLE `user_info` DISABLE KEYS */;

INSERT INTO `user_info` (`id`, `user_id`, `credit_account`, `stripe_id`, `school_id`, `class_id`, `level`, `nickname`, `student_num`, `email`, `birthday`, `gender`, `contact_num`, `district`, `address`, `avatar`, `create_ts`, `update_ts`)
VALUES
	(1,1,1,0,0,0,'p1','ccccdd',NULL,'','2016-08-18','na','22222223',NULL,'Queensway 89',NULL,'2016-08-13 15:08:21','2016-12-19 16:04:05'),
	(2,2,NULL,0,2,5,'p1','',NULL,'',NULL,'na',NULL,NULL,'',14,'2016-08-13 15:16:41','2016-12-19 16:26:37'),
	(3,3,NULL,0,1,0,'p1','dddd',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:18:08','2016-12-16 11:07:44'),
	(4,4,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:01','2016-12-16 11:07:44'),
	(5,5,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:01','2016-12-16 11:07:44'),
	(6,6,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(7,7,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(8,8,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(9,9,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(10,10,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(11,11,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:14','2016-12-16 11:07:44'),
	(12,12,1,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-30 11:26:51'),
	(13,13,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-16 11:07:44'),
	(14,14,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-16 11:07:44'),
	(15,15,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-16 11:07:44'),
	(16,16,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-16 11:07:44'),
	(17,17,NULL,0,1,2,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:38:25','2016-12-16 11:07:44'),
	(18,18,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:46:29','2016-12-16 11:07:44'),
	(19,19,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 15:59:11','2016-12-16 11:07:44'),
	(20,20,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 16:00:10','2016-12-16 11:07:44'),
	(21,21,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 16:27:49','2016-12-16 11:07:44'),
	(22,22,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 16:30:02','2016-12-16 11:07:44'),
	(23,23,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 16:33:41','2016-12-16 11:07:44'),
	(24,24,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:01:48','2016-12-16 11:07:44'),
	(25,25,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:04:46','2016-12-16 11:07:44'),
	(26,26,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:07:58','2016-12-16 11:07:44'),
	(27,27,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:08:17','2016-12-16 11:07:44'),
	(28,28,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:09:16','2016-12-16 11:07:44'),
	(29,29,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-13 19:11:55','2016-12-16 11:07:44'),
	(30,30,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-14 02:35:22','2016-12-16 11:07:44'),
	(31,31,NULL,0,0,0,'s1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-14 20:42:11','2016-09-10 13:26:29'),
	(32,32,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-14 21:58:47','2016-12-16 11:07:44'),
	(33,33,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-14 23:52:51','2016-12-16 11:07:44'),
	(34,34,NULL,0,0,0,'p1','Hilton',NULL,'','1990-03-10','m','69885898',NULL,'RM914, Yuet Wah House, Tin Yuet Estate, Tin Shui Wai',NULL,'2016-08-16 19:05:29','2016-12-16 11:07:44'),
	(35,35,NULL,0,0,0,'p1','cccc',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-17 19:15:25','2016-12-16 11:07:44'),
	(36,36,NULL,0,1,2,'p1','dddd',NULL,'',NULL,'na',NULL,NULL,'',11,'2016-08-18 16:39:26','2016-12-16 11:07:44'),
	(37,37,NULL,0,1,2,'p1','dddd',NULL,'',NULL,'na',NULL,NULL,'',12,'2016-08-18 16:42:25','2016-12-16 11:07:44'),
	(38,38,NULL,0,0,0,'p1','ccccdd',NULL,'','2016-08-18','na','22222222',NULL,'Queensway 89',NULL,'2016-08-21 19:37:00','2016-12-16 11:07:44'),
	(39,39,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-08-21 23:41:48','2016-12-16 11:07:44'),
	(40,40,NULL,0,0,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-09-17 23:58:26','2016-12-16 11:07:44'),
	(41,41,NULL,0,0,0,'p3','ks1',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(42,42,NULL,0,0,0,'p6','ks2',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(43,43,NULL,0,0,0,'p4','ks3',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2017-01-25 18:08:38'),
	(44,44,NULL,0,0,0,'s6','ks4',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(45,45,NULL,0,0,0,'p3','ks1',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(46,46,NULL,0,0,0,'p6','ks2',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(47,47,NULL,0,0,0,'s3','ks3',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(48,48,NULL,0,0,0,'s6','ks4',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-24 22:43:20','2016-11-03 12:27:11'),
	(49,49,NULL,0,0,0,'p1','henry',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-25 00:31:41','2017-01-07 11:59:08'),
	(50,50,NULL,0,0,0,'p1','test',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-10-25 00:31:41','2016-12-16 11:07:44'),
	(51,53,NULL,0,1,0,'p1','Hilton Hong',NULL,'','1970-01-01','na','51345644','Sham Shui Po','',NULL,'2016-12-06 16:52:33','2017-03-19 01:05:58'),
	(53,54,NULL,0,1,0,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-12-06 17:32:53','2017-03-19 01:05:50'),
	(54,55,NULL,0,0,0,'p1','fukuen',NULL,'','1989-03-29','na','34343443','North','Wong Tai Sin, Kowloon',NULL,'2016-12-07 11:31:11','2017-01-17 11:23:02'),
	(55,56,NULL,0,NULL,NULL,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-12-15 18:02:43','2016-12-16 11:07:44'),
	(56,57,NULL,0,NULL,NULL,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-12-15 23:50:24','2016-12-16 11:07:44'),
	(57,58,NULL,0,NULL,NULL,'p1','',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-12-16 00:09:27','2016-12-16 11:07:44'),
	(58,59,NULL,0,NULL,NULL,'p1','11111',NULL,'',NULL,'na','22222223',NULL,'',NULL,'2016-12-16 00:17:39','2016-12-26 17:17:42'),
	(59,66,NULL,0,1,NULL,NULL,'444',NULL,'',NULL,'na',NULL,NULL,'',NULL,'2016-12-19 15:53:01','2016-12-29 19:31:12');

/*!40000 ALTER TABLE `user_info` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table user_session
# ------------------------------------------------------------

DROP TABLE IF EXISTS `user_session`;

CREATE TABLE `user_session` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `access_token` varchar(50) NOT NULL,
  `expiry_date` datetime NOT NULL,
  `type` enum('app','web') NOT NULL DEFAULT 'web',
  `ip` varchar(40) DEFAULT NULL,
  `user_agent` varchar(255) NOT NULL,
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `access_token` (`access_token`),
  KEY `user_id` (`user_id`),
  KEY `is_deleted` (`is_deleted`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
