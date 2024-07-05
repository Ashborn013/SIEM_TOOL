import sqlite3

def connect():
    return sqlite3.connect("/home/jovyan/DataBaseStore/database.db")

def detect_brute_force_db_save(df):
    conn = connect()  # Use a single connection for efficiency
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
    pandas_df = df.toPandas()
    for _, row in pandas_df.iterrows():
        cursor.execute(
            """
            INSERT INTO brute_force (timestamp, log, message, ecs, event, name, id, type, event_id, hostname)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["@timestamp"],
                str(row["log"]),
                row["message"],
                str(row["ecs"]),
                str(row["event"]),
                row["name"],
                row["id"],
                row["type"],
                row["event_id"],
                row["hostname"],
            ),
        )
    conn.commit()
    cursor.close()

def user_account_change_db_save(df):
    connection = connect()
    cursor = connection.cursor()

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
    pandas_df = df.toPandas()
    for _, row in pandas_df.iterrows():
        cursor.execute(
            """
            INSERT INTO user_account_changes (timestamp, log, message, ecs, event, name, id, type, event_id, hostname)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["@timestamp"],
                str(row["log"]),
                row["message"],
                str(row["ecs"]),
                str(row["event"]),
                row["name"],
                row["id"],
                row["type"],
                row["event_id"],
                row["hostname"],
            ),
        )
    connection.commit()
    cursor.close()


def spl_privilege_logon_db_save(df):
    connection = connect()
    cursor = connection.cursor()

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
    pandas_df = df.toPandas()
    for _, row in pandas_df.iterrows():
        cursor.execute(
            """
            INSERT INTO spl_privilege_logons (timestamp, log, message, ecs, event, name, id, type, event_id, hostname)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                row["@timestamp"],
                str(row["log"]),
                row["message"],
                str(row["ecs"]),
                str(row["event"]),
                row["name"],
                row["id"],
                row["type"],
                row["event_id"],
                row["hostname"],
            ),
        )
    connection.commit()
    cursor.close()