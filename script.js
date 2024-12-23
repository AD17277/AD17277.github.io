// Cronologia dei menu visitati
let menuHistory = [];

// Variabile per il menu attuale
let currentMenu = "main-menu";

// Mostra un menu specifico
function showMenu(menuId) {
    // Aggiungi l'attuale menu alla cronologia prima di cambiare
    if (currentMenu !== menuId) {
        menuHistory.push(currentMenu);
    }

    // Nascondi il menu attuale e mostra quello selezionato
    document.getElementById(currentMenu).classList.add("hidden");
    document.getElementById(menuId).classList.remove("hidden");
    currentMenu = menuId;
}

// Torna al menu precedente
function goBack() {
    if (menuHistory.length > 0) {
        // Rimuovi l'ultimo elemento dalla cronologia e torna al menu precedente
        const previousMenu = menuHistory.pop();
        document.getElementById(currentMenu).classList.add("hidden");
        document.getElementById(previousMenu).classList.remove("hidden");
        currentMenu = previousMenu;
    }
}

// Torna alla homepage
function goHome() {
    // Resetta la cronologia e torna al menu principale
    menuHistory = [];
    showMenu("main-menu");
}
