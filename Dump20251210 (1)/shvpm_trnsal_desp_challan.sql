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
-- Table structure for table `trnsal_desp_challan`
--

DROP TABLE IF EXISTS `trnsal_desp_challan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_desp_challan` (
  `des_comcode` tinyint NOT NULL,
  `des_fincode` tinyint NOT NULL,
  `des_no` int NOT NULL,
  `des_date` datetime NOT NULL,
  `des_party` int NOT NULL,
  `des_invno` int NOT NULL,
  `des_invdate` datetime NOT NULL,
  `des_item` int NOT NULL,
  `des_unit` tinyint NOT NULL,
  `des_size` varchar(20) DEFAULT NULL,
  `des_bundles` int NOT NULL,
  `des_reels` int NOT NULL,
  `des_wt` decimal(18,3) NOT NULL,
  `des_sno` int NOT NULL,
  `des_gsm` decimal(5,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`des_comcode`,`des_fincode`,`des_no`,`des_invno`,`des_invdate`,`des_item`,`des_sno`),
  KEY `FK_trnsal_desp_challan_mas_finyear` (`des_fincode`),
  CONSTRAINT `FK_trnsal_desp_challan_mas_company` FOREIGN KEY (`des_comcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `FK_trnsal_desp_challan_mas_finyear` FOREIGN KEY (`des_fincode`) REFERENCES `mas_finyear` (`fin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_desp_challan`
--

LOCK TABLES `trnsal_desp_challan` WRITE;
/*!40000 ALTER TABLE `trnsal_desp_challan` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_desp_challan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:21
