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
-- Table structure for table `trnirm_invoice_handling`
--

DROP TABLE IF EXISTS `trnirm_invoice_handling`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_invoice_handling` (
  `inv_hdcode` int DEFAULT NULL,
  `inv_supcode` int DEFAULT NULL,
  `inv_billno` varchar(20) DEFAULT NULL,
  `inv_billdate` datetime DEFAULT NULL,
  `inv_cfs_charges` decimal(10,2) DEFAULT NULL,
  `inv_liner_charges` decimal(10,2) DEFAULT NULL,
  `inv_cha_charges` decimal(10,2) DEFAULT NULL,
  `inv_demmurage_charges` decimal(10,2) DEFAULT NULL,
  `inv_service_charges` decimal(10,2) DEFAULT NULL,
  `inv_other_charges` decimal(10,2) DEFAULT NULL,
  `inv_taxable` decimal(10,2) DEFAULT NULL,
  `inv_cgst_per` decimal(5,2) DEFAULT NULL,
  `inv_sgst_per` decimal(5,2) DEFAULT NULL,
  `inv_igst_per` decimal(5,2) DEFAULT NULL,
  `inv_cgst_amt` decimal(8,2) DEFAULT NULL,
  `inv_sgst_amt` decimal(8,2) DEFAULT NULL,
  `inv_igst_amt` decimal(8,2) DEFAULT NULL,
  `inv_bill_amount` decimal(10,0) DEFAULT NULL,
  `inv_liner_by` char(1) DEFAULT NULL,
  `inv_cha_supcode` decimal(6,0) DEFAULT NULL,
  `inv_freight` decimal(10,2) DEFAULT NULL,
  `inv_rcno` varchar(12) DEFAULT NULL,
  `inv_rcdate` datetime DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_invoice_handling`
--

LOCK TABLES `trnirm_invoice_handling` WRITE;
/*!40000 ALTER TABLE `trnirm_invoice_handling` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_invoice_handling` ENABLE KEYS */;
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
