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
-- Table structure for table `trn_tmp_rmentry`
--

DROP TABLE IF EXISTS `trn_tmp_rmentry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_tmp_rmentry` (
  `t_fincode` tinyint NOT NULL,
  `t_mill` tinyint NOT NULL,
  `t_grn` int NOT NULL,
  `t_date` datetime DEFAULT NULL,
  `t_pono` int DEFAULT NULL,
  `t_podate` datetime DEFAULT NULL,
  `t_supcode` decimal(6,0) NOT NULL,
  `t_lorryno` varchar(18) NOT NULL,
  `t_grnqty` decimal(7,2) DEFAULT NULL,
  `t_grnamount` decimal(8,2) DEFAULT NULL,
  `t_grn_item` decimal(4,0) NOT NULL,
  `t_item_qty` decimal(5,3) NOT NULL,
  `t_grn_rate` decimal(5,0) NOT NULL,
  `t_gst_per` decimal(5,2) DEFAULT NULL,
  `t_gst_amt` decimal(8,2) DEFAULT NULL,
  `t_tcs_per` decimal(5,3) DEFAULT NULL,
  `t_tcs_amt` decimal(8,2) DEFAULT NULL,
  `t_act_item` decimal(4,0) NOT NULL,
  `t_act_rate` decimal(5,0) DEFAULT NULL,
  `t_value1` decimal(8,2) DEFAULT NULL,
  `t_value2` decimal(8,2) DEFAULT NULL,
  `t_totvalue` decimal(8,2) DEFAULT NULL,
  `t_paid` decimal(8,2) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_tmp_rmentry`
--

LOCK TABLES `trn_tmp_rmentry` WRITE;
/*!40000 ALTER TABLE `trn_tmp_rmentry` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_tmp_rmentry` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:49:06
