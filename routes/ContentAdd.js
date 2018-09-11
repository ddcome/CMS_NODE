var express = require('express');
var contentController = require('../controllers/contents.controller');
var router = express.Router();

router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('html/content_add', { title: 'Express' });
});

router.post('/', function (req, res) {
    //1.get param data from client
    var paramData = req.body.params;
    var paramDataJson = JSON.parse(paramData);
    console.log("paramDataJson >>> ");
    console.log(paramDataJson);
    //2.send data to controller
    contentController.insert(paramDataJson);
    res.send({});
});

module.exports = router;