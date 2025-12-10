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
-- Table structure for table `export_invoice_price_approval_header_amend`
--

DROP TABLE IF EXISTS `export_invoice_price_approval_header_amend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_invoice_price_approval_header_amend` (
  `ei_compcode` tinyint NOT NULL,
  `ei_fincode` tinyint NOT NULL,
  `ei_amendno` int DEFAULT NULL,
  `ei_amenddate` datetime DEFAULT NULL,
  `ei_appr_no` int DEFAULT NULL,
  `ei_appr_date` datetime NOT NULL,
  `ei_custcode` decimal(6,0) NOT NULL,
  `ei_dealer` decimal(6,0) NOT NULL,
  `ei_contact` varchar(50) DEFAULT NULL,
  `ei_our_ref` varchar(30) NOT NULL,
  `ei_our_refdate` datetime DEFAULT NULL,
  `ei_cust_ref` varchar(30) DEFAULT NULL,
  `ei_cust_refdate` datetime DEFAULT NULL,
  `ei_desi_port` int NOT NULL,
  `ei_inco_terms` decimal(6,0) NOT NULL,
  `ei_pay_terms` decimal(6,0) NOT NULL,
  `ei_ex_rate` decimal(9,2) NOT NULL,
  `ei_avg_billrate` decimal(8,2) DEFAULT NULL,
  `ei_ddk_per` decimal(5,2) DEFAULT NULL,
  `ei_ddk_amount` decimal(8,2) DEFAULT NULL,
  `ei_fms_per` decimal(5,2) DEFAULT NULL,
  `ei_fms_amount` decimal(8,2) DEFAULT NULL,
  `ei_cha_charge` decimal(8,2) NOT NULL,
  `ei_ecgc_charge_per` decimal(6,2) NOT NULL,
  `ei_ecgc_charge_amount` decimal(7,2) DEFAULT NULL,
  `ei_comm_type` varchar(1) DEFAULT NULL,
  `ei_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_comm_per` decimal(5,2) NOT NULL,
  `ei_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_extra_comm_type` varchar(1) DEFAULT NULL,
  `ei_extra_comm_per` decimal(5,2) NOT NULL,
  `ei_extra_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_extra_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_pallet_type` varchar(1) DEFAULT NULL,
  `ei_pallet_charge_per` decimal(5,2) NOT NULL,
  `ei_pallet_charge_amount` decimal(8,2) DEFAULT NULL,
  `ei_freight_mt` decimal(6,2) DEFAULT NULL,
  `ei_freight_amount` decimal(5,2) NOT NULL,
  `ei_nmr` decimal(8,0) NOT NULL,
  `ei_discharge_port` int DEFAULT NULL,
  `ei_shipment_date` varchar(30) DEFAULT NULL,
  `ei_trans_ship` varchar(20) DEFAULT NULL,
  `ei_part_ship` varchar(20) DEFAULT NULL,
  `ei_ship_marks` varchar(500) DEFAULT NULL,
  `ei_tolarance` varchar(50) DEFAULT NULL,
  `ei_deli_rem1` varchar(100) DEFAULT NULL,
  `ei_deli_rem2` varchar(100) DEFAULT NULL,
  `ei_deli_rem3` varchar(100) DEFAULT NULL,
  `ei_deli_rem4` varchar(100) DEFAULT NULL,
  `ei_pack_rem` varchar(100) DEFAULT NULL,
  `ei_approval` varchar(1) DEFAULT NULL,
  `ei_approval_date` datetime DEFAULT NULL,
  `ei_amend` varchar(1) DEFAULT NULL,
  `ei_amend_date` datetime DEFAULT NULL,
  `ei_buyeradd1` varchar(50) DEFAULT NULL,
  `ei_buyeradd2` varchar(50) DEFAULT NULL,
  `ei_buyeradd3` varchar(50) DEFAULT NULL,
  `ei_buyeradd4` varchar(50) DEFAULT NULL,
  `ei_pricevalid` datetime DEFAULT NULL,
  `ei_ins_borne` varchar(20) DEFAULT NULL,
  `ei_terms` varchar(50) DEFAULT NULL,
  `ei_insp_borne` varchar(20) DEFAULT NULL,
  `ei_cont_type` smallint DEFAULT NULL,
  `ei_cont_no` smallint DEFAULT NULL,
  `ei_duty_per` decimal(5,2) DEFAULT NULL,
  `ei_edu_per` decimal(5,2) DEFAULT NULL,
  `ei_she_per` decimal(5,2) DEFAULT NULL,
  `ei_note1` varchar(60) DEFAULT NULL,
  `ei_note2` varchar(60) DEFAULT NULL,
  `ei_note3` varchar(60) DEFAULT NULL,
  `ei_note4` varchar(60) DEFAULT NULL,
  `ei_plan_yn` varchar(1) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_invoice_price_approval_header_amend`
--

LOCK TABLES `export_invoice_price_approval_header_amend` WRITE;
/*!40000 ALTER TABLE `export_invoice_price_approval_header_amend` DISABLE KEYS */;
/*!40000 ALTER TABLE `export_invoice_price_approval_header_amend` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:42
