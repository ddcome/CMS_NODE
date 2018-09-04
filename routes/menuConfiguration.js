var express = require('express');
var menuController = require('../controllers/menu.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('html/menu_configuration', { title: 'Express' });
});
// POST method route
router.post('/', function (req, res) {
    //1.get param data from client
    var paramData = req.body.params;
    var paramDataJson = JSON.parse(paramData);
    var sign = paramDataJson.action;
    console.log("action是： ", sign);
    switch (sign) {
        case "select":
            menuController.select(function (r) {
                res.send(r);
            });
            break;
        case "insert":
            //2.send data to controller
            menuController.insert(paramDataJson);
            res.send({});
            break;
    }
});

module.exports = router;