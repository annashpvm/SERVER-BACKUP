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
-- Table structure for table `comp_mas`
--

DROP TABLE IF EXISTS `comp_mas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comp_mas` (
  `comp_code` tinyint NOT NULL,
  `comp_name` varchar(50) DEFAULT NULL,
  `comp_upw` varchar(8) DEFAULT NULL,
  `comp_hpw` varchar(8) DEFAULT NULL,
  `comp_pfno` varchar(20) DEFAULT NULL,
  `comp_fdapoints` decimal(8,0) DEFAULT NULL,
  `comp_fdaamt` decimal(8,0) DEFAULT NULL,
  `comp_rate` decimal(4,0) DEFAULT NULL,
  `comp_esi_no` varchar(10) DEFAULT NULL,
  `comp_esi_eligible` decimal(5,0) DEFAULT NULL,
  `comp_esi_emp1_contri` decimal(5,0) DEFAULT NULL,
  `comp_esi_emp2_contri` decimal(5,0) DEFAULT NULL,
  `comp_pf_eligible` decimal(5,0) DEFAULT NULL,
  PRIMARY KEY (`comp_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comp_mas`
--

LOCK TABLES `comp_mas` WRITE;
/*!40000 ALTER TABLE `comp_mas` DISABLE KEYS */;
INSERT INTO `comp_mas` VALUES (1,'DANALAKSHMI PAPER MILLS PRIVATE LIMITED','dpm','dpmho','TN/20181',12000,3160,0,'100',21001,1,3,15000),(2,'DANALAKSHMI PAPER MILLS PRIVATE LIMITED-(UNIT-II)','slpb','slpbho','TN/24302',12000,3160,0,'',1,2,5,15000),(3,'VIJAYALAKSHMI PAPER MILLS','vjpm','vjpmho','TN/29378',12000,3160,0,'',20001,1,3,15000),(4,'DANALAKSHMI PAPER MILLS PRIVATE LTD - (UNIT - II)','dpm2','dpm2ho','TN/20181',8000,1720,0,'',0,0,0,15000),(5,'DANALAKSHMI PAPER MILLS PVT LTD - POWER DIVISION','cogen','cogenh','TN/24302/A',12000,3160,0,'122',1,1,3,15000),(8,'DANALAKSHMI PAPER MILLS PVT LTD - OIL DIVISION','slpbo','slpbho','TN/24302/B',0,0,0,'',0,0,0,15000),(50,'SERVALAKSHMI PAPER LIMITED','spl','spl','',0,0,0,'',0,0,0,15000),(90,'TEST','test','test','',0,0,0,'',0,0,0,15000);
/*!40000 ALTER TABLE `comp_mas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:31:49
