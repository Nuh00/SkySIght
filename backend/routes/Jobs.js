const express = require('express');
const authSession = require('../middleware/authSession');
const { getUsersJobs, createJob, deleteJob, updateJob } = require('../controllers/jobControllers'); 


const router = express.Router();


// middle ware

router.use(authSession);

router.post('/', getUsersJobs );


router.post('/create', createJob);

router.delete('/delete/:id', deleteJob);

router.patch('/update/:id', updateJob);

module.exports = router;