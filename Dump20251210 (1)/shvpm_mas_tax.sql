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
-- Table structure for table `mas_tax`
--

DROP TABLE IF EXISTS `mas_tax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_tax` (
  `tax_code` int NOT NULL,
  `tax_name` varchar(50) NOT NULL,
  `tax_type` tinyint DEFAULT NULL,
  `tax_ledcode` decimal(6,0) DEFAULT NULL,
  `tax_cgst_per` decimal(5,2) NOT NULL,
  `tax_sgst_per` decimal(5,2) DEFAULT NULL,
  `tax_igst_per` decimal(5,2) DEFAULT NULL,
  `tax_cgst_ledcode` decimal(6,0) DEFAULT NULL,
  `tax_sgst_ledcode` decimal(6,0) DEFAULT NULL,
  `tax_igst_ledcode` decimal(6,0) DEFAULT NULL,
  `tax_cgstledger` varchar(45) DEFAULT '',
  `tax_sgstledger` varchar(45) DEFAULT '',
  `tax_igstledger` varchar(45) DEFAULT '',
  `txt_importledger` varchar(45) DEFAULT '',
  PRIMARY KEY (`tax_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_tax`
--

LOCK TABLES `mas_tax` WRITE;
/*!40000 ALTER TABLE `mas_tax` DISABLE KEYS */;
INSERT INTO `mas_tax` VALUES (1,'FUEL PURCHASE - INTERSTATE',1,0,0.00,0.00,5.00,0,0,0,'','','',''),(2,'FUEL PURCHASE - INTRASTATE - NO GST',1,623,0.00,0.00,0.00,623,623,623,'','','',''),(3,'FUEL PURCHASE - INTRASTATE 18%',1,0,9.00,9.00,0.00,0,0,0,'','','',''),(4,'FUEL PURCHASE - INTRASTATE 5%',1,1756,2.50,2.50,0.00,1667,1674,0,'INPUT CGST@2.5%','INPUT SGST@2.5%','',''),(6,'IMPORT - NO TAX - FUEL',3,7925,0.00,0.00,0.00,0,0,0,'','','',''),(7,'IMPORT - NO TAX - RAWMATERIAL',3,6551,0.00,0.00,0.00,0,0,0,'','','',''),(8,'RM PURCHASE - INTERSTATE 18% (OS)',2,10,0.00,0.00,18.00,0,0,113,'','','',''),(9,'RM PURCHASE - INTERSTATE 5% (OS)',2,1784,0.00,0.00,5.00,0,0,1672,'','','INPUT -IGST@5%',''),(10,'RM PURCHASE - INTRASTATE 12% (TN)',1,41,6.00,6.00,0.00,2033,2033,623,'','','',''),(11,'RM PURCHASE - INTRASTATE 18% (TN)',1,1783,9.00,9.00,0.00,1669,1676,0,'INPUT CGST @9%','INPUT SGST @9%','',''),(12,'RM PURCHASE - INTRASTATE 5% (TN)',1,1783,2.50,2.50,0.00,1667,1674,0,'INPUT CGST@2.5%','INPUT SGST@2.5%','',''),(13,'RM PURCHASE IMPORT',1,1785,0.00,0.00,0.00,0,0,0,'','','','0');
/*!40000 ALTER TABLE `mas_tax` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:48
