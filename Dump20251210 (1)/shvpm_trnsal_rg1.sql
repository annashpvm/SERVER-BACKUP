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
-- Table structure for table `trnsal_rg1`
--

DROP TABLE IF EXISTS `trnsal_rg1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_rg1` (
  `comp_code` tinyint DEFAULT NULL,
  `fincode` tinyint NOT NULL,
  `var_code` int DEFAULT NULL,
  `unit` bigint DEFAULT NULL,
  `open_pulp` bigint DEFAULT NULL,
  `tariff` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `opstk` bigint DEFAULT NULL,
  `pulp_stk` bigint DEFAULT NULL,
  `stk_nos` bigint DEFAULT NULL,
  `bed_val` bigint DEFAULT NULL,
  `cess_val` bigint DEFAULT NULL,
  `seceducess_val` bigint DEFAULT NULL,
  `sal_val` bigint DEFAULT NULL,
  `stk_qty` bigint DEFAULT NULL,
  `prod_val` bigint DEFAULT NULL,
  `sal_qty` bigint DEFAULT NULL,
  `salr_val` bigint DEFAULT NULL,
  `nos` bigint DEFAULT NULL,
  `prod_nos` bigint DEFAULT NULL,
  `sal_nos` bigint DEFAULT NULL,
  `pulp_nos` bigint DEFAULT NULL,
  `oppulp_nos` bigint DEFAULT NULL,
  `sprdh_date` datetime DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_rg1`
--

LOCK TABLES `trnsal_rg1` WRITE;
/*!40000 ALTER TABLE `trnsal_rg1` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_rg1` ENABLE KEYS */;
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
