// Fake Blooket Market – client-side only

const PACKS = [
  {
    id: "space",
    name: "Space Pack",
    cost: 20,
    emoji: "🚀",
    color1: "#1a237e",
    color2: "#3949ab",
    blooks: [
      { name: "Astronaut", emoji: "👨‍🚀", rarity: "legendary", weight: 1 },
      { name: "Alien", emoji: "👽", rarity: "epic", weight: 5 },
      { name: "Rocket", emoji: "🚀", rarity: "rare", weight: 15 },
      { name: "Planet", emoji: "🪐", rarity: "uncommon", weight: 30 },
      { name: "Star", emoji: "⭐", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "medieval",
    name: "Medieval Pack",
    cost: 20,
    emoji: "⚔️",
    color1: "#4a148c",
    color2: "#7b1fa2",
    blooks: [
      { name: "King", emoji: "👑", rarity: "legendary", weight: 2 },
      { name: "Knight", emoji: "🛡️", rarity: "epic", weight: 8 },
      { name: "Dragon", emoji: "🐉", rarity: "rare", weight: 15 },
      { name: "Castle", emoji: "🏰", rarity: "uncommon", weight: 35 },
      { name: "Sword", emoji: "🗡️", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "safari",
    name: "Safari Pack",
    cost: 20,
    emoji: "🦒",
    color1: "#e65100",
    color2: "#ff8f00",
    blooks: [
      { name: "Lion", emoji: "🦁", rarity: "legendary", weight: 1 },
      { name: "Rainbow Panda", emoji: "🐼", rarity: "chroma", weight: 0.5 },
      { name: "Giraffe", emoji: "🦒", rarity: "epic", weight: 6 },
      { name: "Zebra", emoji: "🦓", rarity: "rare", weight: 18 },
      { name: "Elephant", emoji: "🐘", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "aquatic",
    name: "Aquatic Pack",
    cost: 25,
    emoji: "🐋",
    color1: "#006064",
    color2: "#00acc1",
    blooks: [
      { name: "Megalodon", emoji: "🦈", rarity: "legendary", weight: 1 },
      { name: "Baby Shark", emoji: "🦈", rarity: "legendary", weight: 1 },
      { name: "Whale", emoji: "🐋", rarity: "epic", weight: 7 },
      { name: "Dolphin", emoji: "🐬", rarity: "rare", weight: 20 },
      { name: "Fish", emoji: "🐟", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "dino",
    name: "Dino Pack",
    cost: 25,
    emoji: "🦖",
    color1: "#1b5e20",
    color2: "#43a047",
    blooks: [
      { name: "T-Rex", emoji: "🦖", rarity: "legendary", weight: 1 },
      { name: "Triceratops", emoji: "🦕", rarity: "epic", weight: 6 },
      { name: "Raptor", emoji: "🦎", rarity: "rare", weight: 18 },
      { name: "Egg", emoji: "🥚", rarity: "uncommon", weight: 40 },
      { name: "Fossil", emoji: "🦴", rarity: "uncommon", weight: 35 },
    ],
  },
  {
    id: "bot",
    name: "Bot Pack",
    cost: 20,
    emoji: "🤖",
    color1: "#263238",
    color2: "#546e7a",
    blooks: [
      { name: "Mega Bot", emoji: "🤖", rarity: "legendary", weight: 1 },
      { name: "Lil Bot", emoji: "👾", rarity: "epic", weight: 8 },
      { name: "Gear", emoji: "⚙️", rarity: "rare", weight: 20 },
      { name: "Chip", emoji: "💾", rarity: "uncommon", weight: 40 },
      { name: "Wire", emoji: "🔌", rarity: "uncommon", weight: 31 },
    ],
  },
  {
    id: "pirate",
    name: "Pirate Pack",
    cost: 25,
    emoji: "🏴‍☠️",
    color1: "#3e2723",
    color2: "#6d4c41",
    blooks: [
      { name: "Captain Blackbeard", emoji: "🏴‍☠️", rarity: "legendary", weight: 1 },
      { name: "Pirate Pufferfish", emoji: "🐡", rarity: "chroma", weight: 0.5 },
      { name: "Parrot", emoji: "🦜", rarity: "epic", weight: 7 },
      { name: "Treasure", emoji: "💰", rarity: "rare", weight: 20 },
      { name: "Anchor", emoji: "⚓", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "bug",
    name: "Bug Pack",
    cost: 25,
    emoji: "🦋",
    color1: "#33691e",
    color2: "#7cb342",
    blooks: [
      { name: "Butterfly", emoji: "🦋", rarity: "legendary", weight: 1 },
      { name: "Blue Butterfly", emoji: "🦋", rarity: "chroma", weight: 0.5 },
      { name: "Bee", emoji: "🐝", rarity: "epic", weight: 8 },
      { name: "Ladybug", emoji: "🐞", rarity: "rare", weight: 20 },
      { name: "Ant", emoji: "🐜", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "lunch",
    name: "Lunch Pack",
    cost: 25,
    emoji: "🥪",
    color1: "#bf360c",
    color2: "#ff7043",
    blooks: [
      { name: "Sandwich", emoji: "🥪", rarity: "legendary", weight: 1 },
      { name: "Half a Sandwich", emoji: "🍞", rarity: "chroma", weight: 0.4 },
      { name: "Pizza", emoji: "🍕", rarity: "epic", weight: 8 },
      { name: "Burger", emoji: "🍔", rarity: "rare", weight: 20 },
      { name: "Fries", emoji: "🍟", rarity: "uncommon", weight: 40 },
    ],
  },
  {
    id: "breakfast",
    name: "Breakfast Pack",
    cost: 20,
    emoji: "🥞",
    color1: "#f9a825",
    color2: "#ffee58",
    blooks: [
      { name: "Pancake", emoji: "🥞", rarity: "epic", weight: 8 },
      { name: "Egg", emoji: "🍳", rarity: "rare", weight: 20 },
      { name: "Bacon", emoji: "🥓", rarity: "rare", weight: 20 },
      { name: "Toast", emoji: "🍞", rarity: "uncommon", weight: 30 },
      { name: "Coffee", emoji: "☕", rarity: "uncommon", weight: 22 },
    ],
  },
  {
    id: "wonderland",
    name: "Wonderland Pack",
    cost: 20,
    emoji: "🃏",
    color1: "#880e4f",
    color2: "#ec407a",
    blooks: [
      { name: "King of Hearts", emoji: "🃏", rarity: "legendary", weight: 1 },
      { name: "Queen", emoji: "👸", rarity: "epic", weight: 7 },
      { name: "Rabbit", emoji: "🐇", rarity: "rare", weight: 18 },
      { name: "Hat", emoji: "🎩", rarity: "uncommon", weight: 35 },
      { name: "Card", emoji: "🎴", rarity: "uncommon", weight: 39 },
    ],
  },
  {
    id: "ice",
    name: "Ice Monster Pack",
    cost: 25,
    emoji: "❄️",
    color1: "#0d47a1",
    color2: "#42a5f5",
    blooks: [
      { name: "Yeti", emoji: "❄️", rarity: "legendary", weight: 1 },
      { name: "Ice Slime", emoji: "🧊", rarity: "chroma", weight: 1 },
      { name: "Penguin", emoji: "🐧", rarity: "epic", weight: 8 },
      { name: "Snowflake", emoji: "🌨️", rarity: "rare", weight: 20 },
      { name: "Ice", emoji: "🧊", rarity: "uncommon", weight: 40 },
    ],
  },
];

// State
let tokens = 5000;
let selectedPack = null;

// DOM
const tokenCountEl = document.getElementById("token-count");
const packsGrid = document.getElementById("packs-grid");
const historyList = document.getElementById("open-history");
const modal = document.getElementById("modal");
const resultModal = document.getElementById("result-modal");
const qtyInput = document.getElementById("qty-input");
const totalCostEl = document.getElementById("total-cost");
const confirmBuyBtn = document.getElementById("confirm-buy");

// Render packs
function renderPacks() {
  packsGrid.innerHTML = "";
  PACKS.forEach((pack) => {
    const card = document.createElement("div");
    card.className = "pack-card";
    card.style.setProperty("--pack-color1", pack.color1);
    card.style.setProperty("--pack-color2", pack.color2);
    card.innerHTML = `
      <div class="pack-art">${pack.emoji}</div>
      <div class="pack-info">
        <div class="pack-name">${pack.name}</div>
        <div class="pack-cost">🪙 ${pack.cost}</div>
      </div>
    `;
    card.addEventListener("click", () => openBuyModal(pack));
    packsGrid.appendChild(card);
  });
}

function openBuyModal(pack) {
  selectedPack = pack;
  document.getElementById("modal-title").textContent = pack.name;
  document.getElementById("modal-desc").textContent = `Open packs to get random blooks!`;
  qtyInput.value = 1;
  updateTotal();
  modal.classList.remove("hidden");
}

function updateTotal() {
  const qty = Math.max(1, parseInt(qtyInput.value) || 1);
  qtyInput.value = qty;
  const total = qty * selectedPack.cost;
  totalCostEl.textContent = total;
  confirmBuyBtn.disabled = total > tokens;
  confirmBuyBtn.textContent = total > tokens ? "Not enough tokens" : "Buy & Open";
}

qtyInput.addEventListener("input", updateTotal);

document.getElementById("modal-close").addEventListener("click", () => {
  modal.classList.add("hidden");
});

document.getElementById("result-close").addEventListener("click", () => {
  resultModal.classList.add("hidden");
});

confirmBuyBtn.addEventListener("click", () => {
  const qty = Math.max(1, parseInt(qtyInput.value) || 1);
  const total = qty * selectedPack.cost;
  if (total > tokens) return;

  tokens -= total;
  tokenCountEl.textContent = tokens;
  modal.classList.add("hidden");

  // Open packs one by one (show last one)
  let lastBlook = null;
  for (let i = 0; i < qty; i++) {
    lastBlook = openPack(selectedPack);
  }

  // Show result for the last one
  showResult(lastBlook);
});

function weightedRandom(blooks) {
  const totalWeight = blooks.reduce((sum, b) => sum + b.weight, 0);
  let r = Math.random() * totalWeight;
  for (const b of blooks) {
    r -= b.weight;
    if (r <= 0) return b;
  }
  return blooks[blooks.length - 1];
}

function openPack(pack) {
  const blook = weightedRandom(pack.blooks);
  addToHistory(pack, blook);
  return blook;
}

function addToHistory(pack, blook) {
  // Remove empty message
  const empty = historyList.querySelector(".empty");
  if (empty) empty.remove();

  const li = document.createElement("li");
  li.innerHTML = `
    <span style="font-size:22px">${blook.emoji}</span>
    <span><strong>${blook.name}</strong> from ${pack.name}</span>
    <span class="rarity-tag ${blook.rarity}">${blook.rarity}</span>
  `;
  historyList.prepend(li);

  // Keep only last 20
  while (historyList.children.length > 20) {
    historyList.removeChild(historyList.lastChild);
  }
}

function showResult(blook) {
  document.getElementById("result-blook").textContent = blook.emoji;
  const rarityEl = document.getElementById("result-rarity");
  rarityEl.textContent = `${blook.name} (${blook.rarity})`;
  rarityEl.className = `result-rarity rarity-tag ${blook.rarity}`;
  resultModal.classList.remove("hidden");
}

// Close modals on outside click
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});
resultModal.addEventListener("click", (e) => {
  if (e.target === resultModal) resultModal.classList.add("hidden");
});

// Init
renderPacks();
