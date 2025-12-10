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
-- Table structure for table `export_deemed_invoice_trailer2`
--

DROP TABLE IF EXISTS `export_deemed_invoice_trailer2`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_deemed_invoice_trailer2` (
  `ei_seqno` int NOT NULL,
  `ei_container_no` varchar(30) DEFAULT NULL,
  `ei_seal_no` varchar(30) DEFAULT NULL,
  `ei_container_size` varchar(10) DEFAULT NULL,
  `ei_qty` int DEFAULT NULL,
  `ei_wt` decimal(10,3) DEFAULT NULL,
  `ei_packno` decimal(6,0) DEFAULT NULL,
  `ei_ce_seal_no` varchar(20) DEFAULT NULL,
  `ei_pallet` int DEFAULT NULL,
  `ei_gwt` decimal(10,3) DEFAULT NULL,
  `ei_rg1size` decimal(6,0) DEFAULT NULL,
  `ei_millcode` tinyint DEFAULT NULL,
  `ei_fincode` tinyint NOT NULL,
  `ei_lorryno` varchar(20) DEFAULT NULL,
  `ei_data_millcode` int DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_deemed_invoice_trailer2`
--

LOCK TABLES `export_deemed_invoice_trailer2` WRITE;
/*!40000 ALTER TABLE `export_deemed_invoice_trailer2` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_deemed_invoice_trailer2` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:06
