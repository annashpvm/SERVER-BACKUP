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
-- Table structure for table `trnfu_issret_header`
--

DROP TABLE IF EXISTS `trnfu_issret_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_issret_header` (
  `isrh_seqno` int NOT NULL,
  `isrh_compcode` tinyint NOT NULL,
  `isrh_fincode` tinyint NOT NULL,
  `isrh_no` int NOT NULL,
  `isrh_date` datetime NOT NULL,
  `isrh_value` decimal(14,2) NOT NULL,
  `isrh_remarks` varchar(100) NOT NULL,
  `isrh_usr_code` int NOT NULL,
  `isrh_entry_date` datetime NOT NULL,
  PRIMARY KEY (`isrh_seqno`),
  KEY `fk_trnfu_issret_header_mas_users_idx` (`isrh_usr_code`),
  KEY `uk_trnfu_issret_headercompcodefinhd_no` (`isrh_compcode`,`isrh_fincode`,`isrh_no`),
  KEY `fk_trnfu_issret_header_mas_finyear_idx` (`isrh_fincode`),
  CONSTRAINT `fk_trnfu_issret_header_mas_company` FOREIGN KEY (`isrh_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnfu_issret_header_mas_finyear` FOREIGN KEY (`isrh_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnfu_issret_header_mas_users` FOREIGN KEY (`isrh_usr_code`) REFERENCES `mas_users` (`usr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_issret_header`
--

LOCK TABLES `trnfu_issret_header` WRITE;
/*!40000 ALTER TABLE `trnfu_issret_header` DISABLE KEYS */;
INSERT INTO `trnfu_issret_header` VALUES (1,1,21,1,'2021-05-31 00:00:00',544072.32,'',16,'2021-06-05 00:00:00'),(2,90,23,1,'2024-02-21 00:00:00',5937.07,'',1,'2024-02-21 00:00:00'),(3,90,23,2,'2024-02-21 00:00:00',5397.33,'',1,'2024-02-21 00:00:00'),(4,90,23,3,'2024-02-21 00:00:00',13493.33,'',1,'2024-02-21 00:00:00'),(5,90,23,4,'2024-03-05 00:00:00',310.96,'',1,'2024-03-05 00:00:00'),(6,90,23,5,'2024-03-05 00:00:00',5264.76,'',17,'2024-03-05 00:00:00'),(7,90,23,6,'2024-03-05 00:00:00',11694.22,'',17,'2024-03-05 00:00:00'),(8,90,23,7,'2024-03-05 00:00:00',17147.26,'',17,'2024-03-05 00:00:00'),(9,90,23,8,'2024-03-05 00:00:00',12329.66,'',17,'2024-03-05 00:00:00');
/*!40000 ALTER TABLE `trnfu_issret_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:57
