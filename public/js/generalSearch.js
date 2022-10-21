(function($) {

    function generalSearchBehavior(){
        var searchBar = $("#homeSearchBar");
        var form = $("#landingSearch");
        var checkbox = $("#userTypeToggle");
        var userType = $("#getUserType");

        checkbox.on("click", function(){
            if(checkbox.prop('checked') == true){
                userType.empty();
                userType.css("margin-right", "5px");
                userType.append("Company");
            }else{
                userType.empty();
                userType.css("margin-right", "39px");
                userType.append("User");
            }
        });  

        form.submit(function(e){
            if(searchBar.val().length < 1){
                e.preventDefault();
                $('#homeSearchBarErrorState').empty();
                $('#homeSearchBarErrorState').append('<p class="validationMessage"> Error: Type in a name to search for a user or company?</p>');
            } else{
                $('#homeSearchBarErrorState').empty();
                if(checkbox.prop(('checked'))) $('#hiddenInput').prop("disabled", true);
                $('#searchResults').prepend("<h2>Results</h2>");
            }
        })

        searchBar.on('keyup', function(e){
            e.preventDefault();
            var searchEntry = $(this).val().trim();

            if (searchEntry.length > 2) {
                var path = "";
                if(checkbox.prop('checked')){
                    path = 'autoCompleteCompany';
                } else{
                    path = 'autoCompleteUser';
                }
                
                var requestConfig = {
                    method: 'POST',
                    url: '/search/' + path,
                    contentType: 'application/json',
                    data: JSON.stringify({
                        namePartial: searchEntry
                    })
                }
            
                $.ajax(requestConfig).then(function(responseMessage) {
                    if(responseMessage.type == "user"){
                        var userList = responseMessage.match;
                        var list = [];
                        for (user of userList){
                            list.push({label: user.name.fullName, value:'/profile/user/' + user._id})
                        }
                                    
                        searchBar.autocomplete({
                            source: list,
                            minLength: 2,
                            select: function(event, ui){
                                window.location.href = ui.item.value;
                                return false;
                            }
                        });
                    } else if(responseMessage.type == "company"){
                        var companyList = responseMessage.match;
                        var list = [];
                        for (company of companyList){
                            list.push({label: company.companyName, value:'/profile/company/' + company._id})
                        }

                        searchBar.autocomplete({
                            source: list,
                            minLength: 2,
                            select: function(event, ui){
                                window.location.href = ui.item.value;
                                return false;
                            }
                        });
                    }
                });
                
            }
        });
    }



    generalSearchBehavior();
})(window.jQuery);

