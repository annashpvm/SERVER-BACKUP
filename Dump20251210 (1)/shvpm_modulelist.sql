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
-- Table structure for table `modulelist`
--

DROP TABLE IF EXISTS `modulelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modulelist` (
  `modseqno` int NOT NULL,
  `modname` varchar(45) NOT NULL,
  `modactive` char(1) NOT NULL,
  `modurl` varchar(500) NOT NULL,
  PRIMARY KEY (`modseqno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulelist`
--

LOCK TABLES `modulelist` WRITE;
/*!40000 ALTER TABLE `modulelist` DISABLE KEYS */;
INSERT INTO `modulelist` VALUES (1,'ACCOUNTS SYSTEM','Y','/SHVPM/Accounts/AccountsMainPage.php'),(2,'SALES','Y','/SHVPM/SALES/SalesMainPage.php'),(3,'STORES SYSTEM','Y','/SHVPM/Stores/StoresMainPage.php'),(4,'WEIGH BRIDGE','Y','/SHVPM/RawMaterial/RawmaterialMainPage.php'),(5,'PURCHASE','Y','/SHVPM/Purchase/PurchaseMainPage.php'),(6,'EXPORT SALES','N','/SHVPM/Exportsales/SalesExportMainPage.php'),(7,'FUEL','Y','/SHVPM/Fuel/FuelMainPage.php'),(8,'PRODUCTION','Y','/SHVPM/Production/ProductionMainPage.php'),(9,'PAYROLL','Y','/SHVPM/Payroll/PayrollMainPage.php'),(10,'INDENT','Y','/SHVPM/Indent/IndentMainPage.php'),(11,'IMPORT','Y','/SHVPM/Import/ImportMainpage.php'),(12,'INWARD/OUTWARD','Y','/SHVPM/InwardOutward/InwardOutward.php'),(14,'IMPORTOLD','N','/SHVPM/ImportOld/ImportMainpage.php'),(15,'MIS','Y','/SHVPM/MIS/MisMainPage.php'),(16,'old ACCOUNTING SYSTEM','Y','/SHVPM/Financials/FinancialsMainPage.php'),(17,'QC','Y','/SHVPM/QC/QCMainPage.php');
/*!40000 ALTER TABLE `modulelist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:46:47
