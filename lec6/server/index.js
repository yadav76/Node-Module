const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();           //this allow us to use .env variables in Node App
const app = express();
const isUserExisting = require("./utils/UsernameCheck");

//Import TodoSchema File
const User = require("./Model/UserSchema");
const { LoggerMiddleware } = require("./Middlewares/LoggerMiddleware");
const { AuthMiddleware } = require("./Middlewares/AuthMiddleware")

const jwt = require("jsonwebtoken");   //import jwt Package

app.use(express.json());  //to Convert HTTP Data to JSON Form

//Now use Custom Middleware
// app.use(LoggerMiddleware); //this will print middleware for Every API Call

const PORT = process.env.PORT;
const SALT_ROUNDS = 15;


app.post("/basicAuth", AuthMiddleware, (req, res) => {

    res.send({
        message: "BasicAuthentication Is Done"
    })
})

//Now I have added LoggerMiddleware to only this API Call so middleware will be printed only for this API Call
app.post("/middleware", LoggerMiddleware, (req, res) => {

    res.send({
        message: "Middleware Printed Succesffully!"
    })
})

//POST - Register User
app.post("/register", async (req, res) => {
    const userBody = req.body;   //getting all Details of User from Client

    //Now Check if User Already Exist in database
    const isUser = await isUserExisting(userBody.username);  //This is async function so need to  use "await" here

    //If User Already Present in database
    if (isUser) {
        return res.status(400).send({
            status: 400,
            message: "User Already Exists!",
        })
    }

    //Now before storing all Credentials to Database Encrypt the Password first
    const hashedPassword = await bcrypt.hash(userBody.password, SALT_ROUNDS);  //SALT_ROUNDS is how many times password go to hashing Algorithm to form a best Hashed Password in bcrypt package and It is Asynchronous Function so It returns a Promise

    const userObj = new User({
        name: userBody.name,
        username: userBody.username,
        password: hashedPassword,
        email: userBody.email,
        age: userBody.age,
        gender: userBody.gender,
    })

    //Now save the UserObject to Database
    try {
        await userObj.save();

        res.status(201).send({
            status: 201,
            message: "User Registered Successfully!"
        })
    } catch {

        res.status(400).send({
            status: 400,
            message: "Failed To Register User!"
        })
    }

})

//Api for Login
app.post("/login", AuthMiddleware, async (req, res) => {

    //get User Login Details from client
    const loginBody = req.body;
    let userData;

    try {
        //Now check if username exist in database or not
        userData = await User.findOne({ username: loginBody.username }); //if User already exist then I get his password from Database to compare with current entered password

        if (userData == null) {
            return res.status(400).send({
                status: 400,
                message: "Please Enter Correct UserName!"
            })
        }

    } catch (err) {
        return res.status(400).send({
            status: 400,
            message: "User Fetching Failed!"
        })
    }

    let isPasswordSame;

    try {
        isPasswordSame = await bcrypt.compare(loginBody.password, userData.password); //returns true if both password same else returns false

    } catch (err) {
        //else There is Error in Password decrypting by "bcrypt"
        return res.status(400).send({
            status: 400,
            message: "Password Bcrypt Failed!",
        })
    }

    let payload = {
        name: userData.name,
        username: userData.username,
        email: userData.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY)

    if (isPasswordSame) {
        //If both password match then Login Successfull
        return res.status(200).send({
            status: 200,
            message: "User Successfully Logged In!",
            token: token
        })
    } else {
        //If both password Not match
        res.status(400).send({
            status: 400,
            message: "Please Enter Correct Password!",
        })
    }

})


//Now Make connection with MongoDB Database
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is Connected!"))
    .catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log("App is running at Port", PORT);
})