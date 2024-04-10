
const LoggerMiddleware = (req, res, next) => {
    // console.log(req);  //Prints all the "request" comming from Client

    console.log(`${JSON.stringify(req.rawHeaders)} | Body: ${JSON.stringify(req.body)} | URL: ${req.url} | Method: ${req.method}`);

    next();   //If do not write next() then It will do not let to send the response from API call It will Stuck in this Middleware Always. Now I will get Response in Postman from "/login" API
}

module.exports = { LoggerMiddleware }; 