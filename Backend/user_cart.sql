CREATE TABLE `user_cart` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(200) NOT NULL COLLATE 'latin1_swedish_ci',
	`cost` INT(50) NOT NULL,
	`currency` VARCHAR(10) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=47
;