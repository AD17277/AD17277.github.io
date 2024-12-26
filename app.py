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
    """
    Maps FIFA/FC 25 player attributes to PES 21 attributes.

    Args:
        player_data (dict): A dictionary containing player data from SoFIFA.

    Returns:
        dict: A dictionary containing the mapped PES 21 attributes.
    """

    # Placeholder for skill mapping (SoFIFA attribute -> PES skill)
    skill_map = {
        'skill_moves': 'skillMoves',
        'dribbling': 'ballControl',
        'ball_control': 'ballControl',
        'finishing': 'finishing',
        'long_shots': 'longShots',
        'shot_power': 'kickingPower',
        'volleys': 'finishing',
        'curve': 'curl',
        'free_kick_accuracy': 'placeKicking',
        'short_passing': 'lowPass',
        'long_passing': 'loftedPass',
        'crossing': 'loftedPass',
        'heading_accuracy': 'header',
        'jumping': 'jump',
        'stamina': 'stamina',
        'strength': 'physicalContact',
        'agility': 'balance',
        'balance': 'balance',
        'reactions': 'offensiveAwareness',
        'interceptions': 'defensiveAwareness',
        'positioning': 'offensiveAwareness',
        'vision': 'lowPass',
        'penalties': 'placeKicking',
        'composure': 'form',
        'marking': 'defensiveAwareness',
        'standing_tackle': 'ballWinning',
        'sliding_tackle': 'ballWinning',
        'gk_diving': 'gkAwareness',
        'gk_handling': 'gkCatching',
        'gk_kicking': 'gkClearing',
        'gk_reflexes': 'gkReflexes',
        'gk_positioning': 'gkAwareness',
        "pace": "speed",
        "acceleration": 'acceleration',
        "sprint_speed": "speed",
        'defending': 'ballWinning',
        'passing': 'lowPass',
        'physic': 'physicalContact',
        'shooting': 'finishing'
        # Add more mappings as needed
    }

    pes_attributes = {}

    # Direct mapping for attributes that have a direct equivalent
    for sofifa_attr, pes_attr in skill_map.items():
        if sofifa_attr in player_data:
            pes_attributes[pes_attr] = player_data[sofifa_attr]

    # Special logic for specific attributes
    if 'attacking_finishing' in player_data:
      pes_attributes['finishing'] = player_data['attacking_finishing']

    if 'mentality_interceptions' in player_data:
      pes_attributes['ballWinning'] = player_data['mentality_interceptions']
    
    if 'defending_marking_awareness' in player_data:
      pes_attributes['defensiveAwareness'] = player_data['defending_marking_awareness']

    if 'power_jumping' in player_data:
      pes_attributes['jump'] = player_data['power_jumping']

    if 'mentality_aggression' in player_data:
      pes_attributes['aggression'] = player_data['mentality_aggression']

    # Weak Foot Usage and Accuracy (example logic, adjust as needed)
    if 'weak_foot' in player_data:
        pes_attributes['weakFootUsage'] = player_data['weak_foot']
        pes_attributes['weakFootAccuracy'] = player_data['weak_foot']

    # Form (example logic, adjust as needed)
    if 'overall' in player_data:
        # Example: Map overall to form, with higher overall indicating better form
        if player_data['overall'] >= 80:
            pes_attributes['form'] = 7
        elif player_data['overall'] >= 70:
            pes_attributes['form'] = 6
        elif player_data['overall'] >= 60:
            pes_attributes['form'] = 5
        else:
            pes_attributes['form'] = 4

    # Injury Resistance (example logic, adjust as needed)
    if 'overall' in player_data:
        # Example: Map overall to injury resistance, with higher overall indicating better resistance
        if player_data['overall'] >= 85:
            pes_attributes['injuryResistance'] = 3
        elif player_data['overall'] >= 75:
            pes_attributes['injuryResistance'] = 2
        else:
            pes_attributes['injuryResistance'] = 1

    # Map additional attributes
    if 'attacking_crossing' in player_data:
        pes_attributes['crossing'] = player_data['attacking_crossing']

    if 'attacking_finishing' in player_data:
        pes_attributes['finishing'] = player_data['attacking_finishing']

    if 'attacking_heading_accuracy' in player_data:
        pes_attributes['header'] = player_data['attacking_heading_accuracy']

    if 'attacking_short_passing' in player_data:
        pes_attributes['lowPass'] = player_data['attacking_short_passing']

    if 'skill_long_passing' in player_data:
        pes_attributes['loftedPass'] = player_data['skill_long_passing']

    if 'power_shot_power' in player_data:
        pes_attributes['kickingPower'] = player_data['power_shot_power']

    if 'power_long_shots' in player_data:
        pes_attributes['longShots'] = player_data['power_long_shots']

    if 'mentality_vision' in player_data:
        pes_attributes['vision'] = player_data['mentality_vision']

    if 'mentality_penalties' in player_data:
        pes_attributes['penalties'] = player_data['mentality_penalties']

    # ... (Add mappings for other attributes)

    # Example for handling specific PES skills (you'll need to expand this based on your needs)
    pes_attributes['playing_style'] = None  # Placeholder, set based on SoFIFA data if possible
    pes_attributes['com_playing_styles'] = []  # Placeholder, set based on SoFIFA data if possible
    pes_attributes['player_skills'] = []  # Placeholder, set based on SoFIFA data if possible
    
    return pes_attributes
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
def insert_team_into_db(team_data):
    conn = get_db_connection()
    try:
        conn.execute('''
            INSERT INTO teams (sofifa_id, name, league_id, league_name)
            VALUES (?, ?, ?, ?)
        ''', (
            team_data['id'],
            team_data['name'],
            team_data['leagueId'],
            team_data['league']['name']
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        # Handle duplicate entry
        pass
    except Exception as e:
        print(f"Error inserting team into DB: {e}")
    finally:
        conn.close()

def update_teams_table():
    # Fetch the latest roster ID
    roster_data = fetch_data_from_sofifa(f"teams/latest?version={API_VERSION}")
    if roster_data and 'data' in roster_data:
        latest_roster = roster_data['data'][0]['latestRoster']
    else:
        print("Could not determine the latest roster.")
        return

    # Fetch all teams from SoFIFA and insert them into the database
    limit = 100
    offset = 0
    while True:
        teams_data = fetch_data_from_sofifa(f"teams?version={API_VERSION}&offset={offset}&limit={limit}")
        if teams_data and 'data' in teams_data:
            teams = teams_data['data']
            for team in teams:
                insert_team_into_db(team)
            if len(teams) < limit:
                # If the number of fetched teams is less than the limit, we've reached the last page
                break
            offset += limit
        else:
            print("Failed to fetch or no teams data found.")
            break

def insert_league_into_db(league_data):
    conn = get_db_connection()
    try:
        conn.execute('''
            INSERT INTO leagues (sofifa_id, name)
            VALUES (?, ?)
        ''', (
            league_data['id'],
            league_data['name']
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        # Handle duplicate entry
        pass
    except Exception as e:
        print(f"Error inserting league into DB: {e}")
    finally:
        conn.close()

def update_leagues_table():
    # Fetch all leagues from SoFIFA and insert them into the database
    leagues_data = fetch_data_from_sofifa(f"leagues?version={API_VERSION}")
    if leagues_data and 'data' in leagues_data:
        leagues = leagues_data['data']
        for league in leagues:
            insert_league_into_db(league)
    else:
        print("Failed to fetch or no leagues data found.")

# Create tables for teams and leagues
def init_db_teams_leagues():
    conn = get_db_connection()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sofifa_id INTEGER UNIQUE,
            name TEXT NOT NULL,
            league_id INTEGER,
            league_name TEXT
        )
    ''')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS leagues (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sofifa_id INTEGER UNIQUE,
            name TEXT NOT NULL
        )
    ''')
    conn.close()

# Initialize the database for teams and leagues
init_db_teams_leagues()

# API endpoint to get all teams
@app.route('/teams')
def get_teams():
    conn = get_db_connection()
    teams = conn.execute('SELECT * FROM teams').fetchall()
    conn.close()
    return jsonify([dict(team) for team in teams])

# API endpoint to get all leagues
@app.route('/leagues')
def get_leagues():
    conn = get_db_connection()
    leagues = conn.execute('SELECT * FROM leagues').fetchall()
    conn.close()
    return jsonify([dict(league) for league in leagues])

if __name__ == '__main__':
    update_players_table()
    update_teams_table()
    update_leagues_table()
    app.run(debug=True)
