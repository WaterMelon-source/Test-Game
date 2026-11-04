'use strict';

// ==================== SVG ДЛЯ HUD ====================
const SVG = {
  satiety: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"><path d="M17 8h1a3 3 0 0 1 0 6h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z"/><path d="M6 2v3M10 2v3M14 2v3"/></svg>',
  health: '<svg viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  energy: '<svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  hygiene: '<svg viewBox="0 0 24 24" fill="none" stroke="#22d3ee" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
  rep: '<svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  sun: '<svg viewBox="0 0 24 24" fill="none" stroke="#fcd34d" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="#818cf8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
};

// ==================== ЛОКАЦИИ (Позиции в % от картинки) ====================
const LOCATIONS = {
  street:     { name: 'Улица',           emoji: '🛣️', type: 'street',     desc: 'Прохожие спешат мимо. Холодно и сыро.' },
  dump1:      { name: 'Мусорка',         emoji: '🗑️', type: 'dump',       desc: 'Пахнет не очень, но можно найти что-то ценное.', dumpId: 'dump1' },
  dump2:      { name: 'Мусорка',         emoji: '🗑️', type: 'dump',       desc: 'Возле жилых домов. Много хлама.', dumpId: 'dump2' },
  dump3:      { name: 'Свалка',          emoji: '🗑️', type: 'dump',       desc: 'Огромная куча мусора. Есть всё.', dumpId: 'dump3' },
  dump4:      { name: 'Мусорка',         emoji: '🗑️', type: 'dump',       desc: 'У дороги. Кто-то уже рылся.', dumpId: 'dump4' },
  shop:       { name: 'Продукты',        emoji: '🛒', type: 'shop',       desc: 'Продукты и одежда. Цены кусаются.' },
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
  pond_big:   { name: 'Большой пруд',    emoji: '🎣', type: 'pond',       desc: 'Можно поймать рыбу на ужин.' },
  pond_small: { name: 'Малый пруд',      emoji: '🎣', type: 'pond',       desc: 'Тихое место для рыбалки.' },
};

// Координаты в процентах (x, y) относительно картинки map.png
const MAP_POS = {
  street:     { x: 50, y: 52 },
  dump1:      { x: 33, y: 72 },
  dump2:      { x: 82, y: 65 },
  dump3:      { x: 25, y: 88 },
  dump4:      { x: 92, y: 85 },
  shop:       { x: 57, y: 56 }, // Продуктовые
  flea:       { x: 75, y: 42 }, // Барахолка
  school:     { x: 17, y: 48 },
  college:    { x: 14, y: 26 },
  university: { x: 32, y: 34 },
  factory:    { x: 51, y: 14 },
  office:     { x: 60, y: 30 },
  cafe:       { x: 69, y: 56 },
  bank:       { x: 63, y: 43 },
  shelter:    { x: 15, y: 72 },
  park:       { x: 15, y: 13 }, // Северный парк
  dealership: { x: 73, y: 17 },
  business:   { x: 48, y: 33 },
  pond_big:   { x: 14, y: 82 },
  pond_small: { x: 49, y: 83 },
};

// ==================== ПРЕДМЕТЫ ====================
const ITEMS = {
  bottle:      { name: 'Бутылка',           emoji: '🍾', type: 'material', price: 8, desc: 'Можно сдать на переработку.' },
  rag:         { name: 'Тряпка',            emoji: '🧻', type: 'material', price: 6, desc: 'Пригодится в крафте.' },
  thread:      { name: 'Нитки',             emoji: '🧵', type: 'material', price: 12, desc: 'Для шитья.' },
  wire:        { name: 'Проволока',         emoji: '🔗', type: 'material', price: 18, desc: 'Гибкий металл.' },
  scrap:       { name: 'Металлолом',        emoji: '⚙️', type: 'material', price: 15, desc: 'Тяжёлый кусок металла.' },
  phoneBroken: { name: 'Сломанный телефон', emoji: '📱', type: 'valuable', price: 800, desc: 'Экран треснут, но, может, починится.' },
  watch:       { name: 'Часы',              emoji: '⌚', type: 'valuable', price: 1500, desc: 'Идут. Даже показывают время.' },
  book:        { name: 'Книга',             emoji: '📕', type: 'valuable', price: 250, desc: 'Кто-то её выбросил...' },
  screwdriver: { name: 'Отвёртка',          emoji: '🪛', type: 'tool',     price: 300, desc: 'Инструмент для починки.' },
  rawFish:     { name: 'Сырая рыба',        emoji: '🐟', type: 'food', price: 50, satiety: 10, health: -5, desc: 'Сырая. Лучше продать или приготовить.' },
  bread:       { name: 'Хлеб',              emoji: '🍞', type: 'food', price: 30, satiety: 18, health: -1, desc: 'Чёрствый, но съедобный.' },
  water:       { name: 'Вода',              emoji: '💧', type: 'food', price: 20, satiety: 8, health: 1, energy: 3, desc: 'Питьевая вода.' },
  soup:        { name: 'Суп',               emoji: '🍲', type: 'food', price: 150, satiety: 32, health: 5, desc: 'Горячий и сытный.' },
  salad:       { name: 'Салат',             emoji: '🥗', type: 'food', price: 200, satiety: 22, health: 10, desc: 'Свежие овощи.' },
  shawarma:    { name: 'Шаурма',            emoji: '🌯', type: 'food', price: 180, satiety: 38, health: -5, desc: 'Вкусно, но вредно.' },
  energy:      { name: 'Энергетик',         emoji: '🥤', type: 'food', price: 120, satiety: 0, health: -3, energy: 25, desc: 'Взбодрит.' },
  tornshirt:   { name: 'Рваная рубаха',     emoji: '👕', type: 'cloth', slot: 'body', price: 0, rep: 0, desc: 'Воняет и рваная.' },
  cap:         { name: 'Кепка',             emoji: '🧢', type: 'cloth', slot: 'head', price: 300, rep: 1, desc: 'Обычная кепка.' },
  jacket:      { name: 'Куртка',            emoji: '🧥', type: 'cloth', slot: 'body', price: 800, rep: 3, desc: 'Тёплая.' },
  jeans:       { name: 'Джинсы',            emoji: '👖', type: 'cloth', slot: 'legs', price: 1200, rep: 3, desc: 'Крепкие штаны.' },
  sneakers:    { name: 'Кроссовки',         emoji: '👟', type: 'cloth', slot: 'shoes', price: 2000, rep: 4, desc: 'Удобные для бега.' },
  suitJacket:  { name: 'Пиджак',            emoji: '🤵', type: 'cloth', slot: 'body', price: 8000, rep: 10, desc: 'Деловой стиль.' },
  suitPants:   { name: 'Брюки',             emoji: '👖', type: 'cloth', slot: 'legs', price: 6000, rep: 8, desc: 'Классические брюки.' },
  dressShoes:  { name: 'Туфли',             emoji: '👞', type: 'cloth', slot: 'shoes', price: 9000, rep: 10, desc: 'Кожаные.' },
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

// ==================== УТИЛИТЫ ====================
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const randInt = (a, b) => Math.floor(a + Math.random() * (b - a + 1));
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

// ==================== СОСТОЯНИЕ ====================
let S = null;
let tickTimer = null;
const SAVE_KEY = 'rags_to_riches_v5';

function createState() {
  return {
    money: 0, satiety: 60, health: 100, energy: 100, hygiene: 40, reputation: 10,
    day: 1, gameMinute: 8 * 60, currentLocation: 'street',
    inventory: [{ itemId: 'bottle', qty: 1 }, { itemId: 'rag', qty: 1 }],
    equipment: { head: null, body: { itemId: 'tornshirt', condition: 100 }, legs: null, shoes: null },
    dumps: { dump1: 100, dump2: 100, dump3: 100, dump4: 100 },
    housing: 'street', transport: 'walk',
    educationLevel: 0, specialty: null, currentJob: null,
    tutorialStep: 0, tutorialDone: false, totalFound: 0, totalEarned: 0,
    traveling: false, sleeping: false, visitedDumps: [],
  };
}

function save() { if (S) try { localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch(e) {} }
function load() { try { const d = localStorage.getItem(SAVE_KEY); return d ? JSON.parse(d) : null; } catch(e) { return null; } }

function getTimeOfDay() {
  const h = Math.floor(S.gameMinute / 60) % 24;
  if (h >= 6 && h < 10) return 'morning';
  if (h >= 10 && h < 18) return 'day';
  if (h >= 18 && h < 22) return 'evening';
  return 'night';
}

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
  if (overlay) overlay.className = 'time-overlay ' + tod;
}

// ==================== КАРТА ====================
function renderMapLocations() {
  const container = document.getElementById('mapLocations');
  const img = document.getElementById('mapImage');
  const wrapper = document.getElementById('mapWrapper');
  
  if (!img || !wrapper) return;
  
  // Ждем загрузки картинки
  if (!img.complete || img.naturalWidth === 0) {
    img.onload = renderMapLocations;
    return;
  }

  container.innerHTML = '';
  
  // Устанавливаем размер обертки равным размеру картинки
  wrapper.style.width = img.width + 'px';
  wrapper.style.height = img.height + 'px';

  for (const [id, loc] of Object.entries(LOCATIONS)) {
    const pos = MAP_POS[id];
    if (!pos) continue;
    
    const btn = document.createElement('button');
    btn.className = 'loc-btn';
    btn.style.left = pos.x + '%';
    btn.style.top = pos.y + '%';
    
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
  
  updatePlayerPosition();
}

function updatePlayerPosition() {
  const player = document.getElementById('mapPlayer');
  const pos = MAP_POS[S.currentLocation] || MAP_POS.street;
  player.style.transition = 'none';
  player.style.left = pos.x + '%';
  player.style.top = pos.y + '%';
  player.textContent = '🧍';
  void player.offsetWidth;
  player.style.transition = 'left 2s ease-in-out, top 2s ease-in-out';
}

function travelTo(id) {
  if (!S || S.traveling) return;
  if (S.currentLocation === id) { openLocation(id); return; }
  
  S.traveling = true;
  playSound('click');
  
  const player = document.getElementById('mapPlayer');
  player.classList.remove('hidden');
  player.textContent = '🏃';
  
  const from = MAP_POS[S.currentLocation] || MAP_POS.street;
  const to = MAP_POS[id];
  
  player.style.transition = 'none';
  player.style.left = from.x + '%';
  player.style.top = from.y + '%';
  void player.offsetWidth;
  
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const speed = TRANSPORTS[S.transport].speed;
  const duration = clamp(dist * 40 / speed, 800, 2500);
  
  player.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
  player.style.left = to.x + '%';
  player.style.top = to.y + '%';
  
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

// ==================== МОДАЛКИ ====================
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

// ==================== ПАНЕЛЬ ЛОКАЦИИ ====================
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
    case 'pond':
      actions = [{ label: `🎣 Рыбачить (−10⚡)`, cb: () => startFishing(), disabled: S.energy < 10 }];
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
      actions = [{ label: '🚶 Погулять (+10⚡)', cb: () => walkPark() }];
      break;
    case 'transport':
      actions = [{ label: '🚗 Купить транспорт', cb: () => openTransport() }];
      break;
    case 'business':
      actions = [{ label: '📊 Открыть бизнес', cb: () => openBusiness() }];
      break;
  }
  
  for (let i = 0; i < actions.length; i++) {
    html += `<button class="btn btn-primary" style="width:100%;margin-top:8px;${actions[i].disabled ? 'opacity:0.4;pointer-events:none;' : ''}" data-cb="${i}">${actions[i].label}</button>`;
  }
  
  const modal = openModal(loc.emoji + ' ' + loc.name, html);
  
  modal.querySelectorAll('.modal-body [data-cb]').forEach(btn => {
    const idx = parseInt(btn.dataset.cb);
    btn.onclick = () => {
      playSound('click');
      closeModal(loc.emoji + ' ' + loc.name);
      actions[idx].cb();
    };
  });
}

// ==================== ДЕЙСТВИЯ ====================
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

function openBusiness() { openModal('📊 Бизнес', '<p style="color:#888;">Появится позже.</p>'); }
function openBank() { openModal('🏦 Банк', '<p style="color:#888;">Вклады появятся позже.</p>'); }

// ==================== МАГАЗИН ====================
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

// ==================== БАРАХОЛКА ====================
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

// ==================== МИНИ-ИГРА: КОПАНИЕ ====================
function startDig(dumpId) {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  const fill = S.dumps[dumpId] || 0;
  if (fill < 15) { toast('Мусорка пуста', 'error'); return; }
  
  const modal = openModal('🕵️ Копание', `
    <canvas id="mgCanvas" width="400" height="200"></canvas>
    <p style="text-align:center;font-size:12px;margin-top:8px;color:#888;">Тапни, когда полоска в зелёной зоне!</p>
    <p style="text-align:center;font-size:11px;margin-top:4px;color:var(--red);">В красной зоне — порез (−3 HP)</p>
  `);
  
  const canvas = modal.querySelector('#mgCanvas');
  const ctx = canvas.getContext('2d');
  let pos = 50, dir = 1, speed = 8; // Высокая скорость
  let attempts = 4, hits = 0, running = true;
  
  // Большая красная зона
  const redStart = 120, redEnd = 320;
  // Маленькая зелёная зона внутри красной (рандомизируется при каждой попытке)
  let greenStart = 0, greenEnd = 0;
  const greenWidth = 40;
  
  function randomizeGreen() {
    greenStart = redStart + Math.random() * (redEnd - redStart - greenWidth);
    greenEnd = greenStart + greenWidth;
  }
  randomizeGreen();
  
  function draw() {
    if (!running) return;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, 400, 200);
    
    // Красная зона
    ctx.fillStyle = 'rgba(248, 113, 113, 0.25)';
    ctx.fillRect(redStart, 40, redEnd - redStart, 120);
    ctx.strokeStyle = '#f87171';
    ctx.lineWidth = 2;
    ctx.strokeRect(redStart, 40, redEnd - redStart, 120);
    
    // Зелёная зона (внутри красной)
    ctx.fillStyle = 'rgba(74, 222, 128, 0.5)';
    ctx.fillRect(greenStart, 40, greenWidth, 120);
    ctx.strokeStyle = '#4ade80';
    ctx.lineWidth = 2;
    ctx.strokeRect(greenStart, 40, greenWidth, 120);
    
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
    } else {
      randomizeGreen(); // Новая позиция для следующего раза
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

// ==================== МИНИ-ИГРА: РЫБАЛКА ====================
function startFishing() {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  
  const modal = openModal('🎣 Рыбалка', `
    <canvas id="mgCanvas" width="400" height="250"></canvas>
    <p style="text-align:center;font-size:12px;margin-top:8px;color:#888;">Кликни, чтобы подсечь рыбу!</p>
  `);
  
  const canvas = modal.querySelector('#mgCanvas');
  const ctx = canvas.getContext('2d');
  let frame = 0, running = true;
  let fishY = 100;
  let fishDir = 1;
  let barY = 50;
  let barDir = 1;
  
  // 3 попытки
  let attempts = 3, hits = 0;
  
  function draw() {
    if (!running) return;
    frame++;
    
    // Вода
    ctx.fillStyle = '#1a3a5a';
    ctx.fillRect(0, 0, 400, 250);
    
    // Пузырьки
    for (let i = 0; i < 10; i++) {
      const bx = (i * 40 + frame) % 400;
      const by = 250 - (frame + i * 30) % 250;
      ctx.fillStyle = 'rgba(150, 200, 255, 0.4)';
      ctx.beginPath(); ctx.arc(bx, by, 3, 0, Math.PI*2); ctx.fill();
    }
    
    // Рыба (движется вверх-вниз)
    fishY += fishDir * 3;
    if (fishY > 180 || fishY < 60) fishDir *= -1;
    
    ctx.font = '30px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🐟', 200, fishY);
    
    // Зона подсечки (подсвечивается)
    const catchZoneStart = fishY - 25;
    const catchZoneEnd = fishY + 25;
    ctx.fillStyle = 'rgba(74, 222, 128, 0.3)';
    ctx.fillRect(0, catchZoneStart, 400, 50);
    
    // Крючок (двигается сам по себе)
    barY += barDir * 6;
    if (barY > 230 || barY < 20) barDir *= -1;
    
    ctx.fillStyle = '#fcd34d';
    ctx.fillRect(10, barY - 2, 380, 4); // Леска
    ctx.font = '24px serif';
    ctx.fillText('🪝', 200, barY);
    
    // UI
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText('Попыток: ' + attempts, 10, 10);
    ctx.fillText('Поймано: ' + hits, 10, 30);
    
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);
  
  canvas.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    if (!running) return;
    attempts--;
    
    if (barY >= fishY - 25 && barY <= fishY + 25) {
      hits++;
      playSound('success');
    } else {
      playSound('fail');
    }
    
    if (attempts <= 0) {
      running = false;
      closeModal('🎣 Рыбалка');
      
      S.energy -= 10;
      S.hygiene = clamp(S.hygiene - 2, 0, 100);
      
      if (hits > 0) {
        const fishCount = hits;
        const existing = S.inventory.find(x => x.itemId === 'rawFish');
        if (existing) existing.qty += fishCount;
        else S.inventory.push({ itemId: 'rawFish', qty: fishCount });
        toast(`Поймано рыбы: ${fishCount}`, 'success');
        playSound('coin');
        S.totalFound = (S.totalFound || 0) + fishCount;
      } else {
        toast('Ничего не поймали...', 'info');
      }
      renderHUD();
      updateTutorial();
      save();
    }
  });
}

// ==================== ЛУТ ====================
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

// ==================== ИНВЕНТАРЬ ====================
function openInventory() {
  let html = '<div class="inv-grid">';
  for (const item of S.inventory) {
    const it = ITEMS[item.itemId];
    html += `<div class="inv-item" onclick="openItemInfo('${item.itemId}')">
      <div class="ico">${it.emoji}</div>
      ${item.qty > 1 ? `<span class="qty">${item.qty}</span>` : ''}
    </div>`;
  }
  html += '</div>';
  if (S.inventory.length === 0) html = '<p style="text-align:center;color:#888;padding:20px;">Инвентарь пуст.</p>';
  openModal('🎒 Инвентарь', html);
}

function openItemInfo(id) {
  const it = ITEMS[id];
  let actions = '';
  
  if (it.type === 'food') {
    actions += `<button class="btn btn-primary" onclick="useItem('${id}')">🍽️ Съесть</button>`;
  } else if (it.type === 'cloth') {
    actions += `<button class="btn btn-primary" onclick="useItem('${id}')">👕 Надеть</button>`;
  }
  
  const modal = openModal(`${it.emoji} ${it.name}`, `
    <p style="margin-bottom:12px;">${it.desc || 'Описание отсутствует.'}</p>
    <p><strong>Тип:</strong> ${it.type}</p>
    <p><strong>Цена:</strong> ${fmt(it.price)} ₽</p>
    ${it.satiety ? `<p><strong>Сытость:</strong> +${it.satiety}</p>` : ''}
    ${it.health ? `<p><strong>Здоровье:</strong> ${it.health > 0 ? '+' : ''}${it.health}</p>` : ''}
    ${it.energy ? `<p><strong>Энергия:</strong> +${it.energy}</p>` : ''}
    ${it.rep ? `<p><strong>Репутация:</strong> +${it.rep}</p>` : ''}
    <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap;">${actions}</div>
    <p style="color:#888;font-size:11px;margin-top:12px;">Продать можно на 🏪 Барахолке.</p>
  `);
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
    closeModal(it.emoji + ' ' + it.name);
    closeModal('🎒 Инвентарь');
    openInventory();
  } else if (it.type === 'cloth') {
    S.inventory[idx].qty--;
    if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
    S.equipment[it.slot] = { itemId: id, condition: 100 };
    toast('Надето: ' + it.name, 'success');
    renderHUD(); save();
    closeModal(it.emoji + ' ' + it.name);
    closeModal('🎒 Инвентарь');
    openInventory();
  }
};

// ==================== ТУТОРИАЛ ====================
const TUTORIAL = [
  { text: 'Ты на улице. Кликни на 🗑️ Мусорку на карте.', check: () => S.visitedDumps.length > 0 },
  { text: 'На мусорке нажми «Копаться» и пройди мини-игру.', check: () => (S.totalFound || 0) > 0 },
  { text: 'Отлично! Иди на 🏪 Барахолку и продай хлам.', check: () => (S.totalEarned || 0) > 0 },
  { text: 'Ты голоден! Купи еду в 🛒 Магазине и съешь её (в Сумке).', check: () => S.satiety > 60 && S.totalEarned > 0 },
  { text: 'Найди работу на 🏭 Заводе, чтобы зарабатывать.', check: () => S.currentJob !== null },
  { text: 'Обучение окончено! Дальше — твой путь.', check: () => false },
];

function updateTutorial() {
  if (!S || S.tutorialDone) return;
  const toastEl = document.getElementById('tutorialToast');
  const textEl = document.getElementById('tutText');
  
  while (S.tutorialStep < TUTORIAL.length) {
    const step = TUTORIAL[S.tutorialStep];
    if (step.check()) { S.tutorialStep++; continue; }
    textEl.textContent = step.text;
    toastEl.classList.remove('hidden');
    return;
  }
  
  // Если дошли до конца
  if (S.tutorialStep >= TUTORIAL.length) {
    S.tutorialDone = true;
    toastEl.classList.add('hidden');
  }
}

function skipTutorial() {
  S.tutorialDone = true;
  document.getElementById('tutorialToast').classList.add('hidden');
  toast('Обучение пропущено', 'info');
  save();
}

// ==================== ПЕРСОНАЖ / КВЕСТЫ / НАСТРОЙКИ ====================
function openCharacter() {
  const eq = S.equipment;
  const eqList = [];
  for (const slot of ['head','body','legs','shoes']) {
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
  openModal('📜 Квесты', '<p style="color:#888;">Следуй подсказкам обучения.</p>');
}

function openSettings() {
  openModal('⚙️ Настройки', `
    <p>Игра: Из грязи в князи v5.0</p>
    <button class="btn btn-danger" style="width:100%;margin-top:16px;" onclick="if(confirm('Сбросить прогресс?')){localStorage.removeItem('${SAVE_KEY}');location.reload();}">Сбросить прогресс</button>
  `);
}

// ==================== СТАРТ ====================
document.addEventListener('DOMContentLoaded', () => {
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
      if (S.tutorialDone === undefined) S.tutorialDone = false;
      document.getElementById('startScreen').classList.add('hidden');
      document.getElementById('game').classList.remove('hidden');
      initAudio();
      startGame();
    };
  }
  
  document.getElementById('navMap').onclick = () => { playSound('click'); };
  document.getElementById('navInv').onclick = () => { playSound('click'); openInventory(); };
  document.getElementById('navChar').onclick = () => { playSound('click'); openCharacter(); };
  document.getElementById('navQuests').onclick = () => { playSound('click'); openQuests(); };
  document.getElementById('navSettings').onclick = () => { playSound('click'); openSettings(); };
  
  document.getElementById('tutSkip').onclick = skipTutorial;
  document.getElementById('tutClose').onclick = () => { document.getElementById('tutorialToast').classList.add('hidden'); };
  
  window.addEventListener('resize', () => {
    if (S) renderMapLocations();
  });
});

function startGame() {
  renderHUD();
  renderMapLocations();
  updateTutorial();
  
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(() => {
    if (!S || S.sleeping) return;
    S.gameMinute++;
    
    S.satiety = clamp(S.satiety - 0.05, 0, 100);
    S.hygiene = clamp(S.hygiene - 0.03, 0, 100);
    if (S.energy > 0) S.energy = clamp(S.energy - 0.08, 0, 100);
    if (S.satiety < 20) S.health = clamp(S.health - 0.1, 0, 100);
    if (S.health <= 0) { S.health = 40; S.money = Math.floor(S.money * 0.7); toast('Вы потеряли сознание...', 'error'); }
    
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
