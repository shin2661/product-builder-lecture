
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
let shuffledMenus = [];
let currentIndex = 0;

// 셔플 함수 (피셔-예이츠 알고리즘)
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const setLanguage = (lang) => {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;

    const translations = languages[lang];
    
    // 메뉴 목록을 셔플하고 인덱스를 초기화합니다.
    shuffledMenus = shuffleArray([...translations.dinnerMenus]);
    currentIndex = 0;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[key]) {
            if (element.tagName === 'TITLE') {
                document.title = translations[key];
            } else {
                element.textContent = translations[key];
            }
        }
    });

    const menuItemSpan = document.getElementById('menu-item');
    if (menuItemSpan) {
        menuItemSpan.textContent = translations.menuPlaceholder;
        menuItemSpan.classList.add('menu-item-placeholder');
    }
    
    populateMenuList(translations.dinnerMenus); // 원본 순서대로 목록 채우기
};

langKoBtn.addEventListener('click', () => setLanguage('ko'));
langEnBtn.addEventListener('click', () => setLanguage('en'));


// --- RECOMMENDATION (Only on Index Page) ---
const recommendBtn = document.getElementById('recommend-btn');
if (recommendBtn) {
    const menuItemSpan = document.getElementById('menu-item');
    recommendBtn.addEventListener('click', () => {
        if (shuffledMenus.length === 0) return;

        // 모든 메뉴가 추천되었다면, 다시 셔플합니다.
        if (currentIndex >= shuffledMenus.length) {
            shuffledMenus = shuffleArray(shuffledMenus);
            currentIndex = 0;
        }

        const selectedMenu = shuffledMenus[currentIndex];
        currentIndex++;
        
        menuItemSpan.textContent = selectedMenu;
        menuItemSpan.classList.remove('menu-item-placeholder');
    });
}

// --- NAVIGATION ---
const setActiveNav = () => {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
};

// --- MENU LIST (Only on Index Page) ---
const populateMenuList = (menus) => {
    const menuList = document.getElementById('menu-list');
    if (menuList) {
        menuList.innerHTML = ''; // Clear existing list
        menus.forEach(menu => {
            const li = document.createElement('li');
            li.textContent = menu;
            menuList.appendChild(li);
        });
    }
};

// --- INITIAL LOAD ---
const init = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    const savedLang = localStorage.getItem('language') || 'ko';
    setLanguage(savedLang);
    
    setActiveNav();
};

init();
