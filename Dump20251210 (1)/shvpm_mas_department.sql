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
-- Table structure for table `mas_department`
--

DROP TABLE IF EXISTS `mas_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_department` (
  `department_code` int NOT NULL,
  `department_name` varchar(25) NOT NULL,
  `department_linkcode` int NOT NULL,
  `department_pw` varchar(10) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`department_code`,`department_linkcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_department`
--

LOCK TABLES `mas_department` WRITE;
/*!40000 ALTER TABLE `mas_department` DISABLE KEYS */;
INSERT INTO `mas_department` VALUES (1,'MECHANICAL',13,'MECH',0),(2,'ELECTRICAL',6,'ELECT',0),(3,'PRODUCTION',1,'PROD',0),(4,'CIVIL',8,'CIVI',0),(5,'RAWMATERIAL',16,'RAW',0),(6,'IT DEPARTMENT',7,'it',0),(7,'INSTRUMENTATION',20,'INST',0),(8,'PURCHASE',18,'PUR',0),(9,'STORES',19,'STORES',0),(10,'PULPER',14,'PULP',0),(11,'ACCOUNTS',3,'ACCOUNTS',0),(12,'SALES',4,'SALES',0),(13,'QUALITY CONTROL',5,'QC',0),(14,'HR ',17,'HR',0),(15,'MANAGEMENT',24,'HEAD',0),(16,'POWER PLANT',2,'power',0),(17,'GENERAL',15,'GEN',0),(18,'VEHICLE',14,'vehicle',0);
/*!40000 ALTER TABLE `mas_department` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:49:22
