// Funzione per gestire il cambio dei menu
function openMenu(menu) {
    const homepage = document.querySelector('.homepage');
    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-page');
    homepage.innerHTML = ''; // Svuota la homepage per mostrare il nuovo menu

    // Generazione del contenuto del menu
    let menuContent = '';
    switch (menu) {
        case 'europe':
            menuContent = `
                <h2>Europe</h2>
                <button onclick="openMenu('premier-league')">Premier League</button>
                <button onclick="openMenu('la-liga')">La Liga</button>
                <button onclick="openMenu('serie-a')">Serie A</button>
                <button onclick="openMenu('bundesliga')">Bundesliga</button>
                <button onclick="openMenu('ligue-1')">Ligue 1</button>
            `;
            break;
        case 'asia':
            menuContent = `
                <h2>Asia</h2>
                <button onclick="openMenu('j-league')">J-League</button>
                <button onclick="openMenu('k-league')">K-League</button>
                <button onclick="openMenu('indian-super-league')">Indian Super League</button>
            `;
            break;
        case 'africa':
            menuContent = `
                <h2>Africa</h2>
                <button onclick="openMenu('caf-champions-league')">CAF Champions League</button>
            `;
            break;
        case 'north-america':
            menuContent = `
                <h2>North America</h2>
                <button onclick="openMenu('mls')">MLS</button>
                <button onclick="openMenu('liga-mx')">Liga MX</button>
            `;
            break;
        case 'south-america':
            menuContent = `
                <h2>South America</h2>
                <button onclick="openMenu('brazil-serie-a')">Brazil Serie A</button>
                <button onclick="openMenu('argentina-superliga')">Argentina Superliga</button>
            `;
            break;
        case 'oceania':
            menuContent = `
                <h2>Oceania</h2>
                <button onclick="openMenu('a-league')">A-League</button>
            `;
            break;
        default:
            menuContent = '<h2>Menu not found</h2>';
    }

    // Aggiunta dei tasti Home e Back
    menuContainer.innerHTML = `
        ${menuContent}
        <div class="nav-buttons">
            <button onclick="goHome()">Home</button>
            <button onclick="goBack()">Back</button>
        </div>
    `;
    homepage.appendChild(menuContainer);
}

// Funzione per tornare alla homepage
function goHome() {
    location.reload(); // Ricarica la pagina per tornare alla homepage
}

// Funzione per tornare al menu precedente
function goBack() {
    history.back(); // Usa la cronologia del browser per tornare indietro
}
