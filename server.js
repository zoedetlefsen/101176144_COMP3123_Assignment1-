// Server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const SERVER_PORT = 8089;
const DB_CONNECTION_STRING = "mongodb://atlas-sql-6525e71a2a51b929abd4e267-yhpt7.a.query.mongodb.net/COMP3123_Assignment1?ssl=true&authSource=admin";

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const employeeRoutes = require('./routes/EmployeeRoute');
const userRoutes = require('./routes/UserRoute');

app.use("/employees", employeeRoutes);
app.use("/users", userRoutes);

app.route("/")
    .get((req, res) => {
        res.send("<h1>Welcome to Assignment 1 for COMP3123</h1>" +
            "\n<h2>By: Zoe Detlefsen - 101176144</h2>");
    });

app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
