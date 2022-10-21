/*
We want to preview images, so we need to register the Image Preview plugin
*/
FilePond.registerPlugin(
    // encodes the file as base64 data
    FilePondPluginFileEncode,
  
    // validates the size of the file
    FilePondPluginFileValidateSize,
  
    // corrects mobile image orientation
    FilePondPluginImageExifOrientation,
  
    // previews dropped images
    FilePondPluginImagePreview
  );
  
  // Select the file input and use create() to turn it into a pond
  let data = document.getElementsByClassName("filePond");
  
  for (let i = 0; i <= data.length - 1; i++) FilePond.create(data[i]);
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        $("#blah").attr("src", e.target.result);
      };
  
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $(document).on("click", ".clone .remove-Work", function (e) {
    $(e.target).parent().parent().remove();
  });
  
  function addMoreProjectDetails() {
    let wrapper = document.getElementById("cloneProject");
    let html = `<div class="col-md-12 d-flex justify-content-between align-items-center clone">
              <div class="col-md-5 mx-3">
               <span class="remove-Work">remove</span>
                  <div class="d-flex" id="project">
                      <div class="d-flex flex-column">
                          <div class="d-flex flex-row">
                          </div>
                          <div class="form-group">
                              <label for="ConfirmPassword">Project Title</label>
                              <input type="text" class="form-control" id="projectTitle" name="projectTitle"
                                  placeholder="">
                          </div>
                          <div class="d-flex">
                              <div class="fd-flex flex-column">
                                  <label for="ConfirmPassword">Start Date</label>
                                  <div>
                                      <input type='date' id="projectStartDate" name="projectStartDate"
                                          class="btn btn-outline-primary my-3" onchange="readURL(this);" />
                                  </div>
                              </div>
                              <div class="fd-flex pl-2 flex-column">
                                  <label for="ConfirmPassword">End Date</label>
                                  <div>
                                      <input type='date' id="projectEndDate" name="projectEndDate"
                                          class="btn btn-outline-primary my-3" onchange="readURL(this);" />
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="col-md-5 mx-3">
                  <div class="form-group">
                      <label for="ConfirmPassword">Project Description</label>
                      <textarea class="form-control" rows="5" id="projectDescription" name="projectDescription"
                          placeholder=" example textarea"></textarea>
                  </div>
              </div>
          </div>`;
    wrapper.innerHTML += html;
  }
  
  function addMoreWorkDetails() {
    let wrapper = document.getElementById("cloneWork");
    let html = `<div class="col-md-12 d-flex justify-content-between align-items-center clone">
              <div class="col-md-5 mx-3">
                  <span class="remove-Work">remove</span>
                  <div class="d-flex flex-column" id="workInformation">
                      <div class="form-group">
                          <label for="ConfirmPassword">Company Name</label>
                          <input type="text" class="form-control" id="companyName" name="companyName" placeholder="">
                      </div>
                      <div class="form-group">
                          <label for="ConfirmPassword">Job Title</label>
                          <input type="text" class="form-control" id="jobTitle" name="jobTitle" placeholder="">
                      </div>
                      <div class="form-group">
                          <label for="ConfirmPassword">Job Location</label>
                          <input type="text" class="form-control" id="location" name="location" placeholder="">
                      </div>
                  </div>
              </div>
              <div class="col-md-5 mx-3">
                  <div class="form-group">
                      <label for="ConfirmPassword">Job Description</label>
                      <textarea class="form-control" rows="5" id="projectDescription" name="projectDescription"
                          placeholder=" example textarea"></textarea>
                  </div>
              </div>
          </div>`;
    wrapper.innerHTML += html;
  }
  
