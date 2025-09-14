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
-- Table structure for table `excise_rg23c_duty`
--

DROP TABLE IF EXISTS `excise_rg23c_duty`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `excise_rg23c_duty` (
  `rg23c_company` int DEFAULT NULL,
  `rg23c_finyear` tinyint DEFAULT NULL,
  `rg23c_month` int DEFAULT NULL,
  `rg23c_grnno` int NOT NULL,
  `rg23c_grndt` datetime DEFAULT NULL,
  `rg23c_party` decimal(6,0) DEFAULT NULL,
  `rg23c_billno` varchar(12) DEFAULT NULL,
  `rg23c_billdt` datetime DEFAULT NULL,
  `rg23c_duty` decimal(9,2) DEFAULT NULL,
  `rg23c_ecess` decimal(9,2) DEFAULT NULL,
  `rg23c_scess` decimal(9,2) DEFAULT NULL,
  `rg23c_duty50` decimal(9,2) DEFAULT NULL,
  `rg23c_ecess50` decimal(9,2) DEFAULT NULL,
  `rg23c_scess50` decimal(9,2) DEFAULT NULL,
  `rg23c_chno` varchar(20) DEFAULT NULL,
  `rg23c_type` varchar(2) DEFAULT NULL,
  `rg23c_remarks` varchar(100) DEFAULT NULL,
  `rg23c_eccno` varchar(20) DEFAULT NULL,
  `rg23c_dutydebit` decimal(9,2) DEFAULT NULL,
  `rg23c_ecessdebit` decimal(9,2) DEFAULT NULL,
  `rg23c_scessdebit` decimal(9,2) DEFAULT NULL,
  `rg23c_itemgroup` tinyint NOT NULL,
  `rg23c_slno` int DEFAULT NULL,
  `rg23c_slno1` int DEFAULT NULL,
  `rg23c_are1` int DEFAULT NULL,
  `rg23c_are1_date` datetime DEFAULT NULL,
  `rg23c_duty_percent` decimal(5,0) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `excise_rg23c_duty`
--

LOCK TABLES `excise_rg23c_duty` WRITE;
/*!40000 ALTER TABLE `excise_rg23c_duty` DISABLE KEYS */;
/*!40000 ALTER TABLE `excise_rg23c_duty` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:32:49
