// Cronologia dei menu visitati
let menuHistory = [];

// Mostra un menu specifico
function showMenu(menuId) {
    // Aggiungi l'attuale menu alla cronologia prima di cambiare
    if (menuHistory.length === 0 || menuHistory[menuHistory.length - 1] !== menuId) {
        menuHistory.push(menuId);
    }

    // Nascondi il menu attuale e mostra quello selezionato
    document.querySelectorAll('.hidden').forEach(menu => menu.classList.add('hidden'));
    document.getElementById(menuId).classList.remove('hidden');
}

// Torna al menu precedente
function goBack() {
    if (menuHistory.length > 1) {
        menuHistory.pop(); // Rimuovi l'ultimo menu visitato
        const previousMenu = menuHistory[menuHistory.length - 1];
        showMenu(previousMenu); // Torna al menu precedente
    }
}

// Torna alla homepage
function goHome() {
    menuHistory = []; // Resetta la cronologia
    showMenu('main-menu'); // Torna al menu principale
}
