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
-- Table structure for table `trnfu_stockdetails`
--

DROP TABLE IF EXISTS `trnfu_stockdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_stockdetails` (
  `stk_seqno` int NOT NULL,
  `stk_compcode` tinyint NOT NULL,
  `stk_lotno` int NOT NULL,
  `stk_itemcode` int NOT NULL,
  `stk_qty` decimal(13,3) NOT NULL,
  PRIMARY KEY (`stk_seqno`),
  KEY `uk_trnfu_stockdetails__stk_compcode_stk_lotseqno_stk_itemcode` (`stk_compcode`,`stk_lotno`,`stk_itemcode`),
  KEY `fk_trnfu_stockdetails_masfu_item_header_idx` (`stk_itemcode`),
  KEY `fk_trnfu_stockdetails_masrm_lot_idx` (`stk_lotno`),
  CONSTRAINT `fk_trnfu_stockdetails_mas_company` FOREIGN KEY (`stk_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnfu_stockdetails_masfu_item_header` FOREIGN KEY (`stk_itemcode`) REFERENCES `masfu_item_header` (`itmh_code`),
  CONSTRAINT `fk_trnfu_stockdetails_masrm_lot` FOREIGN KEY (`stk_lotno`) REFERENCES `mas_lot` (`lot_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_stockdetails`
--

LOCK TABLES `trnfu_stockdetails` WRITE;
/*!40000 ALTER TABLE `trnfu_stockdetails` DISABLE KEYS */;
INSERT INTO `trnfu_stockdetails` VALUES (1,1,1,5,1205.720),(2,1,1,8,3367.165),(3,1,1,23,5106.620),(4,90,1,5,0.000),(5,90,1,23,2.500),(6,1,1,10,759.645),(7,1,1,6,2045.345),(8,90,1,9,0.000),(9,90,1,22,0.000),(10,90,1,25,0.000),(11,1,2,8,241.980),(12,90,1,1,24.177),(13,90,3,10,0.000),(14,90,3,11,0.000),(15,90,3,1,100.000),(16,90,3,2,125.000),(17,1,3,23,121.770),(18,1,3,5,60.630),(19,1,3,6,85.380),(20,1,3,13,250.010),(21,1,3,14,9.250),(22,1,3,26,620.950),(23,1,1,15,9.360),(24,1,2,5,110.780),(25,1,2,10,16.570),(26,1,2,23,243.640),(27,1,2,19,53.330),(28,1,1,19,156.020),(29,1,1,7,69.370),(30,1,1,13,13.640),(31,1,2,6,95.970),(32,1,1,21,237.790),(33,1,1,27,180.930),(34,1,1,28,116.730),(35,1,1,30,7.320),(36,1,2,18,12.480),(37,1,2,27,23.730),(38,1,1,18,12.480),(39,1,1,31,23.300),(40,1,1,32,190.440),(41,1,2,32,10.420),(42,90,1,4,11.900),(43,1,1,9,11.440),(44,90,1,3,2.000),(45,1,1,33,9.540),(46,1,1,26,11.700),(47,1,2,31,14.070),(48,1,1,1,5.820);
/*!40000 ALTER TABLE `trnfu_stockdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:51
