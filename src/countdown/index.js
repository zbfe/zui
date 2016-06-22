/**
 * @file 倒计时
 * @author xiaowu <fe.xiaowu@gmail.com>
 * @module countdown/index
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');

    var Countdown = Zui.extend({

        /**
         * 倒计时
         *
         * @class
         * @param  {Object} options 配置参数
         * @param {number} options.duration 循环步长，单位毫秒
         * @param {number} options.end 到期13位时间缀
         */
        constructor: function (options) {
            var self = this;
            var end;

            // 父类
            Countdown.super.constructor.call(self, Countdown.defaults, options);

            // 计算结束时间
            end = parseFloat(self.get('end'), 10);

            // 如果结束时间不是数字
            if (String(end) === 'NaN') {
                throw new TypeError('options.end not number');
            }

            // 计算时间偏移
            self._diff = end - Date.now();

            setTimeout(self._check.bind(self));
        },

        /**
         * 获取时间偏移值
         *
         * @return {number} 数字
         */
        getDiffTime: function () {
            return this.is('destroy') ? 0 : this._diff;
        },

        /**
         * 获取时间
         *
         * @param  {string} str 日期格式字符串
         *
         * @return {string}     格式化后的日期
         *
         * @example
         * // 默认文案
         * getTime();
         *
         * // 自定义文案
         * getTime('当前还有{h}小时到时');
         *
         * // 补齐位数
         * getTime('当前还有{ss}秒，{uuu}毫秒');
         */
        getTime: function (str) {
            var self = this;
            var data = self._getTime(self._diff);

            if (!str || 'string' !== typeof str) {
                str = '{d}天{hh}时{ii}分{ss}秒{uuu}毫秒';
            }

            return str.replace(/{(\w)\1*}/g, function ($0, $1) {
                // 如果不存在
                if (typeof data[$1] === 'undefined') {
                    return '';
                }

                return self._pad(data[$1], $0.length - 2);
            });
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
            this.is('destroy', 1);

            // 清空倒计时
            clearTimeout(this._timer);

            /**
             * 销毁实例
             *
             * @event destroy
             */
            return this.trigger('destroy');
        },

        /**
         * 向左补齐位数
         *
         * @private
         * @param  {number} str 数字
         * @param {number} length 最短长度
         *
         * @return {string}     补齐后的字符
         */
        _pad: function (str, length) {
            length = length || 2;
            str = String(str);

            if (str.length < length) {
                str = new Array(length).join('0') + str;
            }

            return str;
        },

        /**
         * 时间缀转换成日期
         *
         * @private
         * @param  {number} leave diff的时间缀
         *
         * @return {Object}       日期对象
         */
        _getTime: function (leave) {
            var day = Math.floor(leave / (1000 * 60 * 60 * 24));
            var hour = Math.floor(leave / (1000 * 60 * 60)) % 24;
            var minute = Math.floor(leave / (1000 * 60)) % 60;
            var second = Math.floor(leave / 1000) % 60;
            var u = Math.floor(leave / 1) % 1000;

            return {
                d: day,
                h: hour,
                i: minute,
                s: second,
                u: u
            };
        },

        /**
         * 检查是否到期
         *
         * @private
         */
        _check: function () {
            var self = this;

            // 如果时间到了触发end并销毁
            if (self._diff <= 0) {
                self.trigger('end').destroy();
            }
            else {
                /**
                 * 检查回调
                 *
                 * @event check
                 */
                self.trigger('check');

                self._timer = setTimeout(function () {
                    self._diff -= self.get('duration');
                    self._check();
                }, self.get('duration'));
            }
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Countdown.defaults = {
        end: null,
        duration: 1000
    };

    return Countdown;
});

