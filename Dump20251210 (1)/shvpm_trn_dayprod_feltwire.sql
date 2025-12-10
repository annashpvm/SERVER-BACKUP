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
-- Table structure for table `trn_dayprod_feltwire`
--

DROP TABLE IF EXISTS `trn_dayprod_feltwire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_dayprod_feltwire` (
  `fw_compcode` tinyint NOT NULL,
  `fw_seqno` int NOT NULL,
  `fw_supervisor` int DEFAULT '0',
  `fw_shift_incharge` int DEFAULT '0',
  `fw_suplier` varchar(30) NOT NULL,
  `fw_size` varchar(30) NOT NULL,
  `fw_mounteddate` datetime NOT NULL,
  `fw_mountedshift` char(1) NOT NULL,
  `fw_section` varchar(50) NOT NULL,
  `fw_wireno` varchar(20) NOT NULL,
  `fw_lifestatus` varchar(1) DEFAULT '',
  `fw_removeddate` datetime NOT NULL,
  `fw_removedshift` char(1) NOT NULL,
  `fw_prod_garantee` decimal(8,1) NOT NULL DEFAULT '0.0',
  `fw_prod_yield` decimal(8,1) NOT NULL DEFAULT '0.0',
  `fw_reason` varchar(100) NOT NULL,
  PRIMARY KEY (`fw_seqno`,`fw_compcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_dayprod_feltwire`
--

LOCK TABLES `trn_dayprod_feltwire` WRITE;
/*!40000 ALTER TABLE `trn_dayprod_feltwire` DISABLE KEYS */;
INSERT INTO `trn_dayprod_feltwire` VALUES (1,1,14,6,'dsfdsf','DSF','2025-06-17 00:00:00','A','Jumbo Press Top Felt','232','C','2025-06-17 00:00:00','A',3211.0,3232.0,'dsfdsfds'),(1,2,15,13,'test','TST','2025-06-17 00:00:00','B','','12121','C','2025-06-17 00:00:00','B',1111.0,2222.0,'test'),(1,3,15,4,'dsfdsfdsfds','SDFSDFD','2025-06-17 00:00:00','A','II Press Top Felt','dfd','C','2025-06-17 00:00:00','C',2323.0,3323.0,'dssfdsf'),(1,4,16,13,'SHALIMAR','31.17 X 3.10','2025-03-08 00:00:00','C','Top Wire','44764','C','2025-06-16 00:00:00','C',10000.0,12249.0,'DURING THE RUNNING TIME WIRE GOT BURST AT SEAM JOINT'),(1,5,16,5,'felt wire','DSF','2025-06-17 00:00:00','B','','232','C','2025-06-17 00:00:00','B',3211.0,3232.0,'life completed'),(1,6,1,13,'WF FILTER FABRIKS','22 X 2.85','2025-07-09 00:00:00','B','Pre Dryer I Top Screen','351975','N','2025-07-09 00:00:00','B',12.0,12.0,'NEW SCREEN CHANGE');
/*!40000 ALTER TABLE `trn_dayprod_feltwire` ENABLE KEYS */;
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
