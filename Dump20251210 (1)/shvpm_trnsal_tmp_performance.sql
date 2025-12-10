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
-- Table structure for table `trnsal_tmp_performance`
--

DROP TABLE IF EXISTS `trnsal_tmp_performance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnsal_tmp_performance` (
  `comp_code` tinyint NOT NULL,
  `fin_code` tinyint NOT NULL,
  `cust_code` int NOT NULL,
  `col_jan` decimal(18,3) DEFAULT NULL,
  `col_feb` decimal(18,3) DEFAULT NULL,
  `col_mar` decimal(18,3) DEFAULT NULL,
  `col_apr` decimal(18,3) DEFAULT NULL,
  `col_may` decimal(18,3) DEFAULT NULL,
  `col_jun` decimal(18,3) DEFAULT NULL,
  `col_jul` decimal(18,3) DEFAULT NULL,
  `col_aug` decimal(18,3) DEFAULT NULL,
  `col_sep` decimal(18,3) DEFAULT NULL,
  `col_oct` decimal(18,3) DEFAULT NULL,
  `col_nov` decimal(18,3) DEFAULT NULL,
  `col_dec` decimal(18,3) DEFAULT NULL,
  `ord_jan` decimal(18,3) DEFAULT NULL,
  `ord_feb` decimal(18,3) DEFAULT NULL,
  `ord_mar` decimal(18,3) DEFAULT NULL,
  `ord_apr` decimal(18,3) DEFAULT NULL,
  `ord_may` decimal(18,3) DEFAULT NULL,
  `ord_jun` decimal(18,3) DEFAULT NULL,
  `ord_jul` decimal(18,3) DEFAULT NULL,
  `ord_aug` decimal(18,3) DEFAULT NULL,
  `ord_sep` decimal(18,3) DEFAULT NULL,
  `ord_oct` decimal(18,3) DEFAULT NULL,
  `ord_nov` decimal(18,3) DEFAULT NULL,
  `ord_dec` decimal(18,3) DEFAULT NULL,
  `oc_jan` decimal(18,3) DEFAULT NULL,
  `oc_feb` decimal(18,3) DEFAULT NULL,
  `oc_mar` decimal(18,3) DEFAULT NULL,
  `oc_apr` decimal(18,3) DEFAULT NULL,
  `oc_may` decimal(18,3) DEFAULT NULL,
  `oc_jun` decimal(18,3) DEFAULT NULL,
  `oc_jul` decimal(18,3) DEFAULT NULL,
  `oc_aug` decimal(18,3) DEFAULT NULL,
  `oc_sep` decimal(18,3) DEFAULT NULL,
  `oc_oct` decimal(18,3) DEFAULT NULL,
  `oc_nov` decimal(18,3) DEFAULT NULL,
  `oc_dec` decimal(18,3) DEFAULT NULL,
  `inv_jan_amt` decimal(18,3) DEFAULT NULL,
  `inv_feb_amt` decimal(18,3) DEFAULT NULL,
  `inv_mar_amt` decimal(18,3) DEFAULT NULL,
  `inv_apr_amt` decimal(18,3) DEFAULT NULL,
  `inv_may_amt` decimal(18,3) DEFAULT NULL,
  `inv_jun_amt` decimal(18,3) DEFAULT NULL,
  `inv_jul_amt` decimal(18,3) DEFAULT NULL,
  `inv_aug_amt` decimal(18,3) DEFAULT NULL,
  `inv_sep_amt` decimal(18,3) DEFAULT NULL,
  `inv_oct_amt` decimal(18,3) DEFAULT NULL,
  `inv_nov_amt` decimal(18,3) DEFAULT NULL,
  `inv_dec_amt` decimal(18,3) DEFAULT NULL,
  `inv_jan_wt` decimal(18,3) DEFAULT NULL,
  `inv_feb_wt` decimal(18,3) DEFAULT NULL,
  `inv_mar_wt` decimal(18,3) DEFAULT NULL,
  `inv_apr_wt` decimal(18,3) DEFAULT NULL,
  `inv_may_wt` decimal(18,3) DEFAULT NULL,
  `inv_jun_wt` decimal(18,3) DEFAULT NULL,
  `inv_jul_wt` decimal(18,3) DEFAULT NULL,
  `inv_aug_wt` decimal(18,3) DEFAULT NULL,
  `inv_sep_wt` decimal(18,3) DEFAULT NULL,
  `inv_oct_wt` decimal(18,3) DEFAULT NULL,
  `inv_nov_wt` decimal(18,3) DEFAULT NULL,
  `inv_dec_wt` decimal(18,3) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`comp_code`,`cust_code`,`fin_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnsal_tmp_performance`
--

LOCK TABLES `trnsal_tmp_performance` WRITE;
/*!40000 ALTER TABLE `trnsal_tmp_performance` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnsal_tmp_performance` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:49:09
