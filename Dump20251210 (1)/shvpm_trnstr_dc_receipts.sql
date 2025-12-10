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
-- Table structure for table `trnstr_dc_receipts`
--

DROP TABLE IF EXISTS `trnstr_dc_receipts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnstr_dc_receipts` (
  `dc_compcode` tinyint NOT NULL,
  `dc_fincode` tinyint NOT NULL,
  `dc_recpt_no` int NOT NULL,
  `dc_recpt_date` datetime NOT NULL,
  `dc_recpt_party` decimal(6,0) NOT NULL,
  `dc_dcno` int DEFAULT NULL,
  `dc_dcdate` datetime DEFAULT NULL,
  `dc_gate_eno` varchar(6) DEFAULT NULL,
  `dc_gate_edate` datetime DEFAULT NULL,
  `dc_itemcode` int NOT NULL,
  `dc_qty` decimal(5,1) DEFAULT NULL,
  `dc_rate` decimal(8,2) DEFAULT NULL,
  `dc_value` decimal(8,2) DEFAULT NULL,
  `dc_freight` decimal(7,2) DEFAULT NULL,
  `dc_others` decimal(8,2) DEFAULT NULL,
  `dc_description` varchar(50) DEFAULT NULL,
  `dc_truck` varchar(20) DEFAULT NULL,
  `dc_issuedept` decimal(6,0) DEFAULT NULL,
  `dc_issueqty` decimal(5,1) DEFAULT NULL,
  `dc_issue_date` datetime DEFAULT NULL,
  `dc_issuedpm2_qty` decimal(5,1) DEFAULT NULL,
  `dc_issueslpb_qty` decimal(5,1) DEFAULT NULL,
  `dc_issuevjpm_qty` decimal(5,1) DEFAULT NULL,
  `dc_issuecogen_qty` decimal(5,1) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnstr_dc_receipts`
--

LOCK TABLES `trnstr_dc_receipts` WRITE;
/*!40000 ALTER TABLE `trnstr_dc_receipts` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnstr_dc_receipts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:01
