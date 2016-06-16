/**
 * @file Alert
 * @author schoeu1110@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Dialog = require('./dialog');

    var Alert = Dialog.extend({
        constructor: function (options) {
            var me = this;
            // 初始化zui
            Alert.super.constructor.call(me, Alert.defaults, options);
        }
    });

    /**
     * 默认参数
     * @param {string} text 按钮文案
     * @param {Function} callback 按钮回调函数
     */
    Alert.defaults = {
        text: '确定',
        callback: function(){}
    };

    return Alert;
});
