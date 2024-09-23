const prisma = require('../prismaClient');
const { readLogger, createLogger, updateLogger, deleteLogger } = require('../utils/logger');

const getUserByEmail = async(email) => {
    // ?? Start timer for duration measurement
    const start = process.hrtime();

    // Fetch user by email
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    // Calculate duration and log
    const end = process.hrtime(start);
    const duration = (end[0] * 1e9 + end[1]) / 1e6;
    readLogger.info(`getUserByEmail - ${duration.toFixed(2)}ms`);
    return user;
}

const getUsersJobs = async (req, res) => {
    // ?? Start timer for duration measurement
    const start = process.hrtime();
    try {
        // !! Log the start of the function
        readLogger.info('Starting getUsersJobs function');
        const session = req.body.session;
        const user = await getUserByEmail(session.user.email);
        const jobs = await prisma.job.findMany({
            where: { userId: user.id }
        });
        res.status(200).json(jobs);
    } catch (error) {
        readLogger.error('Error in getUsersJobs:', { error: error.message });
        res.status(500).json({ error: 'Internal server error', details: error.message });
    } finally {
        const end = process.hrtime(start);
        const duration = (end[0] * 1e9 + end[1]) / 1e6;
        readLogger.info(`getUsersJobs - Total duration: ${duration.toFixed(2)}ms`);
    }
}

const createJob = async (req, res) => {
    try {
        // !! Log the start of the function
        createLogger.info('Starting createJob function');
        const session = req.session; 
        const user = await getUserByEmail(session.user.email);
        console.log(`user data:`, user);
        console.log(`user data:`, req.user);
        const { title, company, location, salary, status, appliedDate, link } = req.user;
        const job = await prisma.job.create({
            data: {
                title,
                company,
                location,
                salary,
                status,
                appliedDate,
                link,
                userId: user.id
            }
        });

        res.status(201).send(job);
    } catch (error) {
        createLogger.error('Error in createJob:', { error: error.message });
        res.status(500).send({error: 'Internal server error', details: error.message});
    }
}

const deleteJob = async (req, res) => {
    try {
        // !! Log the start of the function
        deleteLogger.info('Starting deleteJob function');
        const {id}  = req.params;
        const job = await prisma.job.delete({
            where: {
                id: id
            }
        });
        res.status(200).send('Job deleted successfully');
    } catch (error) {
        deleteLogger.error('Error in deleteJob:', { error: error.message });
        res.status(500).send({error: 'Internal server error', details: error.message});
    }
}

const updateJob = async (req, res) => {
    try {
        // !! Log the start of the function
        updateLogger.info('Starting updateJob function');
        const {id} = req.params;
        const {status} = req.body;
        const job = await prisma.job.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })
        res.status(200).json(job);
    } catch (error) {
        updateLogger.error('Error in updateJob:', { error: error.message });
        res.status(500).send({error: 'Internal server error', details: error.message});
    }
}

module.exports = {
    getUsersJobs,
    createJob,
    deleteJob,
    updateJob
};
