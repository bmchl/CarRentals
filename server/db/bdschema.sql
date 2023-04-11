CREATE SCHEMA IF NOT EXISTS bdschema;

SET search_path = bdschema;

DROP TABLE IF EXISTS Facture CASCADE;
DROP TABLE IF EXISTS MembreAutopartage CASCADE;
DROP TABLE IF EXISTS MembreCooperative CASCADE;
DROP TABLE IF EXISTS Trajet CASCADE;
DROP TABLE IF EXISTS Reservation CASCADE;
DROP TABLE IF EXISTS Membre CASCADE;
DROP TABLE IF EXISTS MiniCamionette CASCADE;
DROP TABLE IF EXISTS Berline CASCADE;
DROP TABLE IF EXISTS Hybride CASCADE;
DROP TABLE IF EXISTS Vehicule CASCADE;
DROP TABLE IF EXISTS Emplacement CASCADE;
DROP TABLE IF EXISTS Adresse CASCADE;
DROP TABLE IF EXISTS Assurance CASCADE;

CREATE TABLE IF NOT EXISTS Assurance (
	noAssurance SERIAL PRIMARY KEY, 
	dateDebutAssurance DATE NOT NULL, 
	dateEcheance DATE, 
	assureur VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Adresse (
	adresseId SERIAL PRIMARY KEY,
	numRue INT NOT NULL,
	rue VARCHAR(40) NOT NULL,
	codePostal CHAR(6) NOT NULL,
	ville VARCHAR(40) NOT NULL,
	province VARCHAR(40) NOT NULL,
	pays VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Emplacement (
	emplacementId SERIAL PRIMARY KEY, 
	nbStationnement INT NOT NULL, 
	adresseId INT NOT NULL, 
	carte POINT NOT NULL, 
	FOREIGN KEY (adresseId) REFERENCES Adresse(adresseId)
);

CREATE TABLE IF NOT EXISTS Vehicule (
	immatriculation VARCHAR(7) PRIMARY KEY, 
	odometre INT NOT NULL, 
	dateMiseEnService Date NOT NULL, 
	prixHoraire NUMERIC(12,2) NOT NULL, 
	prixKm NUMERIC(12,2) NOT NULL, 
	marque VARCHAR(30) NOT NULL,
	modele VARCHAR(30) NOT NULL,
	consommationCarburant NUMERIC(12,2) NOT NULL,
	noAssurance INT NOT NULL, 
	emplacementId INT,
	FOREIGN KEY (noAssurance) REFERENCES Assurance(noAssurance),
	FOREIGN KEY (emplacementId) REFERENCES Emplacement(emplacementId)
);

CREATE TABLE IF NOT EXISTS Hybride(
	immatriculation VARCHAR(7) PRIMARY KEY,
	nbKilowats INT NOT NULL,
	FOREIGN KEY (immatriculation) REFERENCES Vehicule(immatriculation)
);

CREATE TABLE IF NOT EXISTS Berline(
	immatriculation VARCHAR(7) PRIMARY KEY,
	FOREIGN KEY (immatriculation) REFERENCES Vehicule(immatriculation)
);

CREATE TABLE IF NOT EXISTS MiniCamionette(
	immatriculation VARCHAR(7) PRIMARY KEY,
	FOREIGN KEY (immatriculation) REFERENCES Vehicule(immatriculation)
);

CREATE TABLE IF NOT EXISTS Membre (
	numMembre SERIAL PRIMARY KEY,
	prenom VARCHAR(30) NOT NULL,
	nomFamille VARCHAR(30) NOT NULL,
	motDePasse VARCHAR(30) NOT NULL,
	permisConduire CHAR(13) NOT NULL, 
	numBancaire CHAR(16) NOT NULL, 
	banque VARCHAR(30) NOT NULL, 
	adresseIdResidence INT NOT NULL, 
	adresseElectronique VARCHAR(60) NOT NULL, 
	emplacementPrefereId INT, 
	FOREIGN KEY (adresseIdResidence) REFERENCES Adresse(adresseId),
	FOREIGN KEY (emplacementPrefereId) REFERENCES Emplacement(emplacementId)
);

CREATE TABLE IF NOT EXISTS Reservation (
	reservationId SERIAL PRIMARY KEY,
	dateDebutRes DATE NOT NULL,
	dateFinRes DATE NOT NULL,
	exigencesSupplementaires VARCHAR(120),
	numMembreReserve INT NOT NULL,
	immatriculationVehicule VARCHAR(7) NOT NULL,
	FOREIGN KEY (numMembreReserve) REFERENCES Membre(numMembre),
	FOREIGN KEY (immatriculationVehicule) REFERENCES Vehicule(immatriculation)
);

CREATE TABLE IF NOT EXISTS Trajet (
	trajetId SERIAL PRIMARY KEY,
	dateDebutTrajet DATE NOT NULL,
	dateFinTrajet DATE NOT NULL,
	odometreDebut INT NOT NULL,
	odometreFin INT NOT NULL,
	reservation INT NOT NULL,
	FOREIGN KEY (reservation) REFERENCES Reservation(reservationId)
);

CREATE TABLE IF NOT EXISTS MembreCooperative (
	numMembre INT PRIMARY KEY,
	nbPartsAchetees INT NOT NULL,
	montantIndividuel NUMERIC(12,2) NOT NULL,
	FOREIGN KEY (numMembre) REFERENCES Membre(numMembre)
);

CREATE TABLE IF NOT EXISTS MembreAutopartage (
    numMembre INT PRIMARY KEY,
    dateNaissance DATE NOT NULL, 
    cotisationAnnuelle NUMERIC(12,2) NOT NULL, 
    reduction INT NOT NULL, 
    dateDernierAccident DATE,
    CONSTRAINT check_reduc_age_accident 
    CHECK (reduction = 0 
           OR (dateNaissance < (CURRENT_DATE - INTERVAL '25 years') 
               AND (dateDernierAccident IS NULL 
                    OR dateDernierAccident <= (CURRENT_DATE - INTERVAL '1 year'))))
);

CREATE TABLE IF NOT EXISTS Facture (
	factureId SERIAL PRIMARY KEY, 
	dateFacturation DATE NOT NULL, 
	dateEcheanceFact DATE NOT NULL, 
	total NUMERIC(12,2) NOT NULL, 
	estPayee BOOLEAN NOT NULL, 
	numMembre INT NOT NULL,
	FOREIGN KEY (numMembre) REFERENCES Membre(numMembre)
);

