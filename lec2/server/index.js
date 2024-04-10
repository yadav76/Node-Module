const express = require("express");
const cors = require('cors');
const app = express();             //making Object of "epress" class to use all its properties

app.use(express.json());
app.use(cors());

const PORT = 8001;

//**************** Using "Query" to Get Data from Backend From Here In Below code ******************* */

app.get("/substraction", (req, res) => {

    console.log(typeof req.query.num1);

    //No need to change to Number becuase getting num1 and num2 in form of Number because using Query
    let num1 = req.query.num1;
    let num2 = req.query.num2;

    let diff = num1 - num2;

    res.send(`Your Diff is: ${diff}`);
})


//**************** Using "Params" to Get Data from Frontend From Here In Below code ***************** */

app.get("/addition/:num1/:num2", (req, res) => {

    //Now in Params we get Data in form of String so I have to convert It into a Number before addition
    let num1 = Number(req.params.num1);
    let num2 = Number(req.params.num2);

    let sum = num1 + num2;

    res.send(`Your Sum is : ${sum}`);
})



//***************** Using "body" to get Data to Frontend from Here In Below code ****************** */

//making API for testing

app.get("/testing", (req, res) => {
    res.send("This is Testing API");
})

// Addition 
app.post("/add", (req, res) => {
    console.log(req.body);         //at first print undefined because I am not using app.json() parse data from http form to json form  i.e.   app.use(express.json())

    const { num1, num2 } = req.body;    //getting data from Client (PostMan)
    console.log(num1, num2);

    //another way of getting Data in form of num1 & num2
    // const num1 = req.body.num1;
    //const num2 = req.body.num2;

    let sum = num1 + num2;

    res.send(`Your Sum is ${sum}`);    //Sending Data to Client (PostMan)
})

//Substract
app.post("/sub", (req, res) => {
    console.log(req.body);         //at first print undefined because I am not using app.json() parse data from http form to json form  i.e.   app.use(express.json())

    let { num1, num2 } = req.body;   //getting data from Client (PostMan)

    //another way of getting Data in form of num1 & num2
    // const num1 = req.body.num1;
    //const num2 = req.body.num2;

    let diff = num1 - num2;

    res.status(200).send(`Your Difference is : ${diff}`);  //Sending Data to Client (PostMan)
})

//Multiply
app.post("/multiply", (req, res) => {

    const { num1, num2 } = req.body;

    if (num2 === 0) {
        return res.status(400).send("Err: Enter Number Greater than Zero");
    }

    res.send(`Your Product is ${num1 * num2}`);
})

//Divide
app.post("/divide", (req, res) => {

    const { num1, num2 } = req.body;

    if (num2 === 0) {
        return res.status(400).send("Err: Enter Number Greater than Zero");
    }

    res.send(`Your Queutient is ${num1 / num2}`);
})

app.listen(PORT, () => {
    console.log("App is Running at Port: ", PORT);
})