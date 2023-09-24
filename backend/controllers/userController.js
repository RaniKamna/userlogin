const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: 'config/config.env' });
const jwtSecret = process.env.JWT_SECRET;

async function postuserdata(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const userData = await User.create(req.body);
        return res.status(201).send({ userData, success: true });
    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
}

async function loginuser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    let password = req.body.password;
    try {
        let userData = await User.findOne({ email, password });
        if (!userData) {
            return res
                .status(400)
                .json({ error: "Try logging with correct credentials" });
        }

        const payload = {
            user: {
                id: userData.id
            }
        }

        const authToken = jwt.sign(payload, jwtSecret);
        console.log(authToken, payload);
        return res.status(200).json({ success: true, authToken: authToken });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
}

async function authenticateToken(req, res, next) {
    const authToken = req.header('Authorization');
    if (!authToken) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(authToken, jwtSecret, (err, data) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    });
}

async function getuserdata(req, res) {
    try {
        const user = await User.find();
        return res.json({
            user,
        });
    } catch (error) {
        console.log(error);
        return res.json({ success: false });
    }
}

module.exports = { postuserdata, getuserdata, loginuser, authenticateToken };