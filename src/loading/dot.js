/**
 * @file 加载提示 - 点点
 * @author xiaowu <fe.xiaowu@gmail.com>
 * @module loading/dot
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');

    var Dot = Zui.extend({

        /**
         * 加载提示
         *
         * @class
         * @param  {Object} options 配置参数
         * @param {number} options.duration 循环步长，单位毫秒
         * @param {Array} options.text 文本
         */
        constructor: function (options) {
            var self = this;

            // 父类
            Dot.super.constructor.call(self, Dot.defaults, options);

            self._index = 1;

            setTimeout(self._start.bind(self));
        },

        /**
         * 开始计算
         *
         * @private
         */
        _start: function () {
            var self = this;

            self.trigger('data', {
                text: self.get('text') + new Array(self._index).join('.')
            });

            self._timer = setTimeout(function () {
                self._index += 1;
                if (self._index > 4) {
                    self._index = 1;
                }
                self._start();
            }, self.get('duration'));
        },

        /**
         * 销毁
         *
         * @return {Object} this
         */
        destroy: function () {
            var self = this;

            // 如果已经销毁
            if (self.is('destroy')) {
                return self;
            }

            // 打上标识
            self.is('destroy', 1);

            // 清空倒计时
            clearTimeout(self._timer);

            /**
             * 销毁实例
             *
             * @event destroy
             */
            return self.trigger('destroy');
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Dot.defaults = {
        text: '加载中',
        duration: 1000
    };

    return Dot;
});

