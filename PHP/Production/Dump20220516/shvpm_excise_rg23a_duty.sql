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
-- Table structure for table `excise_rg23a_duty`
--

DROP TABLE IF EXISTS `excise_rg23a_duty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `excise_rg23a_duty` (
  `rg23a_company` int DEFAULT NULL,
  `rg23a_finyear` tinyint DEFAULT NULL,
  `rg23a_month` int DEFAULT NULL,
  `rg23a_grnno` int DEFAULT NULL,
  `rg23a_grndt` datetime DEFAULT NULL,
  `rg23a_party` decimal(6,0) DEFAULT NULL,
  `rg23a_billno` varchar(25) DEFAULT NULL,
  `rg23a_billdt` datetime DEFAULT NULL,
  `rg23a_assval` decimal(10,2) DEFAULT NULL,
  `rg23a_duty` decimal(9,2) DEFAULT NULL,
  `rg23a_ecess` decimal(9,2) DEFAULT NULL,
  `rg23a_scess` decimal(9,2) DEFAULT NULL,
  `rg23a_chno` varchar(20) DEFAULT NULL,
  `rg23a_type` varchar(2) DEFAULT NULL,
  `rg23a_remarks` varchar(100) DEFAULT NULL,
  `rg23a_eccno` varchar(30) DEFAULT NULL,
  `rg23a_dutydebit` decimal(9,2) DEFAULT NULL,
  `rg23a_ecessdebit` decimal(9,2) DEFAULT NULL,
  `rg23a_scessdebit` decimal(9,2) DEFAULT NULL,
  `rg23a_itemgroup` tinyint NOT NULL,
  `rg23a_slno` int DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `excise_rg23a_duty`
--

LOCK TABLES `excise_rg23a_duty` WRITE;
/*!40000 ALTER TABLE `excise_rg23a_duty` DISABLE KEYS */;
/*!40000 ALTER TABLE `excise_rg23a_duty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:34:13
