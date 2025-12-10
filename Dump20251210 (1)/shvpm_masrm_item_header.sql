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
-- Table structure for table `masrm_item_header`
--

DROP TABLE IF EXISTS `masrm_item_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masrm_item_header` (
  `itmh_code` int NOT NULL,
  `itmh_name` varchar(50) NOT NULL,
  `itmh_moisture_per` decimal(5,2) NOT NULL DEFAULT '0.00',
  `itmh_specification` varchar(300) NOT NULL DEFAULT '',
  `itmh_type` tinyint NOT NULL DEFAULT '2',
  `itmh_ledcode` int NOT NULL DEFAULT '0',
  `itmh_group` int NOT NULL DEFAULT '0',
  `itmh_hsncode` varchar(15) NOT NULL DEFAULT '0',
  `itmh_cgstper` decimal(5,2) DEFAULT '0.00',
  `itmh_sgstper` decimal(5,2) DEFAULT '0.00',
  `itmh_igstper` decimal(5,2) DEFAULT '0.00',
  `itmh_cgstledcode` int DEFAULT '0',
  `itmh_sgstledcode` int DEFAULT '0',
  `itmh_igstledcode` int DEFAULT '0',
  PRIMARY KEY (`itmh_code`,`itmh_name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masrm_item_header`
--

LOCK TABLES `masrm_item_header` WRITE;
/*!40000 ALTER TABLE `masrm_item_header` DISABLE KEYS */;
INSERT INTO `masrm_item_header` VALUES (1,'IMPORT CONE CORE',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(2,'IMPORT-LBBC',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(3,'IMPORT-DSOCC',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(4,'IMPORT-HARDMIXED PAPER',10.00,'DSFDSFDS',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(5,'IMPORT-HARD PACK',10.00,'DSFDSFDS',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(6,'IMPORT OCC 80/20',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(7,'IMPORT OCC - U.K / OTHERS',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(8,'IMPORT OCC - USA / CANADA \r\n',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(9,'IMPORT ONP 6 (SOFT MIX)',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(10,'IMPORT SL OCC',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(11,'IMPORT - SOFT MIXED PAPER',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(12,'LOCAL - BIT REEL',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(13,'LOCAL - CEMENTBAG',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(14,'LOCAL - COLOUR RECORD',12.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(15,'LOCAL - CONE WASTE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(16,'LOCAL - CORE PIPE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(17,'LOCAL - CORE RING PIPE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(18,'LOCAL - DEWAX',12.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(19,'LOCAL - DUPLEX',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(20,'LOCAL - GRAYBOARD',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(21,'LOCAL - HARD MIX PAPER',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(22,'LOCAL - IMPORT',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(23,'LOCAL - MILL BOARD',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(24,'LOCAL - NDLKCC',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(25,'LOCAL - OCC',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(26,'LOCAL - ONP',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(27,'LOCAL - SOFT MIX',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(28,'LOCAL - SWEEP',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(29,'LOCAL - TABLE TOP PAPER',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(30,'LOCAL - TNPL ETP WASTE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(31,'LOCAL - TNPL SCREEN FINE REJECT WASTE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(32,'LOCAL  - USA SEL.OCC',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(33,'LOCAL - WHITE RECORD',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(34,'IMPORT KBBC',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(35,'IMPORT MULTIWALL BAGS',10.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(36,'IMPORT-NCC',10.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(37,'IMPORT-NDLKC',10.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(38,'IMPORT-SKC',10.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(39,'IMPORT-STEEL MILL KRAFT',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(40,'IMPORT- UNBLEACHED KRAFT(UKP)',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(41,'LOCAL - MULTIWALL BAGS',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(42,'LOCAL - NCC',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(43,'LOCAL - NO1',10.00,'',1,0,2,'4707',0.00,0.00,0.00,0,0,0),(44,'LOCAL - PULP BOARD',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(45,'LOCAL - SKC',10.00,'',1,0,2,'4707',0.00,0.00,0.00,0,0,0),(46,'LOCAL - STEEL MILL KRAFT',10.00,'',1,0,2,'4707',0.00,0.00,0.00,0,0,0),(47,'LOCAL - MIXED WASTE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(48,'LOCAL - CUTTINGS',10.00,'',1,0,2,'4707',0.00,0.00,0.00,0,0,0),(49,'LOCAL - BOXKRAFT',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(50,'LOCAL - CHEMICAL BAGS',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(51,'LOCAL - CHEMICAL BAGS (WHITE)',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(52,'LOCAL - DSOCC',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(53,'LOCAL - WHITE PULP SHEET',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(54,'LOCAL NOTE BOOK',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(55,'LOCAL - DEGRADE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(56,'IMPORT - TOBACOO BOX (EMPTY)',10.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(57,'PULP SHEET-BROWN',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(58,'LOCAL KRAFT - TESTLINER SPECIAL GRD.',10.00,'170 GSM / 28 BF',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(59,'LOCAL - CORE 4\" IMPORTED',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(60,'LOCAL-NO 2',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(61,'UNPRINTED MECHANICAL CUTTING (LIGHT IVORY SHADE)',10.00,'',1,0,2,'4707',0.00,0.00,0.00,0,0,0),(62,'LOCAL -BLACK BOX',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(63,'SPL TEXT BOOK CUTTINGS',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(64,'WHITE DUPLEX CUTTINGS',10.00,'WASTE PAPER',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(65,'TEXT BOOK CUTTINGS',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(66,'MAGAZINE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(67,'CHENNAI BOX KRAFT',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(68,'KERALA BOX KRAFT',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(69,'MALDIVES WHITE RECORD',12.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(70,'POLY COATED MILK CARTONS',12.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(71,'IMPORT KCB-BBC',12.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(72,'IMPORT ONP (HARD MIXED)',12.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(73,'IMPORT BBC',12.00,'',2,0,2,'4707',0.00,0.00,0.00,0,0,0),(74,'ZZ ZZ XX CRD',12.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(75,'DE GRADE MIXED WASTE',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(76,'IMPORT-KCB',12.00,'',2,0,1,'4707',0.00,0.00,0.00,0,0,0),(77,'LOCAL PVC BAGS',12.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(78,'LOCAL-DE GRADE COLOUR RECORD',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0),(79,'LOCAL- DE GRADE BOX KRAFT',10.00,'',1,0,1,'4707',0.00,0.00,0.00,0,0,0);
/*!40000 ALTER TABLE `masrm_item_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `masrm_item_header_AFTER_INSERT` AFTER INSERT ON `masrm_item_header` FOR EACH ROW BEGIN
    DECLARE done1 INT DEFAULT FALSE;
    DECLARE vcompcode INT;

    declare company cursor for select company_code from  mas_company where company_code in (1,90);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done1 = TRUE;
    OPEN company;
       ins_loop1: LOOP
		FETCH company INTO vcompcode;
		IF done1 THEN
        	  LEAVE ins_loop1;
		END IF;
        call sprm_ins_item_trailer (vcompcode,new.itmh_code);
	 END loop;
     CLOSE company;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:35
