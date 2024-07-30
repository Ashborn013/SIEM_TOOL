import sqlite3
import mysql.connector
from mysql.connector import Error
DATABASE_PATH = "/DataBaseStore/database.db"

def connect():
    # return sqlite3.connect("/home/jovyan/DataBaseStore/database.db")
    try:
        connection = mysql.connector.connect(
            database="pyspark",
            host='db',  
            port=3306,
            user='root',
            password='root'
        )
        
        if connection.is_connected():
            print("Connected to MySQL Server")
            return connection

    except Error as e:
        print("Error while connecting to MySQL", e)
        return None

def query_data_brute_force():
    conn = connect()

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
    cursor.execute("SELECT * FROM brute_force")
    rows = cursor.fetchall()

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
    conn = connect()
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
    cursor.execute("SELECT * FROM user_account_changes")
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
    conn = connect()
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
    cursor.execute("SELECT * FROM spl_privilege_logons")
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
    conn = connect()
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
    cursor.execute("SELECT * FROM explicit_credential_logon")
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
            "email": row[10],
        }
        for row in rows
    ]

def quary_extract_new_process_creation_logs():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS extract_new_process_creation_logs (
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
    cursor.execute("SELECT * FROM extract_new_process_creation_logs")
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
            "email": row[10],
        }
        for row in rows
    ]



def quary_job_details():
    conn = connect()
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
    cursor.execute("SELECT * FROM Jobs")
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "time": row[0],
            "Job": row[1],
            "message": row[2],
            "level": row[3],
            "Job_id": row[4],
        }
        for row in rows
    ]

def query_user_data():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id TEXT,
            username TEXT,
            password TEXT,
            email TEXT
        )
        """
    )
    cursor.execute("SELECT COUNT(*) FROM users")
    count = cursor.fetchone()[0]
    
    if count == 0:
        # Insert default admin user
        cursor.execute(
            """
            INSERT INTO users (id, username, password, email)
            VALUES (%s, %s, %s, %s)
            """,
            ("1", "admin", "admin", "admin@admin.com")
        )
        conn.commit()
    cursor.execute("SELECT username, password, email FROM users")
    rows = cursor.fetchall()
    conn.close()

    return [
        {
            "username": row[0],
            "password": row[1],
            "email": row[2],
        }
        for row in rows
    ]
