CREATE DATABASE  IF NOT EXISTS `shvpm` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shvpm`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 10.0.0.251    Database: shvpm
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `acc_billpassing_trailer`
--

DROP TABLE IF EXISTS `acc_billpassing_trailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acc_billpassing_trailer` (
  `bill_seqno` int NOT NULL,
  `bill_ledcode` int NOT NULL,
  `bill_voucher_no` varchar(15) NOT NULL,
  `bill_voucher_date` datetime NOT NULL,
  `bill_inv_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_freight` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_others` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_igst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_cgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_sgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_dbcr` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_inv_round` decimal(4,2) NOT NULL DEFAULT '0.00',
  `bill_inv_net` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_no` varchar(50) NOT NULL DEFAULT ' ',
  `bill_po_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_freight` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_others` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_igst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_cgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_sgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_po_net` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_no` varchar(50) NOT NULL DEFAULT ' ',
  `bill_min_qty` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_freight` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_others` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_igst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_cgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_sgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_fgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_cess` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_min_round` decimal(4,2) NOT NULL DEFAULT '0.00',
  `bill_min_net` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_no` varchar(50) NOT NULL DEFAULT ' ',
  `bill_pur_freight` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_discount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_others` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_igst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_cgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_sgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_fgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_cess` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_pur_round` decimal(4,2) NOT NULL DEFAULT '0.00',
  `bill_pur_net` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_no` varchar(50) NOT NULL DEFAULT ' ',
  `bill_dbcr_qty` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_gross` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_igst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_cgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_sgst` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_round` decimal(4,2) NOT NULL DEFAULT '0.00',
  `bill_dbcr_net` decimal(12,2) NOT NULL DEFAULT '0.00',
  `bill_test_no` int NOT NULL DEFAULT '0',
  `bill_test_result` varchar(50) NOT NULL DEFAULT ' ',
  `bill_test_accqty` decimal(12,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`bill_seqno`),
  KEY `index1` (`bill_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_billpassing_trailer`
--

LOCK TABLES `acc_billpassing_trailer` WRITE;
/*!40000 ALTER TABLE `acc_billpassing_trailer` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_billpassing_trailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:31:55
