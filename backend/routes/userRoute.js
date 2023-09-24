const express = require("express");
const {
    postuserdata,
    getuserdata,
    loginuser,
    authenticateToken,
} = require("../controllers/userController");
const userRouter = express.Router();
const { body } = require("express-validator");

userRouter.post(
    "/createuser",
    body("email").isEmail(),
    postuserdata
);

userRouter.get("/getuser", getuserdata);

userRouter.post(
    "/login",
    body("email").isEmail(),
    loginuser,
    authenticateToken
);

module.exports = userRouter;