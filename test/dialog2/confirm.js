/**
 * @file confirm弹出层测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'dialog2/confirm',
    'zepto'
], function (Confirm, $) {
    'use strict';

    describe('dialog2/confirm', function () {
        afterEach(function () {
            $('.zui-dialog').remove();
        });

        it('Confirm(title)', function () {
            new Confirm('标题');
            expect($('.zui-dialog').length).toBe(1);
        });

        it('Confirm(title, callback)', function (done) {
            var app = new Confirm('标题', done);
            expect($('.zui-dialog').length).toBe(1);
            app.$wrap.find('.zui-dialog-button').eq(0).triggerHandler('click');
        });

        it('Confirm(title, callback, callback)', function (done) {
            var app = new Confirm('标题', function () {}, done);
            expect($('.zui-dialog').length).toBe(1);
            app.$wrap.find('.zui-dialog-button').eq(1).triggerHandler('click');
        });

        it('Confirm(title, content, callback)', function (done) {
            var app = new Confirm('标题', '内容', done);
            expect($('.zui-dialog').length).toBe(1);
            app.$wrap.find('.zui-dialog-button').eq(0).triggerHandler('click');
        });

        it('Confirm(title, content, callback, callback)', function (done) {
            var app = new Confirm('标题', '内容', function () {}, done);
            expect($('.zui-dialog').length).toBe(1);
            app.$wrap.find('.zui-dialog-button').eq(1).triggerHandler('click');
        });
    });
});
