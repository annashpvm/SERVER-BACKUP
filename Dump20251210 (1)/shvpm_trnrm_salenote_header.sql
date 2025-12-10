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
-- Table structure for table `trnrm_salenote_header`
--

DROP TABLE IF EXISTS `trnrm_salenote_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnrm_salenote_header` (
  `salh_seqno` int NOT NULL,
  `salh_compcode` tinyint NOT NULL,
  `salh_fincode` tinyint NOT NULL,
  `salh_no` int NOT NULL,
  `salh_date` datetime NOT NULL,
  `salh_party_code` int NOT NULL,
  `salh_itemvalue` decimal(14,2) NOT NULL,
  `salh_scper` decimal(5,2) NOT NULL,
  `salh_stper` decimal(5,2) NOT NULL,
  `salh_servicecharge` decimal(14,2) NOT NULL,
  `salh_scamount` decimal(14,2) NOT NULL,
  `salh_stamount` decimal(14,2) NOT NULL,
  `salh_edamount` decimal(14,2) NOT NULL,
  `salh_roundingoff` decimal(5,2) NOT NULL,
  `salh_totalvalue` decimal(14,2) NOT NULL,
  `salh_remarks` varchar(200) NOT NULL,
  `salh_vouno` varchar(12) NOT NULL,
  `salh_usr_code` int NOT NULL,
  `salh_entry_date` datetime NOT NULL,
  `salh_educessamount` decimal(14,2) NOT NULL,
  `salh_cgst_amount` decimal(10,2) DEFAULT NULL,
  `salh_sgst_amount` decimal(10,2) DEFAULT NULL,
  `salh_acc_seqno` int DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`salh_seqno`),
  KEY `uk_trnrm_salenote_header_compfincodesalh_no` (`salh_compcode`,`salh_fincode`,`salh_no`),
  KEY `fk_trnrm_salenote_header_mas_finyear_idx` (`salh_fincode`),
  KEY `fk_trnrm_salenote_header_mas_users_idx` (`salh_usr_code`),
  KEY `fk_trnrm_salenote_header_maspur_supplier_master_idx` (`salh_party_code`),
  CONSTRAINT `fk_trnrm_salenote_header_mas_company` FOREIGN KEY (`salh_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnrm_salenote_header_mas_finyear` FOREIGN KEY (`salh_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnrm_salenote_header_mas_users` FOREIGN KEY (`salh_usr_code`) REFERENCES `mas_users` (`usr_code`),
  CONSTRAINT `fk_trnrm_salenote_header_maspur_supplier_master` FOREIGN KEY (`salh_party_code`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnrm_salenote_header`
--

LOCK TABLES `trnrm_salenote_header` WRITE;
/*!40000 ALTER TABLE `trnrm_salenote_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnrm_salenote_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:44
