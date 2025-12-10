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
-- Table structure for table `mas_purchasetax`
--

DROP TABLE IF EXISTS `mas_purchasetax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_purchasetax` (
  `tax_code` int NOT NULL,
  `tax_name` varchar(50) DEFAULT '',
  `tax_cgstper` decimal(5,2) DEFAULT '0.00',
  `tax_sgstper` decimal(5,2) DEFAULT '0.00',
  `tax_igstper` decimal(5,2) DEFAULT '0.00',
  `tax_cgstledcode` int DEFAULT '0',
  `tax_sgstledcode` int DEFAULT '0',
  `tax_igstledcode` int DEFAULT '0',
  `tax_cgstledger` varchar(45) DEFAULT '11',
  `tax_sgstledger` varchar(45) DEFAULT '',
  `tax_igstledger` varchar(45) DEFAULT '',
  `tax_gst` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`tax_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_purchasetax`
--

LOCK TABLES `mas_purchasetax` WRITE;
/*!40000 ALTER TABLE `mas_purchasetax` DISABLE KEYS */;
INSERT INTO `mas_purchasetax` VALUES (0,'NOGST',0.00,0.00,0.00,0,0,0,' ',' ',' ',0.00),(1,'GST-12%',6.00,6.00,12.00,1668,1675,1670,'INPUT -CGST @ 6%','INPUT -SGST @ 6%','INPUT -IGST @ 12%',12.00),(2,'GST-18%',9.00,9.00,18.00,1669,1676,1671,'INPUT CGST @9%','INPUT SGST @9%','INPUT IGST @18%',18.00),(3,'GST-28%',14.00,14.00,28.00,1666,1673,0,'INPUT CGST@14%','INPUT SGST@14%','',28.00),(4,'GST-5%',2.50,2.50,5.00,1667,1674,1672,'INPUT CGST@2.5%','INPUT SGST@2.5%','INPUT -IGST@5%',5.00);
/*!40000 ALTER TABLE `mas_purchasetax` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:13
