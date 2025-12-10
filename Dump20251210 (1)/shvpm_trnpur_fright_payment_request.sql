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
-- Table structure for table `trnpur_fright_payment_request`
--

DROP TABLE IF EXISTS `trnpur_fright_payment_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnpur_fright_payment_request` (
  `f_compcode` tinyint NOT NULL,
  `f_fincode` tinyint NOT NULL,
  `f_date` datetime DEFAULT NULL,
  `f_fpr_no` int DEFAULT NULL,
  `f_pono` int DEFAULT NULL,
  `f_itemcode` int DEFAULT NULL,
  `f_supcode` int DEFAULT NULL,
  `f_poqty` decimal(8,0) DEFAULT NULL,
  `f_balance_qty` decimal(8,0) DEFAULT NULL,
  `f_need_qty` decimal(8,0) DEFAULT NULL,
  `f_net_qty` decimal(8,0) DEFAULT NULL,
  `f_fright` decimal(8,2) DEFAULT NULL,
  `f_from` varchar(20) DEFAULT NULL,
  `f_to` varchar(20) DEFAULT NULL,
  `f_trans_code` int DEFAULT NULL,
  `f_vehicle` varchar(50) DEFAULT NULL,
  `f_lrno` varchar(20) DEFAULT NULL,
  `f_frt_terms` varchar(50) DEFAULT NULL,
  `f_tolerent` decimal(5,0) DEFAULT NULL,
  `f_mode_type` varchar(15) DEFAULT NULL,
  `f_accupd` char(1) DEFAULT NULL,
  `f_name` varchar(20) DEFAULT NULL,
  `f_billno` varchar(25) DEFAULT NULL,
  `f_vouno` varchar(12) DEFAULT NULL,
  `f_billdate` datetime DEFAULT NULL,
  `f_lrdate` datetime DEFAULT NULL,
  `f_cheque_upd` char(1) DEFAULT NULL,
  `f_chequeno` varchar(15) DEFAULT NULL,
  `f_frttype` varchar(15) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnpur_fright_payment_request`
--

LOCK TABLES `trnpur_fright_payment_request` WRITE;
/*!40000 ALTER TABLE `trnpur_fright_payment_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnpur_fright_payment_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:57
