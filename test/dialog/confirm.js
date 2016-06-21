/**
 * @file 提示框测试
 * @author schoeu1110@gmail.com
 */
define([
    'dialog/confirm',
    'zepto'
], function (Confirm, $) {
    'use strict';

    describe('dialog/confirm', function () {

        afterEach(function () {
            $('.zui-dialog-musk').remove();
        });

        it('Confirm buttons', function () {
            new Confirm('内容').show();
            expect($('.zui-dialog-btns').length).toBe(2);
        });

        it('Confirm frame OK', function () {
            var app = new Confirm('内容');
            app.show();
            expect(app.ele.find('.zui-dialog-wrap').length).toBe(1);
        });
    });
});
