/* globalTranslations.js
   Gestisce traduzioni e cambio lingua per la pagina di login/registrazione.
   Usa lo stesso schema data-translate-key impiegato nelle altre pagine.
*/

// ----------------------------
// Dizionario traduzioni
// ----------------------------
const translations = {
  it: {
    appTitle: 'Nuvolì',
    heroSubtitle: 'Il meteo a portata di clic',
    heroDescription: 'Perché le previsioni le puoi trovare anche qui!',
    loginButton: 'Inizia',
    loginFormTitle: 'Login',
    namePlaceholder: 'Nome',
    passwordPlaceholder: 'Password',
    showPassword: 'Mostra la password',
    enterButton: 'Entra',
    orText: 'Oppure',
    registerLink: 'Registrati',
    continueAsGuest: 'Continua Come Ospite',
    registrationFormTitle: 'Registrazione',
    loginLink: 'Accedi',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'Modalità scura',
    closeButtonAlt: 'Chiudi',
    logoAlt: 'Logo Nuvolì'
  },
  en: {
    appTitle: 'Nuvolì',
    heroSubtitle: 'Weather at your fingertips',
    heroDescription: 'Because you can find forecasts here too!',
    loginButton: 'Start',
    loginFormTitle: 'Login',
    namePlaceholder: 'Name',
    passwordPlaceholder: 'Password',
    showPassword: 'Show password',
    enterButton: 'Enter',
    orText: 'Or',
    registerLink: 'Register',
    continueAsGuest: 'Continue As Guest',
    registrationFormTitle: 'Registration',
    loginLink: 'Login',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'Dark mode',
    closeButtonAlt: 'Close',
    logoAlt: 'Nuvolì Logo'
  },
  fr: {
    appTitle: 'Nuvolì',
    heroSubtitle: 'La météo à portée de clic',
    heroDescription: 'Parce que vous pouvez aussi trouver les prévisions ici !',
    loginButton: 'Commencer',
    loginFormTitle: 'Connexion',
    namePlaceholder: 'Nom',
    passwordPlaceholder: 'Mot de passe',
    showPassword: 'Afficher le mot de passe',
    enterButton: 'Entrer',
    orText: 'Ou',
    registerLink: "S'inscrire",
    continueAsGuest: 'Continuer en tant qu\'invité',
    registrationFormTitle: 'Inscription',
    loginLink: 'Se connecter',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'Mode sombre',
    closeButtonAlt: 'Fermer',
    logoAlt: 'Logo Nuvolì'
  },
  ar: {
    appTitle: 'نوفولي',
    heroSubtitle: 'الطقس في متناول يدك',
    heroDescription: 'لأنك تجد التوقعات هنا أيضًا!',
    loginButton: 'ابدأ',
    loginFormTitle: 'تسجيل الدخول',
    namePlaceholder: 'الاسم',
    passwordPlaceholder: 'كلمة المرور',
    showPassword: 'إظهار كلمة المرور',
    enterButton: 'دخول',
    orText: 'أو',
    registerLink: 'سجل',
    continueAsGuest: 'متابعة كضيف',
    registrationFormTitle: 'تسجيل',
    loginLink: 'تسجيل الدخول',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'الوضع الداكن',
    closeButtonAlt: 'إغلاق',
    logoAlt: 'شعار نوفولي'
  },
  sq: {
    appTitle: 'Nuvolì',
    heroSubtitle: 'Moti në majë të gishtave',
    heroDescription: 'sepse parashikimet mund t\'i gjeni edhe këtu!',
    loginButton: 'Fillo',
    loginFormTitle: 'Hyrje',
    namePlaceholder: 'Emri',
    passwordPlaceholder: 'Fjalëkalimi',
    showPassword: 'Trego fjalëkalimin',
    enterButton: 'Hyr',
    orText: 'Ose',
    registerLink: 'Regjistrohu',
    continueAsGuest: 'Vazhdo Si I Ftuar',
    registrationFormTitle: 'Regjistrim',
    loginLink: 'Kyçu',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'Modaliteti i errët',
    closeButtonAlt: 'Mbyll',
    logoAlt: 'Logoja Nuvolì'
  },
  fa: {
    appTitle: 'Nuvolì',
    heroSubtitle: 'Havashenasi dar daste to',
    heroDescription: 'Chon pishbini ra inja ham peyda mikoni!',
    loginButton: 'Shoru',
    loginFormTitle: 'Login',
    namePlaceholder: 'Esm',
    passwordPlaceholder: 'Password',
    showPassword: 'Neshan dadan Password',
    enterButton: 'Vorud',
    orText: 'Ya',
    registerLink: 'Sabtenam',
    continueAsGuest: 'Edame be onvane Mehmān',
    registrationFormTitle: 'Sabtenam',
    loginLink: 'Login',
    languageItalian: 'Italiano',
    languageEnglish: 'English',
    languageFrench: 'Français',
    languageArabic: 'العربية',
    languageAlbanian: 'Shqip',
    languageFinglish: 'Finglish',
    toggleThemeLabel: 'Dark mode',
    closeButtonAlt: 'Baste',
    logoAlt: 'Logo Nuvolì'
  }
};

// Mappa per nomi da visualizzare nella tendina del bottone principale
const langNameKeyMap = {
  it: 'languageItalian',
  en: 'languageEnglish',
  fr: 'languageFrench',
  ar: 'languageArabic',
  sq: 'languageAlbanian',
  fa: 'languageFinglish'
};

function getFlagFileName(lang) {
  switch (lang) {
    case 'it': return 'Italia.png';
    case 'en': return 'inghilterra.jpg';
    case 'fr': return 'francia.png';
    case 'ar': return 'marocco.png';
    case 'sq': return 'albania.png';
    case 'fa': return 'iran.webp';
    default: return 'Italia.png';
  }
}

function applyTranslations(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-translate-key]').forEach(el => {
    const key = el.getAttribute('data-translate-key');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
        el.setAttribute('placeholder', translations[lang][key]);
      } else if (el.tagName === 'IMG' && el.hasAttribute('alt')) {
        el.setAttribute('alt', translations[lang][key]);
      } else if (el.tagName === 'TITLE') {
        document.title = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Aggiorna bottone tendina con nome e bandiera
  const langText = document.querySelector('#dropdownBtn .language-text');
  const langImage = document.querySelector('#dropdownBtn img');
  if (langText && langImage) {
    langText.textContent = translations[lang][langNameKeyMap[lang]];
    langImage.src = `../public/LoginPage/AppMetoFrontendMaterial/Ref/Bandiere/${getFlagFileName(lang)}`;
    langImage.alt = lang.toUpperCase();
  }

  localStorage.setItem('selectedLanguage', lang);
}

// ----------------------------
// INIT
// ----------------------------
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('selectedLanguage') || 'it';
  applyTranslations(savedLang);

  // Aggancia i pulsanti della tendina se esistono
  const menu = document.getElementById('dropdownMenu');
  if (menu) {
    menu.querySelectorAll('button[role="menuitem"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const selectedLang = btn.getAttribute('data-lang') || 'it';
        console.log('Lingua selezionata:', selectedLang);
        applyTranslations(selectedLang);
      });
    });
  }
});
