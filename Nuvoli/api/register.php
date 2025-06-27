<?php
// Include il file di configurazione del database
require './database.php';

// Avvia la sessione PHP
session_start();

// Verifica se la richiesta è di tipo POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera i dati inviati dal client (username e password già hashata lato client)
    $username = $_POST['username'] ?? '';
    $clientHash = $_POST['password'] ?? '';

    // Controlla che entrambi i campi siano stati forniti
    if (empty($username) || empty($clientHash)) {
        echo json_encode([
            "status" => "error", 
            "message" => "Dati mancanti."
        ]);
        exit;
    }

    // Protezione server: hash dell'hash client-side con bcrypt
    $finalHash = password_hash($clientHash, PASSWORD_BCRYPT);

    try {
        // Prepara la query per inserire il nuovo utente nel database
        $stmt = $pdo->prepare("INSERT INTO utenti (Nome, Password) VALUES (?, ?)");
        $stmt->execute([$username, $finalHash]);

        // Imposta la sessione come nel login
        $_SESSION['username'] = $username;

        // Risposta di successo in formato JSON
        echo json_encode([
            "status" => "success",
            "message" => "Registrazione completata!",
            "username" => $username
        ]);
    } catch (PDOException $e) {
        // Gestisce l'errore se l'username è già registrato (errore di vincolo univoco)
        if ($e->getCode() == 23000) {
            echo json_encode([
                "status" => "error",
                "message" => "Username già registrato."
            ]);
        } else {
            // Gestisce altri errori del database
            echo json_encode([
                "status" => "error",
                "message" => "Errore: " . $e->getMessage()
            ]);
        }
    }
}
?>