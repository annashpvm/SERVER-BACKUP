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
-- Table structure for table `trn_acc_reverse_charge`
--

DROP TABLE IF EXISTS `trn_acc_reverse_charge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_acc_reverse_charge` (
  `revc_comp_code` tinyint NOT NULL,
  `revc_fincode` tinyint NOT NULL,
  `revc_invno` varchar(12) NOT NULL,
  `revc_invdate` datetime NOT NULL,
  `revc_type` int NOT NULL,
  `revc_frt_party` decimal(6,0) NOT NULL,
  `revc_lrno` varchar(20) NOT NULL,
  `revc_lrdate` datetime DEFAULT NULL,
  `revc_sup_code` decimal(6,0) NOT NULL,
  `revc_grnno` varchar(30) NOT NULL,
  `revc_grndate` datetime NOT NULL,
  `revc_hsncode` int DEFAULT NULL,
  `revc_amount` decimal(10,0) NOT NULL,
  `revc_sgst_per` decimal(5,2) NOT NULL,
  `revc_sgst_amt` decimal(10,2) NOT NULL,
  `revc_cgst_per` decimal(5,2) NOT NULL,
  `revc_cgst_amt` decimal(10,2) NOT NULL,
  `revc_igst_per` decimal(5,2) NOT NULL,
  `revc_igst_amt` decimal(10,2) NOT NULL,
  `revc_tax_rev_yn` char(1) NOT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_acc_reverse_charge`
--

LOCK TABLES `trn_acc_reverse_charge` WRITE;
/*!40000 ALTER TABLE `trn_acc_reverse_charge` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_acc_reverse_charge` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:34
