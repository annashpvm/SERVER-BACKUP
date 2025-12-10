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
-- Table structure for table `mas_supbank`
--

DROP TABLE IF EXISTS `mas_supbank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_supbank` (
  `spb_code` int NOT NULL,
  `spb_refname` varchar(50) NOT NULL,
  `spb_name` varchar(50) NOT NULL,
  `spb_contact` varchar(50) NOT NULL,
  `spb_type` tinyint NOT NULL,
  `spb_add1` varchar(75) NOT NULL,
  `spb_add2` varchar(75) NOT NULL,
  `spb_add3` varchar(75) NOT NULL,
  `spb_city` varchar(50) NOT NULL,
  `spb_country_code` int NOT NULL,
  `spb_zipcode` varchar(10) NOT NULL,
  `spb_phone` varchar(50) NOT NULL,
  `spb_fax` varchar(50) NOT NULL,
  `spb_email` varchar(75) NOT NULL,
  `spb_website` varchar(75) NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`spb_code`),
  KEY `fk_mas_supbank_mas_country_idx` (`spb_country_code`),
  CONSTRAINT `fk_mas_supbank_mas_country` FOREIGN KEY (`spb_country_code`) REFERENCES `mas_country` (`country_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_supbank`
--

LOCK TABLES `mas_supbank` WRITE;
/*!40000 ALTER TABLE `mas_supbank` DISABLE KEYS */;
INSERT INTO `mas_supbank` VALUES (1,'BANK OF NOVA SCOTIA','BANK OF NOVA SCOTIA','MR.BERNARD',2,'125/54,','NOVA LANE','BAKER STRTEET','LONDON',2,'54586','245686','254699','','',0),(2,'BANK OF ENGLAND','BANK OF ENGLAND','MR.SATHISH',2,'126/87','ARTS COLLEGE ROAD','BRISTOL','BRISTOL',2,'','','','','',0),(3,'BANK OF INDIA-CBE','BANK OF INDIA','TEST',1,'ADD1','ADD2','ADD3','CBE',1,'','','','','',0),(4,'HSBC  BANK OF MIDDLE EAST ','HSBC BANK ','HSBC-MANAGER',2,'MIDDLE EAST ','P.O BOX No.25','SHARJAH ','SHARJAH',22,'','','','','',0),(5,'BARCLAYS BANK','BARCLAYS BANK','BARCLAYS BANK',2,'240 WHITE CHAPELS ROAD','LONDON','','LONDON',2,'','','','','',0),(6,'INDIAN OVERSEAS BANK','INDIAN OVERSEAS BANK','IOB',1,'RS PURAM','DB ROAD','','CBE',1,'641002','','','','',0),(7,'SBI','STATE BANK OF INDIA ','MANAGER',1,'INDUSTRIAL BRANCH ','TRICHY ROAD','','COIMBATORE',1,'','','','','',0),(8,'F.VAN LANSCHOT BANKIERS N.V','F.VAN LANSCHOT BANKIERS N.V','MANAGER',2,'HOOGE STEENWEG 29','5211 JN `s - HERTOGENBOSCH','THE NETHERLANDS','NETHERLANDS',15,'','','','','',0),(9,'BBL BUSINESS BRANCH MAMIX ','BBL BUSINESS BRANCH MAMIX','MANAGER ',2,'RUE DU TRONE 1','1000 BRUSSELS ','BELGIUM ','BELGIUM ',5,'','','','','',0),(10,'BANK OF IDIA - SINAPORE ','BANK OF INDIA ','MANAGER ',2,'138 ROBINSON ROAD #01-01','THE CORPORATE OFFICE BUILDING ','SINGAPORE ','SINGAPORE ',17,'068905','','','','',0),(11,'BANK OF INDIA - SAN ','BANK OF INDIA ','555 , CALIFORNIA ST',2,'SUITE 4646 ','SUITE ','SAN FRANCISCO ','CA 94104 ',21,'','','','','',0),(12,'ABN - AMRO Bank N.V ','ABN - AMRO Bank N.V ','MANAGER ',2,'TILBURG ','SWIFT CODE - ABNAN2A','','TILBURG',15,'','','','','',0),(13,'DRESDNEER BANK','DRESDNER BANK AG ','MANAGER',2,'KAMPSTRASSE 47 ','44137  DORTMUND , ','SWIFT Code: DRES DEFF 440','DORTMUND ',11,'','','','','',0),(14,'PAN ASIA BANK LTD','PAN ASIA BANK LTD ','MANAGER ',2,'COLOMBO','COLOMBO','','COLOMO ',6,'','','','','',0),(15,'HABIB BANK AG ZURICH ','HABIB BANK ZURICH ','MANAGER ',2,'149/151 MAIN STREET ','COLOMBO - 11','COLOMBO','SRI LANKA ',6,'','','','','',0),(16,'BANK OF AMERICA','BANK OF AMERICA ','MANAGER ',2,'CHATSWORTH BANKING CENTER 2157','21001 DEVONSHIRE ST','CHATSWORTH ','CA-91311',21,'','','','','',0),(17,'MASHREQ  BANK - DUBAI','MASHREQ  BANK','',2,'FOREIGN TRADE CENTRE ','P.O.BOX No.9271','','DUBAI',22,'','','','','',0),(18,'Habib Bank AG Zurich -Dubai ','Habib Bank  AG Zurich ','Branch Manager ',2,'Sikkat Al Khail Branch ','P.O.Box .No.5422','Deira ','DUBAI ',22,'','','','','',0),(19,'CREDIT SUISSE FIRST BOSTON - SWITZERLAND','CREDIT SUISSE FIRST BOSTON','',2,'Rue de Lausanne 17','CH - 10211 GENEVE ','','-',32,'','','','','',0),(20,'INDIAN OVERSEAS BANK - SINGAPORE ','INDIAN  OVERSES BANK ','Manager ',2,'a','a','a','a',17,'','','','','',0),(21,'STATE BANK OF INDIA - BELGIUM ','STATE BANK OF INDIA ','THE MANAGER ',2,'A','A','A','ANTWERP ',5,'','','','','',0),(22,'Sumitomo Mitsui Banking Corporation - Singapore ','Sumitomo Mitsui Banking Corporation ','The Manager ',2,'3 Temasek Avenue ','Centennial  Tower #06-01 ','Singapore - 039190','Singapore ',17,'','','','','',0),(23,'GJENSIDIGE NOR SPAREBANK [UNION BANK OF NARWAY]','GJENSIDIGE NOR SPAREBANK [UNION BANK OF NARWAY]','MOBLE GATEN 9, POSTBOX 2008,',2,'3103 TONSBERG ','NORWAY ','SWIFT CODE :UBNONOKKTNS ','A/C NBR :62100493647',16,'','','','','',0),(24,'Deutsche Bank AG-Hamburg ','Deutsche Bank AG ','Hamburg ',2,'BLZ 200 700 00 ','konto ','','Hamburg',11,'','','','','',0),(25,'CITI BANK - USA','CITI BANK ','1',2,'1','1','1','1',21,'0','0','0','','',0),(26,'ABN AMRO BANK -[PAPIER RECYCLING] ','ABN AMRO BANK ','THE MANAGER ',2,'4800 DE BREDA ','SWIFT CODE:ABN ANL2A ','','NETHERLANDS ',15,'','','','','',0),(27,'Toronto-Dominion Bank -Canada ','Toronto Dominion Bank ','The Manager ',2,'Internatinal Centre ','Toronto ','Ontario, M5K 1A2 ,','CANADA ',9,'','','','','',0),(28,'STATE BANK OF INDIA - LONDON ','STATE BANK OF INDIA ','MANAGER ',2,'15 KING STREET ,','EC2V 8EA , ','','LONDON ',2,'','','','','',0),(29,'STATE BANK OF INDIA -U.SA','STATE BANK OF INDIA ','Los Angles ',2,'USA ','USA ','','LOS ANGLES ',21,'','','','','',0),(30,'Bank  of Ceylon ','Bank of Ceylon ','1',2,'Pettah Branch ','A/C.No.4020010108','','SRI LANKA ',6,'','','','','',0),(31,'ANY NEGOTIATION BANK ','ANY NEGOTIATION BANK ','.',2,'.','.','.','.',41,'','','','','',0),(32,'HSBC -SINGAPORE ','HSBC','The Manager ',2,'Trade Services Department ','21, Collyer Quay # 04-00 ','Hongkong Bank Buildings ','Singapore ',17,'049320','','','','',0),(33,'Bank of Nova Scotia - SING ','Bank of Nova Scotia ','The Manager ',2,'Swift No: NOSCSGSG ','-','-','-',17,'','','','','',0),(34,'Commonwealth Bank of Australia -Greenhill ','Commonwealth Bank of Australia ','The Manager ',2,'Level-8, 100 King William Street , ','Adelaide , ','SA5000 , ','AUSTRALIA ',3,'','','','','',0),(35,'FORTIS BANK - CORRIEN EXPORTS ','FORTIS BANK ','MANAGER ',2,'A','A','A','ROTTERDAM ',15,'','','','','',0),(36,'National Westminster Bank Plc,-U.K ','National Westminster Bank Plc , ','The Manager ',2,'Ashton Gate Branch ,','Ashton Gate ,','NorthStreet ,','Bristol,',2,'','','','','',0),(37,'RABOBANK -CVB ECOLOGISTICS','RABOBANK TILBURG','',2,'Refer as per party acceptance .','','','NETHERLANDS',15,'','','','','',0),(38,'CITI BANK N.A','CITI BANK N.A','The Manager ',2,'4, Ahmed Pasha Street ','Garden City ','Cairo ','Cairo .',33,'','','','','',0),(39,'FIFTH THIRD BANK ','FIFTH THIRD BANK ','THE MANAGER ',2,'750 NORTHWEST HIGHWAY ','CARY , IL 60013 ','SWIFT : FTBCUS3C ','CRYSTAL LAKE ',21,'','8475165000 ','8475165004 ','','',0),(40,'ANZ Banking Group - Aspex','ANZ Banking Group','International Trade Services',2,'10/20 , Martin Place','.','.','Sydney',3,'','','','','',0),(41,'BANK OF MONTREAL','BANK OF MONTREAL','.',2,'234 SIMCOE STREET','3RD FLOOR','TORONTO','ONTARIO M5T 1T4',9,'M5T 1T4','','','','',0),(42,'STATE BANK OF INDIA COLOMBO','STATE BANK OF INDIA COLOMBO','.',2,'STATE BANK OF INDIA COLOMBO','1','','COLOMBO',6,'','','','','',0),(43,'STANDARD CHARTERED BANK (COLOMBO)','STANDARD CHARTERED BANK (COLOMBO)','',2,'37, YORK STREET','','','COLOMBO 01',6,'','','','','',0),(44,'ABN AMRO BANK N.V - CIPARO','ABN AMRO BANK N.V - CIPARO','MR.',2,'COOLSINGEL 93','SWIFT: ABNANL2R','','NETHERLANDS',15,'','','','','',0),(45,'BANCO POPOLARE - LAMMARI ','BANCO POPOLARE LAMMARI ','MANAGER ',2,'1','1','1','ITALY ',44,'','','','','',0),(46,'HATTON NATIONAL BANK - COLOMBO','HATTON NATIONAL BANK','MR.',2,'ALUTHKADE BRANCH','SWIFT: HBLILKLX','BANK CODE: 7083 BRANCH:001','COLOMBO',6,'','','','','',0),(47,'ANY UAE BANK','ANY UAE BANK','MR.',2,'UAE','UAE','UAE','UAE',22,'','','','','',0),(48,'DEUTSCHE BK - GERMANY','DEUTSCHE BANK AG','A/C NO: 0911156 ',2,'FREIBURG BRANCH','ROTTECKRING 3','D - 79098 FREIBURG,','GERMANY',11,'','','','','',0),(49,'AXIS BANK - COIMBATORE','AXIS BANK','AXIS',1,'COIMBATORE','COIMBATORE','','COIMBATORE',1,'','','','','',0);
/*!40000 ALTER TABLE `mas_supbank` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:47:51
