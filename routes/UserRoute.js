// UserRoute.js
const express = require("express");
const UserModel = require('../models/UserModel');
const routes = express.Router();
const authenticateToken = require('../authMiddleware');

// Register NEW User
routes.post("/api/user/signup", async (req, res) => {
    try {
        const existingUser = await UserModel.findOne({
            $or: [
                { username: req.body.username },
                { email: req.body.email },
            ],
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    existingUser.username === req.body.username
                        ? "Username already exists"
                        : "Email already exists",
            });
        }

        const user = new UserModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({
            message: "Some error occurred while creating the User.",
        });
    }
});

// User Login - allow user access to the system
routes.post("/api/user/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required",
        });
    }

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Username",
            });
        }

        if (password === user.password) {
            const accessToken = jsonWebToken.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.json({
                status: true,
                username: user.username,
                message: "User logged in successfully",
                jwt_token: accessToken,
            });
        } else {
            res.status(400).json({
                message: "Password Incorrect",
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Error occurred while logging in",
        });
    }
});

module.exports = routes;

