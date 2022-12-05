DROP DATABASE if EXISTS pistokkaat;
CREATE DATABASE pistokkaat;

USE pistokkaat;

DROP TABLE if EXISTS province;
CREATE TABLE province
(
	province VARCHAR(40) NOT NULL,
	PRIMARY KEY (province)
);

DROP TABLE if EXISTS municipality;
CREATE TABLE municipality
(
	municipality VARCHAR(40) NOT NULL,
	province VARCHAR(40) NOT NULL,
	PRIMARY KEY (municipality),
	FOREIGN KEY (province) REFERENCES province(province)
);

DROP TABLE if EXISTS delivery;
CREATE TABLE delivery
(
	delivery VARCHAR(60) NOT NULL,
	PRIMARY KEY (delivery)
);

DROP TABLE if EXISTS user;
CREATE TABLE user
(
	user_id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(60) NOT NULL,
	username VARCHAR(20) NOT NULL,
	password VARCHAR(80) NOT NULL,
	municipality VARCHAR(40) NOT NULL,
	role INT NOT NULL DEFAULT 1,
	PRIMARY KEY (user_id),
	FOREIGN KEY (municipality) REFERENCES municipality(municipality),
	UNIQUE (email),
	UNIQUE (username)
);

DROP TABLE if EXISTS userlikes;
CREATE TABLE userlikes
(
	liker INT NOT NULL,
	liked INT NOT NULL,
	PRIMARY KEY (liker, liked),
	FOREIGN KEY (liker) REFERENCES User(user_id),
	FOREIGN KEY (liked) REFERENCES User(user_id)
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
	FOREIGN KEY (user_id) REFERENCES user(user_id)
);

DROP TABLE if EXISTS plantdelivery;
CREATE TABLE plantdelivery
(
	plant_id INT NOT NULL,
	delivery VARCHAR(60) NOT NULL,
	PRIMARY KEY (plant_id, delivery),
	FOREIGN KEY (plant_id) REFERENCES Plant(plant_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (delivery) REFERENCES delivery(delivery)
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

INSERT INTO province VALUES('Uusimaa');
INSERT INTO province VALUES('Varsinais-Suomi');
INSERT INTO province VALUES('Satakunta');
INSERT INTO province VALUES('Kanta-Häme');
INSERT INTO province VALUES('Pirkanmaa');
INSERT INTO province VALUES('Päijät-Häme');
INSERT INTO province VALUES('Kymenlaakso');
INSERT INTO province VALUES('Etelä-Karjala');
INSERT INTO province VALUES('Etelä-Savo');
INSERT INTO province VALUES('Pohjois-Savo');
INSERT INTO province VALUES('Pohjois-Karjala');
INSERT INTO province VALUES('Keski-Suomi');
INSERT INTO province VALUES('Etelä-Pohjanmaa');
INSERT INTO province VALUES('Pohjanmaa');
INSERT INTO province VALUES('Keski-Pohjanmaa');
INSERT INTO province VALUES('Pohjois-Pohjanmaa');
INSERT INTO province VALUES('Kainuu');
INSERT INTO province VALUES('Lappi');
INSERT INTO province VALUES('Ahvenanmaa');

INSERT INTO municipality(municipality,province) VALUES ('Askola','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Espoo','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Hanko','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Helsinki','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Vantaa','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Hyvinkää','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Inkoo','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Järvenpää','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Karkkila','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Kauniainen','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Kerava','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Kirkkonummi','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Lapinjärvi','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Loviisa','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Lohja','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Myrskylä','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Mäntsälä','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Nurmijärvi','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Pornainen','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Pukkila','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Porvoo','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Raasepori','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Sipoo','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Siuntio','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Tuusula','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Vihti','Uusimaa');
INSERT INTO municipality(municipality,province) VALUES ('Aura','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kaarina','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Koski Tl','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kustavi','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kemiönsaari','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Laitila','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Lieto','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Loimaa','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Parainen','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Marttila','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Masku','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Mynämäki','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Naantali','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Nousiainen','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Oripää','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Paimio','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Pyhäranta','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Pöytyä','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Raisio','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Rusko','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Salo','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Sauvo','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Somero','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Taivassalo','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Turku','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Uusikaupunki','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Vehmaa','Varsinais-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Eura','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Eurajoki','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Harjavalta','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Huittinen','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Jämijärvi','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Kankaanpää','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Karvia','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Kokemäki','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Merikarvia','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Nakkila','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Pomarkku','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Pori','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Rauma','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Siikainen','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Säkylä','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Ulvila','Satakunta');
INSERT INTO municipality(municipality,province) VALUES ('Forssa','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hattula','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hausjärvi','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Humppila','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hämeenlinna','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Janakkala','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Jokioinen','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Loppi','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Riihimäki','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Tammela','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Ypäjä','Kanta-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Akaa','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Hämeenkyrö','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ikaalinen','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Juupajoki','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kangasala','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kihniö','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kuhmoinen','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lempäälä','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Mänttä-Vilppula','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Nokia','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Orivesi','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Parkano','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pirkkala','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Punkalaidun','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pälkäne','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ruovesi','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Sastamala','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Tampere','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Urjala','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Valkeakoski','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vesilahti','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Virrat','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ylöjärvi','Pirkanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Asikkala','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hartola','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hollola','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Heinola','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Iitti','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Kärkölä','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Lahti','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Orimattila','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Padasjoki','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Sysmä','Päijät-Häme');
INSERT INTO municipality(municipality,province) VALUES ('Hamina','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Kotka','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Kouvola','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Miehikkälä','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Pyhtää','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Virolahti','Kymenlaakso');
INSERT INTO municipality(municipality,province) VALUES ('Imatra','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Lappeenranta','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Lemi','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Luumäki','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Parikkala','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Rautjärvi','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Ruokolahti','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Savitaipale','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Taipalsaari','Etelä-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Enonkoski','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Hirvensalmi','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Juva','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Kangasniemi','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Mikkeli','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Mäntyharju','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Pertunmaa','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Pieksämäki','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Puumala','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Rantasalmi','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Savonlinna','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Sulkava','Etelä-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Iisalmi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Joroinen','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Kaavi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Keitele','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Kiuruvesi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Kuopio','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Lapinlahti','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Leppävirta','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Pielavesi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Rautalampi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Rautavaara','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Siilinjärvi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Sonkajärvi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Suonenjoki','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Tervo','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Tuusniemi','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Varkaus','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Vesanto','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Vieremä','Pohjois-Savo');
INSERT INTO municipality(municipality,province) VALUES ('Heinävesi','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Ilomantsi','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Joensuu','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Juuka','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Kitee','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Kontiolahti','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Outokumpu','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Lieksa','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Liperi','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Nurmes','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Polvijärvi','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Rääkkylä','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Tohmajärvi','Pohjois-Karjala');
INSERT INTO municipality(municipality,province) VALUES ('Hankasalmi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Joutsa','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Jyväskylä','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Jämsä','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kannonkoski','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Karstula','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Keuruu','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kinnula','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kivijärvi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Konnevesi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Kyyjärvi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Laukaa','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Luhanka','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Multia','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Muurame','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Petäjävesi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Pihtipudas','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Saarijärvi','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Toivakka','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Uurainen','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Viitasaari','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Äänekoski','Keski-Suomi');
INSERT INTO municipality(municipality,province) VALUES ('Alajärvi','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Alavus','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Evijärvi','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ilmajoki','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Isojoki','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Isokyrö','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Karijoki','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kauhajoki','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kauhava','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kuortane','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kurikka','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lappajärvi','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lapua','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Seinäjoki','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Soini','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Teuva','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vimpeli','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ähtäri','Etelä-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kaskinen','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Korsnäs','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kristiinankaupunki','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kruunupyy','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Laihia','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Luoto','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Maalahti','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Mustasaari','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Närpiö','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pietarsaari','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pedersören kunta','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Uusikaarlepyy','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vaasa','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vöyri','Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Halsua','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kannus','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kaustinen','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kokkola','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lestijärvi','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Perho','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Toholampi','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Veteli','Keski-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Alavieska','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Haapajärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Haapavesi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Hailuoto','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ii','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kalajoki','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kempele','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kuusamo','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kärsämäki','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Liminka','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lumijoki','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Merijärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Muhos','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Nivala','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Oulainen','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Oulu','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pudasjärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pyhäjoki','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pyhäjärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Pyhäntä','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Raahe','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Reisjärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Sievi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Siikajoki','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vaala','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Siikalatva','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Taivalkoski','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Tyrnävä','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Utajärvi','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Ylivieska','Pohjois-Pohjanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Hyrynsalmi','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Kajaani','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Kuhmo','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Paltamo','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Puolanka','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Ristijärvi','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Sotkamo','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Suomussalmi','Kainuu');
INSERT INTO municipality(municipality,province) VALUES ('Enontekiö','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Inari','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Kemi','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Keminmaa','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Kittilä','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Kolari','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Kemijärvi','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Muonio','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Pelkosenniemi','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Posio','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Ranua','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Rovaniemi','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Salla','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Savukoski','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Simo','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Sodankylä','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Tervola','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Tornio','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Pello','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Utsjoki','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Ylitornio','Lappi');
INSERT INTO municipality(municipality,province) VALUES ('Brändö','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Eckerö','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Finström','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Föglö','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Geta','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Hammarland','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Jomala','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kumlinge','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Kökar','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lemland','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Lumparland','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Maarianhamina','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Saltvik','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Sottunga','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Sund','Ahvenanmaa');
INSERT INTO municipality(municipality,province) VALUES ('Vårdö','Ahvenanmaa');

INSERT INTO delivery VALUES('Nouto');
INSERT INTO delivery VALUES('Postitus');

INSERT INTO user(email, username, password, municipality) VALUES('username2022@mail.fi', 'username2022', 'Asdfghjk', 'Joensuu');
INSERT INTO user(email, username, password, municipality) VALUES('username23@mail.fi', 'username23', 'Qwertyui', 'Vantaa');

INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Peikonlehti', 3, 'dasjdsalkdj832', 'Isolehtinen kasvi, joka tekee ilmajuuria.', 'Peikonlehti tarvitsee paljon vettä ja valoa.', 2);
INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Aloevera', 2, 'asdsaddasd2sdfe', 'Isosta mehikasvista otettu pistokas.', 'Hiekkainen kasvualusta ja kastelu vain tarvittaessa.', 1);
INSERT INTO plant(name, price, imagename, description, instruction, user_id) 
VALUES('Anopinkieli', 1, 'asdsaddasd2sdfe', 'Vihreäraidallinen anopinkieli, suorat lehdet.', 'Hiekkainen kasvualusta ja kastelu vain tarvittaessa.', 2);

INSERT INTO plantdelivery(plant_id, delivery) VALUES(1, 'Nouto');
INSERT INTO plantdelivery(plant_id, delivery) VALUES(1, 'Postitus');
INSERT INTO plantdelivery(plant_id, delivery) VALUES (2, 'Postitus');
INSERT INTO plantdelivery(plant_id, delivery) VALUES (3, 'Nouto');

DROP USER if EXISTS psuser@localhost;
CREATE USER psuser@localhost IDENTIFIED BY 'peikonlehti';
GRANT SELECT, INSERT, UPDATE, DELETE ON pistokkaat.* TO psuser@localhost;

/* DROP INDEX if EXISTS idx_plantname; */
CREATE INDEX idx_plantname
ON plant(NAME);