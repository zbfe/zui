/**
 * @file Alert
 * @author schoeu1110@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    var defaultOptions = {
        confirmText: '确定',
        confirmCallback: function(){}
    };

    function Alert(options) {
        this.options = $.extend(defaultOptions, options);
        this.__init();
    }
    
    $.extend(Alert.prototype, {
        __init: function () {
            var me = this;
            var options = me.options;
            me.options.buttons = [{
                text: options.confirmText || '',
                callback: options.confirmCallback || ''
            }];
            me.super = new Base(me.options);
        },
        hide: function () {
            this.super.hide();
        },
        show: function () {
            this.super.show();
        }
    });
    

    return Alert;
});
