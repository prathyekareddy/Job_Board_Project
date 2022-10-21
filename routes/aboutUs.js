const express = require('express');
const router = express.Router();

router.get('/', async function(request, response) {
	response.render("general/aboutUs", {
        title: "STEMConnect",
        auth: request.session.au,
        listingType: "Resume",
        notLoginPage: true,
      });
});

module.exports = router;