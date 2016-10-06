/**
 * @file 加载提示
 * @author xiaowu <fe.xiaowu@gmail.com>
 * @module loading/base
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');
    var random = require('tools/random');

    var Loading = Zui.extend({

        /**
         * 加载提示
         *
         * @class
         * @param  {Object} options 配置参数
         * @param {number} options.duration 循环步长，单位毫秒
         * @param {Array} options.texts 文本
         */
        constructor: function (options) {
            var self = this;

            // 父类
            Loading.super.constructor.call(self, Loading.defaults, options);

            self._length = self.get('texts').length;
            if (!self._length) {
                throw new TypeError('optoins.texts is empty!');
            }

            self._index = random(0, self._length - 1);
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
                index: self._index,
                text: self.get('texts')[self._index]
            });

            self._timer = setTimeout(function () {
                if (self._length > 1) {
                    while(true) {
                        var index = random(0, self._length - 1);
                        if (index !== self._index) {
                            self._index = index;
                            break;
                        }
                    };
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
    Loading.defaults = {
        texts: [
            '客观稍等...',
            '喝杯咖啡吧.',
            '白日依山尽，黄河入海流。',
            '欲穷千里目，更上一层楼。'
        ],
        duration: 3000
    };

    return Loading;
});

