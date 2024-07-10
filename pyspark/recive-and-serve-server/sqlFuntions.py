import sqlite3
DATABASE_PATH = "/DataBaseStore/database.db"


def connect():
    return sqlite3.connect("/DataBaseStore/database.db")

def connect_db():
    return sqlite3.connect(DATABASE_PATH)


def query_data(table_name):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM {table_name}")
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

def quary_job_details():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM ")
    rows = cursor.fetchall()
    conn.close()
    return [
        {
            "time" : row[0], "Job":row[0], "message":row[0], "level":row[0], "Job_id":row[0]
        }
        for row in rows
    ]