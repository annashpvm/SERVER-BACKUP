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
-- Table structure for table `payroll_lock`
--

DROP TABLE IF EXISTS `payroll_lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_lock` (
  `pay_company` tinyint NOT NULL,
  `pay_finyear` tinyint NOT NULL,
  `pay_month` int DEFAULT NULL,
  `pay_year` int DEFAULT NULL,
  `pay_attn_lock` varchar(1) NOT NULL,
  `pay_dedu_lock` varchar(1) NOT NULL,
  `pay_salary_lock` varchar(1) NOT NULL,
  `pay_sp_lock` varchar(1) DEFAULT NULL,
  `pay_st_lock` varchar(1) DEFAULT NULL,
  `pay_wp_lock` varchar(1) DEFAULT NULL,
  `pay_wt_lock` varchar(1) DEFAULT NULL,
  `pay_wp2_lock` varchar(1) DEFAULT NULL,
  `pay_wt2_lock` varchar(1) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_lock`
--

LOCK TABLES `payroll_lock` WRITE;
/*!40000 ALTER TABLE `payroll_lock` DISABLE KEYS */;
INSERT INTO `payroll_lock` VALUES (1,19,3,2020,'Y','N','N','N','N','N','N','N','N',0.00000),(1,19,2,2020,'Y','N','Y','N','N','N','N','N','N',0.00000),(1,19,1,2020,'Y','N','Y','N','N','N','N','N','N',0.00000),(1,21,5,2021,'Y','Y','Y','N','N','N','N','N','N',0.00000),(1,20,8,2020,'Y','N','N','N','N','N','N','N','N',0.00000),(1,20,7,2020,'Y','N','N','N','N','N','N','N','N',0.00000),(1,20,6,2020,'Y','N','N','N','N','N','N','N','N',0.00000),(1,21,4,2021,'Y','Y','Y','N','N','N','N','N','N',0.00000),(1,21,6,2021,'Y','Y','Y','Y','Y','Y','Y','N','N',0.00000);
/*!40000 ALTER TABLE `payroll_lock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:13
