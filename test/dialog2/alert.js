/**
 * @file 弹出层测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'dialog2/alert',
    'zepto'
], function (Alert, $) {
    'use strict';

    describe('dialog2/alert', function () {
        afterEach(function () {
            $('.zui-dialog2').remove();
        });

        it('Alert(title)', function () {
            new Alert('标题');
            expect($('.zui-dialog2').length).toBe(1);
        });

        it('Alert(title, callback)', function (done) {
            var app = new Alert('标题', done);
            expect($('.zui-dialog2').length).toBe(1);
            app.$wrap.find('.zui-dialog2-button').triggerHandler('click');
        });

        it('Alert(title, content, callback)', function (done) {
            var app = new Alert('标题', '内容', done);
            expect($('.zui-dialog2').length).toBe(1);
            app.$wrap.find('.zui-dialog2-button').triggerHandler('click');
        });
    });
});
