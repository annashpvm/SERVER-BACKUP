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
-- Table structure for table `emp_nominee_mas`
--

DROP TABLE IF EXISTS `emp_nominee_mas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_nominee_mas` (
  `e_company` varchar(1) NOT NULL,
  `e_empcode` int NOT NULL,
  `e_nominee` char(40) NOT NULL,
  `e_relation` char(30) NOT NULL,
  `e_ndob` datetime DEFAULT NULL,
  `e_share` int NOT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_nominee_mas`
--

LOCK TABLES `emp_nominee_mas` WRITE;
/*!40000 ALTER TABLE `emp_nominee_mas` DISABLE KEYS */;
INSERT INTO `emp_nominee_mas` VALUES ('5',12,'dfdsfd','dfdfd','2002-01-12 00:00:00',55,0.00000),('5',12,'fgfgf','fgfggf','2002-02-12 00:00:00',45,0.00000),('5',1,'adfasdfds','wife','2002-05-12 00:00:00',100,0.00000),('1',5024,'h','wife','1880-02-02 00:00:00',80,0.00000),('1',5024,'i','son','1925-05-12 00:00:00',20,0.00000),('1',25,'XXX','WIFE','1995-10-15 00:00:00',100,0.00000),('1',10010125,'dfd','dfds','2000-10-15 00:00:00',100,0.00000),('1',156,'dfds','sdfds','2012-02-15 00:00:00',50,0.00000),('1',156,'dfdsf','sdfds','2012-02-16 00:00:00',50,0.00000);
/*!40000 ALTER TABLE `emp_nominee_mas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:30:53
