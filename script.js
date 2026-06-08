let lilky = 0;
let silaKliknuti = 1;
let pasivniPrijem = 0;
let KliknutiMult = 1;
let PasivniMult = 1;

// Výchozí ceny budov
let cenaFarmar = 10;
let cenaZahrada = 50;
let cenaPlantaze = 1000;
let cenaSklenik = 5000;
let cenaLaborator = 50000;
let cenaMonopol = 500000;

// Výchozí ceny technologií
let cenaZalivani = 10000;
let cenaMotyky = 250;
let cenaHnojivo = 2500;

// Načtení dat z localStorage
const ulozenaData = JSON.parse(localStorage.getItem("lilekClickerSave"));
if (ulozenaData) {
    lilky = ulozenaData.lilky || 0;
    silaKliknuti = ulozenaData.silaKliknuti || 1;
    pasivniPrijem = ulozenaData.pasivniPrijem || 0;
    KliknutiMult = ulozenaData.KliknutiMult || 1;
    PasivniMult = ulozenaData.PasivniMult || 1;
    
    cenaFarmar = ulozenaData.cenaFarmar || 10;
    cenaZahrada = ulozenaData.cenaZahrada || 50;
    cenaPlantaze = ulozenaData.cenaPlantaze || 1000;
    cenaSklenik = ulozenaData.cenaSklenik || 5000;
    cenaLaborator = ulozenaData.cenaLaborator || 50000;
    cenaMonopol = ulozenaData.cenaMonopol || 500000;
    
    cenaZalivani = ulozenaData.cenaZalivani || 10000;
    cenaMotyky = ulozenaData.cenaMotyky || 250;
    cenaHnojivo = ulozenaData.cenaHnojivo || 2500;
}

// Propojení HTML elementů s JS
const textSkore = document.getElementById("skore");
const textPasivniPrijem = document.getElementById("pasivni-prijem-text");
const textPasivniPrijemMult = document.getElementById("pasivni-prijem-text-mult");
const textKlik = document.getElementById("klik-text");
const textKlikMult = document.getElementById("klik-text-mult");

const btnLilek = document.getElementById("btn-lilek");
const btnFarmar = document.getElementById("btn-farmar");
const btnZahrada = document.getElementById("btn-zahrada");
const btnPlantaz = document.getElementById("btn-plantaz");
const btnSklenik = document.getElementById("btn-sklenik");
const btnLaborator = document.getElementById("btn-laborator");
const btnMonopol = document.getElementById("btn-monopol");

const btnZalivani = document.getElementById("btn-zalivani");
const btnMotyky = document.getElementById("btn-motyky");
const btnHnojivo = document.getElementById("btn-hnojivo");
const btnReset = document.getElementById("btn-reset");

// Funkce pro ukládání pokroku
function ulozHru() {
    const dataProUlozeni = {
        lilky: lilky,
        silaKliknuti: silaKliknuti,
        pasivniPrijem: pasivniPrijem,
        cenaFarmar: cenaFarmar,
        cenaZahrada: cenaZahrada,
        cenaPlantaze: cenaPlantaze,
        cenaSklenik: cenaSklenik,
        cenaLaborator: cenaLaborator,
        cenaMonopol: cenaMonopol,
        cenaZalivani: cenaZalivani,
        cenaMotyky: cenaMotyky,
        cenaHnojivo: cenaHnojivo,
        KliknutiMult: KliknutiMult,
        PasivniMult: PasivniMult
    };
    localStorage.setItem("lilekClickerSave", JSON.stringify(dataProUlozeni));
}

// Funkce pro překreslení textů na obrazovce
function aktualizujUI() {
    // Math.floor a Math.round řeší zaokrouhlení, aby se nezobrazovala dlouhá desetinná čísla
    textSkore.textContent = Math.floor(lilky);
    textPasivniPrijem.textContent = Math.round(pasivniPrijem);
    textPasivniPrijemMult.textContent = Math.round(PasivniMult * 10) / 10;
    textKlik.textContent = Math.round(silaKliknuti);
    textKlikMult.textContent = Math.round(KliknutiMult * 10) / 10;
    
    btnFarmar.textContent = `🧑🏿‍🌾 Najmout Farmáře (Cena: ${cenaFarmar} lilků)`;
    btnZahrada.textContent = `🌲 Koupit Zahradu (Cena: ${cenaZahrada} lilků)`;
    btnPlantaz.textContent = `🏞️ Koupit Plantáž (Cena: ${cenaPlantaze} lilků)`;
    btnSklenik.textContent = `🏢 Koupit Skleník (Cena: ${cenaSklenik} lilků)`;
    btnLaborator.textContent = `🧬 Genetická laboratoř (Cena: ${cenaLaborator} lilků)`;
    btnMonopol.textContent = `🏢 Lilekový monopol (Cena: ${cenaMonopol} lilků)`;
    
    btnZalivani.textContent = `💦 Koupit Zalévání (Cena: ${cenaZalivani} lilků, dává +20% k síle kliku)`;
    btnMotyky.textContent = `⛏️ Ostré motyky (Cena: ${cenaMotyky} lilků, +2 k síle kliku)`;
    btnHnojivo.textContent = `🧪 Prémiové hnojivo (Cena: ${cenaHnojivo} lilků, +15 % k celkovému příjmu)`;
}

// Hlavní klikací tlačítko
btnLilek.addEventListener("click", function() {
    lilky = lilky+(silaKliknuti*KliknutiMult);
    aktualizujUI();
    ulozHru();
});

// --- SEKCE BUDOV ---
btnFarmar.addEventListener("click", function() {
    if (lilky >= cenaFarmar) {
        lilky -= cenaFarmar;
        silaKliknuti += 1; // Farmář dává +1 k aktivnímu kliku
        cenaFarmar = Math.round(cenaFarmar * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na farmáře!");
    }
});

btnZahrada.addEventListener("click", function() {
    if (lilky >= cenaZahrada) {
        lilky -= cenaZahrada;
        pasivniPrijem += 1; // +1 lilek/s
        cenaZahrada = Math.round(cenaZahrada * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na zahradu!");
    }
});

btnPlantaz.addEventListener("click", function() {
    if (lilky >= cenaPlantaze) {
        lilky -= cenaPlantaze;
        pasivniPrijem += 10; // +10 lilků/s
        cenaPlantaze = Math.round(cenaPlantaze * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na plantáž!");
    }
});

btnSklenik.addEventListener("click", function() {
    if (lilky >= cenaSklenik) {
        lilky -= cenaSklenik;
        pasivniPrijem += 50; // +50 lilků/s
        cenaSklenik = Math.round(cenaSklenik * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na skleník!");
    }
});

btnLaborator.addEventListener("click", function() {
    if (lilky >= cenaLaborator) {
        lilky -= cenaLaborator;
        pasivniPrijem += 500; // +500 lilků/s
        cenaLaborator = Math.round(cenaLaborator * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na genetickou laboratoř!");
    }
});

btnMonopol.addEventListener("click", function() {
    if (lilky >= cenaMonopol) {
        lilky -= cenaMonopol;
        pasivniPrijem += 5000; // +5000 lilků/s
        cenaMonopol = Math.round(cenaMonopol * 1.15);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na lilekový monopol!");
    }
});

// --- SEKCE TECHNOLOGIÍ A VYLEPŠENÍ ---
btnZalivani.addEventListener("click", function() {
    if (lilky >= cenaZalivani) {
        lilky -= cenaZalivani;
        KliknutiMult = KliknutiMult * 1.2; // Násobí tvou sílu kliku 1.2x
        cenaZalivani = Math.round(cenaZalivani * 1.5);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na zalévání!");
    }
});

btnMotyky.addEventListener("click", function() {
    if (lilky >= cenaMotyky) {
        lilky -= cenaMotyky;
        silaKliknuti += 2; // Přičte fixně +2 k síle kliku
        cenaMotyky = Math.round(cenaMotyky * 1.4);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na ostré motyky!");
    }
});

btnHnojivo.addEventListener("click", function() {
    if (lilky >= cenaHnojivo) {
        lilky -= cenaHnojivo;
        PasivniMult = PasivniMult * 1.15; // Zvýší veškerý pasivní příjem o 15 %
        cenaHnojivo = Math.round(cenaHnojivo * 1.6);
        aktualizujUI();
        ulozHru();
    } else {
        alert("Nedostatek prostředků na prémiové hnojivo!");
    }
});

// Reset hry s potvrzovacím oknem
btnReset.addEventListener("click", function() {
    if (confirm("Opravdu chceš resetovat celou hru a přijít o veškerý pokrok?")) {
        localStorage.removeItem("lilekClickerSave");
        lilky = 0;
        silaKliknuti = 1;
        KliknutiMult = 1;
        pasivniPrijem = 0;
        PasivniMult = 1;
        cenaFarmar = 10;
        cenaZahrada = 50;
        cenaPlantaze = 1000;
        cenaSklenik = 5000;
        cenaLaborator = 50000;
        cenaMonopol = 500000;
        cenaZalivani = 10000;
        cenaMotyky = 250;
        cenaHnojivo = 2500;
        aktualizujUI();
    }
});

// Interval běžící na pozadí (každou sekundu přičte pasivní příjem)
setInterval(function() {
    if (pasivniPrijem > 0) {
        lilky = lilky+(pasivniPrijem*PasivniMult);
        aktualizujUI();
        ulozHru();
    }
}, 1000);

// Spuštění aktualizace UI ihned po načtení stránky
aktualizujUI();
