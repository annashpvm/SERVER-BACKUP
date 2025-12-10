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
-- Table structure for table `TOBELDELETEDmodulelist`
--

DROP TABLE IF EXISTS `TOBELDELETEDmodulelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOBELDELETEDmodulelist` (
  `modseqno` int NOT NULL,
  `modcompcode` tinyint NOT NULL,
  `modname` varchar(45) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `modactive` char(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `moduserid` int NOT NULL,
  `modurl` varchar(500) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `modflag` char(1) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `cancelflag` tinyint DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOBELDELETEDmodulelist`
--

LOCK TABLES `TOBELDELETEDmodulelist` WRITE;
/*!40000 ALTER TABLE `TOBELDELETEDmodulelist` DISABLE KEYS */;
INSERT INTO `TOBELDELETEDmodulelist` VALUES (1,1,'ACCOUNTS SYSTEM','Y',1,'/SHVPM/Accounts/AccountsMainPage.php','A',0),(2,1,'SALES','Y',1,'/SHVPM/SALES/SalesMainPage.php','S',0),(3,1,'STORES SYSTEM','Y',1,'/SHVPM/Stores/StoresMainPage.php','G',0),(4,1,'RAWMATERIAL','Y',1,'/SHVPM/RawMaterial/RawmaterialMainPage.php','R',0),(5,1,'PURCHASE','Y',1,'/SHVPM/Purchase/PurchaseMainPage.php','P',0),(6,1,'EXPORT SALES','N',1,'/SHVPM/Exportsales/SalesExportMainPage.php','E',0),(7,1,'FUEL','Y',1,'/SHVPM/Fuel/FuelMainPage.php','F',0),(8,1,'PRODUCTION','Y',1,'/SHVPM/Production/ProductionMainPage.php','D',0),(9,1,'PAYROLL','Y',1,'/SHVPM/Payroll/PayrollMainPage.php','I',0),(10,1,'INDENT','Y',1,'/SHVPM/Indent/IndentMainPage.php','T',0),(11,1,'IMPORT','Y',1,'/SHVPM/Import/ImportMainpage.php','M',0),(12,1,'INWARD/OUTWARD','Y',1,'/SHVPM/InwardOutward/InwardOutward.php','M',0),(14,1,'IMPORTOLD','N',1,'/SHVPM/ImportOld/ImportMainpage.php','I',0),(15,1,'MIS','Y',2,'/SHVPM/MIS/MisMainPage.php','F',0),(16,1,'old ACCOUNTING SYSTEM','Y',1,'/SHVPM/Financials/FinancialsMainPage.php','A',0),(17,1,'QC','Y',1,'/SHVPM/QC/QCMainPage.php','A',0);
/*!40000 ALTER TABLE `TOBELDELETEDmodulelist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:40
