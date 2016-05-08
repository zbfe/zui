/**
 * @file 提示层
 * @author fe.xiaowu@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    // 加载样式
    require('css!./index.css');

    /**
     * 构造函数
     *
     * @param {Object} options 配置参数或者提示内容
     * @param {Function} options.onShow 显示成功后回调
     * @param {Function} options.onClose 关闭层后回调
     * @param {boolean} options.lock 是否锁定屏幕
     * @param {boolean} options.autoClose 是否自动关闭
     * @param {number} [options.time=2000] 自动关闭时间
     * @param {string} optoins.className 样式名
     */
    var Tips = function (options) {
        var self = this;

        // if (self.constructor  !== Tips) {
        //     throw new Error('Please instance constructor');
        // }

        // 如果值为一个字符串，则认为这是一个内容
        if ('string' === typeof options) {
            options = {
                content: options
            };
        }

        // 合并参数
        self.options = $.extend({}, Tips.defaults, options);

        // 初始化
        self.__init();
    };

    // 扩展原型
    $.extend(Tips.prototype, {
        __init: function () {
            var self = this;
            var options = self.options;
            var $inner;

            self.$wrap = $('<div />').addClass('zui-tips-wrap');

            $inner = $('<div />').css({
                transform: 'translate(-50%, -50%) scale3d(1.3, 1.3, 1)'
            }).addClass('zui-tips-inner ' + options.className).text(options.content);

            // 如果要锁屏
            if (options.lock === true) {
                self.$wrap.addClass('zui-tips-wrap-mask');
            }

            // 把dom插入到页面中
            self.$wrap.append($inner).appendTo('body');

            $inner.animate({
                transform: 'translate(-50%, -50%) scale3d(1, 1, 1)',
                opacity: 1
            }, Tips.animationTimeout, 'ease', function () {
                // 如果有自动关闭，则延迟关闭
                if (options.autoClose) {
                    self._timer = setTimeout(self.close.bind(self), options.time);
                }

                // 如果有显示回调则运行，this为当前实例
                if ('function' === typeof options.onShow) {
                    options.onShow.call(self);
                }
            });

            $inner = null;
        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            // 如果已经关闭
            if (self._closed) {
                return self;
            }

            // 如果有延迟时间，则清除，防止自动关闭和手动冲突
            if (self._timer) {
                clearTimeout(self._timer);
                delete self._timer;
            }

            self.$wrap.find('.zui-tips-inner').animate({
                transform: 'translate(-50%, -50%) scale3d(0.7, 0.7, 1)',
                opacity: 0
            }, Tips.animationTimeout, 'ease', function () {
                self.$wrap.remove();
                delete self.$wrap;

                // 如果有显示回调则运行，this为当前实例
                if ('function' === typeof self.options.onClose) {
                    self.options.onClose.call(self);
                }
            });

            // 打上关闭标识，防止重复关闭
            self._closed = true;

            return self;
        }
    });

    /**
     * 配置参数
     *
     * @type {Object}
     */
    Tips.defaults = {
        autoClose: true,
        time: 2000,
        content: 'loading',
        lock: true,
        className: 'zui-tips-default'
    };

    /**
     * 动画显示时长
     *
     * @type {Number}
     */
    Tips.animationTimeout = 200;

    return Tips;
});
