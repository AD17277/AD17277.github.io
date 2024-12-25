function openTab(tabName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  elmnt.classList.add("active");
}

function sortTable(tableId, column) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableId);
  switching = true;
  dir = "asc"; // Default direction is ascending
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[column];
      y = rows[i + 1].getElementsByTagName("TD")[column];
      // Check if the two rows should switch place, based on the direction, asc or desc
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      // If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again.
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchPlayers() {
  // Get the input value and convert it to lowercase for case-insensitive search
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("playerSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("playersTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // Assuming the name is in the second column
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function searchTeams() {
  // Same logic as searchPlayers, but for teams
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("teamSearch");
  filter = input.value.toUpperCase();
  table = document.getElementById("teamsTable");
  tr = table.getElementsByTagName("tr");

  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1]; // Assuming the name is in the second column
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function saveSettings() {
    var apiKey = document.getElementById("apiKey").value || "GET https://api.sofifa.net/leagues

Example response

{
"data": [
{
"id": 1,
"name": "Superliga",
"gender": "male",
"country": "Denmark",
"type": "domestic"
},
...
]
}
Teams
Get all teams for specific roster

GEThttps://api.sofifa.net/teams/{roster}

Parameter	Type	Required	Description
roster	string	YES	The roster ID, which SoFIFA defines, can be found on the version select dropdown
Example response

{
"data": [
{
"id": 1,
"name": "Arsenal",
"gender": "male",
"country": "England",
"type": "domestic",
"roster": "250002",
"version": "25",
"export": "161411",
"latestRoster": "250003",
"league": {
"id": 13,
"name": "Premier League",
"gender": "male",
"country": "England",
"type": "domestic"
}
},
...
]
}
Get latest details and the squads of a team

GET https://api.sofifa.net/team/{id}

Parameter	Type	Required	Description
id	int	YES	The team ID from the official game release
Example response

{
"data": {
"id": 1,
"name": "Arsenal",
"gender": "male",
"country": "England",
"type": "domestic",
"leagueId": 13,
"countryId": 14,
"playerCount": 24,
"transferBudget": null,
"intPrestige": 9,
"domPrestige": 9,
"popularity": 9,
"youthDevelopment": 6,
"clubWorth": 1871280,
"opponentWeakThreshold": 3,
"opponentStrongThreshold": 3,
"stadiumId": 156,
"rivalTeamId": 18,
"xiAverageAge": 25.18,
"totalAverageAge": 25.63,
"overallRating": 83,
"attackRating": 83,
"midfieldRating": 85,
"defenseRating": 84,
"trait1": 180738,
"profitability": 2,
"busBuildUpSpeed": null,
"busPassing": null,
"busDribbling": null,
"busPositioning": null,
"ccCrossing": null,
"ccPassing": null,
"ccPositioning": null,
"ccShooting": null,
"defAggression": null,
"defDefenderLine": null,
"defTeamWidth": null,
"defMentality": null,
"defensiveStyle": null,
"defensiveWidth": null,
"defensiveDepth": 65,
"offensiveStyle": null,
"offensiveWidth": null,
"playersInBoxCross": null,
"playersInBoxCorner": null,
"playersInBoxFreeKick": null,
"buildUpPlay": 1,
"chanceCreation": null,
"roster": "250003",
"version": "25",
"export": "161412",
"latestRoster": "250003",
"players": [
{
"id": 194404,
"position": 28,
"jerseyNumber": 32,
"joinTeamDate": 160639,
"joinedYear": 2022,
"joinedMonth": 8,
"joinedDay": 7,
"contractValidUntil": 2026,
"teamIdLoanedFrom": 1943,
"loanDateEnd": 161697,
"firstName": "Norberto",
"lastName": "Murara Neto",
"commonName": "Neto",
"country": "Brazil",
"countryId": 54,
"gender": "male",
"birthDate": 148567,
"birthYear": 1989,
"birthMonth": 7,
"birthDay": 19,
"age": 34,
"height": 190,
"weight": 83,
"position1": 0,
"position2": -1,
"position3": -1,
"position4": -1,
"foot": 1,
"weakFoot": 2,
"crossing": 11,
"finishing": 15,
"heading": 14,
"shortPassing": 37,
"volleys": 12,
"dribbling": 18,
"curve": 12,
"freeKick": 13,
"longPassing": 42,
"ballControl": 23,
"acceleration": 55,
"sprintSpeed": 50,
"agility": 58,
"reactions": 78,
"balance": 48,
"shotPower": 55,
"jumping": 68,
"stamina": 40,
"strength": 62,
"longShots": 20,
"aggression": 40,
"interceptions": 15,
"positioning": 11,
"vision": 43,
"penalties": 22,
"marking": 17,
"standingTackle": 14,
"slidingTackle": 15,
"gkDiving": 80,
"gkHandling": 72,
"gkKicking": 73,
"gkPositioning": 76,
"gkReflexes": 82,
"composure": 60,
"headClassCode": 0,
"bodyTypeCode": 4,
"overallRating": 78,
"potential": 78,
"growth": 0,
"internationalRep": 2,
"skillMoves": 0,
"atkWorkRate": null,
"defWorkRate": null,
"trait1": 1073741824,
"trait2": 1,
"specialities": [],
"price": 2400000,
"wage": 41000,
"buyout": 0,
"iconTrait1": 0,
"iconTrait2": 0,
"accelerationType": "PLAYER_ACCELERATE_CONTROLLED",
"pac": 80,
"sho": 72,
"pas": 73,
"dri": 82,
"def": 53,
"phy": 76,
"roster": "250003",
"version": "25",
"export": "161412",
"latestRoster": "250003",
"role": [
{
"name": "ROLE_GOALKEEPER+",
"position": 0,
"focuses": [
"ROLE_DEFEND",
"ROLE_BALANCED"
]
}
],
"trait": [],
"playStyle": [
"PLAYSTYLE_GOAL_KEEPER_CROSS_CLAIMER"
],
"playStylePlus": []
},
...
]
}
}
Get details and the squads of a team for a specific roster

GET https://api.sofifa.net/team/{id}/{roster}

Parameter	Type	Required	Description
id	int	YES	The team ID from the official game release
roster	string	YES	The roster ID, which SoFIFA defines, can be found on the version select dropdown
Players
Get latest details of a player

GET https://api.sofifa.net/player/{id}

Parameter	Type	Required	Description
id	int	YES	The player ID from the official game release
Example response

{
"data": {
"id": 277643,
"firstName": "Lamine",
"lastName": "Yamal",
"commonName": "Lamine Yamal",
"country": "Spain",
"countryId": 45,
"gender": "male",
"birthDate": 155135,
"birthYear": 2007,
"birthMonth": 7,
"birthDay": 13,
"age": 16,
"height": 180,
"weight": 65,
"position1": 23,
"position2": 27,
"position3": -1,
"position4": -1,
"foot": 2,
"weakFoot": 3,
"crossing": 81,
"finishing": 76,
"heading": 33,
"shortPassing": 79,
"volleys": 49,
"dribbling": 84,
"curve": 79,
"freeKick": 65,
"longPassing": 64,
"ballControl": 82,
"acceleration": 84,
"sprintSpeed": 81,
"agility": 87,
"reactions": 79,
"balance": 74,
"shotPower": 77,
"jumping": 55,
"stamina": 57,
"strength": 45,
"longShots": 79,
"aggression": 42,
"interceptions": 18,
"positioning": 77,
"vision": 77,
"penalties": 69,
"marking": 23,
"standingTackle": 20,
"slidingTackle": 28,
"gkDiving": 9,
"gkHandling": 13,
"gkKicking": 7,
"gkPositioning": 10,
"gkReflexes": 7,
"composure": 65,
"headClassCode": 0,
"bodyTypeCode": 1,
"overallRating": 81,
"potential": 94,
"growth": 13,
"internationalRep": 1,
"skillMoves": 3,
"atkWorkRate": null,
"defWorkRate": null,
"trait1": 4521985,
"trait2": 0,
"specialities": [],
"price": 58500000,
"wage": 72000,
"buyout": 156487500,
"iconTrait1": 0,
"iconTrait2": 0,
"accelerationType": "PLAYER_ACCELERATE_MOSTLY_EXPLOSIVE",
"pac": 82,
"sho": 75,
"pas": 76,
"dri": 82,
"def": 23,
"phy": 48,
"roster": "250003",
"version": "25",
"export": "161412",
"latestRoster": "250003",
"teams": [
{
"id": 241,
"name": "FC Barcelona",
"gender": "male",
"country": "Spain",
"type": "domestic",
"league": {
"id": 53,
"name": "La Liga",
"gender": "male",
"country": "Spain",
"type": "domestic"
},
"position": 12,
"jerseyNumber": 19,
"joinTeamDate": 160602,
"joinedYear": 2022,
"joinedMonth": 7,
"joinedDay": 1,
"contractValidUntil": 2026,
"teamIdLoanedFrom": 0,
"loanDateEnd": 0
},
{
"id": 1362,
"name": "Spain",
"gender": "male",
"country": "Spain",
"type": "national",
"league": {
"id": 78,
"name": "Friendly International",
"gender": "male",
"country": "World",
"type": "friendly"
},
"position": 23,
"jerseyNumber": 19
}
],
"role": [
{
"name": "ROLE_WINGER+",
"position": 23,
"focuses": [
"ROLE_BALANCED",
"ROLE_ATTACK"
]
},
{
"name": "ROLE_INSIDE_FORWARD+",
"position": 23,
"focuses": [
"ROLE_ATTACK",
"ROLE_BALANCED",
"ROLE_ROAMING"
]
},
{
"name": "ROLE_WINGER+",
"position": 27,
"focuses": [
"ROLE_BALANCED",
"ROLE_ATTACK"
]
}
],
"trait": [],
"playStyle": [
"PLAYSTYLE_SCORING_FINESSE_SHOT",
"PLAYSTYLE_BALL_CONTROL_TECHNICAL",
"PLAYSTYLE_BALL_CONTROL_FLAIR",
"PLAYSTYLE_PHYSICAL_QUICK_STEP"
],
"playStylePlus": []
}
}
Get details of a player for specific roster

GET https://api.sofifa.net/player/{id}/{roster}

Parameter	Type	Required	Description
id	int	YES	The player ID from the official game release
roster	string	YES	The roster ID, which SoFIFA defines, can be found on the version select dropdown.
Traits
Get list of traits

GET https://api.sofifa.net/traits/{version}

Parameter	Type	Required	Description
version	string	YES	Available values from 07 to 23
Example response

{
"data": [
"TRAIT_LONG_THROW_IN",
...
]
}
PlayStyles
Get list of PlayStyles

GET https://api.sofifa.net/playStyles/{version}

Parameter	Type	Required	Description
version	string	YES	Available values from 24 to 25
Example response

{
"data": [
"PLAYSTYLE_SCORING_FINESSE_SHOT",
...
]
}
Get list of PlayStyles+

GET https://api.sofifa.net/playStylesPlus/{version}

Parameter	Type	Required	Description
version	string	YES	Available values from 24 to 25
Example response

{
"data": [
"PLAYSTYLE_PLUS_SCORING_FINESSE_SHOT",
...
]
}
Specialities
Get list of specialities

GET https://api.sofifa.net/specialities/{version}

Parameter	Type	Required	Description
version	string	YES	Available values from 07 to 25
Example response

{
"data": [
"SPECIALITY_POACHER",
...
]
}
Player Role
Get list of player roles

GET https://api.sofifa.net/playerRole/{version}

Parameter	Type	Required	Description
version	string	YES	Available value: 25
Example response

{
"data": [
{
"name": "ROLE_GOALKEEPER+",
"position": 0,
"focuses": [
"ROLE_DEFEND",
"ROLE_BALANCED"
]
},
...
]
}
Acceleration Type
Get list of acceleration types

GET https://api.sofifa.net/accelerationType/{version}

Parameter	Type	Required	Description
version	string	YES	Available values from 24 to 25
Example response

{
"data": [
"PLAYER_ACCELERATE_EXPLOSIVE",
...
]
} // Usa il valore inserito o la tua API key di default
    localStorage.setItem("sofifaApiKey", apiKey);
    alert("Settings saved!");
}";

// Load saved settings when the page loads
window.onload = function() {
  var savedApiKey = localStorage.getItem("sofifaApiKey");
  if (savedApiKey) {
    document.getElementById("apiKey").value = savedApiKey;
  }
  // Open the first tab by default
  document.getElementsByClassName("tablink")[0].click();
  // Fetch and display data from the API
  fetchPlayers();
  fetchTeams();
  fetchLeagues();
};

// Function to fetch players from the Flask backend
function fetchPlayers() {
    fetch('/players')
    .then(response => response.json())
    .then(data => {
        populateTable('playersTable', data);
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch teams from the Flask backend
function fetchTeams() {
    fetch('/teams')
    .then(response => response.json())
    .then(data => {
        populateTable('teamsTable', data);
    })
    .catch(error => console.error('Error:', error));
}

// Function to fetch leagues from the Flask backend
function fetchLeagues() {
    fetch('/leagues')
    .then(response => response.json())
    .then(data => {
        populateTable('leaguesTable', data);
    })
    .catch(error => console.error('Error:', error));
}

// Function to populate tables with data
function populateTable(tableId, data) {
    var table = document.getElementById(tableId);
    // Clear existing rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    data.forEach(item => {
        var row = table.insertRow();
        // Customize this part according to your data structure
        Object.values(item).forEach(text => {
            var cell = row.insertCell();
            var textNode = document.createTextNode(text);
            cell.appendChild(textNode);
        });
    });
}
