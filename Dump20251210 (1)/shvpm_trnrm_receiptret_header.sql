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
-- Table structure for table `trnrm_receiptret_header`
--

DROP TABLE IF EXISTS `trnrm_receiptret_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnrm_receiptret_header` (
  `rerh_seqno` int NOT NULL,
  `rerh_compcode` tinyint NOT NULL,
  `rerh_fincode` tinyint NOT NULL,
  `rerh_no` int NOT NULL,
  `rerh_grnseqno` int NOT NULL,
  `rerh_date` datetime NOT NULL,
  `rerh_itemvalue` decimal(14,2) NOT NULL,
  `rerh_scper` decimal(5,2) NOT NULL,
  `rerh_stper` decimal(5,2) NOT NULL,
  `rerh_scamount` decimal(14,2) NOT NULL,
  `rerh_stamount` decimal(14,2) NOT NULL,
  `rerh_servicecharge` decimal(14,2) NOT NULL,
  `rerh_edamount` decimal(14,2) NOT NULL,
  `rerh_roundingoff` decimal(5,2) NOT NULL,
  `rerh_totalvalue` decimal(14,2) NOT NULL,
  `rerh_lorryno` varchar(15) NOT NULL,
  `rerh_remarks` varchar(200) NOT NULL,
  `rerh_vouno` varchar(12) NOT NULL,
  `rerh_usr_code` int NOT NULL,
  `rerh_cgst_per` decimal(5,1) DEFAULT NULL,
  `rerh_sgst_per` decimal(5,1) DEFAULT NULL,
  `rerh_igst_per` decimal(5,1) DEFAULT NULL,
  `rerh_cgst_amt` decimal(8,0) DEFAULT NULL,
  `rerh_sgst_amt` decimal(8,0) DEFAULT NULL,
  `rerh_igst_amt` decimal(8,0) DEFAULT NULL,
  `rerh_entry_date` datetime NOT NULL,
  `rerh_educessamount` decimal(14,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`rerh_seqno`),
  KEY `uk_trnrm_receiptret_header__rerh_compcode_rerh_fincode_rerh_no` (`rerh_compcode`,`rerh_fincode`,`rerh_no`),
  KEY `fk_trnrm_receiptret_header_mas_finyear_idx` (`rerh_fincode`),
  KEY `fk_trnrm_receiptret_header_trnrm_receipt_header_idx` (`rerh_grnseqno`),
  KEY `fk_trnrm_receiptret_header_mas_finyear1_idx` (`rerh_fincode`),
  KEY `fk_trnrm_receiptret_header_trnrm_receipt1_header_idx` (`rerh_grnseqno`),
  KEY `fk_trnrm_receiptret_header_mas_users_idx` (`rerh_usr_code`),
  CONSTRAINT `fk_trnrm_receiptret_header_mas_company` FOREIGN KEY (`rerh_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnrm_receiptret_header_mas_finyear` FOREIGN KEY (`rerh_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnrm_receiptret_header_mas_users` FOREIGN KEY (`rerh_usr_code`) REFERENCES `mas_users` (`usr_code`),
  CONSTRAINT `fk_trnrm_receiptret_header_trnrm_receipt_header` FOREIGN KEY (`rerh_grnseqno`) REFERENCES `trnrm_receipt_header` (`rech_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnrm_receiptret_header`
--

LOCK TABLES `trnrm_receiptret_header` WRITE;
/*!40000 ALTER TABLE `trnrm_receiptret_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnrm_receiptret_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:45
