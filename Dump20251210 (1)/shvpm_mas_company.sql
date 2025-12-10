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
-- Table structure for table `mas_company`
--

DROP TABLE IF EXISTS `mas_company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_company` (
  `company_code` tinyint NOT NULL,
  `company_name` varchar(75) NOT NULL,
  `company_id` varchar(10) NOT NULL,
  `company_add1` varchar(40) DEFAULT NULL,
  `company_add2` varchar(40) DEFAULT NULL,
  `company_add3` varchar(40) DEFAULT NULL,
  `company_add4` varchar(40) DEFAULT NULL,
  `company_city` varchar(25) DEFAULT NULL,
  `company_state` varchar(25) DEFAULT NULL,
  `company_country` int DEFAULT NULL,
  `company_contact` text,
  `company_zipcode` varchar(10) DEFAULT NULL,
  `company_pass` varchar(10) DEFAULT NULL,
  `company_fax` varchar(20) DEFAULT NULL,
  `company_gst` varchar(15) DEFAULT NULL,
  `company_email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`company_code`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_company`
--

LOCK TABLES `mas_company` WRITE;
/*!40000 ALTER TABLE `mas_company` DISABLE KEYS */;
INSERT INTO `mas_company` VALUES (1,'SRI HARI VENKATESWARA PAPER MILLS (P) LTD','SHVPM','2/151, Keelanmarai Nadu Village','A.Lakshmipuram-Post','Keelanmarinadu, Sivakasi','TAMIL NADU','Virudhunagar (Dist)','',1,'9677809498','626127','SHVPM','','33AALCS4958D1Z7','sales@sriharipapers.com'),(2,'PAPER M/C ','PM','2/151, Keelanmarai Nadu Village','A.Lakshmipuram-Post','Sivakasi','TAMIL NADU','Virudhunagar (Dist)','',1,'','626127','PM','','33AALCS4958D1Z7',''),(90,'TRIAL ENTRY','TEST','2/151, Keelanmarai Nadu Village','A.Lakshmipuram-Post','Sivakasi','TAMIL NADU','Virudhunagar (Dist)','',1,'','626127','TEST','','33AALCS4958D1Z7','');
/*!40000 ALTER TABLE `mas_company` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:23
