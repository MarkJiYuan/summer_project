-- MySQL dump 10.13  Distrib 8.0.14, for macos10.14 (x86_64)
--
-- Host: localhost    Database: paper
-- ------------------------------------------------------
-- Server version	8.0.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `account` (
  `Account` varchar(45) NOT NULL,
  `Password` varchar(45) DEFAULT NULL,
  `Role` varchar(45) DEFAULT NULL,
  `Email_adr` varchar(45) DEFAULT NULL,
  `Visible` int(11) DEFAULT '1',
  PRIMARY KEY (`Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('account=\"submitter\"','password=\"submitter\"','role=\"submitter\"','email_adr=\"sub@sem.com\"',1),('eic','eic','editorinchief','eic@sem.com',1),('jinshan','777','AE','329106107@qq.com',1),('submitter','submitter','submitter','sub@sem.com',1),('wx','456','Editor','213@234.com',1),('zhanghao','zhanghao','submitter','123@123.com',1),('zjy','456','Reviewer','123@123.com',1);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ae`
--

DROP TABLE IF EXISTS `ae`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ae` (
  `Account` varchar(45) NOT NULL,
  `姓名` varchar(45) NOT NULL,
  `机构` varchar(45) NOT NULL,
  `领域` varchar(45) NOT NULL,
  `visible` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ae`
--

LOCK TABLES `ae` WRITE;
/*!40000 ALTER TABLE `ae` DISABLE KEYS */;
INSERT INTO `ae` VALUES ('jinshan','山本','北华大学','服务器','1');
/*!40000 ALTER TABLE `ae` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `投稿次数` int(11) NOT NULL,
  `题目` varchar(45) NOT NULL,
  `摘要` varchar(500) NOT NULL,
  `关键词` varchar(45) NOT NULL,
  `作者` varchar(45) NOT NULL,
  `提交时间` varchar(45) DEFAULT NULL,
  `附件路径` varchar(300) DEFAULT NULL,
  `审阅状态1` varchar(450) NOT NULL DEFAULT '待处理' COMMENT '给作者看的',
  `审阅状态2` varchar(450) NOT NULL DEFAULT '待处理' COMMENT '给内部人员看的',
  `visible` varchar(45) NOT NULL DEFAULT '1' COMMENT '1可见；0不可见',
  `AE` varchar(45) DEFAULT NULL,
  `reviewers` varchar(45) DEFAULT NULL,
  `changeable` varchar(45) NOT NULL,
  `account` varchar(45) NOT NULL,
  PRIMARY KEY (`id`,`投稿次数`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'1号文章','你是大母猪','IS/POM','7/8','2019-07-09 16:21:58','/Users/zhengjiyuan/Desktop','待处理','待处理','1',NULL,NULL,'1','zjy'),(2,1,'1号文章','做个实验','是垃圾','7/8','2019-07-09 16:23:25','/Users/zhengjiyuan/Desktop','已完成','决定发表','1','jinshan','jinshan ,zjy','0','zjy'),(2,3,'1号文章','做个实验','IS/POM','7/8','2019-07-10 11:23:22','/Users/zhengjiyuan/Desktop','待处理','待处理','1',NULL,NULL,'1','zjy'),(2,5,'德丽莎','开个玩笑','IS/POM','7/8','2019-07-10 11:25:00','/Users/zhengjiyuan/Desktop','待处理','已完成','1',NULL,NULL,'1','lalala'),(2,6,'德丽莎','开个玩笑','IS/POM','9/10','2019-07-10 11:25:58','/Users/zhengjiyuan/Desktop','待处理','待处理','1',NULL,NULL,'1','lalala'),(6,1,'太紧张了','大觉寺都是','可怕 恐怖','11','2019-07-10 15:38:54','/Users/zhengjiyuan/Desktop/SummerProject/papersubmission/upload/太紧张了/','待处理','待处理','1',NULL,NULL,'0','submitter'),(7,1,'保存稿件','撒的','撒','11','2019-07-10 15:48:17','/Users/zhengjiyuan/Desktop/SummerProject/papersubmission/upload/保存稿件/','待处理','待处理','1',NULL,NULL,'1','submitter'),(8,1,'再做个测试','打击哦','啊随机哦','12','2019-07-10 16:41:54','/Users/zhengjiyuan/Desktop/SummerProject/papersubmission/upload/再做个测试/','待处理','待处理','1',NULL,NULL,'1','submitter'),(9,1,'学术垃圾','学术垃圾','垃圾','13','2019-07-10 16:43:37','/Users/zhengjiyuan/Desktop/SummerProject/papersubmission/upload/学术垃圾/','待处理','待处理','1',NULL,NULL,'1','zhanghao'),(10,1,'test110','test110','test','11','2019-07-11 11:05:52','/Users/zhengjiyuan/Desktop/SummerProject/papersubmission/upload/test110/','待处理','待处理','1',NULL,NULL,'1','submitter');
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `author` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `作者` varchar(45) NOT NULL,
  `机构` varchar(45) NOT NULL,
  `Email_adr` varchar(45) DEFAULT NULL,
  `visible` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES (7,'zjy','清华','123@123.com','1'),(8,'hbt','清华','234@234.com','1'),(9,'芽衣','女武神','123@123.com','1'),(10,'琪亚娜','天命','234@234.com','1'),(11,'郑吉源','无名机构','破烂邮箱','1'),(12,'啦啦啦','无名机构','破烂邮箱','1'),(13,'张皓','无名机构','破烂邮箱','1');
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editor`
--

DROP TABLE IF EXISTS `editor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `editor` (
  `Account` varchar(45) NOT NULL,
  `姓名` varchar(45) DEFAULT NULL,
  `visible` varchar(45) DEFAULT '1',
  PRIMARY KEY (`Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editor`
--

LOCK TABLES `editor` WRITE;
/*!40000 ALTER TABLE `editor` DISABLE KEYS */;
INSERT INTO `editor` VALUES ('wx','微笑','1');
/*!40000 ALTER TABLE `editor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviewers`
--

DROP TABLE IF EXISTS `reviewers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reviewers` (
  `Account` varchar(45) NOT NULL,
  `姓名` varchar(45) NOT NULL,
  `机构` varchar(45) NOT NULL,
  `领域` varchar(45) DEFAULT NULL,
  `visible` varchar(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`Account`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviewers`
--

LOCK TABLES `reviewers` WRITE;
/*!40000 ALTER TABLE `reviewers` DISABLE KEYS */;
INSERT INTO `reviewers` VALUES ('zjy','大母猪','清华大学','干垃圾','1');
/*!40000 ALTER TABLE `reviewers` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-11 11:53:52
