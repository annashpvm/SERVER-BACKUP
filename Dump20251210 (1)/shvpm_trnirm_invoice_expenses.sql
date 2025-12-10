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
-- Table structure for table `trnirm_invoice_expenses`
--

DROP TABLE IF EXISTS `trnirm_invoice_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_invoice_expenses` (
  `invc_hdcode` int NOT NULL,
  `invc_slno` int NOT NULL,
  `invc_party` int DEFAULT '0',
  `invc_invno` varchar(20) DEFAULT '11',
  `invc_date` datetime DEFAULT NULL,
  `invc_handling` decimal(12,2) DEFAULT '0.00',
  `invc_maintenance` decimal(12,2) DEFAULT '0.00',
  `invc_usage` decimal(12,2) DEFAULT '0.00',
  `invc_admin` decimal(12,2) DEFAULT '0.00',
  `invc_clearing` decimal(12,2) DEFAULT '0.00',
  `invc_additional` decimal(12,2) DEFAULT '0.00',
  `invc_custduty` decimal(12,2) DEFAULT '0.00',
  `invc_demurrage` decimal(12,2) DEFAULT NULL,
  `invc_service` decimal(12,2) DEFAULT '0.00',
  `invc_others` decimal(12,2) DEFAULT '0.00',
  `invc_taxable` decimal(12,2) DEFAULT '0.00',
  `invc_cgstper` decimal(6,2) DEFAULT '0.00',
  `invc_cgstamt` decimal(12,2) DEFAULT '0.00',
  `invc_sgstper` decimal(6,2) DEFAULT '0.00',
  `invc_sgstamt` decimal(12,2) DEFAULT '0.00',
  `invc_igstper` decimal(6,2) DEFAULT '0.00',
  `invc_igstamt` decimal(12,2) DEFAULT '0.00',
  `invc_invamt` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`invc_hdcode`,`invc_slno`),
  CONSTRAINT `fk_trnirm_invoice_cnftrailer_trnirm_invoice_header` FOREIGN KEY (`invc_hdcode`) REFERENCES `trnirm_invoice_header` (`invh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_invoice_expenses`
--

LOCK TABLES `trnirm_invoice_expenses` WRITE;
/*!40000 ALTER TABLE `trnirm_invoice_expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_invoice_expenses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:14
