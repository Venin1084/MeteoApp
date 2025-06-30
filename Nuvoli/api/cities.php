<?php
require './database.php';

// Lista di città prese dal database
try {
    $stmt = $pdo->query("SELECT Nome FROM citta");
    $cities = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Impostiamo l'header per dire che il contenuto è JSON
    header('Content-Type: application/json');
    
    // Stampiamo l'array in formato JSON
    echo json_encode($cities);
} 
catch (PDOException $e) {
    // In caso di errore, restituiamo un messaggio di errore
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Errore del server: " . $e->getMessage()
    ]);
}