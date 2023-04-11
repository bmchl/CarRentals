SET search_path = bdschema;

INSERT INTO Assurance (dateDebutAssurance, dateEcheance, assureur) VALUES 
	('2022-01-01', '2024-01-01', 'Belair Direct'),
	('2022-02-01', '2024-02-01', 'Intact'),
	('2022-03-01', '2024-03-01', 'Liberty Mutual'),
	('2022-08-01', '2024-08-01', 'Liberty Mutual'),
	('2022-06-01', '2024-06-01', 'Belair Direct'),
	('2022-09-01', '2024-09-01', 'Intact'),
	('2022-04-01', '2024-04-01', 'Desjardins');
	
INSERT INTO Adresse (codePostal, numRue, rue, ville, province, pays) VALUES
	('H3T1J4', 1, 'chemin Polytechnique', 'Montréal', 'Quebec', 'Canada'),
	('H3T1A2', 2, 'rue inventée', 'Vancouver', 'Quebec', 'Canada'),
	('H3T1T6', 3, 'chemin Côte des neiges', 'Montréal', 'Quebec', 'Canada'),
	('H3T1T8', 4, 'nowhere land', 'Montréal', 'Quebec', 'Canada'),
	('H3T1R6', 5, 'Penny Lane', 'Liverpool', 'Quebec', 'Canada'),
	('H3T1P6', 6, 'rue Wall', 'Montréal', 'Quebec', 'Canada');
	
INSERT INTO Emplacement (nbStationnement, adresseId, carte) VALUES 
	(30, 1, POINT(1,2)),
	(40, 2, POINT(4,5)),
	(50, 3, POINT(-1,-2)),
	(60, 4, POINT(-5,-6));
	
INSERT INTO Vehicule (immatriculation, odometre, dateMiseEnService, prixHoraire, prixKm, marque, modele, consommationCarburant, noAssurance, emplacementId) VALUES
	('A1B2C3', 20000, '2022-07-01', 10.90, 0.54, 'Honda', 'Civic', 7.12, 1, 1),
	('D4E5F6', 10000, '2022-08-01', 12.32, 0.67, 'Toyota', 'Prius', 4.32, 2, 3),
	('R1S2T3', 10000, '2022-08-01', 12.32, 0.67, 'Toyota', 'Prius', 4.32, 3, 1),
	('G7H8I9', 30000, '2022-05-01', 9.45, 0.46, 'Dodge', 'Gran Caravan', 9.76, 4, NULL),
	('ASS6AR', 40000, '2022-12-01', 10.78, 0.99, 'Ram', 'Grand Char', 10.04, 5, 4),
	('T6U9P0', 22000, '2022-01-01', 10.54, 0.57, 'Hyundai', 'Accent', 7.02, 6, 3),
	('B6Y2H9', 22000, '2022-01-01', 10.54, 0.57, 'Volkswaggen', 'Jetta', 7.02, 7, 3);
	
INSERT INTO Hybride (immatriculation, nbKilowats) VALUES
	('D4E5F6', 1350),
	('R1S2T3', 1350);
	
INSERT INTO Berline (immatriculation) VALUES
	('A1B2C3'),
	('T6U9P0'),
	('B6Y2H9');
	
INSERT INTO MiniCamionette (immatriculation) VALUES
	('G7H8I9'),
	('ASS6AR');
	
INSERT INTO Membre (prenom, nomFamille, motDePasse, permisConduire, numBancaire, banque, adresseIdResidence, adresseElectronique, emplacementPrefereId) VALUES
	('Jean', 'Tremblay', 'password', 'T123401010099', '123456789123456', 'BMO', 4, 'jeantremblay@gmail.com', 1),
	('Justin', 'Trudeau', 'contiuerDeContinuer', 'T234501017803', '7472456583638419', 'Banque Nationale', 5, 'justintrudeau@premierministre.ca', 3),
	('René', 'Lévesque', 'QuebecLibre', 'L123401013780', '8765432456274197', 'Desjardins', 6, 'renelevesque@quebec.qc', 3);
	
INSERT INTO Reservation (dateDebutRes, dateFinRes, numMembreReserve, immatriculationVehicule, exigencesSupplementaires) VALUES
	('2023-01-22', '2023-01-25', 1, 'D4E5F6', NULL),
	('2023-05-11', '2023-05-16', 2, 'R1S2T3', NULL),
	('2023-06-11', '2023-06-16', 3, 'G7H8I9', 'Siege bébé'),
	('2023-01-22', '2023-01-25', 1, 'B6Y2H9', NULL),
	('2023-02-22', '2023-02-25', 1, 'B6Y2H9', NULL),
	('2023-05-11', '2023-05-16', 2, 'T6U9P0', NULL);
	
INSERT INTO Trajet (dateDebutTrajet, dateFinTrajet, odometreDebut, odometreFin, reservation) VALUES
	('2023-01-22', '2023-01-24', 9920, 10000, 1),
	('2023-05-11', '2023-05-16', 19920, 20000, 2),
	('2023-06-11', '2023-06-16', 29920, 30000, 3);
	
INSERT INTO MembreCooperative (numMembre, nbPartsAchetees, montantIndividuel) VALUES
	(3, 200, 1000);
	
INSERT INTO MembreAutopartage (numMembre, dateNaissance, cotisationAnnuelle, reduction, dateDernierAccident) VALUES
	(1, '2000-01-01', 120, 0, '2020-03-30'),
	(2, '1978-01-01', 120, 60, NULL);
	
INSERT INTO Facture (dateFacturation, dateEcheanceFact, total, estPayee, numMembre) VALUES
	('2023-07-01', '2023-08-01', 210, 'false', 1),
	('2023-07-01', '2023-08-01', 120, 'false', 2),
	('2023-07-01', '2023-08-01', 80, 'true', 3);
	
	
	