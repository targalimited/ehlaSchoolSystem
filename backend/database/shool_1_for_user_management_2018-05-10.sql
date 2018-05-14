# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.9)
# Database: school_1
# Generation Time: 2018-05-10 15:28:42 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table school_academics
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_academics`;

CREATE TABLE `school_academics` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `display_name` varchar(255) DEFAULT NULL,
  `year_start` year(4) DEFAULT NULL,
  `year_end` year(4) DEFAULT NULL,
  `semester` varchar(255) DEFAULT NULL,
  `current_sem` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_academics` WRITE;
/*!40000 ALTER TABLE `school_academics` DISABLE KEYS */;

INSERT INTO `school_academics` (`id`, `display_name`, `year_start`, `year_end`, `semester`, `current_sem`, `created_at`, `updated_at`, `deleted_at`)
VALUES
	(1,'Semester A','2018','2019','Sem A',NULL,'2018-05-01 15:09:37','2018-05-01 15:09:50','2018-05-01 15:09:50'),
	(2,'Semester A','2018','2019','Sem A',1,'2018-05-01 15:11:25','2018-05-02 05:02:48',NULL),
	(3,'Semester B','2018','2019','Sem B',NULL,'2018-05-02 05:01:48','2018-05-02 05:01:48',NULL);

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
  `is_correct` tinyint(1) NOT NULL DEFAULT '0',
  `answer` varchar(255) DEFAULT NULL,
  `answer_id` int(11) DEFAULT NULL,
  `latest` tinyint(1) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table school_assignments
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_assignments`;

CREATE TABLE `school_assignments` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `academic_id` int(11) DEFAULT NULL,
  `teacher_class_subject_id` int(10) NOT NULL,
  `type` varchar(255) DEFAULT NULL COMMENT '1=assessment,2=exercise,3=exam',
  `question_type` varchar(255) NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table school_calendar_event_school_class
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_calendar_event_school_class`;

CREATE TABLE `school_calendar_event_school_class` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `calendar_event_id` int(11) unsigned DEFAULT NULL,
  `school_class_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_calendar_event_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_calendar_event_user`;

CREATE TABLE `school_calendar_event_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `calendar_event_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_calendar_events
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_calendar_events`;

CREATE TABLE `school_calendar_events` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT NULL,
  `task_id` int(10) unsigned DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `end_time` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_classes
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_classes`;

CREATE TABLE `school_classes` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `c_name` varchar(255) NOT NULL,
  `name_zh` varchar(255) DEFAULT '',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `level_id` int(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_classes` WRITE;
/*!40000 ALTER TABLE `school_classes` DISABLE KEYS */;

INSERT INTO `school_classes` (`id`, `c_name`, `name_zh`, `is_deleted`, `create_ts`, `update_ts`, `level_id`)
VALUES
	(1,'1A',NULL,0,'2018-05-05 12:30:33','2018-05-05 12:30:33',1),
	(2,'1B',NULL,0,'2018-05-05 12:31:00','2018-05-05 12:31:00',1),
	(3,'2A',NULL,0,'2018-05-05 12:31:08','2018-05-05 12:31:08',2),
	(4,'2B',NULL,0,'2018-05-05 12:31:14','2018-05-05 12:31:14',2),
	(5,'3A',NULL,0,'2018-05-05 12:31:24','2018-05-05 12:31:24',3),
	(6,'3B',NULL,0,'2018-05-05 12:31:31','2018-05-05 12:31:31',3);

/*!40000 ALTER TABLE `school_classes` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_curriculum_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_curriculum_settings`;

CREATE TABLE `school_curriculum_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `subject_id` int(11) DEFAULT NULL,
  `weakness_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_levels
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_levels`;

CREATE TABLE `school_levels` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name_en` varchar(255) DEFAULT NULL,
  `name_zh` varchar(255) DEFAULT NULL,
  `level` varchar(3) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_levels` WRITE;
/*!40000 ALTER TABLE `school_levels` DISABLE KEYS */;

INSERT INTO `school_levels` (`id`, `name_en`, `name_zh`, `level`, `created_at`, `updated_at`)
VALUES
	(1,'P1','小一','p1','2018-05-05 11:29:57','2018-05-05 11:29:57'),
	(2,'P2','小二','p2','2018-05-05 11:29:57','2018-05-05 11:29:57'),
	(3,'P3','小三','p3','2018-05-05 11:29:57','2018-05-05 11:29:57');

/*!40000 ALTER TABLE `school_levels` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_notifications
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_notifications`;

CREATE TABLE `school_notifications` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `calendar_event_id` int(11) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `period_type` varchar(255) DEFAULT NULL,
  `period` float DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_permission_role
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_permission_role`;

CREATE TABLE `school_permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `school_permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `school_permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `school_permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `school_permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `school_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table school_permissions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_permissions`;

CREATE TABLE `school_permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `school_permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



# Dump of table school_role_user
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_role_user`;

CREATE TABLE `school_role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `school_role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `school_role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `school_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `school_role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `school_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `school_role_user` WRITE;
/*!40000 ALTER TABLE `school_role_user` DISABLE KEYS */;

INSERT INTO `school_role_user` (`user_id`, `role_id`)
VALUES
	(66,3),
	(53,5),
	(649,5);

/*!40000 ALTER TABLE `school_role_user` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_roles
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_roles`;

CREATE TABLE `school_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `school_roles_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

LOCK TABLES `school_roles` WRITE;
/*!40000 ALTER TABLE `school_roles` DISABLE KEYS */;

INSERT INTO `school_roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`)
VALUES
	(3,'Student','Student','Normal Student',NULL,NULL),
	(5,'Teacher','Teacher','Normal Teacher',NULL,NULL),
	(7,'Principal','Principal','Principal',NULL,NULL),
	(8,'Panel_chair','Panel Chair','Panel Chair',NULL,NULL);

/*!40000 ALTER TABLE `school_roles` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_student_subjects
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_student_subjects`;

CREATE TABLE `school_student_subjects` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_class_subject_id` int(10) DEFAULT NULL,
  `student_id` int(10) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `teacher_class_subject_id` (`teacher_class_subject_id`,`student_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_student_subjects` WRITE;
/*!40000 ALTER TABLE `school_student_subjects` DISABLE KEYS */;

INSERT INTO `school_student_subjects` (`id`, `teacher_class_subject_id`, `student_id`, `deleted_at`, `created_at`, `updated_at`)
VALUES
	(2,3,43,NULL,NULL,NULL),
	(3,2,44,NULL,NULL,NULL),
	(4,4,44,NULL,NULL,NULL),
	(6,3,1,NULL,NULL,NULL),
	(7,1,43,NULL,NULL,NULL),
	(8,1,1,NULL,NULL,NULL);

/*!40000 ALTER TABLE `school_student_subjects` ENABLE KEYS */;
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
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_subjects` WRITE;
/*!40000 ALTER TABLE `school_subjects` DISABLE KEYS */;

INSERT INTO `school_subjects` (`id`, `s_name_en`, `s_name_zh`, `is_deleted`, `create_ts`, `update_ts`)
VALUES
	(1,'Chinese','中文',0,'2018-05-05 11:30:15','2018-05-05 11:30:15'),
	(2,'English','英文',0,'2018-05-05 11:30:25','2018-05-05 11:30:25');

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
  `comment` varchar(100) DEFAULT NULL,
  `multiple_teacher` tinyint(1) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `teacher_class_subject` (`teacher_id`,`class_id`,`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_teacher_class_subject` WRITE;
/*!40000 ALTER TABLE `school_teacher_class_subject` DISABLE KEYS */;

INSERT INTO `school_teacher_class_subject` (`id`, `teacher_id`, `class_id`, `subject_id`, `is_deleted`, `comment`, `multiple_teacher`, `updated_at`, `created_at`)
VALUES
	(1,646,1,2,0,'pc@school1.com,1A,English',NULL,'2018-05-05 14:15:05','2018-05-05 14:15:05'),
	(2,646,2,2,0,'pc@school1.com,1B,English',NULL,'2018-05-05 14:15:05','2018-05-05 14:15:05'),
	(3,647,1,1,0,'ml@school1.com,1A,Chinese',NULL,'2018-05-05 14:15:05','2018-05-05 14:15:05'),
	(4,647,2,1,0,'ml@school1.com,1B,Chinese',NULL,'2018-05-05 14:15:05','2018-05-05 14:15:05'),
	(5,646,4,2,0,'pc@school1.com,2B,English',NULL,'2018-05-05 14:15:05','2018-05-05 14:15:05');

/*!40000 ALTER TABLE `school_teacher_class_subject` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_teaching_progresses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_teaching_progresses`;

CREATE TABLE `school_teaching_progresses` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `teacher_class_subject_id` int(10) DEFAULT NULL,
  `weakness_id` int(10) NOT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;



# Dump of table school_users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_users`;

CREATE TABLE `school_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `user_group` int(11) NOT NULL DEFAULT '5',
  `sc_token` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `fb_token` varchar(100) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `acc_type` enum('paying','free','free_trial','unlimited') CHARACTER SET utf8 NOT NULL DEFAULT 'paying',
  `status` enum('non-active','active') CHARACTER SET utf8 NOT NULL DEFAULT 'non-active',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `school_id` int(11) DEFAULT NULL,
  `name` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `remember_token` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `student_id` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_users` WRITE;
/*!40000 ALTER TABLE `school_users` DISABLE KEYS */;

INSERT INTO `school_users` (`id`, `username`, `email`, `password`, `user_group`, `sc_token`, `fb_token`, `acc_type`, `status`, `is_deleted`, `create_ts`, `update_ts`, `school_id`, `name`, `remember_token`, `student_id`)
VALUES
	(1,'moonctpa@gmail.com','lwm@student.com','e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-08-30 17:23:00','2018-05-06 15:36:27',NULL,NULL,NULL,NULL),
	(2,'hahatest2@test.com',NULL,'e10adc3949ba59abbe56e057f20f883e',4,'f60b64589fd227c8b9f7680d24f64660','','paying','active',0,'2016-09-01 13:00:36','2016-12-30 09:32:05',NULL,NULL,NULL,NULL),
	(3,'',NULL,'',4,'8168d07c9032ebf731e4a9475e9d3734','','paying','active',1,'2016-09-01 13:00:36','2016-09-09 12:42:31',NULL,NULL,NULL,NULL),
	(4,'',NULL,'',5,'544801c58df9e8b025a00a03de74387a','','free','active',0,'2016-09-01 13:01:13','2016-10-14 17:41:33',NULL,NULL,NULL,NULL),
	(5,'',NULL,'',5,'1dd1d49289bd5da0686ab15fb001724b','','paying','active',0,'2016-09-01 13:01:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(6,'hahatest5@test.com',NULL,'alkghadlkhgaklsdjgf',4,'','','paying','active',0,'2016-09-02 16:45:38','2016-09-19 18:35:55',NULL,NULL,NULL,NULL),
	(9,'hahatest9@test.com',NULL,'alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-02 17:11:40','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(11,'hahatest11@test.com',NULL,'alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-02 17:14:27','2016-09-22 17:18:00',NULL,NULL,NULL,NULL),
	(12,'',NULL,'',5,'3ee6c083f615c785cb15833ced07df83','','paying','active',0,'2016-09-05 15:29:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(13,'',NULL,'',5,'9e6f6c2e6d9d8e1dffac091ff97bf432','','paying','active',0,'2016-09-05 15:29:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(14,'',NULL,'',5,'e00c5c6f28ff61b0b558ad27848e2c43','','paying','active',0,'2016-09-05 15:31:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(15,'',NULL,'',5,'9a3a7bb6204ae7236e8c98fe2889ae0e','','paying','active',0,'2016-09-05 15:31:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(16,'',NULL,'',5,'073484ed44be1b83777867866b487a7d','','paying','active',0,'2016-09-05 15:32:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(17,'',NULL,'',5,'dcf10556c986130ccaec54915ad551c0','','paying','active',0,'2016-09-05 15:32:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(18,'',NULL,'',5,'a615b1b6d40cd5de8996918734036cef','','paying','active',0,'2016-09-07 11:37:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(19,'',NULL,'',5,'58a1b464f4478d71e281f81bffc84145','','paying','active',0,'2016-09-07 11:37:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(20,'',NULL,'',5,'f579bd4eaaedc37ed54c2f110835995e','','paying','non-active',0,'2016-09-07 12:23:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(21,'',NULL,'',5,'469f9cb64525e437f73b83e246e4638d','','paying','non-active',0,'2016-09-07 12:23:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(22,'',NULL,'',5,'fba7ba75a564b9edc044d51778c5734e','','paying','non-active',0,'2016-09-07 15:13:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(23,'',NULL,'',5,'575639c8d1847c4d8e1e8abae8d1a052','','paying','non-active',0,'2016-09-07 15:13:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(24,'moonctp1@gmail.com',NULL,'asasasas',1,'','','paying','active',0,'2016-09-07 15:36:58','2016-09-09 11:52:50',NULL,NULL,NULL,NULL),
	(25,'hahatest12@test.com',NULL,'alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 12:37:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(26,'hahatest13@test.com',NULL,'alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 12:37:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(27,'hahatest14@test.com',NULL,'alkghadlkhgaklsdjgf',5,'','','paying','active',0,'2016-09-08 12:38:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(28,'',NULL,'',5,'cd16cfe09d5da1182ff1f5007e5b6839','','paying','non-active',0,'2016-09-08 15:32:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(29,'',NULL,'',5,'987a2e10d05d14c83884bc0a24e0c514','','paying','non-active',0,'2016-09-08 15:48:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(30,'',NULL,'',5,'2255961c4c64d66c2c1e687575eba8ae','','paying','non-active',0,'2016-09-08 15:49:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(31,'hahatest113@test.com',NULL,'asasasas',1,'','','paying','non-active',0,'2016-09-08 15:50:02','2016-09-08 15:56:31',NULL,NULL,NULL,NULL),
	(32,'hahatest112@test.com',NULL,'e219b56989281a7846dd836161d7a2bd',1,'','','paying','active',0,'2016-09-08 15:56:34','2016-09-09 12:43:35',NULL,NULL,NULL,NULL),
	(33,'test2',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:54','2017-04-07 05:06:15',NULL,NULL,NULL,NULL),
	(34,'',NULL,'',5,'f73722773cd0b2a76c1fa66294a049cd','','paying','non-active',0,'2016-09-09 17:10:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(35,'testing@gmail.com',NULL,'',5,'04e80538773a0f4251cfcf39b5c15ea0','','paying','active',0,'2016-09-09 17:10:42','2017-02-22 15:09:01',NULL,NULL,NULL,NULL),
	(37,'',NULL,'',5,'66ffc66d321aaf8c289eed06777c2541','','paying','non-active',0,'2016-10-14 17:24:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(38,'test1',NULL,'25d55ad283aa400af464c76d713c07ad',5,'e1dc44d9ebc910b81847fa060b4ae79f','','paying','non-active',0,'2016-10-14 17:24:58','2017-01-07 03:58:21',NULL,NULL,NULL,NULL),
	(39,'',NULL,'',5,'f786a21f14b6be2fd31e71bfd52b0c80','','free','active',0,'2016-10-14 17:27:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(40,'',NULL,'',5,'24dab63fb5a1bee3059db416f95babb4','','free','active',0,'2016-10-14 17:27:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(43,'test3','ctm@student.com','25d55ad283aa400af464c76d713c07ad',3,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:54','2018-05-06 15:36:25',NULL,NULL,NULL,NULL),
	(44,'test4','lwk@student.com','25d55ad283aa400af464c76d713c07ad',3,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:54','2018-05-06 15:36:26',NULL,NULL,NULL,NULL),
	(45,'test5',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(46,'test6',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(47,'test7',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(48,'test8',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(49,'test9',NULL,'25d55ad283aa400af464c76d713c07ad',5,'25d55ad283aa400af464c76d713c07ad','','paying','active',0,'2016-12-05 10:10:55','2016-12-06 01:41:33',NULL,NULL,NULL,NULL),
	(52,'kyo@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-12-06 08:52:33','2017-07-01 11:39:22',NULL,NULL,NULL,NULL),
	(53,'Hong Lam','hong304@gmail.com','e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-12-06 08:52:42','2017-07-01 11:35:02',1,NULL,'ZvpsWelz9mXkzMzwx972Ihg317FsMIxU0rXa7Bf9TRLaLlaGGdPyiuBbRq6B',NULL),
	(54,'tonykung06@hotmail.com',NULL,'ae2b1fca515949e5d54fb22b8ed95575',4,'','','paying','active',0,'2016-12-06 09:32:53','2016-12-06 09:47:48',NULL,NULL,NULL,NULL),
	(55,'fukkuen@gmail.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2016-12-07 03:31:11','2017-02-18 15:19:38',NULL,NULL,NULL,NULL),
	(56,'kyo1@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-15 10:02:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(57,'kyofight@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-15 15:50:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(58,'kyo12@gmail.com',NULL,'bafc1dec2abfc3aa2eb326f8881c6f6a',5,'','','paying','non-active',0,'2016-12-15 16:09:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(59,'kyo123@gmail.com',NULL,'3aace69300a218eb72fe4ade64158f9e',5,'','','paying','non-active',0,'2016-12-15 16:17:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(60,'hong@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',5,'','','paying','active',0,'2016-12-19 07:53:01','2016-12-19 07:54:14',NULL,NULL,NULL,NULL),
	(61,'af@aag.com',NULL,'a4cb14f0c468232636bc915047ef1180',5,'','','paying','non-active',0,'2016-12-23 12:38:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(62,'kk@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',5,'','','paying','non-active',0,'2016-12-26 18:08:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(63,'fwr@asfs.com',NULL,'96e79218965eb72c92a549dd5a330112',5,'','','paying','non-active',0,'2016-12-26 18:12:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(64,'moonctpdw1@gmail.com',NULL,'e10adc3949ba59abbe56e057f20f883e',4,'','','paying','non-active',0,'2016-12-26 18:13:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(65,'sgsf@sfdf.com',NULL,'96e79218965eb72c92a549dd5a330112',4,'','','paying','non-active',0,'2016-12-26 18:23:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(66,'ggg','ggg@gmail.com','e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-12-26 18:38:06','2018-02-26 11:24:47',NULL,NULL,'niYYVEoR7Q1J7nRByOfhlXP3IswrH6yJohFjPAdqj4Mhw2k7yjUOKXg3E4N1',NULL),
	(67,'testing@mail.com',NULL,'87ffe0353dd626ef6efee0c5a7871d0d',5,'','','paying','non-active',0,'2016-12-31 02:07:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(68,'testing2@mail.com',NULL,'87ffe0353dd626ef6efee0c5a7871d0d',4,'','','paying','non-active',0,'2016-12-31 02:08:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(69,'kkk@gmail.com',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','non-active',0,'2017-01-01 02:12:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(70,'test@gmail.com',NULL,'7dd05f4bf93b416b650331c4db018cdd',4,'','','paying','non-active',0,'2017-01-04 07:11:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(71,'bill',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-06 04:55:46','2017-02-08 05:23:47',NULL,NULL,NULL,NULL),
	(72,'asdf@gg.com',NULL,'789488a3ba254518497b8ad55e70ef28',4,'','','paying','non-active',0,'2017-01-09 04:27:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(73,'eric',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-10 02:52:15','2017-01-10 02:52:25',NULL,NULL,NULL,NULL),
	(74,'fukkuen_child@gmail.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-01-12 03:55:23','2017-01-13 09:58:10',NULL,NULL,NULL,NULL),
	(75,'henry',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 02:14:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(76,'davis',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 02:14:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(77,'yanson',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-13 02:14:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(78,'fukkuen.work@gmail.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-01-16 07:42:21','2017-01-18 03:40:21',NULL,NULL,NULL,NULL),
	(79,'zart@s.bloq.ro',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-01-18 04:39:23','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(80,'iqrr@mymailto.cf',NULL,'a2d1cbd1a6656e68feee580f4c1fc5f6',5,'','','paying','non-active',0,'2017-01-19 01:40:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(81,'pun',NULL,'25d55ad283aa400af464c76d713c07ad',1,'','','paying','active',0,'2017-01-20 04:50:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(82,'test11',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(83,'test12',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(84,'test13',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(85,'test14',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(86,'test15',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(87,'test16',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(88,'test17',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(89,'test18',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(90,'test19@gmail.com',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-20 04:54:58','2017-01-20 08:14:28',NULL,NULL,NULL,NULL),
	(91,'p1',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 02:48:51','2017-01-25 10:13:08',NULL,NULL,NULL,NULL),
	(92,'hong@whoami.pw',NULL,'e94ab5a3e2d72c7c325045f3ce30f141',4,'','','paying','active',0,'2017-01-25 06:02:50','2017-02-18 07:45:28',NULL,NULL,NULL,NULL),
	(93,'p2',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:14','2017-01-25 10:15:00',NULL,NULL,NULL,NULL),
	(94,'p3',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:17','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(95,'p4',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:19','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(96,'p5',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:21','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(97,'p6',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:24','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(98,'s1',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:28','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(99,'s2',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:13:32','2017-01-25 10:15:01',NULL,NULL,NULL,NULL),
	(100,'s3',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:15:06','2017-01-25 10:16:03',NULL,NULL,NULL,NULL),
	(101,'s4',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:15:08','2017-01-25 10:16:03',NULL,NULL,NULL,NULL),
	(102,'s5',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:15:10','2017-01-25 10:16:03',NULL,NULL,NULL,NULL),
	(103,'s6',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-01-25 10:15:12','2017-01-25 10:16:03',NULL,NULL,NULL,NULL),
	(104,'billchan@gmail.com',NULL,'25d55ad283aa400af464c76d713c07ad',5,'0b1ece72b40328bb569092e564938020','','paying','active',0,'2017-01-28 09:18:29','2017-03-14 07:19:56',NULL,NULL,NULL,NULL),
	(105,'',NULL,'',5,'dfb14f5e6cfb00f6c3299deb0f59bee2','','free_trial','active',0,'2017-01-29 08:25:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(106,'',NULL,'',5,'4420ff214001ba2c9ed3cee7b6be9dab','','free_trial','active',0,'2017-01-29 08:27:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(107,'',NULL,'',5,'6f36e1ec401cedb23f42dd57081dae31','','free_trial','active',0,'2017-01-29 08:28:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(108,'',NULL,'',5,'d5a14a040d456d79083c433cf05c1fe1','','free_trial','active',0,'2017-01-29 08:34:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(109,'',NULL,'',5,'ad0230dbf1fe27774120177305dcac3c','','free_trial','active',0,'2017-01-29 08:48:53','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(110,'',NULL,'',5,'1edcaf8a7862617fd404d6b201edf19e','','free_trial','active',0,'2017-01-29 08:50:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(111,'',NULL,'',5,'aa9b9180d964dfe3dadfaf1178953b0f','','free_trial','active',0,'2017-01-29 08:51:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(112,'',NULL,'',5,'2d4928282fba1e52ac239ff9857ecd26','','free_trial','active',0,'2017-01-29 08:52:01','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(113,'',NULL,'',5,'9731178166acabe5828dbc587fc2a1b4','','free_trial','active',0,'2017-01-29 08:52:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(114,'',NULL,'',5,'34a1b846f0bd15a7edafdcc0349558ae','','free_trial','active',0,'2017-01-29 08:55:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(115,'',NULL,'',5,'4d08b0cc3ac9a5e014bdbad623adf2d8','','free_trial','active',0,'2017-01-29 08:58:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(116,'',NULL,'',5,'93e61a267700932b33384e066807746a','','free_trial','active',0,'2017-01-29 08:58:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(117,'',NULL,'',5,'93b86f9731aff08ab233c65e27cdb8f5','','free_trial','active',0,'2017-01-29 09:50:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(118,'',NULL,'',5,'c0a49cd85f8faa62095787e1f12cc1cc','','free_trial','active',0,'2017-01-29 09:51:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(119,'',NULL,'',5,'2cb3b8f691fae2297ac4e7c66be45c2c','','free_trial','active',0,'2017-01-29 09:51:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(120,'',NULL,'',5,'cdc369b6743da2425ce5eaffe941875d','','free_trial','active',0,'2017-01-29 09:51:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(121,'',NULL,'',5,'bb81f841432af57afe935fb4390a87fb','','free_trial','active',0,'2017-01-29 09:51:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(122,'',NULL,'',5,'14467fc15c3ce0ae3446fba7788a041a','','free_trial','active',0,'2017-01-29 09:52:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(123,'',NULL,'',5,'5cef4775ae4a86877f11cfc84ec4059d','','free_trial','active',0,'2017-01-29 09:57:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(124,'',NULL,'',5,'b03d39abe86934ddcd6174b02b8d39cd','','free_trial','active',0,'2017-01-29 09:57:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(125,'',NULL,'',5,'d948088bb3cde69bd21e4fa7f6a63904','','free_trial','active',0,'2017-01-29 10:05:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(126,'',NULL,'',5,'67101eafa7519b85316b22c99e64fed6','','free_trial','active',0,'2017-01-29 16:34:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(127,'',NULL,'',5,'775c9976056a6d6597b7f7a614d8fd13','','free_trial','active',0,'2017-01-29 16:34:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(128,'',NULL,'',5,'34a55357eda40f36a00aaa43ecd90e07','','free_trial','active',0,'2017-01-29 16:36:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(129,'',NULL,'',5,'2887af207eeb77fa764447acdb4b6d87','','free_trial','active',0,'2017-01-29 16:37:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(130,'',NULL,'',5,'c9348f3f66d15711d6128b9f7b2be1e1','','free_trial','active',0,'2017-01-29 16:58:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(131,'',NULL,'',5,'5cf4caad2a9eb0589d232ec5fb164f23','','free_trial','active',0,'2017-01-29 16:59:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(132,'',NULL,'',5,'df41e63a00e3cd94002239eae1c5171b','','free_trial','active',0,'2017-01-30 08:46:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(133,'',NULL,'',5,'b398a4a4d04906ff2cbbcdb6cf0b6f76','','free_trial','active',0,'2017-01-30 08:55:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(134,'',NULL,'',5,'a94112f98a2ffd5d6932144b40277d5e','','free_trial','active',0,'2017-01-30 16:39:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(135,'',NULL,'',5,'9c057812cf9305a76b4783429855db07','','free_trial','active',0,'2017-01-31 10:01:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(136,'',NULL,'',5,'ff746cd149d0aed0a095ce05496872a9','','free_trial','active',0,'2017-01-31 18:08:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(137,'admin1',NULL,'25d55ad283aa400af464c76d713c07ad',1,'b64a36429ef0abe0dc1cce6745c479b3','','paying','active',0,'2017-02-01 08:06:31','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(138,'admin2',NULL,'25d55ad283aa400af464c76d713c07ad',1,'58e798cc3934b425dc4073caeeb3519a','','paying','active',0,'2017-02-01 08:06:34','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(139,'admin3',NULL,'25d55ad283aa400af464c76d713c07ad',1,'1922402e8758a2c84cdf25e0d8c2418e','','paying','active',0,'2017-02-01 08:06:36','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(140,'admin4',NULL,'25d55ad283aa400af464c76d713c07ad',1,'2dd68500b855fa7037a0c07bee66def1','','paying','active',0,'2017-02-01 08:06:39','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(141,'admin5',NULL,'25d55ad283aa400af464c76d713c07ad',1,'7962b3731a75ea99188bd4ce60a629df','','paying','active',0,'2017-02-01 08:06:41','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(142,'admin6',NULL,'25d55ad283aa400af464c76d713c07ad',1,'375121a345665cc9e0cc22d5dd805083','','paying','active',0,'2017-02-01 08:06:43','2017-02-01 08:07:29',NULL,NULL,NULL,NULL),
	(143,'',NULL,'',5,'686e5d16281ad9c3df4875d13bfe7ba3','','free_trial','active',0,'2017-02-01 13:39:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(144,'',NULL,'',5,'d9f4c115e1d09e863e7e4a534d57597e','','free_trial','active',0,'2017-02-01 16:06:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(145,'',NULL,'',5,'26ce48a08f902aacb662c9a621d3dc50','','free_trial','active',0,'2017-02-02 14:56:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(146,'',NULL,'',5,'4c6b5ec56ec9a1706726e821b3de2282','','free_trial','active',0,'2017-02-02 14:59:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(147,'',NULL,'',5,'8cd409fc083a07073e81d819a836a37e','','free_trial','active',0,'2017-02-02 16:00:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(148,'',NULL,'',5,'4f9cf337df8b2bceb874b7021b811093','','free_trial','active',0,'2017-02-04 02:50:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(149,'',NULL,'',5,'2c7643d71a2f5894feb263b088073541','','free_trial','active',0,'2017-02-04 06:56:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(150,'',NULL,'',5,'988eb2e8e9425007a8e6c40671a3f4db','','free_trial','active',0,'2017-02-05 13:37:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(151,'',NULL,'',5,'a5617468b7a845223eb4719df9b88b32','','free_trial','active',0,'2017-02-05 13:37:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(152,'',NULL,'',5,'cdf75a952dbd0dd266a15f0b04ce5a00','','free_trial','active',0,'2017-02-05 14:08:20','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(153,'',NULL,'',5,'bfbc75e3c279995d6484a48aafbc4995','','free_trial','active',0,'2017-02-05 16:18:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(154,'eve',NULL,'25d55ad283aa400af464c76d713c07ad',1,'cab9c819ff015409f663754bfc5caca3','','paying','active',0,'2017-02-06 03:09:48','2017-02-06 03:10:55',NULL,NULL,NULL,NULL),
	(155,'',NULL,'',5,'6ea569286161e1558e54c0717ecf7596','','free_trial','active',0,'2017-02-06 08:41:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(156,'',NULL,'',5,'7f06a5a4ae8492ee9e5bc6f8feec5e1b','','free_trial','active',0,'2017-02-06 08:56:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(157,'',NULL,'',5,'260d43b364abd15332405581962d9fb2','','free_trial','active',0,'2017-02-06 11:25:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(158,'',NULL,'',5,'4e8614a05877b4d22b83c467bb77e241','','free_trial','active',0,'2017-02-06 11:59:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(159,'',NULL,'',5,'6fc84158fca1ddb44bc24c2bfbaec6eb','','free_trial','active',0,'2017-02-06 12:01:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(160,'',NULL,'',5,'0d22338abb6d51681c9f6889d0206aef','','free_trial','active',0,'2017-02-06 13:14:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(161,'',NULL,'',5,'8e307229b77470565b73114109057731','','free_trial','active',0,'2017-02-06 22:02:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(162,'',NULL,'',5,'bb6243f712ed742101271ec4a2d35077','','free_trial','active',0,'2017-02-07 05:57:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(163,'shadow.ctp@gmail.com',NULL,'698f6173bb4378ee5bda0e857a819419',5,'','','paying','active',0,'2017-02-07 07:13:46','2017-02-07 07:19:15',NULL,NULL,NULL,NULL),
	(164,'applereview',NULL,'25d55ad283aa400af464c76d713c07ad',5,'bf5c7a3433249c743cff5367c7b7d780','','free_trial','active',0,'2017-02-07 12:31:40','2017-03-02 04:36:57',NULL,NULL,NULL,NULL),
	(165,'',NULL,'',5,'7f95a9b27c4e2ecf1a67bc75173ee8ae','','free_trial','active',0,'2017-02-07 15:23:51','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(166,'moonctp@gmail.com',NULL,'698f6173bb4378ee5bda0e857a819419',5,'','','paying','active',0,'2017-02-08 03:43:10','2017-02-08 03:43:38',NULL,NULL,NULL,NULL),
	(167,'',NULL,'',5,'500c63c1c15e2c33c5150f568f9b35e6','','free_trial','active',0,'2017-02-08 14:18:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(168,'',NULL,'',5,'6050879f71a74ccc07dc2cc9147976c0','','free_trial','active',0,'2017-02-08 15:27:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(169,'',NULL,'',5,'fa8f6c94e66858fdc0209090d6eed36a','','free_trial','active',0,'2017-02-09 06:07:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(170,'',NULL,'',5,'55776797add8d55c91835fc0a1f21e5a','','free_trial','active',0,'2017-02-10 06:13:28','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(171,'',NULL,'',5,'0d44f4dcf5cb093d5966bc38ebe2aab2','','free_trial','active',0,'2017-02-10 07:29:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(172,'',NULL,'',5,'e1f5f1df077ee4e1a1f6ddcde45cad3c','','free_trial','active',0,'2017-02-10 07:33:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(173,'',NULL,'',5,'79455541c61393743050d1bed98e4ac1','','free_trial','active',0,'2017-02-10 08:29:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(174,'',NULL,'',5,'7665da55c700a2a253118a3ab3f46f5c','','free_trial','active',0,'2017-02-10 09:50:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(175,'',NULL,'',5,'469a7af0946bc6b641286fa445e02f3f','','free_trial','active',0,'2017-02-10 09:51:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(176,'',NULL,'',5,'b4269c3388c61585d0a85c12ee64a401','','free_trial','active',0,'2017-02-10 09:51:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(177,'',NULL,'',5,'2cb4304c8f39da56733157f7a11b7134','','free_trial','active',0,'2017-02-10 09:51:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(178,'',NULL,'',5,'c9931adf79fa5e2456fddfcee3adda73','','free_trial','active',0,'2017-02-10 09:52:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(179,'',NULL,'',5,'79fe3932eeed27889b4275db9f947b0e','','free_trial','active',0,'2017-02-10 10:04:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(180,'',NULL,'',5,'f3d1a6d912e06e7be58edfbeb615298b','','free_trial','active',0,'2017-02-10 10:04:49','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(181,'',NULL,'',5,'4c2b1c11192bec9e7006e0d29f914fe4','','free_trial','active',0,'2017-02-10 10:05:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(182,'',NULL,'',5,'bc748ded00a16fcb99be2ce6e05cfa15','','free_trial','active',0,'2017-02-10 10:05:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(183,'',NULL,'',5,'a2509eeb71b117371fe2db052e88b659','','free_trial','active',0,'2017-02-10 10:05:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(184,'',NULL,'',5,'cf02ebe80283ecc531b9971da452a7b6','','free_trial','active',0,'2017-02-10 10:05:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(185,'',NULL,'',5,'2236b565a99a782e39f6dd30ad8d1b03','','free_trial','active',0,'2017-02-10 10:06:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(186,'',NULL,'',5,'2347e4e4b84582a0a13406ef2455fa2d','','free_trial','active',0,'2017-02-10 16:39:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(187,'',NULL,'',5,'7f543095ae75ea4711c434ecd353888e','','free_trial','active',0,'2017-02-10 16:52:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(188,'',NULL,'',5,'299a793d5fb7db36fbaef16cbd7ce882','','free_trial','active',0,'2017-02-11 06:21:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(189,'',NULL,'',5,'a0b056040f12b987660937ef5e72df95','','free_trial','active',0,'2017-02-11 08:36:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(190,'',NULL,'',5,'dcb4c60215f184181caa53baaaaebeb3','','free_trial','active',0,'2017-02-11 09:34:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(191,'',NULL,'',5,'4e7dac3aedbc5f0fc02976e94e0c063a','','free_trial','active',0,'2017-02-12 06:39:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(192,'',NULL,'',5,'b1f13f169401712cc01266f9e4e1b5ce','','free_trial','active',0,'2017-02-12 08:02:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(193,'',NULL,'',5,'5386dadc3750e67f56e1d16ea7259849','','free_trial','active',0,'2017-02-12 11:35:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(194,'',NULL,'',5,'960ae96cddc6e6b9cf81ba2d303629d8','','free_trial','active',0,'2017-02-12 15:06:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(195,'',NULL,'',5,'0f71a446e4757a6efe967165732d1fee','','free_trial','active',0,'2017-02-12 17:24:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(196,'bill@gmail.com',NULL,'25d55ad283aa400af464c76d713c07ad',5,'7845b99b4d18eb6f0c5e4d69b8cd7645','','paying','active',0,'2017-02-13 09:37:46','2017-02-13 09:40:18',NULL,NULL,NULL,NULL),
	(197,'',NULL,'',5,'a841291d0084a5d3dedcaecfc19395e1','','free_trial','active',0,'2017-02-13 12:27:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(198,'dennis',NULL,'25d55ad283aa400af464c76d713c07ad',1,'fba4a711a96008ea7c0c308013cc1cf3','','paying','active',0,'2017-02-13 12:27:50','2017-02-21 03:07:30',NULL,NULL,NULL,NULL),
	(199,'',NULL,'',5,'f749b7df092d71b961a902477e618729','','free_trial','active',0,'2017-02-13 15:50:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(200,'',NULL,'',5,'d30def67eaec8a92c50794ba043a4d5a','','free_trial','active',0,'2017-02-14 00:54:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(201,'',NULL,'',5,'3f4205b65d17ee54e091327460b12d6b','','free_trial','active',0,'2017-02-14 02:42:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(202,'rrmz@xing886.uu.gl',NULL,'d0544a2974d464ba3cc31cf65c31b664',4,'','','paying','active',0,'2017-02-14 06:49:12','2017-02-14 06:50:09',NULL,NULL,NULL,NULL),
	(203,'ad@gmadsi.com',NULL,'21f31943a89f875264caac435beabcb6',5,'','','paying','non-active',0,'2017-02-14 07:04:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(204,'',NULL,'',5,'3f3d6bc66712916e6e7e1ffa65a9939f','','free_trial','active',0,'2017-02-14 07:48:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(205,'',NULL,'',5,'323a5b8d752399aa0debcb928b47ea59','','free_trial','active',0,'2017-02-14 08:26:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(206,'',NULL,'',5,'eea309b306af09e24069d405486409b6','','free_trial','active',0,'2017-02-14 09:13:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(207,'',NULL,'',5,'11559d729b2f8a6bba8da77bd79542d8','','free_trial','active',0,'2017-02-14 10:01:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(208,'',NULL,'',5,'99e78fb4bc391e1bd2787aaf8b277419','','free_trial','active',0,'2017-02-14 10:57:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(209,'',NULL,'',5,'d32914bfbd7ce9771756aa15621b12b1','','free_trial','active',0,'2017-02-14 13:11:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(210,'',NULL,'',5,'e70a855e9fda89b439626ede38ff611f','','free_trial','active',0,'2017-02-15 11:29:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(211,'',NULL,'',5,'9942680d1bb5cbb31aa8f01b90f2edde','','free_trial','active',0,'2017-02-15 11:29:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(212,'',NULL,'',5,'f3b0a2af38f423ecba77a26cbee87610','','free_trial','active',0,'2017-02-15 11:31:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(213,'',NULL,'',5,'3968ba65679acaca4220bf0bf9c319c8','','free_trial','active',0,'2017-02-15 11:31:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(214,'',NULL,'',5,'89b25b8676d6cd591519a60bb70b70d4','','free_trial','active',0,'2017-02-15 11:32:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(215,'',NULL,'',5,'615c5b9f5b28544440fb4b86be99150d','','free_trial','active',0,'2017-02-15 16:15:20','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(216,'',NULL,'',5,'6047a57ab8e7cda52095b57aba3cf1a3','','free_trial','active',0,'2017-02-16 09:09:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(217,'',NULL,'',5,'f3e2125ea927dc53a6d37be71960f176','','free_trial','active',0,'2017-02-16 10:44:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(218,'',NULL,'',5,'51132a7d04d009d470527d4c0a586092','','free_trial','active',0,'2017-02-16 11:54:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(219,'',NULL,'',5,'a0186f26e231edf54471d1feb0b506ed','','free_trial','active',0,'2017-02-16 12:46:49','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(220,'',NULL,'',5,'d86c76ab55094128946dd5c04de36ac5','','free_trial','active',0,'2017-02-16 15:26:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(221,'',NULL,'',5,'986f83a631f154de54913db41286c7c4','','free_trial','active',0,'2017-02-17 06:14:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(222,'',NULL,'',5,'dcc68165f7c3e25052dd68275ca12937','','free_trial','active',0,'2017-02-17 10:23:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(223,'',NULL,'',5,'f5b63406ef66d8d6e7a237d56eea621f','','free_trial','active',0,'2017-02-17 12:25:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(224,'',NULL,'',5,'48970d96af039af12103ffd84e4ac340','','free_trial','active',0,'2017-02-17 12:25:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(225,'',NULL,'',5,'a68acc2ec6ee34f7f74ca6f2771ce53d','','free_trial','active',0,'2017-02-17 12:26:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(226,'',NULL,'',5,'ceb3543a55f8de6782f4055de1d0dec9','','free_trial','active',0,'2017-02-17 12:26:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(227,'',NULL,'',5,'41a7d570922a6b06eaf8f35dbc97f04d','','free_trial','active',0,'2017-02-17 12:29:01','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(228,'',NULL,'',5,'b554e7c11699f2757d46f666ad954431','','free_trial','active',0,'2017-02-17 12:30:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(229,'',NULL,'',5,'14aba339f68e06abc7b2c143240d298d','','free_trial','active',0,'2017-02-17 12:36:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(230,'',NULL,'',5,'8c6a9382894a71d46a866dd9ac6317fb','','free_trial','active',0,'2017-02-17 12:38:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(231,'',NULL,'',5,'69a5b6ef5c921e168a366f1efc43e60a','','free_trial','active',0,'2017-02-17 12:43:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(232,'',NULL,'',5,'418844870ce60b5bcedfc00cf6e5374b','','free_trial','active',0,'2017-02-17 12:43:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(233,'',NULL,'',5,'7667aff19a446ed8dac7bbb37cfd6a22','','free_trial','active',0,'2017-02-17 14:38:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(234,'',NULL,'',5,'7ecc0848d7d3a4b423814df72858b57e','','free_trial','active',0,'2017-02-17 14:38:40','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(235,'',NULL,'',5,'1613db136cad7321ab9965fe3b690ab8','','free_trial','active',0,'2017-02-17 14:38:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(236,'',NULL,'',5,'f1e2b9549e612d7e2bc28c5988bd5ff4','','free_trial','active',0,'2017-02-17 14:40:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(237,'',NULL,'',5,'ef30dcf229a182fd0bf64215e58e4f1c','','free_trial','active',0,'2017-02-17 14:54:40','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(238,'',NULL,'',5,'37adac590b85a51b7c59e9e44598e069','','free_trial','active',0,'2017-02-17 14:54:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(239,'',NULL,'',5,'536a7d0582bfd6ad12b5fba809cb3856','','free_trial','active',0,'2017-02-17 14:54:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(240,'',NULL,'',5,'792fe006f25c7e6242d5133458a9c3ae','','free_trial','active',0,'2017-02-17 17:09:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(241,'',NULL,'',5,'50c8c96d9946bf184c45cc7232e4337a','','free_trial','active',0,'2017-02-17 17:12:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(242,'',NULL,'',5,'7d30c5cfb8803f9d2221d66e3ef826d0','','free_trial','active',0,'2017-02-18 04:05:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(243,'',NULL,'',5,'86b0ee3f33e801fd0046caacf2d1f39e','','free_trial','active',0,'2017-02-18 08:17:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(244,'',NULL,'',5,'41e3513d4d81efd1b1f14b879d8d77f9','','free_trial','active',0,'2017-02-18 08:26:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(245,'test1@whoami.pw',NULL,'25d55ad283aa400af464c76d713c07ad',5,'','','paying','active',0,'2017-02-18 09:44:17','2017-02-18 09:47:37',NULL,NULL,NULL,NULL),
	(246,'',NULL,'',5,'b287d1e23c9127090a18cd4b50023b44','','free_trial','active',0,'2017-02-18 12:43:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(247,'',NULL,'',5,'ccd2b22e81546e922ff2bc9ae5e5ab14','','free_trial','active',0,'2017-02-18 13:35:53','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(248,'dquu@o.idigo.org',NULL,'dd4b21e9ef71e1291183a46b913ae6f2',5,'','','paying','active',0,'2017-02-18 14:22:28','2017-02-18 14:23:36',NULL,NULL,NULL,NULL),
	(249,'',NULL,'',5,'ff7af32c40ebd7aa575e68ff94a18eb1','','free_trial','active',0,'2017-02-18 15:06:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(250,'',NULL,'',5,'1c893a9a782fb5f0eeac9c6c70c389b9','','free_trial','active',0,'2017-02-19 00:02:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(251,'',NULL,'',5,'a41647556a3fa382f1c25141cc5c823c','','free_trial','active',0,'2017-02-19 03:08:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(252,'',NULL,'',5,'1d2af2c33bb4e4d7cbf62f26b3d12d3b','','free_trial','active',0,'2017-02-19 03:21:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(253,'',NULL,'',5,'5cf21a694348602dc6285a5d2f9f315d','','free_trial','active',0,'2017-02-19 07:44:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(254,'',NULL,'',5,'1c5e903c82ecc2003cef2c07bac7bdd5','','free_trial','active',0,'2017-02-19 07:44:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(255,'',NULL,'',5,'1885d290fd7f0bd329a650d29f5b40ee','','free_trial','active',0,'2017-02-19 08:23:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(256,'',NULL,'',5,'6a4a1724f95ad59b093d4c82df65891e','','free_trial','active',0,'2017-02-19 09:26:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(257,'',NULL,'',5,'3bcb13e8068e9fd6e5436d554ab514db','','free_trial','active',0,'2017-02-19 16:38:49','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(258,'',NULL,'',5,'aa1c47c2bcf1af8441249c0704eda8b4','','free_trial','active',0,'2017-02-20 06:43:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(259,'',NULL,'',5,'2bc778adf7c5c481149b2d49e4959125','','free_trial','active',0,'2017-02-20 06:43:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(260,'',NULL,'',5,'a0ba96afaad7ef774b1dba44087cc8aa','','free_trial','active',0,'2017-02-20 06:43:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(261,'',NULL,'',5,'de654de3bde825b28b55cfe30c4b2596','','free_trial','active',0,'2017-02-20 06:43:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(262,'',NULL,'',5,'dd304fdfbd9f944808636e510badc0cf','','free_trial','active',0,'2017-02-20 06:44:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(263,'',NULL,'',5,'3650445a7c9f862fca608339de531452','','free_trial','active',0,'2017-02-20 06:44:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(264,'',NULL,'',5,'f45bfae6b5114a2f9e5a97ee80f1a1c4','','free_trial','active',0,'2017-02-20 06:44:20','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(265,'',NULL,'',5,'23330e3e46c184b63720723f25b1803b','','free_trial','active',0,'2017-02-20 06:44:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(266,'',NULL,'',5,'6ed172ad7ab5136cb2ef209b0e0c2545','','free_trial','active',0,'2017-02-20 06:44:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(267,'',NULL,'',5,'87917542822a41457904e4d585d62628','','free_trial','active',0,'2017-02-20 06:44:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(268,'',NULL,'',5,'7c76069abaece49f6c3c9f116b0f79d8','','free_trial','active',0,'2017-02-20 10:51:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(269,'',NULL,'',5,'690d5eb3108801a9cb92cc82356038e6','','free_trial','active',0,'2017-02-20 12:19:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(270,'',NULL,'',5,'c8601dd2d08be680c4e8b352ba7518e8','','free_trial','active',0,'2017-02-20 13:21:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(271,'',NULL,'',5,'0b81c4358be8133856cfb8740603ad62','','free_trial','active',0,'2017-02-20 14:19:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(272,'',NULL,'',5,'77e528e5bcd5fac7d86e596afd9f5465','','free_trial','active',0,'2017-02-20 14:19:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(273,'',NULL,'',5,'c55f3cd7c85cde0d3459b20c728670bc','','free_trial','active',0,'2017-02-20 15:19:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(274,'',NULL,'',5,'12c259c08921c5f092edcf64abeeaffe','','free_trial','active',0,'2017-02-20 15:24:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(275,'demo1',NULL,'25d55ad283aa400af464c76d713c07ad',5,'336f9ca37df6cd467e03a35ee99e9796','','paying','active',0,'2017-02-20 15:35:44','2017-02-28 07:34:05',NULL,NULL,NULL,NULL),
	(276,'demo2',NULL,'25d55ad283aa400af464c76d713c07ad',5,'351937adf2bc9b97b08570d603750357','','paying','active',0,'2017-02-20 15:35:46','2017-02-28 07:34:05',NULL,NULL,NULL,NULL),
	(277,'demo3',NULL,'25d55ad283aa400af464c76d713c07ad',5,'d9e373aae938b972131c3d2ffeb6812b','','paying','active',0,'2017-02-20 15:35:53','2017-02-28 07:34:05',NULL,NULL,NULL,NULL),
	(278,'demo4',NULL,'25d55ad283aa400af464c76d713c07ad',5,'a2e2d83387b7d11e7f4e3c894033de61','','paying','active',0,'2017-02-20 15:35:56','2017-02-28 07:28:32',NULL,NULL,NULL,NULL),
	(279,'demo5',NULL,'25d55ad283aa400af464c76d713c07ad',1,'1ee0fbddcd8adbacc536636f9480e3d0','','paying','active',0,'2017-02-20 15:35:58','2017-02-20 15:36:51',NULL,NULL,NULL,NULL),
	(280,'demo6',NULL,'25d55ad283aa400af464c76d713c07ad',1,'7d7a2b1e59f4a10d3d29ffe28123fc36','','paying','active',0,'2017-02-20 15:36:01','2017-02-20 15:36:50',NULL,NULL,NULL,NULL),
	(281,'demo11',NULL,'25d55ad283aa400af464c76d713c07ad',1,'b591ce75aeb6cf49fc6bfa4bfc45ac6d','','paying','active',0,'2017-02-20 15:37:00','2017-02-20 15:37:50',NULL,NULL,NULL,NULL),
	(282,'demo22',NULL,'25d55ad283aa400af464c76d713c07ad',1,'cec8b98c0470edba7374217f58cf42e8','','paying','active',0,'2017-02-20 15:37:02','2017-02-20 15:37:50',NULL,NULL,NULL,NULL),
	(283,'demo33',NULL,'25d55ad283aa400af464c76d713c07ad',1,'22da1082499d1b2e27a99b85671f7e0b','','paying','active',0,'2017-02-20 15:37:05','2017-02-20 15:37:51',NULL,NULL,NULL,NULL),
	(284,'demo44',NULL,'25d55ad283aa400af464c76d713c07ad',1,'bbdc284aa1e56a266e942a7f6a8949a7','','paying','active',0,'2017-02-20 15:37:07','2017-02-20 15:37:51',NULL,NULL,NULL,NULL),
	(285,'demo55',NULL,'25d55ad283aa400af464c76d713c07ad',1,'0e1a0340c13bd1b58facb1ab5cad1934','','paying','active',0,'2017-02-20 15:37:10','2017-02-20 15:37:52',NULL,NULL,NULL,NULL),
	(286,'demo66',NULL,'25d55ad283aa400af464c76d713c07ad',1,'996fbbd37a31a8770e55465b0000bc4e','','paying','active',0,'2017-02-20 15:37:12','2017-02-20 15:37:52',NULL,NULL,NULL,NULL),
	(287,'',NULL,'',5,'2c9591403355f08066acfaa7ffb713d1','','free_trial','active',0,'2017-02-20 16:14:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(288,'',NULL,'',5,'4b9a5e9b12642c7a628b030e52b45840','','free_trial','active',0,'2017-02-20 16:16:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(289,'',NULL,'',5,'3c21fe50e688a30652676f5155c48c0f','','free_trial','active',0,'2017-02-21 01:21:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(290,'',NULL,'',5,'9aec9344441a81473393fc3976335a7a','','free_trial','active',0,'2017-02-21 01:40:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(291,'',NULL,'',5,'9f1c343d5872d71ed891bb77909aaabf','','free_trial','active',0,'2017-02-21 02:00:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(292,'',NULL,'',5,'85d0d78173447113e318d17d703b203e','','free_trial','active',0,'2017-02-21 02:01:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(293,'',NULL,'',5,'247a7b342799128b248a919294d2b57b','','free_trial','active',0,'2017-02-21 02:01:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(294,'',NULL,'',5,'4a201875bce8c60e69c912bd1d7bd320','','free_trial','active',0,'2017-02-21 02:01:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(295,'',NULL,'',5,'3016c9c718258ba987e4110c5cc9814c','','free_trial','active',0,'2017-02-21 06:31:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(296,'',NULL,'',5,'a76a41cde5d61f75317b3c9b793df526','','free_trial','active',0,'2017-02-21 06:42:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(297,'',NULL,'',5,'f691e7d0f3b15bb0b03dd363c736c3c3','','free_trial','active',0,'2017-02-21 06:54:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(298,'',NULL,'',5,'cc1fd69f2d9793745789c712df516d3c','','free_trial','active',0,'2017-02-21 07:03:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(299,'',NULL,'',5,'1bf98420a1c0a93d79a009f94a7a54de','','free_trial','active',0,'2017-02-21 07:03:28','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(300,'',NULL,'',5,'4e919c13c3639c8e5d8fba0da70b2fe6','','free_trial','active',0,'2017-02-21 07:03:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(301,'',NULL,'',5,'c4dda9c0098835badbb26e860263c8ba','','free_trial','active',0,'2017-02-21 07:03:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(302,'',NULL,'',5,'5313ca96749383180b4a18d8df4637b9','','free_trial','active',0,'2017-02-21 07:04:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(303,'',NULL,'',5,'f839d6c959eecf9c6110e76b07fbac8f','','free_trial','active',0,'2017-02-21 07:04:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(304,'',NULL,'',5,'e4bd18acba7b39cbda666ace61d0ed6d','','free_trial','active',0,'2017-02-21 07:04:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(305,'',NULL,'',5,'3bf3dfce84a95e2de1aa69a59726f441','','free_trial','active',0,'2017-02-21 07:04:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(306,'',NULL,'',5,'43967200d00de2f3e4b93f1616283ad9','','free_trial','active',0,'2017-02-21 07:04:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(307,'',NULL,'',5,'5fb28a9da6916e1b14eb0ff861ba4865','','free_trial','active',0,'2017-02-21 07:36:28','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(308,'uktest',NULL,'25d55ad283aa400af464c76d713c07ad',5,'814c0cb502c7894a365627acd6a334a3','','paying','active',0,'2017-02-21 08:52:34','2017-02-21 08:54:38',NULL,NULL,NULL,NULL),
	(309,'',NULL,'',5,'125bde7501c3bfff8322c26038b05b25','','free_trial','active',0,'2017-02-21 09:33:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(310,'',NULL,'',5,'03e95a8ed0e9468fe37b8a9651978b47','','free_trial','active',0,'2017-02-21 13:18:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(311,'',NULL,'',5,'5e9f2a9e1e86828fda0ee583c9b93f50','','free_trial','active',0,'2017-02-21 13:22:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(312,'',NULL,'',5,'9a625d60116ab16b7cd7c2b41e8e8a95','','free_trial','active',0,'2017-02-21 13:26:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(313,'',NULL,'',5,'ce7ce9a483689e9d7618f9c0013b7398','','free_trial','active',0,'2017-02-21 14:52:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(314,'',NULL,'',5,'e448b39759f9421d84efdfdd1c3c0574','','free_trial','active',0,'2017-02-21 14:54:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(315,'',NULL,'',5,'6d97000675ed6cce9086be99c7b755e3','','free_trial','active',0,'2017-02-21 14:54:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(316,'',NULL,'',5,'cad1bdcdbd82ea11b426378fee5e46f9','','free_trial','active',0,'2017-02-21 14:55:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(317,'',NULL,'',5,'44392c095ddfa61a2468d971ef370069','','free_trial','active',0,'2017-02-21 14:55:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(318,'',NULL,'',5,'607e4cb06fa0aa4d97ae4fefc057aa56','','free_trial','active',0,'2017-02-21 14:55:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(319,'',NULL,'',5,'c089e094eb0f94c68d35f05985a46131','','free_trial','active',0,'2017-02-21 14:55:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(320,'',NULL,'',5,'d6cd8e4443230054ad571dafed805b44','','free_trial','active',0,'2017-02-21 15:09:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(321,'',NULL,'',5,'141bb288a82132291d748f9fd05c9355','','free_trial','active',0,'2017-02-21 15:16:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(322,'',NULL,'',5,'638caa067decccf310b16ade46588e29','','free_trial','active',0,'2017-02-21 15:29:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(323,'',NULL,'',5,'c93939f303769b10d797e443748f1b9f','','free_trial','active',0,'2017-02-21 15:29:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(324,'',NULL,'',5,'8ce031ddeae51e4e7195e29c24382b80','','free_trial','active',0,'2017-02-21 15:29:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(325,'',NULL,'',5,'7625311a29541048958aa12a2f8ad9d4','','free_trial','active',0,'2017-02-21 15:32:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(326,'',NULL,'',5,'4d11e550ac5e03991fe15c4d871baf26','','free_trial','active',0,'2017-02-22 01:40:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(327,'',NULL,'',5,'e3903a0170813df10c80d7f0d85d5bb2','','free_trial','active',0,'2017-02-22 11:55:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(328,'',NULL,'',5,'cdf74b07415e61fb748d8c347309b626','','free_trial','active',0,'2017-02-23 08:27:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(329,'',NULL,'',5,'8fed5e004c4d748cd68c03546723b200','','free_trial','active',0,'2017-02-23 08:57:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(330,'',NULL,'',5,'bad7532953ae92ccd08f02be2616df7f','','free_trial','active',0,'2017-02-23 17:20:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(331,'',NULL,'',5,'f84439aa03f3fe17058b305a3d7ea1b1','','free_trial','active',0,'2017-02-23 18:23:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(332,'',NULL,'',5,'6288e36fb2dd7bcd836a26f5f9c466c0','','free_trial','active',0,'2017-02-24 09:35:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(333,'',NULL,'',5,'765d3ededb56156443e9d3da338a5506','','free_trial','active',0,'2017-02-24 09:35:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(334,'',NULL,'',5,'215089c5e13d7201f3cc44ed20294434','','free_trial','active',0,'2017-02-24 11:05:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(335,'',NULL,'',5,'db875c07159112bfd155ad44a293c714','','free_trial','active',0,'2017-02-24 11:05:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(336,'',NULL,'',5,'7e4d0b6570b6dc3b6df11ebf10fe2d56','','free_trial','active',0,'2017-02-24 11:37:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(337,'',NULL,'',5,'0b5b8a1a6b7ef706bc0b30325a9b8c8c','','free_trial','active',0,'2017-02-24 11:37:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(338,'',NULL,'',5,'afe8753c8680e6d0b47df6a07698c8c2','','free_trial','active',0,'2017-02-25 05:58:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(339,'',NULL,'',5,'e086503b065ff9ab7a024e462863cfa3','','free_trial','active',0,'2017-02-25 11:45:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(340,'',NULL,'',5,'903b815bcd78b0274787f9513d8034f7','','free_trial','active',0,'2017-02-25 13:56:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(341,'',NULL,'',5,'bb591f9f98b836f717d1fad62f9bc0d8','','free_trial','active',0,'2017-02-26 04:38:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(342,'',NULL,'',5,'1ebdbb8611684546f849e5cab8884bad','','free_trial','active',0,'2017-02-26 05:27:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(343,'',NULL,'',5,'1871a4ad9e4ca366e7bfc0bd71786e8e','','free_trial','active',0,'2017-02-26 05:27:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(344,'',NULL,'',5,'7ca19b6fc8419488414825e2ede873e2','','free_trial','active',0,'2017-02-26 05:27:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(345,'',NULL,'',5,'52cfb2dc0c25c861b8b6dab5993b5f05','','free_trial','active',0,'2017-02-26 05:27:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(346,'',NULL,'',5,'205c8f197b7b18c610d3c13eb9b26c1e','','free_trial','active',0,'2017-02-26 05:27:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(347,'',NULL,'',5,'1d94b62c20b05e330b328877a0831e6e','','free_trial','active',0,'2017-02-26 05:27:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(348,'',NULL,'',5,'63691b0cca1d69524300275a926674e4','','free_trial','active',0,'2017-02-26 05:28:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(349,'',NULL,'',5,'960a4a8010fb28ebaf9188245988916c','','free_trial','active',0,'2017-02-26 05:28:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(350,'',NULL,'',5,'560f5c59cfa0c59617ef6b2cf95e07f5','','free_trial','active',0,'2017-02-26 05:28:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(351,'',NULL,'',5,'46125ece9c56e30f9beb5b9e17c50793','','free_trial','active',0,'2017-02-26 05:28:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(352,'',NULL,'',5,'1a87c281c587548a4474d8c6c28d137c','','free_trial','active',0,'2017-02-26 05:29:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(353,'',NULL,'',5,'16fdc189262b8c2f06ad126627e8e2e8','','free_trial','active',0,'2017-02-26 05:29:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(354,'',NULL,'',5,'e758ea048c068405b70c99a3a074229e','','free_trial','active',0,'2017-02-26 05:29:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(355,'',NULL,'',5,'864990cae1b6930aeaa7302e2698ea04','','free_trial','active',0,'2017-02-26 05:29:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(356,'',NULL,'',5,'5ea3d977f57f171816e1816f38a12158','','free_trial','active',0,'2017-02-26 09:04:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(357,'',NULL,'',5,'223b370f5d1ba688363aab10505912cd','','free_trial','active',0,'2017-02-26 13:15:54','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(358,'',NULL,'',5,'07e7e62746c55d9b6900cd599a3a135f','','free_trial','active',0,'2017-02-26 13:19:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(359,'',NULL,'',5,'c69efccb57d5c729cf02df74700a83ab','','free_trial','active',0,'2017-02-26 15:46:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(360,'',NULL,'',5,'7fdfa86c52953249d1d8d7d8480e35d9','','free_trial','active',0,'2017-02-26 22:34:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(361,'',NULL,'',5,'6877d26ba81872830040af46a81f28f2','','free_trial','active',0,'2017-02-27 01:42:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(362,'',NULL,'',5,'29410da59683ea38f6e126e8f7b7aa7e','','free_trial','active',0,'2017-02-27 01:44:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(363,'',NULL,'',5,'bb64e11c45339a57a4b6e9e90f31fac6','','free_trial','active',0,'2017-02-27 01:46:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(364,'',NULL,'',5,'2d6c049c1582aa1e5795f2ee7500cfe2','','free_trial','active',0,'2017-02-27 06:05:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(365,'',NULL,'',5,'51707b8450311b3939ea3076f3f1a68f','','free_trial','active',0,'2017-02-27 06:06:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(366,'',NULL,'',5,'9756e2c972832cc2f392ad94a5d23fb4','','free_trial','active',0,'2017-02-27 06:36:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(367,'',NULL,'',5,'db95b247328820cb9fa5ae17bb42467d','','free_trial','active',0,'2017-02-27 06:57:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(368,'',NULL,'',5,'8691afb77aa7dad73788ed0c4301c546','','free_trial','active',0,'2017-02-27 07:52:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(369,'',NULL,'',5,'9c5c6d0724fc8ebaa559dfae0aa5adbb','','free_trial','active',0,'2017-02-27 07:53:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(370,'',NULL,'',5,'c5426ed69601dcbf0f8e028d5d927e89','','free_trial','active',0,'2017-02-27 08:27:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(371,'',NULL,'',5,'a9e38a580e2d56a53d88fbe6e3eec866','','free_trial','active',0,'2017-02-27 11:12:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(372,'',NULL,'',5,'ad4f4b2c8cdf351df756a867027b1bac','','free_trial','active',0,'2017-02-27 16:04:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(373,'',NULL,'',5,'eeb6242db626af15ea72849ec3a094b1','','free_trial','active',0,'2017-02-27 16:49:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(374,'',NULL,'',5,'5c5de7e02799db2f0c888078ef61a86a','','free_trial','active',0,'2017-02-27 17:22:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(375,'',NULL,'',5,'720894b679416f197ee87aec68bc792d','','free_trial','active',0,'2017-02-27 23:36:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(376,'',NULL,'',5,'af1395dacf149ac7e3fafb64b98ffe21','','free_trial','active',0,'2017-02-28 00:52:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(377,'',NULL,'',5,'bb0c852ceba4062ac63491deece2e827','','free_trial','active',0,'2017-02-28 01:07:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(378,'',NULL,'',5,'4b8b89b1c0771167e6bb29ddf97893e0','','free_trial','active',0,'2017-02-28 02:56:28','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(379,'',NULL,'',5,'4a171a702af9794f6c941e2fe462ff09','','free_trial','active',0,'2017-02-28 03:15:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(380,'',NULL,'',5,'5b2ca4510695575de342cd990fcf7b36','','free_trial','active',0,'2017-02-28 05:57:53','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(381,'furlong1',NULL,'25d55ad283aa400af464c76d713c07ad',5,'1c21c5683cb83995202273960072dc8f','','paying','active',0,'2017-02-28 07:29:28','2017-02-28 07:30:39',NULL,NULL,NULL,NULL),
	(382,'furlong2',NULL,'25d55ad283aa400af464c76d713c07ad',5,'1da37c619a8860b80ecc6268b5c48126','','paying','active',0,'2017-02-28 07:30:14','2017-02-28 07:30:39',NULL,NULL,NULL,NULL),
	(383,'tkou@vssms.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-02-28 09:17:12','2017-02-28 09:17:48',NULL,NULL,NULL,NULL),
	(384,'xemkr@xww.ro',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-02-28 09:18:53','2017-02-28 09:19:09',NULL,NULL,NULL,NULL),
	(385,'',NULL,'',5,'0e5b0b8527bc78c0feb08ed8f9d626b0','','free_trial','active',0,'2017-02-28 09:45:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(386,'',NULL,'',5,'e941b47a9396ffa325749deac1cd173d','','free_trial','active',0,'2017-02-28 11:03:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(387,'',NULL,'',5,'4988d435878157e94b37c92fb31f968e','','free_trial','active',0,'2017-02-28 11:17:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(388,'',NULL,'',5,'c4a64cc041ebae21ab21bf0366bfdba7','','free_trial','active',0,'2017-02-28 11:17:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(389,'',NULL,'',5,'8d13404f5464b21c392c231ab205dafa','','free_trial','active',0,'2017-02-28 11:17:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(390,'',NULL,'',5,'3b309efbd756798dcb672a9c1ca1ce76','','free_trial','active',0,'2017-02-28 11:17:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(391,'',NULL,'',5,'3e8e5839bf3ec8f8819420018a265619','','free_trial','active',0,'2017-02-28 11:18:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(392,'',NULL,'',5,'727931e6991a7ce7df479082707854e8','','free_trial','active',0,'2017-02-28 11:18:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(393,'',NULL,'',5,'ee2e86f1102272cb8f1cfe27ab6676d2','','free_trial','active',0,'2017-02-28 11:18:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(394,'',NULL,'',5,'0a3b64e7560d7f05b4a2dac1c770dea5','','free_trial','active',0,'2017-02-28 13:42:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(395,'',NULL,'',5,'17acdd480131a82bbfd92a44d0313072','','free_trial','active',0,'2017-02-28 14:00:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(396,'',NULL,'',5,'ee1ace7fdfc1248d6de498a722ee6162','','free_trial','active',0,'2017-02-28 14:02:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(397,'',NULL,'',5,'94e2ae66f05f494ff4f9363146671a49','','free_trial','active',0,'2017-02-28 15:15:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(398,'',NULL,'',5,'2ea6e396b4935b15bd063f18dcfbb3ab','','free_trial','active',0,'2017-02-28 16:19:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(399,'',NULL,'',5,'965bf875e9f79616ae7163cc7bf65163','','free_trial','active',0,'2017-02-28 16:33:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(400,'',NULL,'',5,'9e68318542bd6fe30ec8a22bcfb65d71','','free_trial','active',0,'2017-02-28 16:49:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(401,'',NULL,'',5,'a5baf0833d4bc5e3529e4abb5ad5aa0b','','free_trial','active',0,'2017-02-28 16:49:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(402,'',NULL,'',5,'428d5d4473430d1b20ffbc715d25289d','','free_trial','active',0,'2017-03-01 06:37:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(403,'',NULL,'',5,'2ff9438fb1c9abdcb955109c3e165cde','','free_trial','active',0,'2017-03-01 06:44:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(404,'',NULL,'',5,'e3ef22d2c34e261cbb7a060589c12ad8','','free_trial','active',0,'2017-03-01 06:44:51','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(405,'',NULL,'',5,'01a58cbf7e8279737243e554c6af10e1','','free_trial','active',0,'2017-03-01 06:45:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(406,'',NULL,'',5,'0e4cbbad2862b22ba361a11c41a38962','','free_trial','active',0,'2017-03-01 09:08:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(407,'',NULL,'',5,'11c83a0f3d22d51623c3a3431bcebf74','','free_trial','active',0,'2017-03-01 09:08:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(408,'',NULL,'',5,'4e4fe703af121554b86f7a2e58341581','','free_trial','active',0,'2017-03-01 12:31:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(409,'',NULL,'',5,'2d5176597190e4ec292a63eb748873f0','','free_trial','active',0,'2017-03-01 14:18:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(410,'',NULL,'',5,'acd428fc191b03aa0db3b5b261bd4c93','','free_trial','active',0,'2017-03-01 14:53:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(411,'',NULL,'',5,'1fcea38f5144ec8bf7fd6c075e62b8f6','','free_trial','active',0,'2017-03-01 14:54:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(412,'',NULL,'',5,'fad07d61ff800ca8de632d63a76b06a8','','free_trial','active',0,'2017-03-01 14:57:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(413,'',NULL,'',5,'cd4d3c22cc8393b2e398ac671306a1d6','','free_trial','active',0,'2017-03-01 16:22:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(414,'',NULL,'',5,'51d5a49be94e0f7bc82b851564009980','','free_trial','active',0,'2017-03-01 16:43:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(415,'',NULL,'',5,'927b11354ae8a9c24e7620ae3641fefe','','free_trial','active',0,'2017-03-01 17:11:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(416,'',NULL,'',5,'236f766b92d056b5d2cda1b8a67365e8','','free_trial','active',0,'2017-03-01 18:15:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(417,'',NULL,'',5,'e033f437c7907f2ad1b053b670257892','','free_trial','active',0,'2017-03-02 00:09:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(418,'',NULL,'',5,'4abe98da80891f3636213d3051ae84da','','free_trial','active',0,'2017-03-02 01:17:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(419,'',NULL,'',5,'b041ef831b2e4acf9457a68b5f9d0151','','free_trial','active',0,'2017-03-02 05:55:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(420,'',NULL,'',5,'a9d82e9505433556b91dfb552ecdace0','','free_trial','active',0,'2017-03-02 05:56:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(421,'',NULL,'',5,'1b793af1b96bb9b8ade8449258422c5d','','free_trial','active',0,'2017-03-02 05:57:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(422,'',NULL,'',5,'2648256f18f937926107411ec0d561a3','','free_trial','active',0,'2017-03-02 05:58:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(423,'',NULL,'',5,'bcc33a6ddc971ff2c6169bf1fc9ae1b8','','free_trial','active',0,'2017-03-02 09:16:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(424,'',NULL,'',5,'e66545c4eac0baa580e69803e83e8d22','','free_trial','active',0,'2017-03-02 09:20:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(425,'',NULL,'',5,'10485435b6007e5eec3fe669096b383b','','free_trial','active',0,'2017-03-02 10:39:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(426,'',NULL,'',5,'ecf46d01a4746b342b8465099d28d984','','free_trial','active',0,'2017-03-02 11:00:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(427,'',NULL,'',5,'884b53d6abf38e7137bb7536e20ecc81','','free_trial','active',0,'2017-03-02 14:00:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(428,'',NULL,'',5,'66d118367e6ea54ba208a96dd9af024e','','free_trial','active',0,'2017-03-02 14:01:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(429,'',NULL,'',5,'b85c93bddb93baaf48223b899710ddb9','','free_trial','active',0,'2017-03-02 14:03:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(430,'',NULL,'',5,'d7f27cd5577dee1fe601b249b0ccdafe','','free_trial','active',0,'2017-03-02 14:16:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(431,'',NULL,'',5,'d3d9d0ceb40470d5a8e77b187aeb398c','','free_trial','active',0,'2017-03-02 14:18:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(432,'',NULL,'',5,'8f911ab922ba7413b860c0c212ad6f22','','free_trial','active',0,'2017-03-02 14:30:01','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(433,'',NULL,'',5,'fc6b84a61930aa004952c4737420c43e','','free_trial','active',0,'2017-03-02 14:51:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(434,'',NULL,'',5,'16e9ff1501be05de177e8e7df7627788','','free_trial','active',0,'2017-03-02 14:56:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(435,'',NULL,'',5,'edda0e0dbffc5fda1c6075f822452417','','free_trial','active',0,'2017-03-02 14:57:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(436,'',NULL,'',5,'a98e30ce4146f6aadc0d714f2d421a7d','','free_trial','active',0,'2017-03-02 15:24:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(437,'',NULL,'',5,'6fa0f4120100bb0adc2184a15e1d8010','','free_trial','active',0,'2017-03-02 15:45:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(438,'',NULL,'',5,'475b9f6cd105ec8596f5d85069cb1a08','','free_trial','active',0,'2017-03-02 15:50:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(439,'',NULL,'',5,'b3f543f05f4dea9885a6923bdc32de51','','free_trial','active',0,'2017-03-02 15:52:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(440,'',NULL,'',5,'c3a29e510cd72a1125ae12b56a5081ec','','free_trial','active',0,'2017-03-02 15:53:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(441,'',NULL,'',5,'63e689f2920e2a1d7943dd483133b654','','free_trial','active',0,'2017-03-02 15:55:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(442,'',NULL,'',5,'54d56d28f0cc02589214f98a4b1e7207','','free_trial','active',0,'2017-03-02 16:39:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(443,'',NULL,'',5,'51419711f87e0f29121d4eaa7a21c028','','free_trial','active',0,'2017-03-02 16:43:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(444,'',NULL,'',5,'5d38808dc0ea874af69b2484c52b6084','','free_trial','active',0,'2017-03-02 16:49:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(445,'',NULL,'',5,'eb795868ff0ee28e75f8490fbffe719b','','free_trial','active',0,'2017-03-02 16:50:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(446,'',NULL,'',5,'0185503ad402ab21746634ee05cbebbe','','free_trial','active',0,'2017-03-02 16:52:11','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(447,'',NULL,'',5,'9bd5345bb333c315ac47a59d69704ab3','','free_trial','active',0,'2017-03-03 05:04:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(448,'',NULL,'',5,'411a1ecdbfd22427d97863a69047b44e','','free_trial','active',0,'2017-03-03 05:10:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(449,'',NULL,'',5,'2269447cf6ea50606649cfc16b5793c2','','free_trial','active',0,'2017-03-03 05:13:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(450,'',NULL,'',5,'4f35f755e86f000f443b94cb219ca240','','free_trial','active',0,'2017-03-03 05:17:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(451,'',NULL,'',5,'dd998f003ad4d98773c6d745aa674750','','free_trial','active',0,'2017-03-03 05:24:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(452,'',NULL,'',5,'818aa3fb1a7070f314194d464253640a','','free_trial','active',0,'2017-03-03 07:32:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(453,'',NULL,'',5,'791bf26df2cd55b7c1c6fa75291fbaf7','','free_trial','active',0,'2017-03-03 08:30:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(454,'',NULL,'',5,'fbcd30db00ccc8b9e78c0df7527001fc','','free_trial','active',0,'2017-03-03 11:31:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(455,'',NULL,'',5,'5ae2d7527bd54d47997e38cff8c95f33','','free_trial','active',0,'2017-03-03 11:33:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(456,'',NULL,'',5,'d23b4c7c9cddbd3c35b70c6e0dec7327','','free_trial','active',0,'2017-03-03 14:06:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(457,'',NULL,'',5,'ae3e4894907c167eb38d8ff1ab13956d','','free_trial','active',0,'2017-03-03 14:36:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(458,'',NULL,'',5,'d4b0df595e73aa03390953f50d014e08','','free_trial','active',0,'2017-03-03 15:46:40','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(459,'',NULL,'',5,'4862359cc7dd2a36c0c5928a518b4401','','free_trial','active',0,'2017-03-03 15:59:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(460,'',NULL,'',5,'d3cbfc1f844cda8fe7d0026c8f644f6d','','free_trial','active',0,'2017-03-03 16:16:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(461,'',NULL,'',5,'94b622ffce192b52a1a0500fe99527ff','','free_trial','active',0,'2017-03-04 03:53:53','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(462,'',NULL,'',5,'6b65335ecdc3b128b85935538aaece79','','free_trial','active',0,'2017-03-04 04:28:08','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(463,'',NULL,'',5,'1ea0200b710bb27b3101032273252d36','','free_trial','active',0,'2017-03-04 05:01:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(464,'',NULL,'',5,'33c91452af3dfa6d53340b5299b0e2b9','','free_trial','active',0,'2017-03-04 05:08:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(465,'',NULL,'',5,'c6934829258687430ea0f5b4279e5605','','free_trial','active',0,'2017-03-04 05:25:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(466,'',NULL,'',5,'99dbcbe838d64e02bcd78fed0da7bba7','','free_trial','active',0,'2017-03-04 05:35:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(467,'',NULL,'',5,'64dcffd4c17421c010de27644a0a90c2','','free_trial','active',0,'2017-03-04 06:43:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(468,'',NULL,'',5,'6694988c953918c5b4ef6520b9a1ce50','','free_trial','active',0,'2017-03-04 07:42:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(469,'',NULL,'',5,'280825851673d82d9f4f656a2165ecf9','','free_trial','active',0,'2017-03-04 07:52:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(470,'',NULL,'',5,'6549b747700c6cf828b5c842dc4f272e','','free_trial','active',0,'2017-03-04 08:05:40','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(471,'',NULL,'',5,'d87fda819a61823f4f30d479b3f5960a','','free_trial','active',0,'2017-03-04 08:12:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(472,'',NULL,'',5,'133efcea2421c7812b956a474f567066','','free_trial','active',0,'2017-03-04 08:17:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(473,'',NULL,'',5,'946426990dcb88c253f1172f0d6911cf','','free_trial','active',0,'2017-03-04 08:21:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(474,'',NULL,'',5,'2923cd66f9c1204e5a328cb0241b39f0','','free_trial','active',0,'2017-03-04 08:37:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(475,'',NULL,'',5,'650808f75618bb6af5782134bcef50e1','','free_trial','active',0,'2017-03-04 15:41:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(476,'',NULL,'',5,'d921acc65ac53e6f68e43733a96c5092','','free_trial','active',0,'2017-03-04 16:02:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(477,'',NULL,'',5,'c45f18f3cfb1e01e8be892562a0b7b89','','free_trial','active',0,'2017-03-04 16:11:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(478,'',NULL,'',5,'e8c4dea69c38bcb5b2aeb93a24426eb2','','free_trial','active',0,'2017-03-04 16:15:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(479,'',NULL,'',5,'a221d541f3f37feff18c3ce4aa606817','','free_trial','active',0,'2017-03-04 17:45:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(480,'',NULL,'',5,'d9ebc4c7714030cc9a08e0a806ed729b','','free_trial','active',0,'2017-03-05 01:55:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(481,'',NULL,'',5,'b5c2aed0389999ca6acd1e242ec36d83','','free_trial','active',0,'2017-03-05 06:09:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(482,'',NULL,'',5,'2f0d74b2140bd44c49281b229b8a5a50','','free_trial','active',0,'2017-03-05 06:47:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(483,'',NULL,'',5,'86739fb93c3cd098d66a723ccb37f817','','free_trial','active',0,'2017-03-05 08:20:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(484,'',NULL,'',5,'b5160a0685c2b914fa562a37809133bf','','free_trial','active',0,'2017-03-05 08:59:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(485,'',NULL,'',5,'8f687e94924212cf967c034bcefbbd18','','free_trial','active',0,'2017-03-05 09:28:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(486,'',NULL,'',5,'da0d0d4a2c6904828b3275ced701cd7d','','free_trial','active',0,'2017-03-05 09:28:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(487,'',NULL,'',5,'bdd303d77705af98b02da070e9a4c7f6','','free_trial','active',0,'2017-03-05 10:01:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(488,'',NULL,'',5,'e56142d01fb45b3b5f3e9dd6787ff535','','free_trial','active',0,'2017-03-05 10:06:01','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(489,'',NULL,'',5,'019b73abebabb21fed737f0c5c59a272','','free_trial','active',0,'2017-03-05 11:23:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(490,'',NULL,'',5,'3061acd642153e9f79ffa41954d80320','','free_trial','active',0,'2017-03-05 11:31:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(491,'',NULL,'',5,'bbe36f76dad411105aae5b2592f92ca9','','free_trial','active',0,'2017-03-05 11:36:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(492,'',NULL,'',5,'b84715c1c2060b8d78a9fd25a413c181','','free_trial','active',0,'2017-03-05 14:38:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(493,'',NULL,'',5,'7fb160727f5e5caf9bd17cc61582b52a','','free_trial','active',0,'2017-03-05 14:43:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(494,'',NULL,'',5,'c1eb64f4fa6aa0cc0cc7a91f135c30d6','','free_trial','active',0,'2017-03-05 15:31:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(495,'',NULL,'',5,'4fdde9ee4ec4f98a2535cba1fd701f43','','free_trial','active',0,'2017-03-05 15:31:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(496,'',NULL,'',5,'7189637ecc008839d29650d0859b2039','','free_trial','active',0,'2017-03-05 15:36:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(497,'',NULL,'',5,'c4a574fabe771cb74af01d3fdc0203d2','','free_trial','active',0,'2017-03-05 15:38:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(498,'',NULL,'',5,'397b5bb081506e1376a208630f099db0','','free_trial','active',0,'2017-03-05 15:46:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(499,'',NULL,'',5,'fd9968103573d64418436b918954292e','','free_trial','active',0,'2017-03-05 16:05:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(500,'',NULL,'',5,'4512f45f140d6f5a9ed5622f6942e5a5','','free_trial','active',0,'2017-03-05 16:06:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(501,'',NULL,'',5,'b6e3818b56f9d41ffc77b02f5deab2dc','','free_trial','active',0,'2017-03-05 16:06:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(502,'',NULL,'',5,'bcc9cf63167d3b2f2e584bd1529f745e','','free_trial','active',0,'2017-03-05 16:15:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(503,'',NULL,'',5,'52cf504c9f7bee9c47dd54d7873272f8','','free_trial','active',0,'2017-03-06 07:02:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(504,'',NULL,'',5,'07d56682c1626ae23029f7157827e025','','free_trial','active',0,'2017-03-06 07:47:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(505,'',NULL,'',5,'99d88527e20b37799a5070c72350a755','','free_trial','active',0,'2017-03-06 08:44:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(506,'',NULL,'',5,'76c563b1066d43d9f18fa40d23a16601','','free_trial','active',0,'2017-03-06 09:48:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(507,'',NULL,'',5,'3a536a6b45bfe2e89a31af32870199d5','','free_trial','active',0,'2017-03-06 10:53:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(508,'',NULL,'',5,'59c520ca6c885dc3302269070db4b303','','free_trial','active',0,'2017-03-06 10:58:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(509,'',NULL,'',5,'6d62860f3587e7360b6dea28308249b6','','free_trial','active',0,'2017-03-06 13:08:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(510,'',NULL,'',5,'eab814459b0533fe5ee896a655591230','','free_trial','active',0,'2017-03-06 13:42:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(511,'',NULL,'',5,'8a4dacee11be1ffb5473f844699f7615','','free_trial','active',0,'2017-03-06 15:23:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(512,'',NULL,'',5,'3c24ba6f053b806f0d20e492b032c508','','free_trial','active',0,'2017-03-06 16:04:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(513,'',NULL,'',5,'d63b4caf565f75fc03be8d0da885dc29','','free_trial','active',0,'2017-03-06 16:09:53','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(514,'',NULL,'',5,'cf1d5e5fd15b9aa1bf587bc4d42ae011','','free_trial','active',0,'2017-03-06 16:29:51','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(515,'',NULL,'',5,'96d86924cdbce5302996844c998e7c0a','','free_trial','active',0,'2017-03-06 17:08:49','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(516,'',NULL,'',5,'e42abe5681e36185e79620bdff76ce39','','free_trial','active',0,'2017-03-06 17:15:30','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(517,'',NULL,'',5,'e5e1717e06ceb392ac77889a44af7a94','','free_trial','active',0,'2017-03-06 17:25:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(518,'',NULL,'',5,'2bae5d266f2885a68a06619a54fe9983','','free_trial','active',0,'2017-03-06 17:26:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(519,'',NULL,'',5,'020217bcd9c81568e5cf09e1d8afce5b','','free_trial','active',0,'2017-03-06 17:29:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(520,'',NULL,'',5,'64914e507331c11c9e6039a556e76119','','free_trial','active',0,'2017-03-07 03:08:46','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(521,'',NULL,'',5,'c4d8f11793cb99b60f0d17d426729454','','free_trial','active',0,'2017-03-07 04:03:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(522,'',NULL,'',5,'cb96409d09442d0dfa8a361e400d2f1f','','free_trial','active',0,'2017-03-07 04:29:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(523,'',NULL,'',5,'34fd56ad0eccec6c390f056120c9ddb1','','free_trial','active',0,'2017-03-07 05:03:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(524,'',NULL,'',5,'1df3998044b6b48574763c6b53e63c49','','free_trial','active',0,'2017-03-07 09:27:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(525,'',NULL,'',5,'b62980e8e93152141000182c5b560b78','','free_trial','active',0,'2017-03-07 09:27:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(526,'',NULL,'',5,'e3c62ef022990bcfca3760ec9a43fc79','','free_trial','active',0,'2017-03-07 09:38:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(527,'',NULL,'',5,'405ad6e048a18866928a40d9d270c0d2','','free_trial','active',0,'2017-03-07 10:47:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(528,'',NULL,'',5,'2565d135bf26cf2e86bf0703503c490f','','free_trial','active',0,'2017-03-07 15:27:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(529,'',NULL,'',5,'b3341d5e88ebd06d905d6848934026ad','','free_trial','active',0,'2017-03-07 15:27:33','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(530,'',NULL,'',5,'d577e6b42778d7e0f6a59d1bc139d7e6','','free_trial','active',0,'2017-03-07 15:29:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(531,'',NULL,'',5,'1d4fd9e0c8ab839976cb08b477574740','','free_trial','active',0,'2017-03-07 15:58:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(532,'',NULL,'',5,'8d3fd9e75c617821ca9e259606a1187f','','free_trial','active',0,'2017-03-07 16:04:51','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(533,'',NULL,'',5,'0b6f695c91b76ce733717607f847cf30','','free_trial','active',0,'2017-03-08 04:46:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(534,'',NULL,'',5,'6ec0b61ca9cddd2eb43c4df445ebe8e9','','free_trial','active',0,'2017-03-08 06:58:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(535,'',NULL,'',5,'efab11b1fe8e2b2a5b0e428260e3825b','','free_trial','active',0,'2017-03-08 13:25:07','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(536,'',NULL,'',5,'bad85d25686964a3b28c090c5b39b0b3','','free_trial','active',0,'2017-03-08 13:29:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(537,'',NULL,'',5,'d22990a4098cfc58402b20d6a3f7dc71','','free_trial','active',0,'2017-03-08 13:32:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(538,'',NULL,'',5,'68a42b6abffd56157d3615f6d3b0667d','','free_trial','active',0,'2017-03-08 23:26:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(539,'',NULL,'',5,'0b29332fd78c2d309f63668f1cc3abf4','','free_trial','active',0,'2017-03-09 02:54:25','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(540,'test@test.com',NULL,'26746c0f1b04825525b0a1fd4facb478',5,'','','paying','non-active',0,'2017-03-09 08:57:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(541,'fksv@l.safdv.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-09 08:59:56','2017-03-09 09:00:35',NULL,NULL,NULL,NULL),
	(542,'xbtx@1clck2.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-03-09 09:09:42','2017-03-09 09:09:57',NULL,NULL,NULL,NULL),
	(543,'dlyv@s.proprietativalcea.ro',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-09 09:11:27','2017-03-09 09:11:43',NULL,NULL,NULL,NULL),
	(544,'',NULL,'',5,'404a89199f2725e42e7d69eafd82a795','','free_trial','active',0,'2017-03-09 10:07:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(545,'',NULL,'',5,'f95d93a67fc8348e876cfdbed0028b53','','free_trial','active',0,'2017-03-09 10:23:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(546,'',NULL,'',5,'262aacb86d1537fd9d1d32ff226d9814','','free_trial','active',0,'2017-03-09 10:43:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(547,'',NULL,'',5,'1c556bc6aecbe88665de34bc4aec498e','','free_trial','active',0,'2017-03-09 10:44:52','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(548,'',NULL,'',5,'856d99b6d30e34772696f287d1e17cc1','','free_trial','active',0,'2017-03-09 15:29:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(549,'',NULL,'',5,'55da23894b2e56ff5b1c76705946c504','','free_trial','active',0,'2017-03-10 00:51:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(550,'',NULL,'',5,'734f55c92b83cc0f24f45b9d6eb8144b','','free_trial','active',0,'2017-03-10 03:00:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(551,'',NULL,'',5,'0b0d02f8501921c04d7b4e5b339094d5','','free_trial','active',0,'2017-03-10 13:33:45','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(552,'',NULL,'',5,'a2e1393c1c6b0c1a0bc4d199cb36c370','','free_trial','active',0,'2017-03-10 18:30:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(553,'',NULL,'',5,'ab439ef0825f71ddd13b896f3fdd0304','','free_trial','active',0,'2017-03-11 10:31:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(554,'',NULL,'',5,'df58711d90f2e45ce25f32dea5d66996','','free_trial','active',0,'2017-03-12 08:54:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(555,'',NULL,'',5,'54b33696620610bdc94690881a02ebb4','','free_trial','active',0,'2017-03-12 10:16:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(556,'',NULL,'',5,'7f13b09e3687bff24965e19b56197b39','','free_trial','active',0,'2017-03-12 11:20:56','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(557,'',NULL,'',5,'59f28d193003cedb4ff947104b9c4c6d','','free_trial','active',0,'2017-03-12 11:57:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(558,'',NULL,'',5,'7471451bb7ece25f6c58fb75fc03650c','','free_trial','active',0,'2017-03-12 12:47:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(559,'',NULL,'',5,'66d905b5e0fcb0bb5f23b6c5358e5e73','','free_trial','active',0,'2017-03-12 12:55:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(560,'',NULL,'',5,'959ad97531cd7b727b5714573e730afc','','free_trial','active',0,'2017-03-12 13:34:34','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(561,'',NULL,'',5,'53ca01f96439897516032e9d9e35344a','','free_trial','active',0,'2017-03-12 13:35:23','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(562,'',NULL,'',5,'9911f569258d9972eeb3545e960b8c16','','free_trial','active',0,'2017-03-12 13:35:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(563,'',NULL,'',5,'4e13fb1c4839f857b258375d06895b22','','free_trial','active',0,'2017-03-12 13:45:12','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(564,'',NULL,'',5,'b6cad68c2b68a785472d92b26e5e661b','','free_trial','active',0,'2017-03-12 13:46:26','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(565,'',NULL,'',5,'3ca71c85e3936d9031d5546310679de8','','free_trial','active',0,'2017-03-12 14:42:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(566,'',NULL,'',5,'f9c51e3769c89ab33e2cf08ac658362d','','free_trial','active',0,'2017-03-12 14:55:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(567,'',NULL,'',5,'5fca22e4a648e5bbce903c32f41e33ac','','free_trial','active',0,'2017-03-12 16:15:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(568,'',NULL,'',5,'f3245b2055e8b29f93d8e2b6fb48e71f','','free_trial','active',0,'2017-03-13 00:50:21','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(569,'',NULL,'',5,'a7ba9655bc550fd559584cbbbcac5506','','free_trial','active',0,'2017-03-13 02:42:24','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(570,'arbkr@maildx.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 03:24:04','2017-03-13 03:24:22',NULL,NULL,NULL,NULL),
	(571,'xwns@msrc.ml',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 03:43:12','2017-03-13 03:43:34',NULL,NULL,NULL,NULL),
	(572,'ueyv@i.ryanb.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 03:51:25','2017-03-13 03:51:41',NULL,NULL,NULL,NULL),
	(573,'eofv@e.wupics.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 03:57:56','2017-03-13 03:58:10',NULL,NULL,NULL,NULL),
	(574,'gxsz@drivetagdev.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-13 04:04:54','2017-03-13 09:41:38',NULL,NULL,NULL,NULL),
	(575,'jtfv@c.wlist.ro',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','active',0,'2017-03-13 04:28:09','2017-03-13 04:28:29',NULL,NULL,NULL,NULL),
	(576,'',NULL,'',5,'f5ddb53e56917b561ed9f7e1f0b0165e','','free_trial','active',0,'2017-03-13 09:39:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(577,'',NULL,'',5,'a9c07cbb9bfbf513db7f11b50c0414cc','','free_trial','active',0,'2017-03-13 13:03:32','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(578,'',NULL,'',5,'65dabf5ac7d193da5743b427cd074e02','','free_trial','active',0,'2017-03-13 13:55:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(579,'',NULL,'',5,'c4f17d108714a59ce930ef96c8be9edc','','free_trial','active',0,'2017-03-13 14:46:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(580,'',NULL,'',5,'684de3ad5f287c76c92654cdc8bcd056','','free_trial','active',0,'2017-03-13 14:59:43','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(581,'',NULL,'',5,'6170f44a3f619b76f76c42b931bdee2d','','free_trial','active',0,'2017-03-13 15:16:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(582,'',NULL,'',5,'b6b74b48d8476adb9fd0f38fa1e09e68','','free_trial','active',0,'2017-03-14 01:19:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(583,'saly@bst-72.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',4,'','','paying','non-active',0,'2017-03-14 03:04:42','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(584,'',NULL,'',5,'865b0732f422d7a4be18bb180ffc3ce4','','free_trial','active',0,'2017-03-14 05:34:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(585,'gg@gggggh.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-03-14 06:03:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(586,'goos@twkly.ml',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','active',0,'2017-03-14 06:04:57','2017-03-14 06:05:29',NULL,NULL,NULL,NULL),
	(587,'saly@bst-7d2.com',NULL,'5f4dcc3b5aa765d61d8327deb882cf99',5,'','','paying','non-active',0,'2017-03-14 06:15:03','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(588,'morris',NULL,'25d55ad283aa400af464c76d713c07ad',1,'f564f7ceef5b61ba3e07dcd37d278b73','','paying','active',0,'2017-03-14 07:08:21','2017-03-14 07:09:01',NULL,NULL,NULL,NULL),
	(589,'',NULL,'',5,'16531f3629c92ec2934944689b241ef2','','free_trial','active',0,'2017-03-14 08:40:16','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(590,'',NULL,'',5,'9f8ff217eb6c8433bf635b911b20dd9c','','free_trial','active',0,'2017-03-14 08:51:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(591,'',NULL,'',5,'c2d674a39fd90d0b1c5e13b56da8869f','','free_trial','active',0,'2017-03-14 09:12:19','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(592,'',NULL,'',5,'9f767b24260f504ad0d5d7c8242264ff','','free_trial','active',0,'2017-03-14 13:56:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(593,'',NULL,'',5,'82f201760fba812c97f38dd819980c38','','free_trial','active',0,'2017-03-14 14:49:59','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(594,'',NULL,'',5,'24fc2db140ccc1b92430fabb91607cce','','free_trial','active',0,'2017-03-14 15:04:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(595,'',NULL,'',5,'29604fae3b38022d12298a34e4cb051d','','free_trial','active',0,'2017-03-14 15:08:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(596,'',NULL,'',5,'4ff735af5e3c888c6871e83e810b66a8','','free_trial','active',0,'2017-03-15 05:22:36','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(597,'',NULL,'',5,'d1eb82eede0026763032739ef50db3de','','free_trial','active',0,'2017-03-15 05:27:35','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(598,'',NULL,'',5,'823055f44257a4e942c38e639e2f6318','','free_trial','active',0,'2017-03-15 05:27:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(599,'',NULL,'',5,'d3ec80befca3e5d384ea79c67afdd4c0','','free_trial','active',0,'2017-03-16 09:07:47','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(600,'',NULL,'',5,'4673da4e7fdc6451a7696ea74f347ec4','','free_trial','active',0,'2017-03-16 09:52:27','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(601,'',NULL,'',5,'8debdd44ccaf1dcf37a260c985a9a0ae','','free_trial','active',0,'2017-03-16 10:04:49','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(602,'',NULL,'',5,'8f49e160cdb67b846780471ae2a1309d','','free_trial','active',0,'2017-03-16 11:38:29','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(603,'',NULL,'',5,'13b5b7780b01754cf5bb89e3b82dd16c','','free_trial','active',0,'2017-03-16 11:38:38','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(604,'',NULL,'',5,'f43792a375be999dc84817c36ec45141','','free_trial','active',0,'2017-03-16 11:38:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(605,'',NULL,'',5,'00e8bbcd8e0f0f56c113b75bafdb36fd','','free_trial','active',0,'2017-03-16 11:38:57','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(606,'',NULL,'',5,'16975e86f553c9a305db61b4c7fcffe7','','free_trial','active',0,'2017-03-16 11:39:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(607,'',NULL,'',5,'cd25697f814f396399202b8e4f434581','','free_trial','active',0,'2017-03-16 11:39:14','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(608,'',NULL,'',5,'baecc3285e55efe1d0b2d11212aff4de','','free_trial','active',0,'2017-03-16 11:39:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(609,'',NULL,'',5,'745340f415b726f5c2321e69251dc43d','','free_trial','active',0,'2017-03-16 11:39:37','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(610,'',NULL,'',5,'f214e5ab5a16151f0dc56f084dbae6cf','','free_trial','active',0,'2017-03-16 11:47:02','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(611,'',NULL,'',5,'56387ddca459c3401fbbed0c7b1a9ae7','','free_trial','active',0,'2017-03-16 14:30:10','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(612,'',NULL,'',5,'36c482165a540d6ec70f2c13ea80ae80','','free_trial','active',0,'2017-03-16 15:11:05','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(613,'',NULL,'',5,'55c11732ca96ae4d8ce989cb35fecb5f','','free_trial','active',0,'2017-03-16 23:13:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(614,'',NULL,'',5,'50433b5e9dbaa6b5a5abe55e104a6b1a','','free_trial','active',0,'2017-03-17 06:35:15','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(615,'',NULL,'',5,'2236926427860c07ff5c209c2981132e','','free_trial','active',0,'2017-03-17 11:19:31','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(616,'',NULL,'',5,'2bd744ecb99220433451d2434bf92b53','','free_trial','active',0,'2017-03-18 05:57:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(617,'',NULL,'',5,'44da8be05405ee6c6b5080fc0f441657','','free_trial','active',0,'2017-03-18 06:32:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(618,'',NULL,'',5,'55f8fb6a5f0e74a683250f5622b4f5cc','','free_trial','active',0,'2017-03-18 07:51:09','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(619,'',NULL,'',5,'724c89bf8a62351a877db1f165cbc38d','','free_trial','active',0,'2017-03-18 07:51:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(620,'',NULL,'',5,'f977b2154365a8ee42b2d434420eaf54','','free_trial','active',0,'2017-03-18 07:51:50','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(621,'',NULL,'',5,'7e51a0f8f511ffac98e2b9bd8c1d3489','','free_trial','active',0,'2017-03-18 07:52:01','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(622,'',NULL,'',5,'910d24c3c848c54a760ae9806e98f8df','','free_trial','active',0,'2017-03-18 07:52:13','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(623,'',NULL,'',5,'4aee14866c2c1e50b1c7a9014e270322','','free_trial','active',0,'2017-03-18 08:17:04','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(624,'',NULL,'',5,'f1eeac482ad1540027302b519053ff2d','','free_trial','active',0,'2017-03-18 09:11:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(625,'',NULL,'',5,'db14554e00cdab76d0ba239cca1c87f8','','free_trial','active',0,'2017-03-18 15:20:18','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(626,'',NULL,'',5,'32c10d9894e94c7021a005eca38e7084','','free_trial','active',0,'2017-03-19 03:53:55','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(627,'',NULL,'',5,'1eefb4716b0b06747e765f743ab030ce','','free_trial','active',0,'2017-03-19 04:11:17','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(628,'test@test2.com',NULL,'25d55ad283aa400af464c76d713c07ad',4,'','','paying','non-active',0,'2017-03-19 06:05:48','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(629,'',NULL,'',5,'6e64c7b5779a621da8f16099e5a93870','','free_trial','active',0,'2017-03-19 06:12:41','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(630,'eric.hui@emcchk.com',NULL,'25d55ad283aa400af464c76d713c07ad',4,'','','paying','non-active',0,'2017-03-19 06:36:44','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(631,'erichui.phone@gmail.com',NULL,'25d55ad283aa400af464c76d713c07ad',4,'','','paying','active',0,'2017-03-19 06:41:32','2017-03-19 06:43:25',NULL,NULL,NULL,NULL),
	(632,'',NULL,'',5,'583f7d5eec1fe789c11a3fac92ec62b8','','free_trial','active',0,'2017-03-19 15:27:22','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(633,'',NULL,'',5,'0956e95d9e96da76d91d6ac630fff40e','','free_trial','active',0,'2017-03-20 08:25:00','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(634,'',NULL,'',5,'1f18f4d1987ba32baf97031da178c533','','free_trial','active',0,'2017-03-20 14:59:58','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(635,'',NULL,'',5,'a83194d2cc5f85f5f10994b21ef604c8','','free_trial','active',0,'2017-03-20 15:10:39','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(636,'',NULL,'',5,'cee97178d738e10612234cc427ef0561','','free_trial','active',0,'2017-03-20 16:33:06','2017-04-18 07:18:40',NULL,NULL,NULL,NULL),
	(643,'teacher one','teacher1@school.com','$2y$10$d2BOh.zUEJYTCXScpmOHnOlNasNIAbOZX390xtH0HYfRTJAotSUjy',3,'','','paying','non-active',0,'2017-07-11 15:20:44','2018-05-06 15:36:30',NULL,NULL,NULL,NULL),
	(646,'Peter Chen','pc@school1.com','$2y$10$.s2ivaPyVGlH63pmAnoJCOOfPe/35xlqcUILBAR6dpv/NToLSWdl2',3,'','','paying','non-active',0,'2018-05-05 14:27:24','2018-05-06 15:36:29',NULL,NULL,NULL,NULL),
	(647,'May Lam','ml@school1.com','$2y$10$gqfVL5eEUCvjeXJQWmpDNebNpw43BpCEOYwWJfKTiVbCdUbNVz6qa',3,'','','paying','non-active',0,'2018-05-05 14:27:24','2018-05-06 15:36:28',NULL,NULL,NULL,NULL),
	(649,'kyo','kc@yahoo.com.hk','$2y$10$bUqU0gYKk.Vun8EjG75FPuGT3mQ9M5r11LZ5aUAjfA.Y5ky2DLGiC',5,'','','paying','non-active',0,'2018-05-07 11:51:45','2018-05-07 11:51:45',NULL,NULL,NULL,NULL);

/*!40000 ALTER TABLE `school_users` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table school_video_progress_details
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_video_progress_details`;

CREATE TABLE `school_video_progress_details` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `video_progress_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_video_progresses
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_video_progresses`;

CREATE TABLE `school_video_progresses` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `teacher_class_subject_id` int(11) DEFAULT NULL,
  `weakness_id` int(11) DEFAULT NULL,
  `start_date` timestamp NULL DEFAULT NULL,
  `end_date` timestamp NULL DEFAULT NULL,
  `remark` varchar(500) DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_video_settings
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_video_settings`;

CREATE TABLE `school_video_settings` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `weakness_id` int(11) DEFAULT NULL,
  `video_id` int(11) DEFAULT NULL,
  `level` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Dump of table school_weakness_sets
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_weakness_sets`;

CREATE TABLE `school_weakness_sets` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `assignment_item_id` int(11) NOT NULL,
  `question_id` int(11) DEFAULT NULL,
  `question_type` int(11) DEFAULT NULL,
  `difficulty` int(11) DEFAULT NULL,
  `marks` varchar(255) COLLATE utf8_unicode_ci DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;




/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
