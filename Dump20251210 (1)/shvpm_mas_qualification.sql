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
-- Table structure for table `mas_qualification`
--

DROP TABLE IF EXISTS `mas_qualification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_qualification` (
  `qualification_code` int NOT NULL,
  `qualification_name` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_qualification`
--

LOCK TABLES `mas_qualification` WRITE;
/*!40000 ALTER TABLE `mas_qualification` DISABLE KEYS */;
INSERT INTO `mas_qualification` VALUES (1,'MCA'),(2,'M.SC'),(3,'B.SC'),(4,'+2'),(5,'B.A.SC'),(6,'S.S.L.C'),(7,'D.P.T'),(8,'D.E.E'),(9,'D.E.C.E'),(10,'B.E'),(11,'D.M.E'),(12,'B.COM'),(13,'C.A.(INTER)'),(14,'B.COM.& D.C.P.'),(15,'M.SC &M.B.A'),(16,'B.SC.,B.ED'),(17,'M.A(INCOMP.)'),(18,'D.COM'),(19,'D.C.S.E'),(20,'B.A'),(21,'M.A.M.L'),(42,'M.A'),(23,'+1'),(24,'D.E.E.E'),(25,'IX'),(26,'M.COM. & A.I.C.W'),(27,'B.COM., & D.C.P'),(28,'M.B.A'),(29,'D.C.S.C'),(30,'VII'),(31,'D.C.E'),(32,'V'),(33,'VI'),(34,'D.E.E.E & B.E(PART TIME)'),(35,'B.B.A'),(36,'B.COM.,D.C.A'),(37,'B.B.M.,D.C.S'),(38,'B.A.,D.R.S'),(39,'D.M.E(B.O.E)'),(40,'B.SC.,D.M.E'),(41,'I.T.I.,M.A'),(43,'M.COM'),(44,'VIII'),(45,'III'),(46,'M.F.M'),(47,'I.T.I'),(48,'DIP (CHEM)'),(49,'B.A, D.COOP'),(50,'(DEEE)'),(52,'DCSE, BCA'),(53,'DTED'),(56,'B.SC MLM'),(57,'(B.A)'),(58,'MSW, DLLAL,PGDPM,DGL'),(59,'B.COM, MBA'),(51,'(BE)'),(54,'DIPLOMA (GAR)'),(55,'(B.SC)'),(60,'DIP (LAB TECH)'),(61,'MSW, PGDLAL & PG  DIP HRD'),(62,'DPPT, MBA'),(63,'B.COM, MCS'),(64,'MCS'),(65,'MLM'),(66,'DIP-FIRE & SAFETY'),(67,'B.TECH( CHEM ENGG)'),(68,'D.T.C'),(69,'D.C.T'),(70,'HEAD ACCOUNTS'),(71,'B.TECH'),(72,'PH.D'),(73,'D.I.C.E'),(74,'M.E'),(75,'M.PHIL'),(76,'M.A.,M.PHIL'),(77,'M.A.,B.ED'),(78,'DIPLOMA'),(79,'DIPLOMA - ELECTRICAL'),(0,'8');
/*!40000 ALTER TABLE `mas_qualification` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:51
