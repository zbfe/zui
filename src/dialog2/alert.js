/**
 * @file alert弹出层
 * @author fe.xiaowu@gmail.com
 * @module dialog2/alert
 * @events
 *     1. show 显示
 *     2. close 关闭
 *     3. destroy 销毁
 */


define(function (require) {
    'use strict';

    var Dialog = require('./dialog');

    var Alert = Dialog.extend({

        /**
         * 构造函数
         *
         * @name Alert
         * @class
         * @requires dialog2/dialog
         *
         * @param  {string} title 标题
         * @param {string} content 内容
         * @param {Function} callback 确定回调
         *
         * @example
         * // 只有标题
         * new Alert('str');
         *
         * @example
         * // 有标题和确定按钮回调
         * new Alert('str', funciton () {});
         *
         * @example
         * // 有标题、内容和确定按钮回调
         * new Alert('str', 'content', funciton () {});
         */
        constructor: function (title, content, callback) {
            var self = this;

            // 如果是 (str, function)
            if ('function' === typeof content) {
                callback = content;
                content = '';
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
