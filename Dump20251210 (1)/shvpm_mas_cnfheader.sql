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
-- Table structure for table `mas_cnfheader`
--

DROP TABLE IF EXISTS `mas_cnfheader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_cnfheader` (
  `cnfh_code` int NOT NULL,
  `cnfh_name` varchar(50) DEFAULT NULL,
  `cnfh_port_code` int NOT NULL,
  `cnfh_add1` varchar(75) DEFAULT NULL,
  `cnfh_add2` varchar(75) DEFAULT NULL,
  `cnfh_add3` varchar(75) DEFAULT NULL,
  `cnfh_city` varchar(50) DEFAULT NULL,
  `cnfh_country` int NOT NULL,
  `cnfh_phone` varchar(50) DEFAULT NULL,
  `cnfh_fax` varchar(50) DEFAULT NULL,
  `cnfh_email` varchar(75) DEFAULT NULL,
  `cnfh_web` varchar(75) DEFAULT NULL,
  `cnfh_ledcode` int NOT NULL,
  `cnfh_port_freedays` smallint NOT NULL,
  `cnfh_dmrgdays` smallint NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`cnfh_code`),
  UNIQUE KEY `uk_mas_cnfheader__cnfh_name` (`cnfh_name`),
  KEY `fk_mas_cnfheader_mas_country1` (`cnfh_country`),
  KEY `fk_mas_cnfheader_mas_ledger1` (`cnfh_ledcode`),
  KEY `fk_mas_cnfheader_mas_port1` (`cnfh_port_code`),
  CONSTRAINT `fk_mas_cnfheader_mas_country1` FOREIGN KEY (`cnfh_country`) REFERENCES `mas_country` (`country_code`),
  CONSTRAINT `fk_mas_cnfheader_mas_ledger1` FOREIGN KEY (`cnfh_ledcode`) REFERENCES `mas_ledger` (`led_code`),
  CONSTRAINT `fk_mas_cnfheader_mas_port1` FOREIGN KEY (`cnfh_port_code`) REFERENCES `mas_port` (`port_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_cnfheader`
--

LOCK TABLES `mas_cnfheader` WRITE;
/*!40000 ALTER TABLE `mas_cnfheader` DISABLE KEYS */;
/*!40000 ALTER TABLE `mas_cnfheader` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:49:05
