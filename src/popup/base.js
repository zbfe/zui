/**
 * @file 下浮层基类
 * @author fe.xiaowu
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    // 加载样式
    require('css!./base.css');

    /**
     * 构造函数
     *
     * @param {Object} options 配置对象
     * @param {string} options.content 内容
     * @param {string} options.className 窗口的类
     */
    function Base(options) {
        this.options = $.extend({}, Base.defaults, options);
        this.__init();
    }

    $.extend(Base.prototype, {
        __init: function () {
            var self = this;
            var $wrap = this.$wrap = $('<div />').addClass('zui-popup-wrap');
            var $inner = $('<div />').addClass('zui-popup-inner ' + this.options.className).html(this.options.content);

            // 添加遮罩层
            $wrap.append('<div class="zui-popup-mask"></div>');

            $wrap.append($inner);

            $wrap.appendTo('body');

            $wrap.addClass('zui-popup-show');

            $inner.animate({
                transform: 'translateY(0)'
            }, Base.animationTimeout);

            $wrap.find('.zui-popup-mask').on('click', self.close.bind(self)).on('touchmove', false);

            $inner = null;
        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            if (self._closed) {
                return self;
            }

            self._closed = true;

            self.$wrap.removeClass('zui-popup-show');

            self.$wrap.find('.zui-popup-inner').animate({
                transform: 'translateY(100%)'
            }, Base.animationTimeout, 'ease', function () {
                self.$wrap.remove();
                delete self.$wrap;
            });

            return self;
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Base.defaults = {
        className: '',
        content: ''
    };

    /**
     * 动画显示时长
     *
     * @type {Number}
     */
    Base.animationTimeout = 200;

    return Base;
});
