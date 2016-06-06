/**
 * @file confirm弹出层
 * @author fe.xiaowu@gmail.com
 * @events
 *     1. show 显示
 *     2. close 关闭
 *     3. destroy 销毁
 *     4. button:id 按钮点击回调
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Dialog = require('./index');

    var Confirm = Dialog.extend({

        /**
         * 构造函数
         *
         * @param  {Object} options 配置参数
         */
        constructor: function (title, content, ok, cancel) {
            var self = this;

            // 如果是 (str, function)
            if ('function' === typeof content) {
                ok = content;
                cancel = ok;
            }

            // 初始化zui
            Confirm.super.constructor.call(self, {
                title: title,
                content: content,
                ok: ok || true,
                cancel: cancel || true
            });
        }
    });

    return Confirm;
});
