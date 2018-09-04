var mysqlUtil = require('../common/mysql.common');

/*
menu表的CRUD操作.
 */
var menu = {
    table_name: "menu",
    init: function () {
        mysqlUtil.getConnection();
    },
    select: function () {
        var _sql = "SELECT * FROM " + this.table_name + "";
        mysqlUtil.connection.query(_sql, function (err, rows, fields) {
            if (err) throw err;
            console.log('The result is: ', rows);
            return rows;
        });
    },
    insert: function (insertData) {
        var _sql = 'INSERT INTO ' + this.table_name + '(menu_json,status) VALUES(?,?,?,?)';
        mysqlUtil.connection.query(_sql, insertData, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            console.log('INSERT ID:', result);
        });
    },
    update: function (updateData) {
        var _sql = 'UPDATE ' + this.table_name + ' SET menu_json=?,status=? WHERE id = ?';
        mysqlUtil.connection.query(_sql, updateData, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            console.log('UPDATE affectedRows', result.affectedRows);
        });
    },
    delete: function (deleteData) {
        var _sql = 'DELETE FROM ' + this.table_name + ' WHERE id = ?';
        mysqlUtil.connection.query(_sql, deleteData, function (err, result) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return;
            }
            console.log('DELETE affectedRows', result.affectedRows);
        });
    },
    close: function () {
        mysqlUtil.closeConnection();
    }
};

module.exports = menu;