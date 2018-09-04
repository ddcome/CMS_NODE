var express = require('express');
var contentController = require('../controllers/contents.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('html/content_list', { title: 'Express' });
});
router.post('/', function (req, res) {
    //1.get param data from client
    var paramData = req.body.params;
    var paramDataJson = JSON.parse(paramData);
    var sign = paramDataJson.action;
    switch (sign) {
        case "select":
            contentController.select(function (r) {
                res.send(r);
            });
            break;
    }
});
module.exports = router;