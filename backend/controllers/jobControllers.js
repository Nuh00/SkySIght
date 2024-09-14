const prisma = require('../prismaClient'); 





const getUserByEmail = async(email)=>{

    const user = await prisma.user.findUnique({
        where:{
            email:email
        }
    });

    return user;
}

const getUsersJobs = async (req, res) => {
    try {
        console.log('Starting getUsersJobs function');
        const session = req.session; 
        console.log(`session data:`, session);


        const user = await getUserByEmail(session.user.email);
        console.log(`user data:`, user);

        console.log(`Searching for jobs with userId:`, user.id);
        
        // Log all jobs in the database
        // const allJobs = await prisma.job.findMany();
        // console.log('All jobs in database:', allJobs);

        // // Log jobs with matching userId (as string)
        // const jobsWithStringId = allJobs.filter(job => job.userId === user.id);
        // console.log('Jobs with matching userId (as string):', jobsWithStringId);

        // // Log jobs with matching userId (as ObjectId)
        // const jobsWithObjectId = allJobs.filter(job => job.userId === new ObjectId(user.id).toString());
        // console.log('Jobs with matching userId (as ObjectId):', jobsWithObjectId);

        const jobs = await prisma.job.findMany({
            where: {
                userId: user.id
            }
        });

        console.log(`jobs data:`, jobs);


        res.status(200).send(jobs);
    } catch (error) {
        console.error('Error in getUsersJobs:', error);
        res.status(500).send({error: 'Internal server error', details: error.message});
    }
}

const createJob = async (req, res) => {
    try {
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
        console.error('Error in createJob:', error);
        res.status(500).send({error: 'Internal server error', details: error.message});
    }
}






module.exports = {
    getUsersJobs,
    createJob
};

