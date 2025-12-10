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
-- Table structure for table `trnirm_invoice_depbtrailer`
--

DROP TABLE IF EXISTS `trnirm_invoice_depbtrailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_invoice_depbtrailer` (
  `invd_hdseqno` int NOT NULL,
  `invd_seqno` tinyint NOT NULL,
  `invd_depbseqno` int NOT NULL,
  `invd_adjustedval` decimal(14,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`invd_hdseqno`,`invd_seqno`),
  KEY `uk_trnirm_invoice_depbtrailer_hdseqnodepbseqno` (`invd_hdseqno`,`invd_seqno`),
  KEY `fk_trnirm_invoice_depbtrailer_trnirm_depb_license` (`invd_depbseqno`),
  CONSTRAINT `fk_trnirm_invoice_depbtrailer_trnirm_depb_license` FOREIGN KEY (`invd_depbseqno`) REFERENCES `trnirm_depb_license` (`depb_seqno`),
  CONSTRAINT `fk_trnirm_invoice_depbtrailer_trnirm_invoice_header` FOREIGN KEY (`invd_hdseqno`) REFERENCES `trnirm_invoice_header` (`invh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_invoice_depbtrailer`
--

LOCK TABLES `trnirm_invoice_depbtrailer` WRITE;
/*!40000 ALTER TABLE `trnirm_invoice_depbtrailer` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_invoice_depbtrailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:12
