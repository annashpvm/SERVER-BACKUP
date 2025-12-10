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
-- Table structure for table `trnirm_lcdetails`
--

DROP TABLE IF EXISTS `trnirm_lcdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_lcdetails` (
  `lcd_seqno` int NOT NULL,
  `lcd_compcode` tinyint NOT NULL,
  `lcd_fincode` tinyint NOT NULL,
  `lcd_lcseqno` int NOT NULL,
  `lcd_lcno` varchar(60) NOT NULL,
  `lcd_appseqno` int NOT NULL,
  `lcd_partycode` int NOT NULL,
  `lcd_poodstype` smallint NOT NULL,
  `lcd_poseqno` int NOT NULL,
  `lcd_lcdate` datetime NOT NULL,
  `lcd_validdate` datetime NOT NULL,
  `lcd_extenddate1` datetime DEFAULT NULL,
  `lcd_extenddate2` datetime DEFAULT NULL,
  `lcd_extenddate3` datetime DEFAULT NULL,
  `lcd_currvalue` decimal(18,2) NOT NULL,
  `lcd_partybank` int NOT NULL,
  `lcd_lcbank` int NOT NULL,
  `lcd_shipport` int NOT NULL,
  `lcd_arrivalport` int NOT NULL,
  `lcd_value` decimal(14,2) NOT NULL,
  `lcd_natiationdays` smallint NOT NULL,
  `lcd_intpercentage` decimal(5,2) NOT NULL,
  `lcd_exrate` decimal(5,2) NOT NULL,
  `lcd_status` varchar(1) NOT NULL,
  `lcd_usr_code` int NOT NULL,
  `lcd_entry_date` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`lcd_seqno`),
  KEY `uk_trnirm_lcdetails_compfincodelcnolcbank` (`lcd_compcode`,`lcd_fincode`,`lcd_lcno`,`lcd_lcbank`),
  KEY `uk_trnirm_lcdetails_compfincodelcseqno` (`lcd_compcode`,`lcd_fincode`,`lcd_lcseqno`),
  KEY `fk_trnirm_lcdetails_mas_finyear` (`lcd_fincode`),
  KEY `fk_trnirm_lcdetails_mas_port` (`lcd_shipport`),
  KEY `fk_trnirm_lcdetails_mas_port1` (`lcd_arrivalport`),
  KEY `fk_trnirm_lcdetails_mas_supbank` (`lcd_partybank`),
  KEY `fk_trnirm_lcdetails_mas_supbank1` (`lcd_lcbank`),
  KEY `fk_trnirm_lcdetails_mas_users` (`lcd_usr_code`),
  KEY `fk_trnirm_lcdetails_maspur_supplier_master` (`lcd_partycode`),
  KEY `fk_trnirm_lcdetails_trnirm_lcapplication` (`lcd_appseqno`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_company` FOREIGN KEY (`lcd_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_finyear` FOREIGN KEY (`lcd_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_port` FOREIGN KEY (`lcd_shipport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_port1` FOREIGN KEY (`lcd_arrivalport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_supbank` FOREIGN KEY (`lcd_partybank`) REFERENCES `mas_supbank` (`spb_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_supbank1` FOREIGN KEY (`lcd_lcbank`) REFERENCES `mas_supbank` (`spb_code`),
  CONSTRAINT `fk_trnirm_lcdetails_mas_users` FOREIGN KEY (`lcd_usr_code`) REFERENCES `mas_users` (`usr_code`),
  CONSTRAINT `fk_trnirm_lcdetails_maspur_supplier_master` FOREIGN KEY (`lcd_partycode`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`),
  CONSTRAINT `fk_trnirm_lcdetails_trnirm_lcapplication` FOREIGN KEY (`lcd_appseqno`) REFERENCES `trnirm_lcapplication` (`lca_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_lcdetails`
--

LOCK TABLES `trnirm_lcdetails` WRITE;
/*!40000 ALTER TABLE `trnirm_lcdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_lcdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:13
