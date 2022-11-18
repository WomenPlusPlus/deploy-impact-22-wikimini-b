import mariadb from "mariadb";
import * as dotenv from 'dotenv'
dotenv.config()

export const pool = mariadb.createPool({
    host: process.env.HOST,
    user: process.env.MARIA_USER,
    password: process.env.MARIA_PASS,
    database: process.env.MARIA_DATABASE,
    connectionLimit: 5,
});

// Connect and check for errors
pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            console.error("Database connection lost");
        }
        if (err.code === "ER_CON_COUNT_ERROR") {
            console.error("Database has too many connection");
        }
        if (err.code === "ECONNREFUSED") {
            console.error("Database connection was refused");
        }
        console.error("Unknown error while initialising database connection: " + err)
    }
    if (connection) connection.release();
});