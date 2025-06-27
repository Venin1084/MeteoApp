// Hamburger menu toggle
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

// Dark mode toggle
const toggleThemeBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('themeIcon');

function aggiornaIconaTema() {
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.src = isDark 
    ? 'AppMetoFrontendMaterial/Ref/icone/icons8-sole-100.png' 
    : 'AppMetoFrontendMaterial/Ref/icone/icons8-non-disturbare-2-100.png';
  themeIcon.alt = isDark ? 'Light mode' : 'Dark mode';
}

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  aggiornaIconaTema();
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load theme preference
document.addEventListener('DOMContentLoaded', () => {
  const darkModePreference = localStorage.getItem('darkMode') === 'true';
  if (darkModePreference) {
    document.body.classList.add('dark-mode');
  }
  aggiornaIconaTema();
});

let cittaDisponibili = [];

async function caricaCittaDaAPI() {
  // Simula API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dati finti città
  cittaDisponibili = ["Torino", "Milano", "Palermo", "Courmayeur"];
}


// Avvia il caricamento una volta che il DOM è pronto
window.addEventListener('DOMContentLoaded', caricaCittaDaAPI);

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
    };
    suggerimentiBox.appendChild(div);
  });

  suggerimentiBox.style.display = 'block';
}

document.getElementById('city').addEventListener('input', (e) => {
  filtraSuggerimenti(e.target.value);
});

document.getElementById('city').addEventListener('focus', () => {
  filtraSuggerimenti();
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) {
    document.getElementById('suggerimenti').style.display = 'none';
  }
});

window.addEventListener('DOMContentLoaded', caricaCittaDaAPI);


// once the DOM is ready, wire up each “Seleziona” link
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.city-card').forEach(card => {
    const cityName = card.dataset.city;               // e.g. "Torino"
    const link    = card.querySelector('.select-btn'); 
    // set the real href with query-string
    link.href = `../MainPage/mainPage.html?city=${encodeURIComponent(cityName)}`;
  });
});
