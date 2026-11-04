'use strict';

// ═══════════════ ИКОНКИ SVG ═══════════════
const SVG = {
  satiety: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  health: '<svg viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  energy: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  hygiene: '<svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  rep: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  map: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
  inv: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16v12H4z"/><path d="M9 6V4h6v2"/></svg>',
  char: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
};

// ─── ИКОНКИ ЛОКАЦИЙ ───
const LOC_SVG = {
  street: '<svg viewBox="0 0 24 24" fill="none" stroke="#aaa" stroke-width="2"><path d="M4 20h16M6 16h12M8 12h8M10 8h4"/></svg>',
  dump: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b7355" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>',
  shop: '<svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  flea: '<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="2"><path d="M12 2l-3 9h6l-3 9M6 2l3 9H3l3 9M18 2l-3 9h6l-3 9"/></svg>',
  school: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><path d="M3 10l9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10zM9 22V12h6v10"/></svg>',
  factory: '<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2"><path d="M2 20h20M4 20V8l6 4V8l6 4V8l6 4v8M8 16h.01M12 16h.01M16 16h.01"/></svg>',
  office: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
  cafe: '<svg viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/></svg>',
  bank: '<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/></svg>',
  housing: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  transport: '<svg viewBox="0 0 24 24" fill="none" stroke="#f472b6" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
  business: '<svg viewBox="0 0 24 24" fill="none" stroke="#2dd4bf" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  park: '<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M12 22v-5M9 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM15 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/></svg>',
};

const ITEM_SVG = {
  bottle: '<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="1.5"><path d="M10 2h4v4l1 2v14H9V8l1-2V2zM10 6h4M10 10h4"/></svg>',
  rag: '<svg viewBox="0 0 24 24" fill="none" stroke="#a89680" stroke-width="1.5"><path d="M4 8l4-4 12 4-4 12-12-4z"/></svg>',
  bread: '<svg viewBox="0 0 24 24" fill="none" stroke="#eab308" stroke-width="1.5"><path d="M4 12c0-4 4-8 8-8s8 4 8 8-4 8-8 8-8-4-8-8zM8 8c1 2 1 4 0 6M12 7c1 2 1 5 0 8"/></svg>',
  soup: '<svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="1.5"><path d="M2 12h20v4a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-4zM7 8c0-2 2-4 5-4s5 2 5 4"/></svg>',
  water: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="1.5"><path d="M12 2v20M8 6h8M6 10h12M4 16h16"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/></svg>',
  watch: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="1.5"><circle cx="12" cy="12" r="7"/><path d="M12 8v4l3 3M9 3h6M9 21h6"/></svg>',
  tool: '<svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5"><path d="M14 7l3-3 4 4-3 3M3 21l9-9M12 12l3 3"/></svg>',
};

// ─── ИКОНКИ ДЕЙСТВИЙ ───
const ACT_SVG = {
  dig: '<svg viewBox="0 0 24 24" fill="none" stroke="#8b7355" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/></svg>',
  work: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
  buy: '<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4H6zM3 6h18M16 10a4 4 0 0 1-8 0"/></svg>',
  sell: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
  learn: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
  rest: '<svg viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2"><path d="M17 18a5 5 0 0 0-10 0M12 2v3M4.22 10.22l2.12 2.12M19.78 10.22l-2.12 2.12M2 18h20"/></svg>',
  beg: '<svg viewBox="0 0 24 24" fill="none" stroke="#fb923c" stroke-width="2"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v5M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v10"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>',
  sleep: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
  study: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  cash: '<svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>',
};

// ─── КОНСТАНТЫ ЛОКАЦИЙ ───
const LOCATIONS = {
  street:     { name: 'Улица',          type: 'street',  desc: 'Холодно, сыро. Прохожие спешат мимо.' },
  dump1:      { name: 'Мусорка',        type: 'dump',    desc: 'Пахнет не очень, но можно найти что-то ценное.', dumpId: 'dump1' },
  dump2:      { name: 'Мусорка в парке',type: 'dump',    desc: 'Тише и чище. Но конкуренты рядом.', dumpId: 'dump2' },
  dump3:      { name: 'Мусорка',        type: 'dump',    desc: 'Возле жилых домов. Много бутылок.', dumpId: 'dump3' },
  dump4:      { name: 'Свалка',         type: 'dump',    desc: 'Огромная куча мусора. Есть всё.', dumpId: 'dump4' },
  shop:       { name: 'Магазин',        type: 'shop',    desc: 'Продукты и одежда. Цены кусаются.' },
  flea:       { name: 'Барахолка',      type: 'flea',    desc: 'Здесь можно продать найденный хлам.' },
  school:     { name: 'Школа',          type: 'school',  desc: 'Путь к знаниям начинается здесь.' },
  college:    { name: 'Колледж',        type: 'college', desc: 'Среднее образование — уже шаг вперёд.' },
  university: { name: 'Вуз',            type: 'university',desc: 'Высшее образование открывает двери.' },
  factory:    { name: 'Завод',          type: 'factory', desc: 'Тяжёлый труд, но платят честно.' },
  office:     { name: 'Офис',           type: 'office',  desc: 'Здесь работают умные люди.' },
  cafe:       { name: 'Кафе',           type: 'cafe',    desc: 'Тёплое место, чтобы отдохнуть.' },
  bank:       { name: 'Банк',           type: 'bank',    desc: 'Сбережения под проценты.' },
  shelter:    { name: 'Ночлежка',       type: 'housing', desc: 'Бесплатно, но спать на кровати — счастье.' },
  park:       { name: 'Парк',           type: 'park',    desc: 'Свежий воздух. Можно погулять.' },
  dealership: { name: 'Автосалон',      type: 'transport',desc: 'Мечта о собственном авто.' },
  business:   { name: 'Бизнес-центр',   type: 'business',desc: 'Здесь открывают своё дело.' },
};

// Координаты на карте (canvas 1000x700)
const MAP_POS = {
  street: { x: 500, y: 650 },
  dump1: { x: 200, y: 550 }, dump2: { x: 800, y: 550 },
  dump3: { x: 150, y: 350 }, dump4: { x: 850, y: 350 },
  shop: { x: 400, y: 450 },
  flea: { x: 600, y: 450 },
  school: { x: 300, y: 250 },
  college: { x: 500, y: 250 },
  university: { x: 700, y: 250 },
  factory: { x: 850, y: 150 },
  office: { x: 650, y: 150 },
  cafe: { x: 450, y: 350 },
  bank: { x: 550, y: 350 },
  shelter: { x: 100, y: 650 },
  park: { x: 900, y: 650 },
  dealership: { x: 750, y: 550 },
  business: { x: 500, y: 100 },
};

// ─── ПРЕДМЕТЫ ───
const ITEMS = {
  bottle: { name: 'Бутылка', type: 'material', price: 8 },
  rag: { name: 'Тряпка', type: 'material', price: 6 },
  thread: { name: 'Нитки', type: 'material', price: 12 },
  wire: { name: 'Проволока', type: 'material', price: 18 },
  scrap: { name: 'Металлолом', type: 'material', price: 15 },
  phoneBroken: { name: 'Сломанный телефон', type: 'valuable', price: 800 },
  phoneWorking: { name: 'Телефон', type: 'valuable', price: 2500 },
  watch: { name: 'Часы', type: 'valuable', price: 1500 },
  screwdriver: { name: 'Отвёртка', type: 'tool', price: 300 },
  bread: { name: 'Хлеб', type: 'food', price: 30, satiety: 18, health: -1 },
  water: { name: 'Вода', type: 'food', price: 20, satiety: 8, health: 1, energy: 3 },
  soup: { name: 'Суп', type: 'food', price: 150, satiety: 32, health: 5 },
  salad: { name: 'Салат', type: 'food', price: 200, satiety: 22, health: 10 },
  shawarma: { name: 'Шаурма', type: 'food', price: 180, satiety: 38, health: -5 },
  energy: { name: 'Энергетик', type: 'food', price: 120, satiety: 0, health: -3, energy: 25 },
  tornshirt: { name: 'Рваная рубаха', type: 'cloth', slot: 'body', price: 0, rep: 0 },
  cap: { name: 'Кепка', type: 'cloth', slot: 'head', price: 300, rep: 1 },
  jacket: { name: 'Куртка', type: 'cloth', slot: 'body', price: 800, rep: 3 },
  jeans: { name: 'Джинсы', type: 'cloth', slot: 'legs', price: 1200, rep: 3 },
  sneakers: { name: 'Кроссовки', type: 'cloth', slot: 'shoes', price: 2000, rep: 4 },
  suitJacket: { name: 'Пиджак', type: 'cloth', slot: 'body', price: 8000, rep: 10 },
  suitPants: { name: 'Брюки', type: 'cloth', slot: 'legs', price: 6000, rep: 8 },
  dressShoes: { name: 'Туфли', type: 'cloth', slot: 'shoes', price: 9000, rep: 10 },
};

const HOUSINGS = {
  street: { name: 'Улица', cost: 0, rent: 0, energyRestore: 25, desc: 'Бесплатно, опасно' },
  shelter: { name: 'Ночлежка', cost: 0, rent: 0, energyRestore: 50, desc: 'Бесплатный ночлег' },
  dorm: { name: 'Комната в общаге', cost: 5000, rent: 2000, energyRestore: 75, desc: 'Скромно' },
  apartment: { name: 'Съёмная квартира', cost: 25000, rent: 10000, energyRestore: 90, desc: 'Уютно' },
  studio: { name: 'Своя студия', cost: 150000, rent: 0, energyRestore: 100, desc: 'Личное пространство' },
  penthouse: { name: 'Пентхаус', cost: 1000000, rent: 0, energyRestore: 100, desc: 'Вершина' },
};

const TRANSPORTS = {
  walk: { name: 'Пешком', cost: 0, speed: 1, rep: 0 },
  bike: { name: 'Велосипед', cost: 5000, speed: 1.6, rep: 1 },
  oldcar: { name: 'Старая машина', cost: 80000, speed: 2.4, rep: 4 },
  newcar: { name: 'Новая иномарка', cost: 1000000, speed: 3.2, rep: 8 },
};

const JOBS = {
  janitor: { name: 'Дворник', pay: 400, energy: 25, reqEdu: 0, reqRep: 0, desc: 'Подметать' },
  loader: { name: 'Грузчик', pay: 600, energy: 35, reqEdu: 0, reqRep: 0, desc: 'Таскать' },
  courier: { name: 'Курьер', pay: 900, energy: 28, reqEdu: 1, reqRep: 10, desc: 'Доставка' },
  programmer: { name: 'Программист', pay: 4000, energy: 25, reqEdu: 3, reqRep: 25, reqSpec: 'programmer', desc: 'Писать код' },
  manager: { name: 'Менеджер', pay: 3500, energy: 25, reqEdu: 3, reqRep: 25, reqSpec: 'manager', desc: 'Управлять' },
};

const EDUCATION = {
  school: { name: 'Школа', cost: 0, reqEdu: 0 },
  college: { name: 'Колледж', cost: 5000, reqEdu: 1 },
  university: { name: 'Вуз', cost: 30000, reqEdu: 2 },
};
const SPECIALTIES = { programmer: 'Программист', manager: 'Менеджер' };

// ─── УТИЛИТЫ ───
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const chance = (p) => Math.random() < p;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (n) => Math.round(n).toLocaleString('ru-RU');

let audioCtx = null;
function initAudio() { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
function playSound(name) {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.connect(g); g.connect(audioCtx.destination);
    if (name === 'click') { o.frequency.value = 600; o.type = 'square'; g.gain.setValueAtTime(0.05, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.05); o.start(now); o.stop(now + 0.05); }
    if (name === 'coin') { o.frequency.value = 1200; o.type = 'sine'; g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.start(now); o.stop(now + 0.15); }
    if (name === 'success') { o.frequency.setValueAtTime(400, now); o.frequency.linearRampToValueAtTime(800, now + 0.1); o.type = 'triangle'; g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.start(now); o.stop(now + 0.2); }
    if (name === 'fail') { o.frequency.setValueAtTime(300, now); o.frequency.linearRampToValueAtTime(100, now + 0.2); o.type = 'sawtooth'; g.gain.setValueAtTime(0.1, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.start(now); o.stop(now + 0.2); }
  } catch (e) {}
}

function toast(msg, type = 'info') {
  const area = document.getElementById('toastArea');
  const div = document.createElement('div');
  div.className = 'toast ' + type;
  div.textContent = msg;
  area.appendChild(div);
  setTimeout(() => { div.style.opacity = '0'; setTimeout(() => div.remove(), 300); }, 2500);
}

// ─── СОСТОЯНИЕ ───
let S = null;
let tickTimer = null;
const SAVE_KEY = 'rags_to_riches_v3';

function createState() {
  return {
    money: 0, satiety: 60, health: 100, energy: 100, hygiene: 40, reputation: 10,
    day: 1, gameMinute: 8 * 60, currentLocation: 'street',
    inventory: [{ itemId: 'bottle', qty: 1 }, { itemId: 'rag', qty: 1 }],
    equipment: { head: null, body: { itemId: 'tornshirt', condition: 100 }, legs: null, shoes: null, accessory: null },
    dumps: { dump1: 100, dump2: 100, dump3: 100, dump4: 100 },
    housing: 'street', transport: 'walk',
    educationLevel: 0, specialty: null, currentJob: null, businesses: [],
    tutorialStep: 0, totalFound: 0, totalEarned: 0,
    traveling: false, sleeping: false,
  };
}

function save() { if (S) try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch(e) {} }
function load() { try { const d = localStorage.getItem(SAVE_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

// ─── ВРЕМЯ СУТОК ───
function getTimeOfDay() {
  const h = Math.floor(S.gameMinute / 60) % 24;
  if (h >= 6 && h < 10) return 'morning';
  if (h >= 10 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

function getTimeSVG() {
  const tod = getTimeOfDay();
  return (tod === 'day' || tod === 'morning') ? SVG.sun : SVG.moon;
}

// ─── РЕНДЕР HUD ───
function renderHUD() {
  if (!S) return;
  document.getElementById('hudMoney').textContent = fmt(S.money);
  document.getElementById('barSatiety').style.width = clamp(S.satiety, 0, 100) + '%';
  document.getElementById('barHealth').style.width = clamp(S.health, 0, 100) + '%';
  document.getElementById('barEnergy').style.width = clamp(S.energy, 0, 100) + '%';
  document.getElementById('barHygiene').style.width = clamp(S.hygiene, 0, 100) + '%';
  document.getElementById('barReputation').style.width = clamp(S.reputation, 0, 100) + '%';
  
  const h = Math.floor(S.gameMinute / 60) % 24;
  document.getElementById('hudTimeText').textContent = String(h).padStart(2,'0') + ':00';
  document.getElementById('hudTimeIcon').innerHTML = getTimeSVG();
  
  // Обновляем оверлей времени на текущем экране
  const tod = getTimeOfDay();
  const isMap = !document.getElementById('mapScreen').classList.contains('hidden');
  const overlay = document.getElementById(isMap ? 'mapTimeOverlay' : 'timeOverlay');
  if (overlay) {
    overlay.className = 'time-overlay ' + tod;
    if (isMap) overlay.classList.add('map-time-overlay');
  }
}

// ─── РЕНДЕР ПЕРСОНАЖА (ПОДОБИЕ ФОТО 2) ───
function renderCharacter(large = false) {
  const eq = S.equipment;
  const hasHat = !!eq.head;
  const bodyColor = eq.body?.itemId === 'tornshirt' ? '#6b705c' : eq.body?.itemId === 'suitJacket' ? '#1a1a2e' : '#4a5d23';
  const legColor = eq.legs?.itemId === 'suitPants' ? '#1a1a2e' : '#d3d3d3';
  const shoeColor = eq.shoes?.itemId === 'dressShoes' ? '#1a1a2e' : eq.shoes?.itemId === 'sneakers' ? '#888' : '#c8b090';
  
  if (large) {
    // Крупный персонаж для главного экрана (сидящий или стоящий)
    return `
      <svg viewBox="0 0 200 300" preserveAspectRatio="xMidYMax meet">
        <defs>
          <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b080"/><stop offset="1" stop-color="#c88a50"/></linearGradient>
          <linearGradient id="hair" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a1a"/><stop offset="1" stop-color="#3a2010"/></linearGradient>
        </defs>
        <!-- Ноги -->
        <path d="M60,220 L55,280 L90,280 L95,220 Z" fill="${legColor}" stroke="#888" stroke-width="1"/>
        <path d="M105,220 L110,280 L145,280 L140,220 Z" fill="${legColor}" stroke="#888" stroke-width="1"/>
        <!-- Обувь -->
        <ellipse cx="75" cy="285" rx="20" ry="8" fill="${shoeColor}"/>
        <ellipse cx="125" cy="285" rx="20" ry="8" fill="${shoeColor}"/>
        <!-- Тело -->
        <path d="M50,120 Q100,100 150,120 L160,220 Q100,240 40,220 Z" fill="${bodyColor}" stroke="#3a4a1a" stroke-width="2"/>
        <!-- Руки -->
        <path d="M50,130 Q30,180 40,220 L55,225 Q50,180 65,140 Z" fill="${bodyColor}" stroke="#3a4a1a" stroke-width="2"/>
        <path d="M150,130 Q170,180 160,220 L145,225 Q150,180 135,140 Z" fill="${bodyColor}" stroke="#3a4a1a" stroke-width="2"/>
        <!-- Кисти -->
        <ellipse cx="42" cy="228" rx="12" ry="10" fill="url(#skin)"/>
        <ellipse cx="158" cy="228" rx="12" ry="10" fill="url(#skin)"/>
        <!-- Голова -->
        <circle cx="100" cy="80" r="35" fill="url(#skin)"/>
        <!-- Борода -->
        <path d="M70,85 Q100,150 130,85 Q120,110 100,115 Q80,110 70,85 Z" fill="url(#hair)"/>
        <!-- Глаза -->
        <ellipse cx="88" cy="78" rx="4" ry="5" fill="#2a1a0a"/>
        <ellipse cx="112" cy="78" rx="4" ry="5" fill="#2a1a0a"/>
        <circle cx="89" cy="77" r="1.5" fill="#fff" opacity="0.6"/>
        <circle cx="113" cy="77" r="1.5" fill="#fff" opacity="0.6"/>
        <!-- Брови -->
        <path d="M80,68 Q88,64 96,68" stroke="#3a2010" stroke-width="3" fill="none"/>
        <path d="M104,68 Q112,64 120,68" stroke="#3a2010" stroke-width="3" fill="none"/>
        <!-- Нос -->
        <path d="M100,80 Q95,95 100,95 Q105,95 100,80" fill="#c88a50"/>
        <!-- Волосы -->
        <path d="M65,75 Q60,40 100,35 Q140,40 135,75 Q120,60 100,60 Q80,60 65,75 Z" fill="url(#hair)"/>
        ${hasHat ? `<path d="M60,65 Q100,30 140,65 L140,70 L60,70 Z" fill="#3a5a8a"/>` : ''}
      </svg>
    `;
  } else {
    // Маленький персонаж для карты
    return `
      <svg viewBox="0 0 40 60" preserveAspectRatio="xMidYMax meet">
        <rect x="14" y="35" width="5" height="14" fill="${legColor}"/>
        <rect x="21" y="35" width="5" height="14" fill="${legColor}"/>
        <rect x="12" y="47" width="8" height="5" rx="1" fill="${shoeColor}"/>
        <rect x="20" y="47" width="8" height="5" rx="1" fill="${shoeColor}"/>
        <rect x="10" y="20" width="20" height="17" rx="2" fill="${bodyColor}"/>
        <rect x="7" y="22" width="4" height="12" rx="1" fill="${bodyColor}"/>
        <rect x="29" y="22" width="4" height="12" rx="1" fill="${bodyColor}"/>
        <rect x="6" y="32" width="5" height="4" rx="1" fill="#e8c8a0"/>
        <rect x="29" y="32" width="5" height="4" rx="1" fill="#e8c8a0"/>
        <circle cx="20" cy="12" r="9" fill="#e8c8a0"/>
        <path d="M11,9 Q20,3 29,9 Q29,11 28,13 Q26,10 20,10 Q14,10 12,13 Q11,11 11,9 Z" fill="#3a2010"/>
        <circle cx="17" cy="12" r="1.5" fill="#1a0a00"/>
        <circle cx="23" cy="12" r="1.5" fill="#1a0a00"/>
        ${hasHat ? `<path d="M10,10 Q10,3 20,3 Q30,3 30,10 L30,12 L10,12 Z" fill="#3a5a8a"/>` : ''}
      </svg>
    `;
  }
}

// ─── ГЛАВНЫЙ ЭКРАН (ЛОКАЦИЯ) ───
function renderLocation() {
  const loc = LOCATIONS[S.currentLocation];
  document.getElementById('locName').textContent = loc.name;
  document.getElementById('locDesc').textContent = loc.desc;
  document.getElementById('locationBg').className = 'location-bg ' + loc.type;
  
  // Персонаж
  const sprite = document.getElementById('characterSprite');
  sprite.innerHTML = renderCharacter(true);
  
  // Действия
  const actions = document.getElementById('locActions');
  actions.innerHTML = '';
  
  if (loc.type === 'street') {
    addAction(actions, 'Попрошайничать', 'beg', () => begMoney());
    addAction(actions, 'Помыть окна', 'cash', () => washWindows());
  } else if (loc.type === 'dump') {
    const fill = S.dumps[loc.dumpId] || 0;
    addAction(actions, `Копаться (наполнено ${fill}%)`, 'dig', () => startDig(loc.dumpId), fill < 15);
  } else if (loc.type === 'shop') {
    addAction(actions, 'Купить продукты', 'buy', () => openShop());
    addAction(actions, 'Купить одежду', 'buy', () => openShop('cloth'));
  } else if (loc.type === 'flea') {
    addAction(actions, 'Продать хлам', 'sell', () => openFlea());
  } else if (loc.type === 'school' || loc.type === 'college' || loc.type === 'university') {
    addAction(actions, 'Сдать экзамен', 'learn', () => takeExam(loc.type));
  } else if (loc.type === 'factory' || loc.type === 'office') {
    const jobs = Object.entries(JOBS).filter(([id, j]) => loc.type === 'office' ? j.pay >= 1500 : j.pay < 1500);
    for (const [id, j] of jobs) {
      addAction(actions, `Работать: ${j.name} (${j.pay}₽)`, 'work', () => doWork(id), S.energy < j.energy || S.educationLevel < j.reqEdu);
    }
  } else if (loc.type === 'cafe') {
    addAction(actions, 'Купить суп (150₽)', 'rest', () => buyItem('soup'));
    addAction(actions, 'Отдохнуть (100₽)', 'rest', () => restCafe());
  } else if (loc.type === 'bank') {
    addAction(actions, 'Сделать вклад', 'cash', () => openBank());
  } else if (loc.type === 'housing') {
    addAction(actions, 'Снять жильё', 'rest', () => openHousing());
    addAction(actions, 'Поспать', 'sleep', () => sleepNow());
  } else if (loc.type === 'park') {
    addAction(actions, 'Погулять (+настроение)', 'rest', () => walkPark());
    addAction(actions, 'Копаться в урнах', 'dig', () => startDig('park'));
  } else if (loc.type === 'transport') {
    addAction(actions, 'Купить транспорт', 'buy', () => openTransport());
  } else if (loc.type === 'business') {
    addAction(actions, 'Открыть бизнес', 'work', () => openBusiness());
  }
}

function addAction(container, text, iconName, cb, disabled = false) {
  const btn = document.createElement('button');
  btn.className = 'action-btn';
  btn.innerHTML = `${ACT_SVG[iconName] || ''} <span>${text}</span>`;
  btn.onclick = () => { playSound('click'); cb(); };
  if (disabled) btn.disabled = true;
  container.appendChild(btn);
}

// ─── КАРТА ───
function drawMap() {
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width = 1000, H = canvas.height = 700;
  
  // Фон (земля)
  ctx.fillStyle = '#1a2015';
  ctx.fillRect(0, 0, W, H);
  
  // Рисуем траву (пятна)
  for (let i = 0; i < 200; i++) {
    ctx.fillStyle = `rgba(30, 50, 25, ${0.3 + Math.random()*0.3})`;
    ctx.beginPath();
    ctx.arc(Math.random()*W, Math.random()*H, 20 + Math.random()*40, 0, Math.PI*2);
    ctx.fill();
  }

  // Дороги (горизонтальные и вертикальные)
  ctx.fillStyle = '#2a2a2a';
  // Горизонтальные
  [150, 300, 450, 600].forEach(y => {
    ctx.fillRect(0, y - 20, W, 40);
    // Разметка
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    ctx.setLineDash([]);
  });
  // Вертикальные
  [200, 400, 600, 800].forEach(x => {
    ctx.fillRect(x - 20, 0, 40, H);
    ctx.strokeStyle = '#eab308';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    ctx.setLineDash([]);
  });

  // Кварталы с домами
  const drawBuilding = (x, y, w, h, color, roofColor, type) => {
    // Тень
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(x + 4, y + 4, w, h);
    // Основа
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    // Крыша
    ctx.fillStyle = roofColor;
    ctx.fillRect(x, y, w, Math.min(h * 0.3, 20));
    // Окна
    if (type === 'residential') {
      ctx.fillStyle = 'rgba(255, 220, 100, 0.4)';
      const cols = Math.floor(w / 20), rows = Math.floor(h / 20);
      for (let i = 1; i < cols; i++) for (let j = 1; j < rows; j++) {
        if ((i + j) % 2 === 0) ctx.fillRect(x + i * 20, y + j * 20 + 10, 8, 8);
      }
    } else if (type === 'office') {
      ctx.fillStyle = 'rgba(100, 200, 255, 0.3)';
      for (let i = 10; i < w - 10; i += 15) ctx.fillRect(x + i, y + 20, 10, h - 30);
    }
    // Дверь
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(x + w/2 - 6, y + h - 14, 12, 14);
  };

  // Верхний ряд
  drawBuilding(50, 30, 120, 90, '#8a5a3a', '#5a3a1a', 'residential');
  drawBuilding(250, 30, 130, 90, '#4a5a7a', '#2a3a5a', 'office');
  drawBuilding(450, 30, 130, 90, '#3a4a6a', '#1a2a4a', 'office');
  drawBuilding(650, 30, 130, 90, '#7a3a3a', '#5a1a1a', 'residential');
  drawBuilding(850, 30, 120, 90, '#6a4a2a', '#4a2a0a', 'residential');

  // Второй ряд
  drawBuilding(50, 180, 120, 90, '#6a4a2a', '#4a2a0a', 'residential');
  drawBuilding(250, 180, 130, 90, '#8a6a3a', '#6a4a1a', 'residential');
  drawBuilding(450, 180, 130, 90, '#8a5a2a', '#5a3a0a', 'residential');
  drawBuilding(650, 180, 130, 90, '#3a5a3a', '#1a3a1a', 'residential');
  drawBuilding(850, 180, 120, 90, '#5a4a2a', '#3a2a0a', 'residential');

  // Третий ряд
  drawBuilding(50, 330, 120, 90, '#4a3a2a', '#2a1a0a', 'residential');
  drawBuilding(250, 330, 130, 90, '#3a5a3a', '#1a3a1a', 'residential');
  drawBuilding(450, 330, 130, 90, '#7a4a3a', '#4a2a1a', 'residential');
  drawBuilding(650, 330, 130, 90, '#5a4a5a', '#3a2a3a', 'residential');
  drawBuilding(850, 330, 120, 90, '#4a4a3a', '#2a2a1a', 'residential');

  // Четвёртый ряд
  drawBuilding(50, 480, 120, 90, '#4a4a3a', '#2a2a1a', 'residential');
  drawBuilding(250, 480, 130, 90, '#3a3a2a', '#2a2a1a', 'residential');
  drawBuilding(450, 480, 130, 90, '#3a3a3a', '#1a1a1a', 'residential');
  drawBuilding(650, 480, 130, 90, '#3a3a3a', '#1a1a1a', 'residential');
  drawBuilding(850, 480, 120, 90, '#3a3a3a', '#1a1a1a', 'residential');

  // Деревья
  for (let i = 0; i < 30; i++) {
    const tx = Math.random() * W, ty = Math.random() * H;
    ctx.fillStyle = '#1a3a1a';
    ctx.beginPath(); ctx.arc(tx, ty, 8, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#2a5a2a';
    ctx.beginPath(); ctx.arc(tx - 2, ty - 2, 5, 0, Math.PI*2); ctx.fill();
  }
}

function renderMapLocations() {
  const container = document.getElementById('mapLocations');
  container.innerHTML = '';
  for (const [id, loc] of Object.entries(LOCATIONS)) {
    if (id === 'street') continue;
    const pos = MAP_POS[id];
    if (!pos) continue;
    const btn = document.createElement('button');
    btn.className = 'map-loc-btn';
    btn.style.left = (pos.x / 1000 * 100) + '%';
    btn.style.top = (pos.y / 700 * 100) + '%';
    btn.innerHTML = `
      <div class="map-loc-icon">${LOC_SVG[loc.type] || LOC_SVG.street}</div>
      <div class="map-loc-name">${loc.name}</div>
    `;
    btn.onclick = () => travelTo(id);
    container.appendChild(btn);
  }
}

function travelTo(id) {
  if (S.traveling || S.currentLocation === id) return;
  S.traveling = true;
  
  const player = document.getElementById('mapPlayer');
  player.classList.remove('hidden');
  player.innerHTML = renderCharacter(false);
  
  const from = MAP_POS[S.currentLocation] || MAP_POS.street;
  const to = MAP_POS[id];
  
  // Устанавливаем начальную позицию
  player.style.transition = 'none';
  player.style.left = (from.x / 1000 * 100) + '%';
  player.style.top = (from.y / 700 * 100) + '%';
  
  // Принудительный рефлоу
  void player.offsetWidth;
  
  // Анимация перемещения (2.5 сек)
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const duration = clamp(dist * 3, 800, 2500); // От 0.8 до 2.5 сек
  
  player.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
  player.style.left = (to.x / 1000 * 100) + '%';
  player.style.top = (to.y / 700 * 100) + '%';
  
  setTimeout(() => {
    S.currentLocation = id;
    S.traveling = false;
    player.classList.add('hidden');
    
    // Расход энергии
    S.energy = clamp(S.energy - 3, 0, 100);
    
    // Возможное случайное событие
    if (chance(0.15) && id !== 'street') {
      triggerEncounter();
    }
    
    // Возвращаемся на экран локации
    showLocationScreen();
    renderHUD();
    updateTutorial();
    save();
  }, duration);
}

// ─── ЭКРАНЫ ───
function showLocationScreen() {
  document.getElementById('locationScreen').classList.remove('hidden');
  document.getElementById('mapScreen').classList.add('hidden');
  document.getElementById('navMap').classList.remove('active');
  renderLocation();
  renderHUD();
}

function showMapScreen() {
  document.getElementById('locationScreen').classList.add('hidden');
  document.getElementById('mapScreen').classList.remove('hidden');
  document.getElementById('navMap').classList.add('active');
  
  if (!S.mapDrawn) {
    drawMap();
    S.mapDrawn = true;
  }
  renderMapLocations();
  renderHUD();
}

// ─── МИНИ-ИГРА: КОПАНИЕ (исправлена под тач) ───
function startDig(dumpId) {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  const fill = S.dumps[dumpId] || 0;
  if (fill < 15) { toast('Мусорка пуста', 'error'); return; }
  
  const modal = openModal('Копание', `
    <canvas id="mgCanvas" width="400" height="200"></canvas>
    <p style="text-align:center; font-size:12px; margin-top:8px; color:var(--text-dim);">Тапни, когда полоска в зелёной зоне!</p>
  `);
  
  const canvas = modal.querySelector('#mgCanvas');
  const ctx = canvas.getContext('2d');
  let pos = 50, dir = 1, speed = 5;
  let attempts = 4, hits = 0;
  let running = true;
  
  const greenStart = 160, greenEnd = 240;
  const redStart = 320, redEnd = 360;
  
  function draw() {
    if (!running) return;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 400, 200);
    
    // Зелёная зона
    ctx.fillStyle = 'rgba(74, 222, 128, 0.3)';
    ctx.fillRect(greenStart, 40, greenEnd - greenStart, 120);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.strokeRect(greenStart, 40, greenEnd - greenStart, 120);
    
    // Красная зона
    ctx.fillStyle = 'rgba(248, 113, 113, 0.3)';
    ctx.fillRect(redStart, 40, redEnd - redStart, 120);
    ctx.strokeStyle = '#f87171';
    ctx.strokeRect(redStart, 40, redEnd - redStart, 120);
    
    // Маркер
    ctx.fillStyle = '#fcd34d';
    ctx.shadowColor = '#fcd34d';
    ctx.shadowBlur = 10;
    ctx.fillRect(pos - 3, 30, 6, 140);
    ctx.shadowBlur = 0;
    
    // Текст
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Попыток: ' + attempts, 10, 24);
    ctx.fillText('Успехов: ' + hits, 10, 190);
    
    pos += speed * dir;
    if (pos >= 395 || pos <= 5) { dir *= -1; pos = clamp(pos, 5, 395); }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  
  // Используем pointerdown для мгновенной реакции на тач
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!running) return;
    
    // Пересчитываем координаты
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const clickX = (e.clientX - rect.left) * scaleX;
    
    // Проверяем попадание по x (по маркеру не обязательно, просто тап в любом месте)
    attempts--;
    
    if (pos >= greenStart && pos <= greenEnd) {
      hits++;
      playSound('success');
    } else if (pos >= redStart && pos <= redEnd) {
      S.health = clamp(S.health - 3, 0, 100);
      toast('Порезались! −3 HP', 'error');
      playSound('fail');
    } else {
      playSound('fail');
    }
    
    if (attempts <= 0) {
      running = false;
      closeModal('Копание');
      finishDig(dumpId, hits);
    }
  });
}

function finishDig(dumpId, hits) {
  S.energy -= 10;
  S.hygiene = clamp(S.hygiene - 8, 0, 100);
  S.dumps[dumpId] = clamp((S.dumps[dumpId] || 0) - 20, 0, 100);
  
  const loot = [];
  for (let i = 0; i < hits; i++) {
    if (chance(0.6)) loot.push({ itemId: pick(['bottle','rag','scrap']), qty: randInt(1,2) });
    else if (chance(0.3)) loot.push({ itemId: pick(['thread','wire','watch']), qty: 1 });
  }
  
  if (loot.length === 0) {
    toast('Ничего не нашли...', 'info');
    renderHUD();
    return;
  }
  
  showLootDialog(loot);
}

function showLootDialog(loot) {
  let selected = loot.map(() => true);
  
  function render() {
    const grid = loot.map((l, i) => `
      <div class="inv-item" style="cursor:pointer;opacity:${selected[i]?1:0.3}" onclick="toggleLoot(${i})">
        ${ITEM_SVG[l.itemId] || '<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#888"/></svg>'}
        ${l.qty > 1 ? `<span class="qty">×${l.qty}</span>` : ''}
      </div>
    `).join('');
    
    openModal('Найдено!', `
      <p style="margin-bottom:12px;">Выбери, что забрать:</p>
      <div class="inv-grid" style="grid-template-columns:repeat(4,1fr);">${grid}</div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <button class="btn btn-primary" style="flex:1" onclick="confirmLoot()">Забрать</button>
        <button class="btn btn-secondary" onclick="closeModal('Найдено!')">Оставить</button>
      </div>
    `);
  }
  
  window.toggleLoot = (i) => { selected[i] = !selected[i]; render(); };
  window.confirmLoot = () => {
    let count = 0;
    loot.forEach((l, i) => {
      if (selected[i]) {
        const existing = S.inventory.find(x => x.itemId === l.itemId);
        if (existing) existing.qty += l.qty;
        else S.inventory.push({ itemId: l.itemId, qty: l.qty });
        count++;
      }
    });
    if (count > 0) {
      toast('Взято: ' + count + ' предм.', 'success');
      playSound('coin');
      S.totalFound = (S.totalFound || 0) + count;
    }
    closeModal('Найдено!');
    renderHUD();
    updateTutorial();
    save();
  };
  
  render();
}

// ─── МАГАЗИН ───
function openShop(filter) {
  const goods = filter === 'cloth' ? ['cap','jacket','jeans','sneakers','suitJacket','suitPants','dressShoes'] : ['bread','water','soup','salad','shawarma','energy'];
  let html = '<div>';
  for (const id of goods) {
    const it = ITEMS[id];
    const price = (it.price * (S.hour >= 18 || S.hour < 6 ? 1.3 : 1)) | 0;
    html += `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:32px;height:32px;">${ITEM_SVG[id] || ''}</div>
          <div><div style="font-weight:600;">${it.name}</div><div style="font-size:11px;color:#888">${fmt(price)} ₽</div></div>
        </div>
        <button class="btn btn-primary" style="padding:6px 12px;font-size:12px" onclick="buyItem('${id}')">Купить</button>
      </div>`;
  }
  html += '</div>';
  openModal(filter === 'cloth' ? 'Одежда' : 'Продукты', html);
}

window.buyItem = (id) => {
  const it = ITEMS[id];
  const price = (it.price * (S.hour >= 18 || S.hour < 6 ? 1.3 : 1)) | 0;
  if (S.money < price) { toast('Не хватает денег', 'error'); return; }
  S.money -= price;
  const existing = S.inventory.find(x => x.itemId === id);
  if (existing) existing.qty++;
  else S.inventory.push({ itemId: id, qty: 1 });
  toast(`Куплено: ${it.name}`, 'success');
  playSound('coin');
  renderHUD();
  save();
};

// ─── БАРАХОЛКА ───
function openFlea() {
  let html = '';
  for (const item of S.inventory) {
    const it = ITEMS[item.itemId];
    if (!it || it.price <= 0) continue;
    html += `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:32px;height:32px;">${ITEM_SVG[item.itemId] || ''}</div>
          <div><div style="font-weight:600;">${it.name} ×${item.qty}</div><div style="font-size:11px;color:#888">Продать за ${fmt(Math.round(it.price*0.6))} ₽</div></div>
        </div>
        <button class="btn btn-secondary" style="padding:6px 12px;font-size:12px" onclick="sellItem('${item.itemId}')">Продать</button>
      </div>`;
  }
  if (!html) html = '<p style="text-align:center;color:#888;padding:20px;">Нечего продавать.</p>';
  openModal('Барахолка', html);
}

window.sellItem = (id) => {
  const it = ITEMS[id];
  const idx = S.inventory.findIndex(x => x.itemId === id);
  if (idx === -1) return;
  S.inventory[idx].qty--;
  if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
  const price = Math.round(it.price * 0.6);
  S.money += price;
  S.totalEarned = (S.totalEarned || 0) + price;
  toast(`+${price} ₽`, 'success');
  playSound('coin');
  renderHUD();
  closeModal('Барахолка');
  openFlea();
  save();
};

// ─── ОСТАЛЬНЫЕ ФУНКЦИИ (БАЗОВЫЕ) ───
function openModal(title, bodyHtml) {
  closeModal(title);
  const root = document.getElementById('modalRoot');
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.dataset.id = title;
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header"><h3>${title}</h3><button class="modal-close" onclick="closeModal('${title}')">×</button></div>
      <div class="modal-body">${bodyHtml}</div>
    </div>
  `;
  root.appendChild(modal);
  return modal;
}
function closeModal(id) {
  const m = document.querySelector(`.modal-overlay[data-id="${id}"]`);
  if (m) m.remove();
}
window.closeModal = closeModal;

function begMoney() {
  if (S.energy < 10) { toast('Нет сил', 'error'); return; }
  S.energy -= 10;
  if (chance(0.5)) {
    const m = randInt(20, 80);
    S.money += m;
    toast(`+${m} ₽`, 'success');
    playSound('coin');
  } else toast('Никто не подал', 'info');
  renderHUD(); save();
}

function washWindows() {
  if (S.energy < 5) { toast('Нет сил', 'error'); return; }
  S.energy -= 5; S.money += 5;
  toast('+5 ₽', 'success');
  renderHUD(); save();
}

function restCafe() {
  if (S.money < 100) { toast('Мало денег', 'error'); return; }
  S.money -= 100; S.energy = clamp(S.energy + 30, 0, 100);
  toast('Энергия +30', 'success');
  renderHUD(); save();
}

function walkPark() {
  S.energy = clamp(S.energy + 10, 0, 100);
  S.satiety = clamp(S.satiety - 5, 0, 100);
  toast('Прогулка +10 энергии', 'success');
  renderHUD(); save();
}

function sleepNow() {
  if (S.housing === 'street') { toast('На улице холодно', 'error'); return; }
  S.sleeping = true;
  toast('Вы спите...', 'info');
  setTimeout(() => {
    S.energy = clamp(50, 0, 100);
    S.gameMinute += 6 * 60;
    S.sleeping = false;
    toast('Доброе утро!', 'success');
    playSound('success');
    renderHUD(); save();
  }, 800);
}

function doWork(id) {
  const job = JOBS[id];
  if (S.energy < job.energy) { toast('Мало энергии', 'error'); return; }
  S.energy -= job.energy;
  S.money += job.pay;
  S.totalEarned = (S.totalEarned || 0) + job.pay;
  toast(`Зарплата +${job.pay} ₽`, 'success');
  playSound('coin');
  renderHUD(); updateTutorial(); save();
}

function takeExam(type) {
  const edu = EDUCATION[type];
  if (S.educationLevel < edu.reqEdu) { toast('Сначала предыдущая ступень', 'error'); return; }
  if (S.money < edu.cost) { toast('Не хватает денег', 'error'); return; }
  // Упрощённый экзамен (для демо)
  S.money -= edu.cost;
  S.educationLevel = Math.min(S.educationLevel + 1, 3);
  S.reputation = clamp(S.reputation + 5, 0, 100);
  toast(`Образование повышено до ур.${S.educationLevel}`, 'success');
  playSound('success');
  renderHUD(); updateTutorial(); save();
}

function openHousing() {
  let html = '';
  for (const [id, h] of Object.entries(HOUSINGS)) {
    html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
      <div><div>${h.name}</div><div style="font-size:11px;color:#888">${h.desc}</div></div>
      <button class="btn ${S.housing===id?'btn-secondary':'btn-primary'}" style="padding:6px 12px;font-size:12px" onclick="setHousing('${id}')">${S.housing===id?'Текущее':'Выбрать'}</button>
    </div>`;
  }
  openModal('Жильё', html);
}
window.setHousing = (id) => {
  const h = HOUSINGS[id];
  if (h.cost > 0 && S.money < h.cost) { toast('Мало денег', 'error'); return; }
  S.money -= h.cost;
  S.housing = id;
  toast('Переезд: ' + h.name, 'success');
  closeModal('Жильё');
  renderHUD(); save();
};

function openTransport() {
  let html = '';
  for (const [id, t] of Object.entries(TRANSPORTS)) {
    html += `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.1);">
      <div><div>${t.name}</div><div style="font-size:11px;color:#888">Скорость ×${t.speed}</div></div>
      <button class="btn ${S.transport===id?'btn-secondary':'btn-primary'}" style="padding:6px 12px;font-size:12px" onclick="setTransport('${id}')">${S.transport===id?'Текущий':'Купить'}</button>
    </div>`;
  }
  openModal('Транспорт', html);
}
window.setTransport = (id) => {
  const t = TRANSPORTS[id];
  if (S.money < t.cost) { toast('Мало денег', 'error'); return; }
  S.money -= t.cost;
  S.transport = id;
  toast('Куплено: ' + t.name, 'success');
  closeModal('Транспорт');
  renderHUD(); save();
};

function openBusiness() {
  openModal('Бизнес', '<p>Открытие бизнеса доступно после вуза. Функция в разработке.</p>');
}
function openBank() {
  openModal('Банк', '<p>Вклады появятся позже.</p>');
}

// ─── ИНВЕНТАРЬ / ПЕРСОНАЖ / КВЕСТЫ ───
function openInventory() {
  let html = '<div class="inv-grid">';
  for (const item of S.inventory) {
    const it = ITEMS[item.itemId];
    html += `<div class="inv-item" onclick="useItem('${item.itemId}')">
      ${ITEM_SVG[item.itemId] || '<svg viewBox="0 0 24 24"><rect width="24" height="24" fill="#555"/></svg>'}
      ${item.qty > 1 ? `<span class="qty">${item.qty}</span>` : ''}
    </div>`;
  }
  html += '</div>';
  openModal('Инвентарь', html);
}
window.useItem = (id) => {
  const it = ITEMS[id];
  if (it.type === 'food') {
    const idx = S.inventory.findIndex(x => x.itemId === id);
    if (idx === -1) return;
    S.inventory[idx].qty--;
    if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
    S.satiety = clamp(S.satiety + (it.satiety || 0), 0, 100);
    if (it.health) S.health = clamp(S.health + it.health, 0, 100);
    if (it.energy) S.energy = clamp(S.energy + it.energy, 0, 100);
    toast('Съедено: ' + it.name, 'success');
    playSound('coin');
    renderHUD(); updateTutorial(); save();
    closeModal('Инвентарь');
    openInventory();
  } else if (it.type === 'cloth') {
    const idx = S.inventory.findIndex(x => x.itemId === id);
    if (idx === -1) return;
    S.inventory[idx].qty--;
    if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
    S.equipment[it.slot] = { itemId: id, condition: 100 };
    toast('Надето: ' + it.name, 'success');
    renderLocation();
    renderHUD(); save();
    closeModal('Инвентарь');
    openInventory();
  } else {
    toast('Этот предмет нельзя использовать', 'info');
  }
};

function openCharacter() {
  const eq = S.equipment;
  let html = `<div style="text-align:center;margin-bottom:16px;">${renderCharacter(true)}</div>`;
  html += `<p>Уровень: ${S.educationLevel > 0 ? 'Образование ' + S.educationLevel : 'Нет образования'}</p>`;
  html += `<p>Жильё: ${HOUSINGS[S.housing].name}</p>`;
  html += `<p>Транспорт: ${TRANSPORTS[S.transport].name}</p>`;
  openModal('Персонаж', html);
}

function openQuests() {
  openModal('Квесты', '<p>Журнал квестов пуст. Следуй подсказкам обучения.</p>');
}

function openSettings() {
  openModal('Настройки', `
    <p>Игра: Из грязи в князи v3.0</p>
    <p>Сохранение: авто каждые 30 сек</p>
    <button class="btn btn-danger" style="width:100%;margin-top:16px;" onclick="if(confirm('Сбросить?')){localStorage.removeItem('${SAVE_KEY}');location.reload();}">Сбросить прогресс</button>
  `);
}

// ─── ТУТОРИАЛ ───
const TUTORIAL = [
  { text: 'Привет! Ты на улице. Нажми на кнопку «Карта» внизу, чтобы найти мусорку.', check: () => S.mapOpened || false },
  { text: 'Кликни на мусорку на карте. Персонаж побежит к ней.', check: () => S.visitedDump || false },
  { text: 'На мусорке нажми «Копаться» и пройди мини-игру.', check: () => (S.totalFound || 0) > 0 },
  { text: 'Отлично! Теперь иди на Барахолку и продай хлам.', check: () => (S.totalEarned || 0) > 0 },
  { text: 'Ты голоден! Купи еду в магазине и съешь её (в инвентаре).', check: () => S.satiety > 60 && (S.totalEarned || 0) > 0 },
  { text: 'Найди работу на Заводе, чтобы зарабатывать.', check: () => S.currentJob !== null },
  { text: 'Обучение окончено! Дальше — твой путь.', check: () => false },
];

function updateTutorial() {
  if (!S) return;
  const toastEl = document.getElementById('tutorialToast');
  const textEl = document.getElementById('tutText');
  
  while (S.tutorialStep < TUTORIAL.length) {
    const step = TUTORIAL[S.tutorialStep];
    if (step.check()) { S.tutorialStep++; continue; }
    textEl.textContent = step.text;
    toastEl.classList.remove('hidden');
    return;
  }
  toastEl.classList.add('hidden');
}

// ─── СТАРТ ───
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnNewGame').onclick = () => {
    S = createState();
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    initAudio();
    showLocationScreen();
    updateTutorial();
    startTick();
    save();
  };
  
  const saved = load();
  if (saved) {
    document.getElementById('btnContinue').style.display = 'inline-flex';
    document.getElementById('btnContinue').onclick = () => {
      S = saved;
      if (!S.mapDrawn) S.mapDrawn = false;
      document.getElementById('startScreen').classList.add('hidden');
      document.getElementById('game').classList.remove('hidden');
      initAudio();
      showLocationScreen();
      updateTutorial();
      startTick();
    };
  }
  
  document.getElementById('navMap').onclick = () => { playSound('click'); S.mapOpened = true; showMapScreen(); };
  document.getElementById('btnBackFromMap').onclick = () => { playSound('click'); showLocationScreen(); };
  document.getElementById('navInv').onclick = () => { playSound('click'); openInventory(); };
  document.getElementById('navChar').onclick = () => { playSound('click'); openCharacter(); };
  document.getElementById('navQuests').onclick = () => { playSound('click'); openQuests(); };
  document.getElementById('navSettings').onclick = () => { playSound('click'); openSettings(); };
  document.getElementById('tutClose').onclick = () => { document.getElementById('tutorialToast').classList.add('hidden'); };
  
  // Обновляем иконки в HUD
  document.getElementById('icoSatiety').innerHTML = SVG.satiety;
  document.getElementById('icoHealth').innerHTML = SVG.health;
  document.getElementById('icoEnergy').innerHTML = SVG.energy;
  document.getElementById('icoHygiene').innerHTML = SVG.hygiene;
  document.getElementById('icoRep').innerHTML = SVG.rep;
});

function startTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (!S || S.sleeping) return;
    S.gameMinute++;
    S.satiety = clamp(S.satiety - 0.08, 0, 100);
    S.hygiene = clamp(S.hygiene - 0.05, 0, 100);
    if (S.energy > 0) S.energy = clamp(S.energy - 0.1, 0, 100);
    if (S.satiety < 20) S.health = clamp(S.health - 0.1, 0, 100);
    if (S.health <= 0) { S.health = 40; S.money = Math.floor(S.money * 0.7); toast('Вы потеряли сознание...', 'error'); }
    renderHUD();
    updateTutorial();
  }, 1000);
  setInterval(save, 30000);
}

// Экспорт для inline-обработчиков
window.startDig = startDig;
window.openShop = openShop;
window.openFlea = openFlea;
window.begMoney = begMoney;
window.washWindows = washWindows;
window.restCafe = restCafe;
window.walkPark = walkPark;
window.sleepNow = sleepNow;
window.doWork = doWork;
window.takeExam = takeExam;
window.openHousing = openHousing;
window.openTransport = openTransport;
window.openBusiness = openBusiness;
window.openBank = openBank;
