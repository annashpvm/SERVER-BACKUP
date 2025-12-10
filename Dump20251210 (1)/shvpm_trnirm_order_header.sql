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
-- Table structure for table `trnirm_order_header`
--

DROP TABLE IF EXISTS `trnirm_order_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_order_header` (
  `ordh_seqno` int NOT NULL,
  `ordh_compcode` tinyint NOT NULL,
  `ordh_fincode` tinyint NOT NULL,
  `ordh_no` int NOT NULL,
  `ordh_date` datetime NOT NULL,
  `ordh_refno` varchar(50) NOT NULL,
  `ordh_refdate` datetime NOT NULL,
  `ordh_sup_code` int NOT NULL,
  `ordh_agent_code` int NOT NULL,
  `ordh_payterms` varchar(60) NOT NULL,
  `ordh_deliveryterms` varchar(60) NOT NULL,
  `ordh_shiftment` varchar(50) NOT NULL,
  `ordh_origincountry` int NOT NULL,
  `ordh_originport` int NOT NULL,
  `ordh_arrivalport` int NOT NULL,
  `ordh_lcdays` smallint NOT NULL,
  `ordh_nagodays` smallint NOT NULL,
  `ordh_creditdays` int NOT NULL,
  `ordh_remarks` varchar(60) NOT NULL,
  `ordh_bankacno` varchar(50) DEFAULT NULL,
  `ordh_bankname` varchar(50) DEFAULT NULL,
  `ordh_bankcode` varchar(45) DEFAULT NULL,
  `ordh_branchcode` varchar(45) DEFAULT NULL,
  `ordh_swiftcode` varchar(45) DEFAULT NULL,
  `ordh_bankadd1` varchar(45) DEFAULT NULL,
  `ordh_bankadd2` varchar(45) DEFAULT NULL,
  `ordh_bankadd3` varchar(45) DEFAULT NULL,
  `ordh_wt_per_container` varchar(15) DEFAULT '',
  `ordh_qty_diff` varchar(15) DEFAULT '',
  `ordh_shipping_line` varchar(45) DEFAULT '',
  `ordh_free_days` varchar(25) DEFAULT '',
  `ordh_moisture` varchar(30) DEFAULT '',
  `ordh_material` varchar(45) DEFAULT '',
  `ordh_local_charges` varchar(45) DEFAULT '',
  `ordh_status` varchar(1) DEFAULT '',
  PRIMARY KEY (`ordh_seqno`),
  KEY `fk_trnirm_order_header_mas_finyear` (`ordh_fincode`),
  KEY `fk_trnirm_order_header_mas_country` (`ordh_origincountry`),
  KEY `fk_trnirm_order_header_mas_port` (`ordh_originport`),
  KEY `fk_trnirm_order_header_mas_port1` (`ordh_arrivalport`),
  KEY `fk_trnirm_order_header_maspur_supplier_master` (`ordh_sup_code`),
  KEY `uk_trnirm_order_header_compfinordh_nofrom` (`ordh_compcode`,`ordh_fincode`,`ordh_no`),
  CONSTRAINT `fk_trnirm_order_header_mas_company` FOREIGN KEY (`ordh_compcode`) REFERENCES `mas_company` (`company_code`),
  CONSTRAINT `fk_trnirm_order_header_mas_country` FOREIGN KEY (`ordh_origincountry`) REFERENCES `mas_country` (`country_code`),
  CONSTRAINT `fk_trnirm_order_header_mas_finyear` FOREIGN KEY (`ordh_fincode`) REFERENCES `mas_finyear` (`fin_code`),
  CONSTRAINT `fk_trnirm_order_header_mas_port` FOREIGN KEY (`ordh_originport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_order_header_mas_port1` FOREIGN KEY (`ordh_arrivalport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_order_header_maspur_supplier_master` FOREIGN KEY (`ordh_sup_code`) REFERENCES `TO BE DELETED maspur_supplier_master` (`sup_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_order_header`
--

LOCK TABLES `trnirm_order_header` WRITE;
/*!40000 ALTER TABLE `trnirm_order_header` DISABLE KEYS */;
INSERT INTO `trnirm_order_header` VALUES (1,90,22,1,'2022-08-28 00:00:00','IND123','2022-08-28 00:00:00',558,50,'100% DP','CIF TUTICORIN','IMMED',30,3,1,0,0,0,'NO REM','BANKACC','BANK NAME','BANK CODE','BRANCH CODE','SWIFT CODE','ADDR1','ADDR2','ADDR3','','','','','','','',''),(2,1,22,1,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',36,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(3,1,22,2,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',631,631,'LC 30 DAYS','CIF TUTICORIN','',23,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(4,1,22,3,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',1,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(5,1,22,4,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',236,236,'LC 30 DAYS','CIF TUTICORIN','',1,2,2,0,0,0,'','','','','','','','','','','','','','','','',''),(6,1,22,5,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',207,207,'LC 30 DAYS','CIF TUTICORIN','',1,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(7,1,22,6,'2022-08-29 00:00:00','NILL','2022-08-29 00:00:00',1092,1092,'LC 30 DAYS','CIF TUTICORIN','',36,2,2,0,0,0,'','','','','','','','','','','','','','','','',''),(8,1,22,7,'2022-09-06 00:00:00','N2012','2022-09-06 00:00:00',1163,1163,'LC 30 DAYS','CIF TUTICORIN','',6,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(9,1,22,8,'2022-09-08 00:00:00','N2049','2022-09-08 00:00:00',202,202,'LC 30 DAYS','CIF TUTICORIN','',6,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(10,1,22,9,'2022-09-10 00:00:00','N2098','2022-09-10 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,1,3,0,0,0,'','','','','','','','','','','','','','','','',''),(11,1,22,10,'2022-09-10 00:00:00','N2099','2022-09-10 00:00:00',1163,1163,'LC 30 DAYS','CIF TUTICORIN','',6,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(12,1,22,11,'2022-09-15 00:00:00','2110','2022-09-15 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(13,1,22,12,'2022-09-17 00:00:00','N2111','2022-09-15 00:00:00',1163,1163,'LC 30 DAYS','CIF TUTICORIN','',6,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(14,1,22,13,'2022-09-03 00:00:00','1978','2022-09-03 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(15,1,22,14,'2022-09-13 00:00:00','2104','2022-09-13 00:00:00',1163,1163,'LC 30 DAYS','CIF TUTICORIN','',6,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(16,1,22,15,'2022-09-23 00:00:00','2199','2022-09-23 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(17,1,22,16,'2022-09-24 00:00:00','2246','2022-09-24 00:00:00',1092,1092,'LC 30 DAYS','CIF TUTICORIN','',6,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(18,1,22,17,'2022-10-04 00:00:00','2350','2022-10-04 00:00:00',42,42,'LC 30 DAYS','CIF TUTICORIN','',6,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(19,1,22,18,'2022-10-22 00:00:00','2637','2022-10-22 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(20,1,22,19,'2022-10-22 00:00:00','2638','2022-10-22 00:00:00',342,342,'LC 30 DAYS','CIF TUTICORIN','',6,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(21,1,22,20,'2022-10-22 00:00:00','2639','2022-10-22 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(22,1,22,21,'2022-10-19 00:00:00','2589','2022-10-19 00:00:00',1092,1092,'LC 30 DAYS','CIF TUTICORIN','1',6,2,1,0,0,0,'1','','','','','','','','','','','','','','','',''),(23,1,22,22,'2022-10-19 00:00:00','2568','2022-10-19 00:00:00',1171,1171,'LC 30 DAYS','CIF TUTICORIN','1',6,2,1,0,0,0,'1','','','','','','','','','','','','','','','',''),(24,1,22,23,'2022-10-19 00:00:00','2569','2022-10-19 00:00:00',1092,1092,'LC 30 DAYS','CIF TUTICORIN','1',6,2,1,0,0,0,'1','','','','','','','','','','','','','','','',''),(25,1,22,24,'2022-09-03 00:00:00','1978','2022-09-03 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(26,1,22,25,'2022-09-13 00:00:00','2099','2022-09-13 00:00:00',1163,1163,'100% DP','CIF TUTICORIN','',6,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(27,1,22,26,'2022-10-02 00:00:00','2349','2022-10-02 00:00:00',1092,1092,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(28,1,22,27,'2022-10-13 00:00:00','2554','2022-10-13 00:00:00',407,407,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(29,1,22,28,'2022-11-05 00:00:00','2723','2022-11-05 00:00:00',42,42,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(30,1,22,29,'2022-11-10 00:00:00','2762','2022-11-10 00:00:00',1240,1240,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(31,1,22,30,'2022-11-16 00:00:00','2810','2022-11-16 00:00:00',209,209,'LC 30 DAYS','CIF TUTICORIN','',6,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(32,1,22,31,'2022-11-17 00:00:00','2811','2022-11-17 00:00:00',1240,1240,'LC 30 DAYS','CIF TUTICORIN','',6,3,2,0,0,0,'','','','','','','','','','','','','','','','',''),(33,1,22,32,'2022-11-17 00:00:00','2812','2022-11-17 00:00:00',555,555,'LC 30 DAYS','CIF TUTICORIN','',6,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(34,1,22,33,'2022-11-26 00:00:00','2920','2022-11-26 00:00:00',342,342,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(35,1,22,34,'2022-11-30 00:00:00','2929','2022-11-30 00:00:00',207,207,'LC 30 DAYS','CIF TUTICORIN','',6,2,1,0,0,0,'','','','','','','','','','','','','','','','',''),(36,1,22,35,'2022-11-30 00:00:00','2930','2022-11-30 00:00:00',676,676,'LC 30 DAYS','CIF TUTICORIN','',6,1,2,0,0,0,'','','','','','','','','','','','','','','','',''),(37,1,22,36,'2022-12-02 00:00:00','3012','2022-12-02 00:00:00',253,253,'LC 30 DAYS','CIF TUTICORIN','',3,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(38,1,22,37,'2022-12-06 00:00:00','3025','2022-12-06 00:00:00',209,209,'100% DP','CIF TUTICORIN','',8,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(39,1,22,38,'2023-01-07 00:00:00','3026','2022-12-07 00:00:00',253,253,'100% DP','CIF TUTICORIN','',9,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(40,1,22,39,'2022-12-08 00:00:00','3050','2022-12-08 00:00:00',676,676,'100% DP','CIF TUTICORIN','',10,1,3,0,0,0,'','','','','','','','','','','','','','','','',''),(41,1,22,40,'2022-12-08 00:00:00','3051','2022-12-08 00:00:00',74,74,'100% DP','CIF TUTICORIN','',33,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(42,1,22,41,'2022-12-08 00:00:00','3084','2022-12-08 00:00:00',1258,1258,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(43,1,22,42,'2022-12-13 00:00:00','3085','2022-12-13 00:00:00',676,676,'100% DA','CIF TUTICORIN','',9,3,3,0,0,0,'','','','','','','','','','','','','','','','',''),(44,1,22,43,'2022-12-17 00:00:00','3119','2022-12-17 00:00:00',207,207,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(45,1,22,44,'2022-12-17 00:00:00','3120','2022-12-17 00:00:00',42,42,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(46,90,22,2,'2023-01-09 00:00:00','TST01','2023-01-09 00:00:00',676,765,'LC 30 DAYS','CIF TUTICORIN','DF',9,1,2,0,0,0,'FDGDFGFD','VDFD','DADSDS','232','232','232','232','232','232','','','','','','','',''),(47,1,22,45,'2022-12-21 00:00:00','3186','2022-12-21 00:00:00',1258,1258,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(48,1,22,46,'2022-12-23 00:00:00','3203','2022-12-23 00:00:00',236,236,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(49,1,22,47,'2022-12-27 00:00:00','3258','2022-12-27 00:00:00',207,207,'100% DP','CIF TUTICORIN','',12,3,1,0,0,0,'','','','','','','','','','','','','','','','',''),(50,1,22,48,'2022-12-29 00:00:00','3296','2022-12-29 00:00:00',202,202,'100% DP','CIF TUTICORIN','',30,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(51,1,22,49,'2022-12-31 00:00:00','3398','2022-12-31 00:00:00',209,209,'100% DP','CIF TUTICORIN','',25,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(52,1,22,50,'2022-12-31 00:00:00','3399','2022-12-31 00:00:00',676,676,'100% DP','CIF TUTICORIN','',9,1,1,0,0,0,'','','','','','','','','','','','','','','','',''),(53,90,22,3,'2023-01-21 00:00:00','019/WP/2022-23','2023-01-21 00:00:00',1092,190,'100% DP','CIF TUTICORIN','WITH IN 2 WEEKS',6,1,2,0,0,0,'150 MTS X 2 shipments with 4-7 DAYS GAP','USD A/C NO.01-5011794-01','STANDARD CHARTED BANK','7039','001','SCBLLKLX','46B , ANANDA COOMARASAMY','MAWATHA','COLOMBO-03','25 Mts','+ / 10 %','Dahnay/one/Transasia','21 Calendar days only','As per global standard','','as per Liners / Carriers','');
/*!40000 ALTER TABLE `trnirm_order_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:07
