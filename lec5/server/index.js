const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();           //this allow us to use .env variables in Node App
const app = express();

//Import TodoSchema File
const Todo = require("./Models/todoSchema");

app.use(express.json());  //to Convert HTTP Data to JSON Form

const PORT = process.env.PORT;

//Create POST API Call for Creating a New Records
app.post("/todo", async (req, res) => {
    let { text, isCompleted } = req.body;

    //Data Validation
    if (text.length == 0 || isCompleted == null) {
        return res.status(400).send({
            status: 400,
            message: "Please Enter Data in Correct Format!"
        })
    }

    try {
        const todoObj = new Todo({
            text,
            isCompleted
        })

        //Now Add above Todo Object to Database
        await todoObj.save();

        res.status(201).send({
            status: 201,
            message: "Todo Created Successfully!"
        })

    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Todo Creation Failed!"
        })
    }
})


//Get all Todos = all Records
app.get("/todo", async (req, res) => {

    try {
        const todoList = await Todo.find({});//Leaving {} blank becuase I want to get all records not a spcific one

        res.status(200).send({
            status: 200,
            message: "All todos are Fetched Successfully!",
            data: todoList
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Fetch Todos!"
        })
    }
})

//get a Todo By Id
app.get("/todo/:id", async (req, res) => {

    try {
        const todoId = req.params.id;
        const todo = await Todo.findById(todoId);  //fetching a todo By Id

        res.status(200).send({
            status: 200,
            message: "Tod Fetched By Id Successfully!",
            data: todo
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Fetch Todo By Id!"
        })
    }
})

//Delete The Todo By Id
app.delete("/todo/:id", async (req, res) => {

    try {
        const todoId = req.params.id;
        await Todo.findByIdAndDelete(todoId);  //Deleting a todo By Id

        res.status(200).send({
            status: 200,
            message: "Todo Deleted Successfully!",
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Delete Todo By Id!"
        })
    }
})

//Updating Todo by Request.body
app.put("/todo", (req, res) => {

    //Here Not using Try{}Catch{} Block Becuase Promises has It's own Catch block Already
    Todo.findByIdAndUpdate(req.body._id, {

        isCompleted: req.body.isCompleted,
        text: req.body.text
    }).then(response => {
        res.status(200).send({
            status: 200,
            message: "Todo Updated Successfully!",
            data: response
        })
    }).catch(err =>
        res.status(400).send({
            status: 400,
            message: "Failed to Update Todo",
            data: err
        })
    )
})

//for Sorting all the Todos on The Basis of DateTime of Todos
app.get("/todoSort", async (req, res) => {

    try {
        const todoList = await Todo.find({}).sort({ dateTime: 1 });  //this will sort todos on basis of dateTime and -1 is for Descending Order sort. If put 1 then Sort in Ascending Order

        res.status(200).send({
            status: 200,
            message: "Successfully Sorted all todos",
            data: todoList
        })
    } catch (err) {

        res.status(400).send({
            status: 400,
            message: "Failed To Sort Todos",
        })
    }
})

//Now Make connection with MongoDB Database
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("MongoDB is Connected!");
}).catch((err) => console.log(err))

app.listen(PORT, () => {
    console.log("App is running at Port", PORT);
})