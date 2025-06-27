
/* JS PER LA NAVBAR */
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

/* SEARCH FUNCTIONALITY */
let cittaDisponibili = [];

async function caricaCittaDaAPI() {
  // Simula API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Dati finti città
  cittaDisponibili = ["Torino", "Milano", "Palermo", "Courmayeur"];
}

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
  filtraSuggerimenti(); // mostra tutti i suggerimenti al focus
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-wrapper')) {
    document.getElementById('suggerimenti').style.display = 'none';
  }
});

window.addEventListener('DOMContentLoaded', caricaCittaDaAPI);

/* DARK MODE */
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
