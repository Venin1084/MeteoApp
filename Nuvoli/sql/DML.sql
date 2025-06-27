-- INSERIMENTO DI UTENTI
INSERT INTO utenti (Nome, Email, Password, IscrittoNewsletter)
VALUES 
('Mario Rossi', 'mario.rossi@example.com', 'password_hash_1', TRUE),
('Luca Bianchi', 'luca.bianchi@example.com', 'password_hash_2', FALSE),
('Anna Verdi', 'anna.verdi@example.com', 'password_hash_3', TRUE);

-- INSERIMENTO CITTA
INSERT INTO citta (Nome, Stato)
VALUES
('Torino', 'Italia'),
('Milano', 'Italia');

-- LETTURA DI TUTTI GLI UTENTI
SELECT * FROM utenti;

-- LETTURA DI UTENTI ISCRITTI ALLA NEWSLETTER
SELECT Nome, Email FROM utenti WHERE IscrittoNewsletter = TRUE;

-- AGGIORNAMENTO EMAIL DI UN UTENTE
UPDATE utenti
SET Email = 'nuovo.indirizzo@example.com'
WHERE Nome = 'Luca Bianchi';

-- DISISCRIZIONE DI UN UTENTE DALLA NEWSLETTER
UPDATE utenti
SET IscrittoNewsletter = FALSE
WHERE Email = 'anna.verdi@example.com';

-- CANCELLAZIONE DI UN UTENTE SPECIFICO
DELETE FROM utenti
WHERE Email = 'mario.rossi@example.com';

-- CANCELLAZIONE DI UNA CITTA SPECIFICA
DELETE FROM citta
WHERE Nome = 'Torino' AND Stato = 'Italia';