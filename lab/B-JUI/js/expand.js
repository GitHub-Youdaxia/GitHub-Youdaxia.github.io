$(function () {
    BJUI.init({
        JSPATH: 'B-JUI/', //[可选]框架路径
        PLUGINPATH: 'B-JUI/plugins/', //[可选]插件路径
        loginInfo: {
            url: 'login_timeout.html',
            title: '登录',
            width: 440,
            height: 240
        }, // 会话超时后弹出登录对话框
        statusCode: {
            ok: 200,
            error: 300,
            timeout: 301
        }, //[可选]
        ajaxTimeout: 300000, //[可选]全局Ajax请求超时时间(毫秒)
        alertTimeout: 3000, //[可选]信息提示[info/correct]自动关闭延时(毫秒)
        pageInfo: {
            total: 'totalRow',
            pageCurrent: 'pageCurrent',
            pageSize: 'pageSize',
            orderField: 'orderField',
            orderDirection: 'orderDirection'
        }, //[可选]分页参数
        keys: {
            statusCode: 'statusCode',
            message: 'message'
        }, //[可选]
        ui: {
            sidenavWidth: 0,
            showSlidebar: false, //[可选]左侧导航栏锁定/隐藏
            overwriteHomeTab: false //[可选]当打开一个未定义id的navtab时，是否可以覆盖主navtab(我的主页)
        },
        debug: true, // [可选]调试模式 [true|false，默认false]
        theme: 'green' // 若有Cookie['bjui_theme'],优先选择Cookie['bjui_theme']。皮肤[五种皮肤:default, orange, purple, blue, red, green]
    })
    //时钟
    var today = new Date(),
        time = today.getTime()
    $('#bjui-date').html(today.formatDate('yyyy/MM/dd'))
    setInterval(function () {
        today = new Date(today.setSeconds(today.getSeconds() + 1))
        $('#bjui-clock').html(today.formatDate('HH:mm:ss'))
    }, 1000)
})

/*window.onbeforeunload = function(){
    return "确定要关闭本系统 ?";
}*/

//菜单-事件-zTree
function MainMenuClick(event, treeId, treeNode) {
    if (treeNode.target && treeNode.target == 'dialog' || treeNode.target == 'navtab')
        event.preventDefault()

    if (treeNode.isParent) {
        var zTree = $.fn.zTree.getZTreeObj(treeId)

        zTree.expandNode(treeNode)
        return
    }

    if (treeNode.target && treeNode.target == 'dialog')
        $(event.target).dialog({
            id: treeNode.targetid,
            url: treeNode.url,
            title: treeNode.name
        })
    else if (treeNode.target && treeNode.target == 'navtab')
        $(event.target).navtab({
            id: treeNode.targetid,
            url: treeNode.url,
            title: treeNode.name,
            fresh: treeNode.fresh,
            external: treeNode.external
        })
}

// 满屏开关
var bjui_index_container = 'container_fluid'

function bjui_index_exchange() {
    bjui_index_container = bjui_index_container == 'container_fluid' ? 'container' : 'container_fluid'

    $('#bjui-top').find('> div').attr('class', bjui_index_container)
    $('#bjui-navbar').find('> div').attr('class', bjui_index_container)
    $('#bjui-body-box').find('> div').attr('class', bjui_index_container)
}
$(document).ready(function () {
    $.fn.bjuiWidget = {
        /**
         * 得到当前navtab传递的参数对象
         * 传递方式：
         *  params:{}
         */
        getNavtabParams: function () {
            var curNavtab = $('body').data('bjui.navtab').current;
            var jsCnt = "$('body').data('bjui.navtab')." + curNavtab + ".options.params;";
            return eval(jsCnt);
        },
        /**
         * 根据navtab的tabId，得到该navtab对应的dom对象
         */
        getNavtabPanel: function (tabId) {
            var jsCnt = "$('body').data('bjui.navtab').main.tools.getPanel('" + tabId + "');";
            return eval(jsCnt);
        },
        /**
         * 得到当前dialog传递的参数对象
         * 传递方式：
         *  params:{}
         */
        getDialogParams: function () {
            var curDialog = $('body').data('bjui.dialog').current;
            var jsCnt = "$('body').data('bjui.dialog')." + curDialog + ".options.params;";
            return eval(jsCnt);
        }
    }
    $(document).keydown(function (event) {
        // console.log('event:',event);
        if (event.ctrlKey && event.keyCode == 37) { //ctrl+<-向左切换标签页
            var $li = $(".tabsPageHeaderContent .active").prev();
            var obj = $li.click();
            if (obj.length == 0) {
                $(".tabsPageHeaderContent").find('li:last').click();
            }
        } else if (event.ctrlKey && event.keyCode == 39) { //ctrl+->向右切换标签页
            var $li = $(".tabsPageHeaderContent .active").next();
            var obj = $li.click();
            if (obj.length == 0) {
                $(".tabsPageHeaderContent").find('li:first').click();
            }
        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 88) { ////ctrl+shift+x 打开上次标签页
            if (sessionStorage.getItem('lastNavtab') != null) {
                var lastNavtab = JSON.parse(sessionStorage.getItem('lastNavtab'));
                openMenuNavtab(lastNavtab.id, lastNavtab.title, lastNavtab.url);
            } else {
                console.log('没有上次打开的Navtab');
            }

        } else if (event.ctrlKey && event.keyCode == 88) { ////ctrl+x 关闭当前dialog，如果没有则关闭当前标签页
            var CurrentContainer = ($.CurrentDialog ? ($.CurrentDialog.css('display') == 'none' ? false : $.CurrentDialog) : false) || $.CurrentNavtab;
            if ($.CurrentDialog && $.CurrentDialog.css('display') != 'none') {
                $.CurrentDialog.find('.close').click();
            } else if ($('.layui-layer-close').length > 0) {
                $('.layui-layer-close').click();
            } else {
                var $li = $(".tabsPageHeaderContent .active");
                $li.find('.close').click();
            }

        } else if (event.ctrlKey && event.shiftKey && event.altKey && event.keyCode == 88) { ////ctrl+shift+alt+x 刷新当前容器
            console.log('%c' + 'sd', 'color:red');

        } else if (event.ctrlKey && event.shiftKey && event.keyCode == 90) {
            // ctrl+shift+z 打开源代码 
            $('#openCodeSource').click();
        }
    })
    $(document).keydown(function (event) {
        if (event.keyCode == 38) {
            var CurrentContainer = ($.CurrentDialog ? ($.CurrentDialog.css('display') == 'none' ? false : $.CurrentDialog) : false) || $.CurrentNavtab;
            //箭头上
            if (CurrentContainer.find('table').length != 0) {
                var tables = CurrentContainer.find('table');
                var dataTable = [];
                for (var i = 0; i < tables.length; i++) {
                    if ($(tables[i]).attr('id') != undefined) {
                        dataTable.push(tables[i]);

                    }
                }
                var table = dataTable[0];
                var selectedTr = $(table).find(".datagrid-selected-tr");
                if (selectedTr.length == 0) {
                    $(table).find('tr').removeClass('datagrid-selected-tr');
                    $(table).find('tr').eq(0).addClass('datagrid-selected-tr');
                    var row = $(table).data("selectedDatas");
                    console.log(row);
                } else {
                    if (selectedTr.prev('tr').length != 0) {
                        $(table).find('tr').removeClass('datagrid-selected-tr');
                        selectedTr.prev('tr').addClass('datagrid-selected-tr');
                    } else {
                        console.log('触发上一页按钮点击');
                        $(table).parents('.bjui-datagrid').find('.paging-content .fa.fa-backward').trigger('click');
                    }
                }
            }

        }
        if (event.keyCode == 40) {
            var CurrentContainer = ($.CurrentDialog ? ($.CurrentDialog.css('display') == 'none' ? false : $.CurrentDialog) : false) || $.CurrentNavtab;
            //箭头下
            if (CurrentContainer.find('table').length != 0) {
                var tables = CurrentContainer.find('table');
                var dataTable = [];
                for (var i = 0; i < tables.length; i++) {
                    if ($(tables[i]).attr('id') != undefined) {
                        dataTable.push(tables[i]);
                    }
                }
                var table = dataTable[0];
                var selectedTr = $(table).find(".datagrid-selected-tr");
                if (selectedTr.length == 0) {
                    $(table).find('tr').removeClass('datagrid-selected-tr');
                    $(table).find('tr').eq(0).addClass('datagrid-selected-tr');
                    var row = $(table).data("selectedDatas");
                } else {
                    if (selectedTr.next('tr').length != 0) {
                        $(table).find('tr').removeClass('datagrid-selected-tr');
                        selectedTr.next('tr').addClass('datagrid-selected-tr');
                    } else {
                        console.log('触发下一页按钮点击');
                        $(table).parents('.bjui-datagrid').find('.paging-content .fa.fa-forward').trigger('click');
                    }
                }

            }
        }
        if (event.keyCode == 13) {
            if ($('.datagrid-selected-tr').length != 0) {
                $('.datagrid-selected-tr').trigger('dblclick');
            }
        }

    });

});

function openMenuNavtab(id, title, url, external) {
    var lastNavtab = {
        "id": id,
        "title": title,
        "url": url,
        "external": external
    };
    sessionStorage.setItem('lastNavtab', JSON.stringify(lastNavtab));
    if(!external){
        BJUI.navtab({
            id: id,
            title: title,
            url: url,
            refresh: true,
            external: external, //设置后，每个子页面要单独引入自己的js框架
            onLoad: function () {
                $.fn.BJUICustom.setFirstFormEleFocus();
                // showCode();
    
                var $markdown = $('div.markdown');
                var c = new Markdown.Converter();
                $markdown.each(function () {
                    // console.log('$(this).text():',$(this).text());
                    // var html=c.makeHtml($(this).text());
                    var html = parseMarkdown($(this).text());
                    // console.log('html:',html);
                    $(this).html(html);
                })
    
            }
        })
    }else{
        window.open(url)
    }

}

(function ($, window, document, undefined) {
    $.fn.BJUICustom = {
        setFirstFormEleFocus: function () {
            setTimeout(function () {
                if ($.CurrentNavtab.attr("id") != "main-page" || $.CurrentDialog != null) { //如果不是我的主页
                    var CurrentContainer = ($.CurrentDialog ? ($.CurrentDialog.css('display') == 'none' ? false : $.CurrentDialog) : false) || $.CurrentNavtab;
                    var CurrentContainerFocus = CurrentContainer.find(':focus');
                    if (CurrentContainerFocus.length == 0) {
                        var lastFocus = $(':focus').eq(0);
                        lastFocus.attr('disabled', "disabled");

                    }
                    // console.log('lastFocus:',lastFocus);
                    var firstButton = CurrentContainer.find('button').eq(0);
                    var firstInput = CurrentContainer.find('input').eq(0);
                    if (firstButton.length == 0) {
                        if (firstInput.length != 0) {
                            firstInput.focus();
                        }
                    } else if (firstInput.length == 0) {
                        if (firstButton.length != 0) {
                            firstButton.focus();
                        }
                    } else if (firstButton.length != 0 && firstInput.length != 0) {
                        var firstButtonTop = firstButton.offset().top;
                        var firstInputTop = firstInput.offset().top;
                        if (firstButtonTop < firstInputTop) {
                            firstButton.focus();
                        } else if (firstButtonTop > firstInputTop) {
                            firstInput.focus();
                        } else if (firstButtonTop == firstInputTop) {
                            var firstButtonLeft = firstButton.offset().left;
                            var firstInputLeft = firstInput.offset().left;
                            if (firstButtonLeft < firstInputLeft) {
                                firstButton.focus();
                            } else {
                                firstInput.focus();
                            }
                        }
                        // console.log('获得焦点');
                    }
                    if (lastFocus != undefined) {
                        lastFocus.removeProp('disabled');
                    }
                }
            }, 200)
        }
    }
})(jQuery, window, document);

$(function () {
    $('#openCodeSource').on('click', function (event) {
        var id = $('body').data('bjui.navtab')[$('body').data('bjui.navtab').current].options.id;
        var url = $('body').data('bjui.navtab')[$('body').data('bjui.navtab').current].options.url;

        var html = '';
        html = $.CurrentNavtab.html()
        if ($.CurrentNavtab.find('iframe').length > 0) {
            html = $.CurrentNavtab.find('iframe').eq(0).html();
        }
        BJUI.dialog({
            id: id,
            url: url,
            title: '源码',
            height: '600',
            width: '1200',
            onLoad: function () {
                // $.CurrentDialog.find('.dialogContent').html("<pre ><code class='html'>" + "var a='1'" + "</code></pre>");
                // $.CurrentDialog.find('.dialogContent').html("<pre ><code class='html'>" + html + "</code></pre>");
                $.CurrentDialog.find('.dialogContent').html("<textarea class='source-code-textarea'>" +html + "</textarea>");
                $.CurrentDialog.find('pre code').each(function (i, block) {
                    hljs.highlightBlock(block)
                })
            }
        })
        // layer.open({
        //     type: 1,
        //     shade: false,
        //     area: ['1000px', '800px'],
        //     title: '源码',
        //     content: "<textarea class='source-code-textarea'>" +html + "</textarea>",
        //     cancel: function () {
        //         console.log('关闭');
        //     }
        // })

    })
})

function showCode() {
    // var styleCon = $.CurrentNavtab.find('style').html();
    // var bodyCon = $.CurrentNavtab.html();
    //    $.CurrentNavtab.append('<div class="showCodeBox bottom"><textarea class="styleSrc"></textarea><textarea class="bodySrc"></textarea></div>');

    // $.CurrentNavtab.append('<div class="srcBtns"><button  class="srcBtn btn btn-primary" title="(ctrl+shift+z)">源代码</button><button  class="codeBoxPosition btn btn-primary bottom">源代码位置-右</button></div>');


    // $.CurrentNavtab.find('.bodySrc').val(bodyCon);
    //    $.CurrentNavtab.find('.styleSrc').val(styleCon);

    // var srcIsOpen = false;





}

function parseMarkdown(text) {
    // var html=text.replace(/#/g,'<span class="hide">#</span>');
    text = text.replace(/{/g, '<span class="tip">');
    text = text.replace(/}/g, '</span>');
    var textArr = text.split('#');
    var html = "";
    for (let index = 1; index < textArr.length; index++) {
        const element = textArr[index];
        html += '<p class="list-group-item" >' + element + '</p>';
    }

    return html;
}

function getUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16).toUpperCase();
    });
  }