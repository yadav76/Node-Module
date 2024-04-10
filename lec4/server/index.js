const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 8001;

app.use(express.json());   //Middleware to convert HTTP form Data to JSON form

//get all todos
app.get("/allTodos", (req, res) => {
    try {
        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());

        //Now get only Todos from "fileData"
        const todoList = fileData.todos;

        //now return todos as response
        res.status(200).send({
            status: 200,
            Message: "Fetched All Todos Successfully",
            data: todoList
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Fetch All Todo"
        })
    }
})

//get a Particular todo
app.get("/todo", (req, res) => {
    try {
        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
        const todoList = fileData.todos;

        const todoId = req.query.id;  //Here I can also use "Params"

        const todoWithId = todoList.filter(todo => todo.id == todoId);  //Getting the Todo which Id is Provided

        res.status(200).send({
            status: 200,
            message: "Todo with Id Fetched Successfully",
            data: todoWithId[0]     //returns ans Array of Todos so getting only 1st Element of Answer Array
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Fetch Todo"
        })
    }
})

//To Update Any Todo
app.put("/todo/:id", (req, res) => {
    try {
        const todoId = req.params.id;
        const updatedTodo = req.body;

        const fileData = JSON.parse(fs.readFileSync("./database.json"));

        const todoList = fileData.todos;

        //Now go to Particular Todo and Update It using Id
        for (let i = 0; i < todoList.length; i++) {

            if (todoList[i].id == todoId) {
                //Now I found todo with Given Id Now Update this Todo Directly In fileData because TodoList is just Reference of fileData.todo

                fileData.todos[i] = updatedTodo;
                break;
            }
        }

        //Now Update the whole File of database.json
        fs.writeFileSync("./database.json", JSON.stringify(fileData));

        res.status(200).send({
            status: 200,
            message: "Todo Updated Successfully"
        })
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Update Todo"
        })
    }
})

//To Delete The Todo
app.delete("/todo/:id", (req, res) => {
    try {
        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());
        const todoList = fileData.todos;

        const todoId = req.params.id;  //Here I can also use "Params"

        const todoWithId = todoList.filter(todo => todo.id != todoId);  //Getting the Todo which Id is Provided

        //Now Update All Todos in "fileData"
        fileData.todos = todoWithId;

        //Now Update database.json File
        fs.writeFileSync("./database.json", JSON.stringify(fileData));

        res.status(200).send({
            status: 200,
            message: "Todo Deleted Successfully",
            data: todoWithId    //returns ans Array of Todos so getting only 1st Element of Answer Array
        });
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Delete Todo"
        })
    }
})

//To Create New Todo
app.post("/todo", (req, res) => {

    try {
        const newTodo = {
            id: req.body.id,
            task: req.body.task,
            date: new Date(),
            isCompleted: req.body.isCompleted
        }

        let fileData = JSON.parse(fs.readFileSync("./database.json").toString());

        fileData.todos.push(newTodo);

        fs.writeFileSync('./database.json', JSON.stringify(fileData));

        res.status(201).send("Todo is Successfully Created");
    } catch (err) {
        res.status(400).send({
            status: 400,
            message: "Failed to Create Todo"
        })
    }


})

app.listen(PORT, () => {
    console.log("Server is Running on PORT", PORT)
}) 