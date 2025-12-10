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
-- Table structure for table `mas_users`
--

DROP TABLE IF EXISTS `mas_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_users` (
  `usr_code` int NOT NULL,
  `usr_dept` int NOT NULL,
  `usr_name` varchar(40) NOT NULL,
  `usr_pwd` varchar(8) NOT NULL,
  `usr_type` int NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`usr_code`),
  KEY `FK_mas_users_mas_dept_idx` (`usr_dept`),
  CONSTRAINT `FK_mas_users_mas_dept` FOREIGN KEY (`usr_dept`) REFERENCES `mas_dept` (`dept_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_users`
--

LOCK TABLES `mas_users` WRITE;
/*!40000 ALTER TABLE `mas_users` DISABLE KEYS */;
INSERT INTO `mas_users` VALUES (1,7,'Systems','SYS',3,0),(2,6,'Management','MD',1,0),(3,1,'Production','PROD',1,0),(4,5,'Quality Control','QC',1,0),(5,2,'Purchase-User','USER',1,0),(6,4,'Sales - User','sal',1,0),(7,3,'Accounts','ACC',2,0),(8,3,'Account-user','ACC',2,0),(9,3,'Account-HOD','voUcher',3,0),(10,2,'Purchase-HOD','serots',3,0),(11,1,'Production-HOD','PRODN',3,0),(12,3,'Accounts-manage','TRAILBAL',3,0),(13,2,'Purchase','PURCHASE',1,0),(14,4,'Sales -HOD','vjpmarho',3,0),(15,8,'RM STORES','RMS',1,0),(16,8,'RM STORES-HOD','RMHOSD',3,0),(17,9,'FU STORES','FUEL',1,0),(18,9,'FU STORES-HOD','FUEL',2,0),(19,3,'VP(ACC)','MIS',1,0),(20,1,'VP(PROD)','MIS',1,0),(21,5,'Quality Control-HEAD','qcadm',3,0),(22,4,'VP(SALES)','vjpmarvp',1,0),(25,4,'Sales_rate','newrate',0,0),(26,4,'Sales_order','order',0,0),(28,4,'SALES-VIEW','SALES',1,0),(29,1,'PRODUCTION-VIEW','PRODVIEW',1,0),(30,4,'Rate_approval','agnes',0,0),(32,3,'Accounts-HO','HO',1,0),(33,4,'Sales_Inv-Modi','sal_invm',0,0),(34,4,'Sales-FinishStock','FINadd',1,0),(42,4,'Sales-Inv-Del','INV_DEL',1,0),(49,4,'Sales-Var-Modi','Rewaste',1,0),(50,4,'zSAL-Rate Appr','devaraj',1,0),(51,1,'zProduction','servall',1,0),(52,1,'zProd-salvage','SalVAGE',1,0),(53,1,'zProd-wt','NEWwt',1,0),(54,1,'zProd-ma','DVMAPOK',1,0),(55,4,'zSales-SOC','as7',1,0),(56,4,'zSales-MA','MA',1,0),(57,4,'zSales-MAA','sales',1,0),(58,4,'zSales-OA','order',1,0),(61,4,'zSal-Variety Change','QLYchang',1,0),(62,4,'zSal-RG1 TO WIP','RG1toWIP',1,0),(63,4,'zSal-WT_CHANGE','RG1wtMOD',1,0);
/*!40000 ALTER TABLE `mas_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:49
