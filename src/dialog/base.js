/**
 * @file Dialog基类
 * @author schoeu1110@gmail.com
 *
 * @events
 *     1. show
 *     2. hide
 *     3. destroy
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
        hideCallback: loop,
        showCallback: loop,
        destroyCallback: loop,
        aniTime: 200,
        horizontal: true,
        content:'',
        title: '提示',
        buttons: [{
            text: '确定',
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
            var btns = options.buttons || [];
            var btnsStr = '';

            if (!options.content) {
                throw new Error('please input invaild content.');
            }

            me.ele = $('<div class="zui-dialog-wrap-mask">');

            me.callback = [];
            btns.forEach(function (it, i) {
                var callback = it.callback;
                btnsStr += '<div class="zui-dialog-btns">' + it.text + '</div>';

                me.callback.push($.isFunction(callback) ? callback : null);
            });

            if (!options.horizontal) {
                showStyle = 'zui-dialog-btngroup-v';
            }

            var htmlCodes = [
                '<div class="zui-dialog-wrap">',
                '     <header class="zui-dialog-header">' + options.title + '</header>',
                '     <div class="zui-dialog-content">',
                options.content,
                '     </div>',
                '     <footer class="' + showStyle + '">',
                 btnsStr,
                '     </footer>',
                '</div>'
            ].join('');

            me.ele.append(htmlCodes);
            $('body').append(me.ele);

            me.__bindEvt();
        },

        /**
         * Dialog#show方法
         */
        show: function () {
            var me = this;
            var aniTime = me.options.aniTime;

            me.ele.css({display:'block'}).animate({
                opacity:1
            }, aniTime);
            
            me.ele.find('.zui-dialog-wrap')
                .css({
                    transform:'translate(50%, -50%) scale3d(.7,.7,1)'
                })
                .animate({
                    transform: 'translate(50%, -50%) scale3d(1,1,1)'
            }, aniTime, function (){
                me.options.showCallback.call(me);
            });
        },


        /**
         * Dialog#hide方法
         */
        hide: function () {
            var me = this;
            var aniTime = me.options.aniTime;
            me.ele.animate({
                opacity:0
            }, aniTime);

            me.ele.find('.zui-dialog-wrap').animate({
                opacity:0,
                transform: 'translate(50%, -50%) scale3d(.7,.7,1)'
            }, aniTime, function (){
                var hideFn = me.options.hideCallback;
                if ($.isFunction(hideFn)) {
                    hideFn.call(me);
                }
                me.destroy();
            })
        },

        /**
         * 事件处理绑定
         */
        __bindEvt: function () {
            var me = this;
            var cbs = me.callback || [];
            me.ele.find('.zui-dialog-btns').one('click', function (e) {
                var $target = $(this);
                var idx = $target.index();
                cbs[idx] && cbs[idx].call(me, idx);
                me.hide();
            });
        },

        /**
         * 事件处理绑定
         */
        destroy: function () {
            var me = this;
            var destroyFn = me.options.destroyCallback;

            me.ele.remove();

            if ($.isFunction(destroyFn)) {
                destroyFn.call(me);
            }


        }

    });

    return Dialog;
});
