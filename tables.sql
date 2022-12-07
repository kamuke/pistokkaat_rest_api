DROP DATABASE if EXISTS pistokkaat;
CREATE DATABASE pistokkaat;

USE pistokkaat;

DROP TABLE if EXISTS province;
CREATE TABLE province
(
	province_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL,
	PRIMARY KEY (province_id)
);

DROP TABLE if EXISTS municipality;
CREATE TABLE municipality
(
	municipality_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(40) NOT NULL,
	province_id INT NOT NULL,
	PRIMARY KEY (municipality_id),
	FOREIGN KEY (province_id) REFERENCES province(province_id)
);

DROP TABLE if EXISTS delivery;
CREATE TABLE delivery
(
	delivery_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(60) NOT NULL,
	PRIMARY KEY (delivery_id)
);

DROP TABLE if EXISTS user;
CREATE TABLE user
(
	user_id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(60) NOT NULL,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(80) NOT NULL,
	municipality_id INT NOT NULL,
	role INT NOT NULL DEFAULT 1,
	PRIMARY KEY (user_id),
	FOREIGN KEY (municipality_id) REFERENCES municipality(municipality_id),
	UNIQUE (email),
	UNIQUE (username)
);

DROP TABLE if EXISTS userlikes;
CREATE TABLE userlikes
(
	liker_id INT NOT NULL,
	liked_id INT NOT NULL,
	PRIMARY KEY (liker_id, liked_id),
	FOREIGN KEY (liker_id) REFERENCES User(user_id),
	FOREIGN KEY (liked_id) REFERENCES User(user_id)
);


DROP TABLE if EXISTS plant;
CREATE TABLE plant
(
	plant_id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(200) NOT NULL,
	price INT NOT NULL,
	imagename VARCHAR(280) NOT NULL,
	description VARCHAR(280) NOT NULL,
	instruction VARCHAR(280) NOT NULL,
	user_id INT NOT NULL,
	created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	edited TIMESTAMP,
	PRIMARY KEY (plant_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE if EXISTS plantdelivery;
CREATE TABLE plantdelivery
(
	plant_id INT NOT NULL,
	delivery_id INT NOT NULL,
	PRIMARY KEY (plant_id, delivery_id),
	FOREIGN KEY (plant_id) REFERENCES plant(plant_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (delivery_id) REFERENCES delivery(delivery_id)
);

DROP TABLE if EXISTS plantfavourites;
CREATE TABLE plantfavourites
(
	user_id INT NOT NULL,
	plant_id INT NOT NULL,
	PRIMARY KEY (user_id, plant_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (plant_id) REFERENCES plant(plant_id)
);

DROP TABLE if EXISTS comment;
CREATE TABLE comment
(
	comment_id INT NOT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	plant_id INT NOT NULL,
	comment VARCHAR(280) NOT NULL,
	created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (comment_id),
	FOREIGN KEY (user_id) REFERENCES user(user_id),
	FOREIGN KEY (plant_id) REFERENCES plant(plant_id)
);

INSERT INTO province(name) VALUES('Uusimaa');
INSERT INTO province(name) VALUES('Varsinais-Suomi');
INSERT INTO province(name) VALUES('Satakunta');
INSERT INTO province(name) VALUES('Kanta-Häme');
INSERT INTO province(name) VALUES('Pirkanmaa');
INSERT INTO province(name) VALUES('Päijät-Häme');
INSERT INTO province(name) VALUES('Kymenlaakso');
INSERT INTO province(name) VALUES('Etelä-Karjala');
INSERT INTO province(name) VALUES('Etelä-Savo');
INSERT INTO province(name) VALUES('Pohjois-Savo');
INSERT INTO province(name) VALUES('Pohjois-Karjala');
INSERT INTO province(name) VALUES('Keski-Suomi');
INSERT INTO province(name) VALUES('Etelä-Pohjanmaa');
INSERT INTO province(name) VALUES('Pohjanmaa');
INSERT INTO province(name) VALUES('Keski-Pohjanmaa');
INSERT INTO province(name) VALUES('Pohjois-Pohjanmaa');
INSERT INTO province(name) VALUES('Kainuu');
INSERT INTO province(name) VALUES('Lappi');
INSERT INTO province(name) VALUES('Ahvenanmaa');

INSERT INTO municipality(name,province_id) VALUES ('Askola',1);
INSERT INTO municipality(name,province_id) VALUES ('Espoo',1);
INSERT INTO municipality(name,province_id) VALUES ('Hanko',1);
INSERT INTO municipality(name,province_id) VALUES ('Helsinki',1);
INSERT INTO municipality(name,province_id) VALUES ('Vantaa',1);
INSERT INTO municipality(name,province_id) VALUES ('Hyvinkää',1);
INSERT INTO municipality(name,province_id) VALUES ('Inkoo',1);
INSERT INTO municipality(name,province_id) VALUES ('Järvenpää',1);
INSERT INTO municipality(name,province_id) VALUES ('Karkkila',1);
INSERT INTO municipality(name,province_id) VALUES ('Kauniainen',1);
INSERT INTO municipality(name,province_id) VALUES ('Kerava',1);
INSERT INTO municipality(name,province_id) VALUES ('Kirkkonummi',1);
INSERT INTO municipality(name,province_id) VALUES ('Lapinjärvi',1);
INSERT INTO municipality(name,province_id) VALUES ('Loviisa',1);
INSERT INTO municipality(name,province_id) VALUES ('Lohja',1);
INSERT INTO municipality(name,province_id) VALUES ('Myrskylä',1);
INSERT INTO municipality(name,province_id) VALUES ('Mäntsälä',1);
INSERT INTO municipality(name,province_id) VALUES ('Nurmijärvi',1);
INSERT INTO municipality(name,province_id) VALUES ('Pornainen',1);
INSERT INTO municipality(name,province_id) VALUES ('Pukkila',1);
INSERT INTO municipality(name,province_id) VALUES ('Porvoo',1);
INSERT INTO municipality(name,province_id) VALUES ('Raasepori',1);
INSERT INTO municipality(name,province_id) VALUES ('Sipoo',1);
INSERT INTO municipality(name,province_id) VALUES ('Siuntio',1);
INSERT INTO municipality(name,province_id) VALUES ('Tuusula',1);
INSERT INTO municipality(name,province_id) VALUES ('Vihti',1);
INSERT INTO municipality(name,province_id) VALUES ('Aura',2);
INSERT INTO municipality(name,province_id) VALUES ('Kaarina',2);
INSERT INTO municipality(name,province_id) VALUES ('Koski Tl',2);
INSERT INTO municipality(name,province_id) VALUES ('Kustavi',2);
INSERT INTO municipality(name,province_id) VALUES ('Kemiönsaari',2);
INSERT INTO municipality(name,province_id) VALUES ('Laitila',2);
INSERT INTO municipality(name,province_id) VALUES ('Lieto',2);
INSERT INTO municipality(name,province_id) VALUES ('Loimaa',2);
INSERT INTO municipality(name,province_id) VALUES ('Parainen',2);
INSERT INTO municipality(name,province_id) VALUES ('Marttila',2);
INSERT INTO municipality(name,province_id) VALUES ('Masku',2);
INSERT INTO municipality(name,province_id) VALUES ('Mynämäki',2);
INSERT INTO municipality(name,province_id) VALUES ('Naantali',2);
INSERT INTO municipality(name,province_id) VALUES ('Nousiainen',2);
INSERT INTO municipality(name,province_id) VALUES ('Oripää',2);
INSERT INTO municipality(name,province_id) VALUES ('Paimio',2);
INSERT INTO municipality(name,province_id) VALUES ('Pyhäranta',2);
INSERT INTO municipality(name,province_id) VALUES ('Pöytyä',2);
INSERT INTO municipality(name,province_id) VALUES ('Raisio',2);
INSERT INTO municipality(name,province_id) VALUES ('Rusko',2);
INSERT INTO municipality(name,province_id) VALUES ('Salo',2);
INSERT INTO municipality(name,province_id) VALUES ('Sauvo',2);
INSERT INTO municipality(name,province_id) VALUES ('Somero',2);
INSERT INTO municipality(name,province_id) VALUES ('Taivassalo',2);
INSERT INTO municipality(name,province_id) VALUES ('Turku',2);
INSERT INTO municipality(name,province_id) VALUES ('Uusikaupunki',2);
INSERT INTO municipality(name,province_id) VALUES ('Vehmaa',2);
INSERT INTO municipality(name,province_id) VALUES ('Eura',3);
INSERT INTO municipality(name,province_id) VALUES ('Eurajoki',3);
INSERT INTO municipality(name,province_id) VALUES ('Harjavalta',3);
INSERT INTO municipality(name,province_id) VALUES ('Huittinen',3);
INSERT INTO municipality(name,province_id) VALUES ('Jämijärvi',3);
INSERT INTO municipality(name,province_id) VALUES ('Kankaanpää',3);
INSERT INTO municipality(name,province_id) VALUES ('Karvia',3);
INSERT INTO municipality(name,province_id) VALUES ('Kokemäki',3);
INSERT INTO municipality(name,province_id) VALUES ('Merikarvia',3);
INSERT INTO municipality(name,province_id) VALUES ('Nakkila',3);
INSERT INTO municipality(name,province_id) VALUES ('Pomarkku',3);
INSERT INTO municipality(name,province_id) VALUES ('Pori',3);
INSERT INTO municipality(name,province_id) VALUES ('Rauma',3);
INSERT INTO municipality(name,province_id) VALUES ('Siikainen',3);
INSERT INTO municipality(name,province_id) VALUES ('Säkylä',3);
INSERT INTO municipality(name,province_id) VALUES ('Ulvila',3);
INSERT INTO municipality(name,province_id) VALUES ('Forssa',4);
INSERT INTO municipality(name,province_id) VALUES ('Hattula',4);
INSERT INTO municipality(name,province_id) VALUES ('Hausjärvi',4);
INSERT INTO municipality(name,province_id) VALUES ('Humppila',4);
INSERT INTO municipality(name,province_id) VALUES ('Hämeenlinna',4);
INSERT INTO municipality(name,province_id) VALUES ('Janakkala',4);
INSERT INTO municipality(name,province_id) VALUES ('Jokioinen',4);
INSERT INTO municipality(name,province_id) VALUES ('Loppi',4);
INSERT INTO municipality(name,province_id) VALUES ('Riihimäki',4);
INSERT INTO municipality(name,province_id) VALUES ('Tammela',4);
INSERT INTO municipality(name,province_id) VALUES ('Ypäjä',4);
INSERT INTO municipality(name,province_id) VALUES ('Akaa',5);
INSERT INTO municipality(name,province_id) VALUES ('Hämeenkyrö',5);
INSERT INTO municipality(name,province_id) VALUES ('Ikaalinen',5);
INSERT INTO municipality(name,province_id) VALUES ('Juupajoki',5);
INSERT INTO municipality(name,province_id) VALUES ('Kangasala',5);
INSERT INTO municipality(name,province_id) VALUES ('Kihniö',5);
INSERT INTO municipality(name,province_id) VALUES ('Kuhmoinen',5);
INSERT INTO municipality(name,province_id) VALUES ('Lempäälä',5);
INSERT INTO municipality(name,province_id) VALUES ('Mänttä-Vilppula',5);
INSERT INTO municipality(name,province_id) VALUES ('Nokia',5);
INSERT INTO municipality(name,province_id) VALUES ('Orivesi',5);
INSERT INTO municipality(name,province_id) VALUES ('Parkano',5);
INSERT INTO municipality(name,province_id) VALUES ('Pirkkala',5);
INSERT INTO municipality(name,province_id) VALUES ('Punkalaidun',5);
INSERT INTO municipality(name,province_id) VALUES ('Pälkäne',5);
INSERT INTO municipality(name,province_id) VALUES ('Ruovesi',5);
INSERT INTO municipality(name,province_id) VALUES ('Sastamala',5);
INSERT INTO municipality(name,province_id) VALUES ('Tampere',5);
INSERT INTO municipality(name,province_id) VALUES ('Urjala',5);
INSERT INTO municipality(name,province_id) VALUES ('Valkeakoski',5);
INSERT INTO municipality(name,province_id) VALUES ('Vesilahti',5);
INSERT INTO municipality(name,province_id) VALUES ('Virrat',5);
INSERT INTO municipality(name,province_id) VALUES ('Ylöjärvi',5);
INSERT INTO municipality(name,province_id) VALUES ('Asikkala',6);
INSERT INTO municipality(name,province_id) VALUES ('Hartola',6);
INSERT INTO municipality(name,province_id) VALUES ('Hollola',6);
INSERT INTO municipality(name,province_id) VALUES ('Heinola',6);
INSERT INTO municipality(name,province_id) VALUES ('Iitti',6);
INSERT INTO municipality(name,province_id) VALUES ('Kärkölä',6);
INSERT INTO municipality(name,province_id) VALUES ('Lahti',6);
INSERT INTO municipality(name,province_id) VALUES ('Orimattila',6);
INSERT INTO municipality(name,province_id) VALUES ('Padasjoki',6);
INSERT INTO municipality(name,province_id) VALUES ('Sysmä',6);
INSERT INTO municipality(name,province_id) VALUES ('Hamina',7);
INSERT INTO municipality(name,province_id) VALUES ('Kotka',7);
INSERT INTO municipality(name,province_id) VALUES ('Kouvola',7);
INSERT INTO municipality(name,province_id) VALUES ('Miehikkälä',7);
INSERT INTO municipality(name,province_id) VALUES ('Pyhtää',7);
INSERT INTO municipality(name,province_id) VALUES ('Virolahti',7);
INSERT INTO municipality(name,province_id) VALUES ('Imatra',8);
INSERT INTO municipality(name,province_id) VALUES ('Lappeenranta',8);
INSERT INTO municipality(name,province_id) VALUES ('Lemi',8);
INSERT INTO municipality(name,province_id) VALUES ('Luumäki',8);
INSERT INTO municipality(name,province_id) VALUES ('Parikkala',8);
INSERT INTO municipality(name,province_id) VALUES ('Rautjärvi',8);
INSERT INTO municipality(name,province_id) VALUES ('Ruokolahti',8);
INSERT INTO municipality(name,province_id) VALUES ('Savitaipale',8);
INSERT INTO municipality(name,province_id) VALUES ('Taipalsaari',8);
INSERT INTO municipality(name,province_id) VALUES ('Enonkoski',9);
INSERT INTO municipality(name,province_id) VALUES ('Hirvensalmi',9);
INSERT INTO municipality(name,province_id) VALUES ('Juva',9);
INSERT INTO municipality(name,province_id) VALUES ('Kangasniemi',9);
INSERT INTO municipality(name,province_id) VALUES ('Mikkeli',9);
INSERT INTO municipality(name,province_id) VALUES ('Mäntyharju',9);
INSERT INTO municipality(name,province_id) VALUES ('Pertunmaa',9);
INSERT INTO municipality(name,province_id) VALUES ('Pieksämäki',9);
INSERT INTO municipality(name,province_id) VALUES ('Puumala',9);
INSERT INTO municipality(name,province_id) VALUES ('Rantasalmi',9);
INSERT INTO municipality(name,province_id) VALUES ('Savonlinna',9);
INSERT INTO municipality(name,province_id) VALUES ('Sulkava',9);
INSERT INTO municipality(name,province_id) VALUES ('Iisalmi',10);
INSERT INTO municipality(name,province_id) VALUES ('Joroinen',10);
INSERT INTO municipality(name,province_id) VALUES ('Kaavi',10);
INSERT INTO municipality(name,province_id) VALUES ('Keitele',10);
INSERT INTO municipality(name,province_id) VALUES ('Kiuruvesi',10);
INSERT INTO municipality(name,province_id) VALUES ('Kuopio',10);
INSERT INTO municipality(name,province_id) VALUES ('Lapinlahti',10);
INSERT INTO municipality(name,province_id) VALUES ('Leppävirta',10);
INSERT INTO municipality(name,province_id) VALUES ('Pielavesi',10);
INSERT INTO municipality(name,province_id) VALUES ('Rautalampi',10);
INSERT INTO municipality(name,province_id) VALUES ('Rautavaara',10);
INSERT INTO municipality(name,province_id) VALUES ('Siilinjärvi',10);
INSERT INTO municipality(name,province_id) VALUES ('Sonkajärvi',10);
INSERT INTO municipality(name,province_id) VALUES ('Suonenjoki',10);
INSERT INTO municipality(name,province_id) VALUES ('Tervo',10);
INSERT INTO municipality(name,province_id) VALUES ('Tuusniemi',10);
INSERT INTO municipality(name,province_id) VALUES ('Varkaus',10);
INSERT INTO municipality(name,province_id) VALUES ('Vesanto',10);
INSERT INTO municipality(name,province_id) VALUES ('Vieremä',10);
INSERT INTO municipality(name,province_id) VALUES ('Heinävesi',11);
INSERT INTO municipality(name,province_id) VALUES ('Ilomantsi',11);
INSERT INTO municipality(name,province_id) VALUES ('Joensuu',11);
INSERT INTO municipality(name,province_id) VALUES ('Juuka',11);
INSERT INTO municipality(name,province_id) VALUES ('Kitee',11);
INSERT INTO municipality(name,province_id) VALUES ('Kontiolahti',11);
INSERT INTO municipality(name,province_id) VALUES ('Outokumpu',11);
INSERT INTO municipality(name,province_id) VALUES ('Lieksa',11);
INSERT INTO municipality(name,province_id) VALUES ('Liperi',11);
INSERT INTO municipality(name,province_id) VALUES ('Nurmes',11);
INSERT INTO municipality(name,province_id) VALUES ('Polvijärvi',11);
INSERT INTO municipality(name,province_id) VALUES ('Rääkkylä',11);
INSERT INTO municipality(name,province_id) VALUES ('Tohmajärvi',11);
INSERT INTO municipality(name,province_id) VALUES ('Hankasalmi',12);
INSERT INTO municipality(name,province_id) VALUES ('Joutsa',12);
INSERT INTO municipality(name,province_id) VALUES ('Jyväskylä',12);
INSERT INTO municipality(name,province_id) VALUES ('Jämsä',12);
INSERT INTO municipality(name,province_id) VALUES ('Kannonkoski',12);
INSERT INTO municipality(name,province_id) VALUES ('Karstula',12);
INSERT INTO municipality(name,province_id) VALUES ('Keuruu',12);
INSERT INTO municipality(name,province_id) VALUES ('Kinnula',12);
INSERT INTO municipality(name,province_id) VALUES ('Kivijärvi',12);
INSERT INTO municipality(name,province_id) VALUES ('Konnevesi',12);
INSERT INTO municipality(name,province_id) VALUES ('Kyyjärvi',12);
INSERT INTO municipality(name,province_id) VALUES ('Laukaa',12);
INSERT INTO municipality(name,province_id) VALUES ('Luhanka',12);
INSERT INTO municipality(name,province_id) VALUES ('Multia',12);
INSERT INTO municipality(name,province_id) VALUES ('Muurame',12);
INSERT INTO municipality(name,province_id) VALUES ('Petäjävesi',12);
INSERT INTO municipality(name,province_id) VALUES ('Pihtipudas',12);
INSERT INTO municipality(name,province_id) VALUES ('Saarijärvi',12);
INSERT INTO municipality(name,province_id) VALUES ('Toivakka',12);
INSERT INTO municipality(name,province_id) VALUES ('Uurainen',12);
INSERT INTO municipality(name,province_id) VALUES ('Viitasaari',12);
INSERT INTO municipality(name,province_id) VALUES ('Äänekoski',12);
INSERT INTO municipality(name,province_id) VALUES ('Alajärvi',13);
INSERT INTO municipality(name,province_id) VALUES ('Alavus',13);
INSERT INTO municipality(name,province_id) VALUES ('Evijärvi',13);
INSERT INTO municipality(name,province_id) VALUES ('Ilmajoki',13);
INSERT INTO municipality(name,province_id) VALUES ('Isojoki',13);
INSERT INTO municipality(name,province_id) VALUES ('Isokyrö',13);
INSERT INTO municipality(name,province_id) VALUES ('Karijoki',13);
INSERT INTO municipality(name,province_id) VALUES ('Kauhajoki',13);
INSERT INTO municipality(name,province_id) VALUES ('Kauhava',13);
INSERT INTO municipality(name,province_id) VALUES ('Kuortane',13);
INSERT INTO municipality(name,province_id) VALUES ('Kurikka',13);
INSERT INTO municipality(name,province_id) VALUES ('Lappajärvi',13);
INSERT INTO municipality(name,province_id) VALUES ('Lapua',13);
INSERT INTO municipality(name,province_id) VALUES ('Seinäjoki',13);
INSERT INTO municipality(name,province_id) VALUES ('Soini',13);
INSERT INTO municipality(name,province_id) VALUES ('Teuva',13);
INSERT INTO municipality(name,province_id) VALUES ('Vimpeli',13);
INSERT INTO municipality(name,province_id) VALUES ('Ähtäri',13);
INSERT INTO municipality(name,province_id) VALUES ('Kaskinen',14);
INSERT INTO municipality(name,province_id) VALUES ('Korsnäs',14);
INSERT INTO municipality(name,province_id) VALUES ('Kristiinankaupunki',14);
INSERT INTO municipality(name,province_id) VALUES ('Kruunupyy',14);
INSERT INTO municipality(name,province_id) VALUES ('Laihia',14);
INSERT INTO municipality(name,province_id) VALUES ('Luoto',14);
INSERT INTO municipality(name,province_id) VALUES ('Maalahti',14);
INSERT INTO municipality(name,province_id) VALUES ('Mustasaari',14);
INSERT INTO municipality(name,province_id) VALUES ('Närpiö',14);
INSERT INTO municipality(name,province_id) VALUES ('Pietarsaari',14);
INSERT INTO municipality(name,province_id) VALUES ('Pedersören kunta',14);
INSERT INTO municipality(name,province_id) VALUES ('Uusikaarlepyy',14);
INSERT INTO municipality(name,province_id) VALUES ('Vaasa',14);
INSERT INTO municipality(name,province_id) VALUES ('Vöyri',14);
INSERT INTO municipality(name,province_id) VALUES ('Halsua',15);
INSERT INTO municipality(name,province_id) VALUES ('Kannus',15);
INSERT INTO municipality(name,province_id) VALUES ('Kaustinen',15);
INSERT INTO municipality(name,province_id) VALUES ('Kokkola',15);
INSERT INTO municipality(name,province_id) VALUES ('Lestijärvi',15);
INSERT INTO municipality(name,province_id) VALUES ('Perho',15);
INSERT INTO municipality(name,province_id) VALUES ('Toholampi',15);
INSERT INTO municipality(name,province_id) VALUES ('Veteli',15);
INSERT INTO municipality(name,province_id) VALUES ('Alavieska',16);
INSERT INTO municipality(name,province_id) VALUES ('Haapajärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Haapavesi',16);
INSERT INTO municipality(name,province_id) VALUES ('Hailuoto',16);
INSERT INTO municipality(name,province_id) VALUES ('Ii',16);
INSERT INTO municipality(name,province_id) VALUES ('Kalajoki',16);
INSERT INTO municipality(name,province_id) VALUES ('Kempele',16);
INSERT INTO municipality(name,province_id) VALUES ('Kuusamo',16);
INSERT INTO municipality(name,province_id) VALUES ('Kärsämäki',16);
INSERT INTO municipality(name,province_id) VALUES ('Liminka',16);
INSERT INTO municipality(name,province_id) VALUES ('Lumijoki',16);
INSERT INTO municipality(name,province_id) VALUES ('Merijärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Muhos',16);
INSERT INTO municipality(name,province_id) VALUES ('Nivala',16);
INSERT INTO municipality(name,province_id) VALUES ('Oulainen',16);
INSERT INTO municipality(name,province_id) VALUES ('Oulu',16);
INSERT INTO municipality(name,province_id) VALUES ('Pudasjärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Pyhäjoki',16);
INSERT INTO municipality(name,province_id) VALUES ('Pyhäjärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Pyhäntä',16);
INSERT INTO municipality(name,province_id) VALUES ('Raahe',16);
INSERT INTO municipality(name,province_id) VALUES ('Reisjärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Sievi',16);
INSERT INTO municipality(name,province_id) VALUES ('Siikajoki',16);
INSERT INTO municipality(name,province_id) VALUES ('Vaala',16);
INSERT INTO municipality(name,province_id) VALUES ('Siikalatva',16);
INSERT INTO municipality(name,province_id) VALUES ('Taivalkoski',16);
INSERT INTO municipality(name,province_id) VALUES ('Tyrnävä',16);
INSERT INTO municipality(name,province_id) VALUES ('Utajärvi',16);
INSERT INTO municipality(name,province_id) VALUES ('Ylivieska',16);
INSERT INTO municipality(name,province_id) VALUES ('Hyrynsalmi',17);
INSERT INTO municipality(name,province_id) VALUES ('Kajaani',17);
INSERT INTO municipality(name,province_id) VALUES ('Kuhmo',17);
INSERT INTO municipality(name,province_id) VALUES ('Paltamo',17);
INSERT INTO municipality(name,province_id) VALUES ('Puolanka',17);
INSERT INTO municipality(name,province_id) VALUES ('Ristijärvi',17);
INSERT INTO municipality(name,province_id) VALUES ('Sotkamo',17);
INSERT INTO municipality(name,province_id) VALUES ('Suomussalmi',17);
INSERT INTO municipality(name,province_id) VALUES ('Enontekiö',18);
INSERT INTO municipality(name,province_id) VALUES ('Inari',18);
INSERT INTO municipality(name,province_id) VALUES ('Kemi',18);
INSERT INTO municipality(name,province_id) VALUES ('Keminmaa',18);
INSERT INTO municipality(name,province_id) VALUES ('Kittilä',18);
INSERT INTO municipality(name,province_id) VALUES ('Kolari',18);
INSERT INTO municipality(name,province_id) VALUES ('Kemijärvi',18);
INSERT INTO municipality(name,province_id) VALUES ('Muonio',18);
INSERT INTO municipality(name,province_id) VALUES ('Pelkosenniemi',18);
INSERT INTO municipality(name,province_id) VALUES ('Posio',18);
INSERT INTO municipality(name,province_id) VALUES ('Ranua',18);
INSERT INTO municipality(name,province_id) VALUES ('Rovaniemi',18);
INSERT INTO municipality(name,province_id) VALUES ('Salla',18);
INSERT INTO municipality(name,province_id) VALUES ('Savukoski',18);
INSERT INTO municipality(name,province_id) VALUES ('Simo',18);
INSERT INTO municipality(name,province_id) VALUES ('Sodankylä',18);
INSERT INTO municipality(name,province_id) VALUES ('Tervola',18);
INSERT INTO municipality(name,province_id) VALUES ('Tornio',18);
INSERT INTO municipality(name,province_id) VALUES ('Pello',18);
INSERT INTO municipality(name,province_id) VALUES ('Utsjoki',18);
INSERT INTO municipality(name,province_id) VALUES ('Ylitornio',18);
INSERT INTO municipality(name,province_id) VALUES ('Brändö',19);
INSERT INTO municipality(name,province_id) VALUES ('Eckerö',19);
INSERT INTO municipality(name,province_id) VALUES ('Finström',19);
INSERT INTO municipality(name,province_id) VALUES ('Föglö',19);
INSERT INTO municipality(name,province_id) VALUES ('Geta',19);
INSERT INTO municipality(name,province_id) VALUES ('Hammarland',19);
INSERT INTO municipality(name,province_id) VALUES ('Jomala',19);
INSERT INTO municipality(name,province_id) VALUES ('Kumlinge',19);
INSERT INTO municipality(name,province_id) VALUES ('Kökar',19);
INSERT INTO municipality(name,province_id) VALUES ('Lemland',19);
INSERT INTO municipality(name,province_id) VALUES ('Lumparland',19);
INSERT INTO municipality(name,province_id) VALUES ('Maarianhamina',19);
INSERT INTO municipality(name,province_id) VALUES ('Saltvik',19);
INSERT INTO municipality(name,province_id) VALUES ('Sottunga',19);
INSERT INTO municipality(name,province_id) VALUES ('Sund',19);
INSERT INTO municipality(name,province_id) VALUES ('Vårdö',19);

INSERT INTO delivery(name) VALUES('Nouto');
INSERT INTO delivery(name) VALUES('Postitus');

INSERT INTO user(email, username, password, municipality_id) VALUES('username2022@mail.fi', 'username2022', 'Asdfghjk', 105);
INSERT INTO user(email, username, password, municipality_id) VALUES('username23@mail.fi', 'username23', 'Qwertyui', 11);

INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Peikonlehti', 3, 'dasjdsalkdj832', 'Isolehtinen kasvi, joka tekee ilmajuuria.', 'Peikonlehti tarvitsee paljon vettä ja valoa.', 2);
INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Aloevera', 2, 'asdsaddasd2sdfe', 'Isosta mehikasvista otettu pistokas.', 'Hiekkainen kasvualusta ja kastelu vain tarvittaessa.', 1);
INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Anopinkieli', 1, 'asdsaddasd2sdfe', 'Vihreäraidallinen anopinkieli, suorat lehdet.', 'Hiekkainen kasvualusta ja kastelu vain tarvittaessa.', 2);

INSERT INTO plantdelivery(plant_id, delivery_id) VALUES(1, 1);
INSERT INTO plantdelivery(plant_id, delivery_id) VALUES(1, 2);
INSERT INTO plantdelivery(plant_id, delivery_id) VALUES (2, 2);
INSERT INTO plantdelivery(plant_id, delivery_id) VALUES (3, 1);

DROP USER if EXISTS psuser@localhost;
CREATE USER psuser@localhost IDENTIFIED BY 'peikonlehti';
GRANT SELECT, INSERT, UPDATE, DELETE ON pistokkaat.* TO psuser@localhost;

CREATE INDEX idx_plantname
ON plant(NAME);