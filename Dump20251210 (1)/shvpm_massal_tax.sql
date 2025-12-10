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
-- Table structure for table `massal_tax`
--

DROP TABLE IF EXISTS `massal_tax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `massal_tax` (
  `tax_code` int NOT NULL,
  `tax_name` varchar(50) NOT NULL,
  `tax_shortname` varchar(20) NOT NULL,
  `tax_sal_led_code` int DEFAULT '0',
  `tax_sgst_ledcode` int DEFAULT '0',
  `tax_cgst_ledcode` int DEFAULT '0',
  `tax_igst_ledcode` int DEFAULT '0',
  `tax_sgst` decimal(5,2) DEFAULT '0.00',
  `tax_cgst` decimal(5,2) DEFAULT '0.00',
  `tax_igst` decimal(5,2) DEFAULT '0.00',
  `tax_type` int DEFAULT '0',
  PRIMARY KEY (`tax_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `massal_tax`
--

LOCK TABLES `massal_tax` WRITE;
/*!40000 ALTER TABLE `massal_tax` DISABLE KEYS */;
INSERT INTO `massal_tax` VALUES (1,'INTERSTATE SALES 12%','IGST SALES',1743,0,0,1646,0.00,0.00,12.00,2),(2,'INTRASTATE SALES 6% + 6%','TN SALES',1741,1645,1644,0,6.00,6.00,0.00,1),(3,'FLY ASH SALES IGST','FLYASH IGST',1610,0,0,1646,0.00,0.00,12.00,2),(4,'FLY ASH SALES GST','FLY ASH SALES GST',1740,1645,1644,0,6.00,6.00,0.00,1),(5,'SEZ SALES','SEZ SALES',2804,0,0,0,0.00,0.00,0.00,2),(6,'OS -INTERSTATE SALES 18%','IGST SALES 18%',5129,0,0,5133,0.00,0.00,18.00,2),(7,'TN -INTRASTATE SALES 9% + 9%','IN SALES 18%',5130,1645,1644,0,9.00,9.00,0.00,1);
/*!40000 ALTER TABLE `massal_tax` ENABLE KEYS */;
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
