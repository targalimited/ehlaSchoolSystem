# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.9)
# Database: school_1
# Generation Time: 2018-05-14 13:31:16 +0000
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
	(1,'Semester A','2018','2019','Sem A',NULL,'2018-05-01 07:09:37','2018-05-01 07:09:50','2018-05-01 07:09:50'),
	(2,'Semester A','2018','2019','Sem A',1,'2018-05-01 07:11:25','2018-05-01 21:02:48',NULL),
	(3,'Semester B','2018','2019','Sem B',NULL,'2018-05-01 21:01:48','2018-05-01 21:01:48',NULL);

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
	(1,'1A',NULL,0,'2018-05-05 04:30:33','2018-05-05 04:30:33',1),
	(2,'1B',NULL,0,'2018-05-05 04:31:00','2018-05-05 04:31:00',1),
	(3,'2A',NULL,0,'2018-05-05 04:31:08','2018-05-05 04:31:08',2),
	(4,'2B',NULL,0,'2018-05-05 04:31:14','2018-05-05 04:31:14',2),
	(5,'3A',NULL,0,'2018-05-05 04:31:24','2018-05-05 04:31:24',3),
	(6,'3B',NULL,0,'2018-05-05 04:31:31','2018-05-05 04:31:31',3);

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
	(1,'P1','小一','p1','2018-05-11 22:17:32','2018-05-11 22:17:32'),
	(2,'P2','小二','p2','2018-05-11 22:17:32','2018-05-11 22:17:32'),
	(3,'P3','小三','p3','2018-05-11 22:17:32','2018-05-11 22:17:32'),
	(4,'P4','小四','p4','2018-05-11 22:17:32','2018-05-11 22:17:32');

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
	(720,3),
	(721,3),
	(722,3),
	(718,5),
	(719,5);

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


# Dump of table school_student_class_subject
# ------------------------------------------------------------

DROP TABLE IF EXISTS `school_student_class_subject`;

CREATE TABLE `school_student_class_subject` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `school_student_class_subject` WRITE;
/*!40000 ALTER TABLE `school_student_class_subject` DISABLE KEYS */;

INSERT INTO `school_student_class_subject` (`id`, `student_id`, `class_id`, `created_at`, `updated_at`)
VALUES
	(9,720,1,'2018-05-14 13:27:26','2018-05-14 13:27:26'),
	(10,721,1,'2018-05-14 13:27:26','2018-05-14 13:27:26'),
	(11,722,2,'2018-05-14 13:27:26','2018-05-14 13:27:26');

/*!40000 ALTER TABLE `school_student_class_subject` ENABLE KEYS */;
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
	(1,1,720,NULL,NULL,NULL),
	(2,3,720,NULL,NULL,NULL),
	(3,1,721,NULL,NULL,NULL),
	(4,3,721,NULL,NULL,NULL),
	(5,2,722,NULL,NULL,NULL),
	(6,4,722,NULL,NULL,NULL);

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
	(1,'Chinese','中文',0,'2018-05-05 03:30:15','2018-05-05 03:30:15'),
	(2,'English','英文',0,'2018-05-05 03:30:25','2018-05-05 03:30:25');

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
	(1,718,1,2,0,'pc@school1.com,1A,English',NULL,'2018-05-14 13:27:14','2018-05-14 13:27:14'),
	(2,718,2,2,0,'pc@school1.com,1B,English',NULL,'2018-05-14 13:27:14','2018-05-14 13:27:14'),
	(3,719,1,1,0,'ml@school1.com,1A,Chinese',NULL,'2018-05-14 13:27:14','2018-05-14 13:27:14'),
	(4,719,2,1,0,'ml@school1.com,1B,Chinese',NULL,'2018-05-14 13:27:14','2018-05-14 13:27:14'),
	(5,718,3,2,0,'pc@school1.com,2A,English',NULL,'2018-05-14 13:27:14','2018-05-14 13:27:14');

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
  `username` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `user_group` int(11) NOT NULL DEFAULT '5',
  `sc_token` varchar(100) NOT NULL DEFAULT '',
  `fb_token` varchar(100) NOT NULL DEFAULT '',
  `acc_type` enum('paying','free','free_trial','unlimited') NOT NULL DEFAULT 'paying',
  `status` enum('non-active','active') NOT NULL DEFAULT 'non-active',
  `is_deleted` int(1) NOT NULL DEFAULT '0',
  `create_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `school_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `remember_token` varchar(255) DEFAULT NULL,
  `student_id` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;

LOCK TABLES `school_users` WRITE;
/*!40000 ALTER TABLE `school_users` DISABLE KEYS */;

INSERT INTO `school_users` (`id`, `username`, `email`, `password`, `user_group`, `sc_token`, `fb_token`, `acc_type`, `status`, `is_deleted`, `create_ts`, `update_ts`, `school_id`, `name`, `remember_token`, `student_id`)
VALUES
	(66,'ggg','ggg@gmail.com','e10adc3949ba59abbe56e057f20f883e',3,'','','paying','active',0,'2016-12-26 10:38:06','2018-02-26 03:24:47',NULL,NULL,'niYYVEoR7Q1J7nRByOfhlXP3IswrH6yJohFjPAdqj4Mhw2k7yjUOKXg3E4N1',NULL),
	(718,'Peter Chen','pc@school1.com','$2y$10$0Ud9xSXolMRXWXGVbevu6.zESEttR0G911gPompOCdN2HjrzmwQq.',3,'','','paying','non-active',0,'2018-05-14 13:27:16','2018-05-14 13:27:16',NULL,NULL,NULL,NULL),
	(719,'May Lam','ml@school1.com','$2y$10$oXm1KAsDW1CSjY6eVawqU.rToTYX.jLx7MquU.L.ie7XGQtJvyLNS',3,'','','paying','non-active',0,'2018-05-14 13:27:16','2018-05-14 13:27:16',NULL,NULL,NULL,NULL),
	(720,'Chan Tai Ming','ctm@student.com','$2y$10$kQkm4X9P9t3Pbr1ozn4aY./84Mj3ddFvhPVkqdkjK.rb7Veq3vL9e',3,'','','paying','non-active',0,'2018-05-14 13:27:26','2018-05-14 13:27:26',NULL,NULL,NULL,NULL),
	(721,'Lau Wing Ki','lwk@student.com','$2y$10$D69nkCw3SwNbr0UBaF.s/.kOS6qal5LueA9hNQxFdXfXDBlJ0ZK2W',3,'','','paying','non-active',0,'2018-05-14 13:27:26','2018-05-14 13:27:26',NULL,NULL,NULL,NULL),
	(722,'Leung wai Ming','lwm@student.com','$2y$10$CoJaLMMv/M7sMjGN/OQPR.22.oTCNqAbZWqHcqbglp3iJ.xVrSPYa',3,'','','paying','non-active',0,'2018-05-14 13:27:26','2018-05-14 13:27:26',NULL,NULL,NULL,NULL);

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
