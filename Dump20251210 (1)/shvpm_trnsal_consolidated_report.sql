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
-- Table structure for table `trnsal_consolidated_report`
--

DROP TABLE IF EXISTS `trnsal_consolidated_report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_consolidated_report` (
  `rdate` datetime DEFAULT NULL,
  `day_mc_prodn_d1` decimal(8,3) DEFAULT NULL,
  `day_mc_prodn_d2` decimal(8,3) DEFAULT NULL,
  `day_mc_prodn_d3` decimal(8,3) DEFAULT NULL,
  `day_mc_prodn_v` decimal(8,3) DEFAULT NULL,
  `month_mc_prodn_d1` decimal(8,3) DEFAULT NULL,
  `month_mc_prodn_d2` decimal(8,3) DEFAULT NULL,
  `month_mc_prodn_d3` decimal(8,3) DEFAULT NULL,
  `month_mc_prodn_v` decimal(8,3) DEFAULT NULL,
  `year_mc_prodn_d1` decimal(8,3) DEFAULT NULL,
  `year_mc_prodn_d2` decimal(8,3) DEFAULT NULL,
  `year_mc_prodn_d3` decimal(8,3) DEFAULT NULL,
  `year_mc_prodn_v` decimal(8,3) DEFAULT NULL,
  `day_rg1_prodn_d1` decimal(8,3) DEFAULT NULL,
  `day_rg1_prodn_d2` decimal(8,3) DEFAULT NULL,
  `day_rg1_prodn_d3` decimal(8,3) DEFAULT NULL,
  `day_rg1_prodn_v` decimal(8,3) DEFAULT NULL,
  `month_rg1_prodn_d1` decimal(8,3) DEFAULT NULL,
  `month_rg1_prodn_d2` decimal(8,3) DEFAULT NULL,
  `month_rg1_prodn_d3` decimal(8,3) DEFAULT NULL,
  `month_rg1_prodn_v` decimal(8,3) DEFAULT NULL,
  `year_rg1_prodn_d1` decimal(8,3) DEFAULT NULL,
  `year_rg1_prodn_d2` decimal(8,3) DEFAULT NULL,
  `year_rg1_prodn_d3` decimal(8,3) DEFAULT NULL,
  `year_rg1_prodn_v` decimal(8,3) DEFAULT NULL,
  `day_desp_d1` decimal(8,3) DEFAULT NULL,
  `day_desp_d2` decimal(8,3) DEFAULT NULL,
  `day_desp_d3` decimal(8,3) DEFAULT NULL,
  `day_desp_v` decimal(8,3) DEFAULT NULL,
  `month_desp_d1` decimal(8,3) DEFAULT NULL,
  `month_desp_d2` decimal(8,3) DEFAULT NULL,
  `month_desp_d3` decimal(8,3) DEFAULT NULL,
  `month_desp_v` decimal(8,3) DEFAULT NULL,
  `year_desp_d1` decimal(8,3) DEFAULT NULL,
  `year_desp_d2` decimal(8,3) DEFAULT NULL,
  `year_desp_d3` decimal(8,3) DEFAULT NULL,
  `year_desp_v` decimal(8,3) DEFAULT NULL,
  `clostk_rg1_d1` decimal(8,3) DEFAULT NULL,
  `clostk_rg1_d2` decimal(8,3) DEFAULT NULL,
  `clostk_rg1_d3` decimal(8,3) DEFAULT NULL,
  `clostk_rg1_v` decimal(8,3) DEFAULT NULL,
  `clostk_wip_d1` decimal(8,3) DEFAULT NULL,
  `clostk_wip_d2` decimal(8,3) DEFAULT NULL,
  `clostk_wip_d3` decimal(8,3) DEFAULT NULL,
  `clostk_wip_v` decimal(8,3) DEFAULT NULL,
  `clostk_wip_pend_d1` decimal(8,3) DEFAULT NULL,
  `clostk_wip_pend_d2` decimal(8,3) DEFAULT NULL,
  `clostk_wip_pend_d3` decimal(8,3) DEFAULT NULL,
  `clostk_wip_pend_V` decimal(8,3) DEFAULT NULL,
  `clostk_wip_retree_d1` decimal(8,3) DEFAULT NULL,
  `clostk_wip_retree_d2` decimal(8,3) DEFAULT NULL,
  `clostk_wip_retree_d3` decimal(8,3) DEFAULT NULL,
  `clostk_wip_retree_v` decimal(8,3) DEFAULT NULL,
  `day_down_hrs_d1` decimal(5,2) DEFAULT NULL,
  `day_down_hrs_d2` decimal(5,2) DEFAULT NULL,
  `day_down_hrs_d3` decimal(5,2) DEFAULT NULL,
  `day_down_hrs_v` decimal(5,2) DEFAULT NULL,
  `month_down_hrs_d1` decimal(6,2) DEFAULT NULL,
  `month_down_hrs_d2` decimal(6,2) DEFAULT NULL,
  `month_down_hrs_d3` decimal(6,2) DEFAULT NULL,
  `month_down_hrs_v` decimal(6,2) DEFAULT NULL,
  `day_down_rea_d1` varchar(250) DEFAULT NULL,
  `day_down_rea_d2` varchar(250) DEFAULT NULL,
  `day_down_rea_d3` varchar(250) DEFAULT NULL,
  `day_down_rea_v` varchar(250) DEFAULT NULL,
  `day_qc_rej_d1` decimal(6,3) DEFAULT NULL,
  `day_qc_rej_d2` decimal(6,3) DEFAULT NULL,
  `day_qc_rej_d3` decimal(6,3) DEFAULT NULL,
  `day_qc_rej_v` decimal(6,3) DEFAULT NULL,
  `month_qc_rej_d1` decimal(7,3) DEFAULT NULL,
  `month_qc_rej_d2` decimal(7,3) DEFAULT NULL,
  `month_qc_rej_d3` decimal(7,3) DEFAULT NULL,
  `month_qc_rej_v` decimal(7,3) DEFAULT NULL,
  `day_qc_remark_d1` varchar(250) DEFAULT NULL,
  `day_qc_remark_d2` varchar(250) DEFAULT NULL,
  `day_qc_remark_d3` varchar(250) DEFAULT NULL,
  `day_qc_remark_v` varchar(250) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_consolidated_report`
--

LOCK TABLES `trnsal_consolidated_report` WRITE;
/*!40000 ALTER TABLE `trnsal_consolidated_report` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_consolidated_report` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:48
