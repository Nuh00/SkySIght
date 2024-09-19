

const authOptions = require('./authOptions'); 




// Middleware to fetch the session using getSession
async function authSession(req, res, next) {

  try {
            // Get the token from the request header
            const sessionData = req.body.session;
            const userData = req.body.values || {};
        

            console.log(`Session data received:`, sessionData);
            
            // if (!sessionData || !sessionData.user || !sessionData.user.email) {
            //   return res.status(401).send({ error: 'Invalid session data' });
            // }
            
            req.session = sessionData;
            req.user = userData;
            next();
        } catch (error) {
            console.error('Error in authSession:', error);
            res.status(401).send({ error: 'Please authenticate' });
        }

}

module.exports = authSession;
