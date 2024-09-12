const express = require('express');
const authSession = require('../middleware/authSession');
const getUsersJobs = require('../controllers/jobControllers'); 


const router = express.Router();


// middle ware

router.use(authSession);

router.post('/', getUsersJobs );


module.exports = router;