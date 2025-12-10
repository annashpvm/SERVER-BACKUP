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
-- Table structure for table `massal_repr`
--

DROP TABLE IF EXISTS `massal_repr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `massal_repr` (
  `repr_code` int NOT NULL,
  `repr_name` varchar(50) NOT NULL,
  `repr_mobile` decimal(10,0) DEFAULT '0',
  `repr_addr1` varchar(50) DEFAULT '',
  `repr_addr2` varchar(50) DEFAULT '',
  `repr_addr3` varchar(50) DEFAULT '',
  `repr_pincode` varchar(6) DEFAULT '',
  `repr_accgrp` int DEFAULT '0',
  `repr_active` varchar(1) DEFAULT 'Y',
  PRIMARY KEY (`repr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `massal_repr`
--

LOCK TABLES `massal_repr` WRITE;
/*!40000 ALTER TABLE `massal_repr` DISABLE KEYS */;
INSERT INTO `massal_repr` VALUES (0,' ',0,' ',' ',' ',' ',0,'Y'),(1,'THIRUNARAYAN K',9677809546,'','','','',94,'Y'),(2,'VIJAY ANAND S',9677764026,'','','','',96,'Y'),(3,'SRI PRAKASH K',9677724907,'','','','',93,'N'),(4,'MANIKANDAN M',9677751968,'','','','',90,'N'),(5,'DIRECT (CHENNAI & OTHER CUSTOMERS)',9677809498,'','','','',91,'Y'),(6,'SHIBU Z',9446911028,'','','','',92,'N'),(7,'DIRECT CUSTOMERS',0,'','','','',89,'Y'),(8,'OLD CUSTOMERS',0,'','','','',0,'Y'),(9,'BALAMANI',0,'','','','',69,'Y'),(10,'BLACK LIST',0,'','','','',88,'Y'),(11,'VEE GEE',0,'','','','',97,'Y'),(12,'RAVIKUMAR P',9985041431,'','','','',103,'Y'),(13,'COIMBATORE & TIRUPUR',0,'','','','',106,'Y'),(14,'RAMESH K.B',9677751968,'KOTTUNGAL, ANNARA, THYKOOTTAM CANAL,','VYNTHALA, KALLUR, VADAKKUMMURI,','','',109,'Y'),(15,'SAMPATH',9842577558,'','','','',0,'Y'),(16,'BAD DEBTS',999999999,'','','','',113,'Y'),(17,'OTHER DEBTORS',1,'1','11','','',98,'Y'),(18,'PAPER BAG CUSTOMERS',8888888888,'1','1','','1',110,'Y'),(19,'CHENNAI CUSTOMERS',8888888888,'1','1','','1',117,'Y'),(20,'OTHERS - WITH IN THE TAMIL',8888888888,'1','','','',118,'Y'),(21,'OTHER THEN TAMIL NADU',8888888888,'','','','',119,'Y'),(22,'SANTHOSHMATHA',9677751501,'SHVPM','','','',120,'Y'),(23,'COMPANIES NOT ACTIVE / CLOSED',999999999,'','','','',121,'Y'),(24,'CASE FILED',999999999,'','','','',122,'Y');
/*!40000 ALTER TABLE `massal_repr` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:51
