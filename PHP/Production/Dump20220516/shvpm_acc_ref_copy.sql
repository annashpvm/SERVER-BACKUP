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
-- Table structure for table `acc_ref_copy`
--

DROP TABLE IF EXISTS `acc_ref_copy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acc_ref_copy` (
  `accref_seqno` int NOT NULL,
  `accref_vouno` varchar(12) NOT NULL,
  `accref_comp_code` tinyint NOT NULL,
  `accref_finid` tinyint NOT NULL,
  `accref_voudate` datetime NOT NULL,
  `accref_vou_type` varchar(2) NOT NULL,
  `accref_bank_name` varchar(35) NOT NULL,
  `accref_paymode` varchar(3) NOT NULL,
  `accref_payref_no` varchar(30) NOT NULL,
  `accref_payref_date` datetime NOT NULL,
  `accref_narration` varchar(1500) NOT NULL,
  `accref_chq_status` bit(1) NOT NULL,
  `accref_reverse_status` bit(1) NOT NULL,
  PRIMARY KEY (`accref_seqno`),
  UNIQUE KEY `unique_acc_ref_vouno_compcode_finid` (`accref_vouno`,`accref_comp_code`,`accref_finid`),
  KEY `index3` (`accref_seqno`),
  KEY `index4` (`accref_comp_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_ref_copy`
--

LOCK TABLES `acc_ref_copy` WRITE;
/*!40000 ALTER TABLE `acc_ref_copy` DISABLE KEYS */;
/*!40000 ALTER TABLE `acc_ref_copy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:33:16
