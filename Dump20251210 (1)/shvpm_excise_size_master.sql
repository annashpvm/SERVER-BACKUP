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
-- Table structure for table `excise_size_master`
--

DROP TABLE IF EXISTS `excise_size_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `excise_size_master` (
  `s_vargrp` decimal(6,0) NOT NULL,
  `s_size` varchar(28) NOT NULL,
  `s_size_sname` varchar(20) DEFAULT NULL,
  `s_unit` varchar(1) NOT NULL,
  `s_length` decimal(6,2) NOT NULL,
  `s_breadth` decimal(6,2) NOT NULL,
  `s_reams` smallint NOT NULL,
  `s_sheets` smallint NOT NULL,
  `s_nwt` decimal(5,1) NOT NULL,
  `s_gwt` decimal(5,1) NOT NULL,
  `s_rg1code` decimal(6,0) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `excise_size_master`
--

LOCK TABLES `excise_size_master` WRITE;
/*!40000 ALTER TABLE `excise_size_master` DISABLE KEYS */;
INSERT INTO `excise_size_master` VALUES (2,'43.0 X 69.0',' 43 X 69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(2,'51.0 X 76.0',' 51X76','B',51.00,76.00,0,0,0.0,0.0,0,0.00000),(1,'51.0 X 76.0',' 51X76','B',51.00,76.00,0,0,0.0,0.0,0,0.00000),(1,'43.0 X 69.0','43X69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(3,'43 X 69 (PINK)',' 43X69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(3,'43 X 69 (YELLOW)',' 43X69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(3,'43 X 69 (GREEN)',' 43X69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(3,'43 X 69 (BLUE)',' 43X69','B',43.00,69.00,0,0,0.0,0.0,0,0.00000),(2,'66.0 X 81.5',' 66.0 X 81.5','B',66.00,81.50,0,0,0.0,0.0,0,0.00000),(4,'83CM',' 83CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(5,'81CM',' 81CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(6,'90CM',' 90CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(7,'70X100CM',' 70X100CM','B',0.00,0.00,0,0,0.0,0.0,0,0.00000),(8,'57CM',' 57CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(10,'50X70CM',' 50X70CM','B',0.00,0.00,0,0,0.0,0.0,0,0.00000),(11,'89CM',' 89CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(12,'31CM',' 31CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(12,'38CM',' 38CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(12,'27.5CM',' 27.5CM','R',0.00,0.00,0,0,0.0,0.0,0,0.00000),(12,'64.5X84.5CM',' 64.5X84.5CM','B',84.50,64.50,0,0,0.0,0.0,0,0.00000);
/*!40000 ALTER TABLE `excise_size_master` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:25
