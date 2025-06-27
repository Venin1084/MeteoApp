// ================================ ELEMENTI DOM ================================
const overlay = document.getElementById("overlay");
const popup = document.querySelector(".popup");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formElement = document.getElementById("form-id");
const formRegisterElement = document.getElementById("form-register");

const userInfoSection = document.getElementById('user-info');
const welcomeUserSpan = document.getElementById('welcome-user');
const logoutButton = document.getElementById('logout-btn');

// ================================ FUNZIONI UTILITY ================================
function resetFormInputs() {
  const allInputs = document.querySelectorAll('.popup input');
  allInputs.forEach(input => {
    input.value = "";
  });
}

function showLoginForm() {
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
}

function showRegisterForm() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
}

function showWeatherApp() {
  initialScreen.style.display = 'none';
  weatherContainer.style.display = 'block';
  loadCitiesList();
  fetchWeatherData('Noida');
}

// ================================ GESTIONE FORM ================================
function toggleFormMode() {
  resetFormInputs();

  const isCurrentlyRegister = formElement.getAttribute("action") === "../../../api/register.php";

  if (isCurrentlyRegister) {
    // Cambia a modalità login
    formElement.setAttribute("action", "../../../api/login.php");
    formSubmitButton.textContent = "Entra";
  } else {
    // Cambia a modalità registrazione
    formElement.setAttribute("action", "../../../api/register.php");
    formSubmitButton.textContent = "Registrati";
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const formAction = form.getAttribute("action");

  try {
    const response = await fetch(formAction, {
      method: "POST",
      body: formData
    });

    const responseData = await response.json();

    const isLoginOrRegister = formAction === "../../../api/login.php" || formAction === "../../../api/register.php";
    const isSuccess = responseData.status === "success";

    if (isLoginOrRegister && isSuccess) {
      window.location.href = "../../MiddlePage/middlePage.html"
    } else {
      alert(responseData.message);
    }

  } catch (error) {
    console.error('Errore durante l\'invio del form:', error);
    alert("Errore di connessione: " + error.message);
  }
}

// ================================ GESTIONE POPUP ================================
function showPopup() {
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closePopup() {
  popup.classList.remove("active");
  overlay.classList.remove("active");
  // Torna sempre al form di login quando si chiude
  showLoginForm();
}

// ================================ GESTIONE TEMA ================================
const toggleThemeBtn = document.getElementById('toggleTheme');

const themeIcon = document.createElement('img');
themeIcon.id = 'themeIcon';
themeIcon.className = 'theme-icon';

// Usa i percorsi delle tue icone qui (li ho messi di esempio)
const iconDark = 'AppMetoFrontendMaterial/Ref/icone/icons8-non-disturbare-2-100.png'; // luna per tema chiaro
const iconLight = 'AppMetoFrontendMaterial/Ref/icone/icons8-sole-100.png'; // sole per tema scuro

toggleThemeBtn.appendChild(themeIcon);

function aggiornaIconaTema() {
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.src = isDark ? iconLight : iconDark;
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

// ================================ EVENT LISTENERS ================================
document.querySelector("#show-login").addEventListener("click", showPopup);

document.querySelectorAll(".close-btn").forEach(function (btn) {
  btn.addEventListener("click", closePopup);
});

document.querySelector(".switch-to-register").addEventListener("click", function (e) {
  e.preventDefault();
  showRegisterForm();
});

document.querySelector(".switch-to-login").addEventListener("click", function (e) {
  e.preventDefault();
  showLoginForm();
});

document.querySelectorAll(".toggle-password").forEach((btn) => {
  btn.addEventListener("click", () => {
    const passwordInput = btn.previousElementSibling;
    if (passwordInput.getAttribute("type") === "password") {
      passwordInput.setAttribute("type", "text");
      btn.classList.replace("btn-Password", "close-btn");
    } else {
      passwordInput.setAttribute("type", "password");
      btn.classList.replace("close-btn", "btn-Password");
    }
  });
});

overlay.addEventListener("click", closePopup);

formElement.addEventListener("submit", handleFormSubmit);
formRegisterElement.addEventListener("submit", handleFormSubmit);
logoutButton.addEventListener("click", handleUserLogout);

// Bottone ricerca meteo
citySelectButton.addEventListener('click', function () {
  const cityName = citySelectInput.value.trim();
  if (cityName) {
    fetchWeatherData(cityName);
  } else {
    alert('Inserisci il nome di una città');
  }
});

// Enter key per ricerca
citySelectInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    const cityName = citySelectInput.value.trim();
    if (cityName) {
      fetchWeatherData(cityName);
    }
  }
});

// Tema
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  aggiornaIconaTema();
});

// ================================ INIZIALIZZAZIONE ================================
document.addEventListener('DOMContentLoaded', () => {
  aggiornaIconaTema();
});