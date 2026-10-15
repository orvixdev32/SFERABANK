const loginBtn = document.querySelector('.btn-login');
const heroBtn = document.querySelector('.btn-hero-login');
const modal = document.getElementById('modalOverlay');
const closeBtn = document.getElementById('closeModal');
const loginForm = document.getElementById('loginForm');
const cabinetModal = document.getElementById('cabinetModal');
const closeCabinetBtn = document.getElementById('closeCabinetModal');
const cabinetLogoutBtn = document.getElementById('cabinetLogoutBtn');
const langBtns = document.querySelectorAll('.lang-btn');
const burger = document.getElementById('burgerMenu');
const nav = document.querySelector('.nav');

let isLoggedIn = false;
let currentUserName = "";

function openModal() {
    modal.classList.add('active');
    document.body.classList.add('no-scroll');
}
function closeModal() {
    modal.classList.remove('active');
    loginForm.reset();
    const submitBtn = loginForm.querySelector('.btn-submit-form');
    if (submitBtn) {
        submitBtn.style.backgroundColor = "";
        const lang = document.querySelector('.lang-btn.active')?.innerText.toLowerCase() || 'ua';
        submitBtn.innerText = translations[lang]?.loginlogin || "Увійти";
        loginForm.classList.remove('shake');
    }
    if (!nav.classList.contains('active') && !cabinetModal.classList.contains('active')) {
        document.body.classList.remove('no-scroll');
    }
}

function openCabinet() {
    if (cabinetModal) {
        cabinetModal.classList.add('active');
        document.body.classList.add('no-scroll');
    }
}

function closeCabinet() {
    if (cabinetModal) {
        cabinetModal.classList.remove('active');
        if (!nav.classList.contains('active') && !modal.classList.contains('active')) {
            document.body.classList.remove('no-scroll');
        }
    }
}

loginBtn.addEventListener('click', () => isLoggedIn ? logout() : openModal());
heroBtn.addEventListener('click', () => isLoggedIn ? openCabinet() : openModal());
closeBtn.addEventListener('click', closeModal);
if (closeCabinetBtn) closeCabinetBtn.addEventListener('click', closeCabinet);
if (cabinetLogoutBtn) cabinetLogoutBtn.addEventListener('click', () => { closeCabinet(); logout(); });

modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
if (cabinetModal) cabinetModal.addEventListener('click', (e) => { if (e.target === cabinetModal) closeCabinet(); });

// Доступність: закриття відкритих модалок клавішею Escape
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modal.classList.contains('active')) closeModal();
        if (cabinetModal && cabinetModal.classList.contains('active')) closeCabinet();
    }
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const loginInput = document.getElementById('loginUsername').value.trim();
    const passwordInput = document.getElementById('loginPassword').value.trim();
    const submitBtn = loginForm.querySelector('.btn-submit-form');

    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.classList.remove('loading');
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
    sessionStorage.setItem('loggedInUser', name);

    document.querySelector('.bank').setAttribute('data-lang', 'welcome_user');
    document.querySelector('.bankview').setAttribute('data-lang', 'balance_info');
    heroBtn.setAttribute('data-lang', 'my_cabinet');
    loginBtn.setAttribute('data-lang', 'logout');
    
    const cabinetUserEl = document.getElementById('cabinetUserName');
    if (cabinetUserEl) cabinetUserEl.innerText = name.toUpperCase() + " USER";

    updateAllTranslations();
}

function showError(btn) {
    const lang = document.querySelector('.lang-btn.active').innerText.toLowerCase();
    btn.innerText = lang === 'ua' ? "Помилка!" : "Error!";
    btn.style.backgroundColor = "#ff4d4d";
    loginForm.classList.add('shake');
    setTimeout(() => {
        btn.innerText = translations[lang].loginlogin;
        btn.style.backgroundColor = "";
        loginForm.classList.remove('shake');
    }, 2000);
}

function logout() {
    isLoggedIn = false;
    currentUserName = "";
    sessionStorage.removeItem('loggedInUser');

    document.querySelector('.bank').setAttribute('data-lang', 'hero_title');
    document.querySelector('.bankview').setAttribute('data-lang', 'hero_desc');
    heroBtn.setAttribute('data-lang', 'login_btn');
    loginBtn.setAttribute('data-lang', 'login_btn');
    updateAllTranslations();
}

const translations = {
    ua: {
        nav_home: "Головна", nav_services: "Послуги", hero_title: "Ваш онлайн банк", hero_desc: "Простий та зручний банкінг для кожного.",
        login_btn: "Увійти", menu_cards: "Картки та рахунки", menu_deps: "Депозити", contact: "Контакти", chat: "Чат підтримки 24/7",
        maps: "Мапа відділень", hotline: "Гаряча лінія", menu_plat: "Платежі та перекази", menu_credit: "Кредити", about: "Про банк",
        aboutinfo: "MintixBank допомагає керувати фінансами онлайн.", service: "Наші послуги", servmoney: "Переказ коштів",
        servkomu: "Оплата комунальних послуг", servcards: "Банківські картки", servonline: "Онлайн кредити",
        rights: "© 2026 MintixBank. Усі права захищені.", login: "Вхід у MintixBank", loginname: "Логін або телефон",
        loginpass: "Пароль", loginlogin: "Увійти", welcome_user: "Вітаємо", balance_info: "Ваш баланс: 125 400.50 ₴",
        my_cabinet: "Мій кабінет", logout: "Вихід", supportchat: "Привіт! Чим допомогти?", supportchat2:"Ваше питання...",
        order_title: "Замовити картку у нас!", order_subtitle: "Залиште свої дані, і наш менеджер зв'яжеться з вами для підтвердження",
        order_name: "Ваше ім'я", order_phone: "Номер телефону", order_select: "Оберіть тип картки", order_btn: "Відправити заявку",
        card_black: "Mintix Black (Кредитна)", card_green: "Mintix Green (Дебетова)", card_plat: "Mintix Platinum (Преміум)",
        order_success_title: "Демо-режим: Заявку прийнято!",
        order_success_desc: "Дякуємо, {name}! Вашу заявку на картку сформовано.",
        order_success_disclaimer: "Зверніть увагу: це навчальний демонстраційний проєкт. Дані нікуди не відправляються.",
        cabinet_title: "Особистий кабінет",
        cabinet_status: "Статус: Верифіковано",
        cabinet_card_name: "Основна картка Mintix Black",
        hotline_note: "Безкоштовно по всій Україні зі стаціонарних та мобільних телефонів"
    },
    en: {
        nav_home: "Home", nav_services: "Services", hero_title: "Your Online Bank", hero_desc: "Simple and convenient banking for everyone.",
        login_btn: "Login", menu_cards: "Cards and accounts", menu_deps: "Deposits", contact: "Contacts", chat: "24/7 Support Chat",
        maps: "Branch map", hotline: "Hotline", menu_plat: "Payments and transfers", menu_credit: "Credits", about: "About bank",
        aboutinfo: "MintixBank helps you manage your finances online.", service: "Our services", servmoney: "Transfer of funds",
        servkomu: "Payment of utilities", servcards: "Bank cards", servonline: "Online loans", rights: "© 2026 MintixBank. All rights reserved.",
        login: "Login to MintixBank", loginname: "Username or phone", loginpass: "Password", loginlogin: "Login",
        welcome_user: "Welcome", balance_info: "Your balance: 125,400.50 ₴", my_cabinet: "My Cabinet", logout: "Logout",
        supportchat: "Hi! How can I help?", supportchat2: "Your question...", order_title: "Order your card now!",
        order_subtitle: "Leave your details, and our manager will contact you for confirmation", order_name: "Your name",
        order_phone: "Phone number", order_select: "Choose card type", order_btn: "Send application",
        card_black: "Mintix Black (Credit)", card_green: "Mintix Green (Debit)", card_plat: "Mintix Platinum (Premium)",
        order_success_title: "Demo Mode: Application Received!",
        order_success_desc: "Thank you, {name}! Your card application has been generated.",
        order_success_disclaimer: "Note: this is an educational demo project. No actual data is transmitted or stored.",
        cabinet_title: "Personal Cabinet",
        cabinet_status: "Status: Verified",
        cabinet_card_name: "Primary Card Mintix Black",
        hotline_note: "Toll-free across Ukraine from landline and mobile numbers"
    }
};

function updateAllTranslations() {
    const activeBtn = document.querySelector('.lang-btn.active');
    const lang = activeBtn ? activeBtn.innerText.toLowerCase() : 'ua';

    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        let translation = translations[lang][key];
        if (key === 'welcome_user' && currentUserName) { translation = lang === 'ua' ? `Вітаємо, ${currentUserName}!` : `Welcome, ${currentUserName}!`; }
        if (translation) {
            if (el.tagName === 'INPUT') el.placeholder = translation;
            else el.innerText = translation;
        }
    });
}



langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        langBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        localStorage.setItem('selectedLanguage', btn.innerText.toLowerCase());
        updateAllTranslations();
    });
});

// === ОБРОБКА ФОРМИ ЗАМОВЛЕННЯ КАРТКИ (ДЕМО-СЦЕНАРІЙ) ===
const orderForm = document.getElementById('orderForm');
const orderSubmitBtn = document.getElementById('orderSubmitBtn');
const orderDemoNotice = document.getElementById('orderDemoNotice');
const orderPhoneInput = document.getElementById('orderPhone');

if (orderPhoneInput) {
    // Дозволяємо вводити лише цифри, +, (, ), -, пробіли
    orderPhoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d+()\s-]/g, '');
    });
}

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById('orderName');
        const phoneInput = document.getElementById('orderPhone');
        const cardSelect = document.getElementById('cardType');
        
        const customerName = nameInput.value.trim();
        const rawPhone = phoneInput.value.trim();
        
        // Очищаємо від зайвих символів для перевірки довжини (формат UA: 10 або 12 цифр)
        const digitsOnly = rawPhone.replace(/\D/g, '');
        if (!customerName || digitsOnly.length < 10 || !cardSelect.value) {
            phoneInput.focus();
            return;
        }

        // Анімація завантаження
        orderSubmitBtn.classList.add('loading');
        orderSubmitBtn.disabled = true;
        if (orderDemoNotice) orderDemoNotice.style.display = 'none';

        setTimeout(() => {
            orderSubmitBtn.classList.remove('loading');
            orderSubmitBtn.disabled = false;

            const lang = document.querySelector('.lang-btn.active')?.innerText.toLowerCase() || 'ua';
            const t = translations[lang] || translations.ua;

            if (orderDemoNotice) {
                const descText = t.order_success_desc.replace('{name}', customerName);
                orderDemoNotice.innerHTML = `
                    <strong>${t.order_success_title}</strong>
                    <span>${descText}</span>
                    <small>${t.order_success_disclaimer}</small>
                `;
                orderDemoNotice.style.display = 'block';
            }

            // Очищаємо поля форми
            orderForm.reset();
        }, 900);
    });
}

if (burger) {
    burger.addEventListener('click', () => {
        const isActive = nav.classList.toggle('active');
        burger.classList.toggle('active');
        burger.setAttribute('aria-expanded', isActive);
        if (isActive) {
            document.body.classList.add('no-scroll');
        } else if (!modal.classList.contains('active')) {
            document.body.classList.remove('no-scroll');
        }
    });
    burger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); burger.click(); }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLanguage');
    if (savedLang) {
        langBtns.forEach(btn => {
            if (btn.innerText.toLowerCase() === savedLang) {
                langBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }

    // Відновлення активної сесії при перезавантаженні сторінки
    const savedUser = sessionStorage.getItem('loggedInUser');
    if (savedUser) {
        showSuccessLogin(savedUser);
    } else {
        updateAllTranslations();
    }

    const card3d = document.querySelector(".bank-card-3d");
    if (card3d && window.innerWidth > 768) {
        VanillaTilt.init(card3d, { max: 15, speed: 400, glare: true, "max-glare": 0.3 });
    }
});

let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) { header.classList.add('header-hidden'); } 
    else { header.classList.remove('header-hidden'); }
    lastScrollY = currentScrollY;
});

// === ЧАТ БОТ З АНІМАЦІЯМИ ===
const chatTrigger = document.getElementById('chatTrigger');
const chatWindow = document.getElementById('chatWindow');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatBadge = document.getElementById('chatBadge');
const chatInput = document.getElementById('chatInput');
const sendMsgBtn = document.getElementById('sendMsg');
const chatMessages = document.getElementById('chatMessages');
const chatTooltip = document.getElementById('chatTooltip');
const closeTooltipBtn = document.getElementById('closeTooltipBtn');

let unreadMessages = 0;
let isChatOpen = false;
let greetingAdded = false;

// Відображення Tooltip та бейджика при старті (відкладено на 1.5 сек)
setTimeout(() => {
    if (!isChatOpen) {
        chatTooltip.classList.add('show');
        unreadMessages = 1;
        updateBadge();
    }
}, 1500);

closeTooltipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    chatTooltip.classList.remove('show');
});

function updateBadge() {
    if (unreadMessages > 0 && !isChatOpen) {
        chatBadge.innerText = unreadMessages;
        chatBadge.style.display = 'flex';
    } else {
        chatBadge.style.display = 'none';
        unreadMessages = 0;
    }
}

function injectGreeting() {
    if (!greetingAdded) {
        const lang = document.querySelector('.lang-btn.active').innerText.toLowerCase();
        const text = translations[lang].supportchat;
        const icon = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -3px; margin-right: 4px;"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v3"></path><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v7"></path><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"></path><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"></path></svg>`;
        addMessageToChat('bot', icon + '<span data-lang="supportchat">' + text + '</span>', true);
        greetingAdded = true;
    }
}

function openChat() {
    isChatOpen = true;
    chatTooltip.classList.remove('show');
    updateBadge(); 
    
    // Ховаємо кнопку відкриття чату, щоб не заважала
    chatTrigger.classList.add('hidden');
    
    chatWindow.style.display = 'flex';
    setTimeout(() => {
        chatWindow.classList.add('show');
        chatWindow.classList.remove('hide');
        injectGreeting();
    }, 10);
}

function closeChat() {
    isChatOpen = false;
    chatWindow.classList.add('hide');
    chatWindow.classList.remove('show');
    
    // Показуємо кнопку знову
    setTimeout(() => {
        chatTrigger.classList.remove('hidden');
        chatWindow.style.display = 'none';
    }, 400); 
}

chatTrigger.addEventListener('click', () => {
    if (!chatWindow.classList.contains('show')) openChat();
    else closeChat();
});

closeChatBtn.addEventListener('click', closeChat);

window.addEventListener('click', (e) => {
    if (isChatOpen && 
        !chatWindow.contains(e.target) && 
        !chatTrigger.contains(e.target) && 
        !chatTooltip.contains(e.target) &&
        (!menuOpenChat || !menuOpenChat.contains(e.target))) {
        closeChat();
    }
});

function addMessageToChat(sender, text, isHtml = false) {
    const msgElement = document.createElement('p');
    msgElement.classList.add('chat-message', sender);
    if (isHtml) {
        msgElement.innerHTML = text;
    } else {
        msgElement.innerText = text;
    }
    chatMessages.appendChild(msgElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('typing-indicator');
    typingDiv.id = 'typingIndicator';
    for (let i = 0; i < 3; i++) {
        const dot = document.createElement('div');
        dot.classList.add('typing-dot');
        typingDiv.appendChild(dot);
    }
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) typingDiv.remove();
}

function handleSend() {
    const text = chatInput.value.trim();
    if (text) {
        addMessageToChat('user', text);
        chatInput.value = '';
        
        // Показуємо індикатор набору тексту
        setTimeout(() => {
            showTypingIndicator();
            
            // Відповідь бота з затримкою
            setTimeout(() => {
                removeTypingIndicator();
                const lang = document.querySelector('.lang-btn.active').innerText.toLowerCase();
                const botReplies = lang === 'ua' ? 
                    ["Дякую за звернення! Менеджер скоро відповість.", "Очікуйте, з'єдную з оператором...", "Зрозумів вас, перевіряю інформацію..."] : 
                    ["Thank you! A manager will reply shortly.", "Connecting to operator...", "Understood, checking details..."];
                
                const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
                addMessageToChat('bot', randomReply);
            }, 1500 + Math.random() * 1000); 
        }, 300);
    }
}

sendMsgBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// === ТЕМА ===
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const moonSvg = `<svg class="icon-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
const sunSvg = `<svg class="icon-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;

function updateThemeIcon() {
    if (themeToggle) {
        const isDark = body.classList.contains('dark-theme');
        themeToggle.innerHTML = isDark ? sunSvg : moonSvg;
        themeToggle.setAttribute('aria-label', isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему');
    }
}

// Ініціалізація теми: пріоритет у LocalStorage, інакше дивимося системні налаштування користувача
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-theme');
} else {
    body.classList.remove('dark-theme');
}
updateThemeIcon();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon();
    });
}

const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropdown-trigger');
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); 
                dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('mobile-active'); });
                dropdown.classList.toggle('mobile-active');
            }
        });
    }
});

// Клік на "Чат підтримки 24/7" у меню відкриває віджет чату
const menuOpenChat = document.getElementById('menuOpenChat');
if (menuOpenChat) {
    menuOpenChat.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation(); // Запобігаємо спливанню події до window click
        openChat();
        // Якщо відкрито мобільне меню — закриваємо його
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (burger) burger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }
    });
}

// Автоматичне закриття мобільного меню при кліку на будь-яке посилання-якір
document.querySelectorAll('.nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (burger) {
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('no-scroll');
        }
    });
});