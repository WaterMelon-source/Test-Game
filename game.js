'use strict';

// ═══════════════ SVG для HUD и нижней панели (по фото) ═══════════════
const SVG = {
  satiety: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"><path d="M17 8h1a3 3 0 0 1 0 6h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg>',
  health: '<svg viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  energy: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  hygiene: '<svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  rep: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
};

// ═══════════════ ЛОКАЦИИ ═══════════════
const LOCATIONS = {
  street:     { name: 'Улица',           emoji: '🛣️', type: 'street',     desc: 'Прохожие спешат мимо. Холодно и сыро.' },
  dump1:      { name: 'Мусорка',         emoji: '🗑️', type: 'dump',       desc: 'Пахнет не очень, но можно найти что-то ценное.', dumpId: 'dump1' },
  dump2:      { name: 'Мусорка в парке', emoji: '🗑️', type: 'dump',       desc: 'Урны в парке. Много бутылок.', dumpId: 'dump2' },
  dump3:      { name: 'Мусорка',         emoji: '🗑️', type: 'dump',       desc: 'Возле жилых домов. Много хлама.', dumpId: 'dump3' },
  dump4:      { name: 'Свалка',          emoji: '🗑️', type: 'dump',       desc: 'Огромная куча мусора. Есть всё.', dumpId: 'dump4' },
  shop:       { name: 'Магазин',         emoji: '🛒', type: 'shop',       desc: 'Продукты и одежда. Цены кусаются.' },
  flea:       { name: 'Барахолка',       emoji: '🏪', type: 'flea',       desc: 'Здесь можно продать найденный хлам.' },
  school:     { name: 'Школа',           emoji: '🏫', type: 'school',     desc: 'Путь к знаниям начинается здесь.' },
  college:    { name: 'Колледж',         emoji: '🎓', type: 'college',    desc: 'Среднее образование — шаг вперёд.' },
  university: { name: 'Вуз',             emoji: '🏛️', type: 'university', desc: 'Высшее образование открывает двери.' },
  factory:    { name: 'Завод',           emoji: '🏭', type: 'factory',    desc: 'Тяжёлый труд, но платят честно.' },
  office:     { name: 'Офис',            emoji: '🏢', type: 'office',     desc: 'Здесь работают умные люди.' },
  cafe:       { name: 'Кафе',            emoji: '☕', type: 'cafe',       desc: 'Тёплое место, чтобы отдохнуть.' },
  bank:       { name: 'Банк',            emoji: '🏦', type: 'bank',       desc: 'Сбережения под проценты.' },
  shelter:    { name: 'Ночлежка',        emoji: '🛏️', type: 'housing',    desc: 'Бесплатно, но спать на кровати — счастье.' },
  park:       { name: 'Парк',            emoji: '🌳', type: 'park',       desc: 'Свежий воздух и деревья. Можно погулять.' },
  dealership: { name: 'Автосалон',       emoji: '🚗', type: 'transport',  desc: 'Мечта о собственном авто.' },
  business:   { name: 'Бизнес-центр',    emoji: '💼', type: 'business',   desc: 'Здесь открывают своё дело.' },
};

// Позиции (в пикселях внутренних 1200×800)
const MAP_POS = {
  street:     { x: 400, y: 430 },
  dump1:      { x: 350, y: 620 },
  dump2:      { x: 560, y: 260 },
  dump3:      { x: 630, y: 700 },
  dump4:      { x: 130, y: 630 },
  shop:       { x: 415, y: 520 },
  flea:       { x: 555, y: 550 },
  school:     { x: 220, y: 230 },
  college:    { x: 130, y: 370 },
  university: { x: 220, y: 540 },
  factory:    { x: 890, y: 660 },
  office:     { x: 810, y: 220 },
  cafe:       { x: 480, y: 350 },
  bank:       { x: 720, y: 350 },
  shelter:    { x: 150, y: 720 },
  park:       { x: 640, y: 200 },
  dealership: { x: 720, y: 720 },
  business:   { x: 950, y: 140 },
};

// ═══════════════ ПРЕДМЕТЫ (эмодзи) ═══════════════
const ITEMS = {
  bottle:      { name: 'Бутылка',           emoji: '🍾', type: 'material', price: 8 },
  rag:         { name: 'Тряпка',            emoji: '🧻', type: 'material', price: 6 },
  thread:      { name: 'Нитки',             emoji: '🧵', type: 'material', price: 12 },
  wire:        { name: 'Проволока',         emoji: '🔗', type: 'material', price: 18 },
  scrap:       { name: 'Металлолом',        emoji: '⚙️', type: 'material', price: 15 },
  phoneBroken: { name: 'Сломанный телефон', emoji: '📱', type: 'valuable', price: 800 },
  phoneWorking:{ name: 'Телефон',           emoji: '📱', type: 'valuable', price: 2500 },
  watch:       { name: 'Часы',              emoji: '⌚', type: 'valuable', price: 1500 },
  book:        { name: 'Книга',             emoji: '📕', type: 'valuable', price: 250 },
  screwdriver: { name: 'Отвёртка',          emoji: '🪛', type: 'tool',     price: 300 },
  bread:       { name: 'Хлеб',              emoji: '🍞', type: 'food', price: 30, satiety: 18, health: -1 },
  water:       { name: 'Вода',              emoji: '💧', type: 'food', price: 20, satiety: 8, health: 1, energy: 3 },
  soup:        { name: 'Суп',               emoji: '🍲', type: 'food', price: 150, satiety: 32, health: 5 },
  salad:       { name: 'Салат',             emoji: '🥗', type: 'food', price: 200, satiety: 22, health: 10 },
  shawarma:    { name: 'Шаурма',            emoji: '🌯', type: 'food', price: 180, satiety: 38, health: -5 },
  energy:      { name: 'Энергетик',         emoji: '🥤', type: 'food', price: 120, satiety: 0, health: -3, energy: 25 },
  tornshirt:   { name: 'Рваная рубаха',     emoji: '👕', type: 'cloth', slot: 'body', price: 0, rep: 0 },
  cap:         { name: 'Кепка',             emoji: '🧢', type: 'cloth', slot: 'head', price: 300, rep: 1 },
  jacket:      { name: 'Куртка',            emoji: '🧥', type: 'cloth', slot: 'body', price: 800, rep: 3 },
  jeans:       { name: 'Джинсы',            emoji: '👖', type: 'cloth', slot: 'legs', price: 1200, rep: 3 },
  sneakers:    { name: 'Кроссовки',         emoji: '👟', type: 'cloth', slot: 'shoes', price: 2000, rep: 4 },
  suitJacket:  { name: 'Пиджак',            emoji: '🤵', type: 'cloth', slot: 'body', price: 8000, rep: 10 },
  suitPants:   { name: 'Брюки',             emoji: '👖', type: 'cloth', slot: 'legs', price: 6000, rep: 8 },
  dressShoes:  { name: 'Туфли',             emoji: '👞', type: 'cloth', slot: 'shoes', price: 9000, rep: 10 },
};

const HOUSINGS = {
  street:    { name: 'Улица',           cost: 0,      rent: 0,     energyRestore: 25,  desc: 'Бесплатно, опасно' },
  shelter:   { name: 'Ночлежка',        cost: 0,      rent: 0,     energyRestore: 50,  desc: 'Бесплатный ночлег' },
  dorm:      { name: 'Комната в общаге',cost: 5000,   rent: 2000,  energyRestore: 75,  desc: 'Скромно' },
  apartment: { name: 'Съёмная квартира',cost: 25000,  rent: 10000, energyRestore: 90,  desc: 'Уютно' },
  studio:    { name: 'Своя студия',     cost: 150000, rent: 0,     energyRestore: 100, desc: 'Личное пространство' },
  penthouse: { name: 'Пентхаус',        cost: 1000000,rent: 0,     energyRestore: 100, desc: 'Вершина' },
};

const TRANSPORTS = {
  walk:   { name: 'Пешком',         cost: 0,       speed: 1,   rep: 0 },
  bike:   { name: 'Велосипед',      cost: 5000,    speed: 1.6, rep: 1 },
  oldcar: { name: 'Старая машина',  cost: 80000,   speed: 2.4, rep: 4 },
  newcar: { name: 'Новая иномарка', cost: 1000000, speed: 3.2, rep: 8 },
};

const JOBS = {
  janitor:    { name: 'Дворник',      pay: 400,  energy: 25, reqEdu: 0, reqRep: 0,  desc: 'Подметать улицы' },
  loader:     { name: 'Грузчик',      pay: 600,  energy: 35, reqEdu: 0, reqRep: 0,  desc: 'Таскать ящики' },
  courier:    { name: 'Курьер',       pay: 900,  energy: 28, reqEdu: 1, reqRep: 10, desc: 'Доставка' },
  programmer: { name: 'Программист',  pay: 4000, energy: 25, reqEdu: 3, reqRep: 25, reqSpec: 'programmer', desc: 'Писать код' },
  manager:    { name: 'Менеджер',     pay: 3500, energy: 25, reqEdu: 3, reqRep: 25, reqSpec: 'manager', desc: 'Управлять' },
};

const EDUCATION = {
  school:     { name: 'Школа',   cost: 0,     reqEdu: 0 },
  college:    { name: 'Колледж', cost: 5000,  reqEdu: 1 },
  university: { name: 'Вуз',     cost: 30000, reqEdu: 2 },
};

// ═══════════════ УТИЛИТЫ ═══════════════
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
    if (name === 'coin') { o.frequency.value = 1200; o.type = 'sine'; g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.15); o.start(now); o.stop(now + 0.15); }
    if (name === 'success') { o.frequency.setValueAtTime(400, now); o.frequency.linearRampToValueAtTime(800, now + 0.1); o.type = 'triangle'; g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.start(now); o.stop(now + 0.2); }
    if (name === 'fail') { o.frequency.setValueAtTime(300, now); o.frequency.linearRampToValueAtTime(100, now + 0.2); o.type = 'sawtooth'; g.gain.setValueAtTime(0.08, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.2); o.start(now); o.stop(now + 0.2); }
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

// ═══════════════ СОСТОЯНИЕ ═══════════════
let S = null;
let tickTimer = null;
const SAVE_KEY = 'rags_to_riches_v4';

function createState() {
  return {
    money: 0, satiety: 60, health: 100, energy: 100, hygiene: 40, reputation: 10,
    day: 1, gameMinute: 8 * 60, currentLocation: 'street',
    inventory: [{ itemId: 'bottle', qty: 1 }, { itemId: 'rag', qty: 1 }],
    equipment: { head: null, body: { itemId: 'tornshirt', condition: 100 }, legs: null, shoes: null, accessory: null },
    dumps: { dump1: 100, dump2: 100, dump3: 100, dump4: 100 },
    housing: 'street', transport: 'walk',
    educationLevel: 0, specialty: null, currentJob: null,
    tutorialStep: 0, totalFound: 0, totalEarned: 0,
    traveling: false, sleeping: false,
    visitedDumps: [],
  };
}

function save() { if (S) try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch(e) {} }
function load() { try { const d = localStorage.getItem(SAVE_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

// ═══════════════ ВРЕМЯ СУТОК ═══════════════
function getTimeOfDay() {
  const h = Math.floor(S.gameMinute / 60) % 24;
  if (h >= 6 && h < 10) return 'morning';
  if (h >= 10 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

// ═══════════════ HUD ═══════════════
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
  
  const tod = getTimeOfDay();
  document.getElementById('hudTimeIcon').innerHTML = (tod === 'day' || tod === 'morning') ? SVG.sun : SVG.moon;
  
  const overlay = document.getElementById('timeOverlay');
  if (overlay) {
    overlay.className = 'time-overlay ' + tod;
  }
}

// ═══════════════ КАРТА — РИСОВАНИЕ ═══════════════
let mapDrawn = false;

function drawMap() {
  const canvas = document.getElementById('mapCanvas');
  const ctx = canvas.getContext('2d');
  const W = 1200, H = 800;
  canvas.width = W; canvas.height = H;

  // === ФОН: ТРАВА ===
  ctx.fillStyle = '#3d5a2e';
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 500; i++) {
    const g = 50 + Math.random() * 30;
    ctx.fillStyle = `rgba(${g}, ${g+20}, ${g-10}, 0.35)`;
    ctx.beginPath();
    ctx.arc(Math.random()*W, Math.random()*H, 8 + Math.random()*22, 0, Math.PI*2);
    ctx.fill();
  }
  // Тёмные кусты в углах
  for (let i = 0; i < 40; i++) {
    const x = Math.random() < 0.5 ? Math.random()*150 : W - Math.random()*150;
    const y = Math.random()*H;
    ctx.fillStyle = 'rgba(30,50,25,0.6)';
    ctx.beginPath(); ctx.arc(x, y, 15 + Math.random()*25, 0, Math.PI*2); ctx.fill();
  }

  // === РЕЧКА (извилистая, справа) ===
  ctx.save();
  // Берега
  ctx.strokeStyle = '#5a7a3a';
  ctx.lineWidth = 90;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(1050, -50);
  ctx.bezierCurveTo(1000, 200, 1100, 350, 1050, 500);
  ctx.bezierCurveTo(1000, 650, 1120, 750, 1080, 850);
  ctx.stroke();
  // Вода
  ctx.strokeStyle = '#2a6a9a';
  ctx.lineWidth = 70;
  ctx.beginPath();
  ctx.moveTo(1050, -50);
  ctx.bezierCurveTo(1000, 200, 1100, 350, 1050, 500);
  ctx.bezierCurveTo(1000, 650, 1120, 750, 1080, 850);
  ctx.stroke();
  // Блики
  ctx.strokeStyle = 'rgba(150,220,255,0.5)';
  ctx.lineWidth = 20;
  ctx.beginPath();
  ctx.moveTo(1050, -50);
  ctx.bezierCurveTo(1000, 200, 1100, 350, 1050, 500);
  ctx.bezierCurveTo(1000, 650, 1120, 750, 1080, 850);
  ctx.stroke();
  ctx.restore();

  // === ДОРОГИ ===
  function drawRoad(path, width = 46) {
    // Тень/обочина
    ctx.strokeStyle = '#2a2a2a';
    ctx.lineWidth = width + 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    path(ctx);
    ctx.stroke();
    // Асфальт
    ctx.strokeStyle = '#4a4a4a';
    ctx.lineWidth = width;
    ctx.beginPath();
    path(ctx);
    ctx.stroke();
    // Разметка
    ctx.strokeStyle = 'rgba(220, 180, 50, 0.85)';
    ctx.lineWidth = 2;
    ctx.setLineDash([15, 20]);
    ctx.beginPath();
    path(ctx);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  // Главная горизонтальная (изогнутая)
  drawRoad((c) => {
    c.moveTo(0, 420);
    c.bezierCurveTo(200, 430, 400, 400, 600, 420);
    c.bezierCurveTo(750, 435, 850, 410, 950, 420);
  });

  // Верхняя горизонтальная
  drawRoad((c) => {
    c.moveTo(0, 180);
    c.bezierCurveTo(200, 165, 400, 195, 600, 180);
    c.bezierCurveTo(750, 170, 850, 195, 950, 175);
  });

  // Левая вертикальная
  drawRoad((c) => {
    c.moveTo(270, 0);
    c.bezierCurveTo(255, 200, 285, 400, 265, 600);
    c.bezierCurveTo(255, 700, 275, 780, 265, 800);
  });

  // Правая вертикальная (за речкой, но до неё)
  drawRoad((c) => {
    c.moveTo(950, 0);
    c.bezierCurveTo(940, 200, 960, 400, 950, 600);
    c.bezierCurveTo(945, 700, 955, 780, 950, 800);
  });

  // Диагональ к заводу
  drawRoad((c) => {
    c.moveTo(600, 420);
    c.bezierCurveTo(700, 480, 800, 550, 900, 640);
  });

  // Верхний перекрёсток → бизнес-центр
  drawRoad((c) => {
    c.moveTo(600, 180);
    c.bezierCurveTo(750, 160, 850, 150, 950, 145);
  }, 30);

  // === ЗДАНИЯ ===

  // --- ПАРК (без зданий!) ---
  drawPark(ctx, 460, 90, 280, 250);

  // --- Школа ---
  drawSchool(ctx, 160, 155, 130, 80);

  // --- Колледж ---
  drawSchool(ctx, 80, 330, 110, 70);

  // --- Вуз (с колоннами) ---
  drawTemple(ctx, 160, 490, 140, 100);

  // --- Ночлежка (обшарпанная) ---
  drawHostel(ctx, 80, 680, 110, 80);

  // --- Магазин ---
  drawShop(ctx, 340, 470, 120, 80);

  // --- Барахолка (навесы, палатки) ---
  drawFlea(ctx, 500, 490, 120, 90);

  // --- Кафе (с зонтиками) ---
  drawCafe(ctx, 420, 300, 100, 75);

  // --- Банк (с колоннами) ---
  drawBank(ctx, 660, 300, 130, 95);

  // --- Офис (стекляшка) ---
  drawOffice(ctx, 750, 165, 110, 105);

  // --- Бизнес-центр (небоскрёб) ---
  drawTower(ctx, 880, 60, 100, 130);

  // --- Завод (с трубами) ---
  drawFactory(ctx, 800, 590, 160, 110);

  // --- Автосалон ---
  drawDealership(ctx, 620, 660, 160, 95);

  // --- Мусорки (кучи + баки) ---
  drawDumpHeap(ctx, 320, 590);
  drawDumpHeap(ctx, 520, 230); // в парке
  drawDumpHeap(ctx, 600, 670);
  drawDumpHeap(ctx, 105, 600);

  // --- Улица (просто перекрёсток, ничего не рисуем отдельно) ---

  // === Деревья по краям ===
  for (let i = 0; i < 25; i++) {
    const x = Math.random() * W;
    const y = Math.random() * H;
    // Не на дорогах и не на зданиях
    if (Math.abs(y - 420) < 50 || Math.abs(y - 180) < 50) continue;
    if (Math.abs(x - 270) < 50 || Math.abs(x - 950) < 50) continue;
    if (x > 1050) continue; // у речки
    drawTree(ctx, x, y);
  }
}

// --- Хелпер: дерево ---
function drawTree(ctx, x, y) {
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.arc(x + 3, y + 3, 14, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#2a4a1a';
  ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#4a7a2a';
  ctx.beginPath(); ctx.arc(x - 3, y - 3, 10, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#6aa03a';
  ctx.beginPath(); ctx.arc(x - 4, y - 5, 5, 0, Math.PI*2); ctx.fill();
}

// --- ПАРК ---
function drawPark(ctx, x, y, w, h) {
  // Зелёная зона
  ctx.fillStyle = '#2a5a1a';
  ctx.beginPath();
  ctx.ellipse(x + w/2, y + h/2, w/2, h/2, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = 'rgba(74, 122, 42, 0.5)';
  ctx.beginPath();
  ctx.ellipse(x + w/2, y + h/2, w/2.4, h/2.4, 0, 0, Math.PI*2);
  ctx.fill();
  
  // Пруд
  ctx.fillStyle = '#2a6a9a';
  ctx.beginPath();
  ctx.ellipse(x + w*0.65, y + h*0.6, 40, 25, 0.3, 0, Math.PI*2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(150,220,255,0.4)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(x + w*0.65, y + h*0.6, 30, 18, 0.3, 0, Math.PI*2);
  ctx.stroke();
  
  // Дорожки в парке
  ctx.strokeStyle = '#a89060';
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x + 20, y + h - 20);
  ctx.quadraticCurveTo(x + w/2, y + h/2, x + w - 20, y + 20);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + w - 20, y + h - 20);
  ctx.quadraticCurveTo(x + w/2, y + h/2, x + 20, y + 20);
  ctx.stroke();
  
  // Деревья внутри
  const trees = [
    [x + 50, y + 40], [x + 90, y + 30], [x + w - 50, y + 40], [x + w - 90, y + 30],
    [x + 30, y + h - 40], [x + 70, y + h - 60], [x + w - 40, y + h - 60],
    [x + 140, y + 100], [x + w - 130, y + 120],
  ];
  for (const [tx, ty] of trees) {
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.arc(tx + 2, ty + 2, 12, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#2a5a1a';
    ctx.beginPath(); ctx.arc(tx, ty, 12, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#4a8a2a';
    ctx.beginPath(); ctx.arc(tx - 3, ty - 3, 8, 0, Math.PI*2); ctx.fill();
  }
  
  // Скамейки
  ctx.fillStyle = '#6a4a2a';
  ctx.fillRect(x + w*0.3, y + h*0.5, 30, 6);
  ctx.fillRect(x + w*0.65, y + h*0.35, 30, 6);
  
  // Ограждение (пунктиром)
  ctx.strokeStyle = 'rgba(139, 105, 60, 0.8)';
  ctx.lineWidth = 3;
  ctx.setLineDash([6, 8]);
  ctx.beginPath();
  ctx.ellipse(x + w/2, y + h/2, w/2 + 4, h/2 + 4, 0, 0, Math.PI*2);
  ctx.stroke();
  ctx.setLineDash([]);
}

// --- Дом-основа (с двускатной крышей) ---
function drawHouseBase(ctx, x, y, w, h, wallColor, roofColor) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Стена
  ctx.fillStyle = wallColor;
  ctx.fillRect(x, y, w, h);
  // Крыша
  ctx.fillStyle = roofColor;
  ctx.beginPath();
  ctx.moveTo(x - 8, y);
  ctx.lineTo(x + w/2, y - 22);
  ctx.lineTo(x + w + 8, y);
  ctx.closePath();
  ctx.fill();
  // Обводка крыши
  ctx.strokeStyle = 'rgba(0,0,0,0.3)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
}

// --- Школа (длинное здание с флагом и рядом окон) ---
function drawSchool(ctx, x, y, w, h) {
  drawHouseBase(ctx, x, y, w, h, '#c8b890', '#7a4a3a');
  // Окна в ряд
  ctx.fillStyle = '#a8d0f0';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + 10 + i * 28, y + 18, 18, 22);
    ctx.strokeStyle = '#3a2a2a';
    ctx.lineWidth = 1;
    ctx.strokeRect(x + 10 + i * 28, y + 18, 18, 22);
  }
  // Дверь
  ctx.fillStyle = '#5a3a2a';
  ctx.fillRect(x + w/2 - 10, y + h - 22, 20, 22);
  // Флаг
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(x + w/2, y - 22); ctx.lineTo(x + w/2, y - 60); ctx.stroke();
  ctx.fillStyle = '#e85050';
  ctx.beginPath();
  ctx.moveTo(x + w/2, y - 60);
  ctx.lineTo(x + w/2 + 30, y - 52);
  ctx.lineTo(x + w/2, y - 44);
  ctx.closePath(); ctx.fill();
}

// --- Вуз (храм науки) ---
function drawTemple(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Основание
  ctx.fillStyle = '#d8d0c0';
  ctx.fillRect(x, y, w, h);
  // Ступени
  ctx.fillStyle = '#b8b0a0';
  ctx.fillRect(x - 10, y + h - 12, w + 20, 12);
  ctx.fillStyle = '#a8a090';
  ctx.fillRect(x - 6, y + h - 6, w + 12, 6);
  // Колонны
  ctx.fillStyle = '#e8e0d0';
  for (let i = 0; i < 5; i++) {
    const cx = x + 10 + i * ((w - 20) / 4);
    ctx.fillRect(cx - 5, y + 12, 10, h - 24);
    // Капитель
    ctx.fillRect(cx - 7, y + 8, 14, 6);
    ctx.fillRect(cx - 7, y + h - 18, 14, 6);
  }
  // Фронтон
  ctx.fillStyle = '#c8b890';
  ctx.beginPath();
  ctx.moveTo(x - 12, y + 12);
  ctx.lineTo(x + w/2, y - 20);
  ctx.lineTo(x + w + 12, y + 12);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#3a3a2a';
  ctx.lineWidth = 2;
  ctx.stroke();
}

// --- Банк (с колоннами, солидный) ---
function drawBank(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Основа
  ctx.fillStyle = '#e8dcc0';
  ctx.fillRect(x, y, w, h);
  // Фронтон
  ctx.fillStyle = '#c8b890';
  ctx.beginPath();
  ctx.moveTo(x - 10, y + 15);
  ctx.lineTo(x + w/2, y - 22);
  ctx.lineTo(x + w + 10, y + 15);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#5a4a2a';
  ctx.lineWidth = 2;
  ctx.stroke();
  // Символ $
  ctx.fillStyle = '#c8a040';
  ctx.font = 'bold 24px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('₽', x + w/2, y - 5);
  // Колонны
  ctx.fillStyle = '#f8f0d8';
  for (let i = 0; i < 4; i++) {
    const cx = x + 15 + i * ((w - 30) / 3);
    ctx.fillRect(cx - 4, y + 20, 8, h - 30);
    ctx.fillStyle = '#d8c8a0';
    ctx.fillRect(cx - 6, y + 18, 12, 4);
    ctx.fillRect(cx - 6, y + h - 12, 12, 4);
    ctx.fillStyle = '#f8f0d8';
  }
  // Дверь в центре
  ctx.fillStyle = '#5a3a1a';
  ctx.fillRect(x + w/2 - 8, y + h - 15, 16, 15);
}

// --- Офис (стекляшка) ---
function drawOffice(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Основа
  ctx.fillStyle = '#3a4a6a';
  ctx.fillRect(x, y, w, h);
  // Плоская крыша
  ctx.fillStyle = '#2a3a5a';
  ctx.fillRect(x - 4, y - 8, w + 8, 10);
  // Окна-соты
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 4; col++) {
      const wx = x + 10 + col * ((w - 20) / 4);
      const wy = y + 12 + row * ((h - 24) / 5);
      const ww = (w - 20) / 4 - 6;
      const wh = (h - 24) / 5 - 6;
      // Окно светится днём
      const glow = Math.random() > 0.6;
      ctx.fillStyle = glow ? 'rgba(180, 220, 255, 0.85)' : 'rgba(100, 140, 180, 0.6)';
      ctx.fillRect(wx, wy, ww, wh);
    }
  }
  // Вход
  ctx.fillStyle = '#c8d8e8';
  ctx.fillRect(x + w/2 - 10, y + h - 15, 20, 15);
}

// --- Бизнес-центр (небоскрёб) ---
function drawTower(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.55)';
  ctx.fillRect(x + 10, y + 10, w, h);
  // Основа
  const grad = ctx.createLinearGradient(x, y, x + w, y + h);
  grad.addColorStop(0, '#1a2a4a');
  grad.addColorStop(1, '#3a5a8a');
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
  // Вертикальные полосы-стёкла
  for (let i = 0; i < 6; i++) {
    const col = x + 6 + i * ((w - 12) / 6);
    const cw = (w - 12) / 6 - 3;
    for (let j = 0; j < 12; j++) {
      const ry = y + 8 + j * ((h - 16) / 12);
      const rh = (h - 16) / 12 - 3;
      ctx.fillStyle = Math.random() > 0.4 ? 'rgba(120, 180, 240, 0.75)' : 'rgba(60, 90, 140, 0.5)';
      ctx.fillRect(col, ry, cw, rh);
    }
  }
  // Антенна
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(x + w/2, y); ctx.lineTo(x + w/2, y - 20); ctx.stroke();
  ctx.fillStyle = '#e85050';
  ctx.beginPath(); ctx.arc(x + w/2, y - 22, 4, 0, Math.PI*2); ctx.fill();
  // Вход
  ctx.fillStyle = '#c8d8f0';
  ctx.fillRect(x + w/2 - 12, y + h - 16, 24, 16);
}

// --- Завод (с трубами) ---
function drawFactory(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Основной корпус
  ctx.fillStyle = '#6a5a4a';
  ctx.fillRect(x, y + 25, w, h - 25);
  // Плоская крыша
  ctx.fillStyle = '#4a3a2a';
  ctx.fillRect(x - 4, y + 18, w + 8, 12);
  // Зубчатая крыша (пилообразная)
  ctx.fillStyle = '#5a4a3a';
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * (w/4), y + 18);
    ctx.lineTo(x + i * (w/4) + w/8, y + 5);
    ctx.lineTo(x + (i+1) * (w/4), y + 18);
    ctx.closePath();
    ctx.fill();
  }
  // Трубы с дымом
  for (let i = 0; i < 2; i++) {
    const tx = x + 30 + i * 70;
    ctx.fillStyle = '#8a3a2a';
    ctx.fillRect(tx - 8, y - 30 + i*5, 16, 45 - i*5);
    // Полоски на трубе
    ctx.fillStyle = '#5a2a1a';
    ctx.fillRect(tx - 8, y - 20 + i*5, 16, 4);
    // Дым
    ctx.fillStyle = 'rgba(180,180,180,0.35)';
    ctx.beginPath(); ctx.arc(tx, y - 40 + i*5, 10, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(tx + 8, y - 55 + i*5, 12, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(tx - 5, y - 70 + i*5, 14, 0, Math.PI*2); ctx.fill();
  }
  // Окна-бойницы
  ctx.fillStyle = 'rgba(255, 200, 100, 0.6)';
  for (let i = 0; i < 6; i++) ctx.fillRect(x + 15 + i * 22, y + 50, 12, 16);
  // Ворота
  ctx.fillStyle = '#2a1a1a';
  ctx.fillRect(x + w - 45, y + h - 25, 35, 25);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) ctx.strokeRect(x + w - 45, y + h - 25 + i*5, 35, 5);
}

// --- Магазин (с витриной и вывеской) ---
function drawShop(ctx, x, y, w, h) {
  drawHouseBase(ctx, x, y, w, h, '#d8b080', '#8a3a2a');
  // Витрина
  ctx.fillStyle = '#a8d8f0';
  ctx.fillRect(x + 10, y + 25, w - 20, 30);
  ctx.strokeStyle = '#4a2a1a';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 10, y + 25, w - 20, 30);
  // Разделители витрины
  ctx.beginPath();
  for (let i = 1; i < 3; i++) {
    ctx.moveTo(x + 10 + i * ((w - 20) / 3), y + 25);
    ctx.lineTo(x + 10 + i * ((w - 20) / 3), y + 55);
  }
  ctx.stroke();
  // Вывеска
  ctx.fillStyle = '#e85050';
  ctx.fillRect(x + 15, y + 5, w - 30, 14);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('МАГАЗИН', x + w/2, y + 15);
  // Дверь
  ctx.fillStyle = '#4a2a1a';
  ctx.fillRect(x + w/2 - 10, y + h - 20, 20, 20);
}

// --- Барахолка (навесы и палатки) ---
function drawFlea(ctx, x, y, w, h) {
  // Основа — навесы разных цветов
  const tents = [
    { tx: x, ty: y + 30, tw: 55, th: 40, color: '#c8a040' },
    { tx: x + 60, ty: y + 15, tw: 50, th: 50, color: '#a83a3a' },
    { tx: x + 15, ty: y + 45, tw: 45, th: 35, color: '#3a6a8a' },
    { tx: x + 70, ty: y + 55, tw: 45, th: 30, color: '#6a4a8a' },
  ];
  for (const t of tents) {
    // Тень
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(t.tx + 4, t.ty + 4, t.tw, t.th);
    // Полосатый навес
    const stripes = Math.floor(t.tw / 10);
    for (let i = 0; i < stripes; i++) {
      ctx.fillStyle = i % 2 === 0 ? t.color : '#f0e0c0';
      ctx.beginPath();
      ctx.moveTo(t.tx + i * (t.tw / stripes), t.ty);
      ctx.lineTo(t.tx + (i + 1) * (t.tw / stripes), t.ty);
      ctx.lineTo(t.tx + (i + 1) * (t.tw / stripes) - 3, t.ty + 12);
      ctx.lineTo(t.tx + i * (t.tw / stripes) + 3, t.ty + 12);
      ctx.closePath();
      ctx.fill();
    }
    // Стол с товаром
    ctx.fillStyle = '#5a3a1a';
    ctx.fillRect(t.tx + 4, t.ty + 12, t.tw - 8, t.th - 12);
    // Товары (мелкие точки)
    for (let i = 0; i < 4; i++) {
      ctx.fillStyle = pick(['#e85050', '#f0c040', '#4aa050', '#6080e8']);
      ctx.fillRect(t.tx + 10 + i * 8, t.ty + 20, 5, 5);
    }
  }
  // Вывеска "РАСПРОДАЖА"
  ctx.fillStyle = '#f0c040';
  ctx.fillRect(x + 10, y - 5, w - 20, 12);
  ctx.fillStyle = '#5a2a1a';
  ctx.font = 'bold 9px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('БАРАХОЛКА', x + w/2, y + 4);
}

// --- Кафе (с зонтиками) ---
function drawCafe(ctx, x, y, w, h) {
  drawHouseBase(ctx, x, y, w, h, '#c88050', '#4a2a1a');
  // Большое окно
  ctx.fillStyle = 'rgba(255, 220, 150, 0.7)';
  ctx.fillRect(x + 12, y + 22, w - 24, 30);
  ctx.strokeStyle = '#3a1a0a';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 12, y + 22, w - 24, 30);
  // Зонтик у входа
  ctx.fillStyle = '#e85050';
  ctx.beginPath();
  ctx.arc(x + w + 10, y + h + 5, 22, Math.PI, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f0e0c0';
  ctx.beginPath();
  ctx.moveTo(x + w + 10, y + h - 17);
  ctx.lineTo(x + w + 10, y + h + 5);
  ctx.lineTo(x + w + 32, y + h + 5);
  ctx.closePath();
  ctx.fill();
  // Дверь
  ctx.fillStyle = '#3a1a0a';
  ctx.fillRect(x + w/2 - 8, y + h - 20, 16, 20);
  // Чашка над дверью
  ctx.font = '14px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('☕', x + w/2, y + 15);
}

// --- Ночлежка (обшарпанная, старая) ---
function drawHostel(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.fillRect(x + 6, y + 6, w, h);
  // Стена с потёками
  ctx.fillStyle = '#6a5a4a';
  ctx.fillRect(x, y, w, h);
  // Потёки
  ctx.fillStyle = 'rgba(40,30,20,0.5)';
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(x + 10 + Math.random() * (w - 20), y + h * 0.3, 3, 20 + Math.random()*30);
  }
  // Покатая крыша с загибом
  ctx.fillStyle = '#4a3a2a';
  ctx.beginPath();
  ctx.moveTo(x - 6, y + 3);
  ctx.lineTo(x + 15, y - 18);
  ctx.lineTo(x + w - 10, y - 15);
  ctx.lineTo(x + w + 6, y + 3);
  ctx.closePath();
  ctx.fill();
  // Забитые окна (доски)
  for (let i = 0; i < 3; i++) {
    const wx = x + 15 + i * 30;
    const wy = y + 20;
    ctx.fillStyle = '#2a1a10';
    ctx.fillRect(wx, wy, 20, 22);
    ctx.strokeStyle = '#5a3a2a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(wx, wy + 6); ctx.lineTo(wx + 20, wy + 16);
    ctx.moveTo(wx, wy + 16); ctx.lineTo(wx + 20, wy + 6);
    ctx.stroke();
  }
  // Дверь, покосившаяся
  ctx.fillStyle = '#3a2a1a';
  ctx.fillRect(x + w/2 - 10, y + h - 22, 20, 22);
  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + w/2 - 10, y + h - 22, 20, 22);
  // Дымок из трубы
  ctx.fillStyle = '#3a2a1a';
  ctx.fillRect(x + w - 25, y - 25, 10, 15);
  ctx.fillStyle = 'rgba(200,200,200,0.3)';
  ctx.beginPath(); ctx.arc(x + w - 20, y - 35, 8, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + w - 12, y - 45, 10, 0, Math.PI*2); ctx.fill();
}

// --- Автосалон ---
function drawDealership(ctx, x, y, w, h) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(x + 8, y + 8, w, h);
  // Большая стеклянная витрина
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, '#7ab8e8');
  grad.addColorStop(1, '#3a7aa8');
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);
  // Рамы
  ctx.strokeStyle = '#2a3a4a';
  ctx.lineWidth = 3;
  for (let i = 1; i < 4; i++) {
    ctx.beginPath();
    ctx.moveTo(x + i * (w/4), y);
    ctx.lineTo(x + i * (w/4), y + h);
    ctx.stroke();
  }
  // Плоская крыша
  ctx.fillStyle = '#2a3a4a';
  ctx.fillRect(x - 6, y - 10, w + 12, 12);
  // Вывеска
  ctx.fillStyle = '#e85050';
  ctx.fillRect(x + 20, y - 25, w - 40, 15);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('АВТО', x + w/2, y - 14);
  // Машины перед салоном
  drawCar(ctx, x + 20, y + h + 15, '#e85050');
  drawCar(ctx, x + 90, y + h + 15, '#3a6ae8');
}

function drawCar(ctx, x, y, color) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(x + 20, y + 15, 22, 5, 0, 0, Math.PI*2);
  ctx.fill();
  // Кузов
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + 8);
  ctx.lineTo(x + 5, y);
  ctx.lineTo(x + 15, y - 4);
  ctx.lineTo(x + 28, y - 4);
  ctx.lineTo(x + 38, y);
  ctx.lineTo(x + 42, y + 8);
  ctx.closePath();
  ctx.fill();
  // Окна
  ctx.fillStyle = 'rgba(200,220,255,0.7)';
  ctx.fillRect(x + 10, y, 8, 5);
  ctx.fillRect(x + 22, y, 8, 5);
  // Колёса
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath(); ctx.arc(x + 10, y + 10, 4, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(x + 32, y + 10, 4, 0, Math.PI*2); ctx.fill();
}

// --- Куча мусора (для мусорки) ---
function drawDumpHeap(ctx, x, y) {
  // Тень
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.beginPath(); ctx.ellipse(x + 40, y + 32, 45, 12, 0, 0, Math.PI*2); ctx.fill();
  // Мусорные баки
  for (let i = 0; i < 2; i++) {
    const bx = x + i * 45;
    // Бак
    ctx.fillStyle = '#4a5a3a';
    ctx.fillRect(bx, y + 8, 30, 25);
    // Крышка
    ctx.fillStyle = '#3a4a2a';
    ctx.fillRect(bx - 2, y + 5, 34, 6);
    // Ручка
    ctx.fillRect(bx + 10, y + 2, 10, 3);
    // Полоски
    ctx.fillStyle = '#2a3a1a';
    ctx.fillRect(bx + 10, y + 12, 3, 18);
    ctx.fillRect(bx + 17, y + 12, 3, 18);
  }
  // Куча мусора рядом
  ctx.fillStyle = '#6a5a4a';
  ctx.beginPath();
  ctx.moveTo(x + 75, y + 30);
  ctx.quadraticCurveTo(x + 95, y + 5, x + 115, y + 30);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#8a7a5a';
  ctx.beginPath();
  ctx.moveTo(x + 85, y + 25);
  ctx.quadraticCurveTo(x + 95, y + 12, x + 105, y + 25);
  ctx.closePath();
  ctx.fill();
  // Пакеты
  ctx.fillStyle = '#3a4a5a';
  ctx.beginPath(); ctx.arc(x + 90, y + 22, 6, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#5a4a3a';
  ctx.beginPath(); ctx.arc(x + 82, y + 28, 5, 0, Math.PI*2); ctx.fill();
}

// ═══════════════ РЕНДЕР ИКОНОК ЛОКАЦИЙ ═══════════════
function renderMapLocations() {
  const container = document.getElementById('mapLocations');
  const canvas = document.getElementById('mapCanvas');
  const viewport = canvas.parentElement;
  
  // Получаем реальный видимый прямоугольник canvas (object-fit: contain)
  const rect = canvas.getBoundingClientRect();
  const vpRect = viewport.getBoundingClientRect();
  
  // Позиция canvas внутри viewport (может быть offset из-за letterboxing)
  const offsetX = rect.left - vpRect.left;
  const offsetY = rect.top - vpRect.top;
  
  container.innerHTML = '';
  
  for (const [id, loc] of Object.entries(LOCATIONS)) {
    const pos = MAP_POS[id];
    if (!pos) continue;
    
    // Процент внутри canvas
    const leftPct = (pos.x / 1200) * 100;
    const topPct = (pos.y / 800) * 100;
    
    const btn = document.createElement('button');
    btn.className = 'loc-btn';
    btn.style.left = `calc(${offsetX}px + ${leftPct}% * ${rect.width / vpRect.width})`;
    btn.style.top = `calc(${offsetY}px + ${topPct}% * ${rect.height / vpRect.height})`;
    
    // Проще: позиционируем в процентах от canvas, но canvas — object-fit contain
    // Тогда ставим в пикселях относительно viewport
    btn.style.left = (offsetX + rect.width * (pos.x / 1200)) + 'px';
    btn.style.top = (offsetY + rect.height * (pos.y / 800)) + 'px';
    
    let fillHtml = '';
    if (loc.type === 'dump' && loc.dumpId) {
      const fill = S.dumps[loc.dumpId] ?? 100;
      const cls = fill < 25 ? 'low' : fill < 60 ? 'mid' : '';
      fillHtml = `<div class="loc-fill"><div class="loc-fill-bar ${cls}" style="width:${fill}%"></div></div>`;
    }
    
    btn.innerHTML = `
      <span class="loc-emoji">${loc.emoji}</span>
      <span class="loc-name">${loc.name}</span>
      ${fillHtml}
    `;
    btn.onclick = () => travelTo(id);
    container.appendChild(btn);
  }
  
  // Позиция игрока
  updatePlayerPosition();
}

function updatePlayerPosition() {
  const player = document.getElementById('mapPlayer');
  const canvas = document.getElementById('mapCanvas');
  const viewport = canvas.parentElement;
  const rect = canvas.getBoundingClientRect();
  const vpRect = viewport.getBoundingClientRect();
  const offsetX = rect.left - vpRect.left;
  const offsetY = rect.top - vpRect.top;
  
  const pos = MAP_POS[S.currentLocation] || MAP_POS.street;
  player.style.transition = 'none';
  player.style.left = (offsetX + rect.width * (pos.x / 1200)) + 'px';
  player.style.top = (offsetY + rect.height * (pos.y / 800)) + 'px';
  player.textContent = '🧍';
  void player.offsetWidth;
  player.style.transition = 'left 2s ease-in-out, top 2s ease-in-out';
}

// ═══════════════ ПЕРЕДВИЖЕНИЕ ═══════════════
function travelTo(id) {
  if (!S || S.traveling) return;
  if (S.currentLocation === id) { openLocation(id); return; }
  
  S.traveling = true;
  playSound('click');
  
  const canvas = document.getElementById('mapCanvas');
  const viewport = canvas.parentElement;
  const rect = canvas.getBoundingClientRect();
  const vpRect = viewport.getBoundingClientRect();
  const offsetX = rect.left - vpRect.left;
  const offsetY = rect.top - vpRect.top;
  
  const player = document.getElementById('mapPlayer');
  player.classList.remove('hidden');
  player.textContent = '🏃';
  
  const from = MAP_POS[S.currentLocation] || MAP_POS.street;
  const to = MAP_POS[id];
  
  player.style.transition = 'none';
  player.style.left = (offsetX + rect.width * (from.x / 1200)) + 'px';
  player.style.top = (offsetY + rect.height * (from.y / 800)) + 'px';
  void player.offsetWidth;
  
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const speed = TRANSPORTS[S.transport].speed;
  const duration = clamp(dist * 3 / speed, 800, 2500);
  
  player.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
  player.style.left = (offsetX + rect.width * (to.x / 1200)) + 'px';
  player.style.top = (offsetY + rect.height * (to.y / 800)) + 'px';
  
  setTimeout(() => {
    S.currentLocation = id;
    S.traveling = false;
    player.textContent = '🧍';
    S.energy = clamp(S.energy - 3, 0, 100);
    
    if (LOCATIONS[id].type === 'dump' && LOCATIONS[id].dumpId) {
      if (!S.visitedDumps.includes(LOCATIONS[id].dumpId)) S.visitedDumps.push(LOCATIONS[id].dumpId);
    }
    
    openLocation(id);
    renderHUD();
    updateTutorial();
    save();
  }, duration);
}

// ═══════════════ МОДАЛКИ ═══════════════
function openModal(title, bodyHtml, footerHtml) {
  closeModal(title);
  const root = document.getElementById('modalRoot');
  const modal = document.createElement('div');
  modal.className = 'modal-overlay open';
  modal.dataset.id = title;
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h3>${title}</h3>
        <button class="modal-close" onclick="closeModal('${title}')">×</button>
      </div>
      <div class="modal-body">${bodyHtml}</div>
      ${footerHtml ? `<div class="modal-footer">${footerHtml}</div>` : ''}
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

// ═══════════════ ПАНЕЛЬ ЛОКАЦИИ ═══════════════
function openLocation(id) {
  const loc = LOCATIONS[id];
  let html = `<p style="color:#888;margin-bottom:12px;">${loc.desc}</p>`;
  let actions = [];
  
  switch (loc.type) {
    case 'street':
      actions = [
        { label: '🙏 Попрошайничать', cb: () => begMoney() },
        { label: '🪟 Помыть окна (+5₽)', cb: () => washWindows() },
      ];
      break;
    case 'dump':
      const fill = S.dumps[loc.dumpId] || 0;
      html += `<p>Наполненность: <strong style="color:${fill<25?'var(--red)':fill<60?'var(--gold)':'var(--green)'}">${fill}%</strong></p>`;
      if (fill < 15) html += `<p style="color:var(--red)">Мусорка пуста. Подожди следующий день.</p>`;
      actions = [{ label: `🕵️ Копаться (−10⚡)`, cb: () => startDig(loc.dumpId), disabled: fill < 15 || S.energy < 10 }];
      break;
    case 'shop':
      actions = [
        { label: '🍞 Продукты', cb: () => openShop('food') },
        { label: '👕 Одежда', cb: () => openShop('cloth') },
      ];
      break;
    case 'flea':
      actions = [{ label: '💰 Продать хлам', cb: () => openFlea() }];
      break;
    case 'school':
    case 'college':
    case 'university':
      actions = [{ label: `🎓 Сдать экзамен`, cb: () => takeExam(loc.type) }];
      break;
    case 'factory':
      Object.entries(JOBS).filter(([id, j]) => j.pay < 1500).forEach(([id, j]) => {
        const ok = S.energy >= j.energy && S.educationLevel >= j.reqEdu && S.reputation >= j.reqRep;
        actions.push({ label: `💼 ${j.name} (${j.pay}₽)`, cb: () => doWork(id), disabled: !ok });
      });
      break;
    case 'office':
      Object.entries(JOBS).filter(([id, j]) => j.pay >= 1500).forEach(([id, j]) => {
        const ok = S.energy >= j.energy && S.educationLevel >= j.reqEdu && S.reputation >= j.reqRep;
        actions.push({ label: `💼 ${j.name} (${j.pay}₽)`, cb: () => doWork(id), disabled: !ok });
      });
      break;
    case 'cafe':
      actions = [
        { label: '🍲 Купить суп (150₽)', cb: () => buyItem('soup') },
        { label: '🥗 Купить салат (200₽)', cb: () => buyItem('salad') },
        { label: '☕ Отдохнуть (100₽)', cb: () => restCafe() },
      ];
      break;
    case 'bank':
      actions = [{ label: '💳 Сделать вклад', cb: () => openBank() }];
      break;
    case 'housing':
      actions = [
        { label: '🏠 Снять жильё', cb: () => openHousing() },
        { label: '💤 Поспать', cb: () => sleepNow() },
      ];
      break;
    case 'park':
      actions = [
        { label: '🚶 Погулять (+10⚡)', cb: () => walkPark() },
        { label: '🕵️ Копаться в урнах', cb: () => startDig('dump2') },
      ];
      break;
    case 'transport':
      actions = [{ label: '🚗 Купить транспорт', cb: () => openTransport() }];
      break;
    case 'business':
      actions = [{ label: '📊 Открыть бизнес', cb: () => openBusiness() }];
      break;
  }
  
  for (const a of actions) {
    html += `<button class="btn btn-primary" style="width:100%;margin-top:8px;${a.disabled ? 'opacity:0.4;pointer-events:none;' : ''}" data-cb="${actions.indexOf(a)}">${a.label}</button>`;
  }
  
  const modal = openModal(loc.emoji + ' ' + loc.name, html);
  
  // Привязка кнопок
  modal.querySelectorAll('.modal-body [data-cb]').forEach(btn => {
    const idx = parseInt(btn.dataset.cb);
    btn.onclick = () => {
      playSound('click');
      closeModal(loc.emoji + ' ' + loc.name);
      actions[idx].cb();
    };
  });
}

// ═══════════════ ДЕЙСТВИЯ ═══════════════
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
  toast('Прогулка +10⚡', 'success');
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
  S.currentJob = id;
  toast(`Зарплата +${job.pay} ₽`, 'success');
  playSound('coin');
  renderHUD(); updateTutorial(); save();
}

function takeExam(type) {
  const edu = EDUCATION[type];
  if (S.educationLevel < edu.reqEdu) { toast('Сначала предыдущая ступень', 'error'); return; }
  if (S.money < edu.cost) { toast('Не хватает денег', 'error'); return; }
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
    const isCurrent = S.housing === id;
    html += `<div class="list-row">
      <div class="ico-big">🏠</div>
      <div class="info"><div class="name">${h.name}${isCurrent ? ' (текущее)' : ''}</div><div class="desc">${h.desc}${h.rent ? ' · ' + fmt(h.rent) + '₽/день' : ''}</div></div>
      <button class="btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}" style="padding:6px 12px;font-size:12px" onclick="setHousing('${id}')" ${isCurrent ? 'disabled' : ''}>${isCurrent ? '✓' : 'Выбрать'}</button>
    </div>`;
  }
  openModal('🏠 Жильё', html);
}
window.setHousing = (id) => {
  const h = HOUSINGS[id];
  if (h.cost > 0 && S.money < h.cost) { toast('Мало денег', 'error'); return; }
  S.money -= h.cost;
  S.housing = id;
  toast('Переезд: ' + h.name, 'success');
  closeModal('🏠 Жильё');
  renderHUD(); save();
};

function openTransport() {
  let html = '';
  for (const [id, t] of Object.entries(TRANSPORTS)) {
    const isCurrent = S.transport === id;
    html += `<div class="list-row">
      <div class="ico-big">🚗</div>
      <div class="info"><div class="name">${t.name}${isCurrent ? ' (текущий)' : ''}</div><div class="desc">Скорость ×${t.speed}</div></div>
      <button class="btn ${isCurrent ? 'btn-secondary' : 'btn-primary'}" style="padding:6px 12px;font-size:12px" onclick="setTransport('${id}')" ${isCurrent ? 'disabled' : ''}>${isCurrent ? '✓' : 'Купить'}</button>
    </div>`;
  }
  openModal('🚗 Транспорт', html);
}
window.setTransport = (id) => {
  const t = TRANSPORTS[id];
  if (S.money < t.cost) { toast('Мало денег', 'error'); return; }
  S.money -= t.cost;
  S.transport = id;
  toast('Куплено: ' + t.name, 'success');
  closeModal('🚗 Транспорт');
  renderHUD(); save();
};

function openBusiness() {
  openModal('📊 Бизнес', '<p style="color:#888;">Открытие бизнеса доступно после вуза. Функция в разработке.</p>');
}
function openBank() {
  openModal('🏦 Банк', '<p style="color:#888;">Вклады появятся позже.</p>');
}

// ═══════════════ МАГАЗИН ═══════════════
function openShop(filter) {
  const goods = filter === 'cloth' 
    ? ['cap','jacket','jeans','sneakers','suitJacket','suitPants','dressShoes'] 
    : ['bread','water','soup','salad','shawarma','energy'];
  let html = '';
  for (const id of goods) {
    const it = ITEMS[id];
    const price = (it.price * (S.hour >= 18 || S.hour < 6 ? 1.3 : 1)) | 0;
    html += `<div class="list-row">
      <div class="ico-big">${it.emoji}</div>
      <div class="info"><div class="name">${it.name}</div><div class="desc">${fmt(price)} ₽${it.satiety ? ' · +' + it.satiety + '🍞' : ''}${it.energy ? ' · +' + it.energy + '⚡' : ''}${it.rep ? ' · +' + it.rep + '⭐' : ''}</div></div>
      <button class="btn btn-primary" style="padding:6px 12px;font-size:12px" onclick="buyItem('${id}')">Купить</button>
    </div>`;
  }
  openModal(filter === 'cloth' ? '👕 Одежда' : '🍞 Продукты', html);
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
  renderHUD(); save();
};

// ═══════════════ БАРАХОЛКА ═══════════════
function openFlea() {
  let html = '';
  for (const item of S.inventory) {
    const it = ITEMS[item.itemId];
    if (!it || it.price <= 0) continue;
    html += `<div class="list-row">
      <div class="ico-big">${it.emoji}</div>
      <div class="info"><div class="name">${it.name} ×${item.qty}</div><div class="desc">Продать за ${fmt(Math.round(it.price*0.6))} ₽</div></div>
      <button class="btn btn-secondary" style="padding:6px 12px;font-size:12px" onclick="sellItem('${item.itemId}')">Продать</button>
    </div>`;
  }
  if (!html) html = '<p style="text-align:center;color:#888;padding:20px;">Нечего продавать. Иди копаться на мусорку!</p>';
  openModal('🏪 Барахолка', html);
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
  closeModal('🏪 Барахолка');
  openFlea();
  save();
};

// ═══════════════ МИНИ-ИГРА КОПАНИЯ ═══════════════
function startDig(dumpId) {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  const fill = S.dumps[dumpId] || 0;
  if (fill < 15) { toast('Мусорка пуста', 'error'); return; }
  
  const modal = openModal('🕵️ Копание', `
    <canvas id="mgCanvas" width="400" height="200"></canvas>
    <p style="text-align:center;font-size:12px;margin-top:8px;color:#888;">Тапни, когда полоска в зелёной зоне!</p>
    <p style="text-align:center;font-size:11px;margin-top:4px;color:var(--red);">Красная зона = порез (−3 HP)</p>
  `);
  
  const canvas = modal.querySelector('#mgCanvas');
  const ctx = canvas.getContext('2d');
  let pos = 50, dir = 1, speed = 5;
  let attempts = 4, hits = 0, running = true;
  
  const greenStart = 150, greenEnd = 240;
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
  
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!running) return;
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
      closeModal('🕵️ Копание');
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
    if (chance(0.6)) {
      const itemId = pick(['bottle','rag','scrap','thread']);
      const existing = loot.find(l => l.itemId === itemId);
      if (existing) existing.qty++;
      else loot.push({ itemId, qty: 1 });
    } else if (chance(0.3)) {
      const itemId = pick(['wire','watch','book','phoneBroken']);
      loot.push({ itemId, qty: 1 });
    }
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
    const grid = loot.map((l, i) => {
      const it = ITEMS[l.itemId];
      return `<div class="loot-item ${selected[i] ? 'selected' : 'deselected'}" data-idx="${i}">
        <div class="ico">${it.emoji}</div>
        ${l.qty > 1 ? `<span class="loot-qty">×${l.qty}</span>` : ''}
        <div class="loot-name">${it.name}</div>
      </div>`;
    }).join('');
    
    const modal = openModal('🔍 Найдено!', `
      <p style="margin-bottom:8px;">Выбери, что забрать:</p>
      <div class="loot-grid">${grid}</div>
    `, `<button class="btn btn-primary" id="lootConfirm">Забрать выбранное</button>
        <button class="btn btn-secondary" id="lootCancel">Оставить всё</button>`);
    
    modal.querySelectorAll('.loot-item').forEach(el => {
      el.onclick = () => {
        const i = parseInt(el.dataset.idx);
        selected[i] = !selected[i];
        closeModal('🔍 Найдено!');
        render();
      };
    });
    modal.querySelector('#lootConfirm').onclick = () => {
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
      closeModal('🔍 Найдено!');
      renderHUD();
      updateTutorial();
      save();
    };
    modal.querySelector('#lootCancel').onclick = () => closeModal('🔍 Найдено!');
  }
  
  render();
}

// ═══════════════ ИНВЕНТАРЬ ═══════════════
function openInventory() {
  let html = '<div class="inv-grid">';
  for (const item of S.inventory) {
    const it = ITEMS[item.itemId];
    html += `<div class="inv-item" onclick="useItem('${item.itemId}')">
      <div class="ico">${it.emoji}</div>
      ${item.qty > 1 ? `<span class="qty">${item.qty}</span>` : ''}
    </div>`;
  }
  html += '</div>';
  if (S.inventory.length === 0) html = '<p style="text-align:center;color:#888;padding:20px;">Инвентарь пуст.</p>';
  openModal('🎒 Инвентарь', html + '<p style="color:#888;font-size:11px;margin-top:8px;">Нажми на предмет, чтобы использовать или надеть. Продать можно на 🏪 Барахолке.</p>');
}

window.useItem = (id) => {
  const it = ITEMS[id];
  const idx = S.inventory.findIndex(x => x.itemId === id);
  if (idx === -1) return;
  
  if (it.type === 'food') {
    S.inventory[idx].qty--;
    if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
    S.satiety = clamp(S.satiety + (it.satiety || 0), 0, 100);
    if (it.health) S.health = clamp(S.health + it.health, 0, 100);
    if (it.energy) S.energy = clamp(S.energy + it.energy, 0, 100);
    toast('Съедено: ' + it.name, 'success');
    playSound('coin');
    renderHUD(); updateTutorial(); save();
    closeModal('🎒 Инвентарь');
    openInventory();
  } else if (it.type === 'cloth') {
    S.inventory[idx].qty--;
    if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
    S.equipment[it.slot] = { itemId: id, condition: 100 };
    toast('Надето: ' + it.name, 'success');
    renderHUD(); save();
    closeModal('🎒 Инвентарь');
    openInventory();
  } else {
    toast('Этот предмет нельзя использовать', 'info');
  }
};

// ═══════════════ ПЕРСОНАЖ / КВЕСТЫ / НАСТРОЙКИ ═══════════════
function openCharacter() {
  const eq = S.equipment;
  const eqList = [];
  for (const slot of ['head','body','legs','shoes','accessory']) {
    const e = eq[slot];
    if (e) eqList.push(`${ITEMS[e.itemId].emoji} ${ITEMS[e.itemId].name} (${e.condition}%)`);
  }
  openModal('👤 Персонаж', `
    <p><strong>Репутация:</strong> ${Math.round(S.reputation)}/100</p>
    <p><strong>Образование:</strong> ${S.educationLevel > 0 ? 'уровень ' + S.educationLevel : 'нет'}</p>
    <p><strong>Жильё:</strong> ${HOUSINGS[S.housing].name}</p>
    <p><strong>Транспорт:</strong> ${TRANSPORTS[S.transport].name}</p>
    <p><strong>Работа:</strong> ${S.currentJob ? JOBS[S.currentJob].name : 'нет'}</p>
    <hr style="border-color:rgba(255,255,255,0.1);margin:10px 0;">
    <p><strong>Экипировка:</strong></p>
    ${eqList.length ? eqList.map(l => `<div>${l}</div>`).join('') : '<p style="color:#888;">Пусто</p>'}
  `);
}

function openQuests() {
  openModal('📜 Квесты', '<p style="color:#888;">Следуй подсказкам обучения внизу.</p>');
}

function openSettings() {
  openModal('⚙️ Настройки', `
    <p>Игра: Из грязи в князи v4.0</p>
    <p>Сохранение: авто каждые 30 сек</p>
    <button class="btn btn-danger" style="width:100%;margin-top:16px;" onclick="if(confirm('Сбросить прогресс?')){localStorage.removeItem('${SAVE_KEY}');location.reload();}">Сбросить прогресс</button>
  `);
}

// ═══════════════ ТУТОРИАЛ ═══════════════
const TUTORIAL = [
  { text: 'Ты на улице. Кликни на 🗑️ Мусорку на карте.', check: () => S.visitedDumps.length > 0 },
  { text: 'На мусорке нажми «Копаться» и пройди мини-игру.', check: () => (S.totalFound || 0) > 0 },
  { text: 'Отлично! Иди на 🏪 Барахолку и продай хлам.', check: () => (S.totalEarned || 0) > 0 },
  { text: 'Ты голоден! Купи еду в 🛒 Магазине и съешь её (в Сумке).', check: () => S.satiety > 60 && S.totalEarned > 0 },
  { text: 'Найди работу на 🏭 Заводе, чтобы зарабатывать.', check: () => S.currentJob !== null },
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

// ═══════════════ СТАРТ ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  // Иконки HUD
  document.getElementById('icoSatiety').innerHTML = SVG.satiety;
  document.getElementById('icoHealth').innerHTML = SVG.health;
  document.getElementById('icoEnergy').innerHTML = SVG.energy;
  document.getElementById('icoHygiene').innerHTML = SVG.hygiene;
  document.getElementById('icoRep').innerHTML = SVG.rep;
  
  document.getElementById('btnNewGame').onclick = () => {
    S = createState();
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
    initAudio();
    startGame();
  };
  
  const saved = load();
  if (saved) {
    document.getElementById('btnContinue').style.display = 'inline-flex';
    document.getElementById('btnContinue').onclick = () => {
      S = saved;
      if (!S.visitedDumps) S.visitedDumps = [];
      if (S.totalFound === undefined) S.totalFound = 0;
      if (S.totalEarned === undefined) S.totalEarned = 0;
      if (S.tutorialStep === undefined) S.tutorialStep = 0;
      document.getElementById('startScreen').classList.add('hidden');
      document.getElementById('game').classList.remove('hidden');
      initAudio();
      startGame();
    };
  }
  
  // Навигация
  document.getElementById('navMap').onclick = () => { playSound('click'); renderMapLocations(); };
  document.getElementById('navInv').onclick = () => { playSound('click'); openInventory(); };
  document.getElementById('navChar').onclick = () => { playSound('click'); openCharacter(); };
  document.getElementById('navQuests').onclick = () => { playSound('click'); openQuests(); };
  document.getElementById('navSettings').onclick = () => { playSound('click'); openSettings(); };
  document.getElementById('tutClose').onclick = () => { document.getElementById('tutorialToast').classList.add('hidden'); };
});

function startGame() {
  renderHUD();
  drawMap();
  renderMapLocations();
  updateTutorial();
  
  // Перерисовка позиций при resize
  window.addEventListener('resize', () => {
    if (S) renderMapLocations();
  });
  
  // Игровой цикл
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (!S || S.sleeping) return;
    S.gameMinute++;
    
    // Ночь медленно
    S.satiety = clamp(S.satiety - 0.05, 0, 100);
    S.hygiene = clamp(S.hygiene - 0.03, 0, 100);
    if (S.energy > 0) S.energy = clamp(S.energy - 0.08, 0, 100);
    if (S.satiety < 20) S.health = clamp(S.health - 0.1, 0, 100);
    if (S.health <= 0) { S.health = 40; S.money = Math.floor(S.money * 0.7); toast('Вы потеряли сознание...', 'error'); }
    
    // Новый день
    const newDay = Math.floor(S.gameMinute / (60 * 24)) + 1;
    if (newDay !== S.day) {
      S.day = newDay;
      for (const k of Object.keys(S.dumps)) {
        S.dumps[k] = clamp(S.dumps[k] + 25, 0, 100);
      }
      renderMapLocations();
    }
    
    renderHUD();
    updateTutorial();
  }, 1000);
  
  setInterval(save, 30000);
  save();
}
