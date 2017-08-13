/**
 * @file 延迟加载 - 元素
 * @author fe.xiaowu <fe.xiaowu@gmail.com>
 * @module lazyload/dom
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    var Dom = Base.extend({

        /**
         * 构造函数
         *
         * @name Dom
         * @class
         * @requires lazyload/base
         *
         * @param {Object} options 配置参数
         * @param {string|HTMLElement} [options.loadElem=textarea] 要加载的元素
         */
        constructor: function (options) {
            var self = this;

            // 初始化super
            Dom.super.constructor.call(self, $.extend({}, Dom.defaults, options));

            // 绑定加载单个的时候加载图片
            self.on('loaditem', function (data) {
                var $elem = $(data.elem);
                var $dom = $elem.find(self.get('loadElem'));

                // 如果元素存在
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
