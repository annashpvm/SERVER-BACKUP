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
-- Table structure for table `userMaster`
--

DROP TABLE IF EXISTS `userMaster`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userMaster` (
  `usr_code` int NOT NULL,
  `usr_dept` int DEFAULT '0',
  `usr_name` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `usr_login` varchar(15) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `usr_pw` varchar(10) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT '',
  `usr_type` int DEFAULT '0',
  `usr_entrydays` int DEFAULT '1',
  `usr_alterdays` int DEFAULT '1',
  `usr_accounts` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'NO',
  `usr_sales` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_production` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_purchase` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_stores` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_rawmaterial` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_fuel` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_import` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_payroll` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_indent` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'NO',
  `usr_inward` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT 'NO',
  `usr_mis` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'NO',
  `usr_qc` varchar(2) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'NO',
  `usr_active` varchar(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci DEFAULT 'Y',
  PRIMARY KEY (`usr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userMaster`
--

LOCK TABLES `userMaster` WRITE;
/*!40000 ALTER TABLE `userMaster` DISABLE KEYS */;
INSERT INTO `userMaster` VALUES (0,0,'',' ',' ',2,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','N'),(1,6,'ANNADURAI V','annait','itshvpm',3,999,999,'RW','RW','RW','RW','RW','RW','NO','RW','RW','RW','RW','RW','RW','Y'),(2,12,'MAHENDRAN','mahendran','Viyash',1,1,1,'N','RW','N','N','N','N','NO','N','N','NO','NO','NO','NO','Y'),(3,12,'RAMESH','ramesh','ramesh',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(4,12,'VENKAT','venkat','vengad',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(6,3,'MARI SELVAM','mariselvam','mselvam',1,1,1,'NO','NO','RW','RO','RO','RW','NO','NO','RO','RW','NO','NO','NO','Y'),(7,3,'KARTHICK RAJA','karthickraja','kraja',1,1,1,'NO','NO','RW','RW','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(8,3,'SATHEES KUMAR','satheeskumar','sathees',1,1,1,'NO','RO','RW','RO','RO','RW','NO','NO','RO','RW','RO','NO','NO','Y'),(9,8,'THAMARAI','thamarai','venki#2025',1,6,5,'NO','NO','NO','RW','RW','RW','NO','RW','NO','RW','NO','NO','NO','Y'),(10,11,'JOTHILAKSHMI','jothi','jothi',1,30,30,'RW','RO','NO','RW','NO','RW','NO','RW','NO','RW','NO','NO','NO','Y'),(11,8,'SIVAKAMI','sivakami','sivakami',1,5,5,'NO','NO','NO','RW','NO','RW','NO','RW','NO','RW','NO','NO','NO','Y'),(12,11,'LINGAMMAL DEVI','devi','devi',1,90,90,'RW','RO','RO','RO','RW','RO','NO','RO','RO','RO','RO','NO','NO','Y'),(13,11,'BHUVANESWARI','bhuvana','shvpm',1,30,30,'RW','RO','RO','RO','RO','RO','NO','RO','RO','RO','RO','NO','NO','Y'),(14,11,'VASANTHA S','vasantha','vasantha',1,999,999,'RW','RO','RO','RO','RO','RO','NO','RO','RO','RO','RO','NO','NO','Y'),(15,11,'JEGATHEESH','jegatheesh','Srihari',1,1,1,'RW','RO','RO','RO','RO','RO','NO','RO','RO','RO','RO','NO','NO','Y'),(16,11,'MAYANDI','mayandi','mayandi',1,1,1,'RW','RO','NO','RO','RO','RO','NO','RO','RO','RO','RO','NO','NO','Y'),(17,6,'RANI J','rani','rani',4,999,999,'RO','RO','RW','RO','RO','RO','NO','RO','RO','RO','RW','NO','RW','Y'),(18,11,'PANDIYARAJAN','pandi','pandi@cc',3,999,999,'RW','RW','RO','RW','RW','RW','NO','RW','RW','RW','RW','NO','RW','Y'),(19,8,'MANIVANNAN','mani','mani',3,1,1,'RO','RO','RO','RW','RW','RW','NO','RW','RO','RW','RW','NO','RW','Y'),(20,12,'SANTHOSHMATHA','santhosh','santhosh',2,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(21,12,'SUGANYA','suganya','suganmli',2,1,1,'RO','RW','RW','NO','RO','RO','NO','NO','NO','RW','NO','NO','NO','Y'),(22,12,'JEYASHREE','jeyashree','jeyashree',2,1,1,'NO','RW','RO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(23,12,'RAMAMOORTHY','ramamoorthy','ram',3,1,1,'RO','RW','RO','RO','RO','RO','NO','NO','NO','NO','NO','NO','NO','Y'),(24,9,'SELVARAJ','selvaraj','Store@2008',2,5,35,'NO','NO','NO','RW','RW','RW','NO','NO','NO','RW','NO','NO','NO','N'),(25,3,'LAKSHMANAN','lakshmanan','lakshmanan',2,1,1,'NO','RO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(26,3,'PRASANTH','prasanth','prasanth',2,1,1,'NO','RO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(27,3,'MUTHUKUMAR','muthukumar','muthukumar',2,1,1,'NO','RO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(28,3,'VIGNESH','vignesh','vignesh',2,1,1,'NO','RO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(29,11,'VIGNESHWARAN','vignesac','vignesac',3,30,50,'RW','RO','RO','RO','RO','NO','NO','RO','RO','RO','RO','NO','RW','Y'),(30,14,'MUTHUKRISHNAN','mkrishnan','mkrishnan',1,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(31,2,'CHANDRU','chandru','chandru',3,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(32,2,'SIVASUBRAMANIAN','siva','siva',1,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(33,2,'MUTHUKARTHIKEYAN','mkarthi','123',1,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(34,1,'MUTHUMANI','muthumani','muthumani',1,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(35,1,'SETHURAMAN','sethu','sethu',3,1,1,'NO','NO','NO','RW','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(36,7,'NAGARAJ S','nagaraj','nagaraj',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(37,7,'SURESHINST','suresinst','suresinst',1,1,1,'NO','NO','NO','RO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(38,12,'RAMAMOORTHY S','moorthy','moorthy',3,1,1,'NO','RW','NO','RW','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(39,12,'SUGANYASAL','suganyasal','suganmli',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(40,12,'JEYASAL','jeyasal','jeya',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(41,17,'ANNA','anna','anna',3,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(42,17,'VINO','vino','vino',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(43,12,'BSECTION','bsection','bsection2',1,1,1,'NO','RW','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(44,7,'SELVAMINST','selvaminst','selvam',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(45,16,'KUMARR','kumarr','kumar',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(46,16,'SHIFTINCHARGE','shiftincharge','incharge',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(47,16,'POWER PLANT - OPERATOR','ppoperator','ppoperator',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(48,16,'POWER PLANT - INST','ppinst','ppinst',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(49,16,'POWER PLANT - MECH','ppmech','ppmech',1,1,1,'NO','NO','NO','NO','RW','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(50,16,'POWER PLANT - DM PLANT','ppdmp','ppdmp',1,1,1,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(51,9,'PRABU','prabu','prabu',2,60,60,'NO','NO','NO','RO','RO','RO','NO','NO','NO','RO','NO','NO','NO','Y'),(52,9,'MUNEESWARAN K','muneeswarank','munees',1,1,1,'NO','NO','NO','NO','RW','RW','NO','NO','NO','RW','NO','NO','NO','Y'),(53,10,'CELLPANDI','cpandi','cpandi',1,5,5,'NO','NO','NO','NO','RW','NO','NO','NO','NO','RW','NO','NO','RW','Y'),(54,16,'ARUNA','aruna','aruna',1,5,5,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','RW','Y'),(55,9,'POOMARI K','poomarik','poomarik',1,5,5,'NO','NO','NO','RW','RW','RW','NO','NO','NO','NO','NO','NO','RW','Y'),(56,14,'MUTHU SELVA LAKSHMI','aishwarya','kmsl@1998',2,3,3,'NO','RW','NO','RW','NO','NO','NO','NO','NO','RW','NO','NO','NO','Y'),(57,17,'MD','md','md',4,1,1,'RW','RW','RW','RW','RW','NO','NO','NO','NO','NO','NO','NO','RW','Y'),(58,11,'KARUTHA PANDIAN M','mkpandian','mkpandian',1,30,30,'RW','RO','RO','RW','RO','NO','NO','NO','NO','NO','NO','NO','NO','Y'),(59,14,'SECURITY','security','security',1,3,3,'NO','NO','NO','NO','NO','RO','NO','NO','NO','NO','NO','NO','NO','Y'),(60,6,'GUNALAN','vinoth','v@123',2,300,300,'RW','RW','RW','RW','RW','RW','NO','RW','RW','RW','NO','NO','RW','Y'),(61,8,'VENU GOPAL','venu','venu',2,6,5,'NO','NO','NO','RW','RW','NO','NO','RW','NO','RW','NO','NO','RO','Y'),(62,12,'THIRUNARAYANAN','thiru','thiru',2,3,3,'RO','RW','NO','NO','NO','NO','NO','NO','NO','RO','NO','NO','NO','Y'),(63,13,'JEYAKUMAR.P','jeyakumar','jeyakumar',1,5,5,'NO','NO','NO','NO','NO','NO','NO','NO','NO','RW','NO','NO','RW','Y'),(64,11,'SELVAKUMAR','sk','sk1971',1,10,10,'RW','NO','NO','NO','NO','RW','NO','NO','NO','RW','NO','NO','NO','Y'),(65,6,'SIVAKUMAR ','sivakumar','siva',2,90,90,'RW','RW','RW','RW','RW','RW','RW','RW','NO','RW','NO','NO','RW','Y');
/*!40000 ALTER TABLE `userMaster` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:47
