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
-- Table structure for table `TOBEDELETED_trn_weighbridge_entry`
--

DROP TABLE IF EXISTS `TOBEDELETED_trn_weighbridge_entry`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOBEDELETED_trn_weighbridge_entry` (
  `t_wb_year` tinyint NOT NULL,
  `t_wb_compcode` tinyint NOT NULL,
  `t_wb_ticketno` int NOT NULL,
  `t_wb_type` varchar(1) DEFAULT 'A',
  `t_wb_date` datetime DEFAULT NULL,
  `t_wb_vehicle` varchar(20) DEFAULT '',
  `t_wb_item` varchar(40) DEFAULT '',
  `t_wb_party` varchar(50) DEFAULT '',
  `t_wb_area` varchar(20) DEFAULT NULL,
  `t_wb_1st_loadtype` varchar(1) DEFAULT '',
  `t_wb_1st_weight` decimal(7,1) DEFAULT '0.0',
  `t_wb_1st_time` datetime DEFAULT NULL,
  `t_wb_2nd_loadtype` varchar(1) DEFAULT '',
  `t_wb_2nd_time` datetime DEFAULT NULL,
  `t_wb_2nd_weight` decimal(7,1) DEFAULT '0.0',
  `t_wb_net_weight` decimal(7,1) DEFAULT '0.0',
  `t_wb_upd` varchar(1) DEFAULT 'N',
  `t_wb_cancel_reason` varchar(50) DEFAULT '',
  PRIMARY KEY (`t_wb_year`,`t_wb_compcode`,`t_wb_ticketno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOBEDELETED_trn_weighbridge_entry`
--

LOCK TABLES `TOBEDELETED_trn_weighbridge_entry` WRITE;
/*!40000 ALTER TABLE `TOBEDELETED_trn_weighbridge_entry` DISABLE KEYS */;
INSERT INTO `TOBEDELETED_trn_weighbridge_entry` VALUES (24,1,2674,'A','2024-05-29 00:00:00','TN74P5888','WASTE MATCHES  STICKS ','VENKATESWARA BIOMASS','','L',13250.0,'2024-05-29 17:11:26','E','2024-05-29 20:43:03',6750.0,6500.0,'Y',''),(24,1,2683,'A','2024-05-29 00:00:00','TN74P5888.',' ','','','E',6750.0,'2024-05-29 20:43:03','',NULL,0.0,0.0,'C','WEIGHT WRONG'),(24,1,2684,'M','2024-05-30 00:00:00','TN57AU1237','WASTE PAPER ','SIVA METALS','','L',12395.0,'2024-05-30 08:52:43','E','2024-05-30 08:52:43',8355.0,4040.0,'N',''),(24,1,2685,'M','2024-05-30 00:00:00','TN87AU2548','WASTE PAPER ','ARCHANAS TRADERS ','','L',32450.0,'2024-05-30 09:48:09','E','2024-05-30 09:48:09',10250.0,22200.0,'N',''),(24,1,2686,'M','2024-05-30 00:00:00','TN85Z8758','paper Reel ','SIVAKASI','','L',18550.0,'2024-05-30 09:51:25','E','2024-05-30 09:51:25',7300.0,11250.0,'N','');
/*!40000 ALTER TABLE `TOBEDELETED_trn_weighbridge_entry` ENABLE KEYS */;
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
