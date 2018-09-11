var mysqlUtil = require('../common/mysql.common');
mysqlUtil.getConnection();

/*
contents表的CRUD操作.
 */
var contents = {
    table_name: "contents",
    select: function (callback) {
        var _sql = "SELECT * FROM " + this.table_name + " ORDER BY id DESC";
        mysqlUtil.connection.query(_sql, function (err, rows, fields) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            var _r = JSON.parse(JSON.stringify(rows));
            callback(_r);
        });
    },
    selectOne: function (callback, selectData) {
        var _sql = "SELECT * FROM " + this.table_name + " WHERE id=?";
        mysqlUtil.connection.query(_sql, selectData, function (err, rows, fields) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            var _r = JSON.parse(JSON.stringify(rows));
            callback(_r);
        });
    },
    selectValidData: function (callback) {
        var _sql = "SELECT * FROM " + this.table_name + " WHERE status=1 ORDER BY id DESC";
        mysqlUtil.connection.query(_sql, function (err, rows, fields) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            var _r = JSON.parse(JSON.stringify(rows));
            callback(_r);
        });
    },
    selectDeletedData: function (callback) {
        var _sql = "SELECT * FROM " + this.table_name + " WHERE status=0 ORDER BY id DESC";
        mysqlUtil.connection.query(_sql, function (err, rows, fields) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            var _r = JSON.parse(JSON.stringify(rows));
            callback(_r);
        });
    },
    selectOneValidData: function (callback, selectData) {
        var _sql = "SELECT * FROM " + this.table_name + " WHERE status=1 AND id=?";
        mysqlUtil.connection.query(_sql, selectData, function (err, rows, fields) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            var _r = JSON.parse(JSON.stringify(rows));
            callback(_r);
        });
    },
    insert: function (insertData) {
        var _sql = 'INSERT INTO ' + this.table_name + '(menu_id,content,time,author_id,type,title,small_title,status) VALUES(?,?,?,?,?,?,?,?)';
        mysqlUtil.connection.query(_sql, insertData, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
            // if (err) throw err;
            console.log('INSERT ID:', result);
        });
    },
    update: function (updateData) {
        var _sql = 'UPDATE ' + this.table_name + ' SET menu_id=?,content=?,time=?,author_id=?,type=?,title=?,small_title=? WHERE id = ?';
        mysqlUtil.connection.query(_sql, updateData, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            console.log('UPDATE affectedRows', result.affectedRows);
        });
    },
    //逻辑删除
    delete: function (deleteData) {
        var _sql = 'UPDATE ' + this.table_name + ' SET status=0 WHERE id=?';
        mysqlUtil.connection.query(_sql, deleteData, function (err, result) {
            if (err) {
                console.log('[UPDATE ERROR] - ', err.message);
                return;
            }
            console.log('UPDATE affectedRows', result.affectedRows);
        });
    },
    //物理删除
    deleteReal: function (deleteData) {
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

module.exports = contents;