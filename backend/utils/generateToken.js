const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id} , "sahil1234" , {
        expiresIn:"30d",
    });
};

module.exports = generateToken;
