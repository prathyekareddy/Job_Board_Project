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

    let email = $('#email');
    email.keyup(function(){
        let errorDiv = $('#error-email');
        let validformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let enteredEmail = email.val().trim();
        if(enteredEmail === undefined || enteredEmail === '' || enteredEmail === null){
            errorDiv.html("")
            errorDiv.show();
            errorDiv.append('**Please enter the Email');
        }
        else if(!validformat.test(enteredEmail)){
            errorDiv.html("")
            errorDiv.show();
            errorDiv.append('**Please enter a valid Email');
        }
        else{
            errorDiv.html("");
            errorDiv.hide();
        }
    })

    let loginForm = $("#signup-form")
    function checkLoginForm(){
        
        loginForm.submit(function(event){
            let username = $("#username")
            let email = $("#email")
            let errorDiv = $("#error-form")
            let specialCharacter = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
            let validformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(username.val().trim().length ==0 || email.val().length==0){
                event.preventDefault();
                errorDiv.empty();
                errorDiv.append('<p class="error"> Error: Please Enter Username and Email <p>')
                username.focus();
                return
            }
            else if(specialCharacter.test(username.val())){
                event.preventDefault();
                errorDiv.empty();
                errorDiv.append('<p class="error"> Error: Username should contain only \'_\' as a special character </p>')
                username.focus();
                return
            }
            else if(!validformat.test(email.val())){
                event.preventDefault();
                errorDiv.empty();
                errorDiv.append('<p class="error"> Error: Please enter a valid Email </p>')
                email.focus();
                return
            }else{
                errorDiv.empty();
            }
            
        })
    }

    checkLoginForm()
})(window.jQuery);
