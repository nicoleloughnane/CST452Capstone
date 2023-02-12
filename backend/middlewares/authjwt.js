//written with the assistance of Udemy course: MERN stack e-commerce mobile app with react native 
//section 5: backend: users & authentication 
const expressJwt = require('express-jwt');

//const config = process.env;
function authjwt()  {
    const secret = process.env.TOKEN_KEY;
    const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
        path:[
            {url: /\/api\/v1\/journalentry(.*)/ , methods: ['GET', 'POST', 'PUT', 'DELETE'] },
            `${api}/user/login`,
            `${api}/user/register`,
        ]
    })
}

module.exports = authjwt;