<?php
// Prepara la risposta con le informazioni necessarie
$config = [
    'api_url' => "https://api.openweathermap.org/data/2.5/weather",
    'api_key' => "aa567da380c6c5754148705dd3f4752a"
];

// Restituisci la configurazione come JSON
echo json_encode($config);