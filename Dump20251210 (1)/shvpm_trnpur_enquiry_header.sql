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
-- Table structure for table `trnpur_enquiry_header`
--

DROP TABLE IF EXISTS `trnpur_enquiry_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnpur_enquiry_header` (
  `enq_comp_code` tinyint NOT NULL,
  `enq_fin_code` tinyint NOT NULL,
  `enq_no` int NOT NULL,
  `enq_date` datetime NOT NULL,
  `enq_sup_code` int NOT NULL,
  `enq_respond_date` datetime DEFAULT NULL,
  `enq_ref_no` varchar(25) NOT NULL,
  `enq_ref_date` datetime DEFAULT NULL,
  `enq_valid_date` datetime DEFAULT NULL,
  `enq_terms` varchar(30) NOT NULL,
  `enq_price` varchar(20) NOT NULL,
  `enq_quot_status` char(1) NOT NULL,
  `enq_quot_date` datetime DEFAULT NULL,
  `enq_type` char(2) NOT NULL,
  `enq_auth_flag` char(1) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`enq_comp_code`,`enq_fin_code`,`enq_no`),
  KEY `FK_trnpur_enquiry_header_mas_finyear` (`enq_fin_code`),
  KEY `FK_trnpur_enquiry_header_maspur_supplier_master` (`enq_sup_code`),
  CONSTRAINT `FK_trnpur_enquiry_header_mas_company` FOREIGN KEY (`enq_comp_code`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `FK_trnpur_enquiry_header_mas_finyear` FOREIGN KEY (`enq_fin_code`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `FK_trnpur_enquiry_header_maspur_supplier_master` FOREIGN KEY (`enq_sup_code`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnpur_enquiry_header`
--

LOCK TABLES `trnpur_enquiry_header` WRITE;
/*!40000 ALTER TABLE `trnpur_enquiry_header` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnpur_enquiry_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:47
