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
-- Table structure for table `trn_prodplan_trailer_varietywise`
--

DROP TABLE IF EXISTS `trn_prodplan_trailer_varietywise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_prodplan_trailer_varietywise` (
  `pih_comp_code` tinyint NOT NULL,
  `pih_fincode` tinyint NOT NULL,
  `pih_amendno` smallint NOT NULL,
  `pih_amenddate` datetime DEFAULT NULL,
  `pih_ppno` int NOT NULL,
  `pih_date` datetime NOT NULL,
  `pih_variety` int NOT NULL,
  `pih_qty` decimal(6,1) DEFAULT NULL,
  `pih_mcprodn` decimal(7,3) DEFAULT NULL,
  `pih_rwfinprodn` decimal(7,3) DEFAULT NULL,
  `pih_rg1reelprodn` decimal(7,3) DEFAULT NULL,
  `pih_retree` decimal(8,3) DEFAULT NULL,
  `pih_repulp` decimal(7,3) DEFAULT NULL,
  `pih_floor` decimal(7,3) DEFAULT NULL,
  `pih_approved` char(1) DEFAULT NULL,
  `pih_close` char(1) DEFAULT NULL,
  `pih_tolarance` tinyint NOT NULL,
  PRIMARY KEY (`pih_comp_code`,`pih_fincode`,`pih_amendno`,`pih_ppno`,`pih_variety`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_prodplan_trailer_varietywise`
--

LOCK TABLES `trn_prodplan_trailer_varietywise` WRITE;
/*!40000 ALTER TABLE `trn_prodplan_trailer_varietywise` DISABLE KEYS */;
INSERT INTO `trn_prodplan_trailer_varietywise` VALUES (1,21,0,'2022-02-25 00:00:00',211001,'2022-02-25 00:00:00',24,39.0,0.000,0.000,0.000,0.000,0.000,0.000,'N','N',10),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',12,10.0,0.000,0.000,0.000,0.000,0.000,0.000,'N','N',5),(1,21,0,'2022-03-11 00:00:00',211002,'2022-03-11 00:00:00',22,22.0,0.000,0.000,0.000,0.000,0.000,0.000,'N','N',5),(1,25,0,'2025-06-23 00:00:00',25001,'2025-06-23 00:00:00',1,60.0,0.000,0.000,0.000,0.000,0.000,0.000,'N','N',10);
/*!40000 ALTER TABLE `trn_prodplan_trailer_varietywise` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:03
