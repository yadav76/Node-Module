const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {

    //console.log(req.rawHeaders)

    //console.log(req.headers)

    try {
        const token = req.headers["x-acciojob"];   //getting token from Header that I have sent in response from login api that client has sent in his local Browser

        console.log(token)

        //Now verify the "token" and "jwt" Secret Key
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);


        if (verified) {

            next();
        } else {
            res.status(401).send({
                status: 401,
                message: "User Not Authenticated! Please Login"
            })
        }

        //If Do not rape above code in Try{}catch{} block then It directly throws Error "JWT Token must be passed" when I will not pass the JWT Token
    } catch (err) {

        res.status(501).send({
            status: 501,
            message: "Internal Server Error",
            data: err
        })
    }



    // if (req.headers["x-acciojob"]) {   //"x-acciojob" every letter should be small because all Headers are written in lower Alphabet No matter it is passed in Capital Letter from PostMan

    //     next();
    // } else {
    //     res.send("Response from AuthMiddlreWare, No token Passed")
    // }
}

module.exports = { AuthMiddleware };