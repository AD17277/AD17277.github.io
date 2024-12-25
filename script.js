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
  var apiKey = document.getElementById("apiKey").value;
  localStorage.setItem("sofifaApiKey", apiKey);
  alert("Settings saved!");
}

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
