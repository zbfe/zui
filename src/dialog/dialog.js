/**
 * @file Dialog基类
 * @author schoeu1110@gmail.com
 *
 * @events
 *     1. show
 *     2. hide
 *     3. destroy
 */

define(function (require) {
    'use strict';
    /**
     * 加载样式
     */
    require('css!./base.css');
    var loop = function () {};
    var $ = require('zepto');
    var Zui = require('zui');

    /**
     * 扩展Dialog原型,添加弹窗基本API
     */
    var Dialog = Zui.extend({

        /**
         * 构造函数
         *
         * @class
         * @name Dialog
         * @describe 描述
         * @requires zepto
         * @requires Zui
         *
         * @param {Object} options 参数对象
         * @param {number} aniTime 动画持续时间,默认200毫秒
         * @param {boolean} horizontal 按钮排列方向, 默认为true,横向
         * @param {string} content 弹出框内容,默认为空
         * @param {string} title 弹出框标题,默认为"提示"
         * @param {Array} buttons 默认为一个"确定"按钮
         *      text {string} 按钮文案
         *      callback {Function} 默认为空函数
         * @example
         * // 只有内容和确定按钮
         * new Dialog('我是内容~');
         *
         * @example
         * // 内容和确定按钮,动画持续时间为400毫秒
         * new Dialog({content:'我是内容~', aniTime:400});
         *
         * @example
         * // 有标题、内容和确定按钮回调
         * new Dialog({content:'我是内容~', horizontal:false});
         *
         * @example
         * // 有标题、内容和确定、取消按钮回调
         * new Dialog({content:'我是内容~', buttons:[{
         *     text: '按钮1',
         *     callback: function() {
         *          alert('按钮1回调');
         *     },{
         *     text: '按钮2',
         *     callback: function() {
         *          alert('按钮2回调');
         *     }
         * ]});
         */
        constructor: function (options) {
            var me = this;

            if (typeof options === 'string') {
                options = {
                    content: options
                };
            }

            // 初始化zui
            Dialog.super.constructor.call(me, Dialog.defaults, options);

            if (!me.get('content')) {
                throw new Error('please input valid content.');
            }

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

            // 如果有存留的DOM则销毁它
            var oldELe = $('.zui-dialog-wrap-mask');
            if (oldELe.length) {
                oldELe.remove();
            }

            me.ele = $('<div class="zui-dialog-wrap-mask">');

            me.callback = [];
            btns.forEach(function (it) {
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

            me.ele.css({display: 'block'}).animate({
                opacity: 1
            }, aniTime);

            me.ele.find('.zui-dialog-wrap')
                .css({
                    transform: 'translate(50%, -50%) scale3d(.7,.7,1)'
                })
                .animate({
                    transform: 'translate(50%, -50%) scale3d(1,1,1)'
                }, aniTime, function () {
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
                opacity: 0
            }, aniTime);

            me.ele.find('.zui-dialog-wrap').animate({
                opacity: 0,
                transform: 'translate(50%, -50%) scale3d(.7,.7,1)'
            }, aniTime, function () {
                me.trigger('hide');
                me.destroy();
            });
        },

        /**
         * 事件处理绑定
         */
        __bindEvt: function () {
            var me = this;
            var cbs = me.callback || [];
            me.ele.find('.zui-dialog-btns').one('click', function () {
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
     * @param {number} aniTime 动画持续时间,默认200毫秒
     * @param {boolean} horizontal 按钮排列方向, 默认为true,横向
     * @param {string} content 弹出框内容,默认为空
     * @param {string} title 弹出框标题,默认为"提示"
     * @param {Array} buttons 默认为一个"确定"按钮
     *      text {string} 按钮文案
     *      callback {Function} 默认为空函数
     */
    Dialog.defaults = {
        aniTime: 200,
        horizontal: true,
        content: '',
        title: '提示',
        buttons: [{
            text: '确定',
            callback: loop
        }]
    };

    return Dialog;
});
