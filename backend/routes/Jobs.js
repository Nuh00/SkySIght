const express = require('express');
const authSession = require('../middleware/authSession');
const { getUsersJobs, createJob } = require('../controllers/jobControllers'); 


const router = express.Router();


// middle ware

router.use(authSession);

router.post('/', getUsersJobs );


router.post('/create', createJob);

module.exports = router;