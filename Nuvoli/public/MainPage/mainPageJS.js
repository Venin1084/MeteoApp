/* JS PER LA NAVBAR  */

// ================================ CONFIGURAZIONE API ================================
let weatherConfig = null;

async function getWeatherConfig() {
    if (weatherConfig) return weatherConfig;
    
    try {
        const response = await fetch('../../api/weather_api.php');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        weatherConfig = await response.json();
        return weatherConfig;
    } catch (error) {
        console.error('Errore configurazione API:', error);
        // Nessun fallback con chiave API lato client!
        throw new Error('Configurazione API non disponibile');
    }
}

// === helper to read ?city= from the URL ===
function getCityFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('city') || 'Torino';
}

// === call your PHP endpoint to get the temp (fallback) ===
async function fetchTemperature(city) {
  try {
    const res = await fetch(
      `http://localhost/AppMeteo-1/api/meteo?city=${encodeURIComponent(city)}`
    );
    if (!res.ok) throw new Error(`Server returned ${res.status}`);
    const { temp } = await res.json();
    return temp;
  } catch (error) {
    console.error('Errore API locale:', error);
    // Fallback con API esterna
    return await fetchWeatherDataFromAPI(city);
  }
}

// === Nuova funzione per ottenere dati completi dall'API esterna ===
async function fetchWeatherDataFromAPI(cityName) {
    try {
        const config = await getWeatherConfig();
        const requestUrl = `${config.api_url}?q=${cityName}&appid=${config.api_key}&units=metric&lang=it`;
        
        const response = await fetch(requestUrl);
        const weatherData = await response.json();
        
        if (response.ok) {
            return weatherData;
        } else {
            throw new Error('Città non trovata');
        }
        
    } catch (error) {
        console.error('Errore nel recupero dei dati meteo:', error);
        throw error;
    }
}

// === Funzione per aggiornare tutti i dati meteo nella pagina ===
async function updateWeatherData(cityName) {
    try {
        // Mostra indicatori di caricamento
        document.getElementById('temperature').textContent = '…';
        document.getElementById('cityName').textContent = cityName;
        
        // Ottieni dati meteo completi
        const weatherData = await fetchWeatherDataFromAPI(cityName);
        
        // Aggiorna temperatura
        const temperature = Math.round(weatherData.main.temp);
        document.getElementById('temperature').textContent = `${temperature}°`;
        
        // Aggiorna icona meteo
        const weatherIcon = document.querySelector('#weatherIcon img');
        if (weatherIcon && weatherData.weather[0].icon) {
            weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            weatherIcon.alt = weatherData.weather[0].description;
        }
        
        // Aggiorna condizioni climatiche
        if (weatherData.wind?.speed) {
            document.getElementById('wind').textContent = `${(weatherData.wind.speed * 3.6).toFixed(1)}km/h`;
        }
        
        if (weatherData.main?.humidity) {
            document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        }
        
        if (weatherData.rain?.['1h']) {
            const rainChance = Math.min(Math.round(weatherData.rain['1h'] * 10), 100);
            document.getElementById('rain').textContent = `${rainChance}%`;
        }
        
        // Aggiorna indice UV (simulato basato su ora del giorno)
        const currentHour = new Date().getHours();
        let uvIndex = 0;
        if (currentHour >= 10 && currentHour <= 16) {
            uvIndex = Math.floor(Math.random() * 8) + 3; // UV tra 3-10 durante il giorno
        } else if (currentHour >= 8 && currentHour <= 18) {
            uvIndex = Math.floor(Math.random() * 5) + 1; // UV più basso
        }
        document.getElementById('uvIndex').textContent = uvIndex.toString();
        
        // Aggiorna alba e tramonto se disponibili
        if (weatherData.sys?.sunrise && weatherData.sys?.sunset) {
            const sunrise = new Date(weatherData.sys.sunrise * 1000);
            const sunset = new Date(weatherData.sys.sunset * 1000);
            
            document.getElementById('sunrise').textContent = 
                `Alba ${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}`;
            document.getElementById('sunset').textContent = 
                `Tramonto ${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}`;
        }
        
        // Aggiorna la data
        const now = new Date();
        const giorni = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
        const mesi = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];
        
        const giornoSettimana = giorni[now.getDay()];
        const giorno = now.getDate();
        const mese = mesi[now.getMonth()];
        
        document.getElementById('date').textContent = `${giornoSettimana} ${giorno} ${mese}`;
        
    } catch (error) {
        console.error('Errore nell\'aggiornamento dati meteo:', error);
        document.getElementById('temperature').textContent = '--°';
    }
}

const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");
const overlay = document.getElementById("overlay");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
  overlay.classList.toggle("active");
});

// Chiudi la sidebar cliccando sull'overlay
overlay.addEventListener("click", () => {
  hamMenu.classList.remove("active");
  offScreenMenu.classList.remove("active");
  overlay.classList.remove("active");
});

// Chiusura sidebar anche tramite X se presente
const closeSidebar = document.querySelector(".close-x");
if (closeSidebar) {
  closeSidebar.addEventListener("click", () => {
    hamMenu.classList.remove("active");
    offScreenMenu.classList.remove("active");
    overlay.classList.remove("active");
  });
}

let cittaDisponibili = [];

// === Carica città dall'API esterna se quella locale fallisce ===
async function caricaCittaDaDB() {
  try {
    const response = await fetch('../../api/cities.php');
    if (response.ok) {
      cittaDisponibili = await response.json();
    } else {
      // Lista di emergenza
      cittaDisponibili = [
        "Torino", "Milano", "Palermo", "Courmayeur"
      ];
    }
  } catch (error) {
    console.error('Errore nel caricamento città:', error);
    // Lista minima di emergenza
    cittaDisponibili = ["Torino", "Milano", "Palermo", "Courmayeur"];
  }
}

window.addEventListener('DOMContentLoaded', caricaCittaDaDB);

function filtraSuggerimenti(valore = '') {
  const suggerimentiBox = document.getElementById('suggerimenti');
  suggerimentiBox.innerHTML = '';

  const filtrate = cittaDisponibili.filter(citta =>
    citta.toLowerCase().startsWith(valore.toLowerCase())
  );

  if (filtrate.length === 0) {
    suggerimentiBox.style.display = 'none';
    return;
  }

  filtrate.forEach(citta => {
    const div = document.createElement('div');
    div.textContent = citta;
    div.onclick = () => {
      document.getElementById('city').value = citta;
      suggerimentiBox.style.display = 'none';
      // Aggiorna i dati meteo quando viene selezionata una città
      updateWeatherData(citta);
    };
    suggerimentiBox.appendChild(div);
  });

  suggerimentiBox.style.display = 'block';
}

document.getElementById('city').addEventListener('input', (e) => {
  filtraSuggerimenti(e.target.value);
});

document.getElementById('city').addEventListener('focus', () => {
  filtraSuggerimenti(); // mostra tutti i suggerimenti al focus
});

// === Aggiunta gestione ENTER per cercare città ===
document.getElementById('city').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const cityName = e.target.value.trim();
    if (cityName && cittaDisponibili.includes(cityName)) {
      updateWeatherData(cityName);
      document.getElementById('suggerimenti').style.display = 'none';
    }
  }
});

// === Aggiunta click sull'icona di ricerca ===
document.querySelector('.search-icon').addEventListener('click', () => {
  const cityName = document.getElementById('city').value.trim();
  if (cityName && cittaDisponibili.includes(cityName)) {
    updateWeatherData(cityName);
    document.getElementById('suggerimenti').style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) {
    document.getElementById('suggerimenti').style.display = 'none';
  }
});

// Slider trascinabile con tasto destro del mouse
(function enableRightClickDragSlider() {
  const slider = document.getElementById("forecastSlider");

  let isDragging = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // Disabilita il menu destro per abilitare lo swipe
  });

  slider.addEventListener("mousedown", (e) => {
    if (e.button === 2) { // Tasto destro
      isDragging = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    }
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Velocità di trascinamento
    slider.scrollLeft = scrollLeft - walk;
  });
})();

/* ORE DEL GIORNO - Aggiornato per usare dati reali */
// === Funzione per ottenere previsioni orarie (simulata) ===
async function generateHourlyForecast(cityName) {
  try {
    const weatherData = await fetchWeatherDataFromAPI(cityName);
    const baseTemp = Math.round(weatherData.main.temp);
    const currentHour = new Date().getHours();
    
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0') + ".00";
      // Simula variazione di temperatura durante il giorno
      let tempVariation = 0;
      if (i >= 6 && i <= 12) {
        tempVariation = Math.floor(Math.random() * 5) + 2; // Più caldo durante il giorno
      } else if (i >= 18 || i <= 6) {
        tempVariation = Math.floor(Math.random() * 3) - 4; // Più freddo di notte
      }
      
      const temp = baseTemp + tempVariation;
      return { hour, temp, isCurrentHour: i === currentHour };
    });
  } catch (error) {
    console.error('Errore nel generare previsioni orarie:', error);
    // Fallback con dati casuali
    return Array.from({ length: 24 }, (_, i) => {
      const hour = i.toString().padStart(2, '0') + ".00";
      const temp = Math.floor(Math.random() * 15) + 10;
      return { hour, temp, isCurrentHour: i === new Date().getHours() };
    });
  }
}

// POPOLA SLIDER METEO ORE 00–23
document.addEventListener("DOMContentLoaded", async () => {
  const cityName = getCityFromQuery();
  const forecast = await generateHourlyForecast(cityName);

  function getWeatherIcon(temp) {
    if (temp > 23) return '☀️';
    if (temp > 15) return '🌤️';
    if (temp > 10) return '🌥️';
    return '🌧️';
  }

  const slider = document.getElementById("forecastSlider");
  slider.innerHTML = ''; // Pulisce il contenuto esistente
  
  forecast.forEach(f => {
    const icon = getWeatherIcon(f.temp);
    const div = document.createElement("div");
    div.className = `hour-box ${f.isCurrentHour ? 'current-hour' : ''}`;
    div.innerHTML = `
      <div>${f.hour}</div>
      <div>${icon}</div>
      <div>${f.temp}°</div>
    `;
    slider.appendChild(div);
  });

  // AGGIUNTA: SCROLL CON ICONE < >
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (leftArrow && rightArrow && slider) {
    leftArrow.addEventListener("click", () => {
      slider.scrollBy({ left: -150, behavior: "smooth" });
    });

    rightArrow.addEventListener("click", () => {
      slider.scrollBy({ left: 150, behavior: "smooth" });
    });
  }
});

// SCROLL MANUALE CON TRASCINAMENTO DEL MOUSE
(function enableLeftClickDragSlider() {
  const slider = document.getElementById("forecastSlider");

  let isDragging = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return; // solo tasto sinistro
    isDragging = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDragging = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
  });
})();

/* ALBA E TRAMONTO - Aggiornato per usare dati reali */
function drawSunGraph() {
  const canvas = document.getElementById("sunGraph");
  if (!canvas) return;
  
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const amplitude = 40;
  const frequency = 2 * Math.PI / width;
  const midY = height / 2;

  ctx.clearRect(0, 0, width, height);

  // Disegna onda sinusoidale
  ctx.beginPath();
  for (let x = 0; x <= width; x++) {
    const y = midY - Math.sin(x * frequency) * amplitude;
    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = document.body.classList.contains('dark-mode') ? "#ffffff" : "#333333";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Sole al centro (mezzogiorno)
  const sunX = width / 2;
  const sunY = midY - Math.sin(sunX * frequency) * amplitude;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 10, 0, 2 * Math.PI);
  ctx.fillStyle = "#f8ca4d";
  ctx.fill();
}

async function aggiornaSunTimes(cityName) {
  try {
    const weatherData = await fetchWeatherDataFromAPI(cityName);
    
    if (weatherData.sys?.sunrise && weatherData.sys?.sunset) {
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);
      
      document.getElementById("sunrise").textContent = 
        `Alba ${sunrise.getHours().toString().padStart(2, '0')}:${sunrise.getMinutes().toString().padStart(2, '0')}`;
      document.getElementById("sunset").textContent = 
        `Tramonto ${sunset.getHours().toString().padStart(2, '0')}:${sunset.getMinutes().toString().padStart(2, '0')}`;
    }
    
    drawSunGraph();
  } catch (error) {
    console.error('Errore nel recupero orari alba/tramonto:', error);
    // Fallback con orari simulati
    document.getElementById("sunrise").textContent = "Alba 06:30";
    document.getElementById("sunset").textContent = "Tramonto 20:45";
    drawSunGraph();
  }
}

/* DARK MODE CON IMMAGINI */
const toggleThemeBtn = document.getElementById('toggleTheme');
const themeIcon = document.createElement('img');
themeIcon.id = 'themeIcon';
themeIcon.className = 'theme-icon';
themeIcon.src = 'AppMetoFrontendMaterial/Ref/icone/iconaLuna.png';
themeIcon.alt = 'Dark mode';
toggleThemeBtn.innerHTML = '';
toggleThemeBtn.appendChild(themeIcon);

function aggiornaIconaTema() {
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.src = isDark 
    ? 'AppMetoFrontendMaterial/Ref/icone/icons8-sole-100.png' 
    : 'AppMetoFrontendMaterial/Ref/icone/icons8-non-disturbare-2-100.png';
  themeIcon.alt = isDark ? 'Light mode' : 'Dark mode';
  
  // Ridisegna il grafico del sole con il nuovo tema
  drawSunGraph();
}

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  aggiornaIconaTema();
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode') === 'true';
  if (darkModePreference) {
    document.body.classList.add('dark-mode');
  }
  aggiornaIconaTema();
});

// === Inizializzazione principale ===
window.addEventListener('DOMContentLoaded', async () => {
  try {
    // 1) get city from ?city=
    const city = getCityFromQuery();
    
    // 2) Carica i dati delle città
    await caricaCittaDaDB();
    
    // 3) Aggiorna tutti i dati meteo
    await updateWeatherData(city);
    
    // 4) Aggiorna alba e tramonto
    await aggiornaSunTimes(city);
    
  } catch (err) {
    console.error('Errore nell\'inizializzazione:', err);
    document.getElementById('temperature').textContent = '--°';
    document.getElementById('cityName').textContent = 'Errore';
  }
});

// === Funzione globale per compatibilità ===
window.weatherFn = function(cityName) {
  updateWeatherData(cityName);
};