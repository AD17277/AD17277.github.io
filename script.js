// Funzione per aprire il menu di un continente
function openMenu(menuName) {
  document.querySelector('.homepage').style.display = 'none';
  document.querySelector('.buttons').style.display = 'block';
  let menuContent = '';

  // Contenuti per ciascun continente
  if (menuName === 'Europe') {
    menuContent = `
      <p>Select League:</p>
      <button onclick="selectLeague('Premier League')">Premier League</button>
      <button onclick="selectLeague('La Liga')">La Liga</button>
      <button onclick="selectLeague('Serie A')">Serie A</button>
    `;
  } else if (menuName === 'South America') {
    menuContent = `
      <p>Select League:</p>
      <button onclick="selectLeague('Brasileirão')">Brasileirão</button>
      <button onclick="selectLeague('Argentine Primera División')">Argentine Primera División</button>
    `;
  } else if (menuName === 'North America') {
    menuContent = `
      <p>Select League:</p>
      <button onclick="selectLeague('MLS')">MLS</button>
      <button onclick="selectLeague('Liga MX')">Liga MX</button>
    `;
  }

  document.getElementById('menuContent').innerHTML = menuContent;
  document.getElementById('backButton').style.display = 'block';
}

// Funzione per selezionare una lega
function selectLeague(leagueName) {
  let leagueContent = '';
  if (leagueName === 'Premier League') {
    leagueContent = `
      <p>Select Team:</p>
      <button onclick="selectTeam('Liverpool')">Liverpool</button>
      <button onclick="selectTeam('Manchester City')">Manchester City</button>
    `;
  } else if (leagueName === 'Brasileirão') {
    leagueContent = `
      <p>Select Team:</p>
      <button onclick="selectTeam('Flamengo')">Flamengo</button>
      <button onclick="selectTeam('São Paulo')">São Paulo</button>
    `;
  } else if (leagueName === 'MLS') {
    leagueContent = `
      <p>Select Team:</p>
      <button onclick="selectTeam('Los Angeles FC')">Los Angeles FC</button>
      <button onclick="selectTeam('New York City FC')">New York City FC</button>
    `;
  }

  document.getElementById('menuContent').innerHTML = leagueContent;
  document.getElementById('backButton').style.display = 'block';
}

// Funzione per selezionare una squadra
function selectTeam(teamName) {
  let teamContent = `<p>Team: ${teamName}</p>`;
  teamContent += `
    <p>Select Player:</p>
    <button>Player 1</button>
    <button>Player 2</button>
  `;
  document.getElementById('menuContent').innerHTML = teamContent;
  document.getElementById('backButton').style.display = 'block';
}

// Funzione per tornare al menu principale
function goBack() {
  document.querySelector('.homepage').style.display = 'block';
  document.getElementById('menuContent').innerHTML = '';
  document.getElementById('backButton').style.display = 'none';
}

// Funzione per tornare alla homepage
function goHome() {
  document.querySelector('.homepage').style.display = 'block';
  document.getElementById('menuContent').innerHTML = '';
  document.getElementById('backButton').style.display = 'none';
}
