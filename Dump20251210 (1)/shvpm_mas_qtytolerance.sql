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
-- Table structure for table `mas_qtytolerance`
--

DROP TABLE IF EXISTS `mas_qtytolerance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_qtytolerance` (
  `poqt_code` int NOT NULL,
  `poqt_type` varchar(1) NOT NULL,
  `poqt_wedate` datetime NOT NULL,
  `poqt_tolper` decimal(14,2) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`poqt_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_qtytolerance`
--

LOCK TABLES `mas_qtytolerance` WRITE;
/*!40000 ALTER TABLE `mas_qtytolerance` DISABLE KEYS */;
INSERT INTO `mas_qtytolerance` VALUES (1,'L','2002-02-28 00:00:00',10.00,0),(2,'I','2002-02-28 00:00:00',10.00,0),(3,'I','2002-03-03 00:00:00',20.00,0),(4,'L','2002-03-06 00:00:00',10.50,0),(5,'I','2002-03-06 00:00:00',17.00,0),(6,'I','2002-05-08 00:00:00',10.00,0),(7,'I','2002-06-06 00:00:00',10.00,0),(8,'I','2002-06-06 00:00:00',20.00,0),(9,'I','2002-06-20 00:00:00',30.00,0),(10,'I','2002-09-10 00:00:00',35.00,0),(11,'I','2003-08-14 00:00:00',40.00,0),(12,'I','2003-08-26 00:00:00',40.00,0),(13,'I','2003-11-12 00:00:00',50.00,0),(14,'I','2004-05-05 00:00:00',50.00,0),(15,'I','2008-08-29 00:00:00',25.00,0),(16,'I','2008-10-17 00:00:00',25.00,0),(17,'I','2008-10-17 00:00:00',41.00,0),(18,'I','2009-02-26 00:00:00',50.00,0),(19,'I','2012-07-20 00:00:00',50.00,0);
/*!40000 ALTER TABLE `mas_qtytolerance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:45
