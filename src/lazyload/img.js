/**
 * @file 延迟加载 - 图片
 * @author fe.xiaowu <fe.xiaowu@gmail.com>
 * @module lazyload/img
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    var Img = Base.extend({

        /**
         * 构造函数
         *
         * @name Img
         * @class
         * @requires lazyload/base
         *
         * @param {Object} options 配置参数
         * @param {string} options.attr 图片源所在属性
         */
        constructor: function (options) {
            var self = this;
            var attr;

            // 初始化super
            Img.super.constructor.call(self, $.extend({}, Img.defaults, options));

            attr = self.get('attr');

            // 绑定加载单个的时候加载图片
            self.on('loaditem', function (data) {
                var $elem = $(data.elem);
                var src = $elem.attr(attr);

                if (src) {
                    $elem.attr('src', src).removeAttr(attr);
                }
            });
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Img.defaults = {
        attr: 'data-src'
    };

    return Img;
});
