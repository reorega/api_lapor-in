-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.30 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for lapor-in
CREATE DATABASE IF NOT EXISTS `lapor-in` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `lapor-in`;

-- Dumping structure for table lapor-in.instansi
CREATE TABLE IF NOT EXISTS `instansi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_instansi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table lapor-in.instansi: ~0 rows (approximately)
INSERT INTO `instansi` (`id`, `nama_instansi`) VALUES
	(1, 'Pemadam Kebakaran');

-- Dumping structure for table lapor-in.laporan
CREATE TABLE IF NOT EXISTS `laporan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `judul_laporan` varchar(100) DEFAULT NULL,
  `deskripsi_laporan` varchar(250) DEFAULT NULL,
  `tanggal` timestamp NULL DEFAULT NULL,
  `lokasi` varchar(250) DEFAULT NULL,
  `foto_laporan` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `instansi_id` int DEFAULT NULL,
  `status` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `FK_laporan_instansi` (`instansi_id`),
  CONSTRAINT `FK_laporan_instansi` FOREIGN KEY (`instansi_id`) REFERENCES `instansi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table lapor-in.laporan: ~0 rows (approximately)
INSERT INTO `laporan` (`id`, `judul_laporan`, `deskripsi_laporan`, `tanggal`, `lokasi`, `foto_laporan`, `instansi_id`, `status`) VALUES
	(1, 'Kebakaran', 'Kebakaran Rumah', '2025-05-04 23:34:01', 'Barehan', '1745961608443.png', 1, 1),
	(2, 'Banjir', 'Banjir 1M', '2025-05-05 02:12:48', 'Kembang', '1745961608443.png', 1, 2),
	(3, 'Gempa Bumi', 'Gempa 5 Sr', '2025-05-05 03:00:16', 'Tanjungsari', '1745961608443.png', 1, 3),
	(4, 'Sarang Tawon', NULL, '2005-05-24 17:00:00', 'Candi', '1746422845825.jpg', 1, NULL),
	(5, 'Sarang Tawon', 'Ada sarang tawon', '2005-05-24 17:00:00', 'Candi', '1746422928026.jpg', 1, NULL),
	(6, 'Sarang Tawon', 'Ada sarang tawon', '2005-05-24 17:00:00', 'Candi', '1746422983627.jpg', 1, 1),
	(7, 'ijfiivjrijirjgirjgirjgirjgirjgijrigjr', 'isfihrijfirjfijrfirjfijrifjirjfi', '2005-05-24 17:00:00', 'jfirfjhsuhfuhshfsuhuhushs', '1746426271570.jpg', 1, 1),
	(8, 'Ada Bom Nuklir', 'Ada Bom Nuklir Di Genteng Rumah Saya', '2005-05-24 17:00:00', 'Tegalombo ', '1746431150724.jpg', 1, 1);

-- Dumping structure for table lapor-in.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_lengkap` varchar(50) NOT NULL,
  `hp` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `instansi_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table lapor-in.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `nama_lengkap`, `hp`, `email`, `password`, `instansi_id`, 'role') VALUES
	(1, 'Budi Santoso', '081234567890', 'budi@example.com', 'QnVkaUAxMjM0', NULL,'user', );
	(1, 'admin', '081234567890', 'admin@gmail.com', 'YWRtaW4xMjM=', NULL,'admin', );

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
