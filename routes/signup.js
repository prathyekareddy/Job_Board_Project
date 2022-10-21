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

router.post('/', async (req,res) => {
    if(!req.session.authenticated){
      let username = req.body.username;
      let userType = req.body.usertype;
      let email = req.body.email;
      // let hashedPassword;
      if(userType === "company"){
        // if(password === re_password && errorCheckString(password) && errorCheckString(re_password)){
        //   hashedPassword = await bcrypt.hash(password, saltRounds);
        // }
        // else{
        //   res.status(401);
        //   res.render("general/signup",{currentTitle : "Login", currentHeader : "Login Form", hasErrors : true});
        // }
        let checkUsernameExists = await companyData.checkExistingUsername(username);
        let checkEmail = await companyData.checkExistingEmail(email)
        let checkUsernameExistsEmployee = await usersData.checkExistingUsername(username);
        let checkEmailEmployee = await usersData.checkExistingEmail(email);
        if(!checkUsernameExists && !checkEmail && !checkEmailEmployee && !checkUsernameExistsEmployee && errorCheckString(username)){
          req.session.username = username;
          // console.log(req.session.username)
          req.session.email = req.body.email;
          req.session.currentUser = userType;
          res.redirect('/profile/create');
        }
        else{
          res.status(401);
          res.render("general/signup",{currentTitle : "Signup", hasError : true});
        }
      }
      else{
        // if(password === re_password && errorCheckString(password) && errorCheckString(re_password)){
        //   hashedPassword = await bcrypt.hash(password, saltRounds);
        // }
        // else{
        //   res.status(401);
        //   res.render("general/signup",{currentTitle : "Login", currentHeader : "Login Form", hasErrors : true});
        // }
        let checkUsernameExistsCompany = await companyData.checkExistingUsername(username);
        let checkEmailCompany = await companyData.checkExistingEmail(email)
        let checkUsernameExists = await usersData.checkExistingUsername(username);
        let checkEmail = await usersData.checkExistingEmail(email);
        if(!checkUsernameExists && !checkEmail && !checkUsernameExistsCompany && !checkEmailCompany && errorCheckString(username)){
          req.session.username = username;
          console.log(req.session.username);
          req.session.email = req.body.email;
          // req.session.password = password;
          // req.session.hashedPassword = hashedPassword;
          req.session.currentUser = userType;
          res.redirect('/profile/create');
        }
        else{
          res.status(401);
          res.render("general/signup",{currentTitle : "Signup", hasError : true});
        }
      }
    }
    
  });

  router.post('/signupFromLogin', async (req,res) => {
    console.log("Reached Here")
    res.redirect('/signup');
  });

  router.get('/', async (req,res) => {
    res.render('general/signup', { title: "Sign Up" ,  auth: false, notLoginPage:false});
  });


  module.exports = router;