//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var testEditor;
var jQuery = Zepto;  // 为了避免修改 flowChart.js 和 sequence-diagram.js 的源码，所以想支持 flowChart / sequenceDiagram 就得加上这一句

var result;
var selectedArr = new Array();

$(document).ready(function () {
    //初始化MarkDown
    $.get("assets/markdown/test.md", function (md) {
        testEditor = editormd("test-editormd", {
            width: "100%",
            height: 720,
            path: 'assets/markdown/lib/',
            markdown: md,
            codeFold: true,
            searchReplace: true,
            saveHTMLToTextarea: true,    // 保存 HTML 到 Textarea
            //watch : false,
            htmlDecode: "style,script,iframe|on*",            // 开启 HTML 标签解析，为了安全性，默认不开启
            emoji: true,
            taskList: true,
            tocm: true,         // Using [TOCM]
            tex: true,                     // 开启科学公式 TeX 语言支持，默认关闭
            //previewCodeHighlight : false,  // 关闭预览窗口的代码高亮，默认开启
            flowChart: true,
            // sequenceDiagram: true,         // 同上
            onload: function () {
                console.log("onload =>", this, this.id, this.settings);
            }
        });
    });
    //查询联想的结果
    // result = select();
    // console.log(result.length);
    // console.log(result[0].tag);
});

/**
 * 文章发布调用
 */
$("#publish_btn").click(function () {
    console.log("点击了发布");
    var arr = new Array();
    var arrNew = new Array();
    var index = 0;
    var indexNew = 0;
    for (var i = 0; i < selectedArr.length; i++) {
        //对于新增的数据和选中历史tags数据作区分
        if (selectedArr[i].indexOf("_") > 0) {
            arrNew[indexNew] = $("#" + selectedArr[i] + " a").text();
            indexNew++;
        } else {
            arr[index] = $("#" + selectedArr[i] + " a").text();
            index++;
        }
    }
    //获取input框中的文章名
    var title = $("#article_title").val();
    var author = $("#article_author").val();
    var content = testEditor.getMarkdown();

    console.log(title);
    console.log(author);
    console.log(arrNew);
    console.log(arr);
    console.log(content);

    insert(title, arr, arrNew, author, content);
});

/**
 * 数据新增的函数
 */
function insert(title, arr, arrNew, author, content) {
    var params = {
        action: 'insert-md',
        data: {
            title: title,
            tags: {
                oldTags: arr,
                newTags: arrNew
            },
            author: author,
            content: content
        }
    };
    console.log(JSON.stringify(params));
    $.ajax({
        async: false, //禁止异步
        url: "/DCMServer/goodLuckToDd/back",
        type: "post",
        data: {
            params: JSON.stringify(params)
        },
        dataType: "json",
        success: function (json) {
            /*
            $("#message").html(json.message);
            //成功跳转
            if(json.status.toString() == '1'){
                 window.location.href="index.html";
            }
            */
            console.log("成功 >>> ");
            console.log(json);
            //ajaxFileUpload();//上传文件

            //最后，进行提示信息的展示
            new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'bottom'
                },
                theme: 'NoticeBorder',
                color: 'green',
                audio: 'assets/lib/jBox-0.3.0/Source/audio/bling2',
                volume: '100',
                stack: false,
                autoClose: 3000,
                animation: {
                    open: 'slide:bottom',
                    close: 'slide:left'
                },
                onInit: function () {
                    this.options.content = '数据保存成功！';
                }
            });
        },
        error: function (json) {
            /*
            alert(json.message);
            $("#message").html(json.message);
            */
            console.log("失败");
            console.log(json);
        }
    });
}

/**
 *维护数组函数 之 扩容
 */
function addArray(id) {
    //增加一个元素，为数组扩容
    var len = selectedArr.length;
    selectedArr[len] = id;
}

/**
 *维护数组函数 之 缩容
 */
function reduceArray(id) {
    //减少一个元素,为数组缩容
    var middleware = new Array();
    var index = 0;
    for (var i = 0; i < selectedArr.length; i++) {
        var one = selectedArr[i];
        if (one != id) {
            middleware[index] = one;
            index++;
        }
    }
    selectedArr = middleware;
}

$("#association").bind('input porpertychange', function () {
    var value = $("#association").val();
    associateSearch(value);
});

function associateSearch(value) {
    //初始化
    var flag = false;
    $("#association-div").css('display', 'none');
    $("#association-div").css('border', '1px solid #ccc');
    $("#association-div").empty();
    var ul = '<ul style="list-style-type:none;padding-left:3px;">';
    for (var i = 0; i < result.length; i++) {
        if (result[i].tag.toLocaleUpperCase().indexOf(value.toLocaleUpperCase()) >= 0) {
            ul += '<li id="' + result[i].id + '"><a href="javascript:addTag(\'' + result[i].id + '\',\'' + result[i].tag + '\');">' + result[i].tag + '</a></li>';
            flag = true;
        }
    }
    ul += '</ul>';
    $("#association-div").append($(ul));
    if (!flag) {
        var btn = '<button class="btn-primary btn" type="button" onclick="insertTag()">添加</button>';
        $("#association-div").css('border', '0');
        $("#association-div").css('display', 'block');
        $("#association-div").append($(btn));
    }
    if (flag) {
        $("#association-div").css('display', 'block');
        flag = false;
    }
}

/**
 * 新增标签
 */
function insertTag() {
    var tag = $("#association").val();
    var id = uuid();
    var li = '<li id="selected' + id + '"><a href="javascript:delTag(\'' + id + '\');">' + tag + '<i class="icon_close_alt bs_ttip"></i></a></li>';
    $("#select_tags").append($(li));
    addArray("selected" + id);
}

/**
 * 添加标签
 */
function addTag(id, tag) {
    console.log(id);
    console.log(tag);
    var li = '<li id="selected' + id + '"><a href="javascript:delTag(\'' + id + '\');">' + tag + '<i class="icon_close_alt bs_ttip"></i></a></li>';
    $("#select_tags").append($(li));
    addArray("selected" + id);
}

/**
 * 删除标签
 */
function delTag(id) {
    console.log(id);
    $("#selected" + id + "").remove();
    reduceArray("selected" + id);
}

function select() {
    //组装传输对象
    var loginInfoValue = new Object();
    var params = {
        action: 'select-tag',
        data: ""
    };
    var res;
    //AJAX请求
    $.ajax({
        async: false, //禁止异步
        url: "/DCMServer/goodLuckToDd/back",
        type: "post",
        data: {
            params: JSON.stringify(params)
        },
        dataType: "json",
        success: function (json) {
            /*
            $("#message").html(json.message);
            //成功跳转
            if(json.status.toString() == '1'){
                 window.location.href="index.html";
            }
            */
            console.log("成功 >>> ");
            console.log(json);
            res = json;
        },
        error: function (json) {
            /*
            alert(json.message);
            $("#message").html(json.message);
            */
            console.log("失败");
            console.log(json);
            res = json;
        }
    });
    return res;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "_";
    var uuid = s.join("");
    return uuid;
}
