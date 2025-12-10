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
-- Table structure for table `massal_comm`
--

DROP TABLE IF EXISTS `massal_comm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `massal_comm` (
  `comm_comp_code` tinyint NOT NULL,
  `comm_code` int NOT NULL,
  `comm_appr_date` datetime DEFAULT NULL,
  `comm_cust` int NOT NULL,
  `comm_item_code` int NOT NULL,
  `comm_var_code` int NOT NULL,
  `comm_unit` int NOT NULL,
  `comm_reel_amt` decimal(9,2) NOT NULL,
  `comm_bun_amt` decimal(9,2) NOT NULL,
  `comm_allo_qty` decimal(9,3) NOT NULL,
  `comm_ord_qty` decimal(9,3) NOT NULL,
  `comm_wef_date` datetime DEFAULT NULL,
  `comm_fincode` tinyint NOT NULL,
  `comm_reeltag` char(1) NOT NULL,
  `comm_buntag` char(1) NOT NULL,
  `comm_appstat` char(1) NOT NULL,
  `comm_close` char(1) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`comm_comp_code`,`comm_code`,`comm_fincode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `massal_comm`
--

LOCK TABLES `massal_comm` WRITE;
/*!40000 ALTER TABLE `massal_comm` DISABLE KEYS */;
INSERT INTO `massal_comm` VALUES (3,1,'2019-04-21 00:00:00',75,0,1,0,750.00,750.00,0.000,0.000,'2019-04-21 00:00:00',19,'','','T','N',0),(3,2,'2019-04-21 00:00:00',75,0,24,0,750.00,750.00,0.000,0.000,'2019-04-21 00:00:00',19,'','','T','N',0),(3,3,'2019-04-21 00:00:00',16,0,1,0,750.00,750.00,0.000,0.000,'2019-04-21 00:00:00',19,'','','T','N',0),(3,4,'2019-04-21 00:00:00',16,0,24,0,750.00,750.00,0.000,0.000,'2019-04-21 00:00:00',19,'','','T','N',0),(3,5,'2019-04-21 00:00:00',16,0,24,0,750.00,750.00,0.000,0.000,'2019-04-21 00:00:00',19,'','','T','N',0),(3,6,'2019-04-23 00:00:00',194,0,23,0,750.00,750.00,0.000,0.000,'2019-04-23 00:00:00',19,'','','T','N',0),(3,7,'2019-04-23 00:00:00',194,0,68,0,750.00,750.00,0.000,0.000,'2019-04-23 00:00:00',19,'','','T','N',0),(90,1,'2019-03-29 00:00:00',137,0,5,0,500.00,500.00,0.000,0.000,'2019-03-29 00:00:00',19,'','','T','N',0),(90,2,'2019-03-29 00:00:00',137,1,5,1,500.00,0.00,0.000,0.000,'2019-03-29 00:00:00',19,'','','T','N',0),(90,3,'2019-04-05 00:00:00',138,0,10,0,500.00,500.00,0.000,0.000,'2019-04-05 00:00:00',19,'','','T','N',0),(90,4,'2019-04-05 00:00:00',138,44,2,1,600.00,0.00,0.000,0.000,'2019-04-05 00:00:00',19,'','','T','N',0),(90,5,'2019-04-05 00:00:00',138,153,3,1,350.00,0.00,0.000,0.000,'2019-04-05 00:00:00',19,'','','T','N',0);
/*!40000 ALTER TABLE `massal_comm` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:46
