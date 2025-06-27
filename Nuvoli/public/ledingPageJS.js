// Theme toggle functionality
const toggleThemeBtn = document.getElementById('toggleTheme');
const themeIcon = document.createElement('img');
themeIcon.id = 'themeIcon';
themeIcon.className = 'theme-icon';

// Theme icons
const iconDark = '../public/LoginPage/AppMetoFrontendMaterial/Ref/icone/icons8-non-disturbare-2-100.png';
const iconLight = '../public/LoginPage/AppMetoFrontendMaterial/Ref/icone/icons8-sole-100.png';

toggleThemeBtn.appendChild(themeIcon);

// Update theme icon
function aggiornaIconaTema() {
  const isDark = document.body.classList.contains('dark-mode');
  themeIcon.src = isDark ? iconLight : iconDark;
  themeIcon.alt = isDark ? 'Light mode' : 'Dark mode';
}

// Toggle theme
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

// ================================ BACKEND LOGIC ================================

// Utility functions for form management
function resetFormInputs() {
  const allInputs = document.querySelectorAll('.popup input');
  allInputs.forEach(input => {
    input.value = "";
  });
}

// Handle form submission with backend API
async function handleFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  
  // Determine if it's login or registration based on form context
  const isRegisterForm = form.closest('.register-form') !== null;
  const formAction = isRegisterForm ? "../api/register.php" : "../api/login.php";

  try {
    const response = await fetch(formAction, {
      method: "POST",
      body: formData
    });

    const responseData = await response.json();

    const isLoginOrRegister = formAction === "../api/login.php" || formAction === "../api/register.php";
    const isSuccess = responseData.status === "success";

    if (isLoginOrRegister && isSuccess) {
      // Redirect to main app on successful login/registration
      window.location.href = "../public/MiddlePage/middlePage.html";
    } else {
      alert(responseData.message);
    }

  } catch (error) {
    console.error('Errore durante l\'invio del form:', error);
    alert("Errore di connessione: " + error.message);
  }
}

// ================================ POPUP MANAGEMENT ================================

// Show login popup
document.querySelector("#show-login").addEventListener("click", function () {
  document.querySelector(".popup").classList.add("active");
  document.querySelector("#overlay").classList.add("active");
});

// Close popup (both from buttons and overlay)
document.querySelectorAll(".close-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const popup = document.querySelector(".popup");
    popup.classList.remove("active", "slide-register");
    document.querySelector("#overlay").classList.remove("active");
    resetFormInputs(); // Reset inputs when closing
  });
});

document.querySelector("#overlay").addEventListener("click", function () {
  const popup = document.querySelector(".popup");
  popup.classList.remove("active", "slide-register");
  document.querySelector("#overlay").classList.remove("active");
  resetFormInputs(); // Reset inputs when closing
});

// Switch between login and register
document.querySelector(".switch-to-register").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".popup").classList.add("slide-register");
  resetFormInputs(); // Reset inputs when switching forms
});

document.querySelector(".switch-to-login").addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".popup").classList.remove("slide-register");
  resetFormInputs(); // Reset inputs when switching forms
});

// ================================ FORM SUBMISSION ================================

// Add event listeners for form submission
document.addEventListener('DOMContentLoaded', function() {
  // Handle login form submission
  const loginForm = document.querySelector('.login-form');
  if (loginForm) loginForm.addEventListener('submit', handleFormSubmit);

  const registerForm = document.querySelector('.register-form');
  if (registerForm) registerForm.addEventListener('submit', handleFormSubmit);
});

// Separate function to handle form data submission
async function submitFormData(formData, actionUrl) {
  try {
    const response = await fetch(actionUrl, {
      method: "POST",
      body: formData
    });

    const responseData = await response.json();

    if (responseData.status === "success") {
      // Redirect to main app on successful login/registration
      window.location.href = "../public/MiddlePage/middlePage.html";
    } else {
      alert(responseData.message);
    }

  } catch (error) {
    console.error('Errore durante l\'invio del form:', error);
    alert("Errore di connessione: " + error.message);
  }
}

// ================================ PASSWORD TOGGLE ================================

// Toggle password visibility (modified for checkbox)
document.querySelectorAll(".toggle-password").forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const passwordInput = checkbox.previousElementSibling;
    passwordInput.type = checkbox.checked ? "text" : "password";
  });
});

// ================================ LANGUAGE DROPDOWN ================================

// Javascript per la tendina
const btn = document.getElementById('dropdownBtn'); // Per gestire il bottone
const menu = document.getElementById('dropdownMenu'); // Menù opzioni

btn.addEventListener('click', () => { // Quando clicchi apre e chiud il menù
    if (menu.classList.contains('open')) { // Se il menù è aperto, lo chiude
        menu.style.height = menu.scrollHeight + 'px';
        requestAnimationFrame(() => {
            menu.style.height = '0'; // Tornatene al tuo posto!
            menu.classList.remove('open'); // Nasconde il menù
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false'); // Accessibilità per screen reader (non so cosa sia XD)
        });
    } else {
        menu.style.height = '0'; // Apre il menù se è chiuso
        menu.classList.add('open');
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => { // Animazione in basso
            menu.style.height = menu.scrollHeight + 'px';
        });
    }
});

// Quando finisce la transizione, si resetta l'altezza
menu.addEventListener('transitionend', () => {
    if (menu.classList.contains('open')) {
        menu.style.height = 'auto';
    }
});