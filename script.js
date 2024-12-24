const continents = [
    { name: "Europe", leagues: ["League 1", "League 2"] },
    { name: "Asia", leagues: ["League 1", "League 2"] },
    { name: "North America", leagues: ["League 1", "League 2"] },
    { name: "South America", leagues: ["League 1", "League 2"] },
    { name: "Africa", leagues: ["League 1", "League 2"] },
    { name: "Oceania", leagues: ["League 1", "League 2"] },
];

let currentMenu = [];
let history = [];

function loadMenu(items) {
    const menuContent = document.getElementById("menu-content");
    menuContent.innerHTML = "";
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.name || item;
        li.onclick = () => {
            if (item.leagues) {
                history.push(currentMenu);
                loadMenu(item.leagues.map(league => ({ name: league })));
            } else {
                alert(`Selected: ${item}`);
            }
        };
        menuContent.appendChild(li);
    });
    currentMenu = items;
}

function goHome() {
    history = [];
    loadMenu(continents);
}

function goBack() {
    if (history.length > 0) {
        loadMenu(history.pop());
    }
}

// Initialize with continents
document.addEventListener("DOMContentLoaded", () => {
    goHome();
});
