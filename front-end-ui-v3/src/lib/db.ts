import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

async function createConnection() {
    // Open a database connection
    const db = await open({
        filename: 'database.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            password TEXT
        )
    `);

    await db.run(`
        INSERT INTO users (name, password)
        SELECT 'admin', 'admin'
        WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = 'admin')
    `);

    return db;
}

export async function fetchUsers() {
    const db: Database = await createConnection();
    const rows = await db.all('SELECT * FROM users');
    // console.log(rows); // Use the rows variable to avoid the warning
    await db.close();
    return rows;
}