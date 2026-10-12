// Основні елементи
const loginBtn = document.querySelector('.btn-login');
const heroBtn = document.querySelector('.btn-hero-login');
const modal = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const langBtns = document.querySelectorAll('.lang-btn');
const burger = document.getElementById('burgerMenu');
const nav = document.querySelector('.nav');

let isLoggedIn = false;
let currentUserName = "";

// Словник перекладів
const translations = {
    ua: {
        nav_home: "Головна",
        nav_services: "Послуги",
        hero_title: "Ваш онлайн банк",
        hero_desc: "Простий та зручний банкінг для кожного.",
        login_btn: "Увійти",
        menu_cards: "Картки та рахунки",
        menu_deps: "Депозити",
        contact: "Контакти",
        chat: " Чат підтримки 24/7",
        maps: " Мапа відділень",
        hotline: " Гаряча лінія",
        menu_plat: " Платежі та перекази",
        menu_credit: " Кредити",
        about: "Про банк",
        aboutinfo: "SferaBank допомагає керувати фінансами онлайн.",
        service: "Наші послуги",
        servmoney: "Переказ коштів",
        servkomu: "Оплата комунальних послуг",
        servcards: "Банківські картки",
        servonline: "Онлайн кредити",
        rights: "© 2026 SferaBank. Усі права захищені.",
        login: "Вхід у SferaBank",
        loginname: "Логін або телефон",
        loginpass: "Пароль",
        loginlogin: "Увійти",
        welcome_user: "Вітаємо",
        balance_info: "Ваш баланс: 125 400.50 ₴",
        my_cabinet: "Мій кабінет",
        logout: "Вихід",
        supportchat:"Привіт! 👋 Чим допомогти?",
        supportchat2:"Ваше питання...",
        order_title: "Замовити картку у нас!",
        order_subtitle: "Залиште свої дані, і наш менеджер зв'яжеться з вами для підтвердження",
        order_name: "Ваше ім'я",
        order_phone: "Номер телефону",
        order_select: "Оберіть тип картки",
        order_btn: "Відправити заявку",
        card_black: "Sfera Black (Кредитна)",
        card_green: "Sfera Green (Дебетова)",
        card_plat: "Sfera Platinum (Преміум)"
    },
    en: {
        nav_home: "Home",
        nav_services: "Services",
        hero_title: "Your Online Bank",
        hero_desc: "Simple and convenient banking for everyone.",
        login_btn: "Login",
        menu_cards: "Cards and accounts",
        menu_deps: "Deposits",
        contact: "Contacts",
        chat: "24/7 Support Chat",
        maps: "Branch map",
        hotline: "Hotline",
        menu_plat: "Payments and transfers",
        menu_credit: "Credits",
        about: "About bank",
        aboutinfo: "SferaBank helps you manage your finances online.",
        service: "Our services",
        servmoney: "Transfer of funds",
        servkomu: "Payment of utilities",
        servcards: "Bank cards",
        servonline: "Online loans",
        rights: "© 2026 SferaBank. All rights reserved.",
        login: "Login to SferaBank",
        loginname: "Username or phone",
        loginpass: "Password",
        loginlogin: "Login",
        welcome_user: "Welcome",
        balance_info: "Your balance: 125,400.50 ₴",
        my_cabinet: "My Cabinet",
        logout: "Logout",
        supportchat: "Hi! 👋 How can I help?",
        supportchat2: "Your question...",
        order_title: "Order your card now!",
        order_subtitle: "Leave your details, and our manager will contact you for confirmation",
        order_name: "Your name",
        order_phone: "Phone number",
        order_select: "Choose card type",
        order_btn: "Send application",
        card_black: "Sfera Black (Credit)",
        card_green: "Sfera Green (Debit)",
        card_plat: "Sfera Platinum (Premium)"
    }
};

// Функція оновлення мови
function updateAllTranslations() {
    const activeBtn = document.querySelector('.lang-btn.active');
    const lang = activeBtn ? activeBtn.innerText.toLowerCase() : 'ua';

    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        let translation = translations[lang][key];

        if (key === 'welcome_user' && currentUserName) {
            translation = lang === 'ua' ? `Вітаємо, ${currentUserName}!` : `Welcome, ${currentUserName}!`;
        }

        if (translation) {
            if (el.tagName === 'INPUT') {
                el.placeholder = translation;
            } else {
                el.innerText = translation;
            }
        }
    });
}

// Модальне вікно
function openModal() { modal.classList.add('active'); }
function closeModal() { modal.classList.remove('active'); }

loginBtn.addEventListener('click', () => isLoggedIn ? logout() : openModal());
heroBtn.addEventListener('click', () => isLoggedIn ? alert("Вхід у кабінет...") : openModal());
closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// Логіка входу
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginInput = loginForm.querySelector('input[type="text"]').value;
    const passwordInput = loginForm.querySelector('input[type="password"]').value;
    const submitBtn = loginForm.querySelector('.btn-submit-form');

    submitBtn.innerText = "Checking...";
    submitBtn.disabled = true;

    setTimeout(() => {
        if (loginInput === "admin" && passwordInput === "12345") {
            showSuccessLogin(loginInput);
        } else {
            showError(submitBtn);
        }
        submitBtn.disabled = false;
    }, 1000);
});

function showSuccessLogin(name) {
    closeModal();
    isLoggedIn = true;
    currentUserName = name;

    document.querySelector('.bank').setAttribute('data-lang', 'welcome_user');
    document.querySelector('.bankview').setAttribute('data-lang', 'balance_info');
    heroBtn.setAttribute('data-lang', 'my_cabinet');
    loginBtn.setAttribute('data-lang', 'logout');

    updateAllTranslations();
}

function showError(btn) {
    const lang = document.querySelector('.lang-btn.active').innerText.toLowerCase();
    btn.innerText = lang === 'ua' ? "Помилка!" : "Error!";
    btn.style.backgroundColor = "#ff4d4d";
    btn.parentElement.classList.add('shake');
    setTimeout(() => {
        btn.innerText = translations[lang].loginlogin;
        btn.style.backgroundColor = "#000";
        btn.parentElement.classList.remove('shake');
    }, 2000);
}

function logout() {
    isLoggedIn = false;
    currentUserName = "";
    
    // Скидаємо атрибути до початкових
    document.querySelector('.bank').setAttribute('data-lang', 'hero_title');
    document.querySelector('.bankview').setAttribute('data-lang', 'hero_desc');
    heroBtn.setAttribute('data-lang', 'login_btn');
    loginBtn.setAttribute('data-lang', 'login_btn');

    updateAllTranslations();
}

// Перемикач мов зі збереженням
langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('selectedLanguage', btn.innerText.toLowerCase());
        updateAllTranslations();
    });
});

// Бургер меню
if (burger) {
    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });
}

// Ініціалізація при завантаженні
window.addEventListener('DOMContentLoaded', () => {
    // Відновлення мови
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        langBtns.forEach(btn => {
            if (btn.innerText.toLowerCase() === savedLang) {
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }
    updateAllTranslations();

    // Ініціалізація 3D картки (Vanilla-tilt)
    const card3d = document.querySelector(".bank-card-3d");
    if (card3d && window.innerWidth > 768) {
        VanillaTilt.init(card3d, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3,
        });
    }
});

//scroll header
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Якщо скролимо вниз і проїхали більше 50px
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
        header.classList.add('header-hidden');
        // console.log("Ховаємо хедер");
    } 
    // Якщо скролимо вгору
    else {
        header.classList.remove('header-hidden');
        // console.log("Показуємо хедер");
    }

    lastScrollY = currentScrollY;
});

//chatbot
const chatTrigger = document.getElementById('chatTrigger');
const chatWindow = document.getElementById('chatWindow');

chatTrigger.addEventListener('click', () => {
    if (!chatWindow.classList.contains('show')) {
        // ВІДКРИТТЯ
        chatWindow.style.display = 'flex';
        setTimeout(() => {
            chatWindow.classList.add('show');
            chatWindow.classList.remove('hide');
        }, 10); // Мінімальна затримка для запуску анімації
    } else {
        // ЗАКРИТТЯ
        chatWindow.classList.add('hide');
        chatWindow.classList.remove('show');
        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 400); // Чекаємо 0.4с, поки закінчиться CSS анімація
    }
});

// Закриття чату при кліку поза ним
window.addEventListener('click', (e) => {
    if (!chatWindow.contains(e.target) && !chatTrigger.contains(e.target)) {
        chatWindow.classList.remove('active');
    }
});

const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Перевірка при завантаженні
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
});