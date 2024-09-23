const express = require('express');
const authSession = require('../middleware/authSession');
const { getUsersJobs, createJob, deleteJob, updateJob } = require('../controllers/jobControllers'); 
const rateLimit = require('express-rate-limit');

const router = express.Router();


// middle ware

router.use(authSession);

const initialLoadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 16, // More lenient limit for initial page loads (1 per minute on average)
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too Many Requests',
            message: 'You have exceeded the rate limit. Please try again later.'
        });
    },
    
  });

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
            error: 'Too Many Requests',
            message: 'You have exceeded the rate limit. Please try again later.'
        });
    },
}); 
  
router.use(initialLoadLimiter);
router.use(limiter);

router.post('/', getUsersJobs );


router.post('/create', createJob);

router.delete('/delete/:id', deleteJob);

router.patch('/update/:id', updateJob);

module.exports = router;