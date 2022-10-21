const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const userRes = require('./userResume')
var mongodb = require('mongodb');
const { userResume } = require('../config/mongoCollections');
const loginInfo = require('./loginInfo'); 
const workExp = require('./workExperience');
const bcrypt = require('bcryptjs');

function checkUndef(variable, variableName)
{
    if (variable === null || variable === undefined)
    {
        throw `${variableName || 'Provided Variable'} is not defined!`
    }
}

let exportedMethods = {

  async addUser(profilePictureUrl, email,address, firstName, lastName, phoneNumber, aboutMe, gender, dob, resumeUrl, username, websiteUrl, hashedPassword) {
    const userCollection = await users();

    let newUser = {
      profilePictureUrl: profilePictureUrl,
      email:email,
      address:address,
      name:{firstName: firstName , lastName: lastName, fullName: firstName + ' ' + lastName},
      phoneNumber: phoneNumber,
      aboutMe: aboutMe,
      gender:gender,
      dob: dob,
      resumeUrl:[resumeUrl],
      // accountId:accountId,
      workExperience:[],
      resume:[],
      username: username,
      websiteUrl: websiteUrl,
      hashedPassword: hashedPassword,
      appliedJobs: []
    };

    const newInsertInformation = await userCollection.insertOne(newUser);
    console.log("Added User")
    return newUser
  },

  async updateUser(userId, updatedUser)
  {
    checkUndef(userId, "userID");
    checkUndef(updatedUser, "updatedUser")

    const user = await this.getUserById(userId);

    if (updatedUser.resumeUrl)
    {
      let x = (user.resumeUrl).concat(updatedUser.resumeUrl)
      updatedUser.resumeUrl = [...new Set(x)];
    }

    let userUpdateInfo =
    {
      email: updatedUser.email,
      address: updatedUser.address,
      name: updatedUser.name,
      phoneNumber: updatedUser.phoneNumber,
      aboutMe: updatedUser.aboutMe,
      gender: updatedUser.gender,
      dob: updatedUser.dob,
      resumeUrl: updatedUser.resumeUrl,
      websiteUrl: updatedUser.websiteUrl,
      appliedJobs: []
    };

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne( { _id: mongodb.ObjectID(userId) }, { $set: userUpdateInfo } );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw `Update Failed!`;

    return await this.getUserById(userId);
  },

  async addResumeToUser(userId, newResume) {
    checkUndef(userId, "userId");
    checkUndef(newResume, "newResume");
    
    let currentResume = await userRes.getResumeById(newResume._id);
    const userCollection = await users();

    const updateInfo = await userCollection.updateOne(
      { _id: mongodb.ObjectID(userId) },
      { $addToSet: { resume: currentResume } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(userId);
  },

  async findUserByResumeId(resumeId) {
    checkUndef(resumeId, "resumeId");
    
    const userCollection = await users();
    const user = await userCollection.findOne({  "resume._id": mongodb.ObjectId(resumeId) });
    
    if (!user) throw 'User not found';
    return user;
  },

  async addWorkDesToUser(userId, newWorkExperience) {
    checkUndef(userId, "userId");
    checkUndef(newWorkExperience, "newWorkExperience");
    
    let currentUser = await this.getUserById(userId);
    const userCollection = await users();

    const updateInfo = await userCollection.updateOne(
      { _id: mongodb.ObjectID(userId) },
      { $addToSet: { workExperience: newWorkExperience } }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw 'Update failed';

    return await this.getUserById(userId);
  },

  async getUserById(id) {
    checkUndef(id, "id");
    
    const userCollection = await users();
    const user = await userCollection.findOne({  _id: mongodb.ObjectId(id) });
    
    if (!user) throw 'User not found';
    return user;
  },

  async getAllUsers()
  {
    const userCollection = await users();
    let userList = await userCollection.find({}).toArray();
    if (!userList) throw 'No users in System';
    return userList;
  },

  async getAllUsername() {
    const userCollection = await users();
    const userList = await userCollection.find({},{ projection: { _id: 1, username: 1}}).toArray();
    return userList;
  },

  async getPartialNameMatch(partialName){
    if(!partialName) throw 'Invalid Lookup';
    const userCollection = await users();
    let match ="";
    try{
      match = new RegExp(('^' + partialName), 'i');
    } catch{
      throw "Invalid Name Format";
    }
    const partialMatchList = await userCollection.find({ "name.fullName": match}).toArray();
    return partialMatchList;
  },

  async checkExistingUsername(username){
    checkUndef(username, "username");
    // console.log(username)
    const allUsername = await this.getAllUsername();
    for(let current of allUsername ){
      // console.log(current.username)
      let currentUsername = current.username.toLowerCase();
      username = username.toLowerCase();
      if(currentUsername === username){
        return true;
      }
    }
    return false;
  },

  async checkExistingEmail(email){
    checkUndef(email, 'E-mail');
    const allUsers = await this.getAllUsers();
    for(let current of allUsers){
      let currentEmail = current.email.toLowerCase();
      email = email.toLowerCase();
      if(email === currentEmail){
        return true;
      }
    }
    return false;
  },

  async checkUsernameandPassword(username, password){
    username = username.toLowerCase();
    let usernameExists = await this.checkExistingUsername(username);
    const allUsers = await this.getAllUsers();
    for(let current of allUsers ){
      let currentEmail = current.email.toLowerCase();
      if(currentEmail === username){
        usernameExists = true;
      }
    }
    if(!usernameExists){
      return false;
    } 
    for(let current of allUsers ){
      let currentEmail = current.email.toLowerCase();
      let currentUserName = current.username.toLowerCase();
      if(username === currentEmail || username === currentUserName){
        let checkPassword = await bcrypt.compare(password, current.hashedPassword);
        return checkPassword;
      }
    }
  },


  async getUserID(username) {
    checkUndef(username, "Username");
    const userCollection = await users();
    const allUsers = await this.getAllUsers();
      let user = {};
      for(let current of allUsers){
        let currentEmail = current.email.toLowerCase();
        let currentUsername = current.username.toLowerCase();
        if(currentEmail === username || currentUsername === username){
          user = current;
        }
      }
      return user._id;
  },



  async removeUser (userId)
  {
    checkUndef(userId, "userId");
    
    const userCollection = await users();
    let user = null;
    let x = [];
    let y = [];

    try
    {
      user = await this.getUserById(userId);
    }
    catch (e)
    {
      console.log(e);
    }

    for (let i = 0; i < (user.workExperience).length; i++)
    {
      x[i] = user.workExperience[i]._id;
    }

    for (let i = 0; i < (user.resume).length; i++)
    {
      y[i] = user.resume[i]._id;
    }

    const deletionInfo = await userCollection.removeOne({ _id: mongodb.ObjectID(userId) });
    if (deletionInfo.deletedCount == 0) throw `Could not delete the user with ID: ${userId}`;

    if (!x.length || !y.length)
    {
      return true;
    } 
    else
    {
      for (let i = 0; i < x.length; i++)
      {
        const removeWorkExp = await workExp.removeWorkDesc(x[i], userId);
      }

      for (let j = 0; j < y.length; j++)
      {
        const removeResume = await userRes.removeResume(y[i], userId);
      }
      
      return true;
    }
  }



}
module.exports = exportedMethods