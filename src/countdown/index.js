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
         */
        constructor: function (options) {
            var self = this;
            var end;

            // 父类
            Countdown.super.constructor.call(self, Countdown.defaults, options);

            // 计算结束时间
            end = parseFloat(self.get('end'), 10);

            // 如果结束时间不是数字
            if (String(end) === 'NaN' || 'number' !== typeof end) {
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
         */
        getTime: function (str) {
            var time = this._getTime(this._diff);

            if (!str || 'string' !== typeof str) {
                str = '{d}天{h}时{i}分{s}秒{c}毫秒';
            }

            return str.replace(/{(\w)}/g, function ($0, $1) {
                return time[$1] || '';
            });
        },

        /**
         * 销毁
         *
         * @return {Object} this
         */
        destroy: function () {
            if (this.is('destroy')) {
                return this;
            }

            this.is('destroy', 1);
            clearTimeout(this.is('timer'));

            /**
             * 销毁实例
             *
             * @event destroy
             */
            return this.trigger('destroy');
        },

        /**
         * 补齐
         *
         * @private
         * @param  {number} num 数字
         *
         * @return {string}     补齐后的字符
         */
        _pad: function (num) {
            num = String(num);
            if (num.length === 0) {
                num = '0' + num;
            }

            return num;
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
            var self = this;
            var day = Math.floor(leave / (1000 * 60 * 60 * 24));
            var hour = Math.floor(leave / (1000 * 60 * 60)) % 24;
            var minute = Math.floor(leave / (1000 * 60)) % 60;
            var second = Math.floor(leave / 1000) % 60;
            var s = Math.floor(leave / 1) % 1000;

            return {
                d: self._pad(day),
                h: self._pad(hour),
                i: self._pad(minute),
                s: self._pad(second),
                c: self._pad(s)
            };
        },

        /**
         * 检查是否到期
         *
         * @private
         */
        _check: function () {
            var self = this;
            var timer;

            if (self._diff <= 0) {
                self.trigger('end');
            }
            else {
                /**
                 * 检查回调
                 *
                 * @event check
                 */
                self.trigger('check');

                timer = setTimeout(function () {
                    self._diff -= self.get('duration');
                    self._check();
                }, self.get('duration'));

                self.is('timer', timer);
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
