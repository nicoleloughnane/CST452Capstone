const jwt = require("jsonwebtoken");
const config = process.env;
const verifyUserToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send("You need a token to be authenticated.");
      }
      try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
}

module.exports = verifyUserToken;



/*const { expressjwt: expressJwt} = require('express-jwt');
//this file serves to protect the API from unauthenticated users
//or those without a token


function authJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path: [
            {url: /\/public\/journal(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,
        ]
    })
}

module.exports = authJwt; */