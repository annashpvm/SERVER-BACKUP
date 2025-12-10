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
-- Table structure for table `trn_dayprod_convertors_stock`
--

DROP TABLE IF EXISTS `trn_dayprod_convertors_stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trn_dayprod_convertors_stock` (
  `pr_stk_compcode` tinyint NOT NULL,
  `pr_stk_fincode` tinyint NOT NULL,
  `pr_stk_party` int NOT NULL,
  `pr_stk_item` varchar(25) NOT NULL,
  `pr_stk_variety` int NOT NULL,
  `pr_stk_size` decimal(5,1) NOT NULL,
  `pr_stk_opqty` decimal(9,1) DEFAULT NULL,
  `pr_stk_opqty_wb_wt` decimal(8,1) DEFAULT NULL,
  `pr_stk_despqty` decimal(10,1) DEFAULT NULL,
  `pr_stk_despqty_wb_wt` decimal(10,1) DEFAULT NULL,
  `pr_stk_usedqty` decimal(10,1) DEFAULT NULL,
  `pr_stk_recdqty` decimal(10,1) DEFAULT NULL,
  `pr_stk_recdqty_wb_wt` decimal(10,1) DEFAULT NULL,
  `pr_stk_broke` decimal(10,1) DEFAULT NULL,
  `pr_stk_core` decimal(10,1) DEFAULT NULL,
  `pr_stk_balance` decimal(10,1) DEFAULT NULL,
  `pr_stk_balance_wb_wt` decimal(10,1) DEFAULT NULL,
  `pr_stk_close` char(1) DEFAULT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`pr_stk_compcode`,`pr_stk_fincode`,`pr_stk_party`,`pr_stk_item`,`pr_stk_variety`,`pr_stk_size`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trn_dayprod_convertors_stock`
--

LOCK TABLES `trn_dayprod_convertors_stock` WRITE;
/*!40000 ALTER TABLE `trn_dayprod_convertors_stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `trn_dayprod_convertors_stock` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:26
