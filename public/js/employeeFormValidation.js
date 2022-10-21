(function($){
    let password = $('#password');
    let confirmPassword = $('#confirmPassword');
    let firstName = $('#firstName')
    let lastName = $('#lastName')
    let phoneNumber = $('#phoneNumber')
    let address = $('#address')
    let dob = $('#dob')
    let aboutme = $('#aboutMe')
    let lowerCaseLetters = /[a-z]/g;
    let upperCaseLetters = /[A-Z]/g;
    let numbers = /[0-9]/g;
    let urlFormat = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
    let creationForm = $("#employee-creation-form")
    let companycreationForm = $("#company-creation-form")
    let websiteUrl = $('#websiteUrl') 
    let addEducation =$('#addEducation')
    let skillsInput = $('#skillsLookUp');
    let skillsList = $('#skillsLookUp');
    let selectedSkills = $('#insertedSkills');
    let skillsDiv = $('#skillsList');
    let category =  $('#category')
    

    function skillsAddition(){
        var skills = getSkills();
        skillsList.autocomplete({
            source: skills,
            minLength: 1,
            select: function(event, ui){
                if(selectedSkills.children().length == 0 ) $('#skillsHeading').html('Skills List');
                skillsInput.val("");
                $('#filteredSearchBarErrorState').empty();
                selectedSkills.append("<li id='" + ui.item.value + "'>"
                + ui.item.value + " <input type='hidden' name='skills[]' value='" + ui.item.value + "'/>"
                //+ "<button onclick='document.getElementById(\"" + ui.item.value + "\".remove())>Remove</button>"
                + "<button onclick='document.getElementById(\"" + ui.item.value + "\").remove()'>Remove</button>"
                + "</li>");

                return false;
            }
        });
    }
    skillsAddition();

    function checkForm(){
        creationForm.submit(function(event){
            let uploadResume = $('#uploadResume');
            let profilePicture = $('#profilePicture');
            let errorDiv = $("#error-form")
            let allSpecialCharacter = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?~]/;
            let split_picture = profilePicture.val().split('.');
            let extension = split_picture[split_picture.length-1];

            if(!profilePicture.val().toLowerCase().includes('.jpeg') ){
                event.preventDefault();
                $(`#error-profilePicture`).empty();
                $(`#error-profilePicture`).append('<p class="error"> Error: Please upload photo in .jpeg format</p>')
                profilePicture.focus()
                return
            }
            else{
                $(`#error-profilePicture`).empty();
            }

            if(password.val().trim().length==0){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Please enter the password! <p>')
                $("#password").focus()
                return
            }
            else if(password.val().trim().length < 8 || password.val().trim().length > 15){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Password must be minimum of 8 characters and maximum of 15 characters </p>')
                $("#password").focus()
                return
            }
            else if(!password.val().match(upperCaseLetters) || !password.val().match(lowerCaseLetters) || !password.val().match(numbers) || !allSpecialCharacter.test(password.val())){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Password must be a combination of uppercase, lowercase, special character and a number!! </p>')
                $("#password").focus()
                return
            }
            else{
                $("#error-password").empty();
            } 
            
            if(confirmPassword.val() !== password.val()){
                event.preventDefault();
                $("#error-confirmPassword").empty();
                $("#error-confirmPassword").append('<p class="error"> Error: Password and confirm password should match </p>')
                confirmPassword.focus()
                return
            }
            else{
                $("#error-confirmPassword").empty();
            }
            if(firstName.val().trim().length == 0 ){
                event.preventDefault();
                $("#error-firstName").empty();
                $("#error-firstName").append('<p class="error"> Error: Please enter both FirstName and LastName </p>')
                $("#firstName").focus()
                return
            }
            else if(lastName.val().trim().length == 0){
                event.preventDefault();
                $("#error-firstName").empty();
                $("#error-firstName").append('<p class="error"> Error: Please enter both FirstName and LastName</p>')
                $("#lastName").focus()
                return
            }
            else{
                $("#error-firstName").empty();
            }

            if(phoneNumber.val().trim() == 0){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append('<p class="error"> Error: Please enter the phone number</p>')
                $("#phoneNumber").focus()
                return
            }
            else if(phoneNumber.val().length != 10){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append(`<p class="error"> Error: Please enter a valid phone number</p>`)
                $("#phoneNumber").focus()
                return
            }
            else if(!phoneNumber.val().match("[0-9]+")){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append(`<p class="error"> Error: Please enter a valid phone number</p>`)
                $("#phoneNumber").focus()
                return
            }
            else{
                $("#error-phoneNumber").empty();
            }
            
            let split_date = dob.val().split("-");
            let yyyy = parseInt(split_date[0], 10);
            if(!dob.val()){
                event.preventDefault();
                $("#error-gender").empty();
                $("#error-gender").append('<p class="error"> Error: Please enter Date of Birth</p>')
                $("#dob").focus()
                return
            }
            if(yyyy < 1900  || yyyy > 2021){
                event.preventDefault();
                $("#error-gender").empty();
                $("#error-gender").append('<p class="error"> Error: Please enter a valid Date of Birth</p>')
                $("#dob").focus()
                return
            }
            else{
                $("#error-gender").empty();
            }  

            if(address.val().trim().length == 0){
                event.preventDefault();
                $("#error-address").empty();
                $("#error-address").append('<p class="error"> Error: Please enter the address</p>')
                $("#address").focus()
                return
            }
            else{
                $("#error-address").empty();
            }

            if(aboutme.val().trim().length == 0){
                event.preventDefault();
                $("#error-aboutMe").empty();
                $("#error-aboutMe").append('<p class="error"> Error: Please enter some information!</p>')
                $("#aboutMe").focus()
                return
            }
            else{
                $("#error-aboutMe").empty();
            }
            if(websiteUrl.val().trim().length == 0){
                event.preventDefault();
                $("#error-websiteUrl").empty();
                $("#error-websiteUrl").append('<p class="error"> Error: Please enter some information!</p>')
                $("#websiteUrl").focus()
                return
            }
            else if(!urlFormat.test(websiteUrl.val().trim())){
                event.preventDefault();
                $("#error-websiteUrl").empty();
                $("#error-websiteUrl").append('<p class="error"> Error: Please enter corrent website URL!</p>')
                $("#websiteUrl").focus()
                return
            }
            else{
                $("#error-websiteUrl").empty();
            }

            for(let j=0; j<i; j++){
                if($("input").hasClass(`${j+1}`)){
                    let schoolName = $(`#schoolName${j+1}`)
                    let gpa = $(`#gpa${j+1}`)
                    let educationStartDate = $(`#educationStartDate${j+1}`)
                    let educationEndDate = $(`#educationEndDate${j+1}`)
                    if(schoolName.val().trim().length == 0){
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                        $(`#error-resume${j+1}`).append('<p class="error"> Error: Please enter School name!</p>')
                        schoolName.focus()
                        return
                    }
                    else{
                        $(`#error-resume${j+1}`).empty();
                    }
                    if(gpa.val() < 0 || gpa.val() > 4 || gpa.val().trim() ===''){
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                        $(`#error-resume${j+1}`).append('<p class="error"> Error: Enter GPA on the scale of 4.0</p>')
                        gpa.focus()
                        return
                    } 
                    else{
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                    }
                    let split_start_date = educationStartDate.val().split("-");
                    let split_end_date = educationEndDate.val().split("-");
                    let yyyy_start = parseInt(split_start_date[0], 10);
                    let yyyy_end = parseInt(split_end_date[0], 10);
                    let startDate = new Date(educationStartDate.val())
                    let endDate = new Date(educationEndDate.val())
                    if(!educationStartDate.val()){
                            event.preventDefault();
                            $(`#error-resume${j+1}`).empty();
                            $(`#error-resume${j+1}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                            educationStartDate.focus()
                            return
                    }
                    else if(!educationEndDate.val()){
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                        $(`#error-resume${j+1}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                        educationEndDate.focus()
                        return
                    }
                    else if(yyyy_start < 1900  || yyyy_start > 2040 ){
                            event.preventDefault();
                            $(`#error-resume${j+1}`).empty();
                            $(`#error-resume${j+1}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                            educationStartDate.focus()
                            return
                    }
                    else if( yyyy_end < 1900 || yyyy_end > 2040 ){
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                        $(`#error-resume${j+1}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                        educationEndDate.focus()
                        return
                    }
                    else if(endDate < startDate){
                        event.preventDefault();
                        $(`#error-resume${j+1}`).empty();
                        $(`#error-resume${j+1}`).append('<p class="error"> Error: Start Date should not be after end Date</p>')
                        educationEndDate.focus()
                        return
                    }
                    else{
                        $(`#error-resume${j+1}`).empty();
                    }  
                }
                else{
                    $(`#error-resume${j+1}`).empty();
                    continue}
            }
            if($('#insertedSkills').children().length == 0){
                event.preventDefault();
                $(`#error-skills`).empty();
                $(`#error-skills`).append('<p class="error"> Error: Please enter atleast one skill!</p>')
                skillsLookUp.focus()
                return
            }
            else{
                $(`#error-skills`).empty();
            }
            let yearsOfExperience = $('#yearsOfExperience')
            if(yearsOfExperience.val().trim().length ==0){
                event.preventDefault();
                $(`#error-yearsOfExperience`).empty();
                $(`#error-yearsOfExperience`).append('<p class="error"> Error: Please enter year of experience. If not applicable, enter 0</p>')
                yearsOfExperience.focus()
                return
            }
            else{
                $(`#error-yearsOfExperience`).empty();
            }
            for(let current=100; current<=projectCount ;current++){
                if($("input").hasClass(`${current}`)){
                let projectTitle = $(`#projectTitle${current}`)
                let projectDesc = $(`#projectDesc${current}`)
                let projectStartDate = $(`#projectStartDate${current}`)
                let projectEndDate = $(`#projectEndDate${current}`)
                let project_start_date = projectStartDate.val().split("-");
                let project_end_date = projectEndDate.val().split("-");
                let yyyy_start = parseInt(project_start_date[0], 10);
                let yyyy_end = parseInt(project_end_date[0], 10);
                let startDate = new Date(projectStartDate.val())
                let endDate = new Date(projectEndDate.val())
                if(projectTitle.val().trim().length ==0){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Please enter a project title</p>')
                    projectTitle.focus()
                    return
                }
                else{
                    $(`#error-project${current}`).empty();
                }

                if(projectDesc.val().trim().length ==0){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Please enter a project Description</p>')
                    projectDesc.focus()
                    return
                }
                else{
                    $(`#error-project${current}`).empty();
                }
                if(!projectStartDate.val()){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Please enter a project Start date</p>')
                    projectDesc.focus()
                    return
                }
                else if(!projectEndDate.val()){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Please enter a project End date</p>')
                    projectDesc.focus()
                    return
                }
                else if(yyyy_start < 1900  || yyyy_start > 2040 ){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                    projectStartDate.focus()
                    return
                }
                else if( yyyy_end < 1900 || yyyy_end > 2040 ){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                    projectEndDate.focus()
                    return
                }
                else if(endDate < startDate){
                    event.preventDefault();
                    $(`#error-project${current}`).empty();
                    $(`#error-project${current}`).append('<p class="error"> Error: Start Date should not be after end Date</p>')
                    projectEndDate.focus()
                    return
                }
                else{
                    $(`#error-project${current}`).empty();
                }  

                }else{
                    $(`#error-project${current}`).empty();
                    continue;
                }
            }

            for(let current=1000; current<=workCount ;current++){
                if($("input").hasClass(`${current}`)){
                    let companyName = $(`#companyName${current}`)
                    let jobTitle = $(`#jobTitle${current}`)
                    let description = $(`#description${current}`)
                    let workStartDate = $(`#workStartDate${current}`)
                    let workEndDate = $(`#workEndDate${current}`)
                    let split_start_date = workStartDate.val().split("-");
                    let split_end_date = workEndDate.val().split("-");
                    let yyyy_start = parseInt(split_start_date[0], 10);
                    let yyyy_end = parseInt(split_end_date[0], 10);
                    let startDate = new Date(workStartDate.val())
                    let endDate = new Date(workEndDate.val())
                    if(companyName.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter the Comapny name</p>')
                        companyName.focus()
                        return
                    }
                    else{
                        $(`#error-work${current}`).empty();
                    }

                    if(jobTitle.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter the Job Title</p>')
                        jobTitle.focus()
                        return
                    }
                    else{
                        $(`#error-work${current}`).empty();
                    }

                    if(description.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter some job description</p>')
                        description.focus()
                        return
                    }
                    else{
                        $(`#error-work${current}`).empty();
                    }
                    if(!workStartDate.val()){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter a project Start date</p>')
                        workStartDate.focus()
                        return
                    }
                    else if(!workEndDate.val()){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter a project End date</p>')
                        workEndDate.focus()
                        return
                    }
                    else if(yyyy_start < 1900  || yyyy_start > 2040 ){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Enter a valid start and end date</p>')
                        projectStartDate.focus()
                        return
                    }
                    else if( yyyy_end < 1900 || yyyy_end > 2040 ){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Please enter a valid start and end date</p>')
                        workEndDate.focus()
                        return
                    }
                    else if(endDate < startDate){
                        event.preventDefault();
                        $(`#error-work${current}`).empty();
                        $(`#error-work${current}`).append('<p class="error"> Error: Start Date should not be after end Date</p>')
                        workEndDate.focus()
                        return
                    }
                    else{
                        $(`#error-work${current}`).empty();
                    }  

                }else{
                    $(`#error-work${current}`).empty();
                    continue;
                }
            }

    
            let split_resume = uploadResume.val().split('.');
            let extension_resume = split_resume[split_resume.length-1];
            if(!uploadResume.val().toLowerCase().includes('.pdf')){
                event.preventDefault();
                $(`#error-uploadResume`).empty();
                $(`#error-uploadResume`).append('<p class="error"> Error: Please upload resume in .pdf format</p>')
                uploadResume.focus()
                return
            }
            else{
                $(`#error-uploadResume`).empty();
            }
        })

        companycreationForm.submit(function(event){
            let uploadResume = $('#uploadResume');
            let profilePicture = $('#profilePicture');
            let errorDiv = $("#error-form")
            let allSpecialCharacter = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?~]/;
            let split_picture = profilePicture.val().split('.');
            let extension = split_picture[split_picture.length-1];
            if(!profilePicture.val().toLowerCase().includes('.jpeg') ){
                event.preventDefault();
                $(`#error-profilePicture`).empty();
                $(`#error-profilePicture`).append('<p class="error"> Error: Please upload photo in .jpeg format</p>')
                profilePicture.focus()
                return
            }
            else{
                $(`#error-profilePicture`).empty();
            }

            if(password.val().trim().length==0){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Please enter the password! <p>')
                $("#password").focus()
                return
            }
            else if(password.val().trim().length < 8 || password.val().trim().length > 15){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Password must be minimum of 8 characters and maximum of 15 characters </p>')
                $("#password").focus()
                return
            }
            else if(!password.val().match(upperCaseLetters) || !password.val().match(lowerCaseLetters) || !password.val().match(numbers) || !allSpecialCharacter.test(password.val())){
                event.preventDefault();
                $("#error-password").empty();
                $("#error-password").append('<p class="error"> Error: Password must be a combination of uppercase, lowercase, special character and a number!! </p>')
                $("#password").focus()
                return
            }
            else{
                $("#error-password").empty();
            } 
            
            if(confirmPassword.val() !== password.val()){
                event.preventDefault();
                $("#error-confirmPassword").empty();
                $("#error-confirmPassword").append('<p class="error"> Error: Password and confirm password should match </p>')
                confirmPassword.focus()
                return
            }
            else{
                $("#error-confirmPassword").empty();
            }
            let companyName = $('#companyName')
            if(companyName.val().trim().length==0){
                event.preventDefault();
                $("#error-companyName").empty();
                $("#error-companyName").append('<p class="error"> Error: Please enter the Comapny Name! <p>')
                $("#companyName").focus()
                return
            }
            else{
                $("#error-companyName").empty();
            }
           
            if(phoneNumber.val().trim() == 0){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append('<p class="error"> Error: Please enter the phone number</p>')
                $("#phoneNumber").focus()
                return
            }
            else if(phoneNumber.val().length != 10){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append(`<p class="error"> Error: Please enter a valid phone number</p>`)
                $("#phoneNumber").focus()
                return
            }
            else if(!phoneNumber.val().match("[0-9]+")){
                event.preventDefault();
                $("#error-phoneNumber").empty();
                $("#error-phoneNumber").append(`<p class="error"> Error: Please enter a valid phone number</p>`)
                $("#phoneNumber").focus()
                return
            }
            else{
                $("#error-phoneNumber").empty();
            }
            if(category.val().trim().length==0){
                event.preventDefault();
                $("#error-category").empty();
                $("#error-category").append('<p class="error"> Error: Please enter some Category! Example: IT, CS, HR... <p>')
                $("#category").focus()
                return
            }
            else{
                $("#error-category").empty();
            }
            if(address.val().trim().length == 0){
                event.preventDefault();
                $("#error-address").empty();
                $("#error-address").append('<p class="error"> Error: Please enter the address</p>')
                $("#address").focus()
                return
            }
            else{
                $("#error-address").empty();
            }

            for(let current=10000; current<=jobDetailsCount;current++){
                if($("input").hasClass(`${current}`)){
                    let jobTitle = $(`#jobTitle${current}`)
                    let jobLocation = $(`#jobLocation${current}`)
                    let jobCategory = $(`#jobCategory${current}`)
                    let yearsOfExperience = $(`#yearsOfExperience${current}`)
                    let salaryMin = $(`#salaryMin${current}`)
                    let salaryMax = $(`#salaryMax${current}`)
                    let jobDescription = $(`#jobDescription${current}`)
                    let jobQualification = $(`#jobQualification${current}`) 
                    let skillsLookUp = $(`#skillsLookUp${current}`)
                    if(jobTitle.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-jobTitle${current}`).empty();
                        $(`#error-jobTitle${current}`).append('<p class="error"> Error: Please enter the Job Title</p>')
                        jobTitle.focus()
                        return
                    }
                    else{
                        $(`#error-jobTitle${current}`).empty();
                    }

                    if(jobLocation.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-jobLocation${current}`).empty();
                        $(`#error-jobLocation${current}`).append('<p class="error"> Error: Please enter the Job Location</p>')
                        jobLocation.focus()
                        return
                    }
                    else{
                        $(`#error-jobLocation${current}`).empty();
                    }

                    if(jobCategory.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-jobCategory${current}`).empty();
                        $(`#error-jobCategory${current}`).append('<p class="error"> Error: Please enter some job category</p>')
                        jobCategory.focus()
                        return
                    }
                    else{
                        $(`#error-jobCategory${current}`).empty();
                    }
                    if(yearsOfExperience.val().trim().length ==0 ){
                        event.preventDefault();
                        $(`#error-yearsOfExperience${current}`).empty();
                        $(`#error-yearsOfExperience${current}`).append('<p class="error"> Error: Please enter a years of Experience. If not needed, enter N/A <p>')
                        yearsOfExperience.focus()
                        return
                    }
                    else{
                        $(`#error-yearsOfExperience${current}`).empty();
                    }
                    
                    if(salaryMin.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-salary${current}`).empty();
                        $(`#error-salary${current}`).append('<p class="error"> Error: Please enter minimum and maximum salary</p>')
                        salaryMin.focus()
                        return
                    }
                    else if(salaryMax.val().trim().length ==0 ){
                        event.preventDefault();
                        $(`#error-salary${current}`).empty();
                        $(`#error-salary${current}`).append('<p class="error"> Error: Please enter minimum and maximum salary</p>')
                        salaryMax.focus()
                        return
                    }
                    else if(parseInt(salaryMin.val(),10) > parseInt(salaryMax.val(),10)){
                        event.preventDefault();
                        $(`#error-salary${current}`).empty();
                        $(`#error-salary${current}`).append('<p class="error"> Error: Please enter a valid minimum and maximum salary</p>')
                        salaryMax.focus()
                        return
                    }
                    else{
                        $(`#error-salary${current}`).empty();
                    }  

                    if(jobDescription.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-jobDescription${current}`).empty();
                        $(`#error-jobDescription${current}`).append('<p class="error"> Error: Please enter some job Description</p>')
                        jobDescription.focus()
                        return
                    }
                    else{
                        $(`#error-jobDescription${current}`).empty();
                    }
                    if(jobQualification.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-jobQualification${current}`).empty();
                        $(`#error-jobQualification${current}`).append('<p class="error"> Error: Please enter some job qualification</p>')
                        jobQualification.focus()
                        return
                    }
                    else{
                        $(`#error-jobQualification${current}`).empty();
                    }
                    if(skillsLookUp.val().trim().length ==0){
                        event.preventDefault();
                        $(`#error-skillsLookUp${current}`).empty();
                        $(`#error-skillsLookUp${current}`).append('<p class="error"> Error: Please enter some job qualification</p>')
                        skillsLookUp.focus()
                        return
                    }
                    else{
                        $(`#error-skillsLookUp${current}`).empty();
                    }
                }else{
                    $(`#error-skillsLookUp${current}`).empty();
                    continue;
                }
            }
        });

    }
    checkForm()
    
})(window.jQuery);


$(document).on("click", ".clone .remove-Work", function (e) {
    $(e.target).parent().parent().remove();
});

function addMoreDetails() {
    jobDetailsCount+=1
    let wrapper = $('#job-wrapper');
    let html = `<div class="col-md-12 d-flex justify-content-between mt-5 align-items-center clone">
                <div class="col-md-5 mx-3">
                    <span class="remove-Work">remove</span>
                    <div class="d-flex flex-column" id="workInformation">
                        <div class="form-group">
                            <label for="JobTitle">Job Title</label>
                            <input type="text" class="form-control ${jobDetailsCount}" id="jobTitle${jobDetailsCount}" name="jobTitle" placeholder="">
                        </div>
                        <div class="error-jobTitle${jobDetailsCount} error" id="error-jobTitle${jobDetailsCount}"></div>
                        <div class="form-group">
                            <label for="JobLocation">Job Location</label>
                            <input type="text" class="form-control ${jobDetailsCount}" id="jobLocation${jobDetailsCount}" name="jobLocation"
                                placeholder="">
                        </div>
                        <div class="error-jobLocation${jobDetailsCount} error" id="error-jobLocation${jobDetailsCount}"></div>
                        <div class="form-group">
                            <label for="JobCategory">Job Category</label>
                            <input type="text" class="form-control ${jobDetailsCount}" id="jobCategory${jobDetailsCount}" name="jobCategory"
                                placeholder="">
                        </div>
                        <div class="error-jobCategory${jobDetailsCount} error" id="error-jobCategory${jobDetailsCount}"></div>
                        <div class="form-group">
                            <label for="yearsOfExperience">Years of Experience</label>
                            <input type="number" class="form-control ${jobDetailsCount}" id="yearsOfExperience${jobDetailsCount}" name="yearsOfExperience"
                                placeholder="">
                        </div>
                        <div class="error-yearsOfExperience${jobDetailsCount} error" id="error-yearsOfExperience${jobDetailsCount}"></div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="SalaryMin">Salary Min</label>
                                    <input type="text" class="form-control ${jobDetailsCount}" id="salaryMin${jobDetailsCount}" name="salaryMin"
                                        placeholder="">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="SalaryMax">Salary Max</label>
                                    <input type="text" class="form-control ${jobDetailsCount}" id="salaryMax${jobDetailsCount}" name="salaryMax"
                                        placeholder="">
                                </div>
                            </div>
                        </div>
                        <div class="error-salary${jobDetailsCount} error" id="error-salary${jobDetailsCount}"></div>
                    </div>
                </div>
                <div class="col-md-5 mx-3">
                    <div class="form-group">
                        <label for="jobDescription">Job Description</label>
                        <textarea class="form-control ${jobDetailsCount}" rows="5" id="jobDescription${jobDetailsCount}" name="jobDescription"
                            placeholder=""></textarea>
                    </div>
                    <div class="error-jobDescription${jobDetailsCount} error" id="error-jobDescription${jobDetailsCount}"></div>
                    <div class="form-group">
                        <label for="jobQualification">Qualification</label>
                        <textarea class="form-control ${jobDetailsCount}"  id="jobQualification${jobDetailsCount}" name="jobQualification"
                            placeholder=""></textarea>
                    </div>
                    <div class="error-jobQualification${jobDetailsCount} error" id="error-jobQualification${jobDetailsCount}"></div>
                    <div class="form-group">
                        <label for="skillsLookUp">Skills</label>
                        <input  class="form-control ${jobDetailsCount}" id="skillsLookUp${jobDetailsCount}" name="skillsLookup" type="text" placeholder="Skills"/>
                        </div>
                        <div class="error-skillsLookUp${jobDetailsCount} error" id="error-skillsLookUp${jobDetailsCount}}"></div>
                    <div id="skillsList">
                        <h4 id="skillsHeading"></h4>
                        <ul id="insertedSkills"></ul>
                    </div>
                </div>
            </div>
            <div class="error-jobDetails${projectCount} error" id="error-jobDetails${projectCount}" ><div> `;
    wrapper.append(html);
}






function addMoreProject() {
    projectCount+=1
    let wrapper = $('#project-wrapper');
    let html = `<div class="col-md-12 py-2 d-flex justify-content-between align-items-center clone">
                <div class="col-md-5">
                   <span class="remove-project">remove</span>
                    <div class="d-flex" id="project">
                        <div class="d-flex flex-column">
                            <div class="form-group">
                                <label for="ConfirmPassword">Project Title</label>
                                <input type="text" class="form-control ${projectCount}" id="projectTitle${projectCount}" name="project[projectTitle]"
                                    placeholder="" >
                            </div>
                            <div class="form-group">
                    <label for="projectDesc">Project Description</label>
                    <input type="text" class="form-control ${projectCount}" id="projectDesc${projectCount}" name="project[projectDesc]" placeholder="" >
                </div>
                            <div class="d-flex">
                                <div class="fd-flex flex-column">
                                    <label for="ConfirmPassword">Start Date</label>
                                    <div>
                                        <input type='date' id="projectStartDate${projectCount}" name="project[startDate]"
                                            class="btn btn-outline-primary my-3" ${projectCount} onchange="readURL(this);"  />
                                    </div>
                                </div>
                                <div class="fd-flex pl-2 flex-column">
                                    <label for="ConfirmPassword">End Date</label>
                                    <div>
                                        <input type='date' id="projectEndDate${projectCount}" name="project[endDate]"
                                            class="btn btn-outline-primary my-3" ${projectCount} onchange="readURL(this);"  />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="error-project${projectCount} error" id="error-project${projectCount}" ><div>`
    wrapper.append(html);
}
$(document).on("click", ".clone .remove-project", function (e) {
    $(e.target).parent().parent().remove();
});

function addMoreWorkInformation() {
    workCount +=1
    let wrapper = $('#work-information-wrapper');
     let html = `<div class="col-md-12 py-2 d-flex justify-content-between align-items-center clone" >
                 <div class="col-md-5">
                  <span class="remove-Work">remove</span>
                     <div class="d-flex flex-column" id="workInformation">
                         <div class="form-group">
                             <label for="companyName">Company Name</label>
                             <input type="text" class="form-control ${workCount}" id="companyName${workCount}" name="workDes[companyName]"
                                 placeholder="" >
                         </div>
                         <div class="form-group">
                             <label for="jobTitle">Job Title</label>
                             <input type="text" class="form-control ${workCount}" id="jobTitle${workCount}" name="workDes[jobTitle]" placeholder="" >
                         </div>
                     </div>
                 </div>
                 <div class="col-md-5 d-flex flex-column mx-3">
                     <div class="d-flex flex-row">
                         <div class="d-flex flex-column">
                             <label for="workStartDate">Start Date</label>
                             <div>
                                 <input type='date' id="workStartDate${workCount}" name="workDes[workStartDate]"
                                     class="btn btn-outline-primary ${workCount} my-3" onchange="readURL(this);" />
                             </div>
                         </div>
                         <div class="fd-flex pl-2 flex-column">
                             <label for="workEndDate">End Date</label>
                             <div>
                                 <input type='date' id="workEndDate${workCount}" name="workDes[workEndDate]" class="btn btn-outline-primary ${workCount} my-3"
                                     onchange="readURL(this);" />
                             </div>
                         </div>
                     </div>
                     <div class="form-group">
                         <label for="description">Job Description</label>
                         <textarea class="form-control ${workCount}" columns="5" id="description${workCount}" name="workDes[WorkDescription]"
                             placeholder=""></textarea>
                     </div>
                 </div>
             </div>
             <div class="error-work${workCount} error" id="error-work${workCount}" ><div>`;
     wrapper.append(html);
 }
 $(document).on("click", ".clone .remove-Work", function (e) {
     $(e.target).parent().parent().remove();
 });


function addMoreEducation() {
    let wrapper = $('#education-wrapper');
    i+=1;
    let html = `<div class="col-md-12 py-2 d-flex justify-content-between align-items-center clone" id="education${i}">
                <div class="col-md-5">
                   <span class="remove-education">remove</span>
                    <div class="d-flex" id="project">
                        <div class="d-flex flex-column">
                            <div class="form-group">
                                    <label for="schoolName">School Name</label>
                                    <input type="text" class="form-control ${i}" id="schoolName${i}" name="School[schoolName]"  >
                                </div>
                                <div class="form-group">
                                    <label for="gpa">G.P.A</label>
                                    <input type="number" class="form-control ${i}" step="0.01" min="0.00" max="4.00" id="gpa${i}" name="School[gpa]"  >
                                </div>
                        </div>
                    </div>
                </div>
                                            <div class="col-md-6">
                            <div class="form-group">
                                    <div class="fd-flex flex-column ml-3">
                                        <label for="startDate">Start Date</label>
                                        <input type='date' id="educationStartDate${i}" name="School[startDate]" class="form-control ${i} btn btn-outline-primary" 
                                            onchange="readURL(this);"  />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="fd-flex flex-column ml-3">
                                        <label for="endDate">End Date</label>
                                        <input type='date' id="educationEndDate${i}" name="School[endDate]" class="form-control ${i} btn btn-outline-primary" 
                                            onchange="readURL(this);"  />
                                    </div>
                                </div>
                        </div>
                    
            </div>
            <div class="error-resume${i} error" id="error-resume${i}" ><div>`;
    wrapper.append(html);

}
$(document).on("click", ".clone .remove-education", function (e) {
    $(e.target).parent().parent().remove();
});

function getSkills(){
    return [
        "Mongodb",
        "Nodejs",
        "Express",
        "React",
        "Software Architecture",
        "Front-End Development",
        "Back-End Development",
        "Full-Stack Development",
        "C",
        "C++",
        "C#",
        "Java",
        "Javascript",
        "Python",
        "Database Management",
        "SQL",
        "MySQL",
        "SQLite",
        "CAD",
        "Machine Shop",
        "Cybersecurity Analysis",
        "Data Analytics",
        "Project Management",
        "Scrum",
        "Agile Development"       
    ];
};