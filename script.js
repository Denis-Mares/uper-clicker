// --- Globální stav hry ---
let score = 0;
let clickPower = 1;
let passiveIncome = 0;
let clickMultiplier = 1;
let passiveMultiplier = 1;

// Ceny upgradů uložené v objektu pro čistší kód
const prices = {
    farmer: 10,
    garden: 50,
    plantation: 1000,
    greenhouse: 5000,
    lab: 50000,
    monopoly: 500000,
    watering: 10000,
    hoe: 250,
    fertilizer: 2500
};

// --- Načítání uložené pozice ---
const savedState = JSON.parse(localStorage.getItem("lilekClickerSave"));
if (savedState) {
    score = savedState.lilky ?? 0;
    clickPower = savedState.silaKliknuti ?? 1;
    passiveIncome = savedState.pasivniPrijem ?? 0;
    clickMultiplier = savedState.KliknutiMult ?? 1;
    passiveMultiplier = savedState.PasivniMult ?? 1;
    
    prices.farmer = savedState.cenaFarmar ?? 10;
    prices.garden = savedState.cenaZahrada ?? 50;
    prices.plantation = savedState.cenaPlantaze ?? 1000;
    prices.greenhouse = savedState.cenaSklenik ?? 5000;
    prices.lab = savedState.cenaLaborator ?? 50000;
    prices.monopoly = savedState.cenaMonopol ?? 500000;
    prices.watering = savedState.cenaZalivani ?? 10000;
    prices.hoe = savedState.cenaMotyky ?? 250;
    prices.fertilizer = savedState.cenaHnojivo ?? 2500;
}

// --- DOM Elementy ---
const scoreDisplay = document.getElementById("skore");
const passiveDisplay = document.getElementById("pasivni-prijem-text");
const passiveMultDisplay = document.getElementById("pasivni-prijem-text-mult");
const clickDisplay = document.getElementById("klik-text");
const clickMultDisplay = document.getElementById("klik-text-mult");

const el = (id) => document.getElementById(id);

const nodes = {
    trigger: el("btn-lilek"),
    farmer: el("btn-farmar"),
    garden: el("btn-zahrada"),
    plantation: el("btn-plantaz"),
    greenhouse: el("btn-sklenik"),
    lab: el("btn-laborator"),
    monopoly: el("btn-monopol"),
    watering: el("btn-zalivani"),
    hoe: el("btn-motyky"),
    fertilizer: el("btn-hnojivo"),
    reset: el("btn-reset")
};

// --- Perzistence dat ---
const saveGameData = () => {
    const payload = {
        lilky: score,
        silaKliknuti: clickPower,
        pasivniPrijem: passiveIncome,
        cenaFarmar: prices.farmer,
        cenaZahrada: prices.garden,
        cenaPlantaze: prices.plantation,
        cenaSklenik: prices.greenhouse,
        cenaLaborator: prices.lab,
        cenaMonopol: prices.monopoly,
        cenaZalivani: prices.watering,
        cenaMotyky: prices.hoe,
        cenaHnojivo: prices.fertilizer,
        KliknutiMult: clickMultiplier,
        PasivniMult: passiveMultiplier
    };
    localStorage.setItem("lilekClickerSave", JSON.stringify(payload));
};

// --- Renderování UI ---
const renderUI = () => {
    scoreDisplay.textContent = Math.floor(score);
    passiveDisplay.textContent = Math.round(passiveIncome);
    passiveMultDisplay.textContent = Math.round(passiveMultiplier * 10) / 10;
    clickDisplay.textContent = Math.round(clickPower);
    clickMultDisplay.textContent = Math.round(clickMultiplier * 10) / 10;
    
    nodes.farmer.textContent = `🧑🏿‍🌾 Najmout Farmáře (Cena: ${prices.farmer} lilků)`;
    nodes.garden.textContent = `🌲 Koupit Zahradu (Cena: ${prices.garden} lilků)`;
    nodes.plantation.textContent = `🏞️ Koupit Plantáž (Cena: ${prices.plantation} lilků)`;
    nodes.greenhouse.textContent = `🏢 Koupit Skleník (Cena: ${prices.greenhouse} lilků)`;
    nodes.lab.textContent = `🧬 Genetická laboratoř (Cena: ${prices.lab} lilků)`;
    nodes.monopoly.textContent = `🏢 Lilekový monopol (Cena: ${prices.monopoly} lilků)`;
    
    nodes.watering.textContent = `💦 Koupit Zalévání (Cena: ${prices.watering} lilků, dává +20% k síle kliku)`;
    nodes.hoe.textContent = `⛏️ Ostré motyky (Cena: ${prices.hoe} lilků, +2 k síle kliku)`;
    nodes.fertilizer.textContent = `🧪 Prémiové hnojivo (Cena: ${prices.fertilizer} lilků, +15 % k celkovému příjmu)`;
};

// --- Pomocná funkce pro nákup položek ---
const processPurchase = (key, costKey, multi, statUpdate, isMultiplier = false) => {
    if (score >= prices[costKey]) {
        score -= prices[costKey];
        if (isMultiplier) {
            if (costKey === 'watering') clickMultiplier *= multi;
            if (costKey === 'fertilizer') passiveMultiplier *= multi;
        } else {
            if (key === 'click') clickPower += statUpdate;
            if (key === 'passive') passiveIncome += statUpdate;
        }
        prices[costKey] = Math.round(prices[costKey] * multi);
        renderUI();
        saveGameData();
        return true;
    }
    return false;
};

// --- Handlery událostí ---
nodes.trigger.addEventListener("click", () => {
    score += (clickPower * clickMultiplier);
    renderUI();
    saveGameData();
});

nodes.farmer.addEventListener("click", () => {
    if (!processPurchase('click', 'farmer', 1.15, 1)) alert("Nedostatek prostředků na farmáře!");
});

nodes.garden.addEventListener("click", () => {
    if (!processPurchase('passive', 'garden', 1.15, 1)) alert("Nedostatek prostředků na zahradu!");
});

nodes.plantation.addEventListener("click", () => {
    if (!processPurchase('passive', 'plantation', 1.15, 1)) alert("Nedostatek prostředků na plantáž!");
});

nodes.greenhouse.addEventListener("click", () => {
    if (!processPurchase('passive', 'greenhouse', 1.15, 50)) alert("Nedostatek prostředků na skleník!");
});

nodes.lab.addEventListener("click", () => {
    if (!processPurchase('passive', 'lab', 1.15, 500)) alert("Nedostatek prostředků na genetickou laboratoř!");
});

nodes.monopoly.addEventListener("click", () => {
    if (!processPurchase('passive', 'monopoly', 1.15, 5000)) alert("Nedostatek prostředků na lilekový monopol!");
});

nodes.watering.addEventListener("click", () => {
    if (score >= prices.watering) {
        score -= prices.watering;
        clickMultiplier *= 1.2;
        prices.watering = Math.round(prices.watering * 1.5);
        renderUI();
        saveGameData();
    } else {
        alert("Nedostatek prostředků na zalévání!");
    }
});

nodes.hoe.addEventListener("click", () => {
    if (score >= prices.hoe) {
        score -= prices.hoe;
        clickPower += 2;
        prices.hoe = Math.round(prices.hoe * 1.4);
        renderUI();
        saveGameData();
    } else {
        alert("Nedostatek prostředků na ostré motyky!");
    }
});

nodes.fertilizer.addEventListener("click", () => {
    if (score >= prices.fertilizer) {
        score -= prices.fertilizer;
        passiveMultiplier *= 1.15;
        prices.fertilizer = Math.round(prices.fertilizer * 1.6);
        renderUI();
        saveGameData();
    } else {
        alert("Nedostatek prostředků na prémiové hnojivo!");
    }
});

// --- Reset hry ---
nodes.reset.addEventListener("click", () => {
    if (confirm("Opravdu chceš resetovat celou hru a přijít o veškerý pokrok?")) {
        localStorage.removeItem("lilekClickerSave");
        score = 0;
        clickPower = 1;
        clickMultiplier = 1;
        passiveIncome = 0;
        passiveMultiplier = 1;
        prices.farmer = 10;
        prices.garden = 50;
        prices.plantation = 1000;
        prices.greenhouse = 5000;
        prices.lab = 50000;
        prices.monopoly = 500000;
        prices.watering = 10000;
        prices.hoe = 250;
        prices.fertilizer = 2500;
        renderUI();
    }
});

// --- Herní smyčka ---
setInterval(() => {
    if (passiveIncome > 0) {
        score += (passiveIncome * passiveMultiplier);
        renderUI();
        saveGameData();
    }
}, 1000);

// První inicializace
renderUI();
