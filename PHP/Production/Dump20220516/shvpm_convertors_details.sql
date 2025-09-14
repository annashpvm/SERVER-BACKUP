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
-- Table structure for table `convertors_details`
--

DROP TABLE IF EXISTS `convertors_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `convertors_details` (
  `cust_code` int NOT NULL,
  `cust_name` varchar(60) DEFAULT NULL,
  `cust_add1` varchar(50) DEFAULT NULL,
  `cust_add2` varchar(50) DEFAULT NULL,
  `cust_add3` varchar(50) DEFAULT NULL,
  `cust_city` varchar(50) DEFAULT NULL,
  `cust_pin` varchar(7) DEFAULT NULL,
  `cust_type` smallint DEFAULT NULL,
  `cust_gstin` varchar(15) DEFAULT NULL,
  `cust_state` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `convertors_details`
--

LOCK TABLES `convertors_details` WRITE;
/*!40000 ALTER TABLE `convertors_details` DISABLE KEYS */;
INSERT INTO `convertors_details` VALUES (1,'VELLAI CHAMY','','','','','',1,'',24),(19,'VIMAL KUMAR','','','','','',2,'',24),(20,'TEST19','T19','T19','T19','T19','T19',1,'',24),(4,'NAGA CONVERTING','NO:39,KRISHNARAYAPURAM','AVARAMPALAYAM','COIMBATORE','COIMBATORE','641006',1,'',24),(5,'P.SAKTHIVEL','kadavur','','','Trichy','',1,'',24),(21,'TEST20','T20','T20','T20','T20','T20PINT',1,'3',24),(22,'A4 PAPER','','','','','',1,'',24),(8,'ALAGUMALAI','','','','DINDIGUL','',1,'',24),(9,'SURESH','','','','','',1,'',24),(10,'THANGA PANDI','','','','','',1,'',24),(14,'KANNAN','','','','','',2,'',24),(15,'TAMILARASAN','DINDUGUL','','','','',1,'',24),(16,'SIVAKASI','','','','','',1,'',24),(17,'S.P.K.C.NADAR & CO - SIVAKASI','','','','','',1,'111',24),(18,'VICTORY CONVERTORS - THIRUCHENGODU','V','','','THIRUCHENGODU','2',1,'333',24);
/*!40000 ALTER TABLE `convertors_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:31:18
