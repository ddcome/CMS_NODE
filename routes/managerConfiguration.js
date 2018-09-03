var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.send('respond with a resource');
    res.render('html/manager_configuration', { title: 'Express' });
});

module.exports = router;