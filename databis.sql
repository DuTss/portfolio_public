#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------

-- CREER LA DATABASE
CREATE DATABASE final;
-- UTILISE LA DATABASE
USE final;

#------------------------------------------------------------
# Table: projet
#------------------------------------------------------------

CREATE TABLE projet(
        projetId    Int  Auto_increment  NOT NULL ,
        titre       Varchar (50) NOT NULL ,
        image       Varchar (50) NOT NULL ,
        description Varchar (255) NOT NULL ,
        gitUrl      Varchar (255) NOT NULL
	,CONSTRAINT projet_PK PRIMARY KEY (projetId)
)ENGINE=InnoDB;

-- AJOUTE UN PROJET
INSERT INTO projet (titre,image,description,gitUrl)
VALUES ('Site de thé', 'https://www.zupimages.net/up/21/08/r4o6.png', "Vitrine boutique de thé", 'https://dutss.github.io/site-the/'),
        ('Vinaudio', 'https://zupimages.net/up/21/08/ikvw.png',"Vitrine site d'un domaine viticole", 'https://dutss.github.io/VINAUDIO/'),
       ('Hyperloop', 'https://www.zupimages.net/up/21/08/map2.png', "Projet Hyperloop en équipe", 'https://dutss.github.io/Hyperloop/');



SELECT * FROM projet;


#------------------------------------------------------------
# Table: user
#------------------------------------------------------------

CREATE TABLE user(
        userId   Int  Auto_increment  NOT NULL ,
        pseudo   Varchar (50) NOT NULL ,
        email    Varchar (254) NOT NULL ,
        password Varchar (60) NOT NULL
	,CONSTRAINT user_PK PRIMARY KEY (userId)
)ENGINE=InnoDB;

SELECT * FROM user;
#------------------------------------------------------------
# Table: Avoir
#------------------------------------------------------------

CREATE TABLE avoir(
        userId   Int NOT NULL ,
        projetId Int NOT NULL
	,CONSTRAINT Avoir_PK PRIMARY KEY (userId,projetId)

	,CONSTRAINT Avoir_user_FK FOREIGN KEY (userId) REFERENCES user(userId)
	,CONSTRAINT Avoir_projet0_FK FOREIGN KEY (projetId) REFERENCES projet(projetId)
)ENGINE=InnoDB;

SELECT * FROM avoir;