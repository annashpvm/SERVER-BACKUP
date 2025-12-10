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
-- Table structure for table `trnfu_issret_trailer`
--

DROP TABLE IF EXISTS `trnfu_issret_trailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_issret_trailer` (
  `isrt_hdseqno` int NOT NULL,
  `isrt_seqno` tinyint NOT NULL,
  `isrt_itemcode` int NOT NULL,
  `isrt_qty` decimal(13,3) NOT NULL,
  `isrt_rate` decimal(14,5) NOT NULL,
  `isrt_values` decimal(14,2) NOT NULL,
  PRIMARY KEY (`isrt_hdseqno`,`isrt_seqno`),
  KEY `fk_trnfu_issret_trailer_masfu_item_header_idx` (`isrt_itemcode`),
  KEY `uk_trnfu_issret_trailer_hdnolotitemcode` (`isrt_hdseqno`,`isrt_itemcode`),
  CONSTRAINT `fk_trnfu_issret_trailer_masfu_item_header` FOREIGN KEY (`isrt_itemcode`) REFERENCES `masfu_item_header` (`itmh_code`),
  CONSTRAINT `fk_trnfu_issret_trailer_trnfu_issret_header` FOREIGN KEY (`isrt_hdseqno`) REFERENCES `trnfu_issret_header` (`isrh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_issret_trailer`
--

LOCK TABLES `trnfu_issret_trailer` WRITE;
/*!40000 ALTER TABLE `trnfu_issret_trailer` DISABLE KEYS */;
INSERT INTO `trnfu_issret_trailer` VALUES (2,1,33,1.100,5397.33000,5937.07),(3,1,33,1.000,5397.33000,5397.33),(4,1,33,2.500,5397.33000,13493.33),(5,1,33,0.100,3109.64000,310.96),(6,1,4,0.500,1388.89000,694.45),(6,2,8,1.000,1460.67000,1460.67),(6,3,33,1.000,3109.64000,3109.64),(7,1,4,2.500,1388.89000,3472.23),(7,2,8,3.500,1460.67000,5112.35),(7,3,33,1.000,3109.64000,3109.64),(8,1,4,3.000,1388.89000,4166.67),(8,2,8,2.500,1460.67000,3651.67),(8,3,33,3.000,3109.64000,9328.92),(9,1,4,2.900,1388.89000,4027.78),(9,2,8,1.000,1460.67000,1460.67),(9,3,33,2.200,3109.64000,6841.21);
/*!40000 ALTER TABLE `trnfu_issret_trailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:56
