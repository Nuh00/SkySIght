const express = require('express');

const prisma = require('../prismaClient');

const userAuth = require('../middleware/authSession');


const router = express.Router();


// middle ware

router.use(userAuth);



router.get('/', async (req, res) => {

    const user = req.user; // User info from the decoded token

});


module.exports = router;