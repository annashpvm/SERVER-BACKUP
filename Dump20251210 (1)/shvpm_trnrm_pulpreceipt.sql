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
-- Table structure for table `trnrm_pulpreceipt`
--

DROP TABLE IF EXISTS `trnrm_pulpreceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnrm_pulpreceipt` (
  `pulp_seqno` int NOT NULL,
  `pulp_compcode` tinyint NOT NULL,
  `pulp_fincode` tinyint NOT NULL,
  `pulp_no` int NOT NULL,
  `pulp_date` datetime NOT NULL,
  `pulp_remarks` varchar(100) NOT NULL,
  `pulp_rec_qty` decimal(13,3) NOT NULL,
  `pulp_issunit` tinyint NOT NULL,
  `pulp_vartype` int NOT NULL,
  `pulp_usr_code` int NOT NULL,
  `pulp_entry_date` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`pulp_seqno`),
  KEY `uk_trnrm_pulpreceipt__pulp_compcode_pulp_fincode_pulp_no` (`pulp_compcode`,`pulp_fincode`,`pulp_no`),
  KEY `fk_trnrm_pulpreceipt_mas_company1_idx` (`pulp_issunit`),
  KEY `fk_trnrm_pulpreceipt_mas_finyear_idx` (`pulp_fincode`),
  KEY `fk_trnrm_pulpreceipt_mas_users_idx` (`pulp_usr_code`),
  CONSTRAINT `fk_trnrm_pulpreceipt_mas_company` FOREIGN KEY (`pulp_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnrm_pulpreceipt_mas_company1` FOREIGN KEY (`pulp_issunit`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnrm_pulpreceipt_mas_finyear` FOREIGN KEY (`pulp_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnrm_pulpreceipt_mas_users` FOREIGN KEY (`pulp_usr_code`) REFERENCES `mas_users` (`usr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnrm_pulpreceipt`
--

LOCK TABLES `trnrm_pulpreceipt` WRITE;
/*!40000 ALTER TABLE `trnrm_pulpreceipt` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnrm_pulpreceipt` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:08
