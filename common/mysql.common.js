var mysql = require('mysql');
var connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'passw0rd',
    database: 'cms_node_database'
});
var mysqlUtil = {
    connection: connection,
    getConnection: function() {
        this.connection.connect();
    },
    closeConnection: function() {
        this.connection.end();
    }
}

module.exports = mysqlUtil;
