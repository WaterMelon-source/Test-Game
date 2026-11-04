'use strict';

// ═══════════════════════════════════════════════════════════════
//  «Из грязи в князи» — 2D RPG / life-sim
//  Один файл, чёткие блоки: КОНСТАНТЫ → СОСТОЯНИЕ → УТИЛИТЫ →
//  СОХРАНЕНИЯ → ЦИКЛ → РЕНДЕР → ЛОКАЦИИ → СИСТЕМЫ →
//  МИНИ-ИГРЫ → NPC → КВЕСТЫ → СТАРТ
// ═══════════════════════════════════════════════════════════════

// ─── КОНСТАНТЫ: ЛОКАЦИИ ───────────────────────────────────────
const LOCATIONS = {
  street:     { name: 'Улица',         emoji: '🛣️', x: 50, y: 50, type: 'street' },
  dump:       { name: 'Мусорка',       emoji: '🗑️', x: 68, y: 72, type: 'dig' },
  park:       { name: 'Парк',          emoji: '🌳', x: 32, y: 68, type: 'dig' },
  abandoned:  { name: 'Заброшка',      emoji: '🏚️', x: 84, y: 82, type: 'dig' },
  shop:       { name: 'Магазин',       emoji: '🛒', x: 42, y: 42, type: 'shop' },
  flea:       { name: 'Барахолка',     emoji: '🏪', x: 55, y: 55, type: 'flea' },
  school:     { name: 'Школа',         emoji: '🏫', x: 22, y: 32, type: 'school' },
  college:    { name: 'Колледж',       emoji: '🎓', x: 32, y: 22, type: 'college' },
  university: { name: 'Вуз',           emoji: '🏛️', x: 15, y: 14, type: 'university' },
  factory:    { name: 'Завод',         emoji: '🏭', x: 80, y: 38, type: 'factory' },
  office:     { name: 'Офис',          emoji: '🏢', x: 70, y: 22, type: 'office' },
  cafe:       { name: 'Кафе',          emoji: '☕', x: 52, y: 34, type: 'cafe' },
  bank:       { name: 'Банк',          emoji: '🏦', x: 63, y: 42, type: 'bank' },
  shelter:    { name: 'Ночлежка',      emoji: '🛏️', x: 20, y: 80, type: 'housing' },
  dealership: { name: 'Автосалон',     emoji: '🚗', x: 88, y: 28, type: 'transport' },
  business:   { name: 'Бизнес-центр',  emoji: '💼', x: 78, y: 12, type: 'business' },
};

// ─── КОНСТАНТЫ: ПРЕДМЕТЫ ──────────────────────────────────────
const ITEMS = {
  // материалы
  bottle:      { name:'Бутылка',           emoji:'🍾', type:'material', price: 8,    qty: true },
  rag:         { name:'Тряпка',            emoji:'🧻', type:'material', price: 6,    qty: true },
  thread:      { name:'Нитки',             emoji:'🧵', type:'material', price: 12,   qty: true },
  wire:        { name:'Проволока',         emoji:'🔗', type:'material', price: 18,   qty: true },
  scrap:       { name:'Металлолом',        emoji:'⚙️', type:'material', price: 15,   qty: true },
  patch:       { name:'Заплатка',          emoji:'🩹', type:'material', price: 40,   qty: true },
  // ценности
  phoneBroken: { name:'Сломанный телефон', emoji:'📱', type:'valuable', price: 800,  qty: true },
  phoneWorking:{ name:'Телефон',           emoji:'📱', type:'valuable', price: 2500, qty: true },
  watch:       { name:'Часы',              emoji:'⌚', type:'valuable', price: 1500, qty: true },
  necklace:    { name:'Украшение',         emoji:'📿', type:'valuable', price: 1200, qty: true },
  moonshine:   { name:'Самогон',           emoji:'🥃', type:'valuable', price: 250,  qty: true },
  book:        { name:'Книга',             emoji:'📕', type:'valuable', price: 250,  qty: true },
  screwdriver: { name:'Отвёртка',          emoji:'🪛', type:'tool',     price: 300,  qty: true },
  // еда
  bread:       { name:'Хлеб',              emoji:'🍞', type:'food', price: 30, satiety: 18, health: -1 },
  water:       { name:'Вода',              emoji:'💧', type:'food', price: 20, satiety: 8,  health: 1,  energy: 3 },
  soup:        { name:'Суп',               emoji:'🍲', type:'food', price: 150, satiety: 32, health: 5 },
  salad:       { name:'Салат',             emoji:'🥗', type:'food', price: 200, satiety: 22, health: 10 },
  shawarma:    { name:'Шаурма',            emoji:'🌯', type:'food', price: 180, satiety: 38, health: -5 },
  energy:      { name:'Энергетик',         emoji:'🥤', type:'food', price: 120, satiety: 0,  health: -3, energy: 25 },
  // одежда
  tornshirt:   { name:'Рваная рубаха',     emoji:'👕', type:'cloth', slot:'body', price: 0,     rep: 0 },
  cap:         { name:'Кепка',             emoji:'🧢', type:'cloth', slot:'head', price: 300,   rep: 1 },
  capGood:     { name:'Кожаная кепка',     emoji:'🧢', type:'cloth', slot:'head', price: 1200,  rep: 4 },
  jacket:      { name:'Куртка',            emoji:'🧥', type:'cloth', slot:'body', price: 800,   rep: 3 },
  suitJacket:  { name:'Пиджак',            emoji:'🤵', type:'cloth', slot:'body', price: 8000,  rep: 10 },
  jeans:       { name:'Джинсы',            emoji:'👖', type:'cloth', slot:'legs', price: 1200,  rep: 3 },
  suitPants:   { name:'Брюки',             emoji:'👖', type:'cloth', slot:'legs', price: 6000,  rep: 8 },
  sneakers:    { name:'Кроссовки',         emoji:'👟', type:'cloth', slot:'shoes', price: 2000, rep: 4 },
  dressShoes:  { name:'Туфли',             emoji:'👞', type:'cloth', slot:'shoes', price: 9000, rep: 10 },
  goldWatch:   { name:'Золотые часы',      emoji:'⌚', type:'cloth', slot:'accessory', price: 25000, rep: 15 },
};

// ─── КОНСТАНТЫ: КРАФТ ─────────────────────────────────────────
const RECIPES = {
  patch:     { name:'Заплатка',           items: { rag: 1, thread: 1 },            result: { itemId: 'patch', qty: 1 },    energy: 5,  desc: 'Ремонт одежды' },
  moonshine: { name:'Самогон',            items: { bottle: 3 },                    result: { itemId: 'moonshine', qty: 1 }, energy: 10, money: 20, desc: 'Продать подороже' },
  fixPhone:  { name:'Починить телефон',   items: { phoneBroken: 1, screwdriver: 1 },result: { itemId: 'phoneWorking', qty: 1 }, energy: 15, desc: 'Нужна отвёртка (не тратится)' },
  necklace:  { name:'Сделать украшение',  items: { scrap: 2, wire: 2 },            result: { itemId: 'necklace', qty: 1 }, energy: 10, desc: 'На продажу' },
};

// ─── КОНСТАНТЫ: РАБОТЫ ────────────────────────────────────────
const JOBS = {
  janitor:    { name:'Дворник',          emoji:'🧹', pay: 400,  energy: 25, reqEdu: 0, reqRep: 0,  reqJob: null,    desc:'Подметать улицы' },
  loader:     { name:'Грузчик',          emoji:'📦', pay: 600,  energy: 35, reqEdu: 0, reqRep: 0,  reqJob: null,    desc:'Таскать ящики' },
  carwasher:  { name:'Мойщик машин',     emoji:'🚿', pay: 500,  energy: 30, reqEdu: 0, reqRep: 5,  reqJob: null,    desc:'Мойка автомобилей' },
  courier:    { name:'Курьер',           emoji:'🛵', pay: 900,  energy: 28, reqEdu: 1, reqRep: 10, reqJob: null,    desc:'Доставка' },
  salesman:   { name:'Продавец',         emoji:'🛍️', pay: 1500, energy: 25, reqEdu: 1, reqRep: 15, reqJob: null,    desc:'Розница' },
  handyman:   { name:'Слесарь',          emoji:'🔧', pay: 1200, energy: 30, reqEdu: 2, reqRep: 15, reqJob: null,    desc:'Мастер на все руки' },
  programmer: { name:'Программист',      emoji:'💻', pay: 4000, energy: 25, reqEdu: 3, reqRep: 25, reqSpec:'programmer', desc:'Писать код' },
  manager:    { name:'Менеджер',         emoji:'📊', pay: 3500, energy: 25, reqEdu: 3, reqRep: 25, reqSpec:'manager',    desc:'Управлять' },
  doctor:     { name:'Врач',             emoji:'⚕️', pay: 5000, energy: 30, reqEdu: 3, reqRep: 30, reqSpec:'doctor',     desc:'Лечить людей' },
  lawyer:     { name:'Юрист',            emoji:'⚖️', pay: 5500, energy: 30, reqEdu: 3, reqRep: 30, reqSpec:'lawyer',     desc:'Защищать в суде' },
  designer:   { name:'Дизайнер',         emoji:'🎨', pay: 3800, energy: 25, reqEdu: 3, reqRep: 25, reqSpec:'designer',   desc:'Рисовать макеты' },
};

// ─── КОНСТАНТЫ: ОБУЧЕНИЕ ──────────────────────────────────────
const EDUCATION = {
  school:     { name: 'Школа (аттестат)',   cost: 0,     days: 3,  next: 'college',    reqEdu: 0 },
  college:    { name: 'Колледж (диплом)',   cost: 5000,  days: 5,  next: 'university', reqEdu: 1 },
  university: { name: 'Вуз (диплом)',       cost: 30000, days: 10, next: null,         reqEdu: 2 },
};

const SPECIALTIES = {
  programmer: 'Программист', manager: 'Менеджер',
  doctor: 'Врач', lawyer: 'Юрист', designer: 'Дизайнер',
};

// ─── КОНСТАНТЫ: ЖИЛЬЁ ─────────────────────────────────────────
const HOUSINGS = {
  street:    { name:'Улица',           cost: 0,       rent: 0,     energyRestore: 25, comfort: 0,  desc:'Бесплатно, но опасно' },
  shelter:   { name:'Ночлежка',        cost: 0,       rent: 0,     energyRestore: 50, comfort: 5,  desc:'Бесплатно, ночлег' },
  dorm:      { name:'Комната в общаге',cost: 5000,    rent: 2000,  energyRestore: 75, comfort: 25, desc:'Скромно, но своё' },
  apartment: { name:'Съёмная квартира',cost: 25000,   rent: 10000, energyRestore: 90, comfort: 55, desc:'Уютно' },
  studio:    { name:'Своя студия',     cost: 150000,  rent: 0,     energyRestore: 100, comfort: 80, desc:'Личное пространство' },
  penthouse: { name:'Пентхаус',        cost: 1000000, rent: 0,     energyRestore: 100, comfort: 100, desc:'Вершина успеха' },
};

// ─── КОНСТАНТЫ: ТРАНСПОРТ ─────────────────────────────────────
const TRANSPORTS = {
  walk:    { name:'Пешком',          emoji:'🚶', cost: 0,       speed: 1,   rep: 0 },
  bike:    { name:'Велосипед',       emoji:'🚲', cost: 5000,    speed: 1.6, rep: 1 },
  oldcar:  { name:'Старая машина',   emoji:'🚗', cost: 80000,   speed: 2.4, rep: 4 },
  newcar:  { name:'Новая иномарка',  emoji:'🏎️', cost: 1000000, speed: 3.2, rep: 8 },
  luxury:  { name:'Элитный автомобиль', emoji:'🚙', cost: 5000000, speed: 3.8, rep: 15 },
};

// ─── КОНСТАНТЫ: БИЗНЕС ────────────────────────────────────────
const BUSINESSES = {
  stall:    { name:'Ларёк',           emoji:'🏪', cost: 100000,  income: 5000,  risk: 0.05, desc:'Продажа мелочей' },
  carwash:  { name:'Автомойка',       emoji:'🚿', cost: 300000,  income: 15000, risk: 0.04, desc:'Мойка авто' },
  cafe:     { name:'Кафе',            emoji:'☕', cost: 700000,  income: 35000, risk: 0.04, desc:'Уютное место' },
  startup:  { name:'IT-стартап',      emoji:'💻', cost: 1500000, income: 80000, risk: 0.06, desc:'Модно и перспективно' },
  chain:    { name:'Сеть магазинов',  emoji:'🏬', cost: 5000000, income: 250000,risk: 0.05, desc:'Империя' },
};

// ─── КОНСТАНТЫ: ПОГОДА ────────────────────────────────────────
const WEATHER_ICON = { sunny: '☀️', cloudy: '☁️', rain: '🌧️', cold: '❄️' };
const WEATHER_NAME = { sunny: 'Солнечно', cloudy: 'Облачно', rain: 'Дождь', cold: 'Мороз' };

// ─── КОНСТАНТЫ: КВЕСТЫ ────────────────────────────────────────
const QUESTS = {
  tutorial_dig:   { title:'Первые шаги',          desc:'Сходите на Мусорку и найдите что-нибудь',            reward: 0 },
  tutorial_sell:  { title:'Продать хлам',         desc:'Продайте что-нибудь на Барахолке',                    reward: 0 },
  tutorial_eat:   { title:'Утолить голод',        desc:'Купите и съешьте любую еду',                          reward: 50 },
  get_shelter:    { title:'Крыша над головой',    desc:'Снимите комнату в общаге (5 000 ₽)',                  reward: 200 },
  get_job:        { title:'Первая работа',        desc:'Устройтесь на любую работу',                          reward: 300 },
  get_school:     { title:'Аттестат',             desc:'Окончите школу',                                      reward: 500 },
  get_college:    { title:'Диплом колледжа',      desc:'Окончите колледж',                                    reward: 1000 },
  get_university: { title:'Высшее образование',   desc:'Окончите вуз и выберите специальность',               reward: 3000 },
  get_apartment:  { title:'Своя квартира',        desc:'Купите студию или лучше',                             reward: 5000 },
  get_car:        { title:'Личное авто',          desc:'Купите новую иномарку или лучше',                     reward: 3000 },
  get_business:   { title:'Своё дело',            desc:'Откройте любой бизнес',                               reward: 10000 },
  millionaire:    { title:'Миллионер',            desc:'Накопите 1 000 000 ₽',                                reward: 20000 },
  final:          { title:'Из грязи в князи',     desc:'Пентхаус + бизнес + 10 000 000 ₽',                    reward: 0 },
};

// ─── ГЛОБАЛЬНОЕ СОСТОЯНИЕ ─────────────────────────────────────
let S = null;
let audioCtx = null;
let tickTimer = null;
let saveTimer = null;
const SAVE_KEY = 'rags_to_riches_save_v1';
const VOLUME = { master: 0.5 };

// ═══════════════════════════════════════════════════════════════
//  УТИЛИТЫ
// ═══════════════════════════════════════════════════════════════
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const chance = (p) => Math.random() < p;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (n) => Math.round(n).toLocaleString('ru-RU');

function playSound(name) {
  if (!audioCtx || VOLUME.master <= 0) return;
  const now = audioCtx.currentTime;
  const v = VOLUME.master * 0.15;
  const mk = (freq, dur, type='square', delay=0, vol=v) => {
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol, now + delay);
    g.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
    o.connect(g); g.connect(audioCtx.destination);
    o.start(now + delay); o.stop(now + delay + dur);
  };
  switch (name) {
    case 'click':   mk(700, 0.04); break;
    case 'coin':    mk(900, 0.06); mk(1300, 0.08, 'square', 0.05); break;
    case 'success': mk(523,0.08); mk(659,0.08,'square',0.08); mk(784,0.15,'square',0.16); break;
    case 'fail':    mk(320,0.12,'sawtooth'); mk(200,0.18,'sawtooth',0.1); break;
    case 'error':   mk(180,0.15,'sawtooth'); break;
    case 'buy':     mk(500,0.06); mk(700,0.06,'square',0.05); break;
  }
}

function initAudio() {
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
  catch (e) { audioCtx = null; }
}

function toast(msg, type='info') {
  const area = document.getElementById('toastArea');
  const div = document.createElement('div');
  div.className = 'toast toast-' + type;
  div.textContent = msg;
  area.appendChild(div);
  setTimeout(() => { div.classList.add('toast-out'); setTimeout(() => div.remove(), 350); }, 2800);
}

// ═══════════════════════════════════════════════════════════════
//  СОСТОЯНИЕ / СОХРАНЕНИЯ
// ═══════════════════════════════════════════════════════════════
function createNewState() {
  return {
    money: 0,
    satiety: 60, health: 100, energy: 100, hygiene: 40, reputation: 10,
    day: 1, hour: 8, gameMinute: 8 * 60, weather: 'sunny',
    currentLocation: 'street',
    inventory: [
      { itemId: 'bottle', qty: 1 },
      { itemId: 'rag', qty: 1 },
    ],
    equipment: {
      head: null,
      body: { itemId: 'tornshirt', condition: 100 },
      legs: null,
      shoes: null,
      accessory: null,
    },
    housing: 'street',
    transport: 'walk',
    educationLevel: 0,      // 0 — нет, 1 — школа, 2 — колледж, 3 — вуз
    specialty: null,
    currentJob: null,
    businesses: [],
    quests: { tutorial_dig: 'active' },
    traveling: false,
    sleeping: false,
    xp: 0, level: 1,
    lastSaved: Date.now(),
  };
}

function save() {
  if (!S) return;
  try {
    S.lastSaved = Date.now();
    localStorage.setItem(SAVE_KEY, JSON.stringify(S));
  } catch (e) { console.error('Save error:', e); }
}

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) { return null; }
}

function hasSave() {
  return !!localStorage.getItem(SAVE_KEY);
}

// ═══════════════════════════════════════════════════════════════
//  ИГРОВОЙ ЦИКЛ
// ═══════════════════════════════════════════════════════════════
function startTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(gameTick, 1000);
}

function gameTick() {
  if (!S || S.sleeping) return;

  S.gameMinute++;
  recalcTime();

  // Голод / гигиена / энергия
  S.satiety = clamp(S.satiety - 0.08, 0, 100);
  S.hygiene = clamp(S.hygiene - 0.05, 0, 100);
  if (S.energy > 0) S.energy = clamp(S.energy - 0.12, 0, 100);

  // Урон при голоде
  if (S.satiety < 20) S.health = clamp(S.health - 0.08, 0, 100);
  if (S.energy < 5) S.health = clamp(S.health - 0.05, 0, 100);

  // Погода на улице
  if (S.housing === 'street' && (S.weather === 'rain' || S.weather === 'cold')) {
    S.health = clamp(S.health - 0.04, 0, 100);
  }

  // Смерть
  if (S.health <= 0) hospitalize();

  renderHUD();
}

function recalcTime() {
  S.hour = Math.floor(S.gameMinute / 60) % 24;
  const newDay = Math.floor(S.gameMinute / (60 * 24)) + 1;
  if (newDay !== S.day) {
    S.day = newDay;
    onNewDay();
  }
}

function onNewDay() {
  // Расходы на жильё
  const h = HOUSINGS[S.housing];
  if (h.rent > 0) {
    if (S.money >= h.rent) {
      S.money -= h.rent;
      toast(`🏠 Аренда жилья: -${fmt(h.rent)} ₽`, 'info');
    } else {
      toast(`⚠️ Не хватает на аренду! Выселяют на улицу.`, 'error');
      S.housing = 'street';
      S.reputation = clamp(S.reputation - 10, 0, 100);
    }
  }

  // Доход с бизнесов
  for (const bizId of S.businesses) {
    const biz = BUSINESSES[bizId];
    if (!biz) continue;
    if (chance(biz.risk)) {
      toast(`📉 ${biz.name}: проблемы! Убыток.`, 'error');
    } else {
      const income = Math.round(biz.income * rand(0.7, 1.3));
      S.money += income;
      S.totalEarned = (S.totalEarned || 0) + income;
      toast(`💰 ${biz.name}: +${fmt(income)} ₽`, 'success');
    }
  }

  // Погода (30% шанс смены)
  if (chance(0.4)) {
    S.weather = pick(['sunny','cloudy','rain','cold']);
  }

  checkQuests();
  save();
}

function hospitalize() {
  playSound('fail');
  const lost = Math.floor(S.money * 0.3);
  S.money = Math.max(0, S.money - lost);
  S.health = 40;
  S.satiety = 30;
  S.energy = 30;
  S.hygiene = 20;
  S.housing = 'street';
  S.currentLocation = 'shelter';
  renderMap();

  openModal('hospital', '🏥 Больница', `
    <p style="font-size:18px; text-align:center; margin-bottom:16px;">
      Вы потеряли сознание...<br>Вас подобрали и отвезли в больницу.
    </p>
    <p style="text-align:center; color:var(--red);">
      💸 Потеряно: ${fmt(lost)} ₽<br>
      😔 Репутация и вещи пострадали.
    </p>
  `, {
    buttons: [{ label: 'Очнуться', cls: 'btn-primary', action: () => closeModal('hospital') }]
  });
}

// ═══════════════════════════════════════════════════════════════
//  РЕНДЕР
// ═══════════════════════════════════════════════════════════════
function renderHUD() {
  if (!S) return;
  document.getElementById('hudMoney').textContent = fmt(S.money);

  setBar('barSatiety', S.satiety);
  setBar('barHealth', S.health);
  setBar('barEnergy', S.energy);
  setBar('barHygiene', S.hygiene);
  setBar('barReputation', S.reputation);

  document.getElementById('hudTime').textContent =
    String(S.hour).padStart(2,'0') + ':00';
  document.getElementById('hudWeather').textContent = WEATHER_ICON[S.weather];
  document.getElementById('hudWeather').title = WEATHER_NAME[S.weather];
  document.getElementById('hudDay').textContent = 'День ' + S.day;

  // Тема по богатству
  document.body.classList.remove('tier-poor','tier-mid','tier-rich');
  if (S.money < 5000) document.body.classList.add('tier-poor');
  else if (S.money < 500000) document.body.classList.add('tier-mid');
  else document.body.classList.add('tier-rich');
}

function setBar(id, val) {
  const el = document.getElementById(id);
  if (el) el.style.width = clamp(val, 0, 100) + '%';
}

function renderMap() {
  const container = document.getElementById('mapContainer');
  container.innerHTML = '';
  for (const [id, loc] of Object.entries(LOCATIONS)) {
    const btn = document.createElement('button');
    btn.className = 'loc-btn';
    btn.style.left = loc.x + '%';
    btn.style.top = loc.y + '%';
    btn.innerHTML = `<span class="loc-emoji">${loc.emoji}</span><span class="loc-name">${loc.name}</span>`;
    btn.onclick = () => travelTo(id);
    container.appendChild(btn);
  }
  const player = document.getElementById('mapPlayer');
  const pLoc = LOCATIONS[S.currentLocation] || LOCATIONS.street;
  player.style.transition = 'none';
  player.style.left = pLoc.x + '%';
  player.style.top = pLoc.y + '%';
  // принудительный рефлоу
  void player.offsetWidth;
  player.style.transition = 'left 2s ease-in-out, top 2s ease-in-out';
}

// ═══════════════════════════════════════════════════════════════
//  МОДАЛКИ
// ═══════════════════════════════════════════════════════════════
function openModal(id, title, html, options = {}) {
  closeModal(id);
  const root = document.getElementById('modalRoot');
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.dataset.id = id;
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <h2>${title}</h2>
        <button class="modal-close" data-close>×</button>
      </div>
      <div class="modal-body">${html}</div>
      <div class="modal-footer"></div>
    </div>
  `;
  root.appendChild(modal);

  modal.querySelector('[data-close]').onclick = () => { playSound('click'); closeModal(id); };
  modal.onclick = (e) => { if (e.target === modal) closeModal(id); };

  if (options.buttons && options.buttons.length) {
    const footer = modal.querySelector('.modal-footer');
    for (const b of options.buttons) {
      const btn = document.createElement('button');
      btn.className = 'btn ' + (b.cls || 'btn-secondary');
      btn.textContent = b.label;
      btn.onclick = () => { playSound('click'); b.action && b.action(modal); };
      footer.appendChild(btn);
    }
  } else {
    modal.querySelector('.modal-footer').style.display = 'none';
  }

  requestAnimationFrame(() => modal.classList.add('open'));
  return modal;
}

function closeModal(id) {
  const modal = document.querySelector(`.modal-overlay[data-id="${id}"]`);
  if (!modal) return;
  modal.classList.remove('open');
  setTimeout(() => modal.remove(), 220);
}

// ═══════════════════════════════════════════════════════════════
//  ПЕРЕДВИЖЕНИЕ
// ═══════════════════════════════════════════════════════════════
function travelTo(locId) {
  if (!S || S.traveling) return;
  if (S.currentLocation === locId) { openLocationPanel(locId); return; }

  const from = LOCATIONS[S.currentLocation] || LOCATIONS.street;
  const to = LOCATIONS[locId];
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const speed = TRANSPORTS[S.transport].speed;
  const duration = clamp(dist * 30 / speed, 400, 2500);

  S.traveling = true;
  playSound('click');
  const player = document.getElementById('mapPlayer');
  player.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
  player.style.left = to.x + '%';
  player.style.top = to.y + '%';

  setTimeout(() => {
    S.currentLocation = locId;
    S.traveling = false;

    // Износ обуви
    if (S.equipment.shoes) {
      S.equipment.shoes.condition = clamp(S.equipment.shoes.condition - 1, 0, 100);
      if (S.equipment.shoes.condition <= 0) {
        toast('👟 Обувь порвалась!', 'error');
        S.reputation = clamp(S.reputation - 2, 0, 100);
        S.equipment.shoes = null;
      }
    }

    // 20% шанс события в пути (не на «улице»)
    if (locId !== 'street' && chance(0.2)) {
      triggerRandomEncounter();
    } else {
      openLocationPanel(locId);
    }
    renderHUD();
  }, duration);
}

// ═══════════════════════════════════════════════════════════════
//  ПАНЕЛИ ЛОКАЦИЙ
// ═══════════════════════════════════════════════════════════════
function openLocationPanel(locId) {
  const loc = LOCATIONS[locId];
  let html = '';
  switch (loc.type) {
    case 'dig':       html = digPanel(); break;
    case 'shop':      html = shopPanel(); break;
    case 'flea':      html = fleaPanel(); break;
    case 'school':    html = educationPanel('school'); break;
    case 'college':   html = educationPanel('college'); break;
    case 'university':html = educationPanel('university'); break;
    case 'factory':   html = jobPanel('factory'); break;
    case 'office':    html = jobPanel('office'); break;
    case 'cafe':      html = cafePanel(); break;
    case 'bank':      html = bankPanel(); break;
    case 'housing':   html = housingPanel(); break;
    case 'transport': html = transportPanel(); break;
    case 'business':  html = businessPanel(); break;
    case 'street':    html = streetPanel(); break;
  }
  openModal('location', loc.emoji + ' ' + loc.name, html);
}

function digPanel() {
  return `
    <p>Здесь можно порыться в поисках чего-нибудь полезного.</p>
    <p class="hint">Каждое копание тратит энергию и время.</p>
    <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:16px;">
      <button class="btn btn-primary" onclick="startDigging()">🕵️ Копаться (−10 энергии)</button>
      <button class="btn btn-secondary" onclick="popAndSell()">🍾 Сдать бутылки</button>
    </div>
  `;
}

function shopPanel() {
  const foods = ['bread','water','soup','salad','shawarma','energy'];
  let rows = '';
  for (const id of foods) {
    const it = ITEMS[id];
    const price = getShopPrice(id);
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${it.emoji} ${it.name}</div>
          <div class="desc">
            Сытость +${it.satiety || 0}
            ${it.health ? ' · Здоровье ' + (it.health > 0 ? '+' : '') + it.health : ''}
            ${it.energy ? ' · Энергия +' + it.energy : ''}
          </div>
        </div>
        <div class="price">${fmt(price)} ₽</div>
        <button class="btn btn-primary" onclick="buyItem('${id}', 1)">Купить</button>
      </div>`;
  }
  // Одежда
  const clothes = ['cap','jacket','jeans','sneakers','capGood','suitJacket','suitPants','dressShoes','goldWatch'];
  let clothRows = '';
  for (const id of clothes) {
    const it = ITEMS[id];
    const price = getShopPrice(id);
    clothRows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${it.emoji} ${it.name}</div>
          <div class="desc">Репутация +${it.rep || 0}</div>
        </div>
        <div class="price">${fmt(price)} ₽</div>
        <button class="btn btn-primary" onclick="buyItem('${id}', 1)">Купить</button>
      </div>`;
  }
  // Инструменты
  const tools = ['screwdriver'];
  let toolRows = '';
  for (const id of tools) {
    const it = ITEMS[id];
    toolRows += `
      <div class="list-row">
        <div class="info"><div class="name">${it.emoji} ${it.name}</div></div>
        <div class="price">${fmt(it.price)} ₽</div>
        <button class="btn btn-primary" onclick="buyItem('${id}', 1)">Купить</button>
      </div>`;
  }
  return `
    <h3 style="margin-bottom:8px;">🍞 Продукты</h3>${rows}
    <h3 style="margin:16px 0 8px;">👔 Одежда</h3>${clothRows}
    <h3 style="margin:16px 0 8px;">🛠️ Инструменты</h3>${toolRows}
  `;
}

function getShopPrice(itemId) {
  let price = ITEMS[itemId].price;
  // Вечером еда дороже
  if (ITEMS[itemId].type === 'food' && (S.hour >= 18 || S.hour < 6)) {
    price = Math.round(price * 1.3);
  }
  return price;
}

function fleaPanel() {
  let invRows = '';
  for (const slot of S.inventory) {
    const it = ITEMS[slot.itemId];
    if (!it || it.price <= 0) continue;
    const sellPrice = Math.round(it.price * 0.6);
    invRows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${it.emoji} ${it.name} ×${slot.qty}</div>
          <div class="desc">Продать за ${fmt(sellPrice)} ₽/шт</div>
        </div>
        <button class="btn btn-primary" onclick="sellItem('${slot.itemId}')">Продать</button>
      </div>`;
  }
  if (!invRows) invRows = '<p class="hint">Нечего продавать. Идите копаться!</p>';
  return `
    <h3 style="margin-bottom:8px;">💰 Ваш хлам</h3>
    ${invRows}
  `;
}

function educationPanel(kind) {
  const edu = EDUCATION[kind];
  const current = S.educationLevel;

  if (kind === 'school' && current >= 1) {
    return `<p>✅ Школа окончена. Идите в колледж.</p>`;
  }
  if (kind === 'college' && current >= 2) {
    return `<p>✅ Колледж окончен. Идите в вуз.</p>`;
  }
  if (kind === 'university' && current >= 3) {
    return `<p>✅ Вуз окончен. Специальность: ${SPECIALTIES[S.specialty] || '—'}.</p>`;
  }
  if (current < edu.reqEdu) {
    return `<p>🔒 Сначала нужно окончить предыдущую ступень.</p>`;
  }
  return `
    <p><strong>${edu.name}</strong></p>
    <p>Стоимость: ${fmt(edu.cost)} ₽</p>
    <p>Вступительный экзамен — викторина из 5 вопросов. Нужно 3+ правильных.</p>
    <p class="hint">При неудаче деньги не возвращаются.</p>
    <button class="btn btn-primary" onclick="takeExam('${kind}')" style="margin-top:12px;">
      🎓 Сдать экзамен (${fmt(edu.cost)} ₽)
    </button>
  `;
}

function jobPanel(place) {
  const isOffice = place === 'office';
  let rows = '';
  for (const [id, job] of Object.entries(JOBS)) {
    // В офисе — только «умные» работы, на заводе — физические
    if (isOffice && job.pay < 1500) continue;
    if (!isOffice && job.pay >= 1500) continue;

    const canEdu = S.educationLevel >= job.reqEdu;
    const canRep = S.reputation >= job.reqRep;
    const canSpec = !job.reqSpec || S.specialty === job.reqSpec;
    const canWork = canEdu && canRep && canSpec;

    let reason = '';
    if (!canEdu) reason = `Нужно образование ур. ${job.reqEdu}`;
    else if (!canRep) reason = `Нужна репутация ${job.reqRep}`;
    else if (!canSpec) reason = `Нужна специальность: ${SPECIALTIES[job.reqSpec]}`;

    const active = S.currentJob === id;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${job.emoji} ${job.name} — ${fmt(job.pay)} ₽/смена</div>
          <div class="desc">${job.desc} · Энергия −${job.energy}${reason ? ' · 🔒 ' + reason : ''}</div>
        </div>
        <button class="btn ${active ? 'btn-success' : 'btn-primary'}" ${!canWork ? 'disabled' : ''}
          onclick="doWork('${id}')">
          ${active ? '▶ Работать' : 'Устроиться'}
        </button>
      </div>`;
  }
  return `
    <h3 style="margin-bottom:12px;">${isOffice ? '🏢 Офисные вакансии' : '🏭 Рабочие вакансии'}</h3>
    <p class="hint">Работа отнимает энергию, но приносит деньги.</p>
    ${rows}
  `;
}

function cafePanel() {
  return `
    <p>🍵 Здесь можно подкрепиться и отдохнуть.</p>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
      <button class="btn btn-primary" onclick="buyItem('soup',1)">🍲 Суп (150 ₽)</button>
      <button class="btn btn-primary" onclick="buyItem('salad',1)">🥗 Салат (200 ₽)</button>
      <button class="btn btn-primary" onclick="buyItem('shawarma',1)">🌯 Шаурма (180 ₽)</button>
      <button class="btn btn-secondary" onclick="restCafe()">☕ Отдохнуть (+30 энергии, −100 ₽)</button>
    </div>
  `;
}

function bankPanel() {
  const deposit = Math.min(S.money, 1000000);
  const interest = Math.round(deposit * 0.05);
  return `
    <p>🏦 Банк хранит ваши сбережения.</p>
    <p>Ваш баланс: ${fmt(S.money)} ₽</p>
    <p>Депозит под 5% в день (макс. 1 000 000 ₽ на вклад).</p>
    ${deposit > 0 ? `
      <button class="btn btn-primary" onclick="makeDeposit()">💰 Положить ${fmt(deposit)} ₽ → +${fmt(interest)} ₽/день</button>
    ` : '<p class="hint">Недостаточно средств.</p>'}
  `;
}

function makeDeposit() {
  const deposit = Math.min(S.money, 1000000);
  if (deposit < 100) { toast('Минимум 100 ₽', 'error'); return; }
  S.money -= deposit;
  S.deposit = (S.deposit || 0) + deposit;
  toast(`💰 Вклад: ${fmt(deposit)} ₽`, 'success');
  playSound('coin');
  closeModal('location');
  renderHUD();
}

function housingPanel() {
  let rows = '';
  for (const [id, h] of Object.entries(HOUSINGS)) {
    const isCurrent = S.housing === id;
    const canAfford = S.money >= h.cost;
    const tierLocked = id === 'penthouse' && S.businesses.length === 0;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">🏠 ${h.name}${isCurrent ? ' (текущее)' : ''}</div>
          <div class="desc">${h.desc} · Восст. энергии: +${h.energyRestore}${h.rent ? ' · Аренда ' + fmt(h.rent) + ' ₽/день' : ''}${tierLocked ? ' · 🔒 Нужен свой бизнес' : ''}</div>
        </div>
        <div class="price">${h.cost ? fmt(h.cost) + ' ₽' : 'Бесплатно'}</div>
        <button class="btn ${isCurrent ? 'btn-success' : 'btn-primary'}"
          ${isCurrent || tierLocked || (!isCurrent && h.cost > 0 && !canAfford) ? 'disabled' : ''}
          onclick="buyHousing('${id}')">
          ${isCurrent ? '✓' : (h.cost > 0 ? 'Купить' : 'Переехать')}
        </button>
      </div>`;
  }
  return `<h3 style="margin-bottom:12px;">🏠 Варианты жилья</h3>${rows}
    <p class="hint" style="margin-top:12px;">Также можно поспать: <button class="btn btn-secondary" onclick="sleepNow()" style="padding:6px 12px; font-size:12px;">💤 Спать (6 часов)</button></p>`;
}

function transportPanel() {
  let rows = '';
  for (const [id, t] of Object.entries(TRANSPORTS)) {
    const isCurrent = S.transport === id;
    const canAfford = S.money >= t.cost;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${t.emoji} ${t.name}${isCurrent ? ' (текущий)' : ''}</div>
          <div class="desc">Скорость ×${t.speed} · Репутация +${t.rep}</div>
        </div>
        <div class="price">${t.cost ? fmt(t.cost) + ' ₽' : 'Бесплатно'}</div>
        <button class="btn ${isCurrent ? 'btn-success' : 'btn-primary'}"
          ${isCurrent || (!isCurrent && t.cost > 0 && !canAfford) ? 'disabled' : ''}
          onclick="buyTransport('${id}')">
          ${isCurrent ? '✓' : (t.cost > 0 ? 'Купить' : 'Выбрать')}
        </button>
      </div>`;
  }
  return `<h3 style="margin-bottom:12px;">🚗 Транспорт</h3>${rows}`;
}

function businessPanel() {
  if (S.educationLevel < 3 || S.money < 50000) {
    return `
      <p>📊 Для открытия бизнеса нужно:</p>
      <ul style="margin-left:24px; color:var(--text-dim);">
        <li>Высшее образование ${S.educationLevel >= 3 ? '✅' : '❌'}</li>
        <li>Стартовый капитал (от 100 000 ₽) ${S.money >= 100000 ? '✅' : '❌'}</li>
      </ul>
    `;
  }
  let rows = '';
  for (const [id, biz] of Object.entries(BUSINESSES)) {
    const owned = S.businesses.includes(id);
    const canAfford = S.money >= biz.cost;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${biz.emoji} ${biz.name}${owned ? ' (куплено)' : ''}</div>
          <div class="desc">${biz.desc} · Доход ~${fmt(biz.income)} ₽/день</div>
        </div>
        <div class="price">${fmt(biz.cost)} ₽</div>
        <button class="btn ${owned ? 'btn-success' : 'btn-primary'}"
          ${owned || !canAfford ? 'disabled' : ''}
          onclick="buyBusiness('${id}')">
          ${owned ? '✓' : 'Открыть'}
        </button>
      </div>`;
  }
  return `<h3 style="margin-bottom:12px;">📊 Бизнес</h3>${rows}`;
}

function streetPanel() {
  return `
    <p>🛣️ Оживлённая улица. Здесь можно попрошайничать.</p>
    <button class="btn btn-primary" onclick="begMoney()">🙏 Попрошайничать (риск)</button>
    <button class="btn btn-secondary" onclick="washWindows()">🪟 Помыть окна (5 ₽, 5 энергии)</button>
  `;
}

function begMoney() {
  if (S.energy < 10) { toast('Нет сил', 'error'); return; }
  S.energy -= 10;
  const roll = Math.random();
  if (roll < 0.5) {
    const m = randInt(20, 80);
    S.money += m;
    toast(`💵 Прохожий дал ${m} ₽`, 'success');
    playSound('coin');
  } else if (roll < 0.8) {
    toast('Никто не подал.', 'info');
  } else {
    S.reputation = clamp(S.reputation - 2, 0, 100);
    toast('Полиция прогнала вас. −2 репутации.', 'error');
  }
  closeModal('location');
  renderHUD();
  save();
}

function washWindows() {
  if (S.energy < 5) { toast('Нет сил', 'error'); return; }
  S.energy -= 5;
  S.money += 5;
  S.hygiene = clamp(S.hygiene - 3, 0, 100);
  toast('+5 ₽', 'success');
  renderHUD();
  save();
}

function restCafe() {
  if (S.money < 100) { toast('Не хватает денег', 'error'); return; }
  S.money -= 100;
  S.energy = clamp(S.energy + 30, 0, 100);
  toast('☕ Вы отдохнули', 'success');
  playSound('coin');
  renderHUD();
}

function sleepNow() {
  const h = HOUSINGS[S.housing];
  if (S.housing === 'street') {
    toast('🚫 На улице спать холодно и опасно.', 'error');
    return;
  }
  S.sleeping = true;
  closeModal('location');
  toast('💤 Вы спите...', 'info');
  setTimeout(() => {
    S.energy = clamp(h.energyRestore, 0, 100);
    S.health = clamp(S.health + 3, 0, 100);
    S.hygiene = clamp(S.hygiene - 8, 0, 100);
    S.satiety = clamp(S.satiety - 15, 0, 100);
    S.gameMinute += 6 * 60; // 6 часов
    recalcTime();
    S.sleeping = false;
    toast('☀️ Доброе утро!', 'success');
    playSound('success');
    renderHUD();
    checkQuests();
    save();
  }, 800);
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: ИНВЕНТАРЬ
// ═══════════════════════════════════════════════════════════════
function addItem(itemId, qty = 1) {
  const it = ITEMS[itemId];
  if (!it) return;
  if (it.type === 'cloth') {
    // Одежда — кладём как есть (потом можно экипировать)
    // Но если слот занят — просто в инвентарь
    S.inventory.push({ itemId, qty });
    return;
  }
  const existing = S.inventory.find(s => s.itemId === itemId);
  if (existing) existing.qty += qty;
  else S.inventory.push({ itemId, qty });
}

function removeItem(itemId, qty = 1) {
  const idx = S.inventory.findIndex(s => s.itemId === itemId);
  if (idx === -1) return false;
  if (S.inventory[idx].qty < qty) return false;
  S.inventory[idx].qty -= qty;
  if (S.inventory[idx].qty <= 0) S.inventory.splice(idx, 1);
  return true;
}

function countItem(itemId) {
  const s = S.inventory.find(x => x.itemId === itemId);
  return s ? s.qty : 0;
}

function totalItemValue() {
  return S.inventory.reduce((sum, s) => sum + (ITEMS[s.itemId]?.price || 0) * s.qty, 0);
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: ПОКУПКА / ПРОДАЖА
// ═══════════════════════════════════════════════════════════════
function buyItem(itemId, qty = 1) {
  const it = ITEMS[itemId];
  if (!it) return;
  const price = getShopPrice(itemId) * qty;
  if (S.money < price) { toast('Не хватает денег', 'error'); playSound('error'); return; }
  S.money -= price;
  addItem(itemId, qty);
  toast(`Куплено: ${it.emoji} ${it.name}`, 'success');
  playSound('buy');
  renderHUD();
  save();
  // Переоткрыть магазин чтобы обновить
  const current = document.querySelector('.modal-overlay[data-id="location"]');
  if (current) {
    closeModal('location');
    setTimeout(() => openLocationPanel(S.currentLocation), 100);
  }
}

function sellItem(itemId) {
  const it = ITEMS[itemId];
  if (!it) return;
  if (!removeItem(itemId, 1)) return;
  const price = Math.round(it.price * 0.6);
  S.money += price;
  S.totalEarned = (S.totalEarned || 0) + price;
  toast(`Продано: ${it.emoji} ${it.name} (+${fmt(price)} ₽)`, 'success');
  playSound('coin');
  renderHUD();
  closeModal('location');
  setTimeout(() => openLocationPanel(S.currentLocation), 100);
  checkQuests();
  save();
}

function popAndSell() {
  const n = countItem('bottle');
  if (n < 1) { toast('Нет бутылок', 'error'); return; }
  removeItem('bottle', n);
  const total = n * randInt(5, 12);
  S.money += total;
  S.totalEarned = (S.totalEarned || 0) + total;
  toast(`🍾 ${n} бутылок → +${fmt(total)} ₽`, 'success');
  playSound('coin');
  renderHUD();
  closeModal('location');
  save();
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: ЕДА
// ═══════════════════════════════════════════════════════════════
function eatItem(itemId) {
  const it = ITEMS[itemId];
  if (!it || it.type !== 'food') return;
  if (!removeItem(itemId, 1)) return;
  S.satiety = clamp(S.satiety + (it.satiety || 0), 0, 100);
  if (it.health) S.health = clamp(S.health + it.health, 0, 100);
  if (it.energy) S.energy = clamp(S.energy + it.energy, 0, 100);
  toast(`Съедено: ${it.emoji} ${it.name}`, 'success');
  playSound('buy');
  renderHUD();
  closeModal('inventory');
  checkQuests();
  save();
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: РАБОТА
// ═══════════════════════════════════════════════════════════════
function doWork(jobId) {
  const job = JOBS[jobId];
  if (!job) return;
  if (S.energy < job.energy) { toast('Не хватает энергии', 'error'); return; }
  if (S.educationLevel < job.reqEdu) { toast('Не хватает образования', 'error'); return; }
  if (S.reputation < job.reqRep) { toast('Не хватает репутации', 'error'); return; }
  if (job.reqSpec && S.specialty !== job.reqSpec) { toast('Не та специальность', 'error'); return; }

  // Первое трудоустройство
  if (S.currentJob !== jobId) {
    S.currentJob = jobId;
    toast(`💼 Вы устроены: ${job.name}`, 'success');
    playSound('success');
  }

  // Мини-игра для бонуса
  startWorkMinigame(job, () => {
    let pay = job.pay;
    let bonusMsg = '';
    // Бонус за хорошую работу
    if (chance(0.3)) {
      pay = Math.round(pay * 1.5);
      bonusMsg = ' (+50% бонус!)';
    }
    S.money += pay;
    S.totalEarned = (S.totalEarned || 0) + pay;
    S.energy = clamp(S.energy - job.energy, 0, 100);
    S.satiety = clamp(S.satiety - 10, 0, 100);
    S.reputation = clamp(S.reputation + 1, 0, 100);
    toast(`💰 Зарплата: ${fmt(pay)} ₽${bonusMsg}`, 'success');
    playSound('coin');
    renderHUD();
    closeModal('location');
    checkQuests();
    save();
  });
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: ОБУЧЕНИЕ
// ═══════════════════════════════════════════════════════════════
const EDU_QUESTIONS = [
  { q: 'Сколько будет 2+2×2?', a: ['6','8','4','10'], correct: 0 },
  { q: 'Столица России?', a: ['Санкт-Петербург','Москва','Казань','Новосибирск'], correct: 1 },
  { q: 'Какая планета ближе к Солнцу?', a: ['Венера','Земля','Меркурий','Марс'], correct: 2 },
  { q: 'Кто написал «Войну и мир»?', a: ['Пушкин','Толстой','Достоевский','Чехов'], correct: 1 },
  { q: 'Сколько цветов в радуге?', a: ['5','6','7','8'], correct: 2 },
  { q: 'Что такое HTML?', a: ['Язык программирования','Язык разметки','База данных','Операционная система'], correct: 1 },
  { q: 'Сколько дней в году?', a: ['360','365','366','350'], correct: 1 },
  { q: 'Кто открыл Америку?', a: ['Магеллан','Колумб','Васко да Гама','Кук'], correct: 1 },
];

function takeExam(kind) {
  const edu = EDUCATION[kind];
  if (S.educationLevel < edu.reqEdu) { toast('Сначала предыдущая ступень', 'error'); return; }
  if (S.money < edu.cost) { toast('Не хватает денег', 'error'); playSound('error'); return; }

  const questions = [];
  const shuffled = [...EDU_QUESTIONS].sort(() => Math.random() - 0.5);
  for (let i = 0; i < 5; i++) questions.push(shuffled[i]);

  runQuiz(questions, 3, (passed) => {
    closeModal('location');
    if (passed) {
      S.money -= edu.cost;
      if (kind === 'school') S.educationLevel = 1;
      else if (kind === 'college') S.educationLevel = 2;
      else if (kind === 'university') {
        S.educationLevel = 3;
        // Выбор специальности
        chooseSpecialty();
      }
      S.reputation = clamp(S.reputation + 5, 0, 100);
      toast(`🎓 ${edu.name} окончено!`, 'success');
      playSound('success');
      checkQuests();
    } else {
      S.money = Math.max(0, S.money - edu.cost);
      toast(`❌ Экзамен провален. Деньги потрачены.`, 'error');
      playSound('fail');
    }
    renderHUD();
    save();
  });
}

function chooseSpecialty() {
  const specs = Object.entries(SPECIALTIES);
  const opts = specs.map(([id, name]) => 
    `<button class="quiz-option" onclick="setSpecialty('${id}')">${name}</button>`
  ).join('');
  openModal('specialty', '🎓 Выберите специальность', `
    <p>Вы получили диплом. Пора выбрать специализацию!</p>
    <div class="quiz-options">${opts}</div>
  `);
}

function setSpecialty(id) {
  S.specialty = id;
  toast(`✅ Специальность: ${SPECIALTIES[id]}`, 'success');
  closeModal('specialty');
  checkQuests();
  save();
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: ЖИЛЬЁ, ТРАНСПОРТ, БИЗНЕС
// ═══════════════════════════════════════════════════════════════
function buyHousing(id) {
  const h = HOUSINGS[id];
  if (!h) return;
  if (S.housing === id) return;
  if (h.cost > 0 && S.money < h.cost) { toast('Не хватает денег', 'error'); return; }
  if (id === 'penthouse' && S.businesses.length === 0) {
    toast('Сначала откройте бизнес', 'error');
    return;
  }
  S.money -= h.cost;
  S.housing = id;
  toast(`🏠 Переезд: ${h.name}`, 'success');
  playSound('success');
  renderHUD();
  closeModal('location');
  checkQuests();
  save();
}

function buyTransport(id) {
  const t = TRANSPORTS[id];
  if (!t) return;
  if (S.transport === id) return;
  if (t.cost > 0 && S.money < t.cost) { toast('Не хватает денег', 'error'); return; }
  S.money -= t.cost;
  S.transport = id;
  S.reputation = clamp(S.reputation + t.rep, 0, 100);
  toast(`🚗 Куплено: ${t.name}`, 'success');
  playSound('success');
  renderHUD();
  closeModal('location');
  checkQuests();
  save();
}

function buyBusiness(id) {
  const biz = BUSINESSES[id];
  if (!biz) return;
  if (S.businesses.includes(id)) return;
  if (S.money < biz.cost) { toast('Не хватает денег', 'error'); return; }
  if (S.educationLevel < 3) { toast('Нужно высшее образование', 'error'); return; }
  S.money -= biz.cost;
  S.businesses.push(id);
  toast(`📊 Открыт бизнес: ${biz.name}`, 'success');
  playSound('success');
  renderHUD();
  closeModal('location');
  checkQuests();
  save();
}

// ═══════════════════════════════════════════════════════════════
//  СИСТЕМЫ: КРАФТ
// ═══════════════════════════════════════════════════════════════
function openCraft() {
  let rows = '';
  for (const [id, rec] of Object.entries(RECIPES)) {
    let can = S.energy >= rec.energy && (!rec.money || S.money >= rec.money);
    let ingredients = '';
    for (const [ingId, need] of Object.entries(rec.items)) {
      const have = countItem(ingId);
      const ok = have >= need;
      if (!ok) can = false;
      ingredients += `<span style="color:${ok?'var(--green)':'var(--red)'}">${ITEMS[ingId].emoji}${have}/${need}</span> `;
    }
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${ITEMS[rec.result.itemId].emoji} ${rec.name}</div>
          <div class="desc">${ingredients} · ⚡${rec.energy}${rec.money ? ' · ₽' + rec.money : ''}</div>
        </div>
        <button class="btn btn-primary" ${!can ? 'disabled' : ''} onclick="doCraft('${id}')">Создать</button>
      </div>`;
  }
  openModal('craft', '🔧 Крафт', `<p class="hint">Создавайте предметы для продажи или использования.</p>${rows}`);
}

function doCraft(id) {
  const rec = RECIPES[id];
  if (!rec) return;
  if (S.energy < rec.energy) { toast('Мало энергии', 'error'); return; }
  if (rec.money && S.money < rec.money) { toast('Мало денег', 'error'); return; }
  // Проверка ингредиентов
  for (const [ingId, need] of Object.entries(rec.items)) {
    if (countItem(ingId) < need) { toast('Не хватает ингредиентов', 'error'); return; }
  }
  // Списываем (screwdriver не тратим)
  for (const [ingId, need] of Object.entries(rec.items)) {
    if (ingId !== 'screwdriver') removeItem(ingId, need);
  }
  if (rec.money) S.money -= rec.money;
  S.energy -= rec.energy;
  addItem(rec.result.itemId, rec.result.qty);
  toast(`✅ Создано: ${ITEMS[rec.result.itemId].name}`, 'success');
  playSound('success');
  renderHUD();
  closeModal('craft');
  setTimeout(openCraft, 100);
  save();
}

// ═══════════════════════════════════════════════════════════════
//  МИНИ-ИГРЫ
// ═══════════════════════════════════════════════════════════════

// ─── КОПАНИЕ: тайминг-бар ─────────────────────────────────────
function startDigging() {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  closeModal('location');

  const modal = openModal('minigame', '🕵️ Копание в мусорке', `
    <canvas id="minigameCanvas" width="420" height="180"></canvas>
    <p style="text-align:center;">Кликните, когда полоска в зелёной зоне!</p>
  `);

  const canvas = modal.querySelector('#minigameCanvas');
  const ctx = canvas.getContext('2d');
  let pos = 40, dir = 1, speed = 3.5;
  let attempts = 3, hits = 0, running = true;

  function draw() {
    if (!running) return;
    ctx.fillStyle = '#1a1410';
    ctx.fillRect(0, 0, 420, 180);
    // Зелёная зона
    ctx.fillStyle = 'rgba(100,220,100,0.25)';
    ctx.fillRect(160, 40, 100, 100);
    ctx.strokeStyle = '#6bd66b';
    ctx.lineWidth = 2;
    ctx.strokeRect(160, 40, 100, 100);
    // Маркер
    ctx.fillStyle = '#ffcc44';
    ctx.fillRect(pos - 3, 30, 6, 120);
    ctx.shadowColor = '#ffcc44';
    ctx.shadowBlur = 10;
    ctx.fillRect(pos - 3, 30, 6, 120);
    ctx.shadowBlur = 0;
    // Текст
    ctx.fillStyle = '#f0e6d2';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Попыток: ' + attempts, 10, 24);
    ctx.fillText('Успехов: ' + hits, 10, 168);

    pos += speed * dir;
    if (pos >= 415 || pos <= 5) { dir *= -1; pos = clamp(pos, 5, 415); }
    requestAnimationFrame(draw);
  }
  draw();

  function handleClick() {
    if (!running) return;
    attempts--;
    if (pos >= 160 && pos <= 260) {
      hits++;
      playSound('success');
    } else {
      playSound('fail');
    }
    if (attempts <= 0) {
      running = false;
      closeModal('minigame');
      finishDigging(hits);
    }
  }
  canvas.onclick = handleClick;
  modal.querySelector('.modal-body').onclick = (e) => {
    if (e.target !== canvas) handleClick();
  };
}

function finishDigging(hits) {
  S.energy -= 10;
  S.hygiene = clamp(S.hygiene - 8, 0, 100);
  let loot = [];
  for (let i = 0; i < hits; i++) {
    const roll = Math.random();
    if (roll < 0.6) {
      const it = pick(['bottle','bottle','rag','rag','scrap','thread']);
      addItem(it, randInt(1, 3));
      loot.push(ITEMS[it].name);
    } else if (roll < 0.85) {
      const it = pick(['wire','book','screwdriver','patch']);
      addItem(it, 1);
      loot.push(ITEMS[it].name);
    } else if (roll < 0.95) {
      const it = pick(['watch','phoneBroken','necklace']);
      addItem(it, 1);
      loot.push('⭐ ' + ITEMS[it].name);
    } else {
      // Пусто
    }
  }
  if (loot.length) {
    toast('🔍 Найдено: ' + loot.join(', '), 'success');
    playSound('coin');
  } else {
    toast('Ничего не нашли...', 'info');
  }
  renderHUD();
  checkQuests();
  save();
}

// ─── ВИКТОРИНА ────────────────────────────────────────────────
function runQuiz(questions, needCorrect, callback) {
  let idx = 0;
  let correct = 0;

  function showQuestion() {
    if (idx >= questions.length) {
      closeModal('quiz');
      callback(correct >= needCorrect);
      return;
    }
    const q = questions[idx];
    const opts = q.a.map((text, i) =>
      `<button class="quiz-option" data-i="${i}">${text}</button>`
    ).join('');
    const modal = openModal('quiz', `📝 Вопрос ${idx + 1}/${questions.length}`, `
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">${opts}</div>
      <p class="hint" style="margin-top:12px;">Правильных: ${correct}/${idx}</p>
    `);
    modal.querySelectorAll('.quiz-option').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.i);
        if (i === q.correct) {
          btn.classList.add('correct');
          correct++;
          playSound('success');
        } else {
          btn.classList.add('wrong');
          modal.querySelectorAll('.quiz-option')[q.correct].classList.add('correct');
          playSound('fail');
        }
        modal.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        idx++;
        setTimeout(() => { closeModal('quiz'); setTimeout(showQuestion, 100); }, 900);
      };
    });
  }
  showQuestion();
}

// ─── QTE: стрелки ─────────────────────────────────────────────
function runQTE(callback) {
  const arrows = ['←','↑','→','↓'];
  const seq = [];
  for (let i = 0; i < 4; i++) seq.push(pick(arrows));
  let idx = 0;
  let failed = false;
  let timer = null;

  function render() {
    const html = seq.map((a, i) => {
      const cls = i < idx ? 'done' : (i === idx ? 'next' : '');
      return `<span class="qte-arrow ${cls}">${a}</span>`;
    }).join('');
    const modal = document.querySelector('.modal-overlay[data-id="qte"]');
    if (!modal) return;
    modal.querySelector('.modal-body').innerHTML = `
      <p style="text-align:center; font-size:16px; margin-bottom:12px;">
        Нажимай стрелки: ← ↑ → ↓
      </p>
      <div style="text-align:center;">${html}</div>
      <p class="hint" style="text-align:center; margin-top:16px;">Не ошибайся!</p>
    `;
  }

  openModal('qte', '⚡ QTE', '', {});
  render();

  const keyHandler = (e) => {
    if (failed) return;
    const keyMap = { 'ArrowLeft':'←', 'ArrowUp':'↑', 'ArrowRight':'→', 'ArrowDown':'↓' };
    const pressed = keyMap[e.key];
    if (!pressed) return;
    e.preventDefault();
    if (pressed === seq[idx]) {
      idx++;
      playSound('click');
      render();
      if (idx >= seq.length) {
        clearTimeout(timer);
        document.removeEventListener('keydown', keyHandler);
        playSound('success');
        closeModal('qte');
        callback(true);
      }
    } else {
      failed = true;
      clearTimeout(timer);
      document.removeEventListener('keydown', keyHandler);
      playSound('fail');
      closeModal('qte');
      callback(false);
    }
  };
  document.addEventListener('keydown', keyHandler);

  timer = setTimeout(() => {
    if (!failed && idx < seq.length) {
      failed = true;
      document.removeEventListener('keydown', keyHandler);
      playSound('fail');
      closeModal('qte');
      callback(false);
    }
  }, 4000);
}

// ─── РАБОТА: мини-игра ────────────────────────────────────────
function startWorkMinigame(job, callback) {
  // Простая мини-игра: клик по движущимся мишеням
  closeModal('location');
  const modal = openModal('work', `💼 ${job.name}`, `
    <canvas id="workCanvas" width="420" height="180" style="cursor:crosshair;"></canvas>
    <p style="text-align:center;">Кликайте по монеткам! 5 секунд.</p>
  `);
  const canvas = modal.querySelector('#workCanvas');
  const ctx = canvas.getContext('2d');
  const coins = [];
  let score = 0;
  let timeLeft = 5.0;
  let running = true;
  let lastTime = performance.now();

  function spawn() {
    coins.push({
      x: rand(30, 390),
      y: rand(30, 150),
      r: 18,
      life: 1.5,
      born: performance.now(),
    });
  }
  for (let i = 0; i < 3; i++) spawn();

  function draw(t) {
    if (!running) return;
    const dt = (t - lastTime) / 1000;
    lastTime = t;
    timeLeft -= dt;

    ctx.fillStyle = '#1a1410';
    ctx.fillRect(0, 0, 420, 180);

    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      const age = (t - c.born) / 1000;
      if (age > c.life || timeLeft <= 0) { coins.splice(i, 1); continue; }
      const alpha = age > c.life - 0.3 ? (c.life - age) / 0.3 : 1;
      ctx.globalAlpha = Math.max(0, alpha);
      ctx.font = '32px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪙', c.x, c.y);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 18px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Монет: ' + score, 10, 24);
    ctx.fillStyle = '#6bd66b';
    ctx.fillText('⏱ ' + Math.max(0, timeLeft).toFixed(1), 320, 24);

    if (timeLeft > 0 && chance(0.02)) spawn();

    if (timeLeft <= 0) {
      running = false;
      closeModal('work');
      callback(score);
      return;
    }
    requestAnimationFrame(draw);
  }

  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      if (Math.hypot(c.x - x, c.y - y) < c.r) {
        coins.splice(i, 1);
        score++;
        playSound('coin');
        break;
      }
    }
  };

  requestAnimationFrame(draw);
}

// ═══════════════════════════════════════════════════════════════
//  NPC СОБЫТИЯ
// ═══════════════════════════════════════════════════════════════
function triggerRandomEncounter() {
  const type = pick(['beggar','thug','rich','girl','passerby']);
  switch (type) {
    case 'beggar':   encounterBeggar(); break;
    case 'thug':     encounterThug(); break;
    case 'rich':     encounterRich(); break;
    case 'girl':     encounterGirl(); break;
    case 'passerby': encounterPasserby(); break;
  }
}

function npcPortrait(emoji, color) {
  return `<div style="width:80px;height:80px;border-radius:50%;background:${color};
    display:flex;align-items:center;justify-content:center;font-size:44px;margin:0 auto 12px;
    box-shadow:0 4px 20px rgba(0,0,0,0.5);border:3px solid rgba(255,255,255,0.15);">${emoji}</div>`;
}

function encounterBeggar() {
  openModal('npc', '🙏 Попрошайка', `
    ${npcPortrait('🧔','#4a3020')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Слышь, брат... Не найдётся полтинника? Второй день не ел.»
    </p>
  `, {
    buttons: [
      { label: 'Дам 50 ₽', cls: 'btn-primary', action: () => {
        if (S.money < 50) { toast('Нет денег', 'error'); closeModal('npc'); return; }
        S.money -= 50;
        S.reputation = clamp(S.reputation + 2, 0, 100);
        toast('+2 репутации', 'success');
        closeModal('npc');
        renderHUD();
      }},
      { label: 'Извини, самому не хватает', cls: 'btn-secondary', action: () => closeModal('npc') },
      { label: 'Дам еду', cls: 'btn-secondary', action: () => {
        if (countItem('bread') > 0) {
          removeItem('bread', 1);
          S.reputation = clamp(S.reputation + 3, 0, 100);
          toast('+3 репутации', 'success');
        } else {
          toast('Нет еды', 'error');
        }
        closeModal('npc');
      }},
    ]
  });
}

function encounterThug() {
  openModal('npc', '😠 Гопники', `
    ${npcPortrait('😠','#2a0a0a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Эй, лох! Гони телефон и деньги, если жить хочешь!»
    </p>
  `, {
    buttons: [
      { label: '💸 Отдать всё', cls: 'btn-danger', action: () => {
        const lost = Math.floor(S.money * 0.5);
        S.money -= lost;
        toast(`Потеряно ${fmt(lost)} ₽`, 'error');
        playSound('fail');
        closeModal('npc');
        renderHUD();
      }},
      { label: '🏃 Убежать (QTE)', cls: 'btn-primary', action: () => {
        closeModal('npc');
        runQTE((ok) => {
          if (ok) {
            toast('✅ Вы убежали!', 'success');
          } else {
            const lost = Math.floor(S.money * 0.4);
            S.money -= lost;
            S.health = clamp(S.health - 15, 0, 100);
            toast(`Побили. −15 HP, −${fmt(lost)} ₽`, 'error');
            playSound('fail');
            renderHUD();
          }
        });
      }},
      { label: '👊 Драться', cls: 'btn-danger', action: () => {
        closeModal('npc');
        if (chance(0.4)) {
          S.money += 200;
          toast('Победа! +200 ₽', 'success');
          playSound('success');
        } else {
          S.health = clamp(S.health - 30, 0, 100);
          toast('Побили. −30 HP', 'error');
          playSound('fail');
        }
        renderHUD();
      }},
    ]
  });
}

function encounterRich() {
  openModal('npc', '🤵 Богатый человек', `
    ${npcPortrait('🤵','#1a2244')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Бедняга... Вот тебе немного. Иди поешь.»
    </p>
  `, {
    buttons: [
      { label: '🙏 Взять милостыню', cls: 'btn-primary', action: () => {
        const m = randInt(100, 400);
        S.money += m;
        toast(`Получено ${m} ₽`, 'success');
        playSound('coin');
        closeModal('npc');
        renderHUD();
      }},
      { label: 'Отказаться', cls: 'btn-secondary', action: () => {
        S.reputation = clamp(S.reputation + 1, 0, 100);
        toast('+1 репутации (гордость)', 'info');
        closeModal('npc');
      }},
    ]
  });
}

function encounterGirl() {
  openModal('npc', '👩 Девушка в беде', `
    ${npcPortrait('👩','#4a2a3a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Помогите! У меня украли сумку, там были все документы!»
    </p>
  `, {
    buttons: [
      { label: 'Помочь', cls: 'btn-primary', action: () => {
        closeModal('npc');
        if (chance(0.7)) {
          S.reputation = clamp(S.reputation + 5, 0, 100);
          const r = randInt(200, 500);
          S.money += r;
          toast(`💕 Она отблагодарила ${r} ₽ и +5 репутации`, 'success');
          playSound('success');
        } else {
          toast('Не удалось помочь...', 'info');
        }
        renderHUD();
      }},
      { label: 'Пройти мимо', cls: 'btn-secondary', action: () => closeModal('npc') },
    ]
  });
}

function encounterPasserby() {
  openModal('npc', '🚶 Прохожий', `
    ${npcPortrait('🧑','#3a3a4a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Вы не подскажете, как пройти к вокзалу?»
    </p>
  `, {
    buttons: [
      { label: 'Подсказать', cls: 'btn-primary', action: () => {
        S.reputation = clamp(S.reputation + 1, 0, 100);
        toast('+1 репутации', 'info');
        closeModal('npc');
      }},
      { label: 'Не знаю', cls: 'btn-secondary', action: () => closeModal('npc') },
    ]
  });
}

// ═══════════════════════════════════════════════════════════════
//  КВЕСТЫ
// ═══════════════════════════════════════════════════════════════
function checkQuests() {
  if (!S) return;
  const q = S.quests;
  function complete(id) {
    if (q[id] !== 'active') return;
    q[id] = 'done';
    const quest = QUESTS[id];
    if (quest.reward) {
      S.money += quest.reward;
      toast(`📜 Квест выполнен: ${quest.title} (+${fmt(quest.reward)} ₽)`, 'gold');
    } else {
      toast(`📜 Квест выполнен: ${quest.title}`, 'gold');
    }
    playSound('success');
  }

  // Прогресс
  if (q.tutorial_dig === 'active' && S.inventory.some(s => s.itemId !== 'bottle' && s.itemId !== 'rag')) {
    complete('tutorial_dig');
    q.tutorial_sell = 'active';
  }
  if (q.tutorial_sell === 'active' && (S.totalEarned || 0) > 0) {
    complete('tutorial_sell');
    q.tutorial_eat = 'active';
  }
  if (q.tutorial_eat === 'active' && S.satiety > 70) {
    complete('tutorial_eat');
  }
  if (q.get_shelter !== 'done' && S.housing !== 'street' && S.housing !== 'shelter') {
    if (!q.get_shelter) q.get_shelter = 'active';
    complete('get_shelter');
  }
  if (q.get_job !== 'done' && S.currentJob) {
    if (!q.get_job) q.get_job = 'active';
    complete('get_job');
  }
  if (q.get_school !== 'done' && S.educationLevel >= 1) {
    if (!q.get_school) q.get_school = 'active';
    complete('get_school');
  }
  if (q.get_college !== 'done' && S.educationLevel >= 2) {
    if (!q.get_college) q.get_college = 'active';
    complete('get_college');
  }
  if (q.get_university !== 'done' && S.educationLevel >= 3) {
    if (!q.get_university) q.get_university = 'active';
    complete('get_university');
  }
  if (q.get_apartment !== 'done' && ['studio','penthouse'].includes(S.housing)) {
    if (!q.get_apartment) q.get_apartment = 'active';
    complete('get_apartment');
  }
  if (q.get_car !== 'done' && ['newcar','luxury'].includes(S.transport)) {
    if (!q.get_car) q.get_car = 'active';
    complete('get_car');
  }
  if (q.get_business !== 'done' && S.businesses.length > 0) {
    if (!q.get_business) q.get_business = 'active';
    complete('get_business');
  }
  if (q.millionaire !== 'done' && S.money >= 1000000) {
    if (!q.millionaire) q.millionaire = 'active';
    complete('millionaire');
  }
  if (q.final !== 'done' && S.money >= 10000000 && S.housing === 'penthouse' && S.businesses.length > 0) {
    if (!q.final) q.final = 'active';
    complete('final');
    showFinalCutscene();
  }

  save();
}

function showFinalCutscene() {
  openModal('final', '🏆 Финал', `
    <div style="text-align:center; padding:20px 0;">
      <div style="font-size:80px; margin-bottom:20px;">👑</div>
      <h2 style="color:var(--gold); font-size:28px; margin-bottom:16px; text-shadow:0 0 20px rgba(255,200,60,0.5);">
        Вы сделали это!
      </h2>
      <p style="font-size:16px; line-height:1.8;">
        Ещё вчера вы копались в мусорке.<br>
        Сегодня у вас пентхаус, бизнес и миллионы.<br><br>
        <strong>Из грязи в князи — вы прошли этот путь.</strong>
      </p>
      <p style="margin-top:20px; color:var(--text-dim); font-style:italic;">
        Итог: ${fmt(S.money)} ₽ · День ${S.day} · Репутация ${S.reputation}/100
      </p>
    </div>
  `, {
    buttons: [
      { label: '👑 Продолжить играть', cls: 'btn-primary', action: () => closeModal('final') },
      { label: '🔄 Новая игра', cls: 'btn-secondary', action: () => {
        localStorage.removeItem(SAVE_KEY);
        location.reload();
      }},
    ]
  });
}

// ═══════════════════════════════════════════════════════════════
//  ПАНЕЛИ ИНВЕНТАРЯ / ПЕРСОНАЖА / ЖУРНАЛА / НАСТРОЕК
// ═══════════════════════════════════════════════════════════════
function openInventory() {
  let slots = '';
  const totalSlots = 30;
  for (let i = 0; i < totalSlots; i++) {
    const item = S.inventory[i];
    if (!item) {
      slots += `<div class="inv-slot empty"></div>`;
    } else {
      const it = ITEMS[item.itemId];
      slots += `<div class="inv-slot" onclick="openItemInfo('${item.itemId}')" title="${it.name}">
        ${it.emoji}
        ${item.qty > 1 ? `<span class="qty">${item.qty}</span>` : ''}
      </div>`;
    }
  }
  openModal('inventory', '🎒 Инвентарь', `
    <div class="inv-grid">${slots}</div>
    <p class="hint">Общая стоимость: ${fmt(totalItemValue())} ₽</p>
  `);
}

function openItemInfo(itemId) {
  const it = ITEMS[itemId];
  if (!it) return;
  let actions = '';
  if (it.type === 'food') {
    actions += `<button class="btn btn-primary" onclick="eatItem('${itemId}')">🍽️ Съесть</button>`;
  }
  if (it.type === 'cloth') {
    actions += `<button class="btn btn-primary" onclick="equipItem('${itemId}')">👕 Надеть</button>`;
  }
  if (it.price > 0) {
    actions += `<button class="btn btn-secondary" onclick="sellItem('${itemId}')">💰 Продать (${Math.round(it.price*0.6)} ₽)</button>`;
  }
  openModal('iteminfo', `${it.emoji} ${it.name}`, `
    <p>Тип: ${it.type}</p>
    <p>Цена: ${fmt(it.price)} ₽</p>
    ${it.satiety ? `<p>Сытость: +${it.satiety}</p>` : ''}
    ${it.health ? `<p>Здоровье: ${it.health > 0 ? '+' : ''}${it.health}</p>` : ''}
    ${it.energy ? `<p>Энергия: +${it.energy}</p>` : ''}
    ${it.rep ? `<p>Репутация: +${it.rep}</p>` : ''}
    <div style="display:flex; gap:8px; margin-top:16px; flex-wrap:wrap;">${actions}</div>
  `, {
    buttons: [{ label: 'Назад', cls: 'btn-secondary', action: () => { closeModal('iteminfo'); openInventory(); } }]
  });
}

function equipItem(itemId) {
  const it = ITEMS[itemId];
  if (!it || it.type !== 'cloth') return;
  const slot = it.slot;
  if (!slot) { toast('Нельзя надеть', 'error'); return; }
  // Возвращаем старую вещь в инвентарь (без condition), ставим новую
  const old = S.equipment[slot];
  if (old) {
    // Просто выбрасываем старую
  }
  S.equipment[slot] = { itemId, condition: 100 };
  removeItem(itemId, 1);
  S.reputation = clamp(S.reputation + (it.rep || 0) * 0.2, 0, 100);
  toast(`👕 Надето: ${it.name}`, 'success');
  playSound('success');
  renderHUD();
  closeModal('iteminfo');
  save();
}

function openCharacter() {
  const slots = [
    ['head', '🎩 Голова'],
    ['body', '👕 Тело'],
    ['legs', '👖 Ноги'],
    ['shoes', '👟 Обувь'],
    ['accessory', '💍 Аксессуар'],
  ];
  let html = `<p><strong>Уровень ${S.level}</strong> · XP: ${S.xp}</p>`;
  html += `<p>Репутация: ${Math.round(S.reputation)}/100</p>`;
  html += `<p>Специальность: ${SPECIALTIES[S.specialty] || '—'}</p>`;
  html += `<p>Работа: ${S.currentJob ? JOBS[S.currentJob].name : '—'}</p>`;
  html += `<div class="inv-grid">`;
  for (const [slot, label] of slots) {
    const eq = S.equipment[slot];
    if (eq) {
      const it = ITEMS[eq.itemId];
      html += `<div class="inv-slot" title="${label}: ${it.name} (${eq.condition}%)">
        ${it.emoji}
        <span class="cond">${eq.condition}%</span>
      </div>`;
    } else {
      html += `<div class="inv-slot empty" title="${label}"></div>`;
    }
  }
  html += `</div>`;
  openModal('character', '👤 Персонаж', html);
}

function openQuests() {
  let html = '';
  for (const [id, status] of Object.entries(S.quests)) {
    const q = QUESTS[id];
    if (!q) continue;
    const icon = status === 'done' ? '✅' : status === 'active' ? '⏳' : '🔒';
    html += `
      <div class="list-row">
        <div class="info">
          <div class="name">${icon} ${q.title}</div>
          <div class="desc">${q.desc}${q.reward ? ' · Награда: ' + fmt(q.reward) + ' ₽' : ''}</div>
        </div>
      </div>`;
  }
  if (!html) html = '<p class="hint">Квестов пока нет.</p>';
  openModal('quests', '📜 Журнал квестов', html);
}

function openSettings() {
  openModal('settings', '⚙️ Настройки', `
    <p>Громкость: <input type="range" min="0" max="100" value="${Math.round(VOLUME.master * 100)}" id="volSlider" style="width:200px; vertical-align:middle;"></p>
    <p>Язык: 🇷🇺 Русский</p>
    <p>Игра: Из грязи в князи · v1.0</p>
    <p class="hint">Прогресс автосохраняется каждые 30 секунд и при закрытии.</p>
  `, {
    buttons: [
      { label: '💾 Сохранить игру', cls: 'btn-primary', action: () => { save(); toast('💾 Сохранено', 'success'); } },
      { label: '🗑️ Сбросить прогресс', cls: 'btn-danger', action: () => {
        if (confirm('Сбросить прогресс? Это нельзя отменить.')) {
          localStorage.removeItem(SAVE_KEY);
          location.reload();
        }
      }},
      { label: 'Закрыть', cls: 'btn-secondary', action: () => closeModal('settings') },
    ]
  });
  setTimeout(() => {
    const slider = document.getElementById('volSlider');
    if (slider) slider.oninput = (e) => { VOLUME.master = e.target.value / 100; };
  }, 50);
}

// ═══════════════════════════════════════════════════════════════
//  МЕНЮ БОКОВОЙ ПАНЕЛИ
// ═══════════════════════════════════════════════════════════════
function openPanel(name) {
  playSound('click');
  switch (name) {
    case 'inventory': openInventory(); break;
    case 'craft':     openCraft(); break;
    case 'work':      openModal('work_menu', '💼 Работа', `
                        <p>Идите на <strong>Завод</strong> 🏭 (рабочие) или <strong>Офис</strong> 🏢 (умные).</p>
                        <p>Текущая работа: <strong>${S.currentJob ? JOBS[S.currentJob].name : 'нет'}</strong></p>
                      `); break;
    case 'shop':      openModal('shop_menu', '🛒 Магазин', `<p>Идите в <strong>Магазин</strong> 🛒 на карте, чтобы купить еду и одежду.</p>`); break;
    case 'flea':      openModal('flea_menu', '🏪 Барахолка', `<p>Идите на <strong>Барахолку</strong> 🏪 на карте, чтобы продать хлам.</p>`); break;
    case 'education': openModal('edu_menu', '🎓 Обучение', `<p>Идите в <strong>Школу</strong> 🏫, <strong>Колледж</strong> 🎓 или <strong>Вуз</strong> 🏛️.</p>`); break;
    case 'housing':   openModal('housing_menu', '🏠 Жильё', `<p>Идите в <strong>Ночлежку</strong> 🛏️, чтобы сменить жильё.</p>`); break;
    case 'transport': openModal('transport_menu', '🚗 Транспорт', `<p>Идите в <strong>Автосалон</strong> 🚗, чтобы купить транспорт.</p>`); break;
    case 'business':  openModal('business_menu', '📊 Бизнес', `<p>Идите в <strong>Бизнес-центр</strong> 💼, чтобы открыть бизнес.</p>`); break;
    case 'character': openCharacter(); break;
    case 'quests':    openQuests(); break;
    case 'settings':  openSettings(); break;
  }
}

// ═══════════════════════════════════════════════════════════════
//  СТАРТ
// ═══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Кнопки стартового экрана
  document.getElementById('btnNewGame').onclick = () => {
    if (hasSave() && !confirm('Есть сохранение. Начать новую игру? Текущий прогресс будет потерян.')) return;
    startNewGame();
  };
  document.getElementById('btnContinue').onclick = continueGame;
  if (hasSave()) {
    document.getElementById('btnContinue').style.display = 'inline-block';
  }

  // Кнопки боковой панели
  document.querySelectorAll('.side-btn').forEach(btn => {
    btn.onclick = () => openPanel(btn.dataset.panel);
  });

  // Инициализация аудио при первом клике
  document.addEventListener('click', () => {
    if (!audioCtx) initAudio();
  }, { once: true });

  // Автосохранение при закрытии
  window.addEventListener('beforeunload', () => { if (S) save(); });
});

function startNewGame() {
  S = createNewState();
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').style.display = 'grid';
  renderMap();
  renderHUD();
  startTick();
  if (saveTimer) clearInterval(saveTimer);
  saveTimer = setInterval(save, 30000);
  save();
  setTimeout(() => toast('💡 Идите на Мусорку 🗑️, чтобы найти хлам.', 'info'), 400);
  setTimeout(() => toast('💰 Продавайте хлам на Барахолке 🏪.', 'info'), 4000);
  setTimeout(() => toast('🍞 Покупайте еду в Магазине 🛒.', 'info'), 8000);
}

function continueGame() {
  const data = loadSave();
  if (!data) { toast('Сохранение не найдено', 'error'); return; }
  S = data;
  // Дефолты для совместимости
  if (!S.inventory) S.inventory = [];
  if (!S.quests) S.quests = {};
  if (!S.equipment) S.equipment = { head:null, body:null, legs:null, shoes:null, accessory:null };
  if (!S.businesses) S.businesses = [];
  if (S.totalEarned === undefined) S.totalEarned = 0;
  S.traveling = false;
  S.sleeping = false;
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').style.display = 'grid';
  renderMap();
  renderHUD();
  startTick();
  if (saveTimer) clearInterval(saveTimer);
  saveTimer = setInterval(save, 30000);
  toast('💾 Игра загружена', 'success');
}

// Экспорт глобальных функций для inline-обработчиков
window.travelTo = travelTo;
window.startDigging = startDigging;
window.popAndSell = popAndSell;
window.buyItem = buyItem;
window.sellItem = sellItem;
window.eatItem = eatItem;
window.equipItem = equipItem;
window.openItemInfo = openItemInfo;
window.takeExam = takeExam;
window.setSpecialty = setSpecialty;
window.doWork = doWork;
window.buyHousing = buyHousing;
window.buyTransport = buyTransport;
window.buyBusiness = buyBusiness;
window.sleepNow = sleepNow;
window.restCafe = restCafe;
window.begMoney = begMoney;
window.washWindows = washWindows;
window.makeDeposit = makeDeposit;
window.doCraft = doCraft;
