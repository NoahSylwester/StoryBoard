const jwt = require('jsonwebtoken');
const path = require("path");
const db = require('./models')

const checkAdmin = function(req, res, next) {
  
    db.User.findById(req._id)
    .then((user) => {
        if (user.authority !== "Owner") {
            res.status(401).send('Unauthorized: Invalid token');
        }
        else if (user.authority === "Owner") {
            next();
        }
        else {
            res.status(401).send('Unauthorized: Token error');
        }
    })

}

module.exports = checkAdmin;