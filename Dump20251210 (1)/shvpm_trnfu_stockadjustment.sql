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
-- Table structure for table `trnfu_stockadjustment`
--

DROP TABLE IF EXISTS `trnfu_stockadjustment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_stockadjustment` (
  `stka_seqno` int NOT NULL,
  `stka_compcode` tinyint NOT NULL,
  `stka_fincode` tinyint NOT NULL,
  `stka_no` int NOT NULL,
  `stka_date` datetime NOT NULL,
  `stka_lotseqno` int NOT NULL,
  `stka_itemcode` int NOT NULL,
  `stka_adjflag` varchar(1) NOT NULL,
  `stka_qty` decimal(13,3) NOT NULL,
  `stka_value` decimal(14,2) NOT NULL,
  `stka_remarks` varchar(25) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`stka_seqno`),
  KEY `uk_trnfu_stockadjustment__stka_compcode_stka_fincode_stka_no` (`stka_compcode`,`stka_fincode`,`stka_no`),
  KEY `fk_trnfu_stockadjustment_mas_finyear_idx` (`stka_fincode`),
  KEY `fk_trnfu_stockadjustment_mas_lot_idx` (`stka_lotseqno`),
  KEY `fk_trnfu_stockadjustment_masfu_item_header_idx` (`stka_itemcode`),
  CONSTRAINT `fk_trnfu_stockadjustment_mas_company` FOREIGN KEY (`stka_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnfu_stockadjustment_mas_finyear` FOREIGN KEY (`stka_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnfu_stockadjustment_mas_lot` FOREIGN KEY (`stka_lotseqno`) REFERENCES `mas_lot` (`lot_code`),
  CONSTRAINT `fk_trnfu_stockadjustment_masfu_item_header` FOREIGN KEY (`stka_itemcode`) REFERENCES `masfu_item_header` (`itmh_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_stockadjustment`
--

LOCK TABLES `trnfu_stockadjustment` WRITE;
/*!40000 ALTER TABLE `trnfu_stockadjustment` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnfu_stockadjustment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:55
