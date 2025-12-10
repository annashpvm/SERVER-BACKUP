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
-- Table structure for table `trnfu_credit_note`
--

DROP TABLE IF EXISTS `trnfu_credit_note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_credit_note` (
  `cren_seqno` int NOT NULL,
  `cren_compcode` tinyint NOT NULL,
  `cren_fincode` tinyint NOT NULL,
  `cren_no` int DEFAULT NULL,
  `cren_rechseqno` int DEFAULT NULL,
  `cren_date` datetime NOT NULL,
  `cren_sup_code` int DEFAULT NULL,
  `cren_value` decimal(14,2) NOT NULL,
  `cren_remarks` varchar(100) NOT NULL,
  `cren_vouno` varchar(12) NOT NULL,
  `cren_usr_code` int DEFAULT NULL,
  `cren_entry_date` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`cren_seqno`),
  KEY `fk_trnfu_credit_note_mas_users_idx` (`cren_usr_code`),
  KEY `fk_trnfu_credit_note_maspur_supplier_master_idx` (`cren_sup_code`),
  KEY `uk_trnfu_credit_note__cren_compcode_cren_fincode_cren_no` (`cren_compcode`,`cren_fincode`,`cren_no`),
  KEY `fk_trnfu_credit_note_trnfu_receipt_header_idx` (`cren_rechseqno`),
  CONSTRAINT `fk_trnfu_credit_note_mas_users` FOREIGN KEY (`cren_usr_code`) REFERENCES `mas_users` (`usr_code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_trnfu_credit_note_maspur_supplier_master` FOREIGN KEY (`cren_sup_code`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`),
  CONSTRAINT `fk_trnfu_credit_note_trnfu_receipt_header` FOREIGN KEY (`cren_rechseqno`) REFERENCES `trnfu_receipt_header` (`rech_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_credit_note`
--

LOCK TABLES `trnfu_credit_note` WRITE;
/*!40000 ALTER TABLE `trnfu_credit_note` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnfu_credit_note` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:26
