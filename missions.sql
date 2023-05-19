-- phpMyAdmin SQL Dump
-- version 6.0.0-dev+20230518.d362f79fa7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 19, 2023 בזמן 10:43 AM
-- גרסת שרת: 10.4.24-MariaDB
-- PHP Version: 8.1.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `missions`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `admin`
--

CREATE TABLE `admin` (
  `Username` varchar(20) NOT NULL,
  `Password` int(20) NOT NULL,
  `Admin` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `admin`
--

INSERT INTO `admin` (`Username`, `Password`, `Admin`) VALUES
('moshe', 123456, 1);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `misions`
--

CREATE TABLE `misions` (
  `ID` int(11) NOT NULL,
  `Description` varchar(1000) NOT NULL,
  `Done` varchar(5) NOT NULL,
  `Priority` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `misions`
--

INSERT INTO `misions` (`ID`, `Description`, `Done`, `Priority`) VALUES
(1, 'gkjhsgkjhkshgkhsgkjhsgksdjhgkjhskjhgkdכלחיכלחיעלחי מלחלחילח נחמנחינןחינלחי ינלחינלחינ ךלחיךלחי ךלחמךלחיח  ', 'true', 'medium'),
(2, 'jhsihdhagskjashdgkasdjhfagksdjfhasdkjfhasgdkfajdhgfkJDFHgksjdfhGSKDJFSGKDFAJFDGKJFHKGJSH', 'false', 'medium'),
(3, 'sakjhgwkejhfGKJSDHFGAKSEHDFskEHFGAKSJDHFAKSJHDFGkjshdFKzxDVBKjDBGLZKFGHLXSKJFGDHLKJH', 'true', 'medium'),
(4, 'mnvmnbvjhvjhgmgjhvjhgfkghcfhgfjkhgchgfkhgchgfcjhgfjhgfhgfjhf', 'false', 'low'),
(5, 'sekjhfdgksjfhbgkajdhcdbdajkchkajhdbtkjhskjhdbkjhdskjhbk', 'false', 'high'),
(6, 'jhewiuehrgksjchgkjahdckjehgkacjehkejhbkqjchbkjqrh', 'false', 'low'),
(7, 'zsopidufcpaoriucfnapreoifgcuanreloicgfuemrlicguserncliauedcfhnladkufcghnaldifcuhpeb', 'true', 'medium'),
(8, 'kjuvliugclkuydkiuyflkuygvkuyg lkuigyckjhbliugckjygclkjhgc,djhgdc', 'false', 'high'),
(9, ',kuhvlkuylkuyfkuhfjgcjmhvb mbhjgkjhglkuydmjhgvkfuhgv ,jygdc', 'true', 'medium'),
(10, ',kuhvlkuylkuyfkuhfjgcjmhvb mbhjgkjhglkuydmjhgvkfuhgv ,jygdc', 'false', 'high');

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `misions`
--
ALTER TABLE `misions`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `misions`
--
ALTER TABLE `misions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
