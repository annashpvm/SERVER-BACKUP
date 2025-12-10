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
-- Table structure for table `mas_cnftrailer`
--

DROP TABLE IF EXISTS `mas_cnftrailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_cnftrailer` (
  `cnft_hdcode` int NOT NULL,
  `cnft_seqno` int NOT NULL,
  `cnft_cont_len` int NOT NULL,
  `cnft_cont_from` int NOT NULL,
  `cnft_cont_to` int NOT NULL,
  `cnft_wharfchrg` decimal(14,2) NOT NULL,
  `cnft_tlrhirechrg` decimal(14,2) NOT NULL,
  `cnft_movechrg` decimal(14,2) NOT NULL,
  `cnft_portlabrchrg` decimal(14,2) NOT NULL,
  `cnft_contractlabrchrg` decimal(14,2) NOT NULL,
  `cnft_docchrg` decimal(14,2) NOT NULL,
  `cnft_procchrg` decimal(14,2) NOT NULL,
  `cnft_stuffchrg` decimal(14,2) NOT NULL,
  `cnft_commchrg` decimal(14,2) NOT NULL,
  `cnft_servchrg` decimal(14,2) NOT NULL,
  `cnft_servtax` decimal(14,2) NOT NULL,
  `cnft_linthcchrg` decimal(14,2) NOT NULL,
  `cnft_lindochrg` decimal(14,2) NOT NULL,
  `cnft_surveyins` decimal(14,2) NOT NULL,
  `cnft_othchrg` decimal(14,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`cnft_hdcode`,`cnft_seqno`),
  UNIQUE KEY `uk_cnft_hdcode_cont_len_cont_from_cont_to` (`cnft_hdcode`,`cnft_cont_len`,`cnft_cont_from`,`cnft_cont_to`),
  CONSTRAINT `fk_mas_cnftrailer_mas_cnfheader` FOREIGN KEY (`cnft_hdcode`) REFERENCES `mas_cnfheader` (`cnfh_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_cnftrailer`
--

LOCK TABLES `mas_cnftrailer` WRITE;
/*!40000 ALTER TABLE `mas_cnftrailer` DISABLE KEYS */;
/*!40000 ALTER TABLE `mas_cnftrailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:18
