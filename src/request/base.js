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
        type: 'GET'
    };

    return Base;
});