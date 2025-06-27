<?php
// filepath: /opt/lampp/htdocs/AppMeteo/login.php
session_start();

require "./database.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recupera username e password inviati dal client
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

    try {
        // Prepara la query per ottenere la password dell'utente dal database
        $stmt = $pdo->prepare("SELECT Password FROM utenti WHERE Nome = ?");
        $stmt->execute([$username]);
        $utente = $stmt->fetch();

        // Verifica che l'utente esista e che la password sia corretta
        if ($utente && password_verify($clientHash, $utente['Password'])) {
            // Salva lo username nella sessione
            $_SESSION['username'] = $username;
            echo json_encode([
                "status" => "success", 
                "username" => $username
            ]);
        } else {
            // Credenziali errate
            http_response_code(401);
            echo json_encode([
                "status" => "error", 
                "message" => "Credenziali errate."
            ]);
        }
    } catch (Exception $e) {
        // Gestione degli errori del server
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Errore del server."
        ]);
    }
}
?>