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
-- Table structure for table `trn_prodplan_trailer`
--

DROP TABLE IF EXISTS `trn_prodplan_trailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_prodplan_trailer` (
  `ppt_comp_code` tinyint NOT NULL,
  `ppt_fincode` tinyint NOT NULL,
  `ppt_amendno` smallint DEFAULT NULL,
  `ppt_amenddate` datetime DEFAULT NULL,
  `ppt_advno` int NOT NULL,
  `ppt_advdate` datetime NOT NULL,
  `ppt_slno` smallint NOT NULL,
  `ppt_varcode` int DEFAULT NULL,
  `ppt_size1` decimal(5,1) NOT NULL,
  `ppt_size2` decimal(5,1) NOT NULL,
  `ppt_size3` decimal(5,1) DEFAULT NULL,
  `ppt_size4` decimal(5,1) DEFAULT NULL,
  `ppt_size5` decimal(5,1) DEFAULT NULL,
  `ppt_size6` decimal(5,1) DEFAULT NULL,
  `ppt_size7` decimal(5,1) DEFAULT NULL,
  `ppt_size8` decimal(5,1) DEFAULT NULL,
  `ppt_size9` decimal(5,1) DEFAULT NULL,
  `ppt_size10` decimal(5,1) DEFAULT NULL,
  `ppt_qty` decimal(5,1) DEFAULT NULL,
  `ppt_deckle` varchar(12) DEFAULT NULL,
  `ppt_deckle_size` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`ppt_comp_code`,`ppt_fincode`,`ppt_advno`,`ppt_advdate`,`ppt_slno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_prodplan_trailer`
--

LOCK TABLES `trn_prodplan_trailer` WRITE;
/*!40000 ALTER TABLE `trn_prodplan_trailer` DISABLE KEYS */;
INSERT INTO `trn_prodplan_trailer` VALUES (1,21,0,'2022-02-25 00:00:00',211001,'2022-02-25 00:00:00',1,24,48.0,48.0,48.0,56.0,56.0,56.0,56.0,0.0,0.0,0.0,39.0,'368','48.0 + 48.0 + 48.0 + 56.0 + 56.0 + 56.0 + 56.0'),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',1,22,27.0,27.0,27.0,27.0,45.0,45.0,0.0,0.0,0.0,0.0,22.0,'198','27.0 + 27.0 + 27.0 + 27.0 + 45.0 + 45.0'),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',2,12,62.0,62.0,62.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,10.0,'186','62.0 + 62.0 + 62.0'),(1,25,0,'2025-06-23 00:00:00',25001,'2025-06-23 00:00:00',1,1,39.0,39.0,39.0,44.0,44.0,44.0,0.0,0.0,0.0,0.0,60.0,'249','39.0 + 39.0 + 39.0 + 44.0 + 44.0 + 44.0');
/*!40000 ALTER TABLE `trn_prodplan_trailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:32
