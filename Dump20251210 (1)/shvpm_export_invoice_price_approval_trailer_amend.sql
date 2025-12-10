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
-- Table structure for table `export_invoice_price_approval_trailer_amend`
--

DROP TABLE IF EXISTS `export_invoice_price_approval_trailer_amend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_invoice_price_approval_trailer_amend` (
  `ei_compcode` tinyint NOT NULL,
  `ei_fincode` tinyint NOT NULL,
  `ei_amendno` int DEFAULT NULL,
  `ei_amenddate` datetime DEFAULT NULL,
  `ei_appr_no` int DEFAULT NULL,
  `ei_slno` smallint DEFAULT NULL,
  `ei_variety` int NOT NULL,
  `ei_size` varchar(28) NOT NULL,
  `ei_qty` decimal(6,1) DEFAULT NULL,
  `ei_fob_rate` decimal(7,2) DEFAULT NULL,
  `ei_bill_fob` decimal(7,2) DEFAULT NULL,
  `ei_bill_rate` decimal(8,2) DEFAULT NULL,
  `ei_exmillrate` decimal(8,2) DEFAULT NULL,
  `ei_ddk_per` decimal(5,2) DEFAULT NULL,
  `ei_ddk_amount` decimal(8,2) DEFAULT NULL,
  `ei_fms_per` decimal(5,2) DEFAULT NULL,
  `ei_fms_amount` decimal(8,2) DEFAULT NULL,
  `ei_cha_charge` decimal(8,2) DEFAULT NULL,
  `ei_ecgc_charge_per` decimal(6,2) DEFAULT NULL,
  `ei_ecgc_charge_amount` decimal(7,2) DEFAULT NULL,
  `ei_comm_type` varchar(1) DEFAULT NULL,
  `ei_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_comm_per` decimal(5,2) DEFAULT NULL,
  `ei_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_extra_comm_type` varchar(1) DEFAULT NULL,
  `ei_extra_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_extra_comm_per` decimal(5,2) DEFAULT NULL,
  `ei_extra_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_pallet_type` varchar(1) DEFAULT NULL,
  `ei_pallet_charge_per` decimal(7,2) DEFAULT NULL,
  `ei_pallet_charge_amount` decimal(8,2) DEFAULT NULL,
  `ei_freight_mt` decimal(6,2) DEFAULT NULL,
  `ei_freight_amount` decimal(8,2) DEFAULT NULL,
  `ei_nmr` decimal(8,2) DEFAULT NULL,
  `ei_nomenclature` varchar(60) DEFAULT NULL,
  `ei_print` varchar(1) DEFAULT NULL,
  `ei_ratetype` varchar(1) DEFAULT NULL,
  `ei_frttype` varchar(1) DEFAULT NULL,
  `ei_ma` varchar(1) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_invoice_price_approval_trailer_amend`
--

LOCK TABLES `export_invoice_price_approval_trailer_amend` WRITE;
/*!40000 ALTER TABLE `export_invoice_price_approval_trailer_amend` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_invoice_price_approval_trailer_amend` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:40
