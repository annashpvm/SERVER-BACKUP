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
-- Table structure for table `excise_rg1`
--

DROP TABLE IF EXISTS `excise_rg1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `excise_rg1` (
  `rg_company` int NOT NULL,
  `rg_finyear` tinyint NOT NULL,
  `rg_tariff` varchar(12) NOT NULL,
  `rg_varty` int NOT NULL,
  `rg_date` datetime NOT NULL,
  `rg_rb` varchar(10) NOT NULL,
  `rg_op_qty` decimal(18,4) NOT NULL,
  `rg_op_nos` int NOT NULL,
  `rg_prodn_qty` decimal(18,4) NOT NULL,
  `rg_prodn_nos` int NOT NULL,
  `rg_desp_qty` decimal(18,4) NOT NULL,
  `rg_desp_nos` int NOT NULL,
  `rg_desp_value` decimal(18,2) NOT NULL,
  `rg_euc_qty` decimal(18,4) NOT NULL,
  `rg_euc_nos` int NOT NULL,
  `rg_euc_value` decimal(18,2) NOT NULL,
  `rg_eub_qty` decimal(18,4) NOT NULL,
  `rg_eub_nos` int NOT NULL,
  `rg_eub_value` decimal(18,2) NOT NULL,
  `rg_oth_qty` decimal(18,4) NOT NULL,
  `rg_oth_nos` int NOT NULL,
  `rg_dutyrate` decimal(5,2) NOT NULL,
  `rg_dutyamt` decimal(18,2) NOT NULL,
  `rg_cessamt` decimal(18,2) NOT NULL,
  `rg_eduamt` decimal(18,2) NOT NULL,
  `rg_sheamt` decimal(18,2) NOT NULL,
  `rg_clo_qty` decimal(18,4) NOT NULL,
  `rg_clo_nos` decimal(18,0) NOT NULL,
  `rg_clo_value` decimal(18,2) NOT NULL,
  `rg_remarks` varchar(50) NOT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `excise_rg1`
--

LOCK TABLES `excise_rg1` WRITE;
/*!40000 ALTER TABLE `excise_rg1` DISABLE KEYS */;
/*!40000 ALTER TABLE `excise_rg1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:30:56
