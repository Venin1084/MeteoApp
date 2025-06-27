<?php
require "./database.php";

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$uriRichiesta = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$segmenti = explode('/', trim($uriRichiesta, '/'));

$prefissoAPI = 'api';

$indiceAPI = array_search($prefissoAPI, $segmenti);

$risorsa = null;
$id = null;

if ($indiceAPI !== false && isset($segmenti[$indiceAPI + 1])) {
    $risorsa = $segmenti[$indiceAPI + 1];
    if (isset($segmenti[$indiceAPI + 2])) {
        $id = $segmenti[$indiceAPI + 2];
    }
}

switch ($risorsa) {
    case 'citta':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            if ($id) {
                ottieniCittaPerId($connessioneDB, $id);
            } else {
                ottieniTutteLeCitta($connessioneDB);
            }
        } else {
            http_response_code(405);
            echo json_encode(['errore' => 'Metodo non consentito per /api/citta']);
        }
        break;

    case 'regioni':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            ottieniTutteLeRegioni($connessioneDB);
        } else {
            http_response_code(405);
            echo json_encode(['errore' => 'Metodo non consentito per /api/regioni']);
        }
        break;

    case 'utenti':
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $includiCancellati = isset($_GET['includiCancellati']) && $_GET['includiCancellati'] === 'true';
            ottieniTuttiGliUtenti($connessioneDB, $includiCancellati);
        } else {
            http_response_code(405);
            echo json_encode(['errore' => 'Metodo non consentito per /api/utenti']);
        }
        break;
    case 'meteo':
    
    $city = $_GET['city'] ?? '';
    if (!$city) {
        http_response_code(400);
        echo json_encode(['errore'=>'city missing']);
        exit;
    }
    // call external weather API
    $apiKey = 'aa567da380c6c5754148705dd3f4752a'; 
    $url = "https://api.openweathermap.org/data/2.5/weather"
         . "?q=" . urlencode($city)
         . "&units=metric&lang=it"
         . "&appid=" . $apiKey;
    $json = file_get_contents($url);
    if ($json === false) {
        http_response_code(502);
        echo json_encode(['errore'=>'impossibile contattare meteo']);
        exit;
    }
    $data = json_decode($json, true);
    $temp = isset($data['main']['temp'])
          ? round($data['main']['temp'])
          : null;
    header('Content-Type: application/json');
    echo json_encode(['temp'=>$temp]);
    exit;


    default:
        http_response_code(404);
        echo json_encode(['errore' => 'Risorsa non trovata o URL non valido.']);
        break;
}

function ottieniTutteLeCitta(PDO $connessioneDB) {
    try {
        $statement = $connessioneDB->prepare("SELECT c.ID, c.Nome, c.DataCreazione, c.DataAggiornamento, r.nomeRegione 
                               FROM citta c 
                               JOIN regioni r ON c.IDRegione = r.IDRegione");
        $statement->execute();
        $citta = $statement->fetchAll();
        echo json_encode($citta);
    } catch (PDOException $eccezione) {
        http_response_code(500);
        echo json_encode(['errore' => 'Errore nel recupero delle città: ' . $eccezione->getMessage()]);
    }
}

function ottieniCittaPerId(PDO $connessioneDB, int $id) {
    try {
        $statement = $connessioneDB->prepare("SELECT c.ID, c.Nome, c.DataCreazione, c.DataAggiornamento, r.nomeRegione 
                               FROM citta c 
                               JOIN regioni r ON c.IDRegione = r.IDRegione 
                               WHERE c.ID = ?");
        $statement->execute([$id]);
        $citta = $statement->fetch();
        if ($citta) {
            echo json_encode($citta);
        } else {
            http_response_code(404);
            echo json_encode(['messaggio' => 'Città non trovata.']);
        }
    } catch (PDOException $eccezione) {
        http_response_code(500);
        echo json_encode(['errore' => 'Errore nel recupero della città: ' . $eccezione->getMessage()]);
    }
}

function ottieniTutteLeRegioni(PDO $connessioneDB) {
    try {
        $statement = $connessioneDB->prepare("SELECT IDRegione, nomeRegione, abbreviazione FROM regioni");
        $statement->execute();
        $regioni = $statement->fetchAll();
        echo json_encode($regioni);
    } catch (PDOException $eccezione) {
        http_response_code(500);
        echo json_encode(['errore' => 'Errore nel recupero delle regioni: ' . $eccezione->getMessage()]);
    }
}

function ottieniTuttiGliUtenti(PDO $connessioneDB, bool $includiCancellati = false) {
    try {
        $querySql = "SELECT ID, Nome, Email, IscrittoNewsletter, DataCreazione, DataAggiornamento FROM utenti";
        if (!$includiCancellati) {
            $querySql .= " WHERE isDeleted = FALSE";
        }
        $statement = $connessioneDB->prepare($querySql);
        $statement->execute();
        $utenti = $statement->fetchAll();
        echo json_encode($utenti);
    } catch (PDOException $eccezione) {
        http_response_code(500);
        echo json_encode(['errore' => 'Errore nel recupero degli utenti: ' . $eccezione->getMessage()]);
    }
}
?>
