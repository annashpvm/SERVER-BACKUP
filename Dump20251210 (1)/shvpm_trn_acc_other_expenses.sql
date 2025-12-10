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
-- Table structure for table `trn_acc_other_expenses`
--

DROP TABLE IF EXISTS `trn_acc_other_expenses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_acc_other_expenses` (
  `obe_comp_code` tinyint NOT NULL,
  `obe_fincode` tinyint NOT NULL,
  `obe_actype` varchar(15) NOT NULL,
  `obe_no` decimal(8,0) NOT NULL,
  `obe_date` datetime NOT NULL,
  `obe_billno` varchar(20) DEFAULT NULL,
  `obe_billdate` datetime DEFAULT NULL,
  `obe_refno` varchar(30) NOT NULL,
  `obe_refdate` datetime DEFAULT NULL,
  `obe_party` decimal(6,0) NOT NULL,
  `obe_ledger` decimal(6,0) NOT NULL,
  `obe_st_yn` varchar(1) NOT NULL,
  `obe_tds_yn` varchar(1) NOT NULL,
  `obe_gta_yn` varchar(1) DEFAULT NULL,
  `obe_tds_section` varchar(10) DEFAULT NULL,
  `obe_taxable_value` decimal(10,2) NOT NULL,
  `obe_taxable_value_tds` decimal(10,2) DEFAULT NULL,
  `obe_serper` decimal(5,3) NOT NULL,
  `obe_ser_amt` decimal(18,2) NOT NULL,
  `obe_eduper` decimal(5,3) NOT NULL,
  `obe_edu_amt` decimal(18,2) NOT NULL,
  `obe_sheper` decimal(5,3) NOT NULL,
  `obe_she_amt` decimal(18,2) NOT NULL,
  `obe_tdsper` decimal(6,3) NOT NULL,
  `obe_tds_amt` decimal(18,2) NOT NULL,
  `obe_other_amt` decimal(8,2) DEFAULT NULL,
  `obe_total_amt` decimal(10,2) DEFAULT NULL,
  `obe_acc_vouno` varchar(12) DEFAULT NULL,
  `obe_cgst_per` decimal(5,2) DEFAULT NULL,
  `obe_cgst_amt` decimal(8,2) DEFAULT NULL,
  `obe_cgst_ledcode` decimal(6,0) DEFAULT NULL,
  `obe_sgst_per` decimal(5,2) DEFAULT NULL,
  `obe_sgst_amt` decimal(8,2) DEFAULT NULL,
  `obe_sgst_ledcode` decimal(6,0) DEFAULT NULL,
  `obe_igst_per` decimal(5,2) DEFAULT NULL,
  `obe_igst_amt` decimal(8,2) DEFAULT NULL,
  `obe_igst_ledcode` decimal(6,0) DEFAULT NULL,
  `obe_description` varchar(60) NOT NULL,
  `obe_service_charges` decimal(8,2) DEFAULT NULL,
  `obe_subled_code` decimal(6,0) DEFAULT NULL,
  `obe_subled_amt` decimal(8,2) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_acc_other_expenses`
--

LOCK TABLES `trn_acc_other_expenses` WRITE;
/*!40000 ALTER TABLE `trn_acc_other_expenses` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_acc_other_expenses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:27
