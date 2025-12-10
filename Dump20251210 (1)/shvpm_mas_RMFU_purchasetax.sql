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
-- Table structure for table `mas_RMFU_purchasetax`
--

DROP TABLE IF EXISTS `mas_RMFU_purchasetax`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_RMFU_purchasetax` (
  `tax_purcode` int NOT NULL,
  `tax_purname` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `tax_cgstper` decimal(5,2) DEFAULT '0.00',
  `tax_sgstper` decimal(5,2) DEFAULT '0.00',
  `tax_igstper` decimal(5,2) DEFAULT '0.00',
  `tax_cgstledcode` int DEFAULT '0',
  `tax_sgstledcode` int DEFAULT '0',
  `tax_igstledcode` int DEFAULT '0',
  `tax_cgstledger` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '11',
  `tax_sgstledger` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `tax_igstledger` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `tax_gst` decimal(5,2) DEFAULT '0.00',
  `tax_purtype` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'RM',
  `tax_state` tinyint DEFAULT '0',
  PRIMARY KEY (`tax_purcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_RMFU_purchasetax`
--

LOCK TABLES `mas_RMFU_purchasetax` WRITE;
/*!40000 ALTER TABLE `mas_RMFU_purchasetax` DISABLE KEYS */;
INSERT INTO `mas_RMFU_purchasetax` VALUES (1745,'BIO FUEL EXEMPT',0.00,0.00,0.00,0,0,0,'','','',0.00,'FU',1),(1746,'BIO  FUEL GST -5%',2.50,2.50,0.00,1667,1674,0,'INPUT CGST@2.5%','INPUT SGST@2.5%','',5.00,'FU',1),(1756,'CO-GEN  COAL-GST 5%',2.50,2.50,0.00,1667,1674,0,'INPUT CGST@2.5%','INPUT SGST@2.5%','',5.00,'FU',1),(1783,'WASTE PAPER -GST',2.50,2.50,0.00,1667,1674,0,'INPUT CGST@2.5%','INPUT SGST@2.5%','0',5.00,'RM',1),(1784,'WASTE PAPER-IGST',0.00,0.00,5.00,0,0,1672,'0','0','INPUT -IGST@5%',5.00,'RM',2),(1785,'WASTE PAPER PURCHASE-IMPORT',0.00,0.00,0.00,0,0,0,'11','','',0.00,'RM',3),(2258,'BIOFUEL IGST-5%',0.00,0.00,5.00,0,0,1672,'','','INPUT -IGST@5%',5.00,'FU',2),(2652,'REBATE AND DISCOUNT RECEIVED',0.00,0.00,0.00,0,0,0,' ',' ',' ',0.00,'FU',1),(2664,'CO-GEN COAL - IGST 5%',0.00,0.00,5.00,0,0,1672,'','','INPUT -IGST@5%',5.00,'FU',2),(2701,'WASTE PAPER GST 12%',6.00,6.00,0.00,1668,1675,0,'INPUT -CGST @ 6%','INPUT -SGST @ 6%','0',12.00,'RM',1),(2909,'WASTE PAPER - EXEMPT',0.00,0.00,0.00,0,0,0,'0','0','0',0.00,'RM',1),(3826,'BIO FUEL GST 12%',6.00,6.00,0.00,1668,1675,1670,'INPUT -CGST @ 6%','INPUT -SGST @ 6%','',12.00,'FU',1),(5143,'CO-GEN COAL-GST 18%',9.00,9.00,0.00,1669,1676,0,'INPUT CGST @9%','INPUT SGST @9%','0',18.00,'FU',1);
/*!40000 ALTER TABLE `mas_RMFU_purchasetax` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:01
