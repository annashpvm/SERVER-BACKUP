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
-- Table structure for table `trnsal_prod_trailer`
--

DROP TABLE IF EXISTS `trnsal_prod_trailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_prod_trailer` (
  `sprdt_compcode` tinyint NOT NULL,
  `sprdt_fincode` tinyint NOT NULL,
  `sprdt_no` int NOT NULL,
  `sprdt_var` int NOT NULL,
  `sprdt_unit` tinyint NOT NULL,
  `sprdt_sr_no` bigint NOT NULL,
  `sprdt_weight` decimal(15,3) NOT NULL,
  `sprdt_tariffno` varchar(10) DEFAULT NULL,
  `sprdt_Grade` varchar(10) DEFAULT NULL,
  `sprdt_Party` varchar(50) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`sprdt_compcode`,`sprdt_fincode`,`sprdt_no`,`sprdt_unit`,`sprdt_sr_no`),
  KEY `FK_trnsal_prod_trailer_mas_finyear` (`sprdt_fincode`),
  CONSTRAINT `FK_trnsal_prod_trailer_mas_company` FOREIGN KEY (`sprdt_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `FK_trnsal_prod_trailer_mas_finyear` FOREIGN KEY (`sprdt_fincode`) REFERENCES `mas_finyear` (`fin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_prod_trailer`
--

LOCK TABLES `trnsal_prod_trailer` WRITE;
/*!40000 ALTER TABLE `trnsal_prod_trailer` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_prod_trailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:58
