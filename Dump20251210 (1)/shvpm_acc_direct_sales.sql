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
-- Table structure for table `acc_direct_sales`
--

DROP TABLE IF EXISTS `acc_direct_sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acc_direct_sales` (
  `sal_seqno` int NOT NULL,
  `sal_compcode` tinyint NOT NULL,
  `sal_finid` tinyint NOT NULL,
  `sal_vouno` varchar(10) CHARACTER SET latin1 COLLATE latin1_swedish_ci DEFAULT '',
  `sal_date` datetime NOT NULL,
  `sal_partycode` int NOT NULL,
  `sal_billno` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '0',
  `sal_billdate` datetime DEFAULT NULL,
  `sal_slno` int NOT NULL DEFAULT '0',
  `sal_description` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `sal_hsn` varchar(12) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT '',
  `sal_rate` decimal(10,2) DEFAULT '0.00',
  `sal_qty` decimal(10,3) DEFAULT '0.000',
  `sal_unit` int DEFAULT '0',
  `sal_value` decimal(11,2) DEFAULT '0.00',
  `sal_taxvalue` decimal(11,2) DEFAULT '0.00',
  `sal_taxledger` int DEFAULT '0',
  `sal_cgst_per` decimal(5,2) DEFAULT '0.00',
  `sal_cgst_amt` decimal(10,2) DEFAULT '0.00',
  `sal_cgst_ledger` int DEFAULT '0',
  `sal_sgst_per` decimal(5,2) DEFAULT '0.00',
  `sal_sgst_amt` decimal(10,2) DEFAULT '0.00',
  `sal_sgt_ledger` int DEFAULT '0',
  `sal_igst_per` decimal(5,2) DEFAULT '0.00',
  `sal_igst_amt` decimal(10,2) DEFAULT '0.00',
  `sal_igst_ledger` int DEFAULT '0',
  `sal_rounding` decimal(5,2) DEFAULT '0.00',
  `sal_round` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'N',
  `sal_totalamount` decimal(12,2) DEFAULT '0.00',
  `sal_accseqno` int DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acc_direct_sales`
--

LOCK TABLES `acc_direct_sales` WRITE;
/*!40000 ALTER TABLE `acc_direct_sales` DISABLE KEYS */;
INSERT INTO `acc_direct_sales` VALUES (1,90,22,'SDE1','2023-03-07 00:00:00',1070,'232','2023-03-07 00:00:00',1,'dsfdsfds','154',1000.00,15.550,1,15550.00,15550.00,1647,6.00,933.00,1668,6.00,933.00,1675,0.00,0.00,0,0.00,'Y',17416.00,16513),(1,90,23,'SDE1','2023-04-10 00:00:00',569,'232','2023-04-10 00:00:00',1,'WASTE PAPER','121454',1500.00,10.000,1,15000.00,15000.00,1650,6.00,900.00,1668,6.00,900.00,0,0.00,0.00,0,0.00,'Y',16800.00,23592),(3,90,23,'SDE3','2023-04-10 00:00:00',2159,'232','2023-04-10 00:00:00',1,'WASTE PAPER','54545',1500.00,10.020,1,15030.00,15030.00,1614,5.00,751.50,1667,5.00,751.50,0,0.00,0.00,0,0.00,'Y',16533.00,23595),(2,90,23,'SDE2','2023-04-10 00:00:00',15,'232','2023-04-10 00:00:00',1,'WASTE PAPER KRAFT','1254',1800.00,15.000,1,27000.00,27000.00,1652,6.00,1620.00,1668,6.00,1620.00,1675,0.00,0.00,0,0.00,'Y',30240.00,23594),(4,90,23,'SDE4','2024-03-15 00:00:00',982,'232','2024-03-15 00:00:00',1,'FLY ASH','2124',1500.00,10.000,1,15000.00,15000.00,1650,9.00,1350.00,1669,9.00,1350.00,1676,0.00,0.00,0,0.00,'Y',17700.00,63716);
/*!40000 ALTER TABLE `acc_direct_sales` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:19
