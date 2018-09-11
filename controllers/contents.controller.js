var contentsProxy = require("../proxy/contents.proxy");

var contentController = {
    insert: function (param) {
        //处理数据成为SQL接受的数据格式.
        var insertData = [];
        //数据顺序menu_id,content,time,author_id,type,title,small_title,status
        insertData.push(param.data.menuId);
        insertData.push(param.data.content);
        insertData.push(param.data.time);
        insertData.push(param.data.authorId);
        insertData.push(param.data.type);
        insertData.push(param.data.title);
        insertData.push(param.data.smallTitle);
        insertData.push(1);
        console.log("> insertData: ", insertData);
        contentsProxy.insert(insertData);
        // contentsProxy.close();
    },
    delete: function (data) {
        //处理数据成为SQL接受的数据格式.
        var deleteData = [];
        deleteData.push(data.id);
        contentsProxy.delete(deleteData);
    },
    update: function (param) {
        var updateData = [];
        updateData.push(param.menuId);
        updateData.push(param.content);
        updateData.push(param.time);
        updateData.push(param.authorId);
        updateData.push(param.type);
        updateData.push(param.title);
        updateData.push(param.smallTitle);
        updateData.push(param.id);
        console.log("> updateData: ", updateData);
        contentsProxy.update(updateData);
    },
    select: function (callback) {
        contentsProxy.select(callback);
    },
    selectOne: function (callback, selectData) {
        contentsProxy.selectOne(callback, selectData);
    },
    selectDeletedData: function (callback) {
        contentsProxy.selectDeletedData(callback);
    },
    selectValidData: function (callback) {
        contentsProxy.selectValidData(callback);
    },
    selectOneValidData: function (callback, selectData) {
        contentsProxy.selectOneValidData(callback, selectData);
    }
};

module.exports = contentController;