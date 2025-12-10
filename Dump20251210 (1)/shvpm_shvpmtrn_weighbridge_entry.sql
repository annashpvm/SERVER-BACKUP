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
-- Table structure for table `shvpmtrn_weighbridge_entry`
--

DROP TABLE IF EXISTS `shvpmtrn_weighbridge_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shvpmtrn_weighbridge_entry` (
  `t_wb_year` tinyint NOT NULL,
  `t_wb_compcode` tinyint NOT NULL,
  `t_wb_ticketno` int NOT NULL,
  `t_wb_type` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'A',
  `t_wb_date` datetime DEFAULT NULL,
  `t_wb_vehicle` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  PRIMARY KEY (`t_wb_year`,`t_wb_compcode`,`t_wb_ticketno`,`t_wb_type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shvpmtrn_weighbridge_entry`
--

LOCK TABLES `shvpmtrn_weighbridge_entry` WRITE;
/*!40000 ALTER TABLE `shvpmtrn_weighbridge_entry` DISABLE KEYS */;
INSERT INTO `shvpmtrn_weighbridge_entry` VALUES (25,1,25120907,'Z','2025-12-09 00:00:00','TN67BK8523'),(25,1,25120908,'Z','2025-12-09 00:00:00','TN76W9640'),(25,1,25120909,'Z','2025-12-09 00:00:00','TN95M5716'),(25,1,25120910,'Z','2025-12-09 00:00:00','TN76AL8275'),(25,1,25121001,'Z','2025-12-10 00:00:00','TN95C3604'),(25,1,25121002,'Z','2025-12-10 00:00:00','TN76AL8275'),(25,1,25121003,'Z','2025-12-10 00:00:00','TN21BV1604'),(25,1,25121004,'Z','2025-12-10 00:00:00','TN95C2890');
/*!40000 ALTER TABLE `shvpmtrn_weighbridge_entry` ENABLE KEYS */;
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
