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
-- Table structure for table `tmp_gstr2`
--

DROP TABLE IF EXISTS `tmp_gstr2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_gstr2` (
  `g_seqno` int NOT NULL,
  `g_vouno` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `g_date` datetime NOT NULL,
  `g_supplier` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `g_billno` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `g_billdate` datetime DEFAULT NULL,
  `g_gstin` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `g_billamount` decimal(10,2) DEFAULT '0.00',
  `g_purledger` int DEFAULT '0',
  `g_purledname` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `g_purvalue` decimal(10,2) DEFAULT '0.00',
  `g_cgst` decimal(10,2) DEFAULT '0.00',
  `g_sgst` decimal(10,2) DEFAULT '0.00',
  `g_igst` decimal(10,2) DEFAULT '0.00',
  `g_cgst2_5` decimal(10,2) DEFAULT '0.00',
  `g_sgst2_5` decimal(10,2) DEFAULT '0.00',
  `g_cgst6` decimal(10,2) DEFAULT '0.00',
  `g_sgst6` decimal(10,2) DEFAULT '0.00',
  `g_cgst9` decimal(10,2) DEFAULT '0.00',
  `g_sgst9` decimal(10,2) DEFAULT '0.00',
  `g_cgst14` decimal(10,2) DEFAULT '0.00',
  `g_sgst14` decimal(10,2) DEFAULT '0.00',
  `g_igst5` decimal(10,2) DEFAULT '0.00',
  `g_igst12` decimal(10,2) DEFAULT '0.00',
  `g_igst18` decimal(10,2) DEFAULT '0.00',
  `g_handling` decimal(10,2) DEFAULT '0.00',
  `g_cess` decimal(10,2) DEFAULT '0.00',
  `g_round` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`g_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_gstr2`
--

LOCK TABLES `tmp_gstr2` WRITE;
/*!40000 ALTER TABLE `tmp_gstr2` DISABLE KEYS */;
/*!40000 ALTER TABLE `tmp_gstr2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:49
