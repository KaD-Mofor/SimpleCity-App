DROP DATABASE IF EXISTS `simple-city-app`;
CREATE DATABASE `simple-city-app`;
USE `simple-city-app`;
DROP TABLE IF EXISTS `countries`;
CREATE TABLE `countries` (
    `country_id` bigint NOT NULL AUTO_INCREMENT,
    `country` varchar(255) DEFAULT NULL,
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    PRIMARY KEY (`country_id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
    `customer_id` bigint NOT NULL AUTO_INCREMENT,
    `address` varchar(255) DEFAULT NULL,
    `create_date` datetime(6) DEFAULT NULL,
    `customer_first_name` varchar(255) DEFAULT NULL,
    `customer_last_name` varchar(255) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    `phone` varchar(255) DEFAULT NULL,
    `postal_code` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`customer_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
    `cart_id` bigint NOT NULL AUTO_INCREMENT,
    `package_price` decimal(19, 2) DEFAULT NULL,
    `party_size` int DEFAULT NULL,
    `status` ENUM ('pending', 'ordered', 'canceled'),
    `order_tracking_number` varchar(255) DEFAULT NULL,
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    `customer_id` bigint NOT NULL,
    PRIMARY KEY (`cart_id`),
    KEY (`customer_id`),
    CONSTRAINT FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE `cart_items` (
    `cart_item_id` bigint NOT NULL AUTO_INCREMENT,
    `create_date` datetime(6) DEFAULT NULL,
    `last_update` datetime(6) DEFAULT NULL,
    `cart_id` bigint NOT NULL,
    PRIMARY KEY (`cart_item_id`),
    KEY (`cart_id`),
    CONSTRAINT FOREIGN KEY (`cart_id`) REFERENCES `carts` (`cart_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP TABLE IF EXISTS `product_categories`;
CREATE TABLE `product_categories`(
	`category_id` bigint(20),
    `category_name` varchar(255),
    PRIMARY KEY (`category_id`)
)ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;
DROP  TABLE IF EXISTS `products`;
CREATE TABLE `products` (
	`product_id` bigint NOT NULL auto_increment,
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
    PRIMARY KEY(`product_id`),
    KEY (`category_id`),
    CONSTRAINT FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`)
) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO `simple-city-app`.product_categories
VALUES (1, 'Clothes'),
	(2, 'Toys'),
    (3, 'Electronics');
INSERT INTO `simple-city-app`.products
VALUES (1, '5479482JK849BV', 'High Waist Distressed Jeans', 'Hot button-up high waist distressed jeans',25.00, 'assets/images/products/Jeans.png',1,25,NOW(), NOW(),1),
		(2, '7346293JSG80', 'Beanie', 'I Believe Beanie hat',22.00, 'assets/images/products/Beanie.png',1,25,NOW(), NOW(),1),
		(3, '700Y6293JSU98', 'Reader', 'Interactive kid reading toy',18.50, 'assets/images/products/Reader.png',1,50,NOW(), NOW(),3),
		(4, '536732YUD0932', 'Kids Sleeveless', 'Active sleveless kids\' top and pants',15.50, 'assets/images/products/kids sleeveless.png',1,50,NOW(), NOW(),1),
		(5, '7346UHG476593', 'Learning Cards', 'YoYo Learning cards for kids',18.00, 'assets/images/products/YoYo_cards.png',1,25,NOW(), NOW(),2),
		(6, '700Y6293POU98', 'High Cut Jeans', 'High waisted distressed light blue Jeans',26.00, 'assets/images/products/High_Cut_Jeans.png',1,25,NOW(), NOW(),1),
		(7, '536732YUD0932', 'Customed Onesies', 'Personalized baby onesies',28.00, 'assets/images/products/Personalized_Onesie.png',1,50,NOW(), NOW(),1),
		(8, '536092YUD0932', 'Freedom T-shirt', 'What is freedom T-Shirt in black',35.00, 'assets/images/products/Freedom_T-shirt.png',1,50,NOW(), NOW(),1);
INSERT INTO `simple-city-app`.countries
VALUES (1, 'U.S', NOW(), NOW()),
    (2, 'UK', NOW(), NOW()),
    (3, 'Canada', NOW(), NOW());
INSERT INTO `simple-city-app`.customers
VALUES (
        1,
        "123 Easy St",
        default,
        "John",
        "Doe",
        default,
        "(555)555-5555",
        "55555"
    );
INSERT INTO `simple-city-app`.carts
VALUES (0, 0, 1, 'pending', default, default, default, 1);
