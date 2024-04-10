const express = require('express')
const mysql = require('mysql')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

//Now make connection with MySQL Database
const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    port: process.env.MYSQL_PORT,
    multipleStatements: false,
})

//Now create Table using API
app.get("/create-table", (req, res) => {
    let query = "CREATE TABLE IF NOT EXISTS TODOS(ID INT PRIMARY KEY auto_increment,isCompleted bool NOT NULL, USERNAME VARCHAR(25) NOT NULL)";

    db.query(query, (err, result) => {
        if (err) throw err;

        res.send(result);
    })
})

//Create a API for create a Todo
app.post("/todo", (req, res) => {
    const { text, isCompleted, username } = req.body;

    let query = `INSERT INTO TODOS(text,isCompleted,username) values('${text}', ${isCompleted}, '${username}')`;

    db.query(query, (err, result) => {
        if (err) throw err;

        res.status(200).send("Todo Created Successfully");
    })
})

//Get a Todo by UserName
app.get("/todo/:username", (req, res) => {
    const { username } = req.body;

    let qurey = `select * from todos where username = "${username}"`;

    db.query(qurey, (err, result) => {
        if (err) throw err;

        res.status(200).send(result);
    })
})


//Get a Todo by Id
app.get("/todos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    let qurey = `select * from todos where id = "${id}"`;

    db.query(qurey, (err, result) => {
        if (err) throw err;

        console.log(result[0].username);
        res.status(200).send(result);
    })
})

//Now connect Database
db.connect((err) => {
    if (err) throw err;
    else {
        console.log("DB Connected!");
    }
})

app.listen(PORT, () => {
    console.log("Server is Runnin at PORT:", PORT);
})