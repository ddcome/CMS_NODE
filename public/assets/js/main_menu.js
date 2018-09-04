$(function () {
    var mainMenu = "";
    // mainMenu = '<div class="menu_wrapper" onclick="renderMainMenu(event)">' +
    //     '     <ul>' +
    //     '         <li class="first_level">' +
    //     '             <a href="/">' +
    //     '                 <span class="icon_house_alt first_level_icon"></span>' +
    //     '                 <span class="menu-title">首页</span>' +
    //     '             </a>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_group first_level_icon"></span>' +
    //     '                 <span class="menu-title">用户管理</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li><a href="manager_all.html">系统管理员</a></li>' +
    //     '                 <li><a href="manager_configuration.html">当前用户设置</a></li>' +
    //     '                 <li><a href="user_all.html">用户管理</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_pencil_alt first_level_icon"></span>' +
    //     '                 <span class="menu-title">内容管理</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Pages</li>' +
    //     '                 <li><a href="content_add.html">新增内容</a></li>' +
    //     '                 <li><a href="content_list.html">内容列表</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_pens_alt first_level_icon"></span>' +
    //     '                 <span class="menu-title">MarkDown笔记管理</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Pages</li>' +
    //     '                 <li><a href="/markdownAdd">新增MarkDown笔记</a></li>' +
    //     '                 <li><a href="/markdownList">MarkDown笔记列表</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_document first_level_icon"></span>' +
    //     '                 <span class="menu-title">PDF文件发布</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Components</li>' +
    //     '                 <li><a href="upload_pdf.html">发布</a></li>' +
    //     '                 <li><a href="pdfile_list.html">PDF文件列表</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_comment first_level_icon"></span>' +
    //     '                 <span class="menu-title">评论管理</span>' +
    //     '                 <span class="label label-danger">6</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Plugins</li>' +
    //     '                 <li><a href="comment_unchecked.html">回复评论(6)</a></li>' +
    //     '                 <li><a href="comment_list.html">所有评论</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="icon_tools first_level_icon"></span>' +
    //     '                 <span class="menu-title">其他设置</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Plugins</li>' +
    //     '                 <li><a href="author_setting.html">关于作者</a></li>' +
    //     '                 <li><a href="people_test.html">公测设置</a></li>' +
    //     '                 <li><a href="books_list.html">读书管理</a></li>' +
    //     '                 <li><a href="words_list.html">语录管理</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '         <li class="first_level has_submenu">' +
    //     '             <a href="javascript:void(0)">' +
    //     '                 <span class="first_level_icon icon_menu-circle_alt2"></span>' +
    //     '                 <span class="menu-title">扩展</span>' +
    //     '             </a>' +
    //     '             <ul>' +
    //     '                 <li class="submenu-title">Sub menu</li>' +
    //     '                 <li><a href="javascript:void(0)">01. Lorem ipsum</a></li>' +
    //     '                 <li class="has_submenu">' +
    //     '                     <a href="javascript:void(0)">02. Lorem ipsum</a>' +
    //     '                     <ul>' +
    //     '                         <li class="has_submenu">' +
    //     '                             <a href="javascript:void(0)">02.1 Lorem ipsum dolor sit amet</a>' +
    //     '                             <ul>' +
    //     '                                 <li><a href="javascript:void(0)">02.1.1 Lorem ipsum</a></li>' +
    //     '                                 <li><a href="javascript:void(0)">02.1.2 Lorem ipsum</a></li>' +
    //     '                                 <li><a href="javascript:void(0)">02.1.3 Lorem ipsum</a></li>' +
    //     '                                 <li><a href="javascript:void(0)">02.1.4 Lorem ipsum</a></li>' +
    //     '                             </ul>' +
    //     '                         </li>' +
    //     '                         <li><a href="javascript:void(0)">02.2 Lorem ipsum</a></li>' +
    //     '                         <li><a href="javascript:void(0)">02.3 Lorem ipsum</a></li>' +
    //     '                         <li><a href="javascript:void(0)">02.4 Lorem ipsum</a></li>' +
    //     '                     </ul>' +
    //     '                 </li>' +
    //     '                 <li class="has_submenu">' +
    //     '                     <a href="javascript:void(0)">03. Lorem ipsum</a>' +
    //     '                     <ul>' +
    //     '                         <li><a href="javascript:void(0)">03.1 Lorem ipsum</a></li>' +
    //     '                         <li><a href="javascript:void(0)">03.2 Lorem ipsum</a></li>' +
    //     '                         <li><a href="javascript:void(0)">03.3 Lorem ipsum</a></li>' +
    //     '                         <li><a href="javascript:void(0)">03.4 Lorem ipsum</a></li>' +
    //     '                     </ul>' +
    //     '                 </li>' +
    //     '                 <li><a href="javascript:void(0)">04. Lorem ipsum</a></li>' +
    //     '             </ul>' +
    //     '         </li>' +
    //     '     </ul>' +
    //     ' </div>' +
    //     ' <div class="menu_toggle">' +
    //     '             <span class="icon_menu_toggle">' +
    //     '                 <i class="arrow_carrot-2left toggle_left"></i>' +
    //     '                 <i class="arrow_carrot-2right toggle_right" style="display:none"></i>' +
    //     '             </span>' +
    //     ' </div>';

    mainMenu = loadMainMenuData();
    //转换成jQuery对象
    var $mainMenuObj = $(mainMenu);
    //添加子项
    $("#main_menu").append($mainMenuObj);
});

function loadMainMenuData() {
    var mainMenuData = menuData();
    var _nodeActiveClass = '';
    var mainMenu = '<div class="menu_wrapper">';
    for(var i=0; i<mainMenuData.length; i++) {
        mainMenu = mainMenu.concat('<ul>').concat('<li class="first_level">');
        if(isActiveNode(mainMenuData[i].path)) {
            _nodeActiveClass = "act_nav";
        } else {
            _nodeActiveClass = "";
        }
        mainMenu = mainMenu.concat('<a class="'+ _nodeActiveClass +'" href="'+ mainMenuData[i].path +'">')
            .concat('<span class="'+ mainMenuData[i].nodeLogoClass +'"></span>')
            .concat('<span class="'+ mainMenuData[i].nodeClassName +'">'+ mainMenuData[i].nodeName +'</span>')
            .concat('</a>');
        if(mainMenuData[i].haveChild) {
            mainMenu = mainMenu.concat('<ul>');
            for (var j=0; j<mainMenuData[i].child.length; j++) {
                if(isActiveNode(mainMenuData[i].child[j].path)) {
                    _nodeActiveClass = "act_nav";
                } else {
                    _nodeActiveClass = "";
                }
                mainMenu = mainMenu.concat('<li><a class="'+ _nodeActiveClass +'" href="'+ mainMenuData[i].child[j].path +'">'+ mainMenuData[i].child[j].nodeName +'</a></li>');
            }
            mainMenu = mainMenu.concat('</ul>');
        }
        mainMenu = mainMenu.concat('</li></ul>');
    }
    mainMenu = mainMenu.concat('</div>');
    mainMenu = mainMenu.concat('<div class="menu_toggle">' +
                                '   <span class="icon_menu_toggle">' +
                                '        <i class="arrow_carrot-2left toggle_left"></i>' +
                                '        <i class="arrow_carrot-2right toggle_right" style="display:none"></i>' +
                                '       </span>' +
                                '</div>');
    return mainMenu;
}

function menuData() {
    return [
        {
            nodeName: "首页",
            nodeClassName: "menu-title",
            nodeLogoClass: "icon_house_alt first_level_icon",
            nodeActiveClass: "act_nav",
            path: "/",
            haveChild: false
        },
        {
            nodeName: "用户管理",
            nodeClassName: "menu-title",
            nodeLogoClass: "icon_group first_level_icon",
            nodeActiveClass: "",
            path: "javascript:void(0)",
            haveChild: true,
            child: [
                {
                    nodeName: "系统管理员",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/managerAll",
                    haveChild: false
                },
                {
                    nodeName: "用户管理",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/userAll",
                    haveChild: false
                },
                {
                    nodeName: "当前用户设置",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/managerConfiguration",
                    haveChild: false
                }
            ]
        },
        {
            nodeName: "菜单管理",
            nodeClassName: "menu-title",
            nodeLogoClass: "el-icon-th-list first_level_icon",
            nodeActiveClass: "",
            path: "javascript:void(0)",
            haveChild: true,
            child: [
                {
                    nodeName: "菜单设置",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/menuConfiguration",
                    haveChild: false
                }
            ]
        },
        {
            nodeName: "内容管理",
            nodeClassName: "menu-title",
            nodeLogoClass: "icon_pencil_alt first_level_icon",
            path: "javascript:void(0)",
            nodeActiveClass: "",
            haveChild: true,
            child: [
                {
                    nodeName: "所有内容",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/contentList",
                    haveChild: false
                },
                {
                    nodeName: "Markdown内容发布",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/markdownAdd",
                    haveChild: false
                },
                {
                    nodeName: "富文本内容发布",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/contentAdd",
                    haveChild: false
                }
            ]
        },
        {
            nodeName: "文件上传",
            nodeClassName: "menu-title",
            nodeLogoClass: "el-icon-folder first_level_icon",
            path: "javascript:void(0)",
            nodeActiveClass: "",
            haveChild: true,
            child: [
                {
                    nodeName: "图片上传",
                    nodeClassName: "",
                    nodeLogoClass: "",
                    nodeActiveClass: "",
                    path: "/uploadPic",
                    haveChild: false
                }
            ]
        }
    ];
}

function isActiveNode(nodeName) {
    var _url = window.location.href;
    _url = _url.replace(/^http:\/\/[^/]+/, "");
    if(_url === "/" && _url.length === 0) {
        return true;
    } else if(_url.indexOf(nodeName) >= 0 && nodeName != "/") {
        return true;
    }
    return false;
}

function renderMainMenu(event) {
    console.log("冒泡事件", event.target);
    //处理main_menu的重新渲染
}
