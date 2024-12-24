function showContinentMenu() {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('continentMenu').style.display = 'block';
}

function showLeagueMenu() {
    document.getElementById('continentMenu').style.display = 'none';
    document.getElementById('leagueMenu').style.display = 'block';
}

function showTeamMenu() {
    document.getElementById('leagueMenu').style.display = 'none';
    document.getElementById('teamMenu').style.display = 'block';
}

function showPlayerDetails() {
    document.getElementById('teamMenu').style.display = 'none';
    document.getElementById('playerDetails').style.display = 'block';
}

function goBack(menu) {
    document.getElementById('homepage').style.display = 'none';
    document.getElementById('continentMenu').style.display = 'none';
    document.getElementById('leagueMenu').style.display = 'none';
    document.getElementById('teamMenu').style.display = 'none';
    document.getElementById('playerDetails').style.display = 'none';
    document.getElementById(menu).style.display = 'block';
}
