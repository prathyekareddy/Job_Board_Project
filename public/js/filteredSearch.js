(function($) {
    var yearsExpSlider = $('#yearsExpSlider');
    var yearsExpInput = $('#yearsExpInput');
    var minSalarySlider = $('#minSalarySlider');
    var minSalaryInput = $('#minSalaryInput');
    var projectNumberSlider = $('#projectNumberSlider');
    var projectNumberInput = $('#projectNumberInput');
    
    var categoryInput = $('#categoryLookUp');

    var skillsInput = $('#skillsLookUp');
    var skillsList = $('#skillsLookUp');
    var selectedSkills = $('#insertedSkills');
    var skillsDiv = $('#skillsList');
    var form = $('#filteredSearchForm');
    
    var revealMinimumSalary = $('#revealMinSalary');
    var removeMinimumSalary = $('#removeMinSalary');
    var minSalaryFilter = $('#minimumSalaryFilter');

    var revealJobCategory = $('#revealCategory');
    var removeJobCategory = $('#removeCategory');
    var jobCategoryFilter = $('#categoryInputFilter')

    var jobCategoryBool = false;
    var minSalaryBool = false;


    function linkSliderAndInput(slider, input){
        slider.val(0);
        input.val(slider.val());
        slider.on("input", function(){
            input.val($(this).val());
        });
        input.change(function(){
            slider.val($(this).val()); 
        });
    }

    categoryInput.autocomplete({
        source: getJobCategories(),
        minLength: 1,
    });

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

    function optionalFilterReveal(reveal, remove, filter, inputArray, bool){
        for(input of inputArray){
            input.prop("disabled", true);
        }
        filter.css("display","none");
        reveal.click(function(){
            filter.css("display", "block");
            for(input of inputArray){
                input.prop("disabled", false);
            }
            reveal.css("display", "none");
            bool = true;
        });

        remove.click(function(){
            filter.css("display", "none");
            for(input of inputArray){
                input.prop("disabled", true);
            }
            reveal.css("display", "block");
            bool = false;
        });
    }



    linkSliderAndInput(yearsExpSlider, yearsExpInput);
    linkSliderAndInput(minSalarySlider, minSalaryInput);
    linkSliderAndInput(projectNumberSlider, projectNumberInput);
    skillsAddition();
    optionalFilterReveal(revealMinimumSalary, removeMinimumSalary, minSalaryFilter, [minSalarySlider, minSalaryInput], minSalaryBool);
    optionalFilterReveal(revealJobCategory, removeJobCategory, jobCategoryFilter, [categoryInput], jobCategoryBool);

    if($('#searchResultsExists li').length > 0){
        $('#searchResults').prepend("<h2>Results</h2>");
    };

    form.submit(function(e){
        
        if(selectedSkills.children().length == 0 && (minSalaryBool || jobCategoryBool)){
            e.preventDefault();
            console.log('her');
            $('#filteredSearchBarErrorState').empty();
            $('#filteredSearchBarErrorState').append('<p class="validationMessage"> Error: Need minimum of 1 additional filter to use the filtered search!</p>')
        }else if(categoryInput.length && !getJobCategories().includes(categoryInput.val())){
            e.preventDefault();
            console.log('test');
            $('#filteredSearchBarErrorState').empty();
            $('#filteredSearchBarErrorState').append('<p class="validationMessage"> Error: Must use a valid category when searching!</p>')
        }
         else{
            $('#homeSearchBarErrorState').empty();
            if (yearsExpInput) yearsExpInput.prop('disabled', true);
            if (minSalaryInput) minSalaryInput.prop('disabled', true);
            skillsInput.prop('disabled', true);
            if (projectNumberInput) projectNumberInput.prop('disabled', true);
        
        }
    });
    

})(window.jQuery);