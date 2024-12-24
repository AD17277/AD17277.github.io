let historyStack = []; // For tracking navigation history

function goHome() {
  historyStack = [];
  showMenu('continent-menu');
}

function goBack() {
  if (historyStack.length > 0) {
    const previousMenu = historyStack.pop();
    showMenu(previousMenu);
  }
}

function showMenu(menuId) {
  const menus = document.querySelectorAll('.menu');
  menus.forEach(menu => menu.classList.add('hidden'));
  document.getElementById(menuId).classList.remove('hidden');
}

function loadLeagues(continent) {
  historyStack.push('continent-menu');
  showMenu('league-menu');

  const leagues = {
    "Europe": ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1"],
    "South America": ["Brasileirão", "Argentine Primera"],
    "North America": ["MLS", "Liga MX"],
    "Asia": ["J-League", "K-League"],
    "Africa": ["CAF Champions League"]
  };

  const leagueList = document.getElementById('league-list');
  leagueList.innerHTML = '';
  if (leagues[continent]) {
    leagues[continent].forEach(league => {
      const button = document.createElement('button');
      button.textContent = league;
      button.onclick = () => loadTeams(league);
      leagueList.appendChild(button);
    });
  }
}

function loadTeams(league) {
  historyStack.push('league-menu');
  showMenu('team-menu');

  const teams = {
    "Premier League": ["Manchester City", "Liverpool", "Arsenal", "Chelsea"],
    "La Liga": ["Barcelona", "Real Madrid", "Atletico Madrid"],
    // Add more teams here for other leagues
  };

  const teamList = document.getElementById('team-list');
  teamList.innerHTML = '';
  if (teams[league]) {
    teams[league].forEach(team => {
      const button = document.createElement('button');
      button.textContent = team;
      button.onclick = () => loadPlayers(team);
      teamList.appendChild(button);
    });
  }
}

function loadPlayers(team) {
  historyStack.push('team-menu');
  showMenu('player-menu');

  const players = {
    "Manchester City": ["Player 1", "Player 2", "Player 3"],
    "Barcelona": ["Player A", "Player B", "Player C"],
    // Add more players for other teams
  };

  const playerList = document.getElementById('player-list');
  playerList.innerHTML = '';
  if (players[team]) {
    players[team].forEach(player => {
      const div = document.createElement('div');
      div.textContent = player;
      playerList.appendChild(div);
    });
  }
}
