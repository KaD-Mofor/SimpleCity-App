
USE `simple-city-app`;


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

	
INSERT INTO `simple-city-app`.addresses
VALUES (1, "234 Example Ln", "Atlanta", "GA", "USA", "54321"),
	   (2, "432 Brimo ct", "Birchshire", "OT", "UK", "99887");

INSERT INTO `simple-city-app`.customers
VALUES (1, "Darwin", "Nunez", "dnunez@yahoo.com", "(123)444-5555", NOW(), NOW()),
	   (2, "Eliz", "Mofor", "eliz.mofor@gmail.com", "(321)443-4321", NOW(), NOW());

        
INSERT INTO `simple-city-app`.carts
VALUES (1, 2, 220.45, 'pending', "hdjads-asJsaksd-as90sj", 1, 1, NOW(), NOW()),
		(2, 3, 150.59, 'pending', "HJDH-KFHdja-jksdj76chsd", 1, 1, NOW(), NOW());

INSERT INTO `simple-city-app`.cart_items
VALUES (1, 'assets/images/products/Beanie.png', 3, 22.00, 2, 1),
		(2, 'assets/images/products/Jeans.png', 1, 22.00, 1, 1);
