const express = require('express');
const router = express.Router();
const data = require('../data');
const companyData = data.company
const jobData = data.jobDetails
const xss = require('xss');
const {projectFields, resumeFields, companyFields} = require('./constants');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const saltRounds = 16;

let profilePictureUrl;
const storage = multer.diskStorage({
    //destination for files
    destination: function (request, file, callback) {
      callback(null, './public/uploads/companyFiles/profilePictures');
    },
  
    //add back the extension
    filename: function (request, file, callback) { 
        profilePictureUrl =  request.session.username + "_profilePicture.jpeg" 
      callback(null, profilePictureUrl);
    },
  });
  
  //upload parameters for multer
  const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
  

router.post('/createNewCompany', upload.single('profilePicture'), async(req,res)=>{
    let htmlValue = req.body;
    const hashedPassword = await bcrypt.hash(htmlValue.password, saltRounds);
    const newCompany = await companyData.addCompany(htmlValue.companyName, 
        htmlValue.address,
        htmlValue.category,
        htmlValue.hrEmail,
        htmlValue.username, 
        hashedPassword,
        `/public/uploads/companyFiles/profilePictures/${profilePictureUrl}`)
    req.session._id = newCompany._id;
    req.session.currentUser ='company';
    if(Array.isArray(htmlValue.jobLocation)){
        for(let i=0; i<htmlValue.jobLocation.length; i++){
            let tempskillArray = htmlValue.skillsLookup[i].split(',');
            const tempCompany = await jobData.addJob(htmlValue.jobTitle[i],
                htmlValue.jobLocation[i],
                htmlValue.jobDescription[i], 
                parseInt(htmlValue.yearsOfExperience[i]), 
                tempskillArray,
                htmlValue.jobCategory[i], 
                htmlValue.salaryMin[i], 
                htmlValue.salaryMax[i], 
                htmlValue.jobQualification[i], 
                true
            )
            const addJobToCompany = await companyData.addJobToCompany(newCompany._id, tempCompany);
        }
    }
    else{
        let skillArray = htmlValue.skillsLookup.split(',');
        const newJob = await jobData.addJob(htmlValue.jobTitle,
            htmlValue.jobLocation,
            htmlValue.jobDescription, 
            parseInt(htmlValue.yearsOfExperience),
            skillArray,
            htmlValue.jobCategory, 
            htmlValue.salaryMin, 
            htmlValue.salaryMax, 
            htmlValue.jobQualification, 
            true
        )
        const addJobToCompany = await companyData.addJobToCompany(newCompany._id, newJob);
    }
    if(newCompany){
      req.session.authenticated = true;
    }

    // res.render("company/successScreen", {
    //         title: "STEMConnect",
    //         auth: false,
    //         listingType: "Resume",
    //         notLoginPage: true,
    //       });

    res.redirect('/profile');
});

// router.post('/updatePicture', upload.single('profilePicture'), async(req,res)=>
// {
//   console.log("reached"); 
//   res.redirect('/profile');
// });


router.get('/:id', async (req, res) => {
    let company = await data.company.getCompanyById(req.params.id);
    res.json(company);
});

router.get('/', async(req,res)=> {
    res.render('company/companyInfo', { title: "Company Details" ,  auth: true, notLoginPage: true});
});

router.get('/joblisting/:id', async (req, res) => {
  let user = await data.jobDetails.getJobById(req.params.id);
  res.json(user);
});


module.exports = router;