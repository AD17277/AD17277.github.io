from flask import Flask, jsonify
import sqlite3
import requests
import json

app = Flask(__name__)

# Configuration for the SoFIFA API
API_BASE_URL = "https://api.sofifa.net/"
API_VERSION = "fc25"  # Replace with the desired version, e.g., "fc24", "fc25"
DEFAULT_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}

# Database setup
DATABASE = 'pes_converter.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS players (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sofifa_id INTEGER UNIQUE,
            name TEXT NOT NULL,
            overall INTEGER,
            potential INTEGER,
            positions TEXT,
            nationality TEXT,
            club TEXT,
            wage_eur INTEGER,
            player_face_url TEXT,
            club_logo_url TEXT,
            nation_flag_url TEXT
        )
    ''')
    # Create other tables (teams, leagues, etc.) similarly
    conn.close()

# Initialize the database
init_db()

def fetch_data_from_sofifa(endpoint, headers=None):
    url = f"{API_BASE_URL}{endpoint}"
    try:
        response = requests.get(url, headers=headers or DEFAULT_HEADERS)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data from SoFIFA: {e}")
        return None

def map_pes_attributes(player_data):
    # Implement your PES attribute mapping logic here
    # This is a placeholder function
    return {
        'overall_pes': player_data['overall'],  # Placeholder
        'potential_pes': player_data['potential'],  # Placeholder
        # Add more attribute mappings as needed
    }

def insert_player_into_db(player_data):
    conn = get_db_connection()
    try:
        pes_attributes = map_pes_attributes(player_data)
        conn.execute('''
            INSERT INTO players (sofifa_id, name, overall, potential, positions, nationality, club, wage_eur, player_face_url, club_logo_url, nation_flag_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            player_data['sofifa_id'],
            player_data['short_name'],
            pes_attributes['overall_pes'],
            pes_attributes['potential_pes'],
            player_data['player_positions'],
            player_data['nationality_name'],
            player_data['club_name'],
            player_data['wage_eur'],
            player_data['player_face_url'],
            player_data['club_logo_url'],
            player_data['nation_flag_url']
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        # Handle duplicate entry
        pass
    except Exception as e:
        print(f"Error inserting player into DB: {e}")
    finally:
        conn.close()

def update_players_table():
    # Fetch the latest roster ID
    roster_data = fetch_data_from_sofifa(f"teams/latest?version={API_VERSION}")
    if roster_data and 'data' in roster_data:
        latest_roster = roster_data['data'][0]['latestRoster']
    else:
        print("Could not determine the latest roster.")
        return

    # Fetch all players from SoFIFA and insert them into the database
    limit = 100
    offset = 0
    while True:
        players_data = fetch_data_from_sofifa(f"players?version={API_VERSION}&offset={offset}&limit={limit}")
        if players_data and 'data' in players_data:
            players = players_data['data']
            for player in players:
                insert_player_into_db(player)
            if len(players) < limit:
                # If the number of fetched players is less than the limit, we've reached the last page
                break
            offset += limit
        else:
            print("Failed to fetch or no players data found.")
            break

# API endpoint to get all players
@app.route('/players')
def get_players():
    conn = get_db_connection()
    players = conn.execute('SELECT * FROM players').fetchall()
    conn.close()
    return jsonify([dict(player) for player in players])

# Add more API endpoints for teams, leagues, etc.

if __name__ == '__main__':
    update_players_table()  # Fetch and update player data on startup
    app.run(debug=True)
