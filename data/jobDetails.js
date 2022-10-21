const mongoCollections = require('../config/mongoCollections');
const jobDetails = mongoCollections.jobDetails;
const user = mongoCollections.users;
const users = require('./users');
const objectId = require('mongodb').ObjectID;
const company = mongoCollections.company;
const companyFunc = require('./company')

function checkUndef(variable, variableName)
{
    if (variable === null || variable === undefined)
    { 
        throw `${variableName || 'Provided Variable'} is not defined!`
    }
}

let exportedMethods = {

    async addJob (jobTitle, jobLocation, jobDescription, yearsOfExperience, skills, jobCategory, salaryMin, salaryMax, qualifications, jobStatus) {


        const jobCollection = await jobDetails();
    
        const newJob = {
          jobTitle: jobTitle,
          jobLocation: jobLocation,
          jobDescription:jobDescription,
          yearsOfExperience:yearsOfExperience,
          skills: skills,
          jobCategory: jobCategory,
          salaryMin: salaryMin,
          salaryMax: salaryMax,
          qualifications: qualifications,
          jobStatus:jobStatus,
          appliedUsers: []
        };
    
        const newInsertInformation = await jobCollection.insertOne(newJob);
        console.log("Added newJob")
        return newJob
    },

    async getAllJobs()
    {
      const jobCollection = await jobDetails();
      const jobList = await jobCollection.find({}).toArray();
      if (!jobList) throw `No jobs found!`;
      return jobList;
    },

    async getJobById (id)
    {
      checkUndef(id, "id");

      const jobCollection = await jobDetails();
      const job = await jobCollection.findOne({ _id: objectId(id) });
      if (!job) throw `Job with the given ID: ${id} not found!`;
      return job;
    },

    async removeJob(jobId, companyId)
    {
      checkUndef(jobId, "jobId");
      checkUndef(companyId, 'companyId');

      const jobCollection = await jobDetails();
      let job = null;
      
      try
      {
        job = await this.getJobById(jobId);
      }
      catch (e)
      {
        console.log(e);
      }
      
      const deletionInfo = await jobCollection.removeOne( { _id: objectId(jobId) } );
      if (deletionInfo.deletedCount == 0)
        throw `Could not delete job with id of ${jobId}`;
      
      const companyCollection = await company();

      const jobRemove = await companyCollection.updateOne
      (
        {
          _id: objectId(companyId),
          "jobDetails._id": objectId(jobId)
        },
        {
          $pull: { jobDetails: { _id: objectId(jobId) } }
        }, false, true
      );

      return true;
    },
    async getCompanyByJobDetailsId(jobDetailsId){
      checkUndef(jobDetailsId, "jobDetailsId");

      const companyCollection = await company();
      const companyInstance = await companyCollection.find({"jobDetails._id":  objectId(jobDetailsId)}).toArray();
      if(!companyInstance) throw "No company found with given Job Listing";

      return companyInstance;

    },

    async addUserToAppliedUsers(jobId, userId){
      checkUndef(jobId, "jobId");
      checkUndef(userId, "userId");
      
      const jobCollection = await jobDetails();
      const userCollection = await user();
      try {
        jobCollection.updateOne(
          {
            _id: objectId(jobId)
          },
          {
            $addToSet: {appliedUsers: [objectId(userId)]}
          }
        );

        userCollection.updateOne(
          {
            _id: objectId(userId)
          },
          {
            $addToSet: {appliedJobs: [objectId(jobId)]}
          }
        );
      } catch{
        return false;
      }

      return true;
    },

    async searchJobByYearCategorySalarySkills(years, category, minSalary, skillsArray)
    {
      checkUndef(years, "years");
      checkUndef(skillsArray,"skillsArray");
      checkUndef(category, "category");
      checkUndef(minSalary, "minSalary");
      let catQuery ={};
      let minSalQuery = {};
      let skillsQuery = {};

      if(isNaN(years)) throw "Invalid year: Not a number!";

      if(category != "noCategory"){ 
        catQuery = {jobCategory: category};
      }

      if(minSalary != -1){
        if (isNaN(minSalary)) throw "Invalid salary: Not a number!";
        console.log(minSalary)
        if(minSalary > 0) minSalQuery = {salaryMin: {$gte: parseInt(minSalary)}};
      }
      
      if(skillsArray != "noSkills"){
        if(!Array.isArray(skillsArray)) throw "Invalid skills: Not an Array!";

        if(skillsArray.length > 0) skillsQuery = { skills: { $in: skillsArray}};
      }

      const jobCollection = await jobDetails();
      console.log(minSalQuery);
      const jobsList = await jobCollection.find({$and: [{jobStatus: true},{ yearsOfExperience: { $lte: parseInt(years)} }, catQuery, minSalQuery, skillsQuery]}).toArray();
      
      //console.log(jobsList)
      return jobsList
    },

    async updateJob(id, updatedJob,companyId)
    {
      checkUndef(id, "id");
      checkUndef(updatedJob, "updatedJob");
      checkUndef(companyId, "companyId")

      const job = await this.getJobById(id);

      let jobUpdateInfo = 
      {
        jobTitle: updatedJob.jobTitle,
        jobLocation: updatedJob.jobLocation,
        jobDescription: updatedJob.jobDescription,
        yearsOfExperience: updatedJob.yearsOfExperience,
        skills:updatedJob.skills,
        jobCategory: updatedJob.jobCategory,
        salaryMin: updatedJob.salaryMin,
        salaryMax: updatedJob.salaryMax,
        qualifications: updatedJob.qualifications,
        jobStatus: updatedJob.jobStatus
      }

      const jobCollection = await jobDetails();
      const updateInfo = await jobCollection.updateOne({ _id: objectId(id) }, { $set: jobUpdateInfo });

      if(!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Update Field!`;
      const companyCollection = await company()
      // Update job in company doc

      const updateJob = await companyCollection.updateOne({
        _id : objectId(companyId),
        "jobDetails._id" : objectId(id)
      },{
        $set: {
          "jobDetails.$.jobTitle" : updatedJob.jobTitle,
          "jobDetails.$.jobLocation": updatedJob.jobLocation,
          "jobDetails.$.jobDescription": updatedJob.jobDescription,
          "jobDetails.$.yearsOfExperience": updatedJob.yearsOfExperience,
          "jobDetails.$.skills": updatedJob.skills,
          "jobDetails.$.jobCategory": updatedJob.jobCategory,
          "jobDetails.$.salaryMin": updatedJob.salaryMin,
          "jobDetails.$.salaryMax": updatedJob.salaryMax,
          "jobDetails.$.qualifications": updatedJob.qualifications,
          "jobDetails.$.jobStatus": updatedJob.jobStatus
        }
      }, false, true);

      return await this.getJobById(id);
    }
}

module.exports = exportedMethods