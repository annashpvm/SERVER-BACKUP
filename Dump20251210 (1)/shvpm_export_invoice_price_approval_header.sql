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
-- Table structure for table `export_invoice_price_approval_header`
--

DROP TABLE IF EXISTS `export_invoice_price_approval_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `export_invoice_price_approval_header` (
  `ei_compcode` tinyint NOT NULL,
  `ei_fincode` tinyint NOT NULL,
  `ei_amendno` int DEFAULT NULL,
  `ei_amenddate` datetime DEFAULT NULL,
  `ei_appr_no` int DEFAULT NULL,
  `ei_appr_date` datetime NOT NULL,
  `ei_custcode` decimal(6,0) NOT NULL,
  `ei_dealer` decimal(6,0) NOT NULL,
  `ei_contact` varchar(50) DEFAULT NULL,
  `ei_our_ref` varchar(30) NOT NULL,
  `ei_our_refdate` datetime DEFAULT NULL,
  `ei_cust_ref` varchar(30) DEFAULT NULL,
  `ei_cust_refdate` datetime DEFAULT NULL,
  `ei_desi_port` int NOT NULL,
  `ei_inco_terms` decimal(6,0) NOT NULL,
  `ei_pay_terms` decimal(6,0) NOT NULL,
  `ei_ex_rate` decimal(9,2) NOT NULL,
  `ei_avg_billrate` decimal(8,2) DEFAULT NULL,
  `ei_ddk_per` decimal(5,2) DEFAULT NULL,
  `ei_ddk_amount` decimal(8,2) DEFAULT NULL,
  `ei_fms_per` decimal(5,2) DEFAULT NULL,
  `ei_fms_amount` decimal(8,2) DEFAULT NULL,
  `ei_meis_per` decimal(5,2) DEFAULT NULL,
  `ei_meis_amount` decimal(8,2) DEFAULT NULL,
  `ei_cha_charge` decimal(8,2) NOT NULL,
  `ei_ecgc_charge_per` decimal(6,2) NOT NULL,
  `ei_ecgc_charge_amount` decimal(7,2) DEFAULT NULL,
  `ei_comm_type` varchar(1) DEFAULT NULL,
  `ei_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_comm_per` decimal(5,2) NOT NULL,
  `ei_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_extra_comm_type` varchar(1) DEFAULT NULL,
  `ei_extra_comm_per` decimal(5,2) NOT NULL,
  `ei_extra_comm_dollar` decimal(5,1) DEFAULT NULL,
  `ei_extra_comm_amount` decimal(8,2) DEFAULT NULL,
  `ei_pallet_type` varchar(1) DEFAULT NULL,
  `ei_pallet_charge_per` decimal(5,2) NOT NULL,
  `ei_pallet_charge_amount` decimal(8,2) DEFAULT NULL,
  `ei_freight_mt` decimal(6,2) DEFAULT NULL,
  `ei_freight_amount` decimal(8,2) NOT NULL,
  `ei_nmr` decimal(8,0) NOT NULL,
  `ei_discharge_port` int DEFAULT NULL,
  `ei_shipment_date` varchar(30) DEFAULT NULL,
  `ei_trans_ship` varchar(20) DEFAULT NULL,
  `ei_part_ship` varchar(20) DEFAULT NULL,
  `ei_ship_marks` varchar(500) DEFAULT NULL,
  `ei_tolarance` varchar(50) DEFAULT NULL,
  `ei_deli_rem1` varchar(100) DEFAULT NULL,
  `ei_deli_rem2` varchar(100) DEFAULT NULL,
  `ei_deli_rem3` varchar(100) DEFAULT NULL,
  `ei_deli_rem4` varchar(100) DEFAULT NULL,
  `ei_pack_rem` varchar(100) DEFAULT NULL,
  `ei_approval` varchar(1) DEFAULT NULL,
  `ei_approval_date` datetime DEFAULT NULL,
  `ei_amend` varchar(1) DEFAULT NULL,
  `ei_amend_date` datetime DEFAULT NULL,
  `ei_buyeradd1` varchar(50) DEFAULT NULL,
  `ei_buyeradd2` varchar(50) DEFAULT NULL,
  `ei_buyeradd3` varchar(50) DEFAULT NULL,
  `ei_buyeradd4` varchar(50) DEFAULT NULL,
  `ei_pricevalid` datetime DEFAULT NULL,
  `ei_ins_borne` varchar(20) DEFAULT NULL,
  `ei_terms` varchar(50) DEFAULT NULL,
  `ei_insp_borne` varchar(20) DEFAULT NULL,
  `ei_cont_type` smallint DEFAULT NULL,
  `ei_cont_no` smallint DEFAULT NULL,
  `ei_duty_per` decimal(5,2) DEFAULT NULL,
  `ei_edu_per` decimal(4,2) DEFAULT NULL,
  `ei_she_per` decimal(4,2) DEFAULT NULL,
  `ei_note1` varchar(60) DEFAULT NULL,
  `ei_note2` varchar(60) DEFAULT NULL,
  `ei_note3` varchar(60) DEFAULT NULL,
  `ei_note4` varchar(60) DEFAULT NULL,
  `ei_plan_yn` varchar(1) DEFAULT NULL,
  `cancelflag` decimal(9,5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `export_invoice_price_approval_header`
--

LOCK TABLES `export_invoice_price_approval_header` WRITE;
/*!40000 ALTER TABLE `export_invoice_price_approval_header` DISABLE KEYS */;
INSERT INTO `export_invoice_price_approval_header` VALUES (1,20,0,'2021-01-14 00:00:00',4,'2021-01-14 00:00:00',390,25,'TUSHAR JAIN','PFI-004 / DPM / 2020-2021','2021-01-14 00:00:00','NPP/PO/2020/111 DT12/01/2021','2021-01-14 00:00:00',71,2,22,72.50,0.00,1.20,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,123,'24/01/2021','ALLOWED','NOT ALLOWED','MG BROWN PLAIN','+ / - QTY &VALUE','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2021-01-14 00:00:00','N','2021-01-14 00:00:00','NANDYAVART PAPER PLANET FZC','PO BOX 8864, SAIF OFFICE Q1-06-055/A','SAIF ZONE SHARJAH UNITED ARAB EMIRATES','TRADE LIC NO: 021050','2021-01-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,1,0.00,0.00,0.00,'LABELLING: MARKETED BY NANDYAVART PAPER PLANET','','','','N',0.00000),(1,20,0,'2021-01-18 00:00:00',3,'2021-01-08 00:00:00',386,13,'MURALI','PFI-003 / DPM / 2020-2021','2021-01-08 00:00:00','SEZ/20-21/IM/003200031','2021-01-08 00:00:00',63,15,15,72.50,0.00,1.20,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,109,'10/01/2021','ALLOWED','ALLOWED','PLAIN PAPER IN REELS WF 77BRIGHTNESS 53GSM\r\n','+/-5% QTY & VALUE','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-01-18 00:00:00','N','2021-01-08 00:00:00','','','','','2021-01-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,6,0.00,0.00,0.00,'NO REEL JOINTS , CONSISTENCY IN PAPER SHADE','TOLERANCE IN SIZE, GSM & QTY : NO','EXPORT QUALITY PACKING NOT LESS 77% BRIGHTNESS LESS SPEC','100% TT PAYMENT ON SHIPMENT','N',0.00000),(1,21,0,'2021-10-07 00:00:00',2,'2021-10-07 00:00:00',154,3,'RAKESH','PFI-002 / DPM / 2021-2022','2021-10-05 00:00:00','PO/21/01960 DT.27.09.2021','2021-10-05 00:00:00',39,2,16,73.50,0.00,1.20,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,125,'31/10/2021','ALLOWED','ALLOWED','MADE IN INDIA','+/- 10%','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-10-07 00:00:00','N','2021-10-07 00:00:00','','','','','2021-10-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',40,10,0.00,0.00,0.00,'','','','','N',0.00000),(1,20,0,'2021-04-01 00:00:00',6,'2021-03-30 00:00:00',155,28,'','PFI-006 / DPM / 2020-2021','2021-03-30 00:00:00','','2021-03-30 00:00:00',64,12,11,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,110,'20/04/2021','ALLOWED','NOT ALLOWED','','+ / - 5% on Qty / value','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-04-01 00:00:00','N','2021-03-30 00:00:00','','','','','2021-04-30 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,1,0.00,0.00,0.00,'','','','','N',0.00000),(1,21,0,'2021-10-13 00:00:00',3,'2021-10-13 00:00:00',154,3,'RAKESH','PFI-003 / DPM / 2021-2022','2021-10-13 00:00:00','PO/021/02041','2021-10-13 00:00:00',39,2,16,74.50,0.00,0.00,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,125,'31/10/2021','ALLOWED','ALLOWED','MADE IN INDIA','+/-10%','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-10-13 00:00:00','N','2021-10-13 00:00:00','','','','','2021-10-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',40,10,0.00,0.00,0.00,'','','','','N',0.00000),(1,21,0,'2021-10-14 00:00:00',4,'2021-10-14 00:00:00',488,16,'KIM','PFI-004 / DPM / 2021-2022','2021-10-14 00:00:00','PO/001/14.10.2021','2021-10-14 00:00:00',73,16,26,74.50,0.00,0.00,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,126,'20/10/2021','NOT ALLOWED','NOT ALLOWED','MADE IN INDIA','+ / - 5%','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-10-14 00:00:00','N','2021-10-14 00:00:00','','','','','2021-10-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,1,0.00,0.00,0.00,'','','','','N',0.00000),(90,19,0,'2019-10-29 00:00:00',1,'2019-10-29 00:00:00',279,15,'XXX','PFI-001 / TEST / 2019-2020','2019-10-29 00:00:00','DFD','2019-10-29 00:00:00',22,3,19,55.50,0.00,3.00,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,115,'DFDS','ALLOWED','ALLOWED','DFD','232','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-10-29 00:00:00','N','2019-10-29 00:00:00','','','','','2019-10-29 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,0,0.00,0.00,0.00,'DFDS','DFD','DSF','DFD','N',0.00000),(3,19,0,'2019-10-29 00:00:00',1,'2019-10-29 00:00:00',279,28,'GOPAKUMAR','PFI-001 / VJPM / 2019-2020','2019-10-29 00:00:00','1001/10/2019','2019-10-29 00:00:00',22,12,8,70.50,0.00,1.50,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'NOV/DEC 2019','ALLOWED','ALLOWED','PLAIN PAPER IN SHEETS','+ / - 5 % in Qty & Value','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-10-29 00:00:00','N','2019-10-29 00:00:00','','','','','2019-12-10 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,11,0.00,0.00,0.00,'REAM LABEL AND BUNDLE LABEL TO BE PRINTED AS MENTIONED IN PO','','','','N',0.00000),(3,19,0,'2019-10-29 00:00:00',2,'2019-10-29 00:00:00',279,28,'GOPAKUMAR','PFI-002 / VJPM / 2019-2020','2019-10-29 00:00:00','1002/10/2019 DT 21st Oct2019','2019-10-29 00:00:00',22,12,8,70.50,0.00,1.50,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'DEC 2019','ALLOWED','ALLOWED','COLOUR PRINTING PAPER','+ / - 5% on Qty & Value','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-10-29 00:00:00','N','2019-10-29 00:00:00','','','','','2019-12-10 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,2,0.00,0.00,0.00,'REAM & BUNDLE LABEL AS PER PO ','','','','N',0.00000),(3,19,0,'2019-10-29 00:00:00',3,'2019-10-29 00:00:00',279,28,'GOPAKUMAR','PFI-003 / VJPM / 2019-2020','2019-10-29 00:00:00','1006/10/2019 DT 21st Oct2019','2019-10-29 00:00:00',22,12,8,70.50,0.00,1.50,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'JAN 2019','ALLOWED','ALLOWED','COLOUR PRINTING PAPER','+ / - 5% on Qty & Value','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-10-29 00:00:00','N','2019-10-29 00:00:00','','','','','2019-12-10 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,2,0.00,0.00,0.00,'REAM LABEL & BUNDLE LABEL AS MENTIONED IN PO','','','','N',0.00000),(1,19,0,'2020-02-20 00:00:00',1,'2019-12-31 00:00:00',279,28,'GOPAKUMAR','PFI-001 / DPM / 2019-2020','2019-12-26 00:00:00','1001/10/2019','2019-12-22 00:00:00',22,12,8,71.00,0.00,1.30,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'JAN2020','ALLOWED','ALLOWED','PLAIN PAPER IN SHEETS','+ / - 5% ON QTY & VALUE','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2020-02-20 00:00:00','N','2019-12-31 00:00:00','','','','','2020-01-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,11,0.00,0.00,0.00,'PRICE VALID UPTO 31/01/2020','INSURANCE TO BE BORNE BY BUYER','INSPECTION CHARGES IF ANY WILL BE BORNE BY BUYER','NO OF CONTAINER  11 X 20FT','N',0.00000),(1,19,0,'2019-12-31 00:00:00',2,'2019-12-31 00:00:00',279,28,'GOPAKUMAR','PFI-002 / DPM / 2019-2020','2019-12-26 00:00:00','1002/10/2019 DT 22.12.2019','2019-12-22 00:00:00',22,12,8,71.00,0.00,1.50,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'JAN2020','ALLOWED','ALLOWED','COLOUR PRINTING PAPER','+ / - 5% ON QTY & VALUE','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-12-31 00:00:00','N','2019-12-31 00:00:00','','','','','2020-01-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,2,0.00,0.00,0.00,'PRICE VALID UPTO 31/01/2020','INSURANCE TO BE BORNE BY BUYER','INSPECTION CHARGES IF ANY WILL BE BORNE BY BUYER','NO OF CONTAINER 2 X 20FT','N',0.00000),(1,19,0,'2019-12-31 00:00:00',3,'2019-12-31 00:00:00',279,28,'GOPAKUMAR','PFI-003 / DPM / 2019-2020','2019-12-26 00:00:00','1006/10/2019 DT 22.12.2019','2019-12-22 00:00:00',22,12,8,71.00,0.00,1.50,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'JAN2020','ALLOWED','ALLOWED','COLOUR PRINTING PAPER','+ / - 5% ON QTY & VALUE','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2019-12-31 00:00:00','N','2019-12-31 00:00:00','','','','','2020-01-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,2,0.00,0.00,0.00,'PRICE VALID UPTO 31/01/2020','INSURANCE TO BE BORNE BY BUYER','INSPECTION CHARGES IF ANY WILL BE BORNE BY BUYER','NO OF CONTAINER 2 X 20FT','N',0.00000),(3,19,0,'2020-01-17 00:00:00',4,'2020-01-14 00:00:00',302,16,'','PFI-004 / VJPM / 2019-2020','2020-01-14 00:00:00','','2020-01-14 00:00:00',53,2,3,71.00,0.00,1.50,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,101,'17/01/2020','ALLOWED','NOT ALLOWED','COLOUR PRINTING PAPER','5%','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2020-01-17 00:00:00','N','2020-01-14 00:00:00','','','','','2020-01-14 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,3,0.00,0.00,0.00,'','','','','N',0.00000),(1,19,0,'2020-04-03 00:00:00',4,'2020-04-03 00:00:00',279,28,'GOPA KUMAR','PFI-004 / DPM / 2019-2020','2020-04-03 00:00:00','1024/03/2020','2020-04-03 00:00:00',22,12,8,75.00,0.00,1.30,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'15.05.2020','ALLOWED','ALLOWED','','+/- 5% both quantity  and value ','','','','','REAM WRAPPED WITH  PRINTED WRAPPER & BUNDLE HDPE','N','2020-04-03 00:00:00','N','2020-04-03 00:00:00','','','','','2020-04-30 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,11,0.00,0.00,0.00,'PRICE VALID UPTO 31/04/2020','INSURANCE TO BE BORNE BY BUYER ','INSPECTION  CHARGES IF ANY WILL BE BORNE BY BUYER','NO OF CONTAINER 11 X 20FT','N',0.00000),(1,20,0,'2020-06-17 00:00:00',1,'2020-06-17 00:00:00',279,28,'MR GOPAKUMAR','PFI-001 / DPM / 2020-2021','2020-06-17 00:00:00','1024/06/2020','2020-06-17 00:00:00',22,12,8,75.00,0.00,1.30,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,117,'JULY / AUGUST 2020','ALLOWED','ALLOWED','PLAIN PAPER IN SHEETS','+ / - 10% on QTY & VALUE','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2020-06-17 00:00:00','N','2020-06-17 00:00:00','','','','','2020-07-31 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,11,0.00,0.00,0.00,'','','','','N',0.00000),(1,20,0,'2020-09-09 00:00:00',2,'2020-09-09 00:00:00',357,16,'REXCY PERERA','PFI-002 / DPM / 2020-2021','2020-09-09 00:00:00','PO 001 DT.02/09/2020','2020-09-09 00:00:00',23,3,14,72.40,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,122,'10/09/2020','ALLOWED','ALLOWED','PLAIN PAPER IN REELS','','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2020-09-09 00:00:00','N','2020-09-09 00:00:00','','','','','2020-09-30 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,0,0.00,0.00,0.00,'','','','','N',0.00000),(1,20,0,'2021-07-06 00:00:00',5,'2021-03-30 00:00:00',433,28,'VIKRAM JUDGE','PFI-005 / DPM / 2020-2021','2021-03-30 00:00:00','1058/03/2021','2021-03-30 00:00:00',64,12,11,73.00,0.00,1.20,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,110,'20/04/2021','ALLOWED','NOT ALLOWED','WOODFREE PAPER','+ / - 10% on Qty / value','','','','','REEL WRAPPED WITH KRAFT & HDPE','N','2021-07-06 00:00:00','N','2021-03-30 00:00:00','','','','','2021-04-30 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,1,0.00,0.00,0.00,'','','','','N',0.00000),(1,21,0,'2021-06-24 00:00:00',1,'2021-06-24 00:00:00',433,16,'Chaminda','PFI-001 / DPM / 2021-2022','2021-06-24 00:00:00','1061/05/2021 Dt.9th May 2021','2021-06-24 00:00:00',72,6,22,73.00,0.00,0.00,0.00,0.00,0.00,2.00,0.00,0.00,0.00,0.00,'',0.0,0.00,0.00,'',0.00,0.0,0.00,'',0.00,0.00,0.00,0.00,0,124,'10/07/2021','ALLOWED','NOT ALLOWED','NEWSPRINT IN SHEETS','+ / - 5% on Qty & Value','','','','','REAM WRAPPED WITH KRAFT & BUNDLE HDPE','N','2021-06-24 00:00:00','N','2021-06-24 00:00:00','','','','','2021-07-15 00:00:00','Buyer','Nomenclature will be as per proforma','Buyer',20,1,0.00,0.00,0.00,'','','','','N',0.00000);
/*!40000 ALTER TABLE `export_invoice_price_approval_header` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-10 11:48:19
