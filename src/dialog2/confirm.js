/**
 * @file confirm弹出层
 * @author fe.xiaowu@gmail.com
 * @module dialog2/confirm
 * @events
 *     1. show 显示
 *     2. close 关闭
 *     3. destroy 销毁
 */

define(function (require) {
    'use strict';

    var Dialog = require('./dialog');

    var Confirm = Dialog.extend({

        /**
         * 构造函数
         *
         * @name Confirm
         * @class
         * @requires dialog2/dialog
         *
         * @param  {string} title 标题
         * @param {string} content 内容
         * @param {Function} ok 确定回调
         * @param {Function} cancel 取消回调
         *
         * @example
         * // 只有标题
         * new Confirm('str');
         *
         * @example
         * // 有标题和确定按钮回调
         * new Confirm('str', funciton () {});
         *
         * @example
         * // 有标题、内容和确定按钮回调
         * new Confirm('str', 'content', funciton () {});
         *
         * @example
         * // 有标题、内容和确定、取消按钮回调
         * new Confirm('str', 'content', funciton () {}, function () {});
         */
        constructor: function (title, content, ok, cancel) {
            var self = this;

            // 如果是 (str, function)
            if ('function' === typeof content) {
                cancel = ok;
                ok = content;
                content = '';
            }

            // 初始化zui
            Confirm.super.constructor.call(self, {
                title: title,
                content: content,
                ok: ok || true,
                cancel: cancel || true,
                lock: true
            });
        }
    });

    return Confirm;
});
