/**
 * @file 对话框基类测试
 * @author schoeu1110@gmail.com
 */
define([
    'dialog/dialog',
    'zepto'
], function (Dialog, $) {
    'use strict';

    describe('dialog/dialog', function () {
        afterEach(function () {
            $('.zui-dialog-musk').remove();
        });
    });

    it('Dialog(content)', function () {
        var app = new Dialog('内容');
        expect($('.zui-dialog-wrap').length).toBe(1);
        app.ele.find('.zui-dialog-btns').triggerHandler('click');
    });

});
