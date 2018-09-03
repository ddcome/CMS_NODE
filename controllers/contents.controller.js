var mysqlUtil = require('../common/mysql.common');
mysqlUtil.getConnection();


var contents = {
    contentsList: function () {
        mysqlUtil.connection.query('SELECT * FROM contents', function(err, rows, fields) {
            if (err) throw err;
            console.log('The solution is: ', rows[0]);
        });
        mysqlUtil.closeConnection();
    },
    contentAdd: function () {

    }
}

module.exports = contents;