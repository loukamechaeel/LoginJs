const express = require("express");
const mysql = require("mysql");

const app = express();
app.use(express.json());
app.use(express.static("frontend"));

require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: " + err.stack);
        return;
    }
    console.log("Connected to the database.");
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    connection.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error("Error executing query: " + err.stack);
            res.status(500).send("Internal error");
        } else if (results.length > 0) {
            res.send("Login success!");
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
