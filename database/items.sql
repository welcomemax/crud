-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `items` (`id`, `title`, `price`, `description`, `image`, `created_at`, `updated_at`) VALUES
(1,	'Нефариус',	1490,	'Про сумасшедших учёных',	'/uploads/Nefarius_min_200x170.jpg',	'2017-07-02 16:15:05',	'2017-07-02 16:39:35'),
(2,	'Проект Манхэттен',	1890,	'Ядерная гонка начинается!',	'/uploads/manhetten_200x170.jpg',	'2017-07-02 16:16:37',	'2017-07-02 16:16:37'),
(3,	'500 злобных карт 2.0',	1750,	'Тест на чувство юмора',	'/uploads/500_zlobnih_kart_title_200x170.jpg',	'2017-07-02 16:20:20',	'2017-07-02 16:20:20'),
(8,	'Свинтус (новая версия)',	390,	'«Посвинячим» вволю!',	'/uploads/1-mini_200x170.jpg',	'2017-07-20 11:59:08',	'2017-07-20 11:59:08'),
(6,	'Экивоки (II издание)',	1690,	'Зачем пингвины лезут на чердак?',	'/uploads/1_200x170.jpg',	'2017-07-20 11:57:12',	'2017-07-20 11:57:12'),
(5,	'Шакал',	960,	'Карррамба! Это просто хит!',	'/uploads/shakal_200x170.jpg',	'2017-07-20 14:55:07',	'2017-07-20 11:57:44'),
(4,	'Имаджинариум',	1750,	'Замечательная игра на ассоциации. Очень интересная.',	'/uploads/1-mini_200x170.jpg',	'2017-07-02 16:23:23',	'2017-07-02 16:23:23'),
(7,	'Держи пари',	1990,	'Очень интересная викторина со ставками',	'/uploads/derzhi_pari_200x170.jpg',	'2017-07-20 11:58:32',	'2017-07-20 11:58:32'),
(9,	'Экивоки. Космос',	1690,	'Космически красивая игра',	'/uploads/1_200x170.jpg',	'2017-07-20 12:00:16',	'2017-07-20 12:00:16');

-- 2017-07-20 18:51:25
