/**
 * @file alert弹出层
 * @author fe.xiaowu@gmail.com
 * @events
 *     1. show 显示
 *     2. close 关闭
 *     3. destroy 销毁
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Dialog = require('./dialog');

    var Alert = Dialog.extend({

        /**
         * 构造函数
         *
         * @param  {Object} options 配置参数
         */
        constructor: function (title, content, callback) {
            var self = this;

            // 如果是 (str, function)
            if ('function' === typeof content) {
                callback = content;
            }
            // 初始化zui
            Alert.super.constructor.call(self, {
                title: title,
                content: content,
                ok: callback || true,
                lock: true
            });
        }
    });

    return Alert;
});
