const { expressjwt: expressJwt} = require('express-jwt');
//this file serves to protect the API from unauthenticated users
//or those without a token

function authJwt() {
    const secret = process.env.secret;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    })
}

module.exports = authJwt;