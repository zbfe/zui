/**
 * @file Dialog基类
 * @author schoeu1110@gmail.com
 */
define(function(require, factory) {
    'use strict';
    
    /**
     * 加载样式
     */
    require('css!./base.css');
    
    var loop = function (){};
    
    var $ = require('zepto');

    /**
     * 默认参数
     */
    var defaultOptions = {
        vertical: false,
        hideCallBack: loop,
        hideTime: 400,
        horizontal: true,
        content:'',
        headerTitle: '提示',
        buttons: [{
                text: '确定',
                callback: loop
            },
            {
                text: '取消',
                callback: loop
            }]
    };
    
    /**
     * Dialog构造函数
     *
     * @param {Object} options 配置对象
     */
    function Dialog(options) {
        this.options = $.extend(defaultOptions, options);
        this.__init();
    }


    /**
     * 扩展Dialog原型,添加弹窗基本API
     */
    $.extend(Dialog.prototype, {
        /**
         * 初始化弹窗
         */
        __init: function () {
            var me = this;
            var options = me.options;
            var showStyle = 'zui-dialog-btngroup-h';


            if (!options.content) {
                throw new Error('please input invaild content.');
            }

            me.ele = $('<div class="zui-dialog-wrap-mask">');
            var btns = options.buttons || [];

            var btnsStr = '';
            me.callback = [];
            btns.forEach(function (it, i) {
                btnsStr += '<div class="zui-dialog-btns">' + it.text + '</div>';
                me.callback.push(it.callback);
            });

            if (!options.horizontal) {
                showStyle = 'zui-dialog-btngroup-v';
            }

            var htmlCodes = [
                '       <div class="zui-dialog-wrap">',
                '            <header class="zui-dialog-header">' + options.headerTitle + '</header>',
                '            <div class="zui-dialog-content">',
                options.content,
                '            </div>',
                '            <footer class="' + showStyle + '">',
                 btnsStr,
                '            </footer>',
                '        </div>'
            ].join("");

            me.ele.append(htmlCodes);
            $('body').append(me.ele);

            me.__bindEvt();
        },

        /**
         * Dialog#show方法
         */
        show: function () {
            this.ele.css({opacity:1,display:'block'});
        },


        /**
         * Dialog#hide方法
         */
        hide: function () {
            var me = this;
            me.ele.animate({
                opacity:0
            },function (){
                $(this).hide();
                me.hideCallBack.call(me);
            }, me.hideTime)
        },


        /**
         * 事件处理绑定
         */
        __bindEvt: function () {
            var me = this;
            var cbs = me.callback || [];
            me.ele.find('.zui-dialog-btns', function (e) {
                var $target = $(this);
                var idx = $target.index();
                cbs[idx].call(me, idx);
            });
        }
    });

    return Dialog;
});
