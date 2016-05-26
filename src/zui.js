/**
 * @file class类
 * @author fe.xiaowu
 */

define(function (require) {
    // Class
    var Class = require('Class');

    var $ = require('zepto');

    /**
     * zui基类
     */
    var Zui = Class.extend({
        // 构造函数
        constructor: function () {
            var self = this;
            var args = [].slice.call(arguments);

            self._listener = {};

            // 如果有参数则认为需要合并配置
            if (args.length > 0) {
                args.unshift(true, {});
                self.options = $.extend.apply($, args);
            }
            else {
                self.options = {};
            }

            // 解决init事件
            self.trigger('init');
        },

        on: function () {
            console.log('on');
        },

        one: function () {
            console.log('one');
        },

        off: function () {
            console.log('off');
        },

        trigger: function () {
            console.log('trigger');
        },

        destroy: function () {
            this.trigger('destroy');
            this._listener = {};
            return this;   
        }
    });

    return Zui;
});
