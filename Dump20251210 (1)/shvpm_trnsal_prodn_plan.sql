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
-- Table structure for table `trnsal_prodn_plan`
--

DROP TABLE IF EXISTS `trnsal_prodn_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_prodn_plan` (
  `t_compcode` tinyint NOT NULL,
  `t_fincode` tinyint NOT NULL,
  `t_month` int DEFAULT NULL,
  `t_year` int DEFAULT NULL,
  `t_type` varchar(1) DEFAULT NULL,
  `t_cat` smallint DEFAULT NULL,
  `t_slno` int DEFAULT NULL,
  `t_party` int DEFAULT NULL,
  `t_ordno` varchar(30) DEFAULT NULL,
  `t_pino` varchar(10) DEFAULT NULL,
  `t_pirefno` varchar(30) DEFAULT NULL,
  `t_gsm` decimal(5,1) DEFAULT NULL,
  `t_varty` varchar(10) DEFAULT NULL,
  `t_size` varchar(30) DEFAULT NULL,
  `t_ordqty` decimal(6,1) DEFAULT NULL,
  `t_penqty` decimal(6,1) DEFAULT NULL,
  `t_yellow` decimal(6,1) DEFAULT NULL,
  `t_pink` decimal(6,1) DEFAULT NULL,
  `t_blue` decimal(6,1) DEFAULT NULL,
  `t_green` decimal(6,1) DEFAULT NULL,
  `t_buff` decimal(6,1) DEFAULT NULL,
  `t_white` decimal(6,1) DEFAULT NULL,
  `t_sizecode` int DEFAULT NULL,
  `t_yellowcode` int DEFAULT NULL,
  `t_pinkcode` int DEFAULT NULL,
  `t_bluecode` int DEFAULT NULL,
  `t_greencode` int DEFAULT NULL,
  `t_buffcode` int DEFAULT NULL,
  `t_whitecode` int DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_prodn_plan`
--

LOCK TABLES `trnsal_prodn_plan` WRITE;
/*!40000 ALTER TABLE `trnsal_prodn_plan` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_prodn_plan` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:19
