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
-- Table structure for table `bio_device_shiftlogs`
--

DROP TABLE IF EXISTS `bio_device_shiftlogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bio_device_shiftlogs` (
  `ds_fpcode` int DEFAULT NULL,
  `ds_empid` int DEFAULT NULL,
  `ds_month` int DEFAULT NULL,
  `ds_year` int DEFAULT NULL,
  `ds_date` datetime DEFAULT NULL,
  `ds_shift_original` varchar(20) DEFAULT NULL,
  `ds_shift` varchar(20) DEFAULT NULL,
  `ds_shift_actual` varchar(20) DEFAULT NULL,
  `ds_shift_begintime` varchar(10) DEFAULT NULL,
  `ds_shift_endtime` varchar(10) DEFAULT NULL,
  `ds_begin_duration` varchar(10) DEFAULT NULL,
  `ds_end_duration` varchar(10) DEFAULT NULL,
  `ds_no_of_punches` smallint DEFAULT NULL,
  `ds_shift_in` datetime DEFAULT NULL,
  `ds_shift_out` datetime DEFAULT NULL,
  `ds_shift_in2` datetime DEFAULT NULL,
  `ds_shift_out2` datetime DEFAULT NULL,
  `ds_shift_in3` datetime DEFAULT NULL,
  `ds_shift_out3` datetime DEFAULT NULL,
  `ds_shift_in4` datetime DEFAULT NULL,
  `ds_shift_out4` datetime DEFAULT NULL,
  `ds_shift_in5` datetime DEFAULT NULL,
  `ds_shift_out5` datetime DEFAULT NULL,
  `ds_shift_in6` datetime DEFAULT NULL,
  `ds_shift_out6` datetime DEFAULT NULL,
  `ds_status` varchar(10) DEFAULT NULL,
  `ds_per_hrs` decimal(5,2) DEFAULT NULL,
  `ds_od_hrs` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs1` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs2` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs3` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs4` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs5` decimal(5,2) DEFAULT NULL,
  `ds_sft_hrs6` decimal(5,2) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bio_device_shiftlogs`
--

LOCK TABLES `bio_device_shiftlogs` WRITE;
/*!40000 ALTER TABLE `bio_device_shiftlogs` DISABLE KEYS */;
/*!40000 ALTER TABLE `bio_device_shiftlogs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:32:56
