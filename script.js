// Per gestire il menu attuale
let currentMenu = "main-menu";

// Mostra un menu specifico
function showMenu(menuId) {
    document.getElementById(currentMenu).classList.add("hidden");
    document.getElementById(menuId).classList.remove("hidden");
    currentMenu = menuId;
}

// Torna al menu precedente
function goBack() {
    if (currentMenu !== "main-menu") {
        showMenu("continent-menu");
    }
}

// Torna alla homepage
function goHome() {
    showMenu("main-menu");
}
