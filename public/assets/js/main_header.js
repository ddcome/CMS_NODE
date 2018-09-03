$(function() { 
var menuHeader = '<div class="container-fluid">'+
                    '<div class="brand_section">'+
                        '<a href="/"><img src="assets/img/logo.png" alt="logo" width="63" height="26"></a>'+
                    '</div>'+
                    // '<ul class="header_notifications clearfix">'+
                    //     '<li class="dropdown">'+
                    //         '<span class="label label-danger">8</span>'+
                    //         '<a data-toggle="dropdown" href="index.html#" class="dropdown-toggle"><i class="el-icon-envelope"></i></a>'+
                    //         '<div class="dropdown-menu">'+
                    //             '<ul>'+
                    //                 '<li>'+
                    //                     '<img src="assets/img/avatars/avatar02_tn.png" alt="" width="38" height="38">'+
                    //                     '<p><a href="index.html#">Lorem ipsum dolor sit amet&hellip;</a></p>'+
                    //                     '<small class="text-muted">14.07.2014</small>'+
                    //                 '</li>'+
                    //                 '<li>'+
                    //                     '<img src="assets/img/avatars/avatar03_tn.png" alt="" width="38" height="38">'+
                    //                     '<p><a href="index.html#">Lorem ipsum dolor sit&hellip;</a></p>'+
                    //                     '<small class="text-muted">14.07.2014</small>'+
                    //                 '</li>'+
                    //                 '<li>'+
                    //                     '<img src="assets/img/avatars/avatar04_tn.png" alt="" width="38" height="38">'+
                    //                     '<p><a href="index.html#">Lorem ipsum dolor&hellip;</a></p>'+
                    //                     '<small class="text-muted">14.07.2014</small>'+
                    //                 '</li>'+
                    //                 '<li>'+
                    //                     '<img src="assets/img/avatars/avatar05_tn.png" alt="" width="38" height="38">'+
                    //                     '<p><a href="index.html#">Lorem ipsum dolor sit amet&hellip;</a></p>'+
                    //                     '<small class="text-muted">14.07.2014</small>'+
                    //                 '</li>'+
                    //                 '<li>'+
                    //                     '<a href="index.html#" class="btn btn-xs btn-primary btn-block">All messages</a>'+
                    //                 '</li>'+
                    //             '</ul>'+
                    //         '</div>'+
                    //     '</li>'+
                    // '</ul>'+
                    '<div class="header_user_actions dropdown">'+
                        '<div data-toggle="dropdown" class="dropdown-toggle user_dropdown">'+
                            '<div class="user_avatar">'+
                                '<img src="assets/img/avatars/avatar01_tn.png" alt="" title="Carrol Clark (carrol@example.com)" width="38" height="38">'+
                            '</div>'+
                            '<span class="caret"></span>'+
                        '</div>'+
                        '<ul class="dropdown-menu dropdown-menu-right">'+
                            '<li><a href="pages-user_profile2.html">用户设置</a></li>'+
                            '<li><a href="login_page.html">退出</a></li>'+
                        '</ul>'+
                    '</div>'+
                    '<div class="search_section hidden-sm hidden-xs">'+
                        '<input type="text" class="form-control input-sm">'+
                        '<button class="btn btn-link btn-sm" type="button"><span class="icon_search"></span></button>'+
                    '</div>'+
                '</div>';
//转换成jQuery对象
var $menuHeaderObj = $(menuHeader);
//添加子项 
$("#main_header").append($menuHeaderObj);
});
