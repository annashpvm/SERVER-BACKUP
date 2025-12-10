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
-- Table structure for table `tmp_pur_store_ledger_cons`
--

DROP TABLE IF EXISTS `tmp_pur_store_ledger_cons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tmp_pur_store_ledger_cons` (
  `comp_code` tinyint DEFAULT NULL,
  `re_cap_val` decimal(18,3) DEFAULT NULL,
  `re_rev_val` decimal(18,3) DEFAULT NULL,
  `rr_cap_val` decimal(18,3) DEFAULT NULL,
  `rr_rev_val` decimal(18,3) DEFAULT NULL,
  `is_cap_val` decimal(18,3) DEFAULT NULL,
  `is_rev_val` decimal(18,3) DEFAULT NULL,
  `is_value` decimal(18,3) DEFAULT NULL,
  `ir_cap_val` decimal(18,3) DEFAULT NULL,
  `ir_rev_val` decimal(18,3) DEFAULT NULL,
  `ir_value` decimal(18,3) DEFAULT NULL,
  `ap_val` decimal(18,3) DEFAULT NULL,
  `am_val` decimal(18,3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tmp_pur_store_ledger_cons`
--

LOCK TABLES `tmp_pur_store_ledger_cons` WRITE;
/*!40000 ALTER TABLE `tmp_pur_store_ledger_cons` DISABLE KEYS */;
INSERT INTO `tmp_pur_store_ledger_cons` VALUES (1,0.000,10741444.550,0.000,0.000,11289243.222,0.000,11289243.222,0.000,0.000,0.000,15719.540,0.000);
/*!40000 ALTER TABLE `tmp_pur_store_ledger_cons` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:40
