-- CREER LA DATABASE
CREATE DATABASE portfolio;
-- UTILISE LA DATABASE
USE portfolio;

-- CREER LA TABLE GIT
CREATE TABLE git (
	gitId INT AUTO_INCREMENT,
    urlGit VARCHAR(255),
    PRIMARY KEY(gitId)
);

-- CREER LA TABLE PROJETS
CREATE TABLE projets (
	projetId INT AUTO_INCREMENT,
    titre VARCHAR(75),
    image VARCHAR(255),
    description VARCHAR(255),
    gitId INT,
    PRIMARY KEY (projetId),
    FOREIGN KEY (gitId) REFERENCES git(gitId)
);

-- AJOUTE LES GIT DES PROJETS
INSERT INTO git (urlGit) VALUES ('https://dutss.github.io/site-the/'),
								('https://dutss.github.io/VINAUDIO/'),
                                ('https://dutss.github.io/Hyperloop/');

-- AFFICHE LES GIT
SELECT * FROM git;

-- AJOUTE UN PROJET
INSERT INTO projets (titre,image,description,gitId)
VALUES ('Site de thé', 'thépic', "Vitrine boutique de thé", 1),
	   ('Vinaudio', 'vinaudiopic',"Vitrine site d'un domaine viticole", 2),
       ('Hyperloop', 'hyperlooppic', "Projet Hyperloop en équipe", 3);

SELECT * FROM projets;

-- CREER LA TABLE USER
CREATE TABLE user
(
	userID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	pseudo VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(255) NOT NULL
)

-- AFFICHE LES UTILISATEURS
SELECT * FROM user;