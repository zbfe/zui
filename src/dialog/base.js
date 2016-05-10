define(function(require, factory) {
    'use strict';
    
    // 加载样式
    require('css!./base.css');
    
    var loop = function (){};
    
    var $ = require('zepto');
    
    var defaultOptions = {
        vertical: false,
        okCallback: loop,
        cancelCallback: loop,
        buttons: [
            {
                text: '确定',
                callback: function (){
                    okCallback();
                }
            },
            {
                text: '取消',
                callback: function () {
                    cancelCallback();
                }
            }
        ] 
    };
    
    /**
     * Dialog构造函数 
     */
    function Dialog(options) {
        this.options = $.extend(defaultOptions, options);
        this.__init();
    }
    
    $.extend(Dialog.prototype, {
        __init: function () {
            
        }
    });
    
    
    
    return Dialog;
    
});
