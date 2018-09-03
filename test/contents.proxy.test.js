var contents = require('../proxy/contents.proxy');
var insertData = [1, "demo insert data",'2018-9-2', 1, "富文本", "标题", "小标题", 0];
// contents.insert(insertData);
// contents.select();
contents.delete([1]);
contents.select();
contents.close();