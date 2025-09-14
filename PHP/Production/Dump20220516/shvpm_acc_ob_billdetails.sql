CREATE DATABASE  IF NOT EXISTS `shvpm` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `shvpm`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: 10.0.0.251    Database: shvpm
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

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
-- Table structure for table `acc_ob_billdetails`
--

DROP TABLE IF EXISTS `acc_ob_billdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acc_ob_billdetails` (
  `ob_seqno` int NOT NULL,
  `ob_vou_no` varchar(12) NOT NULL,
  `ob_comp_code` tinyint NOT NULL,
  `ob_fin_id` tinyint NOT NULL,
  `ob_vou_date` datetime NOT NULL,
  `ob_led_code` int NOT NULL,
  `ob_ref_no` varchar(20) NOT NULL,
  `ob_ref_date` datetime NOT NULL,
  `ob_dbamt` decimal(12,2) NOT NULL,
  `ob_cramt` decimal(12,2) NOT NULL,
  `ob_totamt` decimal(12,2) NOT NULL,
  `ob_adjamt` decimal(12,2) NOT NULL,
  PRIMARY KEY (`ob_seqno`),
  UNIQUE KEY `unique_acc_ob_billdetails_vouno` (`ob_vou_no`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_ob_billdetails`
--

LOCK TABLES `acc_ob_billdetails` WRITE;
/*!40000 ALTER TABLE `acc_ob_billdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_ob_billdetails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:32:53
