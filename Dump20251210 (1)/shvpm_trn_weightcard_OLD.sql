CREATE DATABASE  IF NOT EXISTS `shvpm` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shvpm`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 10.0.0.251    Database: shvpm
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.20.04.1

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
-- Table structure for table `trn_weightcard_OLD`
--

DROP TABLE IF EXISTS `trn_weightcard_OLD`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_weightcard_OLD` (
  `wc_seqno` int NOT NULL,
  `wc_compcode` tinyint NOT NULL,
  `wc_fincode` tinyint NOT NULL,
  `wc_no` int NOT NULL,
  `wc_date` datetime NOT NULL,
  `wc_unloadingtime` datetime DEFAULT NULL,
  `wc_area_code` smallint NOT NULL,
  `wc_sup_code` int NOT NULL,
  `wc_itemgrp` smallint NOT NULL,
  `wc_supervisor` int NOT NULL,
  `wc_vehicleno` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `wc_transportname` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `wc_wb_no` varchar(50) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `wc_grosswt` decimal(10,1) DEFAULT '0.0',
  `wc_tarewt` decimal(10,1) NOT NULL DEFAULT '0.0',
  `wc_netwt` decimal(10,1) NOT NULL DEFAULT '0.0',
  `wc_status` varchar(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `wc_usr_code` int NOT NULL,
  `wc_entry_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_weightcard_OLD`
--

LOCK TABLES `trn_weightcard_OLD` WRITE;
/*!40000 ALTER TABLE `trn_weightcard_OLD` DISABLE KEYS */;
INSERT INTO `trn_weightcard_OLD` VALUES (1,90,22,1,'2022-12-26 00:00:00','2022-12-26 15:37:00',55,1023,1,1,'TN57AU1237','','221201',15.0,6.0,9.0,'Y',0,'2022-12-26 00:00:00'),(2,90,22,2,'2022-12-26 00:00:00','2022-12-26 15:37:00',1,1023,1,1,'TN58AZ2878','','261202',15.0,4.0,11.0,'Y',0,'2022-12-26 00:00:00'),(3,90,22,3,'2023-01-09 00:00:00','2023-01-09 15:21:00',34,1175,1,1,'TN57AZ1248','','230120',18858.0,6805.0,12053.0,'Y',0,'2023-01-09 00:00:00'),(4,90,22,4,'2023-01-21 00:00:00','2023-01-21 11:34:00',26,1083,1,1,'TN59AZ8887','','2022',18.5,8.7,9.9,'Y',0,'2023-01-21 00:00:00'),(5,90,22,5,'2023-01-31 00:00:00','2023-01-31 15:10:00',6,676,1,1,'TN57AZ1287','','310123',52.0,15.0,37.0,'Y',0,'2023-01-31 00:00:00'),(6,90,22,6,'2023-02-11 00:00:00','2023-02-11 11:05:00',57,676,1,1,'TN57AZ1287','','310128',52.0,15.0,37.0,'Y',0,'2023-02-11 00:00:00'),(7,90,22,7,'2023-02-11 00:00:00','2023-02-11 11:37:00',42,1026,1,1,'TN57AZ1287','','310147',52.0,15.0,37.0,'N',0,'2023-02-11 00:00:00'),(8,90,22,8,'2023-02-11 00:00:00','2023-02-11 12:22:00',11,1026,1,1,'TN76AZ7859','','310159',52.0,15.0,37.0,'Y',0,'2023-02-11 00:00:00'),(9,1,23,1,'2023-07-04 00:00:00','2023-07-04 10:35:00',28,6,1,1,'TN57AU1237','','100',15.0,7.4,7.7,'N',0,'2023-07-04 00:00:00');
/*!40000 ALTER TABLE `trn_weightcard_OLD` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:50
