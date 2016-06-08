/**
 * @file 下浮层基类
 * @author fe.xiaowu@gmail.com
 *
 * @events
 *     1. cancel
 *     2. close
 *     3. destroy
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Zui = require('zui');

    // 加载样式
    require('css!./base.css');

    var Base = Zui.extend({

        /**
         * 构造函数
         *
         * @param {Object} options 参数参数
         */
        constructor: function (options) {
            var self = this;
            var $wrap;
            var $inner;

            // 初始化zui
            Base.super.constructor.call(self, Base.defaults, options);

            $wrap = self.$wrap = $('<div />').addClass('zui-popup-wrap');
            $inner = $('<div />').addClass('zui-popup-inner ' + self.get('className')).html(self.get('content'));

            // 添加遮罩层
            $wrap.append('<div class="zui-popup-mask"></div>');

            $wrap.append($inner);

            $wrap.appendTo('body');

            $wrap.addClass('zui-popup-show');

            $inner.animate({
                transform: 'translateY(0)'
            }, Base.animationTimeout);

            $wrap.find('.zui-popup-mask').on('click', function () {
                self.close();
                self.trigger('cancel');
            }).on('touchmove', false);

            $inner = null;
        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            if (self.is('close')) {
                return self;
            }

            // 打上标识
            self.is('close', true);

            self.$wrap.removeClass('zui-popup-show');

            self.$wrap.find('.zui-popup-inner').animate({
                transform: 'translateY(100%)'
            }, Base.animationTimeout, 'ease', function () {
                self.$wrap.remove();
                self.trigger('close destroy');
            });

            return self;
        }
    });

    /**
     * 默认参数
     *
     * @param {Object} options 配置对象
     * @param {string} options.content 内容
     * @param {string} options.className 自定义样式
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
