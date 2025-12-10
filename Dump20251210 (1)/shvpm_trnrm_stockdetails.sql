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
-- Table structure for table `trnrm_stockdetails`
--

DROP TABLE IF EXISTS `trnrm_stockdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnrm_stockdetails` (
  `stk_seqno` int NOT NULL,
  `stk_compcode` tinyint NOT NULL,
  `stk_lotno` int NOT NULL,
  `stk_itemcode` int NOT NULL,
  `stk_qty` decimal(13,3) NOT NULL,
  PRIMARY KEY (`stk_seqno`),
  KEY `uk_trnrm_stockdetailscomplotnoitemcode` (`stk_compcode`,`stk_lotno`,`stk_itemcode`),
  KEY `fk_trnrm_stockdetails_masrm_item_header_idx` (`stk_itemcode`),
  KEY `fk_trnrm_stockdetails_masrm_lot_idx` (`stk_lotno`),
  CONSTRAINT `fk_trnrm_stockdetails_mas_company` FOREIGN KEY (`stk_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnrm_stockdetails_masrm_item_header` FOREIGN KEY (`stk_itemcode`) REFERENCES `masrm_item_header` (`itmh_code`),
  CONSTRAINT `fk_trnrm_stockdetails_masrm_lot` FOREIGN KEY (`stk_lotno`) REFERENCES `mas_lot` (`lot_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnrm_stockdetails`
--

LOCK TABLES `trnrm_stockdetails` WRITE;
/*!40000 ALTER TABLE `trnrm_stockdetails` DISABLE KEYS */;
INSERT INTO `trnrm_stockdetails` VALUES (1,90,1,1,131.800),(2,90,2,1,0.000),(3,90,1,2,0.000),(4,90,2,2,0.000),(5,90,1,3,0.000),(6,1,1,3,465.208),(7,1,1,7,651.114),(8,1,2,3,0.000),(9,90,1,8,0.000),(10,90,2,8,0.000),(11,1,1,42,548.561),(12,1,1,25,2597.215),(13,1,1,19,107.745),(14,1,1,14,779.557),(15,1,1,1,1442.040),(16,90,1,42,0.000),(17,1,1,20,82.441),(18,1,1,16,67.199),(19,90,1,25,42.900),(20,90,1,16,0.000),(21,1,1,10,46.460),(22,1,2,42,146.462),(23,1,2,20,37.013),(24,1,2,25,841.916),(25,1,3,25,10.750),(26,1,3,18,0.000),(27,1,3,27,0.000),(28,90,3,27,151.000),(29,90,3,19,10.000),(30,1,1,41,10.260),(31,1,1,23,1.230),(32,1,1,13,24.470),(33,1,2,19,41.736),(34,1,2,14,262.150),(35,1,2,16,23.015),(36,1,1,29,1.120),(37,1,1,28,4.450),(38,1,1,26,2.470),(39,1,2,26,2.545),(40,1,2,28,10.494),(41,1,2,38,55.830),(42,1,2,1,430.010),(43,1,1,50,30.570),(44,1,1,51,13.140),(45,1,1,17,0.980),(46,1,2,23,0.050),(47,1,2,52,10.260),(48,1,1,45,24.660),(49,1,1,32,1.680),(50,1,1,44,11.025),(51,1,1,38,101.150),(52,1,1,52,9.680),(53,1,1,46,4.690),(54,1,3,20,1.920),(55,90,1,14,0.000),(56,90,1,15,0.000),(57,90,1,47,43.380),(58,90,1,49,37.600),(59,1,1,53,2.082),(60,1,2,29,0.140),(61,1,2,46,0.402),(62,1,1,8,486.982),(63,1,2,53,2.051),(64,1,2,15,0.150),(65,1,3,42,2.870),(66,1,2,10,96.160),(67,90,2,25,6.860),(68,90,2,20,0.280);
/*!40000 ALTER TABLE `trnrm_stockdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:16
