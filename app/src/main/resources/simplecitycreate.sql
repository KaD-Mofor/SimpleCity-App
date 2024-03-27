DROP DATABASE IF EXISTS `simple-city-app`;
CREATE DATABASE `simple-city-app`;
USE `simple-city-app`;
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `first_name` varchar(255) DEFAULT NULL,
    `last_name` varchar(255) DEFAULT NULL,
    `email` varchar(255) DEFAULT NULL,
    `phone` varchar(255) DEFAULT NULL,
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `addresses`;
CREATE TABLE `addresses` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `street` varchar(255) DEFAULT NULL,
    `city` varchar(255) DEFAULT NULL,
    `state` varchar(255) DEFAULT NULL,
    `country` varchar(255) DEFAULT NULL,
    `zip_code` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `total_quantity` integer(11) DEFAULT NULL,
    `total_price` decimal(19, 2) DEFAULT NULL,
    `status` ENUM ('pending', 'ordered', 'canceled'),
    `order_tracking_number` varchar(255) DEFAULT NULL,
    `address_id` bigint NOT NULL,
    `customer_id` bigint NOT NULL,
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY (`customer_id`),
    CONSTRAINT FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
    KEY (`address_id`),
    CONSTRAINT FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories`(
	`id` bigint(20),
    `category_name` varchar(255),
    PRIMARY KEY (`id`)
)ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP  TABLE IF EXISTS `products`;
CREATE TABLE `products` (
	`id` bigint NOT NULL auto_increment,
    `sku` varchar(255),
    `name` varchar(255),
    `description` varchar(255),
    `unit_price` decimal(13,2),
    `image_url` varchar(255),
    `active` bit(1),
    `units_in_stock` int(11),
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    `category_id` bigint(20),
    PRIMARY KEY(`id`),
    KEY (`category_id`),
    CONSTRAINT FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `image_url` varchar(255) DEFAULT NULL,
    `quantity` int(11) DEFAULT NULL,
    `unit_price` decimal(19,2) DEFAULT NULL,
    `product_id` bigint NOT NULL,
    `cart_id` bigint NOT NULL,
    PRIMARY KEY (`id`),
    KEY (`cart_id`),
    CONSTRAINT FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
    KEY (`product_id`),
    CONSTRAINT FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

