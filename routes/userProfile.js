const express = require('express');
const router = express.Router();
const data = require('../data');
const user = data.users
const resume = data.userResume
const workExperience = data.workExperience;
const projectFunc = data.projects;
const xss = require('xss');
const {projectFields, resumeFields, companyFields,workFields, userFields} = require('./constants');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const saltRounds = 16;


let profilePictureUrl;
let resumeUrl;
const storage = multer.diskStorage({
    //destination for files
    
    destination: function (request, file, callback) {
      console.log(file)
      if(file.fieldname == 'profilePicture')
        callback(null, './public/uploads/employeeFiles/profilePictures');
      else
        callback(null, './public/uploads/employeeFiles/resume');
    },
  
    //add back the extension
    filename: function (request, file, callback) { 
      if(file.fieldname == 'profilePicture'){
        profilePictureUrl =  request.session.username + "_profilePicture.jpeg" 
        callback(null, profilePictureUrl);
      }
      else{
        resumeUrl = request.session.username + "_resume.pdf" 
        callback(null, resumeUrl);
      }
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });



router.get("/:type/form", async (req, res) => {
  res.render("employee/employeeInfo", {
    title: "STEMConnect",
    auth: false,
    listingType: "Resume",
    notLoginPage: true,
  });
});

let multipleUpload = upload.fields([{ name: 'profilePicture' }, {name:'uploadResume'}]) 

router.post("/createNewUser", multipleUpload, async (req, res) => {

  console.log(req.body)
  const workDes = req.body.workDes
  const school = req.body.School
  const project = req.body.project

  personalInfo = req.body;

  const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  // Add User
  const newUser = await user.addUser(`/public/uploads/employeeFiles/profilePictures/${profilePictureUrl}`,
            xss(personalInfo.email),
            xss(personalInfo.address), 
            xss(personalInfo.firstName), 
            xss(personalInfo.lastName), 
            xss(personalInfo.phoneNumber), 
            xss(personalInfo.aboutMe),
            xss(personalInfo.gender),
            xss(personalInfo.dob),
            `/public/uploads/employeeFiles/resume/${resumeUrl}`,
            xss(personalInfo.username),
            xss(personalInfo.websiteUrl),
            xss(hashedPassword))
          

  req.session._id = newUser._id
// Add Education
let education= []
if(req.body.School) {
  if(school != null && Array.isArray(school.schoolName))
  {
      for(i = 0; i < (school.schoolName).length; i++)
      {
          tempSchool = 
          {
            schoolName: xss(school.schoolName[i]),
            startDate: xss(school.startDate[i]),
            endDate: xss(school.endDate[i]),
            gpa: xss(school.gpa[i])
          }
        education.push(tempSchool)
      }
    }
    else
    {
      tempSchool = 
        {
          schoolName: xss(school.schoolName),
          startDate: xss(school.startDate),
          endDate: xss(school.endDate),
          gpa: xss(school.gpa)
        }
      education.push(tempSchool)
    }
  }
  const skills = (req.body.resume.skills)

//Add Resume
  const newResume = await resume.addResume(education,skills,'',`CS_546_group23_final_project/public/uploads/employeeImages/resume/${resumeUrl}`,req.body.resume.workStatus,req.body.resume.year,true)

// Add project
if(req.body.project) {
  if(project != null && Array.isArray(project.projectTitle)){
    for(i = 0; i < (project.projectTitle).length; i++){
      try{
        const newProject = await projectFunc.addProject(project.projectTitle[i],project.projectDesc[i],project.startDate[i],project.endDate[i]);
        const addProjectToUserResume = await resume.addProjectToUserResume(newResume._id,newProject)
    }catch(e)
    {
        console.log(e)
    }
    }
    }
    else{
      try{
        const newProject = await projectFunc.addProject(project.projectTitle,project.projectDesc,project.startDate,project.endDate);
        const addProjectToUserResume = await resume.addProjectToUserResume(newResume._id,newProject)
    }catch(e)
    {
        console.log(e)
    }
    }
}

//Add Resume to user
try{
  const addResumeToUser = await user.addResumeToUser(newUser._id,newResume)
} catch(e){
  console.log(e)
}
  

  // Add Work Description
  if(req.body.workDes) {
    if(workDes != null && Array.isArray(workDes.companyName)){
      for(i = 0; i < (workDes.companyName).length; i++){
        try{
          const newWorkExperience = await workExperience.addWorkDesc(workDes.companyName[i],workDes.jobTitle[i],workDes.WorkDescription[i],workDes.workStartDate[i],workDes.workEndDate[i]);
          const addWorkDesToUser = await user.addWorkDesToUser(newUser._id, newWorkExperience);
        }catch(e)
        {
          console.log(e)
        }
      }
      }
      else{
        try{
          const newWorkExperience = await workExperience.addWorkDesc(workDes.companyName,workDes.jobTitle,workDes.WorkDescription,workDes.workStartDate,workDes.workEndDate);
          const addWorkDesToUser = await user.addWorkDesToUser(newUser._id, newWorkExperience);
        }catch(e)
        {
          console.log(e)
        }

      }
  }
  
  res.redirect('/profile');
});



router.get('/:id', async (req, res) => {
    let user = await data.users.getUserById(req.params.id);
    res.json(user);
});

router.get('/', async(req,res)=> {
    res.render('employee/employeeInfo', { title: "Employee Details" ,  auth: true, notLoginPage: true});
});

router.get('/resume/:id', async (req, res) => {
  let user = await data.userResume.getResumeById(req.params.id);
  res.json(user);
});

router.post('/updatePicture', upload.single('profilePicture'), async(req,res)=>{
  console.log("reached");
  res.redirect('/profile');
});

router.post('/updateResumefile', upload.single('resumeUrl'),async(req,res)=>{
  console.log("reached");
  res.redirect('/profile');
})



module.exports = router;