/**
 * 依赖jquery
 * 拖拽功能依赖jqueryUI
 * todo 每个窗口的z-index控制一下 
 */
+ function ($) {

    var chat = function (options) {
        this.options = {
            chatHtmlURL: '/lab/group/js案例/chat/chat.html',
            data: [],
        };
        this.options = $.extend({}, this.options, options);
        //插件对象的属性
        this.$chatContainer = null; //$('.tygmChatList')聊天窗口的容器列表父元素
        this.$chatHtml = null; //)聊天窗口的容器列表父元素的父元素
        this.$chatList = {}; //$('.tygmChatList-item')聊天窗口的容器列表
        this.$chatItemDemo = null; //聊天窗口某一个模板的 jquery dom 对象   
        this.$chatTipDemo = null; //右下角提示聊天窗口 jquery dom 对象   
        this.IS_DEBUG = true;
        this.maxIndex = 0;
        this.offset = 0; //打开聊天窗口定位 后的偏移量
        this.init();
    }
    chat.prototype = {
        init: function () {
            var that = this;
            if ($('#chat-plugin').length == 0) {
                $('body').append('<div id="chat-plugin"></div>');
                that.$chatHtml = $('#chat-plugin');
                console.log(that.options.chatHtmlURL);
                that.$chatHtml.load(that.options.chatHtmlURL, that.options, function (data) {
                    if (data.indexOf('404') > 0) {
                        console.log('未找到' + that.options.chatHtmlURL + ',文件路径正确才能调用聊天模板chat.html');
                        console.log('载入聊天模板失败,插件不可用');
                    } else {
                        that.$chatContainer = $('.j-chatContainer');
                        that.$chatItemDemo = $('.j-chatItemDemo');
                        that.$chatTipDemo = $('.j-tygmChatTipDemo');
                        that.bindEvent(that.$chatContainer);
                    }
                });

            }
        },

        bindEvent: function ($ele) {
            var that = this;
            $ele.on('click', '.j-chat-close', function (event) {
                var $chatItem = $(this).parents('.j-tygmChatList-item');
                $chatItem.hide();
            });
            $ele.on('click', '.j-chat-send', function (event) {
                var $chatItem = $(this).parents('.j-tygmChatList-item');
                var sendInfo = $chatItem.find('.j-write-textarea').val();
                if (sendInfo != '') {
                    that.sendInfoTo($chatItem.data('tygmChatId'), sendInfo);
                }
                $chatItem.find('.j-write-textarea').val('');
            });
            $ele.on('click mousedown', '.j-tygmChatList-item', function () {
                that.setMaxZIndex($(this));
                console.log('窗口id', $(this).data('tygmChatId'));
            })
            //聊天提示框 事件绑定
            $('body').on('click', '.tygmChatTip-close,.ignore-btn', function () {
                $(this).parents('.tygmChatTip').animate({right:-200},1000,function(){
                    $(this).remove();
                });
            })
            $('body').on('click', '.reply-btn', function () {
                var id = $(this).data('tygmChatId');
                that.showChat(id);
                that.setMaxZIndex(that.getChatById(id));
                $('body').find('.class-'+id).remove();
            })

        },
        setMaxZIndex:function($ele){
            //使聊天窗口z-index为当前最大值
            var that=this;
            that.maxIndex = that.maxIndex + 1;
            $ele.css({
                'z-index': that.maxIndex
            });
        },
        // 返回聊天新窗口 jquery dom对象  type=='tip' 从右下角提醒初始化对话框
        addChat: function (chatItem) {
            var that = this;
            var $newChat = null;

            //将每个聊天框jquery dom 对象 保存在数组中
            if (that.$chatList[chatItem.tygmChatId] == undefined) {

                that.$chatContainer.append(that.$chatItemDemo.html());
                $newChat = that.$chatContainer.children().last();

                //使窗口层叠层级最高
                that.setMaxZIndex($newChat);

                //聊天新窗口 存储 用tygmChatId存储新窗口$ele
                $newChat.data('tygmChatId', chatItem.tygmChatId);
                that.$chatList[chatItem.tygmChatId] = {};
                that.$chatList[chatItem.tygmChatId]['$ele'] = $newChat;
                that.$chatList[chatItem.tygmChatId]['data'] = chatItem;
                //聊天新窗口  在页面中定位
                that.setPosition($newChat, 'center');

                //聊天新窗口初始化页面
                that.renderChatDialog($newChat, chatItem);

                //聊天新窗口 滚动聊天内容到底部
                that.scrollBottom($newChat);

                //聊天新窗口 可拖拽 jquery ui 的方法 设置可拖拽
                $newChat.draggable({
                    handle: ".j-top"
                });
            } else {

                that.debug("聊天窗口ID:" + chatItem.tygmChatId + "已存在,不能重复添加,会显示出来");
                that.getChatById(chatItem.tygmChatId).show();
            }
            return $newChat;
        },
        renderChatDialog: function ($ele, chatItem) {
            $ele.find('.j-chat-trade-name').text(chatItem.chat_trade_name);
            $ele.find('.j-chat-task-no').text(chatItem.chat_task_no);
            $ele.find('.j-chat-send-teller-name').text(chatItem.chat_send_teller_name);
            $ele.find('.j-chat-receive-teller-name').text(chatItem.chat_receive_teller_name);
            var htmlStr = "";
            var chatContent = chatItem.chatContent;
            var arrLength = chatContent.length;
            for (var i = 0; i < arrLength; i++) {
                if (chatContent[i]['toMe'] != undefined) {
                    htmlStr += this.getBubbleHtml('toMe', chatContent[i]['toMe']);
                }
                if (chatContent[i]['toYou'] != undefined) {
                    htmlStr += this.getBubbleHtml('toYou', chatContent[i]['toYou']);
                }
            }
            $ele.find('.j-chat-content').html(htmlStr);

            $ele.find('.j-conversation-start span').text(this.getNow());
        },
        sendInfoTo: function (id, sendInfo, who) {
            var $ele = this.getChatById(id);
            if ($ele != null) {
                var chatContent = $ele.find('.j-chat-content');
                if (who == undefined) {
                    who = 'toYou';
                }
                if (who == 'toYou') {
                    chatContent.append(this.getBubbleHtml('toYou', sendInfo));
                    this.$chatList[id]['data'].chatContent.push({
                        toYou: sendInfo
                    });
                    $ele.trigger('sendToYou', [this.$chatList[id]]);
                } else if (who == 'toMe') {
                    chatContent.append(this.getBubbleHtml('toMe', sendInfo));
                    this.$chatList[id]['data'].chatContent.push({
                        toMe: sendInfo
                    });
                    $ele.trigger('sendToMe', [this.$chatList[id]]);
                    //如果当前聊天已存在且是隐藏状态 就在右下角提醒
                    if (this.$chatList[id]['$ele'].css('display') == 'none') {
                        var chatData = this.$chatList[id]['data'];
                        this.showTipChat(chatData, sendInfo);
                    }
                }
                this.scrollBottom($ele);


            } else {
                this.debug('没有找到id=' + id + '的对话框');
            }

        },
        getChatList: function () {
            return this.$chatList;
        },
        getChatById: function (id) {
            if (this.$chatList[id] != undefined) {
                return this.$chatList[id]['$ele'];
            } else {
                return null;
            }
        },
        scrollBottom: function ($ele) {
            var chatContent = $ele.find('.j-chat-content');
            var chat = $ele.find('.j-chat');
            var scrollTop = chatContent.height() - chat.height() + 100;
            chat.animate({
                scrollTop: scrollTop
            }, 'fast');
        },
        showChat: function (id) {
            var $ele = this.getChatById(id);
            $ele.show();
            this.scrollBottom($ele);
        },
        show: function () {
            if (this.$chatHtml == undefined) {
                return;
            }
            this.$chatHtml.show();
        },
        showTipChat: function (chatData, sendInfo) {
            var that = this;
            //初始化聊天对话框并隐藏
            var tygmChatId = chatData.tygmChatId;

            var chatTipHtml = that.$chatTipDemo.html();
            $('body').append(chatTipHtml);
            var $chatTip = $('body').find('.tygmChatTip').last();
            $chatTip.css({"bottom":-116});
            $chatTip.animate({bottom:0},1000);
            // id
            $chatTip.addClass('class-'+tygmChatId);
            $chatTip.find('.reply-btn').data('tygmChatId', chatData.tygmChatId);
            //聊天提示框初始化
            that.renderTipChat($chatTip, chatData, sendInfo);

        },
        renderTipChat: function ($chatTip, chatData, sendInfo) {
            var businessName = chatData.chat_trade_name;
            $chatTip.find('.replyToBusinessName').text(businessName);
            $chatTip.find('.replyText').text(sendInfo);
        },
        drag: function ($ele) {
            $ele.draggable();
        },
        hide: function () {
            this.$chatHtml.hide();
        },
        getNow: function () {
            var time = new Date();
            var year = time.getFullYear();
            var month = time.getMonth() * 1 + 1;
            var date = time.getDate();
            var h = time.getHours();
            var m = time.getMinutes();
            var now = year + '-' + month + '-' + date + ' ' + h + ':' + m;
            return now;
        },
        getBubbleHtml: function (toWho, sendInfo) {
            if (toWho == 'toYou') {
                return '<div title="' + this.getNow() + '" class="bubble toYou">' + sendInfo + '</div>';
            } else {
                return '<div title="' + this.getNow() + '" class="bubble toMe">' + sendInfo + '</div>';
            }
        },
        setPosition: function ($ele, position) {
            var width = $(window).width();
            var height = $(window).height();
            var left = ''; //窗口left
            var top = ''; //窗口top
            if (position == 'center') {
                left = width / 2 - $ele.width() / 2;
                top = height / 2 - $ele.height() / 2;
                $ele.css({
                    'left': left + this.offset,
                    'top': top + this.offset,
                })
            }
            this.offset = this.offset + 20;
            if (this.offset == 100) {
                this.offset = 0;
            }

        },
        debug: function (msg) {
            if (this.IS_DEBUG) {
                if (typeof (console) != 'undefined') console.log(msg)
                else alert(msg)
            }
        },
    };
    // window.Chat = chat;

    $.getChat = function () {
        if (window.tygmChat) {
            return window.tygmChat;
        } else {
            window.tygmChat = new chat();
            return window.tygmChat
        }
    }
    $.getChat();
}(jQuery);