const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('general/landing', { title: "STEMConnect" , auth: req.session.authenticated,  notLoginPage:true, username: req.session.username});
    
  });




module.exports = router;