// Variabile per il menu attuale
let currentMenu = "main-menu";

// Mostra un menu specifico
function showMenu(menuId) {
    document.getElementById(currentMenu).classList.add("hidden");
    document.getElementById(menuId).classList.remove("hidden");
    currentMenu = menuId;
}

// Torna al menu precedente (al menu Continents)
function goBack() {
    if (currentMenu === "europe-menu" || currentMenu === "asia-menu" || currentMenu === "africa-menu" || currentMenu === "americas-menu" || currentMenu === "oceania-menu") {
        showMenu("continent-menu");
    } else if (currentMenu === "continent-menu") {
        showMenu("main-menu");
    }
}

// Torna alla homepage
function goHome() {
    showMenu("main-menu");
}
