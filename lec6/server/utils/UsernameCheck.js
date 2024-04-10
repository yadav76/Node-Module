const User = require("../Model/UserSchema")

//This Method is for checking if Username is Already Present in Database or Not

const isUserExisting = async (username) => {
    let userData;

    try {
        userData = await User.findOne({ username });
    } catch (err) {
        console.log(err)
    }

    if (userData) {
        //If User Already Present in Database
        return true;
    } else {
        return false;
    }
}

module.exports = isUserExisting;