-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- 主機: 127.0.0.1
-- 產生時間： 2018 年 05 月 21 日 16:50
-- 伺服器版本: 10.1.30-MariaDB
-- PHP 版本： 7.0.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `school_1`
--

-- --------------------------------------------------------

--
-- 資料表結構 `school_roles`
--

CREATE TABLE `school_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 資料表的匯出資料 `school_roles`
--

INSERT INTO `school_roles` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
(3, 'Student', 'Student', 'Normal Student', NULL, NULL),
(5, 'Teacher', 'Teacher', 'Normal Teacher', NULL, NULL),
(6, 'Director', 'Director', 'Director', NULL, NULL),
(7, 'Principal', 'Principal', 'Principal', NULL, NULL),
(8, 'Vice Principal', 'Vice Principal', 'Vice Principal', NULL, NULL);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `school_roles`
--
ALTER TABLE `school_roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `school_roles_name_unique` (`name`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `school_roles`
--
ALTER TABLE `school_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
