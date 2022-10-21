const { jobDetails, users } = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const loginInfo = data.loginInfo;
const userResume = data.userResume;
const usersData = data.users;
const workExperience = data.workExperience;
const Resume = data.userResume;
const project = data.projects;
const companyFunc = data.company;
const job = data.jobDetails;


async function main() 
{
  try{
  const db = await dbConnection();
  await db.dropDatabase();

  try {
    //Add company
    const newCompany = await companyFunc.addCompany('Essential Tech', 'Mumbai','IT','hrMail@mail.com', 'mumbaiUser', '$2b$16$XoxM9a/lLskO6Fx5wSpvauSwvGip7XexMvliIQiDSHHtElYEP3n3O');
    const newCompany1 = await companyFunc.addCompany('Marlboro', 'Dubai','Distribution','drane@stevens.com', 'smokerMan', '$2b$16$XoxM9a/lLskO6Fx5wSpvauSwvGip7XexMvliIQiDSHHtElYEP3n3O');
    const extraCompany = await companyFunc.addCompany('Analysis Solutions', 'New York','Software','hrMail@mail.com', 'test1234', '$2b$16$XoxM9a/lLskO6Fx5wSpvauSwvGip7XexMvliIQiDSHHtElYEP3n3O');
    //Add job
    const newJob = await job.addJob('Front End Dev', 'Mumbai','working on the ui',4,['Mongob', 'Nodejs'],'IT','100000','120000','Text on Qualifications',true)

    const newJob1 = await job.addJob('Back End Dev', 'Banglore','Working on the Data Functions',2,["Java",'Mongob', 'Nodejs'],'IT','80000','90000','Text on Qualifications',true)
    const extraJob = await job.addJob("Front End Dev", "New York", 'Developing Innovative Platform Solutions',3,['Mongob', 'Nodejs'], "Software Developer", '80000', '100000', "Must be experience and willing to learn", true );

    const newJob2 = await job.addJob('Front End Dev', 'Mumbai','working on the ui',3,['Mongob', 'Nodejs'],'IT','100000','120000','Text on Qualifications',true)
    const newJob3 = await job.addJob('Back End Dev', 'Banglore','Working on the Data Functions',1,["Java",'Mongob', 'Nodejs'],'IT','80000','90000','Text on Qualifications',true)

    //Add job to company
    const addJobToCompany = await companyFunc.addJobToCompany(newCompany._id, newJob);
    const addJobToCompany1 = await companyFunc.addJobToCompany(newCompany._id, newJob1);
    const addJobToExtra = await companyFunc.addJobToCompany(extraCompany._id, extraJob);
    const addJobToCompany2 = await companyFunc.addJobToCompany(newCompany1._id, newJob2);
    const addJobToCompany3 = await companyFunc.addJobToCompany(newCompany1._id, newJob3);
    // tempJob = {
    //   "jobTitle": "Back End Dev ",
    //   "jobLocation": "Banglore",
    //   "jobDescription": "working on the DF",
    //   "yearsOfExperience": 2,
    //   "skills": ['Mongob', 'Nodejs'],
    //   "jobCategory": "IT",
    //   "salaryMin": "35$",
    //   "salaryMax": "65$",
    //   "qualifications": "Text on Qualifications",
    //   "jobStatus": true
    // }
    // //Update Job
    try{
      const removeCompany = await companyFunc.removeCompany(newCompany1._id);
      console.log(removeCompany);
    }catch(e){
      console.log (e);
    }
  }catch(e){
    console.log (e);
  }
  // try {
  //   await job.addJob('Front End Dev', 'Mumbai','working on the ui','IT','35$','65$','Text on Qualifications')
  // }catch(e){
  //   console.log (e);
  // }

  // try {
  //   await project.addProject('Customer Analytics', 'description on the project','04/03/2020','04/03/2020')
  // }catch(e){
  //   console.log (e);
  // }

  // try {
  //   // const account = await loginInfo.addAccount('SHUBHAMWARGHADE','qwertyuiop')
  //   // console.log(loginInfo)
  //   // const id = account._id;
  //   // ( profilePictureUrl, email,address, firstName, lastName, phoneNumber, aboutMe, gender, dob, resumeUrl)
  //   await usersData.addUser('asada.jpeg','shubham@shubham.shubham',' 123 address, deep, NYC', 'Shubham', 'Warghade', '123456789', 'I am batman!','M','05/07/1997','https:/')
  // }catch(e){
  //   console.log (e);
  // }

  try {
    //Add user
    const newUser = await usersData.addUser('asada.jpeg','shubham@shubham.shubham',' 123 Webster Ave, JC, deep, NYC', 'Shubham', 'Warghade', '8446984461', 'Pursuing Masters in SIT, love dancing and pphotography','M','05/07/1997','https:/','shubham', "https://github.com/swarghade", '$2b$16$XoxM9a/lLskO6Fx5wSpvauSwvGip7XexMvliIQiDSHHtElYEP3n3O')//password - '123_Shubham' hashedpassword -'$2b$16$XoxM9a/lLskO6Fx5wSpvauSwvGip7XexMvliIQiDSHHtElYEP3n3O'
    const newUser1 = await usersData.addUser("whatever.jpeg", "deep@deep.com", "248 New York Avenue, JC", "Deep", "Rane", "8329195910", "Sucker for well-written code, love gaming and urban exploration", "M", "06/01/1997", "localhost:3000", "dsr", "https://github.com/deeprane1", "$2y$16$SSbHbNvUvVZktRcd5ar3fe2/2nFshRW/0gONroR1Lh75sATXr8rwq"); // password: Derp_123
    const newUser2 = await usersData.addUser("no.jpeg", "ashvath@ashvath.com", "301 Sherman Avenue, JC", "Ashvath", "Chitra Rameshkumar", "9578321459", "Bachelors in Computer Engineering, Sucks at poker faces but good at poker", "M", "06/13/1997", "localhost:3000", "ashvathr", "https://github.com/AshvathR", "$2y$16$X0kho.guzd2yo5XOLju1aum3ctskLx8l/PhLfhQDcW/46SmtD1aGy"); //password: 123_Ashvath
    const newUser3 = await usersData.addUser("hjv.jpeg", "pradeep@pradeep.com", "95 Franklin Street, JC", "Pradeep", "Kumar", "8794561235", "jQuery and AJAX savant, Love filtered coffee", "M", "10/25/1996", "localhost:3000", "kdeep", "https://github.com/Pradeep6149", "$2y$16$DJstQ7i.dxgwj8YLAfU6x.kS9DJrBxa4sspf4GiqHQFr8XLt36Cty"); //password: Pradeep_123
    const newUser4 = await usersData.addUser("yes.jpeg", "brendan@brendan.com", "318 Hutton Street, JC", "Brendan", "O'Connell", "8979739563", "Great Presentor with excellent control over web development", "M", "09/19/1995", "localhost:3000", "bconnell", "https://github.com/boconnell13", "$2y$16$0OJPUF7ZO9TzTUXgUw6CgeMuz21e8HY9PCG0zLPmj57RCn8AhKA8i"); //password: Brendan_123
    const newUser5 = await usersData.addUser("lol.jpeg", "pete@pete.com", "313 Palisade Avenue, JC", "Petra", "Park", "9915456523", "Yes, my name is similar to Petra Parker, and no I'm not spiderman but I am your woman for full stack development", "F", "11/13/1997", "localhost:3000", "ppark", "google.com", "$2y$16$W.YTO9q5I20X.T2AAEG1a.YLkPJEOOiXZ/1Kl6laEwttN5n4LUiQC"); // password: PetraPark1
    const newUser6 = await usersData.addUser("okay.jpeg", "erwin@erwin.com", "194 Griffith Street, JC", "Erwin", "Smith", "8634790058", "AWS, MERN, Redis, Agile, CI/CD, C++, PosgreSql", "M", "06/07/1997", "localhost:3000", "smither", "facebook.com", "$2y$16$3cLZxqafvzOkTr9oaQ0pOee/kR2RWI4GwuG6aVsgy2vTQyhMCbnWC"); // password: 123_Smerwin
    const newUser7 = await usersData.addUser("koay.jpeg", "advait@advait.com", "3283 JFK Blvd, JC", "Advait", "Gharat", "9996653652", "Masters in Cinematography with bachelors in computer engineering", "M", "04/11/1997", "localhost:3000", "advaitgharat", "youtube.com", "$2y$16$lgBacRoxRkNdEb76NBxFGOuJ7X7SzYAJLyKDv4le5vArD2DtFHmPa"); // password: Youknow_1
    const newUser8 = await usersData.addUser("kdjfgd.jpeg", "test@test.com", "1 Broadway, NYC", "Test", "Tester", "9988776655", "Tester testing and breaking things", "F", "04/11/1997", "localhost:3000", "testester", "twitter.com", "$2y$16$XWYlevDVFWzuFSoWBofZK.sjUuRMwFzZCQpFqbA9tqQ37yapJLwUm"); //password: TestTester_1
    const newUser9 = await usersData.addUser("okilp.jpeg", "log@log.com", "1211 6th Ave, NYC", "Log", "Logger", "9865327412", "Logging into things and logger stuff", "F", "05/05/1996", "localhost:3000", "loglogger", "walmart.com", "$2y$16$xSk4j1mB3nxYMg/WtKlVWOVZ8eO1lTzkeu5V/wDwL752IGw9PkKYy"); //password: logLogger_1
    //Add Resume                                                                                                                
    const resume =  await Resume.addResume([{schoolName:'Stevens Institute of Technology',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','Analytics','mongodb'],'First ever resume','resume_Shubham_Warghade','Unemployed',2,true);
    const resume1 =  await Resume.addResume([{schoolName:'University of Mumbai',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','tableau','expressjs','reactjs'],'hey this is my resume','resume_Deep_Rane','Unemployed',5,true);
    const resume2 =  await Resume.addResume([{schoolName:'BV Polytechnic',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','Analytics','mongodb'],'My resume','resume_Ashvath_Chitra','Unemployed',2,true);
    const resume3 =  await Resume.addResume([{schoolName:'NEHS',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','tableau','expressjs','reactjs'],'Front End Resume','resume_Pradeep_Kumar','Unemployed',5,true);
    const resume4 =  await Resume.addResume([{schoolName:'AV College of Engineering',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','Analytics','mongodb'],'Resume Full Stack','resume_Brendan_OConnell','Unemployed',2,true);
    const resume5 =  await Resume.addResume([{schoolName:'KJ Somaiya',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','tableau','expressjs','reactjs'],'resume','resume_Petra_Park','Unemployed',5,true);
    const resume6 =  await Resume.addResume([{schoolName:'VJTI',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','Analytics','mongodb'],'first resume','resume_Erwin_SMith','Unemployed',2,true);
    const resume7 =  await Resume.addResume([{schoolName:'IIT',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','tableau','expressjs','reactjs'],'resume','resume_Advait_Gharat','Unemployed',5,true);
    const resume8 =  await Resume.addResume([{schoolName:'Cornell',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','Analytics','mongodb'],'test resume','resume_test','Unemployed',2,true);
    const resume9 =  await Resume.addResume([{schoolName:'NYU Tandon',startDate:'31/08/2020',endDate:'25/05/2022',gpa:4},{schoolName:'Mumbai University',startDate:'june 2016',endDate:'july 2019',gpa:'4'}],['web dev','tableau','expressjs','reactjs'],'logger resume','resume_logger','Unemployed',5,true);
    
    //Add Project
    const newProject =  await project.addProject('Customer Analytics', 'description on the project','04/03/2020','04/03/2020');
    const newProject1 = await project.addProject('Data Analytics', 'working on historical data','01/01/2019','07/30/2020');

    const newProject2 =  await project.addProject('Customer Analytics', 'description on the project','04/03/2020','04/03/2020');
    const newProject3 = await project.addProject('Data Analytics', 'working on historical data','01/01/2019','07/30/2020');

    const newProject4 =  await project.addProject('Customer Analytics', 'description on the project','04/03/2020','04/03/2020');
    const newProject5 = await project.addProject('Data Analytics', 'working on historical data','01/01/2019','07/30/2020');

    const newProject6 =  await project.addProject('Customer Analytics', 'description on the project','04/03/2020','04/03/2020');
    const newProject7 = await project.addProject('Data Analytics', 'working on historical data','01/01/2019','07/30/2020');
    // add project to resume
    const addProjectToUserResume = await userResume.addProjectToUserResume(resume._id,newProject);
    const addProjectToUserResume1 = await userResume.addProjectToUserResume(resume1._id, newProject1);

    const addProjectToUserResume2 = await userResume.addProjectToUserResume(resume2._id,newProject2);
    const addProjectToUserResume3 = await userResume.addProjectToUserResume(resume3._id, newProject3);

    const addProjectToUserResum4 = await userResume.addProjectToUserResume(resume4._id,newProject4);
    const addProjectToUserResume5 = await userResume.addProjectToUserResume(resume5._id, newProject5);

    const addProjectToUserResume6 = await userResume.addProjectToUserResume(resume6._id,newProject6);
    const addProjectToUserResume7 = await userResume.addProjectToUserResume(resume7._id, newProject7);
    //Add Resume to user
    const addResumeToUser = await usersData.addResumeToUser(newUser._id,resume);
    const addResumeToUser1 = await usersData.addResumeToUser(newUser1._id,resume1);
    const addResumeToUser2 = await usersData.addResumeToUser(newUser2._id,resume2);
    const addResumeToUser3 = await usersData.addResumeToUser(newUser3._id,resume3);
    const addResumeToUser4 = await usersData.addResumeToUser(newUser4._id,resume4);
    const addResumeToUser5 = await usersData.addResumeToUser(newUser5._id,resume5);
    const addResumeToUser6 = await usersData.addResumeToUser(newUser6._id,resume6);
    const addResumeToUser7 = await usersData.addResumeToUser(newUser7._id,resume7);
    const addResumeToUser8 = await usersData.addResumeToUser(newUser8._id,resume8);
    const addResumeToUser9 = await usersData.addResumeToUser(newUser9._id,resume9);
    // Add workExperience to user
    const newWorkExperience = await workExperience.addWorkDesc('TechName','web dev','jobDes','04/03/2020','19/11/2020');
    const newWorkExperience1 = await workExperience.addWorkDesc('ADP','Front End Developer','Implemented and tested solutions with Mocha/Chai and Cypress in a CI/CD Agile environment','06/01/2020','08/07/2020');

    const newWorkExperience2 = await workExperience.addWorkDesc('TechName','web dev','jobDes','04/03/2020','19/11/2020');
    const newWorkExperience3 = await workExperience.addWorkDesc('ADP','Front End Developer','Implemented and tested solutions with Mocha/Chai and Cypress in a CI/CD Agile environment','06/01/2020','08/07/2020');

    const newWorkExperience4 = await workExperience.addWorkDesc('TechName','web dev','jobDes','04/03/2020','19/11/2020');
    const newWorkExperience5 = await workExperience.addWorkDesc('ADP','Front End Developer','Implemented and tested solutions with Mocha/Chai and Cypress in a CI/CD Agile environment','06/01/2020','08/07/2020');

    const newWorkExperience6 = await workExperience.addWorkDesc('TechName','web dev','jobDes','04/03/2020','19/11/2020');
    const newWorkExperience7 = await workExperience.addWorkDesc('ADP','Front End Developer','Implemented and tested solutions with Mocha/Chai and Cypress in a CI/CD Agile environment','06/01/2020','08/07/2020');
    
    const addWorkDesToUser = await usersData.addWorkDesToUser(newUser._id, newWorkExperience);
    const addWorkDesToUser1 = await usersData.addWorkDesToUser( newUser1._id, newWorkExperience1);

    const addWorkDesToUser2 = await usersData.addWorkDesToUser(newUser2._id, newWorkExperience2);
    const addWorkDesToUser3 = await usersData.addWorkDesToUser( newUser3._id, newWorkExperience3);

    const addWorkDesToUser4 = await usersData.addWorkDesToUser(newUser4._id, newWorkExperience4);
    const addWorkDesToUser5 = await usersData.addWorkDesToUser( newUser5._id, newWorkExperience5);

    const addWorkDesToUser6 = await usersData.addWorkDesToUser(newUser6._id, newWorkExperience6);
    const addWorkDesToUser7 = await usersData.addWorkDesToUser( newUser7._id, newWorkExperience7);

    // updating work description

    // try {
    //   const removeResume = await userResume.removeResume(resume._id, newUser._id);
    //   console.log(removeResume);
    // } catch (e) {
    //   console.log(e)
    // }
    
    tempProject =
    {
      "projectTitle": "Essential Tech",
      "description": "Made an appointment SaaS",
      "startDate": "05/01/2020",
      "endDate": "07/31/2020"
    }

    //updating projects

    // try {
    //   const updateProject = await project.updateProject(newProject._id, resume._id, newUser._id, tempProject);
    // } catch (e) {
    //   console.log(e)
    // }
  }catch(e){
    console.log (e);
  }


  // try{
  //   const searchResumeByYearSkills = await userResume.searchResumeByYearSkills(2,['web dev'])
  //   // console.log(searchResumeByYearSkills)
  // } catch (e) {
  //   console.log(e)
  // }
  // try{
  //   const searchJobByYearSkills = await job.searchJobByYearSkills(2,['web dev'])
  //   // console.log(searchJobByYearSkills)
  // } catch (e) {
  //   console.log(e)
  // }
  // try{
  //   const usersList = await usersData.findUserByResumeId('6098b6718364680b743e7026')
  //   console.log(usersList)
  // } catch (e) {
  //   console.log(e)
  // }


  
  console.log('Done seeding database');

  await db.serverConfig.close();
  } catch(e){
    console.log(e);
  }

}

main();