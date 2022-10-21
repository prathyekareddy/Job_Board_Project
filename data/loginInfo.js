const mongoCollections = require('../config/mongoCollections');
const { ObjectID } = require('mongodb');
const loginInfo = mongoCollections.loginInfo;
const users = mongoCollections.users;


let exportedMethods = {

    async addAccount(loginUserName, hashedPassword) {
        const loginInfoCollection = await loginInfo();
    
        let newAccount = {
            loginUserName: loginUserName,
            hashedPassword: hashedPassword,
            user:[]
        };
    
    
        const newInsertInformation = await loginInfoCollection.insertOne(newAccount);
        if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
        // return await this.getUserById(newInsertInformation.insertedId);
      },
    
    async addUserToAccount(accountId, newUser) {
        // let currentUser = await this.getBookById(bookId);
        const userCollection = await users();
    
        const updateInfo = await userCollection.updateOne(
          { _id: accountId },
          { $addToSet: { user: newUser } }
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
          throw 'Update failed';
    
        return await this.getUserById(accountId);
    },

    // async checkUsernameandPassword(username, password){
    //   if(!username || !password) return false;
      
    // }
    
}

module.exports = exportedMethods