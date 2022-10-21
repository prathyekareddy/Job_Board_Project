const usersData = require('./users');
const companyData = require('./company');
const loginInfoData = require('./loginInfo');
const userResumeData = require('./userResume')
const workExperienceData = require('./workExperience')
const projectData = require('./projects')
const jobDetailsData = require('./jobDetails')

module.exports = {
  users: usersData,
  company: companyData,
  loginInfo: loginInfoData,
  userResume: userResumeData,
  workExperience: workExperienceData,
  projects: projectData,
  jobDetails: jobDetailsData
};