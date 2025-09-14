CREATE DATABASE  IF NOT EXISTS `shvpm` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shvpm`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 10.0.0.251    Database: shvpm
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bio_attendlogs`
--

DROP TABLE IF EXISTS `bio_attendlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bio_attendlogs` (
  `a_bioid` bigint DEFAULT NULL,
  `a_fpcode` int DEFAULT NULL,
  `a_year` int DEFAULT NULL,
  `a_month` int DEFAULT NULL,
  `a_day1` varchar(10) DEFAULT NULL,
  `a_in_day1` datetime DEFAULT NULL,
  `a_out_day1` datetime DEFAULT NULL,
  `a_day2` varchar(10) DEFAULT NULL,
  `a_in_day2` datetime DEFAULT NULL,
  `a_out_day2` datetime DEFAULT NULL,
  `a_day3` varchar(10) DEFAULT NULL,
  `a_in_day3` datetime DEFAULT NULL,
  `a_out_day3` datetime DEFAULT NULL,
  `a_day4` varchar(10) DEFAULT NULL,
  `a_in_day4` datetime DEFAULT NULL,
  `a_out_day4` datetime DEFAULT NULL,
  `a_day5` varchar(10) DEFAULT NULL,
  `a_in_day5` datetime DEFAULT NULL,
  `a_out_day5` datetime DEFAULT NULL,
  `a_day6` varchar(10) DEFAULT NULL,
  `a_in_day6` datetime DEFAULT NULL,
  `a_out_day6` datetime DEFAULT NULL,
  `a_day7` varchar(10) DEFAULT NULL,
  `a_in_day7` datetime DEFAULT NULL,
  `a_out_day7` datetime DEFAULT NULL,
  `a_day8` varchar(10) DEFAULT NULL,
  `a_in_day8` datetime DEFAULT NULL,
  `a_out_day8` datetime DEFAULT NULL,
  `a_day9` varchar(10) DEFAULT NULL,
  `a_in_day9` datetime DEFAULT NULL,
  `a_out_day9` datetime DEFAULT NULL,
  `a_day10` varchar(10) DEFAULT NULL,
  `a_in_day10` datetime DEFAULT NULL,
  `a_out_day10` datetime DEFAULT NULL,
  `a_day11` varchar(10) DEFAULT NULL,
  `a_in_day11` datetime DEFAULT NULL,
  `a_out_day11` datetime DEFAULT NULL,
  `a_day12` varchar(10) DEFAULT NULL,
  `a_in_day12` datetime DEFAULT NULL,
  `a_out_day12` datetime DEFAULT NULL,
  `a_day13` varchar(10) DEFAULT NULL,
  `a_in_day13` datetime DEFAULT NULL,
  `a_out_day13` datetime DEFAULT NULL,
  `a_day14` varchar(10) DEFAULT NULL,
  `a_in_day14` datetime DEFAULT NULL,
  `a_out_day14` datetime DEFAULT NULL,
  `a_day15` varchar(10) DEFAULT NULL,
  `a_in_day15` datetime DEFAULT NULL,
  `a_out_day15` datetime DEFAULT NULL,
  `a_day16` varchar(10) DEFAULT NULL,
  `a_in_day16` datetime DEFAULT NULL,
  `a_out_day16` datetime DEFAULT NULL,
  `a_day17` varchar(10) DEFAULT NULL,
  `a_in_day17` datetime DEFAULT NULL,
  `a_out_day17` datetime DEFAULT NULL,
  `a_day18` varchar(10) DEFAULT NULL,
  `a_in_day18` datetime DEFAULT NULL,
  `a_out_day18` datetime DEFAULT NULL,
  `a_day19` varchar(10) DEFAULT NULL,
  `a_in_day19` datetime DEFAULT NULL,
  `a_out_day19` datetime DEFAULT NULL,
  `a_day20` varchar(10) DEFAULT NULL,
  `a_in_day20` datetime DEFAULT NULL,
  `a_out_day20` datetime DEFAULT NULL,
  `a_day21` varchar(10) DEFAULT NULL,
  `a_in_day21` datetime DEFAULT NULL,
  `a_out_day21` datetime DEFAULT NULL,
  `a_day22` varchar(10) DEFAULT NULL,
  `a_in_day22` datetime DEFAULT NULL,
  `a_out_day22` datetime DEFAULT NULL,
  `a_day23` varchar(10) DEFAULT NULL,
  `a_in_day23` datetime DEFAULT NULL,
  `a_out_day23` datetime DEFAULT NULL,
  `a_day24` varchar(10) DEFAULT NULL,
  `a_in_day24` datetime DEFAULT NULL,
  `a_out_day24` datetime DEFAULT NULL,
  `a_day25` varchar(10) DEFAULT NULL,
  `a_in_day25` datetime DEFAULT NULL,
  `a_out_day25` datetime DEFAULT NULL,
  `a_day26` varchar(10) NOT NULL,
  `a_in_day26` datetime DEFAULT NULL,
  `a_out_day26` datetime DEFAULT NULL,
  `a_day27` varchar(10) DEFAULT NULL,
  `a_in_day27` datetime DEFAULT NULL,
  `a_out_day27` datetime DEFAULT NULL,
  `a_day28` varchar(10) DEFAULT NULL,
  `a_in_day28` datetime DEFAULT NULL,
  `a_out_day28` datetime DEFAULT NULL,
  `a_day29` varchar(10) DEFAULT NULL,
  `a_in_day29` datetime DEFAULT NULL,
  `a_out_day29` datetime DEFAULT NULL,
  `a_day30` varchar(10) DEFAULT NULL,
  `a_in_day30` datetime DEFAULT NULL,
  `a_out_day30` datetime DEFAULT NULL,
  `a_day31` varchar(10) DEFAULT NULL,
  `a_in_day31` datetime DEFAULT NULL,
  `a_out_day31` datetime DEFAULT NULL,
  `a_present` decimal(3,1) DEFAULT NULL,
  `a_wo` decimal(3,1) DEFAULT NULL,
  `a_wop` decimal(3,1) DEFAULT NULL,
  `a_woh` decimal(3,1) DEFAULT NULL,
  `a_absent` decimal(3,1) DEFAULT NULL,
  `a_el` decimal(3,1) DEFAULT NULL,
  `a_pl` decimal(3,1) DEFAULT NULL,
  `a_layoff` decimal(3,1) DEFAULT NULL,
  `a_ml` decimal(3,1) DEFAULT NULL,
  `a_ch` decimal(3,1) DEFAULT NULL,
  `a_holiday` decimal(3,1) DEFAULT NULL,
  `a_hop` decimal(3,1) NOT NULL,
  `a_hpe` decimal(3,1) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bio_attendlogs`
--

LOCK TABLES `bio_attendlogs` WRITE;
/*!40000 ALTER TABLE `bio_attendlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `bio_attendlogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:31:58
