# ************************************************************
# Sequel Pro SQL dump
# Version 4096
#
# http://www.sequelpro.com/
# http://code.google.com/p/sequel-pro/
#
# Host: localhost (MySQL 5.5.29)
# Database: seon
# Generation Time: 2013-07-28 17:14:32 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table surfers
# ------------------------------------------------------------

DROP TABLE IF EXISTS `surfers`;

CREATE TABLE `surfers` (
  `number` int(11) DEFAULT NULL,
  `firstName` text,
  `lastName` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `surfers` WRITE;
/*!40000 ALTER TABLE `surfers` DISABLE KEYS */;

INSERT INTO `surfers` (`number`, `firstName`, `lastName`)
VALUES
	(1,'Kelly','Slater'),
	(2,'Joel','Parkinson'),
	(3,'Mick','Fanning'),
	(4,'John John','Florence'),
	(5,'Dane','Reynolds');

/*!40000 ALTER TABLE `surfers` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
