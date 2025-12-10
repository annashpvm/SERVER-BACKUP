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
-- Table structure for table `trn_lc_application`
--

DROP TABLE IF EXISTS `trn_lc_application`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_lc_application` (
  `lca_compcode` tinyint NOT NULL,
  `lca_fincode` tinyint NOT NULL,
  `lca_refno` int DEFAULT NULL,
  `lca_date` datetime DEFAULT NULL,
  `lca_bank` int DEFAULT NULL,
  `lca_preparedat` varchar(50) DEFAULT NULL,
  `lca_poref` int DEFAULT NULL,
  `lca_podate` datetime DEFAULT NULL,
  `lca_party` int DEFAULT NULL,
  `lca_item_short` varchar(30) DEFAULT NULL,
  `lca_item_long` varchar(100) DEFAULT NULL,
  `lca_value` decimal(10,2) DEFAULT NULL,
  `lca_date_shipment` datetime DEFAULT NULL,
  `lca_place` varchar(30) DEFAULT NULL,
  `lca_expiry` datetime DEFAULT NULL,
  `lca_desp_from` varchar(30) DEFAULT NULL,
  `lca_desp_to` varchar(30) DEFAULT NULL,
  `lca_adv_bank` decimal(6,0) DEFAULT NULL,
  `lca_ne_bank` decimal(6,0) DEFAULT NULL,
  `lca_int_boneby_days` tinyint NOT NULL,
  `lca_int_boneby_party` tinyint NOT NULL,
  `lca_int` decimal(5,2) DEFAULT NULL,
  `lca_confirm_cr_request` varchar(1) DEFAULT NULL,
  `lca_partial_ship` varchar(1) DEFAULT NULL,
  `lca_trans_ship` varchar(1) DEFAULT NULL,
  `lca_paytype` varchar(30) DEFAULT NULL,
  `lca_crdays` tinyint NOT NULL,
  `lca_payterms` varchar(30) DEFAULT NULL,
  `lca_docreq1` varchar(100) DEFAULT NULL,
  `lca_docreq2` varchar(100) DEFAULT NULL,
  `lca_docreq3` varchar(100) DEFAULT NULL,
  `lca_docreq4` varchar(100) DEFAULT NULL,
  `lca_docreq5` varchar(100) DEFAULT NULL,
  `lca_docreq6` varchar(100) DEFAULT NULL,
  `lca_othcon1` varchar(100) DEFAULT NULL,
  `lca_othcon2` varchar(150) DEFAULT NULL,
  `lca_othcon3` varchar(100) DEFAULT NULL,
  `lca_othcon4` varchar(100) DEFAULT NULL,
  `lca_othcon5` varchar(100) DEFAULT NULL,
  `lca_othcon6` varchar(100) DEFAULT NULL,
  `lca_othins` varchar(100) DEFAULT NULL,
  `lca_lcno` varchar(20) DEFAULT NULL,
  `lca_lcdate` datetime DEFAULT NULL,
  `lca_bill_examt` decimal(10,2) DEFAULT NULL,
  `lca_lc_balamt` decimal(10,2) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_lc_application`
--

LOCK TABLES `trn_lc_application` WRITE;
/*!40000 ALTER TABLE `trn_lc_application` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_lc_application` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:59
