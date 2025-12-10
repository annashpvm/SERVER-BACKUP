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
-- Table structure for table `trnirm_orderamnd_header`
--

DROP TABLE IF EXISTS `trnirm_orderamnd_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_orderamnd_header` (
  `amnh_seqno` int NOT NULL,
  `amnh_amnddate` datetime NOT NULL,
  `amnh_ordhdseqno` int NOT NULL,
  `amnh_sup_code` int NOT NULL,
  `amnh_agent_code` int NOT NULL,
  `amnh_date` datetime NOT NULL,
  `amnh_terms` varchar(60) NOT NULL,
  `amnh_carriagetype` int NOT NULL,
  `amnh_origincountry` int NOT NULL,
  `amnh_originport` int NOT NULL,
  `amnh_arrivalport` int NOT NULL,
  `amnh_paymode` int NOT NULL,
  `amnh_lcdays` smallint NOT NULL,
  `amnh_nadays` smallint NOT NULL,
  `amnh_creditdays` int NOT NULL,
  `amnh_interstatus` varchar(1) NOT NULL,
  `amnh_payterms` varchar(60) NOT NULL,
  `amnh_remarks` varchar(250) NOT NULL,
  `amnh_frttype` int NOT NULL,
  `amnh_frtparty_code` int NOT NULL,
  `amnh_itemcurvalue` decimal(14,2) NOT NULL,
  `amnh_exrate` decimal(5,2) NOT NULL,
  `amnh_totalcurvalue` decimal(14,2) NOT NULL,
  `amnh_itemvalue` decimal(14,2) NOT NULL,
  `amnh_roundinff` decimal(5,2) NOT NULL,
  `amnh_totalvalue` decimal(14,2) NOT NULL,
  `amnh_status` varchar(1) NOT NULL,
  `amnh_wedate` datetime NOT NULL,
  `amnh_usr_code` int NOT NULL,
  `amnh_entry_date` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`amnh_seqno`),
  KEY `fk_trnirm_orderamnd_header_mas_country` (`amnh_origincountry`),
  KEY `fk_trnirm_orderamnd_header_mas_port` (`amnh_originport`),
  KEY `fk_trnirm_orderamnd_header_mas_port1` (`amnh_arrivalport`),
  KEY `fk_trnirm_orderamnd_header_mas_terms` (`amnh_paymode`),
  KEY `fk_trnirm_orderamnd_header_mas_transport` (`amnh_carriagetype`),
  KEY `FK_trnirm_orderamnd_header_mas_users` (`amnh_usr_code`),
  KEY `fk_trnirm_orderamnd_header_maspur_supplier_master` (`amnh_sup_code`),
  KEY `fk_trnirm_orderamnd_header_trnirm_order_header` (`amnh_ordhdseqno`),
  CONSTRAINT `fk_trnirm_orderamnd_header_mas_country` FOREIGN KEY (`amnh_origincountry`) REFERENCES `mas_country` (`country_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_mas_port` FOREIGN KEY (`amnh_originport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_mas_port1` FOREIGN KEY (`amnh_arrivalport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_mas_terms` FOREIGN KEY (`amnh_paymode`) REFERENCES `mas_terms` (`term_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_mas_transport` FOREIGN KEY (`amnh_carriagetype`) REFERENCES `mas_transport` (`carr_code`),
  CONSTRAINT `FK_trnirm_orderamnd_header_mas_users` FOREIGN KEY (`amnh_usr_code`) REFERENCES `mas_users` (`usr_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_maspur_supplier_master` FOREIGN KEY (`amnh_sup_code`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`),
  CONSTRAINT `fk_trnirm_orderamnd_header_trnirm_order_header` FOREIGN KEY (`amnh_ordhdseqno`) REFERENCES `trnirm_order_header` (`ordh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_orderamnd_header`
--

LOCK TABLES `trnirm_orderamnd_header` WRITE;
/*!40000 ALTER TABLE `trnirm_orderamnd_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_orderamnd_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:02
