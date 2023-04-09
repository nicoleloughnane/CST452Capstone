//written with the assistance of Udemy course: MERN stack e-commerce mobile app with react native
//section 5: backend: users & authentication
const expressJwt = require("express-jwt");

//const config = process.env;
function authjwt() {
  const secret = process.env.TOKEN_KEY;
  const api = process.env.API_URL;
  

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1];
      }
      return null;
    },
  }).unless({
    path: [
      //do not require a valid JWT token as users need to be able to login and register
      `${api}/user/login`,
      `${api}/user/register`,
      `${api}/`,
      
    ],
  });
}

module.exports = authjwt;
