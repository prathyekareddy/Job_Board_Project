
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#blah').attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }

    let i = 0;
    let projectCount = 99; 
    let workCount = 999; 
    let jobDetailsCount = 10000;

    function getiValue(){
        return i;
    }
 

     
