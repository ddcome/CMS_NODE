var express = require('express');
var uploadController = require('../controllers/upload.controller');
var upload = require('multer')({ dest: 'uploads/' });
var router = express.Router();

// GET请求
router.get('/', function(req, res, next) {
    res.render('html/upload_pic', { title: 'Express' });
    // 下载文件
    // res.sendFile("/Users/lixiaodong/WebstormProjects/CMS_NODE/uploads/5ec0faa46076ad80d4cf72daf2d5aaca");
});

// POST请求
router.post("/", upload.single('files'), function (req, res) {
    res.json({code: 200, filePath: 'http://' + req.headers.host +"/uploadPic/"+ req.file.path});
});

module.exports = router;