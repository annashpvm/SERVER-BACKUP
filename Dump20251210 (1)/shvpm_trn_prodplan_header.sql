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
-- Table structure for table `trn_prodplan_header`
--

DROP TABLE IF EXISTS `trn_prodplan_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_prodplan_header` (
  `pp_comp_code` tinyint NOT NULL,
  `pp_fincode` tinyint NOT NULL,
  `pp_amendno` smallint DEFAULT NULL,
  `pp_amenddate` datetime DEFAULT NULL,
  `pp_advno` int NOT NULL,
  `pp_advdate` datetime NOT NULL,
  `pp_slno` smallint NOT NULL,
  `pp_party` int NOT NULL,
  `pp_varcode` int DEFAULT NULL,
  `pp_sizecode` int NOT NULL,
  `pp_ordtype` varchar(1) DEFAULT NULL,
  `pp_qty` decimal(8,3) NOT NULL,
  `pp_priority` smallint DEFAULT NULL,
  `pp_close` char(1) DEFAULT NULL,
  `pp_closereason` varchar(50) DEFAULT NULL,
  `pp_order_ref` varchar(30) DEFAULT NULL,
  `pp_rwprodn` decimal(8,3) DEFAULT NULL,
  `pp_rg1prodn` decimal(8,3) DEFAULT NULL,
  `pp_retree` decimal(8,3) DEFAULT NULL,
  `pp_repulp` decimal(6,3) DEFAULT NULL,
  `pp_floor` decimal(6,3) DEFAULT NULL,
  `pp_despdate` datetime DEFAULT NULL,
  PRIMARY KEY (`pp_comp_code`,`pp_fincode`,`pp_advno`,`pp_advdate`,`pp_slno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_prodplan_header`
--

LOCK TABLES `trn_prodplan_header` WRITE;
/*!40000 ALTER TABLE `trn_prodplan_header` DISABLE KEYS */;
INSERT INTO `trn_prodplan_header` VALUES (1,21,0,'2022-02-25 00:00:00',211001,'2022-02-25 00:00:00',1,16,24,66,'L',22.000,1,'N','','2100001',0.000,0.000,0.000,0.000,0.000,'2022-02-25 00:00:00'),(1,21,0,'2022-02-25 00:00:00',211001,'2022-02-25 00:00:00',2,16,24,67,'L',17.000,1,'N','','2100001',0.000,0.000,0.000,0.000,0.000,'2022-02-25 00:00:00'),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',1,25,12,165,'L',10.000,1,'N','','2100009',0.000,0.000,0.000,0.000,0.000,'2022-03-11 00:00:00'),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',2,24,22,218,'L',2.000,1,'N','','2100008',0.000,0.000,0.000,0.000,0.000,'2022-03-11 00:00:00'),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',3,24,22,506,'L',20.000,1,'N','','2100008',0.000,0.000,0.000,0.000,0.000,'2022-03-11 00:00:00'),(1,25,0,'2025-06-23 00:00:00',25001,'2025-06-23 00:00:00',1,13,1,19,'L',50.000,1,'N','','2300124',0.000,0.000,0.000,0.000,0.000,'2025-06-23 00:00:00'),(1,25,0,'2025-06-23 00:00:00',25001,'2025-06-23 00:00:00',2,13,1,24,'L',10.000,2,'N','','2300124',0.000,0.000,0.000,0.000,0.000,'2025-06-23 00:00:00');
/*!40000 ALTER TABLE `trn_prodplan_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:57
