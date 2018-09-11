$(function () {
    // footable
    yukon_footable.p_plugins_tables_footable();
})

/*
全局变量区域
*/
var _data;

function paged() {
    $("#my-page").empty();
    var cont = '';
    cont += '<li class="footable-page-arrow"><a href="javascript:getPage(' + minPageNum + ');">F</a></li>';
    for (var i = currentMinNum; i <= currentMaxNum; i++) {
        cont += '<li class="footable-page';
        if (i == currentPageNum) {
            cont += ' active"><a class="active" href="javascript:getPage(' + i + ');">' + i + '</a></li>';
        } else {
            cont += '"><a href="javascript:getPage(' + i + ');">' + i + '</a></li>';
        }
    }
    cont += '<li class="footable-page-arrow"><a href="javascript:getPage(' + maxPageNum + ');">L</a></li>';
    cont += '<li><a>共' + dataSum + '条</a></li>';
    $("#my-page").append($(cont));
}

function getPage(currentP) {
    changePage(currentP);
    paged();
    addCont(_data);
    printPageInfo();
}

function initP(data, num) {
    initPage(data, num);
    paged();
}

function findContent(status) {
    var res;
    var p = new CMSParams();
    if (status === 0) {
        p.setParams(ActionEnums.SELECTDELETED, {});
    } else if (status === 1) {
        p.setParams(ActionEnums.SELECTVALID, {});
    }

    $.ajax({
        async: false, //禁止异步
        url: "/contentList",
        type: "post",
        data: {
            params: JSON.stringify(p.getParams())
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
            MainUtil.showModel("数据加载成功！");
            res = json;
        },
        error: function (json) {
            MainUtil.showModel("数据加载失败！");
        }
    });
    return res;
}

function addCont(res) {
    $("#art_cont").empty();
    var cont = '';
    var indexMin = (currentPageNum - 1) * everyPageTotal;
    var indexMax = ((currentPageNum - 1) * everyPageTotal + everyPageTotal) >= dataSum ? dataSum : ((currentPageNum - 1) * everyPageTotal + everyPageTotal);

    for (var i = indexMin; i < indexMax; i++) {
        cont += '' +
            '<tr>' +
            '<td>' + MainUtil.beautyText(res[i].title) + '</td>' +
            '<td>' + MainUtil.beautyText(res[i].author) + '</td>' +
            '<td>' + MainUtil.beautyText(res[i].menu_id) + '</td>' +
            '<td>' + MainUtil.beautyText(res[i].type) + '</td>' +
            '<td>' + MainUtil.beautyText(res[i].time) + '</td>' +
            '<td data-value="1"><span class="'+  (res[i].status == 1 ? 'label label-success status-active' : 'label label-default') +'" title="Active">' + (res[i].status == 1 ? '有效' : '已删除') + '</span></td>' +
            '<td data-value="2">' +
            '<a href="javascript:edit(\' ' + MainUtil.base64_encode(JSON.stringify(res[i])) + '\');"><span class="label label-default status-disabled" title="编辑">编辑</span></a>' +
            '<a href="javascript:remove(' + res[i].id + ');"><span class="label label-default status-disabled" title="删除">删除</span></a>' +
            '</td>' +
            '</tr>' +
            '';
    }
    $("#art_cont").append($(cont));
}

/**
 *页面加载需要执行的操作
 */
$(function() {
    reload(1);
});

function reload(status) {
    var res = findContent(status);
    _data = res;
    initP(res,12);
    //2.加载数据到页面
    addCont(res);
    paged();
}

/**
 * 删除数据.
 * @param str
 */
function remove(str) {
    var p = new CMSParams();
    p.setParams(ActionEnums.DELETE, {
        "id": str
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
            //成功跳转
            // if(json.status.toString() == '1'){
            //      window.location.href="/contentList";
            // }
            MainUtil.showModel("删除成功！");
            reload(1);
        },
        error: function (json) {
            MainUtil.showModel("删除失败！");
        }
    });
}

function edit(objStr) {
    //传递obj
    localStorage.setItem("oneContentTempData", objStr);
    //跳转到编辑页面
    window.location.href = "/contentAdd";
}

document.getElementById("statusBarDivClick").onclick = function (e) {
    var _child = document.getElementById("statusBarDivClick").children;
    for(var i=0; i<_child.length; i++) {
        _child[i].setAttribute("class","list-group-item");
    }
    var _statusBarName = e.target.innerText;
    switch (_statusBarName) {
        case "所有内容":
            e.target.className = "active list-group-item";
            reload(1);
            break;
        case "已删除":
            e.target.className = "active list-group-item";
            reload(0);
            break;
        default:
            break;
    }
};