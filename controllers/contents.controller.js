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
        contentsProxy.insert(insertData);
        // contentsProxy.close();
    },
    select: function () {
        var result;
        contentsProxy.init();
        result = contentsProxy.select();
        // contentsProxy.close();
        return result;
    }
};

module.exports = contentController;