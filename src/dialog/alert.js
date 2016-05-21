/**
 * @file Alert
 * @author schoeu1110@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var base = require('./base');

    // 引用css
    require('css!./base.css');

    var defaultOptions = {
        confirmText: '确定',
        confirmCallback: function(){}
    };

    function Alert(options) {
        this.options = $.extend(defaultOptions, options);
        this.__init();
    }
    
    $.extend(Alert.prototype, {
        hide: function () {
            
        },
        show: function () {
            
        }
    });
    

    return Alert;
});
