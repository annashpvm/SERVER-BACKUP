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
-- Table structure for table `trnpur_salenote_header`
--

DROP TABLE IF EXISTS `trnpur_salenote_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnpur_salenote_header` (
  `snh_seqno` int NOT NULL,
  `snh_compcode` tinyint NOT NULL,
  `snh_fincode` tinyint NOT NULL,
  `snh_no` int NOT NULL,
  `snh_date` datetime NOT NULL,
  `snh_custcode` int NOT NULL,
  `snh_totamt` decimal(14,2) NOT NULL,
  `snh_cgst` decimal(14,2) NOT NULL,
  `snh_sgst` decimal(14,2) NOT NULL,
  `snh_igst` decimal(14,2) NOT NULL,
  `snh_ins` decimal(14,2) NOT NULL,
  `snh_frieght` decimal(14,2) NOT NULL,
  `snh_oth` decimal(10,2) NOT NULL,
  `snh_roff` decimal(2,2) NOT NULL,
  `snh_netamt` decimal(14,2) NOT NULL,
  `snh_paymode` int NOT NULL,
  `snh_transport` int NOT NULL,
  `snh_vehno` varchar(20) NOT NULL,
  `snh_remarks` varchar(150) NOT NULL,
  `snh_vouno` varchar(12) NOT NULL,
  `snh_usr_code` int NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`snh_seqno`,`snh_compcode`,`snh_fincode`,`snh_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnpur_salenote_header`
--

LOCK TABLES `trnpur_salenote_header` WRITE;
/*!40000 ALTER TABLE `trnpur_salenote_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnpur_salenote_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:54
