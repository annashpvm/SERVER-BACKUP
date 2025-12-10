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
-- Table structure for table `trnirm_orderamnd_trailer`
--

DROP TABLE IF EXISTS `trnirm_orderamnd_trailer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_orderamnd_trailer` (
  `amnt_hdseqno` int NOT NULL,
  `amnt_seqno` tinyint NOT NULL,
  `amnt_item_code` int NOT NULL,
  `amnt_indh_seqno` int NOT NULL,
  `amnt_enqh_seqno` int NOT NULL,
  `amnt_qty` decimal(13,3) NOT NULL,
  `amnt_rec_qty` decimal(13,3) NOT NULL,
  `amnt_can_qty` decimal(13,3) NOT NULL,
  `amnt_pen_qty` decimal(13,3) NOT NULL,
  `amnt_lc_qty` decimal(13,3) NOT NULL,
  `amnt_inv_qty` decimal(13,3) NOT NULL,
  `amnt_unit_currate` decimal(14,2) NOT NULL,
  `amnt_item_curvalue` decimal(14,2) NOT NULL,
  `amnt_edpercentage` decimal(5,2) NOT NULL,
  `amnt_moisper` decimal(5,2) NOT NULL,
  `amnt_tareper` decimal(5,2) NOT NULL,
  `amnt_outthroughper` decimal(5,2) NOT NULL,
  `amnt_prohibitive` decimal(5,2) NOT NULL,
  `amnt_status` varchar(1) NOT NULL,
  `amnt_educessper` decimal(5,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`amnt_hdseqno`,`amnt_seqno`),
  KEY `uk_trnirm_orderamnd_trailer_hdseqno_item_code` (`amnt_hdseqno`,`amnt_item_code`),
  KEY `fk_trnirm_orderamnd_trailer_masrm_item_header` (`amnt_item_code`),
  CONSTRAINT `fk_trnirm_orderamnd_trailer_masrm_item_header` FOREIGN KEY (`amnt_item_code`) REFERENCES `masrm_item_header` (`itmh_code`),
  CONSTRAINT `fk_trnirm_orderamnd_trailer_trnirm_orderamnd_header` FOREIGN KEY (`amnt_hdseqno`) REFERENCES `trnirm_orderamnd_header` (`amnh_seqno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_orderamnd_trailer`
--

LOCK TABLES `trnirm_orderamnd_trailer` WRITE;
/*!40000 ALTER TABLE `trnirm_orderamnd_trailer` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_orderamnd_trailer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:06
