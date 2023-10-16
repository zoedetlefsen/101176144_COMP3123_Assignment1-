// Server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const SERVER_PORT = 8089;
const DB_CONNECTION_STRING = "mongodb+srv://root:FCJKbWXefIB6kSgq@cluster0.bs6u4dl.mongodb.net/";

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
