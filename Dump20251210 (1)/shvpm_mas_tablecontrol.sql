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
-- Table structure for table `mas_tablecontrol`
--

DROP TABLE IF EXISTS `mas_tablecontrol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mas_tablecontrol` (
  `con_code` int NOT NULL,
  `con_tablename` varchar(60) NOT NULL,
  `con_value` int NOT NULL,
  `cancelflag` tinyint DEFAULT '0',
  PRIMARY KEY (`con_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mas_tablecontrol`
--

LOCK TABLES `mas_tablecontrol` WRITE;
/*!40000 ALTER TABLE `mas_tablecontrol` DISABLE KEYS */;
INSERT INTO `mas_tablecontrol` VALUES (1,'trnrm_issue_header',517,0),(2,'trnrm_indent_header',3,0),(3,'trnrm_enqquot_header',2,0),(4,'trnirm_lcapplication',4,0),(5,'trnrm_issret_header',2,0),(6,'trnfu_issue_header',323,0),(7,'trnirm_lcdetails',3,0),(8,'trnfu_issret_header',2,0),(9,'trnrm_credit_note',2,0),(10,'trnirm_credit_note',1,0),(11,'trnfu_credit_note',1,0),(12,'trnifu_credit_note',1,0),(14,'trnrm_order_header',498,0),(17,'trnrm_orderamnd_header',1187,0),(18,'trnrm_receipt_header',3319,0),(19,'trnrm_stockdetails',210,0),(20,'trnrm_pulpconversion',1,0),(21,'trnrm_pulpreceipt',1,0),(22,'trnirm_invoice_header',46,0),(23,'trnirm_order_header',54,0),(24,'trnirm_highseas',1,0),(25,'trnirm_orderamnd_header',45,0),(26,'trnfu_enqquot_header',1,0),(27,'trnirm_enqquot_header',1,0),(28,'trnifu_enqquot_header',1,0),(29,'trn_weightcard',3457,0),(30,'trnfu_order_header',63,0),(31,'trnifu_order_header',1,0),(32,'trnirm_depb_license',1,0),(33,'trnrm_salenote_header',3,0),(34,'trnfu_receipt_header',371,0),(35,'trnfu_stockdetails',27,0),(36,'trnrm_receiptret_header',11,0),(37,'mas_areafreight',16,0),(38,'mas_areaitemfreight',25,0),(39,'masrm_party_itemrate',125,0),(40,'masfu_party_itemrate',4,0),(41,'trnirm_receipt_header',130,0),(42,'trnfu_orderamnd_header',164,0),(43,'trnifu_orderamnd_header',1,0),(44,'trnfu_indent_header',2,0),(45,'masrm_stockdetails',12,0),(46,'trnifu_invoice_header',1,0),(47,'masfu_stockdetails',3,0),(48,'trnifu_receipt_header',1,0),(49,'trnfu_salenote_header',1,0),(50,'trnfu_receiptret_header',1,0),(51,'trnrm_stockadjustment',1,0),(52,'trnfu_stockadjustment',1,0),(53,'trn_monthexrate',15,0),(54,'HrMasPfamendment',1,0),(55,'HrMasEsiamendment',1,0),(56,'HrMasDAPointamendment',1,0),(57,'HrTrnAccident',1,0),(58,'HrTrnContractSalary',1,0),(59,'HrTrnVisitor',1,0),(60,'HrTrnVehFuelFilling',1,0),(61,'HrMasDepartment',1,0),(62,'HrMasDeduction',1,0),(63,'HrMasDesignation',1,0),(64,'HrMasCaste',1,0),(65,'HrMasOtherAllowance',1,0),(66,'HrMasLocation',1,0),(67,'HrMasGrade',1,0),(68,'HrMasExtraAllowance',1,0),(69,'HrMasVehicle',1,0),(70,'HrMasLabourcontractor',1,0),(71,'HrMasCanteenItem',1,0),(72,'HrMasMisconduct',1,0),(73,'HrMasActiontaken',1,0),(74,'HrMasEmployee',1,0),(75,'HrMasBonusamendment',1,0),(76,'HrMasWeeklyoffAmendment',1,0),(77,'HrTrnDamonthpoint',1,0),(78,'HrTrnCanStock',1,0),(79,'HrTrnStandardDeduction',1,0),(80,'HrTrnMonthDeduction',1,0),(81,'HrTrnMonthAllowance',1,0),(82,'HrTrnMessDeduction',1,0),(83,'HrTrnDisciplinary',1,0),(84,'HrTrnCanPurchase',1,0),(85,'HrTrnVehTripsheet',1,0),(86,'HrTrnCanteenExpenses',1,0),(87,'HrTrnHoliday',1,0),(88,'trnfm_service_header',1,0),(89,'trnfm_asset_additioncost',1,0),(90,'trnfm_asset_retirement',1,0),(91,'trnfm_servsch_header',1,0),(92,'trnfm_amc_header',1,0),(93,'trnfm_insurance_renewal',1,0),(94,'trnpur_salenote_header',1,0),(95,'HrTrnYearlyProcess',1,0),(96,'trnCostPulpHeader',1,0),(97,'trnCostNMR',1,0),(98,'trnCostPaperProduction',1,0),(99,'trnfm_yearly_depreciation',1,0),(100,'HrTrnContractSalProcess',1,0),(104,'trnsol_sales_oil',1,0),(105,'trnsol_weighbridge',1,0),(106,'trnsol_stores',1,0),(107,'trnsol_qclabresult',1,0),(108,'trnsol_stockdetails',1,0),(109,'massol_stockdetails',1,0),(110,'trnsol_rbpo_header',1,0),(111,'trnsol_orderamnd_header',1,0),(112,'trnsol_rbissue_header',1,0),(113,'trnsol_sales_deoiledbran',1,0),(114,'trnsolprd_dayprod_matchem',1,0),(115,'trnsol_salorder_confirm',1,0),(116,'trnrm_stockdetails_bk',1,0),(117,'masrm_stockdetails_bk',1,0),(118,'trnfu_stockdetails_bk',1,0),(119,'masfu_stockdetails_bk',1,0);
/*!40000 ALTER TABLE `mas_tablecontrol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:58
