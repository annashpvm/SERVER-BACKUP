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
-- Table structure for table `masqc_chemical_parameters`
--

DROP TABLE IF EXISTS `masqc_chemical_parameters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masqc_chemical_parameters` (
  `c_itemcode` int NOT NULL,
  `c_paramcode` int NOT NULL DEFAULT '0',
  `c_specification` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  PRIMARY KEY (`c_itemcode`,`c_paramcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masqc_chemical_parameters`
--

LOCK TABLES `masqc_chemical_parameters` WRITE;
/*!40000 ALTER TABLE `masqc_chemical_parameters` DISABLE KEYS */;
INSERT INTO `masqc_chemical_parameters` VALUES (33,1,'5 TO 7'),(33,5,'10 TO 12'),(33,6,'MAX 1%'),(33,7,'14 TO 15 SEC(100GPL)'),(44,1,'2 TO 3'),(44,2,'1.2 TO 1.3'),(44,3,'POLY YELLOW'),(44,8,'12%'),(65,1,'5 TO 7'),(65,5,'10 TO 12'),(65,6,'MAX 1%'),(65,7,'14 TO 15 SEC(100GPL)'),(1528,1,'10 TO 12'),(1528,2,'1.1 TO 1.2'),(1528,3,'POLY YEELOW'),(1528,4,'120 +- 3 %'),(5840,1,'10 TO 12'),(5840,2,'1.1 TO 1.2'),(5840,3,'POLY YELLOW'),(5840,4,'120 ± 3%');
/*!40000 ALTER TABLE `masqc_chemical_parameters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:59
