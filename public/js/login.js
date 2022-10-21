(function($){
        let username = $('#username');
        username.keyup(function(){
            let errorDiv = $('#error-username');
            let enteredUsername = username.val().trim();
            if(enteredUsername === undefined || enteredUsername === '' || enteredUsername === null){
                errorDiv.html("")
                errorDiv.show();
                errorDiv.append('**Please enter the Username');
            }
            else{
                errorDiv.html("")
                errorDiv.hide();
            }
        })

        let password = $('#password');
            password.keyup(function(){
        let errorDiv = $('#error-password');
        let lowerCaseLetters = /[a-z]/g;
        let upperCaseLetters = /[A-Z]/g;
        let numbers = /[0-9]/g;
        let enteredPassword = password.val().trim();
        if(enteredPassword === undefined || enteredPassword === '' || enteredPassword === null){
            errorDiv.html("")
            errorDiv.show();
            errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        }
        else if(enteredPassword.length < 8){
            errorDiv.html("")
            errorDiv.show();
            errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        }
        else if(enteredPassword.length > 15){
            errorDiv.html("");
            errorDiv.show();
            errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        }
        else if(!enteredPassword.match(lowerCaseLetters) || !enteredPassword.match(upperCaseLetters) || !enteredPassword.match(numbers)){
            errorDiv.show();
            errorDiv.html("");
            errorDiv.append('**Password must be a combination of uppercase, lowercase and a number!!');
        } 
        else{
            errorDiv.html("")
            errorDiv.hide();
        }
        })

        let confirmPassword = $('#reEnterPassword');
        confirmPassword.keyup(function(){
        let errorDiv = $('#error-reEnterPassword');
        
        let enteredConfirmPassword = confirmPassword.val().trim();
        let enteredPassword = password.val().trim();

        if(enteredPassword !== enteredConfirmPassword){
            errorDiv.html("")
            errorDiv.show();
            errorDiv.append('**Password and confirm password should match!');
        }
        else{
            errorDiv.html("")
            errorDiv.hide();
        }
        })

        let loginForm = $("#login-form")
        function checkLoginForm(){
            let lowerCaseLetters = /[a-z]/g;
            let upperCaseLetters = /[A-Z]/g;
            let numbers = /[0-9]/g;
            loginForm.submit(function(event){
                let username = $("#username")
                let password = $("#password")
                let errorDiv = $("#error-form")
                let specialCharacter = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
                let allSpecialCharacter = /[ `!@#$%^&*()+_\-=\[\]{};':"\\|,.<>\/?~]/;
                if(username.val().trim().length ==0 || password.val().length==0){
                    event.preventDefault();
                    errorDiv.empty();
                    errorDiv.append('<p class="error"> Error: Please Enter Username and Password <p>')
                }
                if(!specialCharacter.test(username.val)){
                    event.preventDefault();
                    errorDiv.empty();
                    errorDiv.append('<p class="error"> Error: Username should contain only \'_\' as a special character </p>')
                }
                if(password.val().length < 8 || password.val().length > 15){
                    event.preventDefault();
                    errorDiv.empty();
                    errorDiv.append('<p class="error"> Error: Password must be minimum of 8 characters and maximum of 15 characters </p>')
                }
                if(!password.val().match(upperCaseLetters) || !password.val().match(lowerCaseLetters) || !password.val().match(numbers) || !allSpecialCharacter.test(password.val())){
                    event.preventDefault();
                    errorDiv.empty();
                    errorDiv.append('<p class="error"> Error: Password must be a combination of uppercase, lowercase, special character and a number!! </p>')
                }
            })
        }

        checkLoginForm()
    })(window.jQuery);

        // loginButton.onclick(function(event){
        //     event.preventDefault();
        //     console.log("INside function")
        //     let username = document.getElementById('username')
        //     let password = document.getElementById('password')
        //     let formerror = document.getElementById('form-error')
        //     let specialCharacter = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        //     if(specialCharacter.test(username)){
        //         console.log("ERROR HERE")
        //         formerror.show()
        //         formerror.append('Username should contain only _ as special character')
        //     }
        //     else{
        //         document.getElementById('login-form').submit()
        //     }
        // })

        // function checkLoginForm(event){
        //     event.preventDefault();
        //         console.log("INside function")
        //         let username = document.getElementById('username')
        //         let password = document.getElementById('password')
        //         let formerror = document.getElementById('form-error')
        //         let specialCharacter = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        //         if(specialCharacter.test(username)){
        //             console.log("ERROR HERE")
        //             formerror.show()
        //             formerror.append('Username should contain only _ as special character')
        //         }
        //         else{
        //             document.getElementById('login-form').submit()
        //         }
        // }
        






        










        // if(enteredPassword === undefined || enteredPassword === '' || enteredPassword === null){
        //     errorDiv.html("")
        //     errorDiv.show();
        //     errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        // }
        // else if(enteredPassword.length < 8){
        //     errorDiv.html("")
        //     errorDiv.show();
        //     errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        // }
        // else if(enteredPassword.length > 15){
        //     errorDiv.html("");
        //     errorDiv.show();
        //     errorDiv.append('**Password must be minimum of 8 characters and maximum of 15 characters!!');
        // }
        // else if(!enteredPassword.match(lowerCaseLetters) || !enteredPassword.match(upperCaseLetters) || !enteredPassword.match(numbers)){
        //     errorDiv.show();
        //     errorDiv.html("");
        //     errorDiv.append('**Password must be a combination of uppercase, lowercase and a number!!');
        // } 
        // else{
        //     errorDiv.html("")
        //     errorDiv.hide();
        // }
      






// (function () {
//     // let letter = document.getElementById("letter");
//     // let capital = document.getElementById("capital");
//     // let number = document.getElementById("number");
//     // let length = document.getElementById("length");

//     myInput.onkeyup = function() {
//         let lowerCaseLetters = /[a-z]/g;
//         let upperCaseLetters = /[A-Z]/g;
//         let numbers = /[0-9]/g;
//         let error = document.getElementById('error-message');

//         if(myInput == "") {
//             error.classList.add('hidden');
//             return ;
//         }

//         else  if(myInput.length < 8) {
//             error.classList.add('hidden');
//             return ;
//         }

//         else if(myInput.length > 15) {
//             error.classList.add('hidden');
//             return ;
//          }

//         else if(!myInput.value.match(lowerCaseLetters)){
//             error.classList.add('hidden');
//             return ;
//          }

//          else if(!myInput.value.match(upperCaseLetters)){
//             error.classList.add('hidden');
//             return ;
//          }

//          else if(!myInput.value.match(numbers)){
//             error.classList.add('hidden');
//             return ;
//          }
//          else{
//             error.classList.remove('hidden');
//             return;
//          }
//     }



//     // myInput.onfocus = function() {
//     // document.getElementById("message").style.display = "block";
//     // }

//     // myInput.onblur = function() {
//     // document.getElementById("message").style.display = "none";
//     // }

//     // myInput.onkeyup = function() {
//     // let lowerCaseLetters = /[a-z]/g;
//     // let upperCaseLetters = /[A-Z]/g;
//     // let numbers = /[0-9]/g;
//     // if(myInput.value.match(lowerCaseLetters)) {  
//     //     letter.classList.remove("invalid");
//     //     letter.classList.add("valid");
//     // } else {
//     //     letter.classList.remove("valid");
//     //     letter.classList.add("invalid");
//     // }
//     // if(myInput.value.match(upperCaseLetters)) {  
//     //     capital.classList.remove("invalid");
//     //     capital.classList.add("valid");
//     // } else {
//     //     capital.classList.remove("valid");
//     //     capital.classList.add("invalid");
//     // }
//     // if(myInput.value.match(numbers)) {  
//     //     number.classList.remove("invalid");
//     //     number.classList.add("valid");
//     // } else {
//     //     number.classList.remove("valid");
//     //     number.classList.add("invalid");
//     // }   
//     // if(myInput.value.length >= 8) {
//     //     length.classList.remove("invalid");
//     //     length.classList.add("valid");
//     // } else {
//     //     length.classList.remove("valid");
//     //     length.classList.add("invalid");
//     // }
//     // }
// })();