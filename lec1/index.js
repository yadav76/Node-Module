let http = require("http");   //to Import "http" package from NodeJs. It is ES5 Notation 

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    response.end("Hello World!") //the content you want to give as Response
}).listen(8001);   //the Port No where we get Response


console.log("Server is Running at Port 8001");  //to print this console in Terminal while Running this file in VSCode terminal.

//"Hello World!" as Response we get in Browser while Running on Port localhost:8001