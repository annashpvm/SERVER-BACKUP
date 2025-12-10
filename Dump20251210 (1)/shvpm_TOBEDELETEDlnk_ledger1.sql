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
-- Table structure for table `TOBEDELETEDlnk_ledger1`
--

DROP TABLE IF EXISTS `TOBEDELETEDlnk_ledger1`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TOBEDELETEDlnk_ledger1` (
  `lnk_name` varchar(30) NOT NULL,
  `lnk_prefix` varchar(3) NOT NULL,
  `lnk_type` varchar(2) NOT NULL,
  `lnk_ledcode` decimal(18,0) NOT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TOBEDELETEDlnk_ledger1`
--

LOCK TABLES `TOBEDELETEDlnk_ledger1` WRITE;
/*!40000 ALTER TABLE `TOBEDELETEDlnk_ledger1` DISABLE KEYS */;
INSERT INTO `TOBEDELETEDlnk_ledger1` VALUES ('CENVAT DUTY -FUEL','CDF','L',6702,0.00000),('Cash Discount ','CDL','L',6202,0.00000),('CENVAT DUTY -WASTEPAPER','CDW','L',6519,0.00000),('Cenvat Excise Duty','CED','L',5925,0.00000),('CENVAT REC?IMPORT WASTE PAPER','CRI','L',6109,0.00000),('Cenvat Rec(Local WP)','CRL','L',6199,0.00000),('Cess Deposit','CSD','L',6469,0.00000),('Cess Paid','CSP','L',6626,0.00000),('DD Commission Charges ','DDC','L',6656,0.00000),('DEPB LICENSE','DEP','L',6442,0.00000),('Edu.Cess Deposit','ECD','L',8476,0.00000),('Edu.Cess Paid','ECP','L',8477,0.00000),('Excise Duty Deposit','EDD','L',6468,0.00000),('Excise Duty Paid','EDP','L',6625,0.00000),('EDUCESS REC?IMPORT WASTE PAPER','ERI','L',6195,0.00000),('EDUCESS Rec(Local WP)','ERL','L',6148,0.00000),('Fuel Freight Receipt ','FFP','L',6433,0.00000),('FLC Charges ','FLC','L',6433,0.00000),('Freight Parties','FRP','G',54,0.00000),('Fuel Suppliers - Local','FSL','G',53,0.00000),('FORWARDING CHARGES','FWC','L',6695,0.00000),('Import Duty Ledger','IDL','L',6437,0.00000),('Import Suppliers - All','IMS','G',52,0.00000),('Insurance','INS','L',6677,0.00000),('Lorry Freight Paid ','LFP','L',6432,0.00000),('Overdue Interest','ODI','L',6351,0.00000),('Profit And Loss','PAL','L',6102,0.00000),('RICEBRAN Purchase','RBP','L',9053,0.00000),('Round Off ','ROF','L',6523,0.00000),('Rawmaterial Suppliers - Local','RSL','G',51,0.00000),('CENVAT RECE-SER TAX','RST','L',8884,0.00000),('SALES ACC FUEL','SAF','L',6494,0.00000),('SALES ACC WASTEPAPER','SAW','L',6549,0.00000),('SECONDARY EDUCESS DEPOSIT','SCD','L',10248,0.00000),('SECONDARY EDUCESS PAID','SCP','L',10249,0.00000),('SED Duty','SED','L',6491,0.00000),('Sales Lorry Freight Receipt ','SFP','L',6516,0.00000),('Special Discount ','SPL','L',6494,0.00000),('SECOND SALES TAX FUEL','STF','L',7323,0.00000),('SECOND SALES TAX WASTEPAPER','STW','L',6202,0.00000),('Surcharge (Fuel)','SUF','L',6877,0.00000),('Surcharge UN','SUN','L',5608,0.00000),('Surcharge','SUR','L',6186,0.00000),('Self Use Own Consumption','SUS','L',6705,0.00000),('Surcharge(Wastepaper)','SUW','L',6876,0.00000),('Waste Paper Freight Receipt ','WFP','L',6430,0.00000),('WASTE PAPER - IMPORT','WPI','L',6551,0.00000);
/*!40000 ALTER TABLE `TOBEDELETEDlnk_ledger1` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:06
