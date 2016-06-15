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
    var Zui = require('zui');

    /**
     * 扩展Dialog原型,添加弹窗基本API
     */
    var Dialog = Zui.extend({
        
        constructor: function (options) {
            var me = this;
            $.extend(Dialog.defaults, options);
            
            // 初始化zui
            Dialog.super.constructor.call(me, Dialog.defaults, options);

            me.__init();
        },
        
        /**
         * 初始化弹窗
         */
        __init: function () {
            var me = this;
            var options = me.get();
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
            var options = me.get();
            var aniTime = options.aniTime;

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
                me.trigger('show');
            });
        },


        /**
         * Dialog#hide方法
         */
        hide: function () {
            var me = this;
            var options = me.get();
            var aniTime = options.aniTime;
            me.ele.animate({
                opacity:0
            }, aniTime);

            me.ele.find('.zui-dialog-wrap').animate({
                opacity:0,
                transform: 'translate(50%, -50%) scale3d(.7,.7,1)'
            }, aniTime, function (){
                me.trigger('hide');
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
            me.ele.remove();
            me.trigger('destroy');
        }

    });

    /**
     * 默认参数
     */
    Dialog.defaults = {
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

    return Dialog;
});
