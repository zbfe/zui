/**
 * @file Confirm
 * @author schoeu1110@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Dialog = require('./dialog');

    var loop = function(){};

    var Confirm = Dialog.extend({
        constructor: function (options) {
            var me = this;

            options = $.extend({}, Confirm.defaults, options);

            // 初始化zui
            Confirm.super.constructor.call(me, options);
        }
    });

    /**
     * 默认参数
     * @param {string} text 按钮文案
     * @param {Function} callback 按钮回调函数
     */
    Confirm.defaults = {
        buttons: [{
            text: '取消',
            callback: loop
        },{
            text: '确定',
            callback: loop
        }]
    };

    return Confirm;
});
