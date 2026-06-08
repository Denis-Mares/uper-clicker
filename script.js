// --- Globální stav hry (Nové Crypto/Data téma) ---
let cryptoPoints = 0;
let clickPower = 1;
let passiveIncome = 0;
let clickMultiplier = 1;
let passiveMultiplier = 1;

// Nové názvy a ceny upgradů
const marketPrices = {
    botnet: 10,
    miner: 50,
    server: 1000,
    datacenter: 5000,
    aiCore: 50000,
    quantumNet: 500000,
    overclock: 10000,
    gpuUpgrade: 250,
    cooling: 2500
};

// --- Načítání uložené pozice ---
const savedProgress = JSON.parse(localStorage.getItem("lilekClickerSave"));
if (savedProgress) {
    cryptoPoints = savedProgress.lilky ?? 0;
    clickPower = savedProgress.silaKliknuti ?? 1;
    passiveIncome = savedProgress.pasivniPrijem ?? 0;
    clickMultiplier = savedProgress.KliknutiMult ?? 1;
    passiveMultiplier = savedProgress.PasivniMult ?? 1;
    
    marketPrices.botnet = savedProgress.cenaFarmar ?? 10;
    marketPrices.miner = savedProgress.cenaZahrada ?? 50;
    marketPrices.server = savedProgress.cenaPlantaze ?? 1000;
    marketPrices.datacenter = savedProgress.cenaSklenik ?? 5000;
    marketPrices.aiCore = savedProgress.cenaLaborator ?? 50000;
    marketPrices.quantumNet = savedProgress.cenaMonopol ?? 500000;
    marketPrices.overclock = savedProgress.cenaZalivani ?? 10000;
    marketPrices.gpuUpgrade = savedProgress.cenaMotyky ?? 250;
    marketPrices.cooling = savedProgress.cenaHnojivo ?? 2500;
}

// --- DOM Elementy ---
const scoreDisplay = document.getElementById("skore");
const passiveDisplay = document.getElementById("pasivni-prijem-text");
const passiveMultDisplay = document.getElementById("pasivni-prijem-text-mult");
const clickDisplay = document.getElementById("klik-text");
const clickMultDisplay = document.getElementById("klik-text-mult");

const getElement = (id) => document.getElementById(id);

const UIButtons = {
    mainClick: getElement("btn-lilek"),
    upgrade1: getElement("btn-farmar"),
    upgrade2: getElement("btn-zahrada"),
    upgrade3: getElement("btn-plantaz"),
    upgrade4: getElement("btn-sklenik"),
    upgrade5: getElement("btn-laborator"),
    upgrade6: getElement("btn-monopol"),
    tech1: getElement("btn-zalivani"),
    tech2: getElement("btn-motyky"),
    tech3: getElement("btn-hnojivo"),
    reset: getElement("btn-reset")
};

// --- Ukládání hry ---
const saveGameProgress = () => {
    const backup = {
        lilky: cryptoPoints,
        silaKliknuti: clickPower,
        pasivniPrijem: passiveIncome,
        cenaFarmar: marketPrices.botnet,
        cenaZahrada: marketPrices.miner,
        cenaPlantaze: marketPrices.server,
        cenaSklenik: marketPrices.datacenter,
        cenaLaborator: marketPrices.aiCore,
        cenaMonopol: marketPrices.quantumNet,
        cenaZalivani: marketPrices.overclock,
        cenaMotyky: marketPrices.gpuUpgrade,
        cenaHnojivo: marketPrices.cooling,
        KliknutiMult: clickMultiplier,
        PasivniMult: passiveMultiplier
    };
    localStorage.setItem("lilekClickerSave", JSON.stringify(backup));
};

// --- Aktualizace textů na obrazovce ---
const updateGameScreen = () => {
    scoreDisplay.textContent = Math.floor(cryptoPoints);
    passiveDisplay.textContent = Math.round(passiveIncome);
    passiveMultDisplay.textContent = Math.round(passiveMultiplier * 10) / 10;
    clickDisplay.textContent = Math.round(clickPower);
    clickMultDisplay.textContent = Math.round(clickMultiplier * 10) / 10;
    
    // Kompletně přepsané názvy pro učitele
    UIButtons.upgrade1.textContent = `🤖 Spustit Basic Botnet (Cena: ${marketPrices.botnet} Data)`;
    UIButtons.upgrade2.textContent = `💻 Koupit Těžební Rig (Cena: ${marketPrices.miner} Data)`;
    UIButtons.upgrade3.textContent = `🖥️ Pronajmout Cloud Server (Cena: ${marketPrices.server} Data)`;
    UIButtons.upgrade4.textContent = `🏢 Postavit Datacentrum (Cena: ${marketPrices.datacenter} Data)`;
    UIButtons.upgrade5.textContent = `🧠 Síť Umělé Inteligence (Cena: ${marketPrices.aiCore} Data)`;
    UIButtons.upgrade6.textContent = `🌌 Kvantový Monopol (Cena: ${marketPrices.quantumNet} Data)`;
    
    UIButtons.tech1.textContent = `⚡ Přetaktování CPU (Cena: ${marketPrices.overclock} Data, +20% ke kliku)`;
    UIButtons.tech2.textContent = `🔌 Nová Grafická Karta (Cena: ${marketPrices.gpuUpgrade} Data, +2 ke kliku)`;
    UIButtons.tech3.textContent = `❄️ Vodní Chlazení (Cena: ${marketPrices.cooling} Data, +15% k pasivnímu příjmu)`;
};

// --- Funkce pro nákup ---
const executePurchase = (type, key, multiplier, value) => {
    if (cryptoPoints >= marketPrices[key]) {
        cryptoPoints -= marketPrices[key];
        if (type === 'click') clickPower += value;
        if (type === 'passive') passiveIncome += value;
        marketPrices[key] = Math.round(marketPrices[key] * multiplier);
        updateGameScreen();
        saveGameProgress();
        return true;
    }
    return false;
};

// --- Klikací akce ---
UIButtons.mainClick.addEventListener("click", () => {
    cryptoPoints += (clickPower * clickMultiplier);
    updateGameScreen();
    saveGameProgress();
});

UIButtons.upgrade1.addEventListener("click", () => {
    if (!executePurchase('click', 'botnet', 1.15, 1)) alert("Nedostatek dat pro Botnet!");
});

UIButtons.upgrade2.addEventListener("click", () => {
    if (!executePurchase('passive', 'miner', 1.15, 1)) alert("Nedostatek dat pro Těžební Rig!");
});

UIButtons.upgrade3.addEventListener("click", () => {
    if (!executePurchase('passive', 'server', 1.15, 10)) alert("Nedostatek dat pro Cloud Server!");
});

UIButtons.upgrade4.addEventListener("click", () => {
    if (!executePurchase('passive', 'datacenter', 1.15, 50)) alert("Nedostatek dat pro Datacentrum!");
});

UIButtons.upgrade5.addEventListener("click", () => {
    if (!executePurchase('passive', 'aiCore', 1.15, 500)) alert("Nedostatek dat pro AI Síť!");
});

UIButtons.upgrade6.addEventListener("click", () => {
    if (!executePurchase('passive', 'quantumNet', 1.15, 5000)) alert("Nedostatek dat pro Kvantový Monopol!");
});

UIButtons.tech1.addEventListener("click", () => {
    if (cryptoPoints >= marketPrices.overclock) {
        cryptoPoints -= marketPrices.overclock;
        clickMultiplier *= 1.2;
        marketPrices.overclock = Math.round(marketPrices.overclock * 1.5);
        updateGameScreen();
        saveGameProgress();
    } else {
        alert("Nedostatek dat na přetaktování!");
    }
});

UIButtons.tech2.addEventListener("click", () => {
    if (cryptoPoints >= marketPrices.gpuUpgrade) {
        cryptoPoints -= marketPrices.gpuUpgrade;
        clickPower += 2;
        marketPrices.gpuUpgrade = Math.round(marketPrices.gpuUpgrade * 1.4);
        updateGameScreen();
        saveGameProgress();
    } else {
        alert("Nedostatek dat na novou grafiku!");
    }
});

UIButtons.tech3.addEventListener("click", () => {
    if (cryptoPoints >= marketPrices.cooling) {
        cryptoPoints -= marketPrices.cooling;
        passiveMultiplier *= 1.15;
        marketPrices.cooling = Math.round(marketPrices.cooling * 1.6);
        updateGameScreen();
        saveGameProgress();
    } else {
        alert("Nedostatek dat na vodní chlazení!");
    }
});

// --- Resetování systému ---
UIButtons.reset.addEventListener("click", () => {
    if (confirm("Opravdu chceš smazat všechna data a restartovat systém?")) {
        localStorage.removeItem("lilekClickerSave");
        cryptoPoints = 0;
        clickPower = 1;
        clickMultiplier = 1;
        passiveIncome = 0;
        passiveMultiplier = 1;
        marketPrices.botnet = 10;
        marketPrices.miner = 50;
        marketPrices.server = 1000;
        marketPrices.datacenter = 5000;
        marketPrices.aiCore = 50000;
        marketPrices.quantumNet = 500000;
        marketPrices.overclock = 10000;
        marketPrices.gpuUpgrade = 250;
        marketPrices.cooling = 2500;
        updateGameScreen();
    }
});

// --- Těžební smyčka (generování každou sekundu) ---
setInterval(() => {
    if (passiveIncome > 0) {
        cryptoPoints += (passiveIncome * passiveMultiplier);
        updateGameScreen();
        saveGameProgress();
    }
}, 1000);

// Spuštění
updateGameScreen();
