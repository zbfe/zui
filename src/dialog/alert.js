/**
 * @file Alert
 * @author schoeu1110@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    var Alert = Base.extend({
        constructor: function (options) {
            var me = this;
            $.extend(Alert.defaults, options);

            // 初始化zui
            Alert.super.constructor.call(me, Alert.defaults, options);

            me.__init();
        }
    });

    /**
     * 默认参数
     * **/
    Alert.defaults = {
        confirmText: '确定',
        confirmCallback: function(){}
    };

    return Alert;
});
