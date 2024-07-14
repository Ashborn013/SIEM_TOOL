import sqlite3
DATABASE_PATH = "/DataBaseStore/database.db"

def connect():
    return sqlite3.connect(DATABASE_PATH)  # Use the constant for consistency

def query_data_brute_force():
    conn = connect()  # Use the simplified connect function
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS brute_force (
            timestamp TEXT,
            log TEXT,
            message TEXT,
            ecs TEXT,
            event TEXT,
            name TEXT,
            id TEXT,
            type TEXT,
            event_id TEXT,
            hostname TEXT
        )
        """
    )
    cursor.execute("SELECT * FROM brute_force")  # Removed unnecessary f-string
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "timestamp": row[0],
            "log": row[1],
            "message": row[2],
            "ecs": row[3],
            "event": row[4],
            "name": row[5],
            "id": row[6],
            "type": row[7],
            "event_id": row[8],
            "hostname": row[9],
        }
        for row in rows
    ]

def query_data_user_account_changes():
    conn = connect()  # Use the simplified connect function
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS user_account_changes (
            timestamp TEXT,
            log TEXT,
            message TEXT,
            ecs TEXT,
            event TEXT,
            name TEXT,
            id TEXT,
            type TEXT,
            event_id TEXT,
            hostname TEXT
        )
        """
    )
    cursor.execute("SELECT * FROM user_account_changes")  # Removed unnecessary f-string
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "timestamp": row[0],
            "log": row[1],
            "message": row[2],
            "ecs": row[3],
            "event": row[4],
            "name": row[5],
            "id": row[6],
            "type": row[7],
            "event_id": row[8],
            "hostname": row[9],
        }
        for row in rows
    ]

def query_data_spl_privilege_logons():
    conn = connect()  # Use the simplified connect function
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS spl_privilege_logons (
            timestamp TEXT,
            log TEXT,
            message TEXT,
            ecs TEXT,
            event TEXT,
            name TEXT,
            id TEXT,
            type TEXT,
            event_id TEXT,
            hostname TEXT
        )
        """
    )
    cursor.execute("SELECT * FROM spl_privilege_logons")  # Removed unnecessary f-string
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "timestamp": row[0],
            "log": row[1],
            "message": row[2],
            "ecs": row[3],
            "event": row[4],
            "name": row[5],
            "id": row[6],
            "type": row[7],
            "event_id": row[8],
            "hostname": row[9],
        }
        for row in rows
    ]
def quary_explicit_credential_logon():
    conn = connect()  # Use the simplified connect function
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS explicit_credential_logon (
            timestamp TEXT,
            log TEXT,
            message TEXT,
            ecs TEXT,
            event TEXT,
            name TEXT,
            id TEXT,
            type TEXT,
            event_id TEXT,
            hostname TEXT,
            email TEXT
        )
        """
    )
    cursor.execute("SELECT * FROM explicit_credential_logon")  # Removed unnecessary f-string
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "timestamp": row[0],
            "log": row[1],
            "message": row[2],
            "ecs": row[3],
            "event": row[4],
            "name": row[5],
            "id": row[6],
            "type": row[7],
            "event_id": row[8],
            "hostname": row[9],
            "email" : row[10]
        }
        for row in rows
    ]



def quary_job_details():
    conn = connect()  # Use the simplified connect function
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS Jobs (
            time TEXT,
            Job TEXT,
            message TEXT,
            level TEXT,
            Job_id TEXT
        )
        """
    )
    cursor.execute("SELECT * FROM Jobs")  # Removed unnecessary f-string
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "time": row[0], "Job": row[1], "message": row[2], "level": row[3], "Job_id": row[4]
        }
        for row in rows
    ]