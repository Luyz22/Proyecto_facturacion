-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-11-2025 a las 08:47:45
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_facturacion`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE IF NOT EXISTS `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `tipo_documento` enum('CC','CE','NIT','PAS') NOT NULL,
  `numero_documento` varchar(30) NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `estado` int NOT NULL DEFAULT '1',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `numero_documento` (`numero_documento`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `tipo_documento`, `numero_documento`, `nombres`, `apellidos`, `email`, `telefono`, `direccion`, `estado`, `fecha_creacion`) VALUES
(1, 'CC', '1023456789', 'Pedro', 'Ramírez López', 'carlos.ramirez@example.com', '3201112233', 'Cra 10 #20-30', 1, '2025-11-28 02:44:51'),
(2, 'CC', '9876543210', 'María', 'Gómez Torres', 'maria.gomez@example.com', '3214445566', 'Cll 5 #12-18', 1, '2025-11-28 02:44:51'),
(3, 'CE', 'A1234567', 'Jhon', 'Doe Martínez', 'jhon.doe@example.com', '3157778899', 'Av 30 #45-10', 1, '2025-11-28 02:44:51'),
(4, 'CC', '1002003004', 'Luisa', 'Fernández Ríos', 'luisa.fer@example.com', '3102223344', 'Cll 80 #50-12', 0, '2025-11-28 02:44:51'),
(5, 'NIT', '900123456', 'Empresa Alfa', 'SAS', 'contacto@alfa.com', '6015556677', 'Zona Industrial 12', 1, '2025-11-28 02:44:51'),
(6, 'CC', '1056789023', 'Andrés', 'Pérez Díaz', 'andres.perez@example.com', '3009988776', 'Cll 15 #22-40', 1, '2025-11-28 02:44:51'),
(7, 'PAS', 'P987654', 'Sophie', 'Martins', 'sophie.m@example.com', '3025566778', 'Cra 15 #45-20', 1, '2025-11-28 02:44:51'),
(8, 'CE', 'Z8899001', 'Ricardo', 'Santos Herrera', 'ricardo.santos@example.com', '3114455667', 'Br. La Esperanza', 0, '2025-11-28 02:44:51'),
(9, 'CC', '1122334455', 'Juliana', 'Castro Mora', 'juliana.castro@example.com', '3132211445', 'Cll 40 #12-60', 1, '2025-11-28 02:44:51'),
(10, 'NIT', '901778899', 'Servicios Beta', 'LTDA', 'info@beta.com', '6048899001', 'Parque Empresarial 3', 0, '2025-11-28 02:44:51'),
(11, 'CC', '131411143', 'Hector', 'Perez Gomez', 'perez@gmail.com', '3145157622', NULL, 1, '2025-11-28 07:05:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

DROP TABLE IF EXISTS `facturas`;
CREATE TABLE IF NOT EXISTS `facturas` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `numero_factura` varchar(20) NOT NULL,
  `fecha` date NOT NULL,
  `subtotal` decimal(12,2) NOT NULL,
  `impuesto` decimal(12,2) NOT NULL,
  `total` decimal(12,2) NOT NULL,
  `metodo_pago` enum('EFECTIVO','TARJETA','TRANSFERENCIA','OTRO') CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL DEFAULT 'EFECTIVO',
  `estado` enum('PENDIENTE','PAGADA','ANULADA') DEFAULT 'PENDIENTE',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `estado_general` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_factura`),
  KEY `id_cliente` (`id_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `facturas`
--

INSERT INTO `facturas` (`id_factura`, `id_cliente`, `numero_factura`, `fecha`, `subtotal`, `impuesto`, `total`, `metodo_pago`, `estado`, `fecha_creacion`, `estado_general`) VALUES
(1, 1, 'FAC-1001', '2025-11-01', 250000.00, 47500.00, 297500.00, 'EFECTIVO', 'PAGADA', '2025-11-29 01:48:21', 0),
(2, 2, 'FAC-1002', '2025-11-03', 180000.00, 34200.00, 214200.00, 'EFECTIVO', 'PENDIENTE', '2025-11-29 01:48:21', 1),
(3, 3, 'FAC-1003', '2025-11-05', 325000.00, 61750.00, 386750.00, 'EFECTIVO', 'PAGADA', '2025-11-29 01:48:21', 1),
(4, 5, 'FAC-1004', '2025-11-06', 900000.00, 171000.00, 1071000.00, 'EFECTIVO', 'PENDIENTE', '2025-11-29 01:48:21', 1),
(5, 6, 'FAC-1005', '2025-11-07', 120000.00, 22800.00, 142800.00, 'EFECTIVO', 'PAGADA', '2025-11-29 01:48:21', 1),
(6, 7, 'FAC-1006', '2025-11-10', 450000.00, 85500.00, 535500.00, 'EFECTIVO', 'PENDIENTE', '2025-11-29 01:48:21', 1),
(7, 9, 'FAC-1007', '2025-11-11', 210000.00, 39900.00, 249900.00, 'EFECTIVO', 'PAGADA', '2025-11-29 01:48:21', 1),
(8, 1, 'FAC-1008', '2025-11-12', 380000.00, 72200.00, 452200.00, 'EFECTIVO', 'PAGADA', '2025-11-29 01:48:21', 0),
(9, 10, 'FAC-1009', '2025-11-13', 760000.00, 144400.00, 904400.00, 'EFECTIVO', 'ANULADA', '2025-11-29 01:48:21', 1),
(10, 11, 'FAC-1010', '2025-11-14', 150000.00, 28500.00, 178500.00, 'EFECTIVO', 'PENDIENTE', '2025-11-29 01:48:21', 1),
(11, 5, 'FAC-1313', '2025-11-29', 43697.48, 8302.52, 52000.00, 'EFECTIVO', 'PENDIENTE', '2025-11-29 06:50:22', 1),
(12, 11, 'FAC-6421', '2025-11-29', 210084.03, 39915.97, 250000.00, 'EFECTIVO', 'PAGADA', '2025-11-29 07:00:39', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `estado` int NOT NULL DEFAULT '1',
  `fecha_generacion` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rol`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id_rol`, `nombre`, `estado`, `fecha_generacion`) VALUES
(1, 'Administrador', 1, '2025-11-29 02:21:01'),
(2, 'Usuario', 1, '2025-11-29 02:21:01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `password` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `rol` int NOT NULL DEFAULT '1' COMMENT 'Admin = 1 Usuario = 2',
  `creado_en` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `estado` int NOT NULL DEFAULT '1' COMMENT 'Desactivado = 0 Activo = 1',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `password`, `email`, `rol`, `creado_en`, `estado`) VALUES
(1, 'Luis Chaparro', '123', 'Luis@hotmail.com', 1, '2025-11-27 19:46:12', 1),
(2, 'Sebastian Agredo', '123', 'sebastian@gmail.com', 1, '2025-11-29 07:23:54', 1),
(3, 'Claros', '123', 'claros@gmail.com', 1, '2025-11-29 07:24:38', 1);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
