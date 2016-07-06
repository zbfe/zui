/**
 * @file 延迟加载 - 元素
 * @author fe.xiaowu <fe.xiaowu@gmail.com>
 * @module lazyload/img
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    var Dom = Base.extend({
        constructor: function (options) {
            var self = this;
            var attr;

            // 初始化super
            Dom.super.constructor.call(self, $.extend({}, Dom.defaults, options));

            // 绑定加载单个的时候加载图片
            self.on('loaditem', function (data) {
                var $elem = $(data.elem);
                var $dom = $elem.find(self.get('loadElem'));

                if ($dom.length) {
                    $elem.html($dom.get(0).tagName.toLowerCase() === 'textarea' ? $dom.val() : $dom.html());
                }
            });
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Dom.defaults = {
        loadElem: 'textarea'
    };

    return Dom;
});
