
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
    let newTheme = body.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
}

const dinnerMenus = [
    "치킨", "피자", "삼겹살", "초밥", "파스타", "족발", "보쌈", "떡볶이", "김치찌개", "된장찌개",
    "부대찌개", "곱창", "막창", "라멘", "쌀국수", "햄버거", "타코", "카레", "돈까스", "마라탕"
];

const recommendBtn = document.getElementById('recommend-btn');
const menuItemSpan = document.getElementById('menu-item');

recommendBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * dinnerMenus.length);
    const selectedMenu = dinnerMenus[randomIndex];
    menuItemSpan.textContent = selectedMenu;
    menuItemSpan.classList.remove('menu-item-placeholder');
});
