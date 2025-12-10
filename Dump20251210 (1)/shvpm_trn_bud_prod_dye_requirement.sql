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
-- Table structure for table `trn_bud_prod_dye_requirement`
--

DROP TABLE IF EXISTS `trn_bud_prod_dye_requirement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_bud_prod_dye_requirement` (
  `bud_compcode` tinyint NOT NULL,
  `bud_fincode` tinyint NOT NULL,
  `bud_month` int NOT NULL,
  `bud_year` int NOT NULL,
  `bud_dyecode` int NOT NULL,
  `bud_rate` decimal(6,2) DEFAULT NULL,
  `bud_varname1` varchar(50) DEFAULT NULL,
  `bud_v1_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v1_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v1_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname2` varchar(50) DEFAULT NULL,
  `bud_v2_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v2_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v2_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname3` varchar(50) DEFAULT NULL,
  `bud_v3_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v3_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v3_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname4` varchar(50) DEFAULT NULL,
  `bud_v4_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v4_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v4_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname5` varchar(50) DEFAULT NULL,
  `bud_v5_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v5_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v5_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname6` varchar(50) DEFAULT NULL,
  `bud_v6_ordqty` decimal(6,1) DEFAULT NULL,
  `bud_v6_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v6_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname7` varchar(50) DEFAULT NULL,
  `bud_v7_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v7_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v7_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname8` varchar(50) DEFAULT NULL,
  `bud_v8_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v8_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v8_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname9` varchar(50) DEFAULT NULL,
  `bud_v9_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v9_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v9_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname10` varchar(50) DEFAULT NULL,
  `bud_v10_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v10_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v10_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_tot_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_v11_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v11_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v11_qty_req` decimal(7,3) DEFAULT NULL,
  `stock` decimal(7,3) DEFAULT NULL,
  `bud_v12_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v12_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_v12_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v13_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v13_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v13_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_v14_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v14_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v14_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_v15_ordqty` decimal(5,1) DEFAULT NULL,
  `bud_v15_qty_pmt` decimal(6,3) DEFAULT NULL,
  `bud_v15_qty_req` decimal(7,3) DEFAULT NULL,
  `bud_varname11` varchar(50) DEFAULT NULL,
  `bud_varname12` varchar(50) DEFAULT NULL,
  `bud_varname13` varchar(50) DEFAULT NULL,
  `bud_varname14` varchar(50) DEFAULT NULL,
  `bud_varname15` varchar(50) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`bud_compcode`,`bud_fincode`,`bud_month`,`bud_year`,`bud_dyecode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_bud_prod_dye_requirement`
--

LOCK TABLES `trn_bud_prod_dye_requirement` WRITE;
/*!40000 ALTER TABLE `trn_bud_prod_dye_requirement` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_bud_prod_dye_requirement` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:11
