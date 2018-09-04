var menuProxy = require("../proxy/menu.proxy");

var menuController = {
    insert: function (param) {
        //处理数据成为SQL接受的数据格式.
        var insertData = [];
        insertData.push(param.data.menuJson);
        insertData.push(1);
        menuProxy.insert(insertData);
        // menuProxy.close();
    },
    select: function (callback) {
        menuProxy.select(callback);
    }
};

module.exports = menuController;