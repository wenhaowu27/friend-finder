var express = require('express');
var path = require('path');
var router = express.Router();
var path = require('path')

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../public/home.html'))
});

//add page html route
router.get('/survey',function(req,res){
    res.sendFile(path.join(__dirname,'../public/survey.html'))
});

module.exports = router;