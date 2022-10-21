const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const bcrypt = require('bcryptjs');
const usersData = data.users;
const companyData = data.company;
const saltRounds = 16;

function errorCheckString(val){
	if(!val)	return false;
	if(val.trim() === '')	return false;
  return true;
}

router.post('/', async (req, res) => {
      if(!req.session.authenticated){
        // console.log(req.body.username)
        // console.log(req.body.password)
        let currentUser = await usersData.checkUsernameandPassword(req.body.username, req.body.password);
        let currentCompany = await companyData.checkUsernameandPassword(req.body.username, req.body.password);
        // console.log(currentCompany)
        // console.log(currentUser)
        if(errorCheckString(req.body.username) && errorCheckString(req.body.password) && currentUser){
            let allusers = await usersData.getAllUsers();
            for(current of allusers){
              if(req.body.username.toLowerCase() === current.username.toLowerCase()){
                req.session.username = current.username;
                break;
              }
              if(req.body.username.toLowerCase() === current.email.toLowerCase()){
                req.session.username = current.username;
                break;
              }   
            }
            let currentUsername = req.body.username.toLowerCase();
            let currentID = await usersData.getUserID(currentUsername);
            req.session._id = currentID;
            req.session.currentUser = "employee";
            req.session.authenticated = true;
            
            // res.render('employee/profile', { title: "Employee profile" ,  auth: true, notLoginPage: true});
            res.redirect(`/profile`); //res.redirect(`/user/${currentID}`);
        }
        else if(errorCheckString(req.body.username) && errorCheckString(req.body.password) && currentCompany){
            req.session.username = req.body.username;
            let currentUsername = req.body.username.toLowerCase();
            let currentID = await companyData.getUserID(currentUsername);
            req.session._id = currentID;
            req.session.currentUser = "company";
            req.session.authenticated = true;
            // res.render('company/profile', { title: "Company profile" ,  auth: true, notLoginPage: true});
            res.redirect(`/profile`); //res.redirect(`/company/${currentID}`);
        }
        else{
          res.status(401);
          res.render('general/login', { title: "Log In" ,  auth: false, hasError:true, notLoginPage: false});
        }
      }
      else{
        if(req.session.currentUser =="company"){
          res.redirect('/company');
        }
        else if(req.session.currentUser =="employee"){
          res.redirect('/user');
        }
      }
});

router.get('/', async(req,res)=> {
  console.log("GET LOGIN")
  if(!req.session.authenticated)
    res.render('general/login', { title: "Log In" ,  auth: false, notLoginPage: false});
  else if(req.session.currentUser == "company")
    res.redirect('/company');
  else
    res.redirect('/user');  
})

module.exports = router;


  