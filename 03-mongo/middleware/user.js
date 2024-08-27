const {User} = require("../db")
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.body .username;
    const password = req.body.password;
     User.findOne({
        username,
        password
     }).then(function(value){
        if(value){
            next()
        }
        else{
            res.status(404).send({
                mesg: "User dose not exist"
            })
        }
     })

}

module.exports = userMiddleware;