var express = require('express');
var contentController = require('../controllers/contents.controller');
var router = express.Router();

//后端接口 开始
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('html/content_list', { title: 'Express' });
});
router.post('/', function (req, res) {
    console.log(">>>>>>>");
    console.log("req.body.params: ", req.body.params);
    var paramData = req.body.params;
    var paramDataJson = JSON.parse(paramData);
    var sign = paramDataJson.action;
    var data = paramDataJson.data;
    switch (sign) {
        case "select":
            contentController.select(function (r) {
                res.send(r);
            });
            break;
        case "selectdeleted":
            contentController.selectDeletedData(function (r) {
                res.send(r);
            });
            break;
        case "selectvalid":
            contentController.selectValidData(function (r) {
                res.send(r);
            });
            break;
        case "update":
            contentController.update(data);
            res.send({status: 1});
            break;
        case "delete":
            contentController.delete(data);
            res.send({status: 1});
            break;
    }
});
//后端接口 结束

//前端接口 开始
router.get('/getContentData', function (req, res) {
    contentController.selectValidData(function (r) {
        res.jsonp(r);
    });
});
router.get('/getOneContentData', function (req, res) {
    console.log("获取req参数:",req);
    var paramData = req.query.contId;
    var paramArr = [];
    paramArr.push(paramData);
    contentController.selectOneValidData(function (r) {
        res.jsonp(r);
    }, paramArr);
});
//前端接口 结束

module.exports = router;