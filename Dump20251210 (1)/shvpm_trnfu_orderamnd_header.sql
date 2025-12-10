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
-- Table structure for table `trnfu_orderamnd_header`
--

DROP TABLE IF EXISTS `trnfu_orderamnd_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnfu_orderamnd_header` (
  `amnh_seqno` int NOT NULL,
  `amnh_amnddate` datetime NOT NULL,
  `amnh_ordhdseqno` int NOT NULL,
  `amnh_compcode` tinyint NOT NULL,
  `amnh_fincode` tinyint NOT NULL,
  `amnh_no` int NOT NULL,
  `amnh_date` datetime NOT NULL,
  `amnh_sup_code` int NOT NULL,
  `amnh_refno` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_refdate` datetime DEFAULT NULL,
  `amnh_terms` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `amnh_carriagetype` int NOT NULL,
  `amnh_paymode` int NOT NULL,
  `amnh_creditdays` int NOT NULL,
  `amnh_remarks` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `amnh_cgstper` decimal(5,2) NOT NULL,
  `amnh_sgstper` decimal(5,2) NOT NULL,
  `amnh_igstper` decimal(5,2) NOT NULL,
  `amnh_cess_pmt` decimal(7,2) DEFAULT NULL,
  `amnh_handling_mt` decimal(14,2) DEFAULT NULL,
  `amnh_handling_cgstper` decimal(5,2) NOT NULL,
  `amnh_handling_sgstper` decimal(5,2) NOT NULL,
  `amnh_tcs` decimal(5,2) DEFAULT NULL,
  `amnh_roundinff` decimal(5,2) NOT NULL,
  `amnh_totalvalue` decimal(14,2) NOT NULL,
  `amnh_status` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_as_ci NOT NULL,
  `amnh_usr_code` int NOT NULL,
  `amnh_entry_date` datetime NOT NULL,
  `amnh_wef_date` datetime NOT NULL,
  `amnh_total_mois` decimal(5,2) DEFAULT NULL,
  `amnh_mois_tol` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_inh_mois` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_vol_meter` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_fixed_carbon` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_sulpher` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_gcv_adb` int DEFAULT NULL,
  `amnh_gcv_adbtol` int DEFAULT NULL,
  `amnh_gcv_arb` int DEFAULT NULL,
  `amnh_gcv_arbtol` int DEFAULT NULL,
  `amnh_ash` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_vessal` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amnh_size` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`amnh_seqno`,`amnh_ordhdseqno`),
  KEY `fk_trnfu_order_header_mas_finyear_idx` (`amnh_fincode`),
  KEY `fk_trnfu_order_header_mas_terms_idx` (`amnh_paymode`),
  KEY `fk_trnfu_order_header_mas_transport_idx` (`amnh_carriagetype`),
  KEY `FK_trnfu_order_header_mas_users_idx` (`amnh_usr_code`),
  KEY `fk_trnfu_order_header_maspur_supplier_master_idx` (`amnh_sup_code`),
  KEY `uk_trnfu_order_header_compcodefincodenofrom` (`amnh_compcode`,`amnh_fincode`,`amnh_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnfu_orderamnd_header`
--

LOCK TABLES `trnfu_orderamnd_header` WRITE;
/*!40000 ALTER TABLE `trnfu_orderamnd_header` DISABLE KEYS */;
INSERT INTO `trnfu_orderamnd_header` VALUES (1,'2022-07-02 00:00:00',1,1,22,1,'2022-07-02 00:00:00',7,'test refe','2022-07-02 00:00:00','TERMS ',2,3,30,'REMAKRS ',2.50,2.50,0.00,400.00,400.00,9.00,9.00,0.00,0.00,5843500.00,'N',6,'2022-07-02 00:00:00','2022-07-02 00:00:00',30.00,'','14 to 15%','39-41%','by Calculation','< 0.6%',5600,100,4500,100,'4-5% Max','','(0.50mm) 90% Min'),(2,'2022-07-02 00:00:00',1,1,22,1,'2022-07-02 00:00:00',7,'test refe','2022-07-02 00:00:00','TERMS ',2,3,30,'REMAKRS ',2.50,2.50,0.00,400.00,400.00,9.00,9.00,0.00,0.00,5843500.00,'N',6,'2022-07-02 00:00:00','2022-07-02 00:00:00',30.00,'','14 to 15%','39-41%','by Calculation','< 0.6%',5600,100,4500,100,'4-5% Max','','(0.50mm) 90% Min'),(3,'2022-07-11 00:00:00',2,90,22,1,'2022-07-08 00:00:00',181,'DATE','2022-07-08 00:00:00','ON OR BEOFRE : WEE',1,2,30,'TEST',2.50,2.50,0.00,400.00,400.00,9.00,9.00,0.00,0.00,35061000.00,'N',6,'2022-07-08 00:00:00','2022-07-08 00:00:00',30.00,'','14 to 15%','39-41%','by Calculation','< 0.6%',5600,100,4500,100,'4-5% Max','','(0.50mm) 90% Min'),(4,'2022-07-11 00:00:00',2,90,22,1,'2022-07-08 00:00:00',181,'DATE','2022-07-08 00:00:00','ON OR BEOFRE : WEE',1,2,30,'TEST',2.50,2.50,0.00,400.00,400.00,9.00,9.00,0.00,0.00,35061000.00,'N',6,'2022-07-08 00:00:00','2022-07-08 00:00:00',30.00,'','14 to 15%','39-41%','by Calculation','< 0.6%',5600,100,4500,100,'4-5% Max','','(0.50mm) 90% Min');
/*!40000 ALTER TABLE `trnfu_orderamnd_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:22
