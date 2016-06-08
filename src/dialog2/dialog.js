/**
 * @file 弹出层
 * @author fe.xiaowu@gmail.com
 * @events
 *     1. show 显示
 *     2. close 关闭
 *     3. destroy 销毁
 *     4. button:id 按钮点击回调
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Zui = require('zui');

    require('css!./dialog.css');

    var Dialog = Zui.extend({

        /**
         * 构造函数
         *
         * @param  {Object} options 配置参数
         */
        constructor: function (options) {
            var self = this;

            // 初始化zui
            Dialog.super.constructor.call(self, Dialog.defaults, options);

            // 重新获取配置
            options = self.get();

            // 如果按钮组不是数组
            if (!Array.isArray(options.button)) {
                options.button = [];
            }

            // 如果有成功回调，则认为是有确定按钮
            if (options.ok) {
                options.button.push({
                    id: 'ok',
                    value: options.okValue,
                    callback: options.ok
                });
            }

            // 如果有取消回调，则认为是有取消按钮
            if (options.cancel) {
                options.button.push({
                    id: 'cancel',
                    value: options.cancelValue,
                    callback: options.cancel
                });
            }

            self._init();
        },

        /**
         * 设置按钮组
         *
         * @private
         * @description 按钮的回调事件名是：button:按钮id
         * @return {Undefined}
         */
        _button: function () {
            var self = this;
            var options = self.get();
            var html = [];

            // 如果没有按钮
            if (!options.button || !options.button.length) {
                return self.$wrap.find('.zui-dialog-buttons').hide();
            }

            options.button.forEach(function (val) {
                var id = val.id || val.value;

                html.push([
                    '<span class="zui-dialog-button c-line-clamp1" data-id="' + id + '">' + val.value + '</span>'
                ].join(''));


                // 如果回调是方法
                if ('function' === typeof val.callback) {
                    self.on('button:' + id, val.callback);
                }
            });

            // 绑定事件
            // 点击按钮时触发事件并关闭窗口
            self.$wrap.find('.zui-dialog-buttons').html(html.join('')).show().children().on('click', function () {
                self.trigger('button:' + $(this).data('id')).close();
                return false;
            });

            // 如果是垂直按钮
            if (options.verticalButtons) {
                self.$wrap.find('.zui-dialog-buttons').addClass('zui-dialog-vertical-buttons');
            }
            else {
                self.$wrap.find('.zui-dialog-buttons').addClass('c-flexbox');
            }
        },

        /**
         * 初始化
         *
         * @private
         */
        _init: function () {
            var self = this;
            var options = self.get();

            // 创建html骨架
            self._createHtml();

            // 添加类名
            self.$wrap.addClass(options.className);

            // 设置标题
            self.title(options.title);

            // 设置内容
            self.content(options.content);

            // 初始化按钮组
            self._button();

            // 如果有遮罩层则让其显示
            if (options.lock) {
                self.$wrap.find('.zui-dialog-mask').show().animate({
                    opacity: 1
                }, options.duration, 'ease-out');
            }

            // 开始动画显示
            self.$wrap.find('.zui-dialog-layout').css({
                transform: 'translate(-50%, -50%) scale3d(1.2, 1.2, 1)'
            }).animate({
                transform: 'translate(-50%, -50%) scale3d(1, 1, 1)',
                opacity: 1
            }, options.duration, 'ease-out', function () {
                // 触发显示回调
                self.trigger('show');
            });

            // 如果有自动关闭的时间
            if (options.time && 'number' === typeof options.time) {
                self.one('show', function () {
                    setTimeout(self.close.bind(self), options.time);
                });
            }
        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            // 如果已经关闭了
            if (self.is('close')) {
                return self;
            }

            // 打上标识
            self.is('close', true);

            // 开始动画关闭
            self.$wrap.find('.zui-dialog-layout').animate({
                transform: 'translate(-50%, -50%) scale3d(0.8, 0.8, 1)',
                opacity: 0
            }, self.get('duration'), 'ease-out', function () {
                // 移除元素并触发事件
                self.$wrap.remove();
                self.trigger('close destroy');
            });

            // 如果有遮罩层让其隐藏
            if (this.get('lock')) {
                self.$wrap.find('.zui-dialog-mask').animate({
                    opacity: 0
                }, self.get('duration'), 'ease-out');
            }

            return self;
        },

        /**
         * 设置标题
         *
         * @param  {string} str 字符，如果为''则隐藏标题
         *
         * @return {Object}     this
         */
        title: function (str) {
            // 如果有内容才设置并显示
            if (str) {
                this.$wrap.find('.zui-dialog-title').text(str).show();
            }
            else {
                this.$wrap.find('.zui-dialog-title').hide();
            }

            return this;
        },

        /**
         * 设置内容
         *
         * @param  {string} str 内容
         *
         * @return {Object}     this
         */
        content: function (str) {
            this.$wrap.find('.zui-dialog-text').html(str);
            return this;
        },

        /**
         * 创建html骨架
         *
         * @private
         */
        _createHtml: function () {
            var self = this;
            var $wrap = self.$wrap = $('<div />').attr({
                role: self.get('lock') ? 'alertdialog' : 'dialog',
                tabindex: -1
            }).addClass('zui-dialog');

            $wrap[0].innerHTML = [
                '<div class="zui-dialog-mask"></div>',
                '<div class="zui-dialog-layout">',
                '   <div class="zui-dialog-content">',
                '       <div class="zui-dialog-title"></div>',
                '       <div class="zui-dialog-text"></div>',
                '   </div>',
                '   <div class="zui-dialog-buttons"></div>',
                '</div>'
            ].join('');

            // 阻止拖动
            $wrap.on('touchmove', self._touchmove.bind(self));

            document.body.appendChild($wrap[0]);
        },

        /**
         * 阻止滑动
         *
         * @private
         * @param  {Object} event 事件对象
         */
        _touchmove: function (event) {
            event.preventDefault();
            event.stopPropagation();
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Dialog.defaults = {
        ok: null,
        okValue: '确定',
        cancel: null,
        cancelValue: '取消',
        title: '',
        content: '',
        button: null,
        className: '',
        lock: true,
        time: null,
        verticalButtons: false,
        duration: 200
    };

    return Dialog;
});
