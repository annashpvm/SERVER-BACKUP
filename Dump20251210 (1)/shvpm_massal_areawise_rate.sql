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
-- Table structure for table `massal_areawise_rate`
--

DROP TABLE IF EXISTS `massal_areawise_rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `massal_areawise_rate` (
  `arearate_comp_code` tinyint NOT NULL,
  `arearate_fincode` tinyint NOT NULL,
  `arearate_sno` int NOT NULL,
  `arearate_appr_date` datetime DEFAULT NULL,
  `arearate_wef` datetime DEFAULT NULL,
  `arearate_area` int DEFAULT '0',
  `arearate_price_terms` int DEFAULT '30',
  `arearate_vartype` int NOT NULL DEFAULT '0',
  `arearate_shade` varchar(10) NOT NULL DEFAULT 'NAT',
  `arearate_gst_per` decimal(5,2) DEFAULT '0.00',
  `arearate_gsmfrom` int DEFAULT '0',
  `arearate_gsmto` int DEFAULT '0',
  `arearate_gsm_fr_rate` decimal(8,2) DEFAULT '0.00',
  `arearate_gsm_br_rate` decimal(8,2) DEFAULT '0.00',
  `arearate_bf14` decimal(9,2) NOT NULL DEFAULT '0.00',
  `arearate_bf16` decimal(9,2) NOT NULL DEFAULT '0.00',
  `arearate_bf18` decimal(9,2) NOT NULL DEFAULT '0.00',
  `arearate_bf20` decimal(9,2) NOT NULL DEFAULT '0.00',
  `arearate_bf22` decimal(9,2) DEFAULT '0.00',
  `arearate_bf24` decimal(9,2) DEFAULT '0.00',
  `arearate_bf26` decimal(9,2) DEFAULT '0.00',
  `arearate_bf28` decimal(9,2) DEFAULT '0.00',
  `arearate_bf30` decimal(9,2) DEFAULT '0.00',
  `arearate_bf32` decimal(8,2) DEFAULT NULL,
  `arearate_bf14_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf16_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf18_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf20_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf22_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf24_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf26_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf28_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf30_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_bf32_bit` decimal(8,2) DEFAULT '0.00',
  `arearate_gsmfrom2` int DEFAULT '0',
  `arearate_gsmto2` int DEFAULT '0',
  `arearate_extraamt2` decimal(8,2) DEFAULT '0.00',
  `arearate_gsmfrom3` int DEFAULT '0',
  `arearate_gsmto3` int DEFAULT '0',
  `arearate_extraamt3` decimal(8,2) DEFAULT '0.00',
  `arearate_gsmfrom4` int DEFAULT '0',
  `arearate_gsmto4` int DEFAULT '0',
  `arearate_extraamt4` decimal(8,2) DEFAULT '0.00',
  `arearate_othershades` decimal(8,2) DEFAULT '0.00',
  `arearate_sheet_extraamt` decimal(7,2) DEFAULT '0.00',
  `area_bf18gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf18gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf20gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf22gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf24gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf26gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf28gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf30gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf32gsm50` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm120` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm100` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm90` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm80` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm70` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm60` decimal(8,2) DEFAULT '0.00',
  `area_bf34gsm50` decimal(8,2) DEFAULT NULL,
  `arearate_approved` char(1) DEFAULT 'N',
  `arearate_close` char(1) DEFAULT '0',
  `arearate_entered` int DEFAULT '0',
  `arearate_verified` int DEFAULT '0',
  PRIMARY KEY (`arearate_comp_code`,`arearate_fincode`,`arearate_sno`,`arearate_vartype`,`arearate_shade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `massal_areawise_rate`
--

LOCK TABLES `massal_areawise_rate` WRITE;
/*!40000 ALTER TABLE `massal_areawise_rate` DISABLE KEYS */;
INSERT INTO `massal_areawise_rate` VALUES (90,24,1,'2024-08-10 00:00:00','2024-08-10 00:00:00',1,30,1,'NAT',12.00,110,180,0.00,0.00,31000.00,31500.00,32500.00,34000.00,35500.00,37500.00,39500.00,41500.00,44000.00,0.00,30500.00,31000.00,32000.00,33500.00,35000.00,37000.00,39000.00,41000.00,43500.00,0.00,181,200,500.00,201,250,1000.00,100,100,1000.00,1000.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'N','N',1,0),(90,24,1,'2024-08-10 00:00:00','2024-08-10 00:00:00',1,30,4,'NAT',12.00,110,180,35000.00,34000.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,181,200,500.00,201,250,1000.00,100,100,1000.00,1000.00,500.00,32000.00,33000.00,34000.00,35000.00,36000.00,37000.00,38000.00,32001.00,33001.00,34001.00,35001.00,36001.00,37001.00,38001.00,32003.00,33003.00,33003.00,35003.00,36003.00,37003.00,38003.00,32004.00,33004.00,34004.00,35004.00,36004.00,37004.00,38004.00,35200.00,32005.00,32006.00,32007.00,32008.00,32008.00,32004.00,28001.00,28002.00,28003.00,28004.00,28004.00,28005.00,28006.00,29001.00,29002.00,29003.00,29004.00,29005.00,29006.00,29007.00,30001.00,30002.00,33003.00,33004.00,33005.00,33006.00,30001.00,30005.00,30006.00,33007.00,33006.00,33007.00,38005.00,34000.00,'N','N',1,0),(90,24,1,'2024-08-10 00:00:00','2024-08-10 00:00:00',1,30,14,'NAT',12.00,0,0,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,0.00,0,0,0.00,0,0,0.00,0.00,0.00,32000.00,33000.00,34000.00,35000.00,36000.00,37000.00,38000.00,32001.00,33001.00,34001.00,35001.00,36001.00,37001.00,38001.00,32003.00,33003.00,33003.00,35003.00,36003.00,37003.00,38003.00,32004.00,33004.00,34004.00,35004.00,36004.00,37004.00,38004.00,35200.00,32005.00,32006.00,32007.00,32008.00,32008.00,32004.00,28001.00,28002.00,28003.00,28004.00,28004.00,28005.00,28006.00,29001.00,29002.00,29003.00,29004.00,29005.00,29006.00,29007.00,30001.00,30002.00,33003.00,33004.00,33005.00,33006.00,30001.00,30005.00,30006.00,33007.00,33006.00,33007.00,38005.00,34000.00,'N','N',1,0),(90,24,2,'2024-08-10 00:00:00','2024-08-10 00:00:00',4,30,1,'NAT',12.00,110,180,0.00,0.00,30500.00,31000.00,32000.00,33500.00,35000.00,37000.00,39000.00,41000.00,43500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,181,200,500.00,201,250,1000.00,100,100,1000.00,1000.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'Y','N',17,0),(90,24,3,'2024-09-03 00:00:00','2024-09-03 00:00:00',1,7,7,'NAT',12.00,110,180,41100.00,39500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,181,200,500.00,201,250,1000.00,100,100,1000.00,1000.00,500.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'N','N',1,0);
/*!40000 ALTER TABLE `massal_areawise_rate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:12
