// Variabile per il menu attuale
let currentMenu = "main-menu";

// Mostra un menu specifico
function showMenu(menuId) {
    document.getElementById(currentMenu).classList.add("hidden");
    document.getElementById(menuId).classList.remove("hidden");
    currentMenu = menuId;
}

// Torna al menu precedente
function goBack() {
    if (currentMenu.endsWith("-menu")) {
        const parentMenu = currentMenu.split("-")[0];
        showMenu(parentMenu + "-menu");
    }
}

// Torna alla homepage
function goHome() {
    showMenu("main-menu");
}
