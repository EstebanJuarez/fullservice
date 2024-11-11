-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-07-2024 a las 06:06:33
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fullservice`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_productos`
--

CREATE TABLE `img_productos` (
  `id` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `ruta` varchar(255) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `img_productos`
--

INSERT INTO `img_productos` (`id`, `id_producto`, `ruta`, `descripcion`, `createdAt`, `updatedAt`) VALUES
(1, 8, '1720641353759', 'Imagen 1', '2024-07-10 19:55:53', '2024-07-10 19:55:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instalaciones_precios`
--

CREATE TABLE `instalaciones_precios` (
  `id` int(11) NOT NULL,
  `instalacion_3000` varchar(150) NOT NULL,
  `instalacion_4500` varchar(150) NOT NULL,
  `instalacion_6000` varchar(150) NOT NULL,
  `metro_caño_3000` varchar(150) NOT NULL,
  `metro_caño_4500` varchar(150) NOT NULL,
  `metro_caño_6000` varchar(150) NOT NULL,
  `altura` varchar(150) NOT NULL,
  `pase_viga` varchar(150) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `instalaciones_precios`
--

INSERT INTO `instalaciones_precios` (`id`, `instalacion_3000`, `instalacion_4500`, `instalacion_6000`, `metro_caño_3000`, `metro_caño_4500`, `metro_caño_6000`, `altura`, `pase_viga`, `createdAt`, `updatedAt`) VALUES
(1, '38.000', '46.000', '54.000', '10.000', '12.000', '13.000', '2.000', '2.000', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `detalles` varchar(255) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `descripcion`, `detalles`, `precio`, `stock`, `createdAt`, `updatedAt`) VALUES
(3, 'Aire negro', '', 0.00, 0, NULL, NULL),
(6, 'Unidad exterior', '', 0.00, 0, NULL, NULL),
(7, 'Nuevo airess', '', 0.00, 0, NULL, NULL),
(8, 'Test', 'detale 1@\r\ndetakke 2', 1800.00, 2, '2024-07-10 19:55:53', '2024-07-10 19:55:53'),
(9, 'Test', 'detale 1@\r\ndetakke 2', 1800.00, 2, '2024-07-10 19:55:53', '2024-07-10 19:55:53'),
(10, 'Test', 'detale 1@\r\ndetakke 2', 1800.00, 2, '2024-07-10 19:55:53', '2024-07-10 19:55:53'),
(11, 'Test', 'detale 1@\r\ndetakke 2', 1800.00, 2, '2024-07-10 19:55:53', '2024-07-10 19:55:53'),
(12, 'Test', 'detale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\ndetale 1@\n', 1800.00, 2, '2024-07-10 19:55:53', '2024-07-10 19:55:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reparaciones_precios`
--

CREATE TABLE `reparaciones_precios` (
  `id` int(11) NOT NULL,
  `electrico_desde` varchar(50) NOT NULL,
  `electrico_hasta` varchar(50) NOT NULL,
  `gas_3000` varchar(50) NOT NULL,
  `nitro_3000` varchar(50) NOT NULL,
  `gas_4500` varchar(50) NOT NULL,
  `nitro_4500` varchar(50) NOT NULL,
  `gas_6000` varchar(50) NOT NULL,
  `nitro_6000` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `reparaciones_precios`
--

INSERT INTO `reparaciones_precios` (`id`, `electrico_desde`, `electrico_hasta`, `gas_3000`, `nitro_3000`, `gas_4500`, `nitro_4500`, `gas_6000`, `nitro_6000`, `createdAt`, `updatedAt`) VALUES
(1, '123', '15.000', '500', '10.000', '12', '11.000', '30.000', '12.000', NULL, '2024-07-10 20:19:11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(900) NOT NULL,
  `role` varchar(50) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(3, 'dani.2014.juarez@gmail.com', '$2b$10$uGwxQlSVuDkuzhxeU4SKpuZ2Ihs0qZrULa3xRzezq9D7K7QlVPZXi', 'admin', '2024-07-10 19:51:59', '2024-07-10 19:51:59');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `img_productos`
--

ALTER TABLE `img_productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `instalaciones_precios`
--
ALTER TABLE `instalaciones_precios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reparaciones_precios`
--
ALTER TABLE `reparaciones_precios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `img_productos`
--
ALTER TABLE `img_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `instalaciones_precios`
--
ALTER TABLE `instalaciones_precios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reparaciones_precios`
--
ALTER TABLE `reparaciones_precios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
