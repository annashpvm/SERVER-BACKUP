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
-- Table structure for table `export_deemed_invoice_header`
--

DROP TABLE IF EXISTS `export_deemed_invoice_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_deemed_invoice_header` (
  `ei_millcode` tinyint NOT NULL,
  `ei_fincode` tinyint NOT NULL,
  `ei_invno` int NOT NULL,
  `ei_invdate` datetime DEFAULT NULL,
  `ei_seqno` int NOT NULL,
  `ei_party` decimal(6,0) NOT NULL,
  `ei_buyeradd1` varchar(50) DEFAULT NULL,
  `ei_buyeradd2` varchar(50) DEFAULT NULL,
  `ei_buyeradd3` varchar(50) DEFAULT NULL,
  `ei_buyeradd4` varchar(50) DEFAULT NULL,
  `ei_ordno` varchar(50) DEFAULT NULL,
  `ei_other_ref` varchar(50) DEFAULT NULL,
  `ei_commissioner` varchar(150) DEFAULT NULL,
  `ei_loadingport` int DEFAULT NULL,
  `ei_dischargeport` int DEFAULT NULL,
  `ei_ct1_bond_slno` varchar(100) DEFAULT NULL,
  `ei_ct1_bond_no` varchar(300) DEFAULT NULL,
  `ei_ct1_bond_amt` decimal(8,2) DEFAULT NULL,
  `ei_addnlwt` decimal(5,1) DEFAULT NULL,
  `ei_rateusd` decimal(9,3) DEFAULT NULL,
  `ei_inr` decimal(6,2) DEFAULT NULL,
  `ei_frtusd` decimal(8,2) DEFAULT NULL,
  `ei_depb` char(1) DEFAULT NULL,
  `ei_depb_rem` varchar(75) DEFAULT NULL,
  `ei_focus` char(1) DEFAULT NULL,
  `ei_focus_rem` varchar(75) DEFAULT NULL,
  `ei_shipping_terms` varchar(100) DEFAULT NULL,
  `ei_pay_term1` varchar(100) DEFAULT NULL,
  `ei_pay_term2` varchar(100) DEFAULT NULL,
  `ei_are1_no` varchar(30) DEFAULT NULL,
  `ei_pack_det1` varchar(50) DEFAULT NULL,
  `ei_pack_det2` varchar(50) DEFAULT NULL,
  `ei_pack_det3` varchar(50) DEFAULT NULL,
  `ei_pack_det4` varchar(50) DEFAULT NULL,
  `ei_pack_det5` varchar(50) DEFAULT NULL,
  `ei_duty` decimal(6,3) DEFAULT NULL,
  `ei_cess` decimal(6,3) DEFAULT NULL,
  `ei_educess` decimal(6,3) DEFAULT NULL,
  `ei_shecess` decimal(6,3) DEFAULT NULL,
  `ei_fob_valueinr` decimal(11,2) DEFAULT NULL,
  `ei_depb_percent` decimal(6,2) DEFAULT NULL,
  `ei_pallets` varchar(15) DEFAULT NULL,
  `ei_claim` char(1) DEFAULT NULL,
  `ei_frt` decimal(10,2) DEFAULT NULL,
  `ei_ocean_frt` decimal(8,2) DEFAULT NULL,
  `ei_ins` decimal(6,2) DEFAULT NULL,
  `ei_ins_pack` varchar(100) DEFAULT NULL,
  `ei_destination` int DEFAULT NULL,
  `ei_chapterheading` varchar(10) DEFAULT NULL,
  `ei_data_millcode` int DEFAULT NULL,
  `ei_dutydesc` varchar(60) DEFAULT NULL,
  `ei_claimtype` char(1) DEFAULT NULL,
  `ei_rg23c_slno` int DEFAULT NULL,
  `ei_duty_per` decimal(8,2) DEFAULT NULL,
  `ei_duty_amt` decimal(8,2) DEFAULT NULL,
  `ei_cess_amt` decimal(8,2) DEFAULT NULL,
  `ei_edu_amt` decimal(8,2) DEFAULT NULL,
  `ei_she_amt` decimal(8,2) DEFAULT NULL,
  `ei_custname` varchar(60) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_deemed_invoice_header`
--

LOCK TABLES `export_deemed_invoice_header` WRITE;
/*!40000 ALTER TABLE `export_deemed_invoice_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_deemed_invoice_header` ENABLE KEYS */;
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
