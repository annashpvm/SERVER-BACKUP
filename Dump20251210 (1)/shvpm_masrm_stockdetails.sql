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
-- Table structure for table `masrm_stockdetails`
--

DROP TABLE IF EXISTS `masrm_stockdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masrm_stockdetails` (
  `stk_seqno` int NOT NULL,
  `stk_compcode` tinyint NOT NULL,
  `stk_fincode` tinyint NOT NULL,
  `stk_lotseqno` int NOT NULL,
  `stk_itemcode` int NOT NULL,
  `stk_opstk` decimal(13,3) NOT NULL,
  `stk_opbags` decimal(13,3) NOT NULL,
  `stk_opvalue` decimal(14,2) NOT NULL,
  `stk_actopstk` decimal(13,3) NOT NULL,
  `stk_actopbags` decimal(13,3) NOT NULL,
  `stk_usrcode` int NOT NULL,
  `stk_entrydate` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`stk_seqno`),
  KEY `fk_masrm_stockdetails_mas_users_idx` (`stk_usrcode`),
  CONSTRAINT `fk_masrm_stockdetails_mas_users` FOREIGN KEY (`stk_usrcode`) REFERENCES `mas_users` (`usr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masrm_stockdetails`
--

LOCK TABLES `masrm_stockdetails` WRITE;
/*!40000 ALTER TABLE `masrm_stockdetails` DISABLE KEYS */;
INSERT INTO `masrm_stockdetails` VALUES (3,3,19,1,4,147.424,0.000,1602003.35,168.612,0.000,16,'2019-04-19 00:00:00',0),(4,3,19,1,9,14.381,0.000,121198.68,2.480,0.000,16,'2019-04-19 00:00:00',0),(7,3,19,1,2,2.500,0.000,63561.36,137.521,0.000,16,'2019-04-19 00:00:00',0),(8,3,19,1,10,20.873,0.000,291608.17,6.162,0.000,16,'2019-04-19 00:00:00',0),(9,3,19,1,20,8.690,0.000,86585.00,5.170,0.000,16,'2019-04-19 00:00:00',0),(10,3,19,1,25,6.670,0.000,119676.98,13.220,0.000,16,'2019-04-19 00:00:00',0),(11,3,19,1,5,38.732,0.000,790196.44,264.183,0.000,16,'2019-04-19 00:00:00',0),(25,3,19,1,8,16.991,18.000,402273.20,16.991,18.000,16,'2019-04-19 00:00:00',0),(26,3,19,1,29,72.870,80.000,889123.57,72.870,80.000,16,'2019-04-19 00:00:00',0),(27,3,19,1,22,17.017,0.000,226653.34,17.017,0.000,16,'2019-04-19 00:00:00',0),(28,3,19,1,7,3.450,0.000,110205.11,3.450,0.000,16,'2019-04-19 00:00:00',0);
/*!40000 ALTER TABLE `masrm_stockdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:35
