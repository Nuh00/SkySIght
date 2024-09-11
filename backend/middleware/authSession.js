// const jwt = require('jsonwebtoken');


// const userAuth = async (req, res, next) => {

//     try {
//         // Get the token from the request header
//         const token = req.header('Authorization').replace('Bearer ', '');

//         // Verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded;

//         next();
//     } catch (error) {
//         res.status(401).send({ error: 'Please authenticate' });
//     }
// };


// module.exports = userAuth;


// Import the necessary modules
// Middleware to fetch the session

const authOptions = require('./authOptions'); 

// Middleware to fetch the session using getSession
async function authSession(req, res, next) {

  try {
            // Get the token from the request header
            const session = req.body.session;

            console.log(`we are finnaly here...`,session);

    
            next();
        } catch (error) {
            res.status(401).send({ error: 'Please authenticate' });
        }

}

module.exports = authSession;
