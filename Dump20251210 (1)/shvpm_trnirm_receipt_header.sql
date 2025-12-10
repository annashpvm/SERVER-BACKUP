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
-- Table structure for table `trnirm_receipt_header`
--

DROP TABLE IF EXISTS `trnirm_receipt_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_receipt_header` (
  `rech_seqno` int NOT NULL,
  `rech_compcode` tinyint NOT NULL,
  `rech_fincode` tinyint NOT NULL,
  `rech_no` int NOT NULL,
  `rech_sup_code` int NOT NULL,
  `rech_ordhdseqno` int NOT NULL,
  `rech_invhdseqno` int NOT NULL,
  `rech_agent_code` int NOT NULL,
  `rech_date` datetime NOT NULL,
  `rech_wtcardno` int NOT NULL,
  `rech_area_code` smallint NOT NULL,
  `rech_truckno` varchar(20) DEFAULT '',
  `rech_itemvalue` decimal(14,2) NOT NULL,
  `rech_freight` decimal(14,2) NOT NULL,
  `rech_roundingoff` decimal(3,2) NOT NULL,
  `rech_totalamount` decimal(14,2) NOT NULL,
  `rech_billno` varchar(20) NOT NULL,
  `rech_billdate` datetime NOT NULL,
  `rech_billvalue` decimal(14,2) NOT NULL,
  `rech_customduty` decimal(14,2) NOT NULL,
  `rech_clearingchrg` decimal(14,2) NOT NULL,
  `rech_vouno` varchar(12) NOT NULL,
  `rech_acctflag` varchar(1) NOT NULL,
  `rech_accdate` datetime NOT NULL,
  `rech_status` varchar(1) NOT NULL,
  `rech_usr_code` decimal(7,0) NOT NULL,
  `rech_entry_date` datetime NOT NULL,
  `rech_cgst` decimal(10,2) DEFAULT '0.00',
  `rech_sgst` decimal(10,2) DEFAULT '0.00',
  `rech_igst` decimal(10,2) DEFAULT '0.00',
  `rech_geno` varchar(20) DEFAULT '',
  `rech_gedate` datetime DEFAULT NULL,
  `rech_acc_seqno` int DEFAULT '0',
  PRIMARY KEY (`rech_seqno`),
  KEY `fk_trnirm_receipt_header_trnirm_invoice_header_idx` (`rech_invhdseqno`),
  KEY `fk_trnirm_receipt_header_trnirm_order_header_idx` (`rech_ordhdseqno`),
  KEY `uk_trnirm_receipt_headercompfincode_rech_no` (`rech_compcode`,`rech_fincode`,`rech_no`),
  KEY `fk_trnirm_receipt_header_mas_finyear` (`rech_fincode`),
  CONSTRAINT `fk_trnirm_receipt_header_mas_company` FOREIGN KEY (`rech_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnirm_receipt_header_mas_finyear` FOREIGN KEY (`rech_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnirm_receipt_header_trnirm_invoice_header` FOREIGN KEY (`rech_invhdseqno`) REFERENCES `trnirm_invoice_header` (`invh_seqno`),
  CONSTRAINT `fk_trnirm_receipt_header_trnirm_order_header` FOREIGN KEY (`rech_ordhdseqno`) REFERENCES `trnirm_order_header` (`ordh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_receipt_header`
--

LOCK TABLES `trnirm_receipt_header` WRITE;
/*!40000 ALTER TABLE `trnirm_receipt_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_receipt_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:14
