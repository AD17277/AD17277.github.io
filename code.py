from flask import Flask, jsonify, render_template
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
            nation_flag_url TEXT,
            overall_pes INTEGER,
            potential_pes INTEGER,
            offensive_awareness INTEGER,
            ball_control INTEGER,
            dribbling INTEGER,
            tight_possession INTEGER,
            low_pass INTEGER,
            lofted_pass INTEGER,
            finishing INTEGER,
            heading INTEGER,
            place_kicking INTEGER,
            curl INTEGER,
            speed INTEGER,
            acceleration INTEGER,
            kicking_power INTEGER,
            jump INTEGER,
            physical_contact INTEGER,
            balance INTEGER,
            stamina INTEGER,
            defensive_awareness INTEGER,
            ball_winning INTEGER,
            aggression INTEGER,
            gk_awareness INTEGER,
            gk_catching INTEGER,
            gk_clearing INTEGER,
            gk_reflexes INTEGER,
            gk_reach INTEGER,
            weak_foot_usage INTEGER,
            weak_foot_accuracy INTEGER,
            form INTEGER,
            injury_resistance INTEGER,
            attacking_crossing INTEGER,
            attacking_finishing INTEGER,
            attacking_heading_accuracy INTEGER,
            attacking_short_passing INTEGER,
            skill_long_passing INTEGER,
            power_shot_power INTEGER,
            power_long_shots INTEGER,
            mentality_vision INTEGER,
            mentality_penalties INTEGER
        )
    ''')
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
    pes_attributes = {}

    # Map attributes based on the provided mapping
    pes_attributes['overall_pes'] = player_data.get('overall')
    pes_attributes['potential_pes'] = player_data.get('potential')
    pes_attributes['offensive_awareness'] = player_data.get('mentality_positioning')
    pes_attributes['ball_control'] = player_data.get('dribbling')
    pes_attributes['dribbling'] = player_data.get('dribbling')
    pes_attributes['tight_possession'] = player_data.get('dribbling')
    pes_attributes['low_pass'] = player_data.get('attacking_short_passing')
    pes_attributes['lofted_pass'] = player_data.get('skill_long_passing')
    pes_attributes['finishing'] = player_data.get('attacking_finishing')
    pes_attributes['heading'] = player_data.get('attacking_heading_accuracy')
    pes_attributes['place_kicking'] = player_data.get('skill_fk_accuracy')
    pes_attributes['curl'] = player_data.get('skill_curve')
    pes_attributes['speed'] = player_data.get('movement_sprint_speed')
    pes_attributes['acceleration'] = player_data.get('movement_acceleration')
    pes_attributes['kicking_power'] = player_data.get('power_shot_power')
    pes_attributes['jump'] = player_data.get('power_jumping')
    pes_attributes['physical_contact'] = player_data.get('power_strength')
    pes_attributes['balance'] = player_data.get('movement_balance')
    pes_attributes['stamina'] = player_data.get('endurance')
    pes_attributes['defensive_awareness'] = player_data.get('mentality_interceptions')
    pes_attributes['ball_winning'] = player_data.get('defending_standing_tackle')
    pes_attributes['aggression'] = player_data.get('mentality_aggression')
    pes_attributes['gk_awareness'] = player_data.get('goalkeeping_diving')
    pes_attributes['gk_catching'] = player_data.get('goalkeeping_handling')
    pes_attributes['gk_clearing'] = player_data.get('goalkeeping_kicking')
    pes_attributes['gk_reflexes'] = player_data.get('goalkeeping_reflexes')
    pes_attributes['gk_reach'] = player_data.get('goalkeeping_positioning')
    pes_attributes['weak_foot_usage'] = player_data.get('weak_foot')
    pes_attributes['weak_foot_accuracy'] = player_data.get('weak_foot')
    pes_attributes['attacking_crossing'] = player_data.get('attacking_crossing')
    pes_attributes['attacking_finishing'] = player_data.get('attacking_finishing')
    pes_attributes['attacking_heading_accuracy'] = player_data.get('attacking_heading_accuracy')
    pes_attributes['attacking_short_passing'] = player_data.get('attacking_short_passing')
    pes_attributes['skill_long_passing'] = player_data.get('skill_long_passing')
    pes_attributes['power_shot_power'] = player_data.get('power_shot_power')
    pes_attributes['power_long_shots'] = player_data.get('power_long_shots')
    pes_attributes['mentality_vision'] = player_data.get('mentality_vision')
    pes_attributes['mentality_penalties'] = player_data.get('mentality_penalties')

    # Placeholder for specific PES skills
    pes_attributes['playing_style'] = None  # Placeholder, set based on SoFIFA data if possible
    pes_attributes['com_playing_styles'] = []  # Placeholder, set based on SoFIFA data if possible
    pes_attributes['player_skills'] = []  # Placeholder, set based on SoFIFA data if possible
    
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
            pes_attributes['injury_resistance'] = 3
        elif player_data['overall'] >= 75:
            pes_attributes['injury_resistance'] = 2
        else:
            pes_attributes['injury_resistance'] = 1

    return pes_attributes

def insert_player_into_db(player_data):
    conn = get_db_connection()
    try:
        pes_attributes = map_pes_attributes(player_data)
        conn.execute('''
            INSERT INTO players (
                sofifa_id, name, overall, potential, positions, nationality, club, wage_eur,
                player_face_url, club_logo_url, nation_flag_url, overall_pes, potential_pes,
                offensive_awareness, ball_control, dribbling, tight_possession, low_pass,
                lofted_pass, finishing, heading, place_kicking, curl, speed, acceleration,
                kicking_power, jump, physical_contact, balance, stamina, defensive_awareness,
                ball_winning, aggression, gk_awareness, gk_catching, gk_clearing, gk_reflexes,
                gk_reach, weak_foot_usage, weak_foot_accuracy, form, injury_resistance,
                attacking_crossing, attacking_finishing, attacking_heading_accuracy,
                attacking_short_passing, skill_long_passing, power_shot_power, power_long_shots,
                mentality_vision, mentality_penalties
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
                    ?, ?, ?, ?, ?, ?, ?)
        ''', (
            player_data['sofifa_id'],
            player_data['short_name'],
            player_data['overall'],
            player_data['potential'],
            player_data['player_positions'],
            player_data['nationality_name'],
            player_data['club_name'],
            player_data['wage_eur'],
            player_data['player_face_url'],
            player_data['club_logo_url'],
            player_data['nation_flag_url'],
            pes_attributes['overall_pes'],
            pes_attributes['potential_pes'],
            pes_attributes['offensive_awareness'],
            pes_attributes['ball_control'],
            pes_attributes['dribbling'],
            pes_attributes['tight_possession'],
            pes_attributes['low_pass'],
            pes_attributes['lofted_pass'],
            pes_attributes['finishing'],
            pes_attributes['heading'],
            pes_attributes['place_kicking'],
            pes_attributes['curl'],
            pes_attributes['speed'],
            pes_attributes['acceleration'],
            pes_attributes['kicking_power'],
            pes_attributes['jump'],
            pes_attributes['physical_contact'],
            pes_attributes['balance'],
            pes_attributes['stamina'],
            pes_attributes['defensive_awareness'],
            pes_attributes['ball_winning'],
            pes_attributes['aggression'],
            pes_attributes['gk_awareness'],
            pes_attributes['gk_catching'],
            pes_attributes['gk_clearing'],
            pes_attributes['gk_reflexes'],
            pes_attributes['gk_reach'],
            pes_attributes['weak_foot_usage'],
            pes_attributes['weak_foot_accuracy'],
            pes_attributes['form'],
            pes_attributes['injury_resistance'],
            pes_attributes['attacking_crossing'],
            pes_attributes['attacking_finishing'],
            pes_attributes['attacking_heading_accuracy'],
            pes_attributes['attacking_short_passing'],
            pes_attributes['skill_long_passing'],
            pes_attributes['power_shot_power'],
            pes_attributes['power_long_shots'],
            pes_attributes['mentality_vision'],
            pes_attributes['mentality_penalties']
        ))
        conn.commit()
    except sqlite3.IntegrityError:
        print(f"Player with sofifa_id {player_data['sofifa_id']} already exists in the database.")
    except Exception as e:
        print(f"Error inserting player into DB: {e}")
    finally:
        conn.close()

def update_players_table():
    conn = get_db_connection()
    # Fetch the latest roster ID
    roster_data = fetch_data_from_sofifa(f"teams/latest?version={API_VERSION}")
    if roster_data and 'data' in roster_data:
        latest_roster = roster_data['data'][0]['latestRoster']
    else:
        print("Could not determine the latest roster.")
        return

    # Fetch all players from SoFIFA and insert them into the database
    limit = 100  # Reduced limit for testing
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
    conn.close()

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

# API endpoint to get all players
@app.route('/players')
def get_players():
    conn = get_db_connection()
    players = conn.execute('SELECT * FROM players').fetchall()
    conn.close()
    return jsonify([dict(player) for player in players])

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

@app.route('/player/<int:player_id>')
def get_player(player_id):
    conn = get_db_connection()
    player = conn.execute('SELECT * FROM players WHERE sofifa_id = ?', (player_id,)).fetchone()
    conn.close()
    if player is None:
        return jsonify({'error': 'Player not found'}), 404
    return jsonify(dict(player))

@app.route('/team/<int:team_id>')
def get_team(team_id):
    conn = get_db_connection()
    team = conn.execute('SELECT * FROM teams WHERE sofifa_id = ?', (team_id,)).fetchone()
    conn.close()
    if team is None:
        return jsonify({'error': 'Team not found'}), 404
    return jsonify(dict(team))

if __name__ == '__main__':
    update_players_table()
    update_teams_table()
    update_leagues_table()
    app.run(debug=True)