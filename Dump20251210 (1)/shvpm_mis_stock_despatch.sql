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
-- Table structure for table `mis_stock_despatch`
--

DROP TABLE IF EXISTS `mis_stock_despatch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mis_stock_despatch` (
  `r_date` datetime DEFAULT NULL,
  `r_dpm1_mcprod_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm2_mcprod_pmonth` decimal(6,1) DEFAULT NULL,
  `r_slpb_mcprod_pmonth` decimal(6,1) DEFAULT NULL,
  `r_vjpm_mcprod_pmonth` decimal(6,2) DEFAULT NULL,
  `r_dpm1_mcprod_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm2_mcprod_uptodate` decimal(6,1) DEFAULT NULL,
  `r_slpb_mcprod_uptodate` decimal(6,2) DEFAULT NULL,
  `r_vjpm_mcprod_uptodate` decimal(6,2) DEFAULT NULL,
  `r_dpm1_rg1_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm2_rg1_pmonth` decimal(6,1) DEFAULT NULL,
  `r_slpb_rg1_pmonth` decimal(6,1) DEFAULT NULL,
  `r_vjpm_rg1_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm1_rg1_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm2_rg1_uptodate` decimal(6,2) DEFAULT NULL,
  `r_slpb_rg1_uptodate` decimal(6,1) DEFAULT NULL,
  `r_vjpm_rg1_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm1_desp_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm2_desp_pmonth` decimal(6,1) DEFAULT NULL,
  `r_slpb_desp_pmonth` decimal(6,1) DEFAULT NULL,
  `r_vjpm_desp_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm1_desp_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm2_desp_uptodate` decimal(6,1) DEFAULT NULL,
  `r_slpb_desp_uptodate` decimal(6,1) DEFAULT NULL,
  `r_vjpm_desp_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm1_stock` decimal(6,1) DEFAULT NULL,
  `r_dpm2_stock` decimal(6,1) DEFAULT NULL,
  `r_slpb_stock` decimal(6,1) DEFAULT NULL,
  `r_vjpm_stock` decimal(6,1) DEFAULT NULL,
  `r_dpm1_ufs_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm2_ufs_pmonth` decimal(6,1) DEFAULT NULL,
  `r_slpb_ufs_pmonth` decimal(6,1) DEFAULT NULL,
  `r_vjpm_ufs_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm1_ufs_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm2_ufs_uptodate` decimal(6,1) DEFAULT NULL,
  `r_slpb_ufs_uptodate` decimal(6,1) DEFAULT NULL,
  `r_vjpm_ufs_uptodate` decimal(6,1) DEFAULT NULL,
  `r_rem_mcprod_pmonth` varchar(100) DEFAULT NULL,
  `r_rem_mcprod_uptodate` varchar(100) DEFAULT NULL,
  `r_rem_rg1_pmonth` varchar(100) DEFAULT NULL,
  `r_rem_rg1_uptodate` varchar(100) DEFAULT NULL,
  `r_rem_desp_pmonth` varchar(100) DEFAULT NULL,
  `r_rem_desp_uptodate` varchar(100) DEFAULT NULL,
  `r_rem_stock` varchar(100) DEFAULT NULL,
  `r_rem_ufs_pmonth` varchar(100) DEFAULT NULL,
  `r_rem_ufs_uptodate` varchar(100) DEFAULT NULL,
  `r_dpm_rg1_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm_rg1_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm_desp_pmonth` decimal(6,1) DEFAULT NULL,
  `r_dpm_desp_uptodate` decimal(6,1) DEFAULT NULL,
  `r_dpm_Stock` decimal(6,1) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mis_stock_despatch`
--

LOCK TABLES `mis_stock_despatch` WRITE;
/*!40000 ALTER TABLE `mis_stock_despatch` DISABLE KEYS */;
/*!40000 ALTER TABLE `mis_stock_despatch` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:49:11
