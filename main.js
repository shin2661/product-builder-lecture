
// --- THEME ---
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const applyTheme = (theme) => {
    if (theme === 'light') {
        body.dataset.theme = 'light';
        themeToggle.textContent = '🌑';
    } else {
        delete body.dataset.theme;
        themeToggle.textContent = '🌓';
    }
};

themeToggle.addEventListener('click', () => {
    const newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// --- LANGUAGE ---
const langKoBtn = document.getElementById('lang-ko');
const langEnBtn = document.getElementById('lang-en');
let currentLanguage = 'ko';
let currentDinnerMenus = [];

const setLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    const translations = languages[lang];
    currentDinnerMenus = translations.dinnerMenus;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = translations[key];
    });

    // Reset menu recommendation
    const menuItemSpan = document.getElementById('menu-item');
    menuItemSpan.textContent = translations.menuPlaceholder;
    menuItemSpan.classList.add('menu-item-placeholder');
};

langKoBtn.addEventListener('click', () => setLanguage('ko'));
langEnBtn.addEventListener('click', () => setLanguage('en'));


// --- RECOMMENDATION ---
const recommendBtn = document.getElementById('recommend-btn');
const menuItemSpan = document.getElementById('menu-item');

recommendBtn.addEventListener('click', () => {
    if (currentDinnerMenus.length === 0) return;

    const randomIndex = Math.floor(Math.random() * currentDinnerMenus.length);
    const selectedMenu = currentDinnerMenus[randomIndex];
    menuItemSpan.textContent = selectedMenu;
    menuItemSpan.classList.remove('menu-item-placeholder');
});


// --- INITIAL LOAD ---
const init = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const savedLang = localStorage.getItem('language') || 'ko';
    setLanguage(savedLang);
};

init();
