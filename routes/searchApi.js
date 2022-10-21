const express = require('express');
const router = express.Router();
const data = require('../data');
const xss = require('xss');
const e = require('express');


router.post('/autoCompleteUser', async function(request, response) {
	let partialMatch = await data.users.getPartialNameMatch(xss(request.body.namePartial));
	response.json({match: partialMatch, type: "user"});
});

router.post('/autoCompleteCompany', async function(request, response) {
	let partialMatch = await data.company.getPartialNameMatch(xss(request.body.namePartial));
	response.json({match: partialMatch, type: "company"});
});

router.post('/general', async function(request, response) {
	let searchData = request.body;
    let homeSearchBar = xss(searchData.homeSearchBar);
    let userTypeToggle = xss(searchData.userTypeToggle);
    
    if(!homeSearchBar) throw 'No Object Listed for Search';
    if(!userTypeToggle) throw 'No Object type detected for Search';
    let partialMatch = [];
    console.log(searchData);
    if(userTypeToggle == "User"){
        partialMatch = await data.users.getPartialNameMatch(homeSearchBar);
    }else if(userTypeToggle == "Company"){
        partialMatch = await data.company.getPartialNameMatch(homeSearchBar);
    }else{
        throw 'Object Type Error: ' + userTypeToggle;
    }

    for (match of partialMatch){
        match.lowercaseUsername = match.username.toLowerCase();
    }
    
    response.render('general/search',{
        title: "Search Results for " + searchData.homeSearchBar,
        //auth: request.session.authenticated,
        auth: false,
        partialName:  searchData.homeSearchBar,
        userType: request.session.currentUser,
        notLoginPage:true,
        searchResults: partialMatch,
        resultsFound: partialMatch.length > 0,
        isUser: userTypeToggle == "User",
        isFilter: false
    });
});

router.post('/filter',  async function(request, response) {
    if(request.session.authenticated){
        let searchData = request.body;
        console.log(searchData);
        let yearsExp = xss(searchData.yearsExp);
        if(!yearsExp || isNaN(yearsExp)) throw 'Invalid field: Years of Experience';


        let skills = searchData.skills;

        if(!skills){
            skills = "noSkills"; 
        } else {
            for(skill of skills){
                skill = xss(skill);
            }
            if(!Array.isArray(skills) || skills.length < 1) throw 'Invalid field: Skills Array';
        }
        
        

        let minimumSalary = xss(searchData.minimumSalary);

        if(!minimumSalary){
            minimumSalary = -1;
        } else {
            if(isNaN(minimumSalary)) throw "Invalid field: Minimum Salary";
        }

        let jobCategory = xss(searchData.jobCategory);

        if(!jobCategory){
            jobCategory = "noCategory";
        }

        let listings = [];
        let subListings = [];
        if(request.session.currentUser == "employee"){
            subListings = await data.jobDetails.searchJobByYearCategorySalarySkills(yearsExp, jobCategory, minimumSalary, skills);
            if(subListings.length > 0){
                for(subList of subListings){
                    listings.push({
                        jobDetails: subList,
                        company:  await data.company.getCompanyByJobDetailsId(subList._id)
                    });  
                }
                for(listing of listings){
                    listing.company.lowercaseUsername = listing.company.username.toLowerCase();
                }
            }
            
        } else{
            
        subListings = await data.userResume.searchResumeByYearSkills(yearsExp, skills);
        if(subListings.length > 0){
            for(subList of subListings){
                listings.push({
                    userResume: subList,
                    user:  await data.users.findUserByResumeId(subList._id)
                });  
            }
            for(listing of listings){
                console.log(listing);
                listing.user.lowercaseUsername = listing.user.username.toLowerCase();
            }
        }
        }
        
        response.render('general/search',{
            title: "Filtered Search Results",
            auth: request.session.authenticated,
            //auth: true,
            userType: request.session.currentUser,
            //userType: "company",
            searchResults: listings,
            resultsFound: listings.length > 0,
            notLoginPage:true,
            username: request.session.username,
            isUser:  request.session.currentUser == "employee",
            isFilter: true,
            isPost: true

        });
    } else{
        response.redirect("/");
    }
});

router.get('/', async function(request, response) {
        response.render('general/search',{
            title: "Search Page",
            //auth: request.session.authenticated,
            auth: request.session.authenticated,
            notLoginPage:true,
            userType: request.session.currentUser,
            isUser:  request.session.currentUser == "employee",
            username: request.session.username,
            isPost: false
        });  
});

module.exports = router;