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
-- Table structure for table `temp_column_EXPORT`
--

DROP TABLE IF EXISTS `temp_column_EXPORT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `temp_column_EXPORT` (
  `accref_seqno` int NOT NULL,
  `accref_vou_type` varchar(13) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT '',
  `accref_vouno` varchar(15) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `accrefvoudate` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `accref_voudate` datetime NOT NULL,
  `vou_refno` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `billdate` datetime NOT NULL,
  `accref_narration` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `accrefno` int DEFAULT NULL,
  `cust_ref` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cust_gstin` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Qty` decimal(35,3) DEFAULT NULL,
  `invamt` decimal(36,2) DEFAULT NULL,
  `uom` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `value1` decimal(40,2) DEFAULT NULL,
  `rate` decimal(47,6) DEFAULT NULL,
  `EXPORT SALES TO SEZ` decimal(36,2) DEFAULT NULL,
  `IGST@12% COLLECTED` decimal(12,2) NOT NULL DEFAULT '0.00',
  `CGST` decimal(12,2) NOT NULL DEFAULT '0.00',
  `SGST` decimal(12,2) NOT NULL DEFAULT '0.00',
  `FREIGHT COLLECTED-GST` decimal(12,2) NOT NULL DEFAULT '0.00',
  `FREIGHT COLLECTED-IGST` decimal(12,2) NOT NULL DEFAULT '0.00',
  `TCS @01% COLLECTED` decimal(12,2) NOT NULL DEFAULT '0.00',
  `ROUNDED OFF` decimal(12,2) NOT NULL DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp_column_EXPORT`
--

LOCK TABLES `temp_column_EXPORT` WRITE;
/*!40000 ALTER TABLE `temp_column_EXPORT` DISABLE KEYS */;
INSERT INTO `temp_column_EXPORT` VALUES (77255,'General Sales','SEZ/001/24-25','13-06-2024','2024-06-13 00:00:00','240796','2024-06-13 00:00:00','Sales',77255,'XO PACKPVT LTD-KERALA','32AAACX1126F1ZX',11.776,465152.00,'MTS',465152.00,39500.000000,465152.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00);
/*!40000 ALTER TABLE `temp_column_EXPORT` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:55
