//written with the assistance of Udemy course: MERN stack e-commerce mobile app with react native
//section 5: backend: users & authentication
const expressJwt = require("express-jwt");
var log4js = require("log4js");
var logger = log4js.getLogger();
logger.level = "info" || "error";

//const config = process.env;
function authjwt() {
  const secret = process.env.TOKEN_KEY;
  const api = process.env.API_URL;

  logger.info("authjwt function has been called");
  logger.info("secret token key is: " + secret);
  logger.info("api url is  " + api);

  return expressJwt({
    secret,
    algorithms: ["HS256"],
    getToken: function (req) {
      if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        logger.info("token has been found, " + req.headers.authorization.split(" ")[1]);
        return req.headers.authorization.split(" ")[1];
      }
      logger.info("no token found, returning null");
      return null;
    },
  }).unless({
    path: [
      //do not require a valid JWT token as users need to be able to login and register
      `${api}/user/login`,
      `${api}/user/register`,
      `${api}/`,
      `/`,
      
    ],
  });
}

module.exports = authjwt;
