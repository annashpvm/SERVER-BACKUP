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
-- Table structure for table `trnfu_lot_gcv`
--

DROP TABLE IF EXISTS `trnfu_lot_gcv`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_lot_gcv` (
  `rech_compcode` tinyint NOT NULL,
  `rech_fincode` tinyint NOT NULL,
  `rech_ledcode` int DEFAULT NULL,
  `rech_lotno` int DEFAULT NULL,
  `rech_pono` int DEFAULT NULL,
  `rech_podate` datetime DEFAULT NULL,
  `rech_pogcv` decimal(8,2) DEFAULT NULL,
  `rech_poqty` decimal(9,3) DEFAULT NULL,
  `rech_grnno` int DEFAULT NULL,
  `rech_grndate` datetime DEFAULT NULL,
  `rech_grnqty` decimal(8,3) DEFAULT NULL,
  `rech_grngcv` decimal(8,2) DEFAULT NULL,
  `rech_grngcvvalue` decimal(8,2) DEFAULT NULL,
  `rech_actrate` decimal(8,2) DEFAULT NULL,
  `rech_ratediff` decimal(8,2) DEFAULT NULL,
  `rech_dnvoudate` datetime DEFAULT NULL,
  `rech_dnvouno` varchar(12) DEFAULT NULL,
  `rech_dnamt` decimal(10,2) DEFAULT NULL,
  `rech_truck` varchar(20) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_lot_gcv`
--

LOCK TABLES `trnfu_lot_gcv` WRITE;
/*!40000 ALTER TABLE `trnfu_lot_gcv` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnfu_lot_gcv` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:07
