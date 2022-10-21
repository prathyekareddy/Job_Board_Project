function searchToggle(){
    var general = $('#searchBar');
    var filter = $('#filteredSearch');

    var button = $('#filteredSearchReveal');
    
    if(filter.css("display") != 'none'){
        filter.css("display", "none");
        general.css("display", "block");
        button.prop("value", "Use Filtered Search");
    } else{
        filter.css("display", "block");
        general.css("display", "none");
        button.prop("value", "Use General Search");
    }
};

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
        "Agile Development",
        "R",
        "AJAX",
        "Ruby",
        "PHP",
        "PostgreSQL",
        "Git",
        "Version Control",
        "Unix",
        "AWS",
        "Redis",
        "web dev",
        "Go"
    ];
};

function getJobCategories(){
    return [
        "",
        "web dev",
        "IT",
        "Developer",
        "Analyst",
        "Manager",
        "Project Manager",
        "Designer",
        "Engingeer",
        "Software Architect",
        "Technical Architect",
        "Mechanical Engineer",
        "Electrical Engineer",
        "Biomedical Engineer",
        "Computer Engineer",
        "Security Analyst",
        "Data Scientist",
        "Civil Engineer",
        "Front-End Developer",
        "Back-End Developer",
        "Full Stack Developer",
        "Software Engineer",
        "System Analyst",
        "Database Administrator",
        "Cloud Systems Engineer"
    ];
};
    



