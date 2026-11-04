'use strict';

// ═══════════════════════════════════════════════════════════════
//  «Из грязи в князи» — v2 (карта, SVG-иконки, туториал, мобилки)
//  Блоки: КОНСТАНТЫ → SVG → STATE → КАРТА → ТУТОРИАЛ →
//         ЛОКАЦИИ → СИСТЕМЫ → МИНИ-ИГРЫ → NPC → UI → СТАРТ
// ═══════════════════════════════════════════════════════════════

// ─── SVG-ИКОНКИ ПРЕДМЕТОВ ─────────────────────────────────────
const ITEM_SVGS = {
  bottle: `<svg viewBox="0 0 40 40"><rect x="17" y="4" width="6" height="4" fill="#3a2a1a"/><rect x="16" y="8" width="8" height="3" fill="#3a2a1a"/><rect x="14" y="11" width="12" height="24" rx="2" fill="#4a8a4a"/><rect x="16" y="13" width="8" height="20" fill="#6aba6a" opacity="0.4"/><rect x="15" y="16" width="10" height="8" fill="#f0e6d2" opacity="0.35"/><rect x="15" y="16" width="10" height="8" stroke="#3a2a1a" stroke-width="0.5" fill="none"/></svg>`,
  rag: `<svg viewBox="0 0 40 40"><path d="M6,10 Q14,8 20,9 L34,13 Q37,18 33,25 L29,33 Q20,36 10,32 L5,26 Q4,18 6,10 Z" fill="#a89680"/><path d="M8,14 Q14,12 20,14" stroke="#6a5040" stroke-width="0.8" fill="none"/><path d="M8,20 Q14,18 20,20" stroke="#6a5040" stroke-width="0.8" fill="none"/><path d="M8,26 Q14,24 20,26" stroke="#6a5040" stroke-width="0.8" fill="none"/></svg>`,
  thread: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="20" rx="12" ry="14" fill="#c8b898"/><ellipse cx="20" cy="20" rx="9" ry="10" fill="#e0d0b0"/><path d="M8,26 Q20,20 32,26" stroke="#884422" stroke-width="1.5" fill="none"/><path d="M10,20 L30,20" stroke="#884422" stroke-width="1" stroke-dasharray="2 2"/></svg>`,
  wire: `<svg viewBox="0 0 40 40"><path d="M6,20 Q10,10 20,14 Q30,18 34,12" stroke="#c0c0c0" stroke-width="2" fill="none"/><path d="M6,26 Q12,16 22,20 Q30,24 34,18" stroke="#a0a0a0" stroke-width="2" fill="none"/><circle cx="6" cy="20" r="2" fill="#888"/><circle cx="34" cy="12" r="2" fill="#888"/></svg>`,
  scrap: `<svg viewBox="0 0 40 40"><polygon points="10,10 22,8 26,18 20,26 12,24" fill="#707078"/><polygon points="24,14 34,18 30,30 22,28" fill="#909098"/><circle cx="15" cy="16" r="2" fill="#404048"/><circle cx="26" cy="22" r="1.5" fill="#404048"/></svg>`,
  patch: `<svg viewBox="0 0 40 40"><rect x="8" y="8" width="24" height="24" rx="2" fill="#c8a878"/><path d="M8,12 L32,12 M8,20 L32,20 M8,28 L32,28" stroke="#6a4a2a" stroke-width="1"/><path d="M12,8 L12,32 M20,8 L20,32 M28,8 L28,32" stroke="#6a4a2a" stroke-width="0.6" stroke-dasharray="2 3"/></svg>`,
  phoneBroken: `<svg viewBox="0 0 40 40"><rect x="11" y="6" width="18" height="28" rx="3" fill="#2a2a3a"/><rect x="13" y="10" width="14" height="18" fill="#1a1a2a"/><path d="M14,14 L26,22 M18,26 L22,28" stroke="#6bd66b" stroke-width="0.5"/><path d="M13,10 L20,18 L15,22 L25,16" stroke="#e85050" stroke-width="1" fill="none" opacity="0.8"/></svg>`,
  phoneWorking: `<svg viewBox="0 0 40 40"><rect x="11" y="6" width="18" height="28" rx="3" fill="#3a3a5a"/><rect x="13" y="10" width="14" height="18" fill="#88d8ff"/><circle cx="20" cy="31" r="1.5" fill="#6bd66b"/><rect x="16" y="8" width="8" height="1" rx="1" fill="#888"/></svg>`,
  watch: `<svg viewBox="0 0 40 40"><rect x="16" y="4" width="8" height="6" fill="#4a3a2a"/><rect x="16" y="30" width="8" height="6" fill="#4a3a2a"/><circle cx="20" cy="20" r="11" fill="#c0a050" stroke="#6a4a1a" stroke-width="1.5"/><circle cx="20" cy="20" r="8" fill="#f0e0b0"/><path d="M20,20 L20,15 M20,20 L24,22" stroke="#1a1a2a" stroke-width="1.5"/></svg>`,
  necklace: `<svg viewBox="0 0 40 40"><path d="M6,10 Q14,20 20,26 Q26,20 34,10" stroke="#c0a050" stroke-width="2" fill="none"/><circle cx="20" cy="28" r="4" fill="#e85050" stroke="#6a1a1a" stroke-width="1"/><circle cx="20" cy="28" r="1.5" fill="#ffaaaa"/></svg>`,
  moonshine: `<svg viewBox="0 0 40 40"><path d="M14,10 L26,10 L27,34 L13,34 Z" fill="#a8d8a0" opacity="0.7"/><rect x="13" y="8" width="14" height="4" rx="1" fill="#6a4a2a"/><rect x="14" y="18" width="12" height="8" fill="#f0e6d2" opacity="0.5"/><path d="M16,20 L16,24 M18,20 L18,24" stroke="#4a3a2a" stroke-width="1"/></svg>`,
  book: `<svg viewBox="0 0 40 40"><rect x="8" y="6" width="24" height="28" rx="1" fill="#8a3a3a"/><rect x="10" y="8" width="20" height="24" fill="#e8d8b8"/><path d="M12,14 L28,14 M12,18 L28,18 M12,22 L24,22" stroke="#6a4a2a" stroke-width="0.8"/><rect x="8" y="6" width="3" height="28" fill="#6a2020"/></svg>`,
  screwdriver: `<svg viewBox="0 0 40 40"><rect x="18" y="4" width="4" height="12" fill="#c8a878"/><rect x="17" y="14" width="6" height="2" fill="#888"/><polygon points="17,16 23,16 21,32 19,32" fill="#a0a0b0"/></svg>`,
  bread: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="22" rx="14" ry="10" fill="#c88840"/><ellipse cx="20" cy="20" rx="14" ry="9" fill="#e0a860"/><path d="M10,18 Q14,14 18,17 M16,15 Q20,12 24,15 M22,17 Q26,14 30,18" stroke="#8a5a2a" stroke-width="1.2" fill="none"/></svg>`,
  water: `<svg viewBox="0 0 40 40"><path d="M12,8 L28,8 L26,34 L14,34 Z" fill="#88c8ee" opacity="0.8"/><path d="M13,16 L27,16" stroke="#5aa8ce" stroke-width="1"/><rect x="14" y="8" width="12" height="3" fill="#5aa8ce"/></svg>`,
  soup: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="26" rx="15" ry="5" fill="#6a4a2a"/><ellipse cx="20" cy="24" rx="14" ry="4" fill="#c8a060"/><ellipse cx="20" cy="22" rx="12" ry="3" fill="#e8a848"/><circle cx="15" cy="22" r="1.5" fill="#6a8a3a"/><circle cx="22" cy="21" r="1.2" fill="#aa5a3a"/><path d="M16,18 Q17,14 16,10 M20,18 Q21,13 20,9 M24,18 Q25,14 24,10" stroke="#888" stroke-width="1" fill="none" opacity="0.6"/></svg>`,
  salad: `<svg viewBox="0 0 40 40"><ellipse cx="20" cy="24" rx="14" ry="8" fill="#e8e0b0"/><circle cx="14" cy="22" r="3" fill="#4a9a3a"/><circle cx="22" cy="21" r="3.5" fill="#6aba4a"/><circle cx="27" cy="24" r="2.5" fill="#4a9a3a"/><circle cx="18" cy="26" r="2" fill="#e85050"/><circle cx="24" cy="25" r="1.5" fill="#e85050"/></svg>`,
  shawarma: `<svg viewBox="0 0 40 40"><path d="M12,10 L28,10 Q32,14 30,22 L28,32 Q20,35 12,32 L10,22 Q8,14 12,10 Z" fill="#e8c878"/><path d="M12,14 Q20,17 28,14" stroke="#8a4a1a" stroke-width="1.5" fill="none"/><path d="M12,20 Q20,23 28,20" stroke="#8a4a1a" stroke-width="1.5" fill="none"/><path d="M12,26 Q20,29 28,26" stroke="#8a4a1a" stroke-width="1.5" fill="none"/><circle cx="20" cy="17" r="1" fill="#4a9a3a"/><circle cx="16" cy="23" r="1" fill="#e85050"/><circle cx="24" cy="29" r="1" fill="#e85050"/></svg>`,
  energy: `<svg viewBox="0 0 40 40"><rect x="13" y="8" width="14" height="26" rx="2" fill="#4a4a4a"/><rect x="13" y="12" width="14" height="20" fill="#e85050"/><path d="M20,14 L16,22 L19,22 L18,30 L24,20 L21,20 Z" fill="#ffcc44"/><rect x="15" y="8" width="10" height="3" fill="#a0a0a0"/></svg>`,
  tornshirt: `<svg viewBox="0 0 40 40"><path d="M12,8 L16,6 L20,10 L24,6 L28,8 L34,14 L30,18 L28,16 L28,34 L12,34 L12,16 L10,18 L6,14 Z" fill="#6a5040"/><path d="M16,20 L18,24 M22,22 L20,28 M24,18 L22,22" stroke="#3a2010" stroke-width="1" fill="none"/><path d="M12,34 L14,28 L16,34" fill="#3a2010"/></svg>`,
  cap: `<svg viewBox="0 0 40 40"><path d="M8,22 Q8,10 20,10 Q32,10 32,22 L32,24 L8,24 Z" fill="#3a5a8a"/><path d="M6,26 Q6,22 12,22 L28,22 Q34,22 34,26 L34,28 L6,28 Z" fill="#2a4a7a"/><circle cx="20" cy="12" r="1.5" fill="#6a8aba"/></svg>`,
  capGood: `<svg viewBox="0 0 40 40"><path d="M8,22 Q8,10 20,10 Q32,10 32,22 L32,24 L8,24 Z" fill="#2a1a10"/><path d="M6,26 Q6,22 12,22 L28,22 Q34,22 34,26 L34,28 L6,28 Z" fill="#1a0a00"/><circle cx="20" cy="12" r="1.5" fill="#ffcc44"/><rect x="18" y="9" width="4" height="1" fill="#ffcc44"/></svg>`,
  jacket: `<svg viewBox="0 0 40 40"><path d="M10,8 L15,6 L20,12 L25,6 L30,8 L34,16 L30,18 L29,16 L29,36 L11,36 L11,16 L10,18 L6,16 Z" fill="#6a4a3a"/><rect x="18" y="12" width="4" height="24" fill="#4a2a1a"/><circle cx="20" cy="20" r="1" fill="#c8a878"/><circle cx="20" cy="26" r="1" fill="#c8a878"/></svg>`,
  suitJacket: `<svg viewBox="0 0 40 40"><path d="M10,8 L15,6 L20,14 L25,6 L30,8 L34,16 L30,18 L29,16 L29,36 L11,36 L11,16 L10,18 L6,16 Z" fill="#1a1a2a"/><path d="M15,6 L20,14 L25,6 L25,14 L20,18 L15,14 Z" fill="#e8e0d0"/><path d="M18,16 L20,22 L22,16" fill="#8a3a3a"/><circle cx="20" cy="24" r="1" fill="#ffcc44"/><circle cx="20" cy="30" r="1" fill="#ffcc44"/></svg>`,
  jeans: `<svg viewBox="0 0 40 40"><path d="M10,6 L30,6 L29,36 L22,36 L21,18 L19,18 L18,36 L11,36 Z" fill="#3a4a7a"/><rect x="10" y="6" width="20" height="4" fill="#2a3a5a"/><path d="M14,12 L18,12 M22,12 L26,12" stroke="#1a2a4a" stroke-width="1"/></svg>`,
  suitPants: `<svg viewBox="0 0 40 40"><path d="M10,6 L30,6 L29,36 L22,36 L21,18 L19,18 L18,36 L11,36 Z" fill="#1a1a2a"/><rect x="10" y="6" width="20" height="4" fill="#0a0a1a"/><path d="M20,10 L20,36" stroke="#3a3a4a" stroke-width="0.5"/></svg>`,
  sneakers: `<svg viewBox="0 0 40 40"><path d="M6,22 L6,30 Q6,32 8,32 L34,32 Q36,32 36,30 L36,26 L30,24 L24,20 L16,20 L12,22 Z" fill="#3a3a3a"/><path d="M8,24 L32,24" stroke="#e8e8e8" stroke-width="1.5"/><path d="M14,20 L16,24 M18,20 L20,24 M22,20 L24,24" stroke="#888" stroke-width="1"/></svg>`,
  dressShoes: `<svg viewBox="0 0 40 40"><path d="M6,22 L6,30 Q6,32 8,32 L34,32 Q36,32 36,30 L36,28 L28,24 L22,20 L14,20 L8,22 Z" fill="#1a0a00"/><path d="M8,30 L34,30" stroke="#a0a0a0" stroke-width="0.5"/><circle cx="16" cy="24" r="1" fill="#ffcc44"/></svg>`,
  goldWatch: `<svg viewBox="0 0 40 40"><rect x="16" y="4" width="8" height="6" fill="#6a4a1a"/><rect x="16" y="30" width="8" height="6" fill="#6a4a1a"/><circle cx="20" cy="20" r="11" fill="#c0a050" stroke="#6a4a1a" stroke-width="1.5"/><circle cx="20" cy="20" r="9" fill="#ffdd66"/><circle cx="20" cy="20" r="8" fill="#f0e0b0"/><path d="M20,20 L20,15 M20,20 L24,22" stroke="#1a1a2a" stroke-width="1.5"/><circle cx="20" cy="20" r="1" fill="#1a1a2a"/></svg>`,
};

function itemSvg(itemId, size) {
  const svg = ITEM_SVGS[itemId] || `<svg viewBox="0 0 40 40"><rect x="10" y="10" width="20" height="20" fill="#888" rx="2"/></svg>`;
  if (size) return svg.replace('<svg ', `<svg width="${size}" height="${size}" `);
  return svg;
}

// ─── ЛОКАЦИИ ──────────────────────────────────────────────────
const LOCATIONS = {
  street:     { name: 'Улица',         emoji: '🛣️', x: 50, y: 52, type: 'street' },
  dump1:      { name: 'Мусорка',       emoji: '🗑️', x: 68, y: 76, type: 'dump', dumpId: 'dump1' },
  dump2:      { name: 'Мусорка (парк)',emoji: '🗑️', x: 32, y: 74, type: 'dump', dumpId: 'dump2' },
  dump3:      { name: 'Мусорка',       emoji: '🗑️', x: 14, y: 86, type: 'dump', dumpId: 'dump3' },
  dump4:      { name: 'Свалка',        emoji: '🗑️', x: 86, y: 86, type: 'dump', dumpId: 'dump4' },
  park:       { name: 'Парк',          emoji: '🌳', x: 20, y: 62, type: 'dig' },
  abandoned:  { name: 'Заброшка',      emoji: '🏚️', x: 10, y: 50, type: 'dig' },
  shop:       { name: 'Магазин',       emoji: '🛒', x: 40, y: 40, type: 'shop' },
  flea:       { name: 'Барахолка',     emoji: '🏪', x: 55, y: 44, type: 'flea' },
  school:     { name: 'Школа',         emoji: '🏫', x: 22, y: 24, type: 'school' },
  college:    { name: 'Колледж',       emoji: '🎓', x: 40, y: 20, type: 'college' },
  university: { name: 'Вуз',           emoji: '🏛️', x: 15, y: 12, type: 'university' },
  factory:    { name: 'Завод',         emoji: '🏭', x: 84, y: 46, type: 'factory' },
  office:     { name: 'Офис',          emoji: '🏢', x: 70, y: 22, type: 'office' },
  cafe:       { name: 'Кафе',          emoji: '☕', x: 60, y: 34, type: 'cafe' },
  bank:       { name: 'Банк',          emoji: '🏦', x: 78, y: 34, type: 'bank' },
  shelter:    { name: 'Ночлежка',      emoji: '🛏️', x: 20, y: 88, type: 'housing' },
  dealership: { name: 'Автосалон',     emoji: '🚗', x: 88, y: 22, type: 'transport' },
  business:   { name: 'Бизнес-центр',  emoji: '💼', x: 86, y: 10, type: 'business' },
};

const DUMPS = {
  dump1: { maxFill: 100, baseChance: 0.7 },
  dump2: { maxFill: 100, baseChance: 0.65 },
  dump3: { maxFill: 100, baseChance: 0.6 },
  dump4: { maxFill: 100, baseChance: 0.8 },
};

// ─── ПРЕДМЕТЫ ─────────────────────────────────────────────────
const ITEMS = {
  bottle:      { name:'Бутылка',           type:'material', price: 8 },
  rag:         { name:'Тряпка',            type:'material', price: 6 },
  thread:      { name:'Нитки',             type:'material', price: 12 },
  wire:        { name:'Проволока',         type:'material', price: 18 },
  scrap:       { name:'Металлолом',        type:'material', price: 15 },
  patch:       { name:'Заплатка',          type:'material', price: 40 },
  phoneBroken: { name:'Сломанный телефон', type:'valuable', price: 800 },
  phoneWorking:{ name:'Телефон',           type:'valuable', price: 2500 },
  watch:       { name:'Часы',              type:'valuable', price: 1500 },
  necklace:    { name:'Украшение',         type:'valuable', price: 1200 },
  moonshine:   { name:'Самогон',           type:'valuable', price: 250 },
  book:        { name:'Книга',             type:'valuable', price: 250 },
  screwdriver: { name:'Отвёртка',          type:'tool',     price: 300 },
  bread:       { name:'Хлеб',              type:'food', price: 30, satiety: 18, health: -1 },
  water:       { name:'Вода',              type:'food', price: 20, satiety: 8,  health: 1, energy: 3 },
  soup:        { name:'Суп',               type:'food', price: 150, satiety: 32, health: 5 },
  salad:       { name:'Салат',             type:'food', price: 200, satiety: 22, health: 10 },
  shawarma:    { name:'Шаурма',            type:'food', price: 180, satiety: 38, health: -5 },
  energy:      { name:'Энергетик',         type:'food', price: 120, satiety: 0, health: -3, energy: 25 },
  tornshirt:   { name:'Рваная рубаха',     type:'cloth', slot:'body', price: 0, rep: 0 },
  cap:         { name:'Кепка',             type:'cloth', slot:'head', price: 300, rep: 1 },
  capGood:     { name:'Кожаная кепка',     type:'cloth', slot:'head', price: 1200, rep: 4 },
  jacket:      { name:'Куртка',            type:'cloth', slot:'body', price: 800, rep: 3 },
  suitJacket:  { name:'Пиджак',            type:'cloth', slot:'body', price: 8000, rep: 10 },
  jeans:       { name:'Джинсы',            type:'cloth', slot:'legs', price: 1200, rep: 3 },
  suitPants:   { name:'Брюки',             type:'cloth', slot:'legs', price: 6000, rep: 8 },
  sneakers:    { name:'Кроссовки',         type:'cloth', slot:'shoes', price: 2000, rep: 4 },
  dressShoes:  { name:'Туфли',             type:'cloth', slot:'shoes', price: 9000, rep: 10 },
  goldWatch:   { name:'Золотые часы',      type:'cloth', slot:'accessory', price: 25000, rep: 15 },
};

const RECIPES = {
  patch:     { name:'Заплатка',           items:{ rag:1, thread:1 },             result:{ itemId:'patch', qty:1 },    energy:5,  desc:'Ремонт одежды' },
  moonshine: { name:'Самогон',            items:{ bottle:3 },                    result:{ itemId:'moonshine', qty:1 }, energy:10, money:20, desc:'Продать подороже' },
  fixPhone:  { name:'Починить телефон',   items:{ phoneBroken:1, screwdriver:1 },result:{ itemId:'phoneWorking', qty:1 }, energy:15, desc:'Отвёртка не тратится' },
  necklace:  { name:'Сделать украшение',  items:{ scrap:2, wire:2 },             result:{ itemId:'necklace', qty:1 }, energy:10, desc:'На продажу' },
};

const JOBS = {
  janitor:    { name:'Дворник',          pay:400,  energy:25, reqEdu:0, reqRep:0,  desc:'Подметать улицы' },
  loader:     { name:'Грузчик',          pay:600,  energy:35, reqEdu:0, reqRep:0,  desc:'Таскать ящики' },
  carwasher:  { name:'Мойщик машин',     pay:500,  energy:30, reqEdu:0, reqRep:5,  desc:'Мойка автомобилей' },
  courier:    { name:'Курьер',           pay:900,  energy:28, reqEdu:1, reqRep:10, desc:'Доставка' },
  salesman:   { name:'Продавец',         pay:1500, energy:25, reqEdu:1, reqRep:15, desc:'Розница' },
  handyman:   { name:'Слесарь',          pay:1200, energy:30, reqEdu:2, reqRep:15, desc:'Мастер на все руки' },
  programmer: { name:'Программист',      pay:4000, energy:25, reqEdu:3, reqRep:25, reqSpec:'programmer', desc:'Писать код' },
  manager:    { name:'Менеджер',         pay:3500, energy:25, reqEdu:3, reqRep:25, reqSpec:'manager',    desc:'Управлять' },
  doctor:     { name:'Врач',             pay:5000, energy:30, reqEdu:3, reqRep:30, reqSpec:'doctor',     desc:'Лечить людей' },
  lawyer:     { name:'Юрист',            pay:5500, energy:30, reqEdu:3, reqRep:30, reqSpec:'lawyer',     desc:'Защищать в суде' },
  designer:   { name:'Дизайнер',         pay:3800, energy:25, reqEdu:3, reqRep:25, reqSpec:'designer',   desc:'Рисовать макеты' },
};

const EDUCATION = {
  school:     { name:'Школа (аттестат)', cost:0,     reqEdu:0 },
  college:    { name:'Колледж (диплом)', cost:5000,  reqEdu:1 },
  university: { name:'Вуз (диплом)',     cost:30000, reqEdu:2 },
};
const SPECIALTIES = {
  programmer:'Программист', manager:'Менеджер',
  doctor:'Врач', lawyer:'Юрист', designer:'Дизайнер',
};

const HOUSINGS = {
  street:    { name:'Улица',           cost:0,       rent:0,     energyRestore:25,  desc:'Бесплатно, но опасно' },
  shelter:   { name:'Ночлежка',        cost:0,       rent:0,     energyRestore:50,  desc:'Бесплатный ночлег' },
  dorm:      { name:'Комната в общаге',cost:5000,    rent:2000,  energyRestore:75,  desc:'Скромно, но своё' },
  apartment: { name:'Съёмная квартира',cost:25000,   rent:10000, energyRestore:90,  desc:'Уютно' },
  studio:    { name:'Своя студия',     cost:150000,  rent:0,     energyRestore:100, desc:'Личное пространство' },
  penthouse: { name:'Пентхаус',        cost:1000000, rent:0,     energyRestore:100, desc:'Вершина успеха' },
};

const TRANSPORTS = {
  walk:    { name:'Пешком',            cost:0,       speed:1,   rep:0 },
  bike:    { name:'Велосипед',         cost:5000,    speed:1.6, rep:1 },
  oldcar:  { name:'Старая машина',     cost:80000,   speed:2.4, rep:4 },
  newcar:  { name:'Новая иномарка',    cost:1000000, speed:3.2, rep:8 },
  luxury:  { name:'Элитный автомобиль',cost:5000000, speed:3.8, rep:15 },
};

const BUSINESSES = {
  stall:    { name:'Ларёк',           cost:100000,  income:5000,  risk:0.05, desc:'Продажа мелочей' },
  carwash:  { name:'Автомойка',       cost:300000,  income:15000, risk:0.04, desc:'Мойка авто' },
  cafe:     { name:'Кафе',            cost:700000,  income:35000, risk:0.04, desc:'Уютное место' },
  startup:  { name:'IT-стартап',      cost:1500000, income:80000, risk:0.06, desc:'Модно и перспективно' },
  chain:    { name:'Сеть магазинов',  cost:5000000, income:250000,risk:0.05, desc:'Империя' },
};

const WEATHER_ICON = { sunny:'☀️', cloudy:'☁️', rain:'🌧️', cold:'❄️' };
const WEATHER_NAME = { sunny:'Солнечно', cloudy:'Облачно', rain:'Дождь', cold:'Мороз' };

const QUESTS = {
  tutorial_dig:   { title:'Первые шаги',          desc:'Сходите на Мусорку и найдите что-нибудь',  reward:0 },
  tutorial_sell:  { title:'Продать хлам',         desc:'Продайте что-нибудь на Барахолке',          reward:0 },
  tutorial_eat:   { title:'Утолить голод',        desc:'Купите и съешьте любую еду',                reward:50 },
  get_shelter:    { title:'Крыша над головой',    desc:'Снимите комнату в общаге',                  reward:200 },
  get_job:        { title:'Первая работа',        desc:'Устройтесь на любую работу',                reward:300 },
  get_school:     { title:'Аттестат',             desc:'Окончите школу',                            reward:500 },
  get_college:    { title:'Диплом колледжа',      desc:'Окончите колледж',                          reward:1000 },
  get_university: { title:'Высшее образование',   desc:'Окончите вуз',                              reward:3000 },
  get_apartment:  { title:'Своя квартира',        desc:'Купите студию или лучше',                   reward:5000 },
  get_car:        { title:'Личное авто',          desc:'Купите новую иномарку или лучше',           reward:3000 },
  get_business:   { title:'Своё дело',            desc:'Откройте любой бизнес',                     reward:10000 },
  millionaire:    { title:'Миллионер',            desc:'Накопите 1 000 000 ₽',                      reward:20000 },
  final:          { title:'Из грязи в князи',     desc:'Пентхаус + бизнес + 10 000 000 ₽',          reward:0 },
};

// ─── ТУТОРИАЛ ─────────────────────────────────────────────────
const TUTORIAL_STEPS = [
  { id:'go_dump',    text:'Кликни на 🗑️ Мусорку на карте, чтобы дойти до неё.',                     check: () => ['dump1','dump2','dump3','dump4'].some(d => S.visitedDumps?.includes(d)) },
  { id:'dig_once',   text:'На мусорке нажми «Копаться» и пройди мини-игру. Выбери предметы и забери их.', check: () => (S.totalFound||0) > 0 },
  { id:'go_flea',    text:'Теперь иди на 🏪 Барахолку — продай найденный хлам.',                    check: () => (S.totalEarned||0) > 0 },
  { id:'sell_once',  text:'На Барахолке нажми «Продать» на любом предмете.',                        check: () => (S.totalEarned||0) > 0 && S.tutorialSellDone },
  { id:'go_shop',    text:'Ты проголодался! Иди в 🛒 Магазин и купи еду.',                          check: () => S.inventory?.some(i => ITEMS[i.itemId]?.type === 'food') },
  { id:'eat_once',   text:'Открой Инвентарь → нажми на еду → «Съесть». Сытость восстановится.',      check: () => (S.satiety||0) > 60 },
  { id:'find_job',   text:'Иди на 🏭 Завод и устройся на работу (дворник или грузчик).',            check: () => !!S.currentJob },
  { id:'sleep',      text:'Найди 🛏️ Ночлежку — там можно бесплатно поспать и восстановить энергию.', check: () => S.tutorialSlept },
  { id:'get_edu',    text:'Иди в 🏫 Школу и сдай экзамен. Затем колледж и вуз — путь к большим деньгам.', check: () => S.educationLevel >= 1 },
  { id:'done',       text:'Обучение окончено! Дальше — твой путь. Журнал квестов 📜 подскажет цели.',  check: () => false },
];

// ─── УТИЛИТЫ ──────────────────────────────────────────────────
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const chance = (p) => Math.random() < p;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const fmt = (n) => Math.round(n).toLocaleString('ru-RU');

let audioCtx = null;
const VOLUME = { master: 0.5 };

function playSound(name) {
  if (!audioCtx || VOLUME.master <= 0) return;
  try {
    const now = audioCtx.currentTime;
    const v = VOLUME.master * 0.15;
    const mk = (freq, dur, type='square', delay=0, vol=v) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, now + delay);
      g.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(now + delay); o.stop(now + delay + dur);
    };
    switch (name) {
      case 'click': mk(700,0.04); break;
      case 'coin': mk(900,0.06); mk(1300,0.08,'square',0.05); break;
      case 'success': mk(523,0.08); mk(659,0.08,'square',0.08); mk(784,0.15,'square',0.16); break;
      case 'fail': mk(320,0.12,'sawtooth'); mk(200,0.18,'sawtooth',0.1); break;
      case 'error': mk(180,0.15,'sawtooth'); break;
      case 'buy': mk(500,0.06); mk(700,0.06,'square',0.05); break;
    }
  } catch (e) {}
}

function initAudio() {
  try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
}

function toast(msg, type='info') {
  const area = document.getElementById('toastArea');
  const div = document.createElement('div');
  div.className = 'toast toast-' + type;
  div.textContent = msg;
  area.appendChild(div);
  setTimeout(() => { div.classList.add('toast-out'); setTimeout(() => div.remove(), 350); }, 2800);
}

// ─── СОСТОЯНИЕ ────────────────────────────────────────────────
let S = null;
let tickTimer = null;
let saveTimer = null;
const SAVE_KEY = 'rags_to_riches_save_v2';

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
    dumps: { dump1: 100, dump2: 100, dump3: 100, dump4: 100 },
    visitedDumps: [],
    housing: 'street',
    transport: 'walk',
    educationLevel: 0,
    specialty: null,
    currentJob: null,
    businesses: [],
    quests: { tutorial_dig: 'active' },
    traveling: false,
    sleeping: false,
    xp: 0, level: 1,
    totalEarned: 0,
    totalFound: 0,
    tutorialStep: 0,
    tutorialSkipped: false,
    tutorialSellDone: false,
    tutorialSlept: false,
    lastSaved: Date.now(),
  };
}

function save() {
  if (!S) return;
  try { S.lastSaved = Date.now(); localStorage.setItem(SAVE_KEY, JSON.stringify(S)); } catch (e) {}
}
function loadSave() {
  try { const raw = localStorage.getItem(SAVE_KEY); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
}
function hasSave() { return !!localStorage.getItem(SAVE_KEY); }

// ─── КАРТА: ОТРИСОВКА CANVAS ──────────────────────────────────
function drawMapCanvas() {
  const canvas = document.getElementById('mapCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  // Небо / земля
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, '#2a1e14');
  grad.addColorStop(0.5, '#1a1208');
  grad.addColorStop(1, '#0f0805');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Трава / пятна земли
  for (let i = 0; i < 300; i++) {
    const g = 30 + Math.random() * 30;
    ctx.fillStyle = `rgba(${g}, ${g*0.7}, ${g*0.4}, 0.25)`;
    ctx.beginPath();
    ctx.arc(Math.random()*W, Math.random()*H, 15 + Math.random()*50, 0, Math.PI*2);
    ctx.fill();
  }

  // Дороги (сетка)
  const roadColor = '#3a3232';
  const roadEdge = '#2a2222';
  const roadLine = '#d0c070';
  const rw = 70;

  const vRoads = [0.15, 0.38, 0.62, 0.85];
  const hRoads = [0.18, 0.42, 0.66, 0.90];

  // Тени дорог
  for (const rx of vRoads) {
    ctx.fillStyle = roadEdge;
    ctx.fillRect(rx*W - rw/2 - 4, 0, rw + 8, H);
    ctx.fillStyle = roadColor;
    ctx.fillRect(rx*W - rw/2, 0, rw, H);
    // Разметка
    ctx.fillStyle = roadLine;
    for (let y = 20; y < H; y += 60) ctx.fillRect(rx*W - 2, y, 4, 28);
  }
  for (const ry of hRoads) {
    ctx.fillStyle = roadEdge;
    ctx.fillRect(0, ry*H - rw/2 - 4, W, rw + 8);
    ctx.fillStyle = roadColor;
    ctx.fillRect(0, ry*H - rw/2, W, rw);
    ctx.fillStyle = roadLine;
    for (let x = 20; x < W; x += 60) ctx.fillRect(x, ry*H - 2, 28, 4);
  }

  // Здания в кварталах (декорации)
  const buildings = [
    // кварталы по x: [0,0.11],[0.19,0.34],[0.42,0.58],[0.66,0.81],[0.89,1]
    // кварталы по y: [0,0.14],[0.22,0.38],[0.46,0.62],[0.70,0.86],[0.94,1]

    // Верхний ряд (образование)
    { x:0.03, y:0.03, w:0.08, h:0.09, color:'#7a6a3a', roof:'#5a4a2a', type:'house' }, // вуз
    { x:0.21, y:0.02, w:0.10, h:0.10, color:'#8a5a3a', roof:'#6a3a1a', type:'house' }, // колледж
    { x:0.44, y:0.03, w:0.10, h:0.09, color:'#4a5a7a', roof:'#2a3a5a', type:'office' }, // офис
    { x:0.72, y:0.02, w:0.10, h:0.10, color:'#3a4a6a', roof:'#1a2a4a', type:'office' }, // бизнес-центр
    { x:0.87, y:0.03, w:0.09, h:0.10, color:'#7a3a3a', roof:'#5a1a1a', type:'house' }, // автосалон

    // Ряд 2
    { x:0.02, y:0.24, w:0.10, h:0.12, color:'#6a4a2a', roof:'#4a2a0a', type:'house' }, // школа
    { x:0.21, y:0.23, w:0.11, h:0.14, color:'#8a6a3a', roof:'#6a4a1a', type:'house' }, // магазин
    { x:0.44, y:0.23, w:0.11, h:0.13, color:'#8a5a2a', roof:'#5a3a0a', type:'house' }, // кафе
    { x:0.65, y:0.23, w:0.12, h:0.14, color:'#3a5a3a', roof:'#1a3a1a', type:'house' }, // банк
    { x:0.75, y:0.23, w:0.13, h:0.13, color:'#5a4a2a', roof:'#3a2a0a', type:'factory' }, // завод

    // Ряд 3
    { x:0.02, y:0.44, w:0.11, h:0.14, color:'#4a3a2a', roof:'#2a1a0a', type:'house' }, // заброшка
    { x:0.21, y:0.44, w:0.14, h:0.16, color:'#3a5a3a', roof:'#1a3a1a', type:'park' },   // парк
    { x:0.44, y:0.45, w:0.10, h:0.13, color:'#7a4a3a', roof:'#4a2a1a', type:'house' }, // барахолка
    { x:0.68, y:0.44, w:0.14, h:0.15, color:'#5a4a5a', roof:'#3a2a3a', type:'factory' }, // завод

    // Ряд 4
    { x:0.02, y:0.68, w:0.11, h:0.14, color:'#4a4a3a', roof:'#2a2a1a', type:'house' }, // ночлежка
    { x:0.21, y:0.68, w:0.12, h:0.14, color:'#3a3a2a', roof:'#2a2a1a', type:'park' },   // мусорка
    { x:0.44, y:0.68, w:0.12, h:0.14, color:'#3a3a3a', roof:'#1a1a1a', type:'house' }, // мусорка
    { x:0.68, y:0.68, w:0.12, h:0.14, color:'#3a3a3a', roof:'#1a1a1a', type:'house' }, // мусорка

    // Ряд 5
    { x:0.02, y:0.92, w:0.11, h:0.06, color:'#3a3a2a', roof:'#1a1a0a', type:'park' },
    { x:0.21, y:0.92, w:0.11, h:0.06, color:'#3a3a2a', roof:'#1a1a0a', type:'park' },
    { x:0.44, y:0.92, w:0.11, h:0.06, color:'#3a3a2a', roof:'#1a1a0a', type:'park' },
    { x:0.68, y:0.92, w:0.11, h:0.06, color:'#3a3a2a', roof:'#1a1a0a', type:'park' },
    { x:0.87, y:0.92, w:0.10, h:0.06, color:'#4a3a2a', roof:'#2a1a0a', type:'house' },
  ];

  for (const b of buildings) {
    const bx = b.x * W, by = b.y * H, bw = b.w * W, bh = b.h * H;
    if (b.type === 'park') {
      // Газон
      ctx.fillStyle = 'rgba(40, 70, 30, 0.5)';
      ctx.fillRect(bx, by, bw, bh);
      // Деревья
      for (let i = 0; i < 6; i++) {
        const tx = bx + Math.random() * bw;
        const ty = by + Math.random() * bh;
        ctx.fillStyle = '#1a3a1a';
        ctx.beginPath(); ctx.arc(tx, ty, 12, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = '#2a5a2a';
        ctx.beginPath(); ctx.arc(tx - 2, ty - 2, 8, 0, Math.PI*2); ctx.fill();
      }
    } else {
      // Тень
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(bx + 4, by + 4, bw, bh);
      // Основа
      ctx.fillStyle = b.color;
      ctx.fillRect(bx, by, bw, bh);
      // Крыша
      ctx.fillStyle = b.roof;
      ctx.fillRect(bx, by, bw, Math.min(bh * 0.35, 18));
      // Окна
      if (b.type === 'office' || b.type === 'factory') {
        ctx.fillStyle = 'rgba(255,220,120,0.4)';
        const cols = Math.floor(bw / 20);
        const rows = Math.floor(bh / 20);
        for (let i = 1; i < cols; i++) {
          for (let j = 1; j < rows; j++) {
            if ((i + j) % 3 === 0) {
              ctx.fillRect(bx + i * 20, by + j * 20, 8, 8);
            }
          }
        }
      } else {
        // Дверь
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(bx + bw/2 - 5, by + bh - 12, 10, 12);
      }
    }
  }

  // Декор: деревья по краям
  for (let i = 0; i < 20; i++) {
    const tx = Math.random() * W;
    const ty = Math.random() * H;
    // Проверяем что не на дороге
    const onVRoad = vRoads.some(rx => Math.abs(tx/W - rx) < 0.06);
    const onHRoad = hRoads.some(ry => Math.abs(ty/H - ry) < 0.06);
    if (onVRoad || onHRoad) continue;
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.arc(tx+2, ty+2, 10, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#1a3a1a';
    ctx.beginPath(); ctx.arc(tx, ty, 10, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#2a4a2a';
    ctx.beginPath(); ctx.arc(tx-2, ty-2, 6, 0, Math.PI*2); ctx.fill();
  }

  // Виньетка
  const vg = ctx.createRadialGradient(W/2, H/2, H*0.3, W/2, H/2, H*0.8);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,0.6)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);
}

// ─── ПЕРСОНАЖ (SVG) ───────────────────────────────────────────
const CLOTHING_COLORS = {
  head: {
    tornshirt: null,
    cap: { color: '#3a5a8a', dark: '#2a4a7a' },
    capGood: { color: '#1a0a00', dark: '#0a0000' },
  },
  body: {
    tornshirt: { color: '#6a5040', dark: '#3a2010', torn: true },
    jacket: { color: '#6a4a3a', dark: '#4a2a1a' },
    suitJacket: { color: '#1a1a2a', dark: '#0a0a1a' },
  },
  legs: {
    jeans: { color: '#3a4a7a', dark: '#2a3a5a' },
    suitPants: { color: '#1a1a2a', dark: '#0a0a1a' },
  },
  shoes: {
    sneakers: { color: '#3a3a3a', dark: '#1a1a1a' },
    dressShoes: { color: '#1a0a00', dark: '#0a0000' },
  },
};

function renderPlayerSprite() {
  const eq = S.equipment;
  const bodyData = eq.body ? CLOTHING_COLORS.body[eq.body.itemId] : null;
  const legData = eq.legs ? CLOTHING_COLORS.legs[eq.legs.itemId] : null;
  const shoeData = eq.shoes ? CLOTHING_COLORS.shoes[eq.shoes.itemId] : null;
  const headData = eq.head ? CLOTHING_COLORS.head[eq.head.itemId] : null;

  const bodyColor = bodyData?.color || '#8a7a6a';
  const bodyDark = bodyData?.dark || '#5a4a3a';
  const legColor = legData?.color || '#5a4a3a';
  const legDark = legData?.dark || '#3a2a1a';
  const shoeColor = shoeData?.color || '#3a2a1a';
  const shoeDark = shoeData?.dark || '#1a0a00';

  return `
    <svg viewBox="0 0 40 56" width="44" height="62">
      <ellipse cx="20" cy="53" rx="12" ry="3" fill="rgba(0,0,0,0.5)"/>
      <rect x="14" y="34" width="5" height="14" fill="${legColor}"/>
      <rect x="21" y="34" width="5" height="14" fill="${legColor}"/>
      <rect x="13" y="46" width="7" height="6" rx="1" fill="${shoeColor}"/>
      <rect x="20" y="46" width="7" height="6" rx="1" fill="${shoeColor}"/>
      <rect x="11" y="20" width="18" height="16" rx="2" fill="${bodyColor}"/>
      ${bodyData?.torn ? `<path d="M14,26 L17,30 M19,24 L21,29 M23,28 L22,32" stroke="${bodyDark}" stroke-width="1" fill="none"/>` : ''}
      <rect x="8" y="22" width="4" height="12" rx="1" fill="${bodyColor}"/>
      <rect x="28" y="22" width="4" height="12" rx="1" fill="${bodyColor}"/>
      <rect x="8" y="32" width="4" height="4" rx="1" fill="#e8c8a0"/>
      <rect x="28" y="32" width="4" height="4" rx="1" fill="#e8c8a0"/>
      <circle cx="20" cy="12" r="9" fill="#e8c8a0"/>
      <path d="M11,9 Q20,3 29,9 Q29,11 28,13 Q26,10 20,10 Q14,10 12,13 Q11,11 11,9 Z" fill="#3a2010"/>
      <circle cx="17" cy="12" r="1.4" fill="#1a0a00"/>
      <circle cx="23" cy="12" r="1.4" fill="#1a0a00"/>
      <path d="M17,16 Q20,17.5 23,16" stroke="#3a2010" stroke-width="1" fill="none"/>
      ${headData ? `
        <path d="M10,10 Q10,3 20,3 Q30,3 30,10 L30,12 L10,12 Z" fill="${headData.color}"/>
        <path d="M6,12 Q8,8 14,10 L26,10 Q32,8 34,12 Q34,14 30,14 L10,14 Q6,14 6,12 Z" fill="${headData.dark}"/>
      ` : ''}
    </svg>
  `;
}

// ─── РЕНДЕР КАРТЫ ─────────────────────────────────────────────
function renderMap() {
  drawMapCanvas();
  const container = document.getElementById('mapLocations');
  container.innerHTML = '';

  for (const [id, loc] of Object.entries(LOCATIONS)) {
    const btn = document.createElement('button');
    btn.className = 'loc-btn';
    btn.style.left = loc.x + '%';
    btn.style.top = loc.y + '%';
    btn.dataset.locId = id;

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

  // Позиционируем игрока
  const player = document.getElementById('mapPlayer');
  const pLoc = LOCATIONS[S.currentLocation] || LOCATIONS.street;
  player.style.transition = 'none';
  player.style.left = pLoc.x + '%';
  player.style.top = pLoc.y + '%';
  player.innerHTML = renderPlayerSprite();
  void player.offsetWidth;
  player.style.transition = 'left 1.8s ease-in-out, top 1.8s ease-in-out';
}

function updatePlayerSprite() {
  const player = document.getElementById('mapPlayer');
  if (player) player.innerHTML = renderPlayerSprite();
}

function updateDumpFills() {
  for (const [id, loc] of Object.entries(LOCATIONS)) {
    if (loc.type === 'dump' && loc.dumpId) {
      const btn = document.querySelector(`.loc-btn[data-loc-id="${id}"]`);
      if (!btn) continue;
      const fill = S.dumps[loc.dumpId] ?? 100;
      const bar = btn.querySelector('.loc-fill-bar');
      if (bar) {
        bar.style.width = fill + '%';
        bar.classList.remove('low','mid');
        if (fill < 25) bar.classList.add('low');
        else if (fill < 60) bar.classList.add('mid');
      }
    }
  }
}

// ─── ИГРОВОЙ ЦИКЛ ─────────────────────────────────────────────
function startTick() {
  if (tickTimer) clearInterval(tickTimer);
  tickTimer = setInterval(gameTick, 1000);
}

function gameTick() {
  if (!S || S.sleeping) return;

  S.gameMinute++;
  recalcTime();

  S.satiety = clamp(S.satiety - 0.08, 0, 100);
  S.hygiene = clamp(S.hygiene - 0.05, 0, 100);
  if (S.energy > 0) S.energy = clamp(S.energy - 0.12, 0, 100);

  if (S.satiety < 20) S.health = clamp(S.health - 0.08, 0, 100);
  if (S.energy < 5) S.health = clamp(S.health - 0.05, 0, 100);

  if (S.housing === 'street' && (S.weather === 'rain' || S.weather === 'cold')) {
    S.health = clamp(S.health - 0.04, 0, 100);
  }

  if (S.health <= 0) hospitalize();

  renderHUD();
  updateTutorial();
}

function recalcTime() {
  S.hour = Math.floor(S.gameMinute / 60) % 24;
  const newDay = Math.floor(S.gameMinute / (60 * 24)) + 1;
  if (newDay !== S.day) { S.day = newDay; onNewDay(); }
}

function onNewDay() {
  const h = HOUSINGS[S.housing];
  if (h.rent > 0) {
    if (S.money >= h.rent) { S.money -= h.rent; toast(`🏠 Аренда: -${fmt(h.rent)} ₽`, 'info'); }
    else {
      toast(`⚠️ Не хватает на аренду! Выселяют на улицу.`, 'error');
      S.housing = 'street';
      S.reputation = clamp(S.reputation - 10, 0, 100);
    }
  }

  for (const bizId of S.businesses) {
    const biz = BUSINESSES[bizId];
    if (!biz) continue;
    if (chance(biz.risk)) toast(`📉 ${biz.name}: проблемы! Убыток.`, 'error');
    else {
      const income = Math.round(biz.income * rand(0.7, 1.3));
      S.money += income;
      S.totalEarned = (S.totalEarned || 0) + income;
      toast(`💰 ${biz.name}: +${fmt(income)} ₽`, 'success');
    }
  }

  // Восстановление мусорок
  for (const dumpId of Object.keys(DUMPS)) {
    S.dumps[dumpId] = clamp((S.dumps[dumpId] || 0) + 25, 0, 100);
  }
  updateDumpFills();

  if (chance(0.4)) S.weather = pick(['sunny','cloudy','rain','cold']);

  checkQuests();
  save();
}

function hospitalize() {
  playSound('fail');
  const lost = Math.floor(S.money * 0.3);
  S.money = Math.max(0, S.money - lost);
  S.health = 40; S.satiety = 30; S.energy = 30; S.hygiene = 20;
  S.housing = 'street';
  S.currentLocation = 'shelter';
  renderMap();
  openModal('hospital', '🏥 Больница', `
    <p style="font-size:16px; text-align:center; margin-bottom:12px;">
      Вы потеряли сознание...<br>Вас подобрали и отвезли в больницу.
    </p>
    <p style="text-align:center; color:var(--red);">💸 Потеряно: ${fmt(lost)} ₽</p>
  `, { buttons: [{ label: 'Очнуться', cls: 'btn-primary', action: () => closeModal('hospital') }] });
}

// ─── HUD ──────────────────────────────────────────────────────
function renderHUD() {
  if (!S) return;
  document.getElementById('hudMoney').textContent = fmt(S.money);
  setBar('barSatiety', S.satiety);
  setBar('barHealth', S.health);
  setBar('barEnergy', S.energy);
  setBar('barHygiene', S.hygiene);
  setBar('barReputation', S.reputation);
  document.getElementById('hudTime').textContent = String(S.hour).padStart(2,'0') + ':00';
  document.getElementById('hudWeather').textContent = WEATHER_ICON[S.weather];
  document.getElementById('hudDay').textContent = 'День ' + S.day;

  document.body.classList.remove('tier-poor','tier-mid','tier-rich');
  if (S.money < 5000) document.body.classList.add('tier-poor');
  else if (S.money < 500000) document.body.classList.add('tier-mid');
  else document.body.classList.add('tier-rich');
}
function setBar(id, val) {
  const el = document.getElementById(id);
  if (el) el.style.width = clamp(val, 0, 100) + '%';
}

// ─── ТУТОРИАЛ ─────────────────────────────────────────────────
function updateTutorial() {
  if (!S || S.tutorialSkipped) return;
  const panel = document.getElementById('tutorialPanel');
  const body = document.getElementById('tutorialBody');

  // Проверяем текущий шаг
  while (S.tutorialStep < TUTORIAL_STEPS.length) {
    const step = TUTORIAL_STEPS[S.tutorialStep];
    if (step.id === 'done') {
      body.innerHTML = step.text;
      panel.style.display = 'flex';
      setTimeout(() => { if (S.tutorialStep >= TUTORIAL_STEPS.length - 1) panel.style.display = 'none'; }, 5000);
      break;
    }
    if (step.check()) {
      S.tutorialStep++;
      continue;
    }
    body.innerHTML = step.text;
    panel.style.display = 'flex';
    return;
  }
}

function skipTutorial() {
  S.tutorialSkipped = true;
  document.getElementById('tutorialPanel').style.display = 'none';
}

// ─── МОДАЛКИ ──────────────────────────────────────────────────
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

// ─── ПЕРЕДВИЖЕНИЕ ─────────────────────────────────────────────
function travelTo(locId) {
  if (!S || S.traveling) return;
  if (S.currentLocation === locId) { openLocationPanel(locId); return; }

  const from = LOCATIONS[S.currentLocation] || LOCATIONS.street;
  const to = LOCATIONS[locId];
  const dist = Math.hypot(to.x - from.x, to.y - from.y);
  const speed = TRANSPORTS[S.transport].speed;
  const duration = clamp(dist * 25 / speed, 400, 2000);

  S.traveling = true;
  playSound('click');
  const player = document.getElementById('mapPlayer');
  player.style.transition = `left ${duration}ms ease-in-out, top ${duration}ms ease-in-out`;
  player.style.left = to.x + '%';
  player.style.top = to.y + '%';

  setTimeout(() => {
    S.currentLocation = locId;
    S.traveling = false;

    // Отмечаем посещение мусорки
    if (to.type === 'dump' && to.dumpId) {
      if (!S.visitedDumps) S.visitedDumps = [];
      if (!S.visitedDumps.includes(to.dumpId)) S.visitedDumps.push(to.dumpId);
    }

    if (S.equipment.shoes) {
      S.equipment.shoes.condition = clamp(S.equipment.shoes.condition - 1, 0, 100);
      if (S.equipment.shoes.condition <= 0) {
        toast('👟 Обувь порвалась!', 'error');
        S.reputation = clamp(S.reputation - 2, 0, 100);
        S.equipment.shoes = null;
        updatePlayerSprite();
      }
    }

    if (locId !== 'street' && chance(0.15)) {
      triggerRandomEncounter();
    } else {
      openLocationPanel(locId);
    }
    renderHUD();
    updateTutorial();
  }, duration);
}

// ─── ПАНЕЛИ ЛОКАЦИЙ ───────────────────────────────────────────
function openLocationPanel(locId) {
  const loc = LOCATIONS[locId];
  let html = '';
  switch (loc.type) {
    case 'dump':      html = dumpPanel(loc); break;
    case 'dig':       html = digPanel(loc); break;
    case 'shop':      html = shopPanel(); break;
    case 'flea':      html = fleaPanel(); break;
    case 'school':    html = educationPanel('school'); break;
    case 'college':   html = educationPanel('college'); break;
    case 'university':html = educationPanel('university'); break;
    case 'factory':   html = jobPanel(false); break;
    case 'office':    html = jobPanel(true); break;
    case 'cafe':      html = cafePanel(); break;
    case 'bank':      html = bankPanel(); break;
    case 'housing':   html = housingPanel(); break;
    case 'transport': html = transportPanel(); break;
    case 'business':  html = businessPanel(); break;
    case 'street':    html = streetPanel(); break;
  }
  openModal('location', loc.emoji + ' ' + loc.name, html);
}

// ─── МУСОРКА: интерфейс ───────────────────────────────────────
function dumpPanel(loc) {
  const fill = S.dumps[loc.dumpId] ?? 100;
  return `
    <p>Здесь можно порыться в поисках чего-нибудь полезного.</p>
    <p>Наполненность: <strong style="color:${fill<25?'var(--red)':fill<60?'var(--gold)':'var(--green)'}">${fill}%</strong></p>
    ${fill < 15 ? '<p class="hint" style="color:var(--red);">Мусорка почти пуста. Подождите следующий день или ищите другую.</p>' : ''}
    <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;">
      <button class="btn btn-primary" onclick="startDumpDig('${loc.dumpId}')" ${fill < 15 ? 'disabled' : ''}>🕵️ Копаться (−10 энергии)</button>
    </div>
    <p class="hint" style="margin-top:12px;">После мини-игры вы увидите найденные предметы и сможете выбрать, что забрать.</p>
  `;
}

function digPanel(loc) {
  return `
    <p>Здесь тоже можно что-то найти.</p>
    <button class="btn btn-primary" onclick="startDumpDig('park')">🕵️ Копаться (−10 энергии)</button>
  `;
}

// ─── МИНИ-ИГРА: КОПАНИЕ (сложнее) ─────────────────────────────
function startDumpDig(dumpId) {
  if (S.energy < 10) { toast('Мало энергии', 'error'); return; }
  const dumpFill = S.dumps[dumpId] ?? 100;
  if (dumpFill < 15) { toast('Мусорка пуста', 'error'); return; }

  closeModal('location');

  const modal = openModal('minigame', '🕵️ Копание в мусорке', `
    <canvas id="minigameCanvas" width="440" height="200"></canvas>
    <p style="text-align:center; font-size:12px; color:var(--text-dim);">Кликни, когда полоска в зелёной зоне!</p>
    <p style="text-align:center; font-size:11px; color:var(--red);">Красная зона = порез (−3 HP)</p>
  `);

  const canvas = modal.querySelector('#minigameCanvas');
  const ctx = canvas.getContext('2d');
  let pos = 40, dir = 1, speed = 4.5 + Math.min(S.day * 0.05, 2);
  let attempts = 5, hits = 0, running = true;
  let lastTime = performance.now();

  // Зелёная зона (узкая) и красная зона (в углу)
  const greenStart = 180, greenEnd = 230;
  const redStart = 320, redEnd = 360;
  let redZoneActive = true;

  function draw(t) {
    if (!running) return;
    const dt = (t - lastTime) / 1000;
    lastTime = t;

    ctx.fillStyle = '#1a1410';
    ctx.fillRect(0, 0, 440, 200);

    // Зелёная зона
    ctx.fillStyle = 'rgba(100,220,100,0.25)';
    ctx.fillRect(greenStart, 40, greenEnd - greenStart, 110);
    ctx.strokeStyle = '#6bd66b'; ctx.lineWidth = 2;
    ctx.strokeRect(greenStart, 40, greenEnd - greenStart, 110);

    // Красная зона (усложнение)
    if (redZoneActive) {
      ctx.fillStyle = 'rgba(220,60,60,0.25)';
      ctx.fillRect(redStart, 40, redEnd - redStart, 110);
      ctx.strokeStyle = '#e85050';
      ctx.strokeRect(redStart, 40, redEnd - redStart, 110);
    }

    // Маркер
    ctx.fillStyle = '#ffcc44';
    ctx.shadowColor = '#ffcc44';
    ctx.shadowBlur = 12;
    ctx.fillRect(pos - 3, 30, 6, 130);
    ctx.shadowBlur = 0;

    // Инфо
    ctx.fillStyle = '#f0e6d2';
    ctx.font = 'bold 15px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Попыток: ' + attempts, 10, 24);
    ctx.fillText('Успехов: ' + hits, 10, 190);

    // Двигаем
    pos += speed * dir;
    if (pos >= 435 || pos <= 5) { dir *= -1; pos = clamp(pos, 5, 435); }
    requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  function handleClick() {
    if (!running) return;
    attempts--;
    if (pos >= greenStart && pos <= greenEnd) {
      hits++;
      playSound('success');
    } else if (redZoneActive && pos >= redStart && pos <= redEnd) {
      S.health = clamp(S.health - 3, 0, 100);
      toast('🩸 Порезались! −3 HP', 'error');
      playSound('fail');
    } else {
      playSound('fail');
    }
    if (attempts <= 0) {
      running = false;
      closeModal('minigame');
      finishDumpDig(dumpId, hits);
    }
  }
  canvas.onclick = handleClick;
  modal.querySelector('.modal-body').addEventListener('click', (e) => {
    if (e.target !== canvas) handleClick();
  });
}

function finishDumpDig(dumpId, hits) {
  S.energy -= 10;
  S.hygiene = clamp(S.hygiene - 8, 0, 100);
  S.dumps[dumpId] = clamp((S.dumps[dumpId] || 0) - 20, 0, 100);
  updateDumpFills();

  // Генерируем лут: даже при 0 успехах что-то находим (но мало)
  const loot = [];
  const successful = hits;

  for (let i = 0; i < successful; i++) {
    const roll = Math.random();
    let itemId, qty = 1;
    if (roll < 0.55) {
      itemId = pick(['bottle','bottle','rag','rag','scrap','thread']);
      qty = randInt(1, 3);
    } else if (roll < 0.85) {
      itemId = pick(['wire','book','screwdriver','patch']);
    } else if (roll < 0.95) {
      itemId = pick(['watch','phoneBroken','necklace']);
    } else {
      continue; // пусто
    }
    // Группируем одинаковые
    const existing = loot.find(l => l.itemId === itemId);
    if (existing) existing.qty += qty;
    else loot.push({ itemId, qty });
  }

  if (loot.length === 0) {
    toast('Ничего не нашли...', 'info');
    renderHUD();
    return;
  }

  showLootDialog(loot, dumpId);
}

// ─── ДИАЛОГ ВЫБОРА ЛУТА ───────────────────────────────────────
function showLootDialog(loot, dumpId) {
  const state = loot.map(l => ({ ...l, selected: true }));

  function render() {
    const grid = state.map((l, i) => {
      const it = ITEMS[l.itemId];
      return `
        <div class="loot-item ${l.selected ? 'selected' : 'deselected'}" onclick="toggleLoot(${i})">
          ${itemSvg(l.itemId)}
          ${l.qty > 1 ? `<span class="loot-qty">×${l.qty}</span>` : ''}
          <div class="loot-name">${it.name}</div>
        </div>`;
    }).join('');

    const selectedCount = state.filter(l => l.selected).length;

    openModal('loot', '🔍 Найдено!', `
      <p style="text-align:center; margin-bottom:10px;">Выбери предметы, которые заберёшь.</p>
      <div class="loot-grid">${grid}</div>
      <p class="hint" style="text-align:center;">Выбрано: ${selectedCount} из ${state.length}</p>
    `, {
      buttons: [
        { label: 'Забрать выбранное', cls: 'btn-primary', action: () => confirmLoot(dumpId) },
        { label: 'Оставить всё', cls: 'btn-secondary', action: () => { closeModal('loot'); renderHUD(); } },
      ]
    });
  }

  window.toggleLoot = (i) => {
    state[i].selected = !state[i].selected;
    render();
  };

  window.confirmLoot = (dumpId) => {
    const selected = state.filter(l => l.selected);
    if (selected.length === 0) { toast('Ничего не выбрано', 'error'); return; }
    for (const l of selected) {
      addItem(l.itemId, l.qty);
      S.totalFound = (S.totalFound || 0) + 1;
    }
    const names = selected.map(l => `${ITEMS[l.itemId].name}${l.qty > 1 ? '×' + l.qty : ''}`).join(', ');
    toast('✅ Взято: ' + names, 'success');
    playSound('coin');
    closeModal('loot');
    renderHUD();
    checkQuests();
    updateTutorial();
    save();
  };

  render();
}

// ─── МАГАЗИН ──────────────────────────────────────────────────
function shopPanel() {
  const foods = ['bread','water','soup','salad','shawarma','energy'];
  let rows = '';
  for (const id of foods) {
    const it = ITEMS[id];
    const price = getShopPrice(id);
    rows += `
      <div class="list-row">
        <div class="ico">${itemSvg(id)}</div>
        <div class="info">
          <div class="name">${it.name}</div>
          <div class="desc">
            Сытость +${it.satiety || 0}
            ${it.health ? ' · HP ' + (it.health > 0 ? '+' : '') + it.health : ''}
            ${it.energy ? ' · ⚡+' + it.energy : ''}
          </div>
        </div>
        <div class="price">${fmt(price)} ₽</div>
        <button class="btn btn-primary" onclick="buyItem('${id}', 1)">Купить</button>
      </div>`;
  }
  const clothes = ['cap','jacket','jeans','sneakers','capGood','suitJacket','suitPants','dressShoes','goldWatch'];
  let clothRows = '';
  for (const id of clothes) {
    const it = ITEMS[id];
    const price = getShopPrice(id);
    clothRows += `
      <div class="list-row">
        <div class="ico">${itemSvg(id)}</div>
        <div class="info">
          <div class="name">${it.name}</div>
          <div class="desc">Репутация +${it.rep || 0}</div>
        </div>
        <div class="price">${fmt(price)} ₽</div>
        <button class="btn btn-primary" onclick="buyItem('${id}', 1)">Купить</button>
      </div>`;
  }
  const toolRows = `
    <div class="list-row">
      <div class="ico">${itemSvg('screwdriver')}</div>
      <div class="info"><div class="name">Отвёртка</div><div class="desc">Для крафта</div></div>
      <div class="price">${fmt(ITEMS.screwdriver.price)} ₽</div>
      <button class="btn btn-primary" onclick="buyItem('screwdriver', 1)">Купить</button>
    </div>`;
  return `
    <h3 style="margin-bottom:8px;">🍞 Продукты</h3>${rows}
    <h3 style="margin:14px 0 8px;">👔 Одежда</h3>${clothRows}
    <h3 style="margin:14px 0 8px;">🛠️ Инструменты</h3>${toolRows}
  `;
}

function getShopPrice(itemId) {
  let price = ITEMS[itemId].price;
  if (ITEMS[itemId].type === 'food' && (S.hour >= 18 || S.hour < 6)) price = Math.round(price * 1.3);
  return price;
}

// ─── БАРАХОЛКА ────────────────────────────────────────────────
function fleaPanel() {
  let invRows = '';
  for (const slot of S.inventory) {
    const it = ITEMS[slot.itemId];
    if (!it || it.price <= 0) continue;
    const sellPrice = Math.round(it.price * 0.6);
    invRows += `
      <div class="list-row">
        <div class="ico">${itemSvg(slot.itemId)}</div>
        <div class="info">
          <div class="name">${it.name} ×${slot.qty}</div>
          <div class="desc">Продать за ${fmt(sellPrice)} ₽/шт</div>
        </div>
        <button class="btn btn-primary" onclick="sellItem('${slot.itemId}')">Продать</button>
      </div>`;
  }
  if (!invRows) invRows = '<p class="hint">Нечего продавать. Иди копаться на мусорку!</p>';
  return `
    <h3 style="margin-bottom:8px;">💰 Твой хлам</h3>
    <p class="hint">Продажа доступна только здесь. В инвентаре продать нельзя.</p>
    ${invRows}
  `;
}

// ─── ОБРАЗОВАНИЕ ──────────────────────────────────────────────
function educationPanel(kind) {
  const edu = EDUCATION[kind];
  const current = S.educationLevel;
  if (kind === 'school' && current >= 1) return `<p>✅ Школа окончена. Идите в колледж.</p>`;
  if (kind === 'college' && current >= 2) return `<p>✅ Колледж окончен. Идите в вуз.</p>`;
  if (kind === 'university' && current >= 3) return `<p>✅ Вуз окончен. Специальность: ${SPECIALTIES[S.specialty] || '—'}.</p>`;
  if (current < edu.reqEdu) return `<p>🔒 Сначала нужно окончить предыдущую ступень.</p>`;
  return `
    <p><strong>${edu.name}</strong></p>
    <p>Стоимость: ${fmt(edu.cost)} ₽</p>
    <p>Экзамен — викторина из 5 вопросов. Нужно 3+ правильных.</p>
    <button class="btn btn-primary" onclick="takeExam('${kind}')" style="margin-top:10px;">
      🎓 Сдать экзамен (${fmt(edu.cost)} ₽)
    </button>
  `;
}

// ─── РАБОТА ───────────────────────────────────────────────────
function jobPanel(isOffice) {
  let rows = '';
  for (const [id, job] of Object.entries(JOBS)) {
    if (isOffice && job.pay < 1500) continue;
    if (!isOffice && job.pay >= 1500) continue;

    const canEdu = S.educationLevel >= job.reqEdu;
    const canRep = S.reputation >= job.reqRep;
    const canSpec = !job.reqSpec || S.specialty === job.reqSpec;
    const canWork = canEdu && canRep && canSpec;

    let reason = '';
    if (!canEdu) reason = `нужно образ. ур.${job.reqEdu}`;
    else if (!canRep) reason = `нужна реп. ${job.reqRep}`;
    else if (!canSpec) reason = `нужна спец.: ${SPECIALTIES[job.reqSpec]}`;

    const active = S.currentJob === id;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${job.name} — ${fmt(job.pay)} ₽/смена</div>
          <div class="desc">${job.desc} · ⚡−${job.energy}${reason ? ' · 🔒 ' + reason : ''}</div>
        </div>
        <button class="btn ${active ? 'btn-success' : 'btn-primary'}" ${!canWork ? 'disabled' : ''}
          onclick="doWork('${id}')">
          ${active ? '▶ Работать' : 'Устроиться'}
        </button>
      </div>`;
  }
  return `
    <h3 style="margin-bottom:10px;">${isOffice ? '🏢 Офисные вакансии' : '🏭 Рабочие вакансии'}</h3>
    <p class="hint">Работа отнимает энергию, но приносит деньги.</p>
    ${rows}
  `;
}

// ─── КАФЕ ─────────────────────────────────────────────────────
function cafePanel() {
  return `
    <p>🍵 Здесь можно подкрепиться и отдохнуть.</p>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:12px;">
      <button class="btn btn-primary" onclick="buyItem('soup',1)">🍲 Суп (150 ₽)</button>
      <button class="btn btn-primary" onclick="buyItem('salad',1)">🥗 Салат (200 ₽)</button>
      <button class="btn btn-primary" onclick="buyItem('shawarma',1)">🌯 Шаурма (180 ₽)</button>
      <button class="btn btn-secondary" onclick="restCafe()">☕ Отдохнуть (+30⚡, −100 ₽)</button>
    </div>
  `;
}

// ─── БАНК ─────────────────────────────────────────────────────
function bankPanel() {
  const deposit = Math.min(S.money, 1000000);
  const interest = Math.round(deposit * 0.05);
  return `
    <p>🏦 Банк хранит ваши сбережения.</p>
    <p>Баланс: ${fmt(S.money)} ₽</p>
    <p>Депозит под 5% в день (макс. 1 000 000 ₽).</p>
    ${deposit >= 100 ? `<button class="btn btn-primary" onclick="makeDeposit()">💰 Положить ${fmt(deposit)} ₽ → +${fmt(interest)} ₽/день</button>` : '<p class="hint">Недостаточно средств.</p>'}
  `;
}

// ─── ЖИЛЬЁ ────────────────────────────────────────────────────
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
          <div class="desc">${h.desc} · ⚡+${h.energyRestore}${h.rent ? ' · Аренда ' + fmt(h.rent) + '₽/день' : ''}${tierLocked ? ' · 🔒 Нужен бизнес' : ''}</div>
        </div>
        <div class="price">${h.cost ? fmt(h.cost) + ' ₽' : 'Бесплатно'}</div>
        <button class="btn ${isCurrent ? 'btn-success' : 'btn-primary'}"
          ${isCurrent || tierLocked || (!isCurrent && h.cost > 0 && !canAfford) ? 'disabled' : ''}
          onclick="buyHousing('${id}')">
          ${isCurrent ? '✓' : (h.cost > 0 ? 'Купить' : 'Переехать')}
        </button>
      </div>`;
  }
  return `<h3 style="margin-bottom:10px;">🏠 Жильё</h3>${rows}
    <p class="hint" style="margin-top:10px;"><button class="btn btn-secondary" onclick="sleepNow()" style="padding:8px 14px; font-size:12px;">💤 Спать (6 часов)</button></p>`;
}

// ─── ТРАНСПОРТ ────────────────────────────────────────────────
function transportPanel() {
  let rows = '';
  for (const [id, t] of Object.entries(TRANSPORTS)) {
    const isCurrent = S.transport === id;
    const canAfford = S.money >= t.cost;
    rows += `
      <div class="list-row">
        <div class="info">
          <div class="name">${t.name}${isCurrent ? ' (текущий)' : ''}</div>
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
  return `<h3 style="margin-bottom:10px;">🚗 Транспорт</h3>${rows}`;
}

// ─── БИЗНЕС ───────────────────────────────────────────────────
function businessPanel() {
  if (S.educationLevel < 3 || S.money < 50000) {
    return `
      <p>📊 Для бизнеса нужно:</p>
      <ul style="margin-left:20px; color:var(--text-dim);">
        <li>Высшее образование ${S.educationLevel >= 3 ? '✅' : '❌'}</li>
        <li>Стартовый капитал от 100 000 ₽ ${S.money >= 100000 ? '✅' : '❌'}</li>
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
          <div class="name">${biz.name}${owned ? ' (куплено)' : ''}</div>
          <div class="desc">${biz.desc} · ~${fmt(biz.income)} ₽/день</div>
        </div>
        <div class="price">${fmt(biz.cost)} ₽</div>
        <button class="btn ${owned ? 'btn-success' : 'btn-primary'}"
          ${owned || !canAfford ? 'disabled' : ''}
          onclick="buyBusiness('${id}')">
          ${owned ? '✓' : 'Открыть'}
        </button>
      </div>`;
  }
  return `<h3 style="margin-bottom:10px;">📊 Бизнес</h3>${rows}`;
}

// ─── УЛИЦА ────────────────────────────────────────────────────
function streetPanel() {
  return `
    <p>🛣️ Оживлённая улица. Здесь можно попрошайничать.</p>
    <button class="btn btn-primary" onclick="begMoney()">🙏 Попрошайничать</button>
    <button class="btn btn-secondary" onclick="washWindows()">🪟 Помыть окна (+5₽, −5⚡)</button>
  `;
}

// ─── ДЕЙСТВИЯ ─────────────────────────────────────────────────
function addItem(itemId, qty = 1) {
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

function buyItem(itemId, qty = 1) {
  const it = ITEMS[itemId];
  if (!it) return;
  const price = getShopPrice(itemId) * qty;
  if (S.money < price) { toast('Не хватает денег', 'error'); playSound('error'); return; }
  S.money -= price;
  addItem(itemId, qty);
  toast(`Куплено: ${it.name}`, 'success');
  playSound('buy');
  renderHUD();
  save();
  const current = document.querySelector('.modal-overlay[data-id="location"]');
  if (current) { closeModal('location'); setTimeout(() => openLocationPanel(S.currentLocation), 100); }
  updateTutorial();
}

function sellItem(itemId) {
  const it = ITEMS[itemId];
  if (!it) return;
  if (!removeItem(itemId, 1)) return;
  const price = Math.round(it.price * 0.6);
  S.money += price;
  S.totalEarned = (S.totalEarned || 0) + price;
  S.tutorialSellDone = true;
  toast(`Продано: ${it.name} (+${fmt(price)} ₽)`, 'success');
  playSound('coin');
  renderHUD();
  closeModal('location');
  setTimeout(() => openLocationPanel(S.currentLocation), 100);
  checkQuests();
  updateTutorial();
  save();
}

function eatItem(itemId) {
  const it = ITEMS[itemId];
  if (!it || it.type !== 'food') return;
  if (!removeItem(itemId, 1)) return;
  S.satiety = clamp(S.satiety + (it.satiety || 0), 0, 100);
  if (it.health) S.health = clamp(S.health + it.health, 0, 100);
  if (it.energy) S.energy = clamp(S.energy + it.energy, 0, 100);
  toast(`Съедено: ${it.name}`, 'success');
  playSound('buy');
  renderHUD();
  closeModal('inventory');
  closeModal('iteminfo');
  checkQuests();
  updateTutorial();
  save();
}

function equipItem(itemId) {
  const it = ITEMS[itemId];
  if (!it || it.type !== 'cloth') return;
  const slot = it.slot;
  if (!slot) { toast('Нельзя надеть', 'error'); return; }
  S.equipment[slot] = { itemId, condition: 100 };
  removeItem(itemId, 1);
  S.reputation = clamp(S.reputation + (it.rep || 0) * 0.2, 0, 100);
  toast(`Надето: ${it.name}`, 'success');
  playSound('success');
  renderHUD();
  updatePlayerSprite();
  closeModal('iteminfo');
  save();
}

function begMoney() {
  if (S.energy < 10) { toast('Нет сил', 'error'); return; }
  S.energy -= 10;
  const roll = Math.random();
  if (roll < 0.5) { const m = randInt(20, 80); S.money += m; toast(`💵 Прохожий дал ${m} ₽`, 'success'); playSound('coin'); }
  else if (roll < 0.8) toast('Никто не подал.', 'info');
  else { S.reputation = clamp(S.reputation - 2, 0, 100); toast('Полиция прогнала. −2 репутации', 'error'); }
  closeModal('location');
  renderHUD();
  save();
}
function washWindows() {
  if (S.energy < 5) { toast('Нет сил', 'error'); return; }
  S.energy -= 5; S.money += 5; S.hygiene = clamp(S.hygiene - 3, 0, 100);
  toast('+5 ₽', 'success');
  renderHUD(); save();
}
function restCafe() {
  if (S.money < 100) { toast('Не хватает денег', 'error'); return; }
  S.money -= 100; S.energy = clamp(S.energy + 30, 0, 100);
  toast('☕ Отдохнули', 'success');
  playSound('coin'); renderHUD();
}
function makeDeposit() {
  const dep = Math.min(S.money, 1000000);
  if (dep < 100) { toast('Минимум 100 ₽', 'error'); return; }
  S.money -= dep; S.deposit = (S.deposit || 0) + dep;
  toast(`💰 Вклад: ${fmt(dep)} ₽`, 'success');
  playSound('coin'); closeModal('location'); renderHUD();
}
function sleepNow() {
  const h = HOUSINGS[S.housing];
  if (S.housing === 'street') { toast('🚫 На улице спать холодно', 'error'); return; }
  S.sleeping = true;
  closeModal('location');
  toast('💤 Вы спите...', 'info');
  setTimeout(() => {
    S.energy = clamp(h.energyRestore, 0, 100);
    S.health = clamp(S.health + 3, 0, 100);
    S.hygiene = clamp(S.hygiene - 8, 0, 100);
    S.satiety = clamp(S.satiety - 15, 0, 100);
    S.gameMinute += 6 * 60;
    recalcTime();
    S.sleeping = false;
    S.tutorialSlept = true;
    toast('☀️ Доброе утро!', 'success');
    playSound('success');
    renderHUD(); checkQuests(); updateTutorial(); save();
  }, 700);
}

// ─── РАБОТА: мини-игра ────────────────────────────────────────
function doWork(jobId) {
  const job = JOBS[jobId];
  if (!job) return;
  if (S.energy < job.energy) { toast('Не хватает энергии', 'error'); return; }
  if (S.educationLevel < job.reqEdu) { toast('Не хватает образования', 'error'); return; }
  if (S.reputation < job.reqRep) { toast('Не хватает репутации', 'error'); return; }
  if (job.reqSpec && S.specialty !== job.reqSpec) { toast('Не та специальность', 'error'); return; }

  if (S.currentJob !== jobId) {
    S.currentJob = jobId;
    toast(`💼 Вы устроены: ${job.name}`, 'success');
    playSound('success');
  }
  startWorkMinigame(job, () => {
    let pay = job.pay;
    let bonusMsg = '';
    if (chance(0.3)) { pay = Math.round(pay * 1.5); bonusMsg = ' (+50% бонус!)'; }
    S.money += pay;
    S.totalEarned = (S.totalEarned || 0) + pay;
    S.energy = clamp(S.energy - job.energy, 0, 100);
    S.satiety = clamp(S.satiety - 10, 0, 100);
    S.reputation = clamp(S.reputation + 1, 0, 100);
    toast(`💰 Зарплата: ${fmt(pay)} ₽${bonusMsg}`, 'success');
    playSound('coin');
    renderHUD(); closeModal('location'); checkQuests(); updateTutorial(); save();
  });
}

function startWorkMinigame(job, callback) {
  closeModal('location');
  const modal = openModal('work', `💼 ${job.name}`, `
    <canvas id="workCanvas" width="420" height="200" style="cursor:crosshair;max-width:100%;"></canvas>
    <p style="text-align:center; font-size:12px;">Кликай по монеткам! 5 секунд.</p>
  `);
  const canvas = modal.querySelector('#workCanvas');
  const ctx = canvas.getContext('2d');
  const coins = [];
  let score = 0, timeLeft = 5.0, running = true, lastTime = performance.now();

  function spawn() { coins.push({ x: rand(30, 390), y: rand(30, 170), r: 18, life: 1.5, born: performance.now() }); }
  for (let i = 0; i < 3; i++) spawn();

  function draw(t) {
    if (!running) return;
    const dt = (t - lastTime) / 1000;
    lastTime = t; timeLeft -= dt;

    ctx.fillStyle = '#1a1410'; ctx.fillRect(0, 0, 420, 200);

    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      const age = (t - c.born) / 1000;
      if (age > c.life || timeLeft <= 0) { coins.splice(i, 1); continue; }
      ctx.globalAlpha = Math.max(0, age > c.life - 0.3 ? (c.life - age) / 0.3 : 1);
      ctx.font = '32px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🪙', c.x, c.y);
      ctx.globalAlpha = 1;
    }

    ctx.fillStyle = '#ffcc44';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('Монет: ' + score, 10, 24);
    ctx.fillStyle = '#6bd66b';
    ctx.fillText('⏱ ' + Math.max(0, timeLeft).toFixed(1), 330, 24);

    if (timeLeft > 0 && chance(0.02)) spawn();
    if (timeLeft <= 0) { running = false; closeModal('work'); callback(score); return; }
    requestAnimationFrame(draw);
  }
  canvas.onclick = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * canvas.width / rect.width;
    const y = (e.clientY - rect.top) * canvas.height / rect.height;
    for (let i = coins.length - 1; i >= 0; i--) {
      const c = coins[i];
      if (Math.hypot(c.x - x, c.y - y) < c.r) {
        coins.splice(i, 1); score++; playSound('coin'); break;
      }
    }
  };
  requestAnimationFrame(draw);
}

// ─── ЭКЗАМЕН ──────────────────────────────────────────────────
const EDU_QUESTIONS = [
  { q:'Сколько будет 2+2×2?', a:['6','8','4','10'], correct:0 },
  { q:'Столица России?', a:['СПб','Москва','Казань','Новосибирск'], correct:1 },
  { q:'Планета ближайшая к Солнцу?', a:['Венера','Земля','Меркурий','Марс'], correct:2 },
  { q:'Кто написал «Войну и мир»?', a:['Пушкин','Толстой','Достоевский','Чехов'], correct:1 },
  { q:'Сколько цветов в радуге?', a:['5','6','7','8'], correct:2 },
  { q:'Что такое HTML?', a:['Язык прогр.','Язык разметки','БД','ОС'], correct:1 },
  { q:'Сколько дней в високосном году?', a:['360','365','366','350'], correct:2 },
  { q:'Кто открыл Америку?', a:['Магеллан','Колумб','Васко да Гама','Кук'], correct:1 },
];

function takeExam(kind) {
  const edu = EDUCATION[kind];
  if (S.educationLevel < edu.reqEdu) { toast('Сначала предыдущая ступень', 'error'); return; }
  if (S.money < edu.cost) { toast('Не хватает денег', 'error'); playSound('error'); return; }

  const shuffled = [...EDU_QUESTIONS].sort(() => Math.random() - 0.5);
  const questions = shuffled.slice(0, 5);

  runQuiz(questions, 3, (passed) => {
    closeModal('location');
    if (passed) {
      S.money -= edu.cost;
      if (kind === 'school') S.educationLevel = 1;
      else if (kind === 'college') S.educationLevel = 2;
      else if (kind === 'university') { S.educationLevel = 3; chooseSpecialty(); }
      S.reputation = clamp(S.reputation + 5, 0, 100);
      toast(`🎓 ${edu.name} окончено!`, 'success');
      playSound('success');
      checkQuests(); updateTutorial();
    } else {
      S.money = Math.max(0, S.money - edu.cost);
      toast(`❌ Экзамен провален`, 'error');
      playSound('fail');
    }
    renderHUD(); save();
  });
}

function chooseSpecialty() {
  const opts = Object.entries(SPECIALTIES).map(([id, name]) => 
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
  checkQuests(); save();
}

function runQuiz(questions, needCorrect, callback) {
  let idx = 0, correct = 0;
  function showQuestion() {
    if (idx >= questions.length) { closeModal('quiz'); callback(correct >= needCorrect); return; }
    const q = questions[idx];
    const opts = q.a.map((text, i) => `<button class="quiz-option" data-i="${i}">${text}</button>`).join('');
    const modal = openModal('quiz', `📝 Вопрос ${idx + 1}/${questions.length}`, `
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">${opts}</div>
      <p class="hint" style="margin-top:10px;">Правильных: ${correct}/${idx}</p>
    `);
    modal.querySelectorAll('.quiz-option').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.i);
        if (i === q.correct) { btn.classList.add('correct'); correct++; playSound('success'); }
        else { btn.classList.add('wrong'); modal.querySelectorAll('.quiz-option')[q.correct].classList.add('correct'); playSound('fail'); }
        modal.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        idx++;
        setTimeout(() => { closeModal('quiz'); setTimeout(showQuestion, 100); }, 900);
      };
    });
  }
  showQuestion();
}

// ─── QTE (с кнопками для тача) ────────────────────────────────
function runQTE(callback) {
  const arrows = ['←','↑','→','↓'];
  const seq = [];
  for (let i = 0; i < 4; i++) seq.push(pick(arrows));
  let idx = 0, failed = false, timer = null;

  function render() {
    const html = seq.map((a, i) => {
      const cls = i < idx ? 'done' : (i === idx ? 'next' : '');
      return `<span class="qte-arrow ${cls}">${a}</span>`;
    }).join('');
    const touchBtns = `<div style="text-align:center; margin-top:10px;">
      <button class="qte-touch-btn" data-arrow="←">←</button>
      <button class="qte-touch-btn" data-arrow="↑">↑</button>
      <button class="qte-touch-btn" data-arrow="↓">↓</button>
      <button class="qte-touch-btn" data-arrow="→">→</button>
    </div>`;

    const modal = document.querySelector('.modal-overlay[data-id="qte"]');
    if (!modal) return;
    modal.querySelector('.modal-body').innerHTML = `
      <p style="text-align:center; font-size:14px; margin-bottom:10px;">Нажми последовательность!</p>
      <div class="qte-row">${html}</div>
      ${touchBtns}
      <p class="hint" style="text-align:center; margin-top:10px;">Клавиатура (стрелки) или кнопки. 4 сек.</p>
    `;
    modal.querySelectorAll('.qte-touch-btn').forEach(b => {
      b.onclick = () => press(b.dataset.arrow);
    });
  }

  function press(arrow) {
    if (failed) return;
    if (arrow === seq[idx]) {
      idx++; playSound('click'); render();
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
  }

  function keyHandler(e) {
    const map = { 'ArrowLeft':'←', 'ArrowUp':'↑', 'ArrowRight':'→', 'ArrowDown':'↓' };
    if (map[e.key]) { e.preventDefault(); press(map[e.key]); }
  }

  openModal('qte', '⚡ QTE', '');
  render();
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

// ─── ПОКУПКИ ──────────────────────────────────────────────────
function buyHousing(id) {
  const h = HOUSINGS[id];
  if (!h || S.housing === id) return;
  if (h.cost > 0 && S.money < h.cost) { toast('Не хватает денег', 'error'); return; }
  if (id === 'penthouse' && S.businesses.length === 0) { toast('Нужен бизнес', 'error'); return; }
  S.money -= h.cost;
  S.housing = id;
  toast(`🏠 Переезд: ${h.name}`, 'success');
  playSound('success'); renderHUD(); closeModal('location'); checkQuests(); updateTutorial(); save();
}

function buyTransport(id) {
  const t = TRANSPORTS[id];
  if (!t || S.transport === id) return;
  if (t.cost > 0 && S.money < t.cost) { toast('Не хватает денег', 'error'); return; }
  S.money -= t.cost;
  S.transport = id;
  S.reputation = clamp(S.reputation + t.rep, 0, 100);
  toast(`🚗 Куплено: ${t.name}`, 'success');
  playSound('success'); renderHUD(); closeModal('location'); checkQuests(); save();
}

function buyBusiness(id) {
  const biz = BUSINESSES[id];
  if (!biz || S.businesses.includes(id)) return;
  if (S.money < biz.cost) { toast('Не хватает денег', 'error'); return; }
  if (S.educationLevel < 3) { toast('Нужно высшее образование', 'error'); return; }
  S.money -= biz.cost;
  S.businesses.push(id);
  toast(`📊 Открыт бизнес: ${biz.name}`, 'success');
  playSound('success'); renderHUD(); closeModal('location'); checkQuests(); save();
}

// ─── КРАФТ ────────────────────────────────────────────────────
function openCraft() {
  let rows = '';
  for (const [id, rec] of Object.entries(RECIPES)) {
    let can = S.energy >= rec.energy && (!rec.money || S.money >= rec.money);
    let ingredients = '';
    for (const [ingId, need] of Object.entries(rec.items)) {
      const have = countItem(ingId);
      const ok = have >= need;
      if (!ok && ingId !== 'screwdriver') can = false;
      ingredients += `<span style="color:${ok?'var(--green)':'var(--red)'}">${ITEMS[ingId].name}${have}/${need}</span> `;
    }
    rows += `
      <div class="list-row">
        <div class="ico">${itemSvg(rec.result.itemId)}</div>
        <div class="info">
          <div class="name">${rec.name}</div>
          <div class="desc">${ingredients} · ⚡${rec.energy}</div>
        </div>
        <button class="btn btn-primary" ${!can ? 'disabled' : ''} onclick="doCraft('${id}')">Создать</button>
      </div>`;
  }
  openModal('craft', '🔧 Крафт', `<p class="hint">Создавайте предметы для продажи.</p>${rows}`);
}

function doCraft(id) {
  const rec = RECIPES[id];
  if (!rec) return;
  if (S.energy < rec.energy) { toast('Мало энергии', 'error'); return; }
  if (rec.money && S.money < rec.money) { toast('Мало денег', 'error'); return; }
  for (const [ingId, need] of Object.entries(rec.items)) {
    if (ingId === 'screwdriver') continue;
    if (countItem(ingId) < need) { toast('Не хватает ингредиентов', 'error'); return; }
  }
  for (const [ingId, need] of Object.entries(rec.items)) {
    if (ingId !== 'screwdriver') removeItem(ingId, need);
  }
  if (rec.money) S.money -= rec.money;
  S.energy -= rec.energy;
  addItem(rec.result.itemId, rec.result.qty);
  toast(`✅ Создано: ${ITEMS[rec.result.itemId].name}`, 'success');
  playSound('success'); renderHUD();
  closeModal('craft');
  setTimeout(openCraft, 100);
  save();
}

// ─── ИНВЕНТАРЬ ────────────────────────────────────────────────
function openInventory() {
  let slots = '';
  const totalSlots = 30;
  for (let i = 0; i < totalSlots; i++) {
    const item = S.inventory[i];
    if (!item) slots += `<div class="inv-slot empty"></div>`;
    else {
      const it = ITEMS[item.itemId];
      slots += `<div class="inv-slot" onclick="openItemInfo('${item.itemId}')" title="${it.name}">
        ${itemSvg(item.itemId)}
        ${item.qty > 1 ? `<span class="qty">${item.qty}</span>` : ''}
      </div>`;
    }
  }
  openModal('inventory', '🎒 Инвентарь', `
    <div class="inv-grid">${slots}</div>
    <p class="hint">Стоимость: ${fmt(totalItemValue())} ₽ · Продажа — только на Барахолке 🏪</p>
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
  if (it.type === 'valuable' || it.type === 'material') {
    actions += `<p class="hint">Продать можно только на 🏪 Барахолке.</p>`;
  }
  openModal('iteminfo', `${it.name}`, `
    <div style="text-align:center; margin-bottom:14px;">${itemSvg(itemId, 80)}</div>
    <p>Тип: ${it.type}</p>
    <p>Цена: ${fmt(it.price)} ₽</p>
    ${it.satiety ? `<p>Сытость: +${it.satiety}</p>` : ''}
    ${it.health ? `<p>HP: ${it.health > 0 ? '+' : ''}${it.health}</p>` : ''}
    ${it.energy ? `<p>Энергия: +${it.energy}</p>` : ''}
    ${it.rep ? `<p>Репутация: +${it.rep}</p>` : ''}
    <div style="display:flex; gap:8px; margin-top:14px; flex-wrap:wrap;">${actions}</div>
  `, {
    buttons: [{ label: 'Назад', cls: 'btn-secondary', action: () => { closeModal('iteminfo'); openInventory(); } }]
  });
}

// ─── ПЕРСОНАЖ ─────────────────────────────────────────────────
function openCharacter() {
  const slots = [
    ['head', 'Голова'], ['body', 'Тело'], ['legs', 'Ноги'],
    ['shoes', 'Обувь'], ['accessory', 'Аксессуар'],
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
        ${itemSvg(eq.itemId)}
        <span class="cond">${eq.condition}%</span>
      </div>`;
    } else {
      html += `<div class="inv-slot empty" title="${label}"></div>`;
    }
  }
  html += `</div>`;
  openModal('character', '👤 Персонаж', html);
}

// ─── ЖУРНАЛ ───────────────────────────────────────────────────
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

// ─── НАСТРОЙКИ ────────────────────────────────────────────────
function openSettings() {
  openModal('settings', '⚙️ Настройки', `
    <p>Громкость: <input type="range" min="0" max="100" value="${Math.round(VOLUME.master * 100)}" id="volSlider" style="width:180px; vertical-align:middle;"></p>
    <p>Язык: 🇷🇺 Русский</p>
    <p>Игра: Из грязи в князи · v2.0</p>
    <p class="hint">Автосохранение каждые 30 сек и при закрытии.</p>
    <p style="margin-top:14px;">
      <button class="btn btn-secondary" onclick="skipTutorial()" style="padding:8px 14px; font-size:12px;">Скрыть обучение</button>
    </p>
  `, {
    buttons: [
      { label: '💾 Сохранить', cls: 'btn-primary', action: () => { save(); toast('💾 Сохранено', 'success'); } },
      { label: '🗑️ Сбросить', cls: 'btn-danger', action: () => {
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

// ─── БОКОВАЯ ПАНЕЛЬ ───────────────────────────────────────────
function openPanel(name) {
  playSound('click');
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('open');
  switch (name) {
    case 'inventory': openInventory(); break;
    case 'craft': openCraft(); break;
    case 'work': openModal('work_menu', '💼 Работа', `
      <p>Идите на <strong>Завод 🏭</strong> (рабочие) или <strong>Офис 🏢</strong> (умные).</p>
      <p>Текущая работа: <strong>${S.currentJob ? JOBS[S.currentJob].name : 'нет'}</strong></p>
    `); break;
    case 'shop': openModal('shop_menu', '🛒 Магазин', `<p>Идите в <strong>Магазин 🛒</strong> на карте.</p>`); break;
    case 'flea': openModal('flea_menu', '🏪 Барахолка', `<p>Идите на <strong>Барахолку 🏪</strong> — там можно продать хлам.</p>`); break;
    case 'education': openModal('edu_menu', '🎓 Обучение', `<p>Идите в <strong>Школу 🏫</strong>, <strong>Колледж 🎓</strong> или <strong>Вуз 🏛️</strong>.</p>`); break;
    case 'housing': openModal('housing_menu', '🏠 Жильё', `<p>Идите в <strong>Ночлежку 🛏️</strong>.</p>`); break;
    case 'transport': openModal('transport_menu', '🚗 Транспорт', `<p>Идите в <strong>Автосалон 🚗</strong>.</p>`); break;
    case 'business': openModal('business_menu', '📊 Бизнес', `<p>Идите в <strong>Бизнес-центр 💼</strong>.</p>`); break;
    case 'character': openCharacter(); break;
    case 'quests': openQuests(); break;
    case 'settings': openSettings(); break;
  }
}

// ─── NPC СОБЫТИЯ ──────────────────────────────────────────────
function triggerRandomEncounter() {
  const type = pick(['beggar','thug','rich','girl','passerby']);
  switch (type) {
    case 'beggar': encounterBeggar(); break;
    case 'thug': encounterThug(); break;
    case 'rich': encounterRich(); break;
    case 'girl': encounterGirl(); break;
    case 'passerby': encounterPasserby(); break;
  }
}
function npcPortrait(emoji, color) {
  return `<div style="width:80px;height:80px;border-radius:50%;background:${color};
    display:flex;align-items:center;justify-content:center;font-size:44px;margin:0 auto 10px;
    box-shadow:0 4px 20px rgba(0,0,0,0.5);border:3px solid rgba(255,255,255,0.15);">${emoji}</div>`;
}

function encounterBeggar() {
  openModal('npc', '🙏 Попрошайка', `
    ${npcPortrait('🧔','#4a3020')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Слышь, брат... Не найдётся полтинника? Второй день не ел.»
    </p>
  `, { buttons: [
    { label: 'Дам 50 ₽', cls: 'btn-primary', action: () => {
      if (S.money < 50) { toast('Нет денег', 'error'); closeModal('npc'); return; }
      S.money -= 50; S.reputation = clamp(S.reputation + 2, 0, 100);
      toast('+2 репутации', 'success'); closeModal('npc'); renderHUD();
    }},
    { label: 'Извини', cls: 'btn-secondary', action: () => closeModal('npc') },
    { label: 'Дам еду', cls: 'btn-secondary', action: () => {
      if (countItem('bread') > 0) { removeItem('bread', 1); S.reputation = clamp(S.reputation + 3, 0, 100); toast('+3 репутации', 'success'); }
      else toast('Нет еды', 'error');
      closeModal('npc');
    }},
  ]});
}

function encounterThug() {
  openModal('npc', '😠 Гопники', `
    ${npcPortrait('😠','#2a0a0a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Эй, лох! Гони деньги!»
    </p>
  `, { buttons: [
    { label: '💸 Отдать всё', cls: 'btn-danger', action: () => {
      const lost = Math.floor(S.money * 0.5); S.money -= lost;
      toast(`−${fmt(lost)} ₽`, 'error'); playSound('fail'); closeModal('npc'); renderHUD();
    }},
    { label: '🏃 Убежать (QTE)', cls: 'btn-primary', action: () => {
      closeModal('npc');
      runQTE((ok) => {
        if (ok) toast('✅ Вы убежали!', 'success');
        else {
          const lost = Math.floor(S.money * 0.4); S.money -= lost;
          S.health = clamp(S.health - 15, 0, 100);
          toast(`Побили. −15 HP, −${fmt(lost)} ₽`, 'error'); playSound('fail'); renderHUD();
        }
      });
    }},
    { label: '👊 Драться', cls: 'btn-danger', action: () => {
      closeModal('npc');
      if (chance(0.4)) { S.money += 200; toast('Победа! +200 ₽', 'success'); playSound('success'); }
      else { S.health = clamp(S.health - 30, 0, 100); toast('Побили. −30 HP', 'error'); playSound('fail'); }
      renderHUD();
    }},
  ]});
}

function encounterRich() {
  openModal('npc', '🤵 Богатый человек', `
    ${npcPortrait('🤵','#1a2244')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Бедняга... Вот тебе немного.»
    </p>
  `, { buttons: [
    { label: '🙏 Взять', cls: 'btn-primary', action: () => {
      const m = randInt(100, 400); S.money += m;
      toast(`Получено ${m} ₽`, 'success'); playSound('coin'); closeModal('npc'); renderHUD();
    }},
    { label: 'Отказаться', cls: 'btn-secondary', action: () => {
      S.reputation = clamp(S.reputation + 1, 0, 100); toast('+1 репутации', 'info'); closeModal('npc');
    }},
  ]});
}

function encounterGirl() {
  openModal('npc', '👩 Девушка в беде', `
    ${npcPortrait('👩','#4a2a3a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Помогите! У меня украли сумку!»
    </p>
  `, { buttons: [
    { label: 'Помочь', cls: 'btn-primary', action: () => {
      closeModal('npc');
      if (chance(0.7)) {
        S.reputation = clamp(S.reputation + 5, 0, 100);
        const r = randInt(200, 500); S.money += r;
        toast(`💕 +${r} ₽ и +5 репутации`, 'success'); playSound('success');
      } else toast('Не удалось помочь', 'info');
      renderHUD();
    }},
    { label: 'Пройти мимо', cls: 'btn-secondary', action: () => closeModal('npc') },
  ]});
}

function encounterPasserby() {
  openModal('npc', '🚶 Прохожий', `
    ${npcPortrait('🧑','#3a3a4a')}
    <p style="text-align:center; font-style:italic; color:var(--text-dim);">
      «Как пройти к вокзалу?»
    </p>
  `, { buttons: [
    { label: 'Подсказать', cls: 'btn-primary', action: () => { S.reputation = clamp(S.reputation + 1, 0, 100); toast('+1 репутации', 'info'); closeModal('npc'); }},
    { label: 'Не знаю', cls: 'btn-secondary', action: () => closeModal('npc') },
  ]});
}

// ─── КВЕСТЫ ───────────────────────────────────────────────────
function checkQuests() {
  if (!S) return;
  const q = S.quests;
  function complete(id) {
    if (q[id] !== 'active') return;
    q[id] = 'done';
    const quest = QUESTS[id];
    if (quest.reward) { S.money += quest.reward; toast(`📜 Квест: ${quest.title} (+${fmt(quest.reward)} ₽)`, 'gold'); }
    else toast(`📜 Квест: ${quest.title}`, 'gold');
    playSound('success');
  }

  if (q.tutorial_dig === 'active' && S.inventory.some(s => s.itemId !== 'bottle' && s.itemId !== 'rag')) {
    complete('tutorial_dig'); q.tutorial_sell = 'active';
  }
  if (q.tutorial_sell === 'active' && (S.totalEarned || 0) > 0) {
    complete('tutorial_sell'); q.tutorial_eat = 'active';
  }
  if (q.tutorial_eat === 'active' && S.satiety > 70) complete('tutorial_eat');
  if (q.get_shelter !== 'done' && S.housing !== 'street' && S.housing !== 'shelter') {
    if (!q.get_shelter) q.get_shelter = 'active';
    complete('get_shelter');
  }
  if (q.get_job !== 'done' && S.currentJob) { if (!q.get_job) q.get_job = 'active'; complete('get_job'); }
  if (q.get_school !== 'done' && S.educationLevel >= 1) { if (!q.get_school) q.get_school = 'active'; complete('get_school'); }
  if (q.get_college !== 'done' && S.educationLevel >= 2) { if (!q.get_college) q.get_college = 'active'; complete('get_college'); }
  if (q.get_university !== 'done' && S.educationLevel >= 3) { if (!q.get_university) q.get_university = 'active'; complete('get_university'); }
  if (q.get_apartment !== 'done' && ['studio','penthouse'].includes(S.housing)) { if (!q.get_apartment) q.get_apartment = 'active'; complete('get_apartment'); }
  if (q.get_car !== 'done' && ['newcar','luxury'].includes(S.transport)) { if (!q.get_car) q.get_car = 'active'; complete('get_car'); }
  if (q.get_business !== 'done' && S.businesses.length > 0) { if (!q.get_business) q.get_business = 'active'; complete('get_business'); }
  if (q.millionaire !== 'done' && S.money >= 1000000) { if (!q.millionaire) q.millionaire = 'active'; complete('millionaire'); }
  if (q.final !== 'done' && S.money >= 10000000 && S.housing === 'penthouse' && S.businesses.length > 0) {
    if (!q.final) q.final = 'active';
    complete('final');
    showFinalCutscene();
  }
  save();
}

function showFinalCutscene() {
  openModal('final', '🏆 Финал', `
    <div style="text-align:center; padding:16px 0;">
      <div style="font-size:72px; margin-bottom:16px;">👑</div>
      <h2 style="color:var(--gold); font-size:24px; margin-bottom:14px;">Вы сделали это!</h2>
      <p style="font-size:15px; line-height:1.7;">
        Ещё вчера вы копались в мусорке.<br>
        Сегодня у вас пентхаус, бизнес и миллионы.<br><br>
        <strong>Из грязи в князи — путь пройден.</strong>
      </p>
      <p style="margin-top:16px; color:var(--text-dim); font-style:italic;">
        Итог: ${fmt(S.money)} ₽ · День ${S.day} · Репутация ${S.reputation}/100
      </p>
    </div>
  `, { buttons: [
    { label: '👑 Продолжить', cls: 'btn-primary', action: () => closeModal('final') },
    { label: '🔄 Новая игра', cls: 'btn-secondary', action: () => { localStorage.removeItem(SAVE_KEY); location.reload(); }},
  ]});
}

// ─── СТАРТ ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnNewGame').onclick = () => {
    if (hasSave() && !confirm('Есть сохранение. Начать новую игру?')) return;
    startNewGame();
  };
  document.getElementById('btnContinue').onclick = continueGame;
  if (hasSave()) document.getElementById('btnContinue').style.display = 'inline-block';

  document.querySelectorAll('.side-btn').forEach(btn => {
    btn.onclick = () => openPanel(btn.dataset.panel);
  });

  // Бургер
  const burger = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  burger.onclick = () => { sidebar.classList.toggle('open'); backdrop.classList.toggle('open'); };
  backdrop.onclick = () => { sidebar.classList.remove('open'); backdrop.classList.remove('open'); };

  // Tutorial skip
  document.getElementById('tutorialSkip').onclick = skipTutorial;

  // Redraw map on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (S) {
        const player = document.getElementById('mapPlayer');
        const wasVisible = player?.innerHTML;
        drawMapCanvas();
        if (wasVisible) updatePlayerSprite();
      }
    }, 250);
  });

  document.addEventListener('click', () => { if (!audioCtx) initAudio(); }, { once: true });
  window.addEventListener('beforeunload', () => { if (S) save(); });
});

function startNewGame() {
  S = createNewState();
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').style.display = 'grid';
  renderMap();
  renderHUD();
  updateTutorial();
  startTick();
  if (saveTimer) clearInterval(saveTimer);
  saveTimer = setInterval(save, 30000);
  save();
  setTimeout(() => toast('💡 Следуй подсказкам обучения внизу экрана.', 'info'), 400);
}

function continueGame() {
  const data = loadSave();
  if (!data) { toast('Сохранение не найдено', 'error'); return; }
  S = data;
  if (!S.inventory) S.inventory = [];
  if (!S.quests) S.quests = {};
  if (!S.equipment) S.equipment = { head:null, body:null, legs:null, shoes:null, accessory:null };
  if (!S.businesses) S.businesses = [];
  if (!S.dumps) S.dumps = { dump1:100, dump2:100, dump3:100, dump4:100 };
  if (!S.visitedDumps) S.visitedDumps = [];
  if (S.totalEarned === undefined) S.totalEarned = 0;
  if (S.totalFound === undefined) S.totalFound = 0;
  if (S.tutorialStep === undefined) S.tutorialStep = 0;
  if (S.tutorialSkipped === undefined) S.tutorialSkipped = false;
  if (S.tutorialSellDone === undefined) S.tutorialSellDone = false;
  if (S.tutorialSlept === undefined) S.tutorialSlept = false;
  S.traveling = false;
  S.sleeping = false;
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('game').style.display = 'grid';
  renderMap();
  renderHUD();
  updateTutorial();
  startTick();
  if (saveTimer) clearInterval(saveTimer);
  saveTimer = setInterval(save, 30000);
  toast('💾 Игра загружена', 'success');
}

// Экспорт
window.travelTo = travelTo;
window.startDumpDig = startDumpDig;
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
window.skipTutorial = skipTutorial;