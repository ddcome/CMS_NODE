var aceEditor;
/**
 * 初始化ace editor.
 */
function initAceEditor() {
    // ace editor
    aceEditor = ace.edit("aceEditor");
    //设置编辑器样式，对应theme-*.js文件
    aceEditor.setTheme("ace/theme/chrome");
    //设置代码语言，对应mode-*.js文件
    aceEditor.session.setMode("ace/mode/javascript");
    //设置打印线是否显示
    aceEditor.setShowPrintMargin(false);
    //设置是否只读
    aceEditor.setReadOnly(false);

    //以下部分是设置输入代码提示的，如果不需要可以不用引用ext-language_tools.js
    ace.require("ace/ext/language_tools");
    aceEditor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true
    });
}

$(function () {
    initAceEditor();
    findMenu();

    // footable
    yukon_footable.p_plugins_tables_footable();
})

/**
 * 获取ace editor数据.
 */
function getAceEditorData() {
    return aceEditor.getValue();
}

function findMenu() {
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
            console.log(json);
            aceEditor.setValue(json[json.length-1].menu_json);
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

$("#save").click(function () {
    var menuJson = getAceEditorData();
    var params = {
        action: 'insert',
        data: {
            menuJson: menuJson,
            createTime: moment().format('YYYY-MM-DD HH:mm:ss')
        }
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
                    this.options.content = '配置保存成功！';
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
                    this.options.content = '配置保存失败！';
                }
            });
        }
    });
});

function recover() {

}

//替换所有的回车换行
function TransferString(content) {
    var string = content;
    try{
        string=string.replace(/\r\n/g,"");
        string=string.replace(/\n/g,"");
        string=string.replace(/[\\]/g,"");
        string=string.replace(/\ /g,"");
    }catch(e) {
        console.log(e.message);
    }
    return string;
}