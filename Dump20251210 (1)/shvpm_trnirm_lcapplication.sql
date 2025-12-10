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
-- Table structure for table `trnirm_lcapplication`
--

DROP TABLE IF EXISTS `trnirm_lcapplication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trnirm_lcapplication` (
  `lca_seqno` int NOT NULL,
  `lca_compcode` tinyint NOT NULL,
  `lca_fincode` tinyint NOT NULL,
  `lca_no` int NOT NULL,
  `lca_refno` varchar(20) NOT NULL,
  `lca_date` datetime NOT NULL,
  `lca_partybank` int NOT NULL,
  `lca_lcbank` int NOT NULL,
  `lca_presenplace` varchar(50) NOT NULL,
  `lca_modeofadvice` varchar(20) NOT NULL,
  `lca_expdate` datetime NOT NULL,
  `lca_expdes` varchar(50) NOT NULL,
  `lca_creditconfirm` tinyint NOT NULL,
  `lca_curramount` decimal(14,2) NOT NULL,
  `lca_partshipment` tinyint NOT NULL,
  `lca_transhipment` tinyint NOT NULL,
  `lca_nature` smallint NOT NULL,
  `lca_naturedes` varchar(50) NOT NULL,
  `lca_intusanceper` varchar(50) NOT NULL,
  `lca_insurance` varchar(50) NOT NULL,
  `lca_originport` int NOT NULL,
  `lca_arrivalport` int NOT NULL,
  `lca_shiplastdate` datetime NOT NULL,
  `lca_shiplastdes` varchar(50) NOT NULL,
  `lca_netiationper` smallint NOT NULL,
  `lca_odstype` tinyint NOT NULL,
  `lca_odsdes` varchar(100) NOT NULL,
  `lca_supplyterms` varchar(50) NOT NULL,
  `lca_freight` varchar(50) NOT NULL,
  `lca_notifyaddress` varchar(250) NOT NULL,
  `lca_bankcharges` varchar(100) NOT NULL,
  `lca_documentsreq` varchar(2500) NOT NULL,
  `lca_status` varchar(1) NOT NULL,
  `lca_usr_code` decimal(7,0) NOT NULL,
  `lca_entry_date` datetime NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`lca_seqno`),
  KEY `uk_trnirm_lcapplication_compfincodelca_no` (`lca_compcode`,`lca_fincode`,`lca_no`),
  KEY `uk_trnirm_lcapplication_comp_refnolcbank` (`lca_compcode`,`lca_fincode`,`lca_refno`,`lca_partybank`),
  KEY `fk_trnirm_lcapplication_mas_port` (`lca_originport`),
  KEY `FK_trnirm_lcapplication_mas_port1` (`lca_arrivalport`),
  KEY `fk_trnirm_lcapplication_mas_supbank` (`lca_partybank`),
  KEY `fk_trnirm_lcapplication_mas_supbank1` (`lca_lcbank`),
  CONSTRAINT `fk_trnirm_lcapplication_mas_port` FOREIGN KEY (`lca_originport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `FK_trnirm_lcapplication_mas_port1` FOREIGN KEY (`lca_arrivalport`) REFERENCES `mas_port` (`port_code`),
  CONSTRAINT `fk_trnirm_lcapplication_mas_supbank` FOREIGN KEY (`lca_partybank`) REFERENCES `mas_supbank` (`spb_code`),
  CONSTRAINT `fk_trnirm_lcapplication_mas_supbank1` FOREIGN KEY (`lca_lcbank`) REFERENCES `mas_supbank` (`spb_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trnirm_lcapplication`
--

LOCK TABLES `trnirm_lcapplication` WRITE;
/*!40000 ALTER TABLE `trnirm_lcapplication` DISABLE KEYS */;
/*!40000 ALTER TABLE `trnirm_lcapplication` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:55
