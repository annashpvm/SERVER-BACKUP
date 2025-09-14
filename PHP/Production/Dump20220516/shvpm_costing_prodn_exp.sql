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
-- Table structure for table `costing_prodn_exp`
--

DROP TABLE IF EXISTS `costing_prodn_exp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `costing_prodn_exp` (
  `c_company` int NOT NULL,
  `c_month` int NOT NULL,
  `c_year` int NOT NULL,
  `c_varty` int NOT NULL,
  `c_gsm` int NOT NULL,
  `c_despmode` varchar(10) NOT NULL,
  `c_mcprodn` decimal(9,4) NOT NULL,
  `c_finprodn` decimal(9,4) NOT NULL,
  `c_avlhrs` decimal(5,2) NOT NULL,
  `c_downtime` decimal(5,2) NOT NULL,
  `c_op_pulp_rate` decimal(9,3) NOT NULL,
  `c_op_pulp_qty` decimal(9,3) NOT NULL,
  `c_op_broke_rate` decimal(9,3) NOT NULL,
  `c_op_broke_qty` decimal(9,3) NOT NULL,
  `c_op_oth1_rate` decimal(9,3) NOT NULL,
  `c_op_oth1_qty` decimal(9,3) DEFAULT NULL,
  `c_op_oth2_rate` decimal(9,3) DEFAULT NULL,
  `c_op_oth2_qty` decimal(9,3) DEFAULT NULL,
  `c_clo_pulp_rate` decimal(9,3) DEFAULT NULL,
  `c_clo_pulp_qty` decimal(9,3) DEFAULT NULL,
  `c_clo_broke_rate` decimal(9,3) DEFAULT NULL,
  `c_clo_broke_qty` decimal(9,3) DEFAULT NULL,
  `c_clo_oth1_rate` decimal(9,3) DEFAULT NULL,
  `c_clo_oth1_qty` decimal(9,3) DEFAULT NULL,
  `c_clo_oth2_rate` decimal(9,3) DEFAULT NULL,
  `c_clo_oth2_qty` decimal(9,3) DEFAULT NULL,
  `c_op_cd_rate` decimal(9,3) DEFAULT NULL,
  `c_op_cd_qty` decimal(9,3) DEFAULT NULL,
  `c_clo_cd_rate` decimal(9,3) DEFAULT NULL,
  `c_clo_cd_qty` decimal(9,3) DEFAULT NULL,
  `c_power_rate` decimal(9,3) DEFAULT NULL,
  `c_power_unit` decimal(9,3) DEFAULT NULL,
  `c_diesel_rate` decimal(9,2) DEFAULT NULL,
  `s_diesel_unit` decimal(9,2) DEFAULT NULL,
  `s_steam_rate` decimal(9,2) DEFAULT NULL,
  `c_steam_qty` decimal(9,3) DEFAULT NULL,
  `c_stores` decimal(9,2) NOT NULL,
  `c_maint` decimal(9,2) DEFAULT NULL,
  `c_fw` decimal(9,2) DEFAULT NULL,
  `c_pm` decimal(9,3) DEFAULT NULL,
  `c_salary_wages` decimal(9,2) DEFAULT NULL,
  `c_admin` decimal(9,3) DEFAULT NULL,
  `c_financial` decimal(9,2) DEFAULT NULL,
  `c_depr` decimal(9,2) DEFAULT NULL,
  `c_duty` decimal(9,2) DEFAULT NULL,
  `c_selling_exp` decimal(9,2) DEFAULT NULL,
  `c_gross_sales` decimal(9,2) DEFAULT NULL,
  `c_rm_value` decimal(12,2) DEFAULT NULL,
  `c_cd_value` decimal(12,2) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `costing_prodn_exp`
--

LOCK TABLES `costing_prodn_exp` WRITE;
/*!40000 ALTER TABLE `costing_prodn_exp` DISABLE KEYS */;
INSERT INTO `costing_prodn_exp` VALUES (1,4,2008,3,4,'LOCAL',1.0000,5.0000,1.00,1.00,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,4.300,742375.000,0.00,0.00,550.00,1505.400,0.00,0.00,0.00,0.000,0.00,0.000,0.00,0.00,0.00,0.00,0.00,352500.00,10920.00,0.00000),(3,4,2008,0,2,'LOCAL',180.6000,168.5200,188.30,8.30,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,4.300,110485.000,0.00,0.00,550.00,421.830,117000.00,0.00,68000.00,84000.000,230000.00,93000.000,93000.00,89000.00,0.00,270000.00,3960000.00,1777726.80,147064.00,0.00000),(3,4,2008,0,5,'LOCAL',180.6000,168.5200,188.30,8.30,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,4.300,110485.000,0.00,0.00,550.00,421.830,117000.00,0.00,68000.00,84000.000,230000.00,93000.000,93000.00,89000.00,0.00,270000.00,3960000.00,1777726.80,147064.00,0.00000),(1,5,2008,2,2,'LOCAL',10.0000,10.0000,2.00,5.00,1.000,2.000,3.000,4.000,5.000,6.000,7.000,8.000,9.000,10.000,11.000,12.000,13.000,14.000,15.000,16.000,1.000,2.000,3.000,4.000,11.000,12.000,13.00,14.00,15.00,16.000,51.00,52.00,535.00,54.000,54.00,56.000,57.00,58.00,59.00,60.00,1000.00,7680.00,11375.00,0.00000),(3,4,2008,1,0,'LOCAL',41.4000,37.5100,55.15,1.00,0.000,0.000,9.000,700.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,4.300,33965.000,0.00,0.00,550.00,116.710,28000.00,0.00,16000.00,21000.000,67000.00,27000.000,27000.00,26000.00,0.00,29000.00,1144000.00,471556.25,61114.00,0.00000),(3,4,2008,6,8,'LOCAL',28.4000,26.0184,30.00,0.00,0.000,0.000,7.000,0.500,0.000,0.000,0.000,0.000,6.500,2.000,6.000,4.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.000,0.00,0.00,0.00,0.000,0.00,0.00,0.00,0.000,0.00,0.000,0.00,0.00,0.00,0.00,0.00,304.16,82159.00,0.00000);
/*!40000 ALTER TABLE `costing_prodn_exp` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-16  9:31:46
