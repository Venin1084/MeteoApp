-- CREAZIONE DEL DATABASE SE NON ESISTE
CREATE DATABASE IF NOT EXISTS `nuvolì`
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- SELEZIONA IL DATABASE
USE `nuvolì`;

--
-- Struttura della tabella `citta`
--
CREATE TABLE `citta` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `IDRegione` int(11) NOT NULL,
  `DataCreazione` datetime NOT NULL DEFAULT current_timestamp(),
  `DataAggiornamento` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `citta`
--
INSERT INTO `citta` (`ID`, `Nome`, `IDRegione`, `DataCreazione`, `DataAggiornamento`) VALUES
(1, 'Torino', 1, '2025-06-03 16:41:56', '2025-06-03 16:41:56'),
(2, 'Milano', 2, '2025-06-03 16:42:31', '2025-06-03 16:42:31'),
(3, 'Palermo', 3, '2025-06-21 09:46:53', '2025-06-21 09:46:53'),
(4, 'Courmayeur', 4, '2025-06-21 10:24:53', '2025-06-21 10:24:53');

-- --------------------------------------------------------

--
-- Struttura della tabella `regioni`
--
CREATE TABLE `regioni` (
  `IDRegione` int(11) NOT NULL,
  `nomeRegione` varchar(100) NOT NULL,
  `abbreviazione` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `regioni`
--
INSERT INTO `regioni` (`IDRegione`, `nomeRegione`, `abbreviazione`) VALUES
(1, 'Piemonte', 'PIE'),
(2, 'Lombardia', 'LOM'),
(3, 'Sicilia', 'SIC'),
(4, "Valle d'Aosta", 'VAO');

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--
CREATE TABLE `utenti` (
  `ID` int(11) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Email` varchar(200) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `IscrittoNewsletter` tinyint(1) NOT NULL DEFAULT 0,
  `DataCreazione` datetime NOT NULL DEFAULT current_timestamp(),
  `DataAggiornamento` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indici per le tabelle `citta`
--
ALTER TABLE `citta`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UN_CITTA_NOME` (`Nome`),
  ADD UNIQUE KEY `UN_CITTA_STATO` (`IDRegione`);

--
-- Indici per le tabelle `regioni`
--
ALTER TABLE `regioni`
  ADD PRIMARY KEY (`IDRegione`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `UN_UTENTI_NOME` (`Nome`),
  ADD UNIQUE KEY `UN_UTENTI_EMAIL` (`Email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `citta`
--
ALTER TABLE `citta`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `regioni`
--
ALTER TABLE `regioni`
  MODIFY `IDRegione` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `citta`
--
ALTER TABLE `citta`
  ADD CONSTRAINT `FK_CITTA_REGIONI` FOREIGN KEY (`IDRegione`) REFERENCES `regioni` (`IDRegione`);
COMMIT;