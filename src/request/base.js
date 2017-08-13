/**
 * @file 异步请求基类
 * @author xiaowu <fe.xiaowu@gmail.com>
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Zui = require('zui');

    var Base = Zui.extend({

        /**
         * 构造函数
         *
         * @param {Object} options 参数参数
         */
        constructor: function (options) {
            var self = this;

            // 初始化zui
            Base.super.constructor.call(self, Base.defaults, options);

            // 绑定结束后清空xhr对象
            self.on('complete', function () {
                self._xhr = null;
            });

            // 当前的xhr对象
            // self._xhr = null;
        },

        /**
         * 开始请求
         *
         * @return {Object} this
         */
        request: function () {
            var self = this;
            var options = self.get();

            // 先取消下
            self.abort();

            // 加载前事件
            self.trigger('beforeSend');

            // 开始请求
            self._xhr = $.ajax({
                url: options.url,
                type: options.type,
                data: options.data,
                dataType: options.dataType,
                timeout: options.timeout,
                error: function (xhr, status) {
                    if (xhr && status !== 'abort') {
                        /**
                         * 请求出错
                         * @event error
                         */
                        self.trigger('error', [xhr, status]);
                    }
                },
                complete: function () {
                    /**
                     * 请求完成
                     * @event complete
                     */
                    self.trigger('complete');
                },
                success: function (res) {
                    /**
                     * 请求成功
                     * @event success
                     */
                    self.trigger('success', res);
                }
            });

            return self;
        },

        /**
         * 取消请求
         *
         * @return {Object} this
         */
        abort: function () {
            var self = this;

            if (self._xhr) {
                self._xhr.abort();
                self._xhr = null;

                /**
                 * 取消当前请求
                 * @event abort
                 */
                self.trigger('abort');
            }

            return self;
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Base.defaults = {
        url: null,
        data: {},
        dataType: 'json',
        type: 'GET',
        timeout: 5000
    };

    return Base;
});
