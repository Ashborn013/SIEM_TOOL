import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { cookies } from "next/headers";
export async function GET(request) {
    return NextResponse.json({ message: `Hello` });


}


export async function POST(request) {
    // Create a MySQL connection

    const con = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "pyspark"
    });

    console.log("Connected!");

    // Get form data
    const formData = await request.formData();
    const username = formData.get('username');
    const password = formData.get('password');

    // Use parameterized query to prevent SQL injection
    const [rows] = await con.execute('SELECT * FROM users WHERE  username = ? AND password = ?', [ username, password]);
    const row = rows[0];
    console.log(row);
    if (row) {
        // Set cookie
        cookies().set("user", username,{"path":"/"});

        return NextResponse.json({ message: `LogedIn` });
    }

    // console.log(rows[0]);

    // Close the connection
    await con.end();

    // Return the result in the response
    return NextResponse.json({ result: rows });
}


