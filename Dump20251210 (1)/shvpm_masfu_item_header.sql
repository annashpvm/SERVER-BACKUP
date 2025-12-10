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
-- Table structure for table `masfu_item_header`
--

DROP TABLE IF EXISTS `masfu_item_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `masfu_item_header` (
  `itmh_code` int NOT NULL,
  `itmh_name` varchar(50) DEFAULT NULL,
  `itmh_moisture_ARB` decimal(5,2) DEFAULT '0.00',
  `itmh_moisture_ADB` decimal(5,2) DEFAULT '0.00',
  `itmh_ash` decimal(5,2) DEFAULT '0.00',
  `itmh_volatile` decimal(5,2) DEFAULT '0.00',
  `itmh_fixedcarbon` decimal(5,2) DEFAULT '0.00',
  `itmh_fines` decimal(5,2) DEFAULT '0.00',
  `itmh_sand` decimal(5,2) DEFAULT '0.00',
  `itmh_iron` decimal(5,2) DEFAULT '0.00',
  `itmh_gcv_ADB` decimal(4,0) DEFAULT '0',
  `itmh_gcv_ARB` decimal(4,0) DEFAULT '0',
  `itmh_hsncode` varchar(12) DEFAULT '',
  `itmh_moisture_ARB_qc` varchar(1) DEFAULT 'Y',
  `itmh_moisture_ADB_qc` varchar(1) DEFAULT 'N',
  `itmh_ash_qc` varchar(1) DEFAULT 'N',
  `itmh_volatile_qc` varchar(1) DEFAULT 'N',
  `itmh_fixedcarbon_qc` varchar(1) DEFAULT 'N',
  `itmh_fines_qc` varchar(1) DEFAULT 'N',
  `itmh_sand_qc` varchar(1) DEFAULT 'N',
  `itmh_iron_qc` varchar(1) DEFAULT 'N',
  `itmh_gcv_ADB_qc` varchar(1) DEFAULT 'N',
  `itmh_gcv_ARB_qc` varchar(1) DEFAULT 'N',
  PRIMARY KEY (`itmh_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `masfu_item_header`
--

LOCK TABLES `masfu_item_header` WRITE;
/*!40000 ALTER TABLE `masfu_item_header` DISABLE KEYS */;
INSERT INTO `masfu_item_header` VALUES (0,' ',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'0','Y','N','N','N','N','N','N','N','N','N'),(1,'CHAR COAL POWDER',45.00,35.00,31.00,41.00,51.00,61.00,71.00,81.00,91,101,'44020010','Y','N','N','N','N','N','N','N','N','N'),(2,'COCONUT SHELL CHARCOAL POWDER',1.00,2.00,3.00,4.00,5.00,6.00,7.00,8.00,9,10,'44029010','Y','N','N','N','N','N','N','N','N','N'),(3,'CORN CORPS',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'230210','Y','N','N','N','N','N','N','N','N','N'),(4,'CORN SIP WASTE',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'230210','Y','N','N','N','N','N','N','N','N','N'),(5,'HUSK',10.00,0.11,23.00,63.00,15.00,20.00,0.00,0.00,3850,3500,'1213','Y','N','N','N','N','N','Y','N','N','N'),(6,'JULIFLORA CHIPS - WET',35.00,0.90,3.00,77.00,25.00,0.00,0.00,0.00,4750,4000,'44012100','Y','N','N','N','N','N','Y','N','N','N'),(7,'JULIFLORA CRUSHED (DRY)',10.00,0.12,3.00,74.00,25.00,0.00,10.00,0.00,4900,4400,'44012100','Y','N','N','N','N','N','Y','N','N','N'),(8,'JULIFLORA WOOD',30.00,0.95,3.00,77.00,25.00,0.00,0.00,0.00,4700,4200,'44130000','Y','N','N','N','N','N','N','N','N','N'),(9,'MATCH STICK',20.00,1.00,3.00,81.00,20.00,15.00,0.00,0.00,4950,3960,'36050010','Y','N','N','N','N','N','N','N','N','N'),(10,'MATCH WOOD WASTE',40.00,0.87,2.50,81.00,25.00,10.00,10.00,0.00,5000,4300,'27014401','Y','N','N','N','N','N','N','N','N','N'),(11,'MATCH WOOD WASTE ( CRUST )',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'27014401','Y','N','N','N','N','N','N','N','N','N'),(12,'OTHER FIRE WOOD',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'4401','Y','N','N','N','N','N','N','N','N','N'),(13,'PALM BUNCH - PFB',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'12070110','Y','N','Y','N','N','N','N','N','N','N'),(14,'PALM FIBER & NUT SHELL',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'46021990','Y','N','N','N','N','N','N','N','N','N'),(15,'PINE TREE BARK',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44071100','Y','N','N','N','N','N','N','N','N','N'),(16,'PINE TREE BARK CRUST (WET)',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44031000','Y','N','N','N','N','N','N','N','N','N'),(17,'PLANT ROOT WASTE',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'31010099','Y','N','N','N','N','N','N','N','N','N'),(18,'PLYWOOD CHIPS',35.00,1.00,3.00,80.00,20.00,0.00,0.00,0.00,4850,3152,'44121490','Y','N','N','N','N','N','N','N','N','N'),(19,'PLYWOOD CHIPS  0-30MM SIZE',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44089010','Y','N','N','N','N','N','N','N','N','N'),(20,'PLYWOOD CHIPS < 10MM',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44121490','Y','N','N','N','N','N','N','N','N','N'),(21,'SAWDUST',30.00,1.00,2.00,76.00,25.00,0.00,0.00,0.00,4800,3360,'72044100','Y','N','Y','N','N','N','Y','N','Y','Y'),(22,'WOOD FIBER WASTE',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'4706','Y','N','N','N','N','N','N','N','N','N'),(23,'IMPORTED STEAM COAL',36.00,16.00,4.00,39.00,40.00,30.00,0.00,0.02,5400,4200,'27011920','Y','N','N','N','N','N','N','N','N','N'),(24,'LIGNITE COAL',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'27021000','Y','N','N','N','N','N','N','N','N','N'),(25,'UN BURNED LIGNITE COAL (UBL)',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'2702','Y','N','N','N','N','N','N','N','N','N'),(26,'FIRE WOOD',30.00,1.00,3.00,77.00,20.00,0.00,0.00,0.00,4700,3100,'440110','Y','N','N','N','N','N','N','N','N','N'),(27,'WOOD CHIPS',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44012290','Y','N','N','N','N','N','N','N','N','N'),(28,'GROUNDNUT SELLS',10.00,1.00,7.00,78.00,22.00,0.00,0.00,0.00,5350,5200,'12024190','Y','N','N','N','N','N','N','N','N','N'),(29,'WOOD BARK WITH UNUSABLE WOOD',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'4403','Y','N','N','N','N','N','N','N','N','N'),(30,'FUEL WOOD',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'440110','Y','N','N','N','N','N','N','N','N','N'),(31,'WOOD REBBER WASTE',0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'44129990','Y','N','N','N','N','N','N','N','N','N'),(32,'MIXED WOOD WASTE',35.00,1.00,2.50,80.00,25.00,0.00,0.00,0.00,4900,4200,'44014900','Y','N','N','N','N','N','N','N','N','N'),(33,'SLOT WOOD',35.00,0.90,5.00,78.00,20.00,0.00,0.00,0.00,4650,3022,'27014401','Y','N','N','N','N','N','N','N','N','N'),(34,'PENCIL WOOD',35.00,1.00,5.00,80.00,25.00,0.00,0.00,0.00,4600,3000,'44219940','Y','N','N','N','N','N','N','N','N','N'),(35,'RSPATHIPATTAI',35.00,1.00,9.00,75.00,25.00,0.00,0.00,0.00,3850,3100,'66020000','Y','N','N','N','N','N','N','N','N','N'),(36,'MATCH WOOD PATTAI',25.00,1.00,3.00,80.00,25.00,0.00,0.00,0.00,4900,3200,'44219090','Y','N','N','N','N','N','N','N','N','N'),(37,'SAW MILL DUST',30.00,1.00,5.00,80.00,15.00,0.00,0.00,0.00,4650,4185,'72044100','Y','N','N','N','N','N','N','N','N','N'),(38,'PLY WOOD PATTAI',35.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'440110','Y','N','N','N','N','N','N','N','N','N'),(39,'MIXED PARK CHIPS',35.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'4401','Y','N','N','N','N','N','N','N','N','N'),(40,'CHAR COAL',10.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0,0,'','Y','N','N','N','N','N','N','N','N','N');
/*!40000 ALTER TABLE `masfu_item_header` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `masfu_item_header_AFTER_INSERT` AFTER INSERT ON `masfu_item_header` FOR EACH ROW BEGIN
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
--		insert into  masrm_item_trailer values (new.itmh_code, compcode,22,0, 0, 0, 0, 0);
		call spfu_ins_item_trailer (vcompcode,new.itmh_code);
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

-- Dump completed on 2025-12-10 11:47:23
