/**
 * @file 提示框测试
 * @author schoeu1110@gmail.com
 */
define([
    'dialog/alert',
    'zepto'
], function (Alert, $) {
    'use strict';

    describe('dialog/alert', function () {

        afterEach(function () {
            $('.zui-dialog-musk').remove();
        });

        it('Alert buttons', function () {
            new Alert('内容').show();
            expect($('.zui-dialog-btns').length).toBe(1);
        });

        it('Alert frame OK', function () {
            var app = new Alert('内容');
            app.show();
            expect(app.ele.find('.zui-dialog-wrap').length).toBe(1);
        });
    });
});
