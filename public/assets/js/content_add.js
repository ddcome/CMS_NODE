//实例化编辑器
//建议使用工厂方法getEditor创建和引用编辑器实例，如果在某个闭包下引用该编辑器，直接调用UE.getEditor('editor')就能拿到相关的实例
var ue = UE.getEditor('editor');

var result;
var selectedArr = new Array();

/**
 * 文章发布调用
 */
$("#publish_btn").click(function () {
    console.log("点击了发布");


    //获取input框中的文章名
    var title = $("#content_title").val();
    var smallTitle = $("#content_small_title").val();
    var menuId = 1;//$("#menu_id").val()
    var authorId = 1;
    var content = UE.getEditor('editor').getContent();

    console.log(title);
    console.log(smallTitle);
    console.log(menuId);
    console.log(authorId);
    console.log(content);

    insertUeditorContent(title, smallTitle, menuId, authorId, content);
});

function clearContentInput() {
    $("#content_title").val("");
    $("#content_small_title").val("");
    UE.getEditor('editor').setContent("");
}

/**
 * 数据新增的函数
 */
function insertUeditorContent(title, smallTitle, menuId, authorId, content) {

    var params = {
        action: 'insert',
        data: {
            title: title,
            smallTitle: smallTitle,
            menuId: menuId,
            type: "富文本",
            authorId: authorId,
            content: content,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        }
    };
    console.log(JSON.stringify(params));
    $.ajax({
        async: false, //禁止异步
        url: "/ContentAdd",
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

            //采用跳转清除数据
            clearContentInput();
        },
        error: function (json) {
            /*
            alert(json.message);
            $("#message").html(json.message);
            */
            console.log("失败");
            console.log(json);
            //最后，进行提示信息的展示
            new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'bottom'
                },
                theme: 'NoticeBorder',
                color: 'green',
                volume: '100',
                stack: false,
                autoClose: 3000,
                animation: {
                    open: 'slide:bottom',
                    close: 'slide:left'
                },
                onInit: function () {
                    this.options.content = '数据保存失败！';
                }
            });
        }
    });
}

function initContentAddPage() {
    var oneContentTempData;
    if (localStorage.getItem("oneContentTempData")) {

        oneContentTempData = JSON.parse(MainUtil.base64_decode(localStorage.getItem("oneContentTempData")));

        console.log(oneContentTempData.content);

        //设置修改页面的对应html内容.
        $("#contentDivTitle").text("修改内容");
        $("#saveContentBtnDiv").css("display", "none");
        $("#updateContentBtnDiv").css("display", "block");
        $("#content_title").val(oneContentTempData.title);
        $("#content_small_title").val(oneContentTempData.small_title);
        UE.getEditor('editor').ready(function() {
            UE.getEditor('editor').setContent(oneContentTempData.content);
        });

        //绑定click事件
        $("#updateContentBtn").click(function () {
            var title = $("#content_title").val();
            var smallTitle = $("#content_small_title").val();
            var menuId = 1;//$("#menu_id").val()
            var authorId = 1;
            var content = UE.getEditor('editor').getContent();
            var time = moment().format('YYYY-MM-DD HH:mm:ss');
            var type = "富文本";

            var p = new CMSParams();
            p.setParams(ActionEnums.UPDATE, {
                "id": oneContentTempData.id,
                "menuId": menuId,
                "content": content,
                "time": time,
                "authorId": authorId,
                "type": type,
                "title": title,
                "smallTitle": smallTitle
            });
            console.log("p.getParams(): ", p.getParams());
            $.ajax({
                async: true,
                url: "/contentList",
                type: "post",
                data: {
                    params: JSON.stringify(p.getParams())
                },
                dataType: "json",
                success: function (json) {
                    //传值结束，清除localStorage数据.
                    localStorage.removeItem("oneContentTempData");
                    //跳转
                    window.location.href="/contentList";
                },
                error: function (json) {
                    MainUtil.showModel("更新失败！");
                }
            });
        });
        $("#backContentBtn").click(function () {
            window.location.href = "/contentList";
        });
    }
}

$(document).ready(function () {
    initContentAddPage();

    //查询联想的结果
    // result = select();
    // console.log(result.length);
    // console.log(result[0].tag);
    selectMenuData();
});

/**
 * 渲染menu_div
 */
function selectMenuData() {
    var menuArr = [];

    var params = {
        action: 'select',
        data: {}
    };

    $.ajax({
        async: true,
        url: "/menuConfiguration",
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
            // console.log(json);

            // console.log(json[json.length-1].menu_json);
            console.log(MainUtil.transferString(json[json.length-1].menu_json).substring(0, json[json.length-1].menu_json.length-1));

            var tes = '[{"menuId":"1","menuNameCn":"关于我们","menuNameEn":"about","menuIconClass":"","hasChild":false,"child":[]}]'

            var menuArrTemp = JSON.parse(
                MainUtil.transferString(json[json.length-1].menu_json)
            );

            console.log(menuArrTemp);
            $("#menu_div").empty();
            var cont = '';
            for (var i=0; i<menuArrTemp.length; i++) {
                cont += '<option value="'+menuArrTemp[i].menuId+'">'+menuArrTemp[i].menuNameCn+'</option>';
            }
            $("#menu_div").append($(cont));


            //ajaxFileUpload();//上传文件

            //最后，进行提示信息的展示
            new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'bottom'
                },
                theme: 'NoticeBorder',
                color: 'green',
                volume: '100',
                stack: false,
                autoClose: 3000,
                animation: {
                    open: 'slide:bottom',
                    close: 'slide:left'
                },
                onInit: function () {
                    this.options.content = '菜单配置数据加载成功！';
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
            //最后，进行提示信息的展示
            new jBox('Notice', {
                attributes: {
                    x: 'right',
                    y: 'bottom'
                },
                theme: 'NoticeBorder',
                color: 'green',
                volume: '100',
                stack: false,
                autoClose: 3000,
                animation: {
                    open: 'slide:bottom',
                    close: 'slide:left'
                },
                onInit: function () {
                    this.options.content = '菜单配置数据加载失败！';
                }
            });
        }
    });
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

