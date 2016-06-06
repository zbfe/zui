/**
 * @file 弹出层测试
 * @author fe.xiaowu@gmail.com
 */
/* eslint-disable max-nested-callbacks */
define([
    'dialog2/dialog',
    'zepto'
], function (Dialog, $) {
    'use strict';

    describe('dialog2/dialog', function () {
        var duration = Dialog.defaults.duration;

        afterEach(function () {
            $('.zui-dialog').remove();
        });

        it('base', function () {
            expect(typeof Dialog).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-dialog').length).toBe(0);

            new Dialog();

            expect($('.zui-dialog').length).toBe(1);
        });

        it('app.$wrap', function (done) {
            var app = new Dialog();

            expect(app.$wrap.length).toBe(1);

            app.close();

            app.on('destroy', function () {
                expect(this.$wrap).toBeUndefined();
                done();
            });
        });

        it('options.ok', function (done) {
            var app = new Dialog({
                ok: function () {
                    expect(this).toEqual(app);
                    done();
                }
            });

            expect(app.$wrap.find('.zui-dialog-button').length).toBe(1);
            app.$wrap.find('.zui-dialog-button').triggerHandler('click');
        });

        it('options.ok, .cancel => true', function () {
            var app = new Dialog({
                ok: true,
                cancel: true
            });

            expect(app.$wrap.find('.zui-dialog-button').length).toBe(2);
        });

        it('options.ok, .cancel', function (done) {
            var app = new Dialog({
                ok: true,
                cancel: function () {
                    expect(this).toEqual(app);
                    done();
                }
            });

            expect(app.$wrap.find('.zui-dialog-button').length).toBe(2);
            app.$wrap.find('.zui-dialog-button').eq(1).triggerHandler('click');
        });

        it('options.okValue', function () {
            var app = new Dialog({
                ok: true,
                okValue: '成功'
            });

            expect(app.$wrap.find('.zui-dialog-button').text()).toBe('成功');
        });

        it('options.cancelValue', function () {
            var app = new Dialog({
                cancel: true,
                cancelValue: '成功'
            });

            expect(app.$wrap.find('.zui-dialog-button').text()).toBe('成功');
        });

        it('options.button => null, []', function () {
            new Dialog({
                button: null
            });
            expect($('.zui-dialog-button').length).toBe(0);

            new Dialog({
                button: []
            });
            expect($('.zui-dialog-button').length).toBe(0);
        });

        it('options.button', function (done) {
            var app = new Dialog({
                button: [
                    {
                        value: '111',
                        callback: function () {
                            expect(this).toEqual(app);
                            done();
                        }
                    }
                ]
            });

            expect($('.zui-dialog-button').length).toBe(1);
            expect(app.$wrap.find('.zui-dialog-button').text()).toBe('111');
            $('.zui-dialog-button').triggerHandler('click');
        });

        it('options.verticalButtons => true', function () {
            new Dialog({
                verticalButtons: true,
                ok: true
            });

            expect($('.zui-dialog-buttons').hasClass('zui-dialog-vertical-buttons')).toBe(true);
            expect($('.zui-dialog-buttons').hasClass('c-flexbox')).toBe(false);
        });

        it('options.verticalButtons => false', function () {
            new Dialog({
                verticalButtons: false,
                ok: true
            });

            expect($('.zui-dialog-buttons').hasClass('c-flexbox')).toBe(true);
            expect($('.zui-dialog-buttons').hasClass('zui-dialog-vertical-buttons')).toBe(false);
        });

        it('options.title => str', function () {
            new Dialog({
                title: '测试'
            });

            expect($('.zui-dialog-title').length).toBe(1);
            expect($('.zui-dialog-title').text()).toBe('测试');
            expect($('.zui-dialog-title').css('display')).toBe('block');
        });

        it('options.title => null', function () {
            new Dialog({
                title: null
            });

            expect($('.zui-dialog-title').length).toBe(1);
            expect($('.zui-dialog-title').css('display')).toBe('none');
        });

        it('options.content => str', function () {
            new Dialog({
                content: '测试'
            });

            expect($('.zui-dialog-text').length).toBe(1);
            expect($('.zui-dialog-text').text()).toBe('测试');
        });

        it('options.content => html', function () {
            new Dialog({
                content: '<div class="test-test-test">test</div>'
            });

            expect($('.test-test-test').length).toBe(1);
            expect($('.test-test-test').text()).toBe('test');
        });

        it('options.className => str', function () {
            var app = new Dialog({
                className: 'test-test-test'
            });

            expect($('.test-test-test').length).toBe(1);
            expect(app.$wrap.hasClass('test-test-test')).toBe(true);
        });

        it('options.lock => true', function () {
            new Dialog({
                lock: true
            });

            expect($('.zui-dialog-mask').css('display')).toBe('block');
        });

        it('options.lock => false', function () {
            new Dialog({
                lock: false
            });

            expect($('.zui-dialog-mask').css('display')).toBe('none');
        });

        it('options.time => num', function (done) {
            var num = Date.now();
            new Dialog({
                time: 100
            }).on('close', function () {
                // duration-1 是显示的动画时间
                // duration-2 是关闭的动画时间
                num = Date.now() - num - duration - duration;
                expect(num > 100).toBe(true);
                expect(num < 200).toBe(true);
                done();
            });
        });

        it('options.time check', function () {
            new Dialog({
                time: ''
            });

            new Dialog({
                time: '1'
            });

            new Dialog({
                time: 1
            });
        });

        it('options.duration 100', function (done) {
            var num = Date.now();
            new Dialog({
                duration: 100
            }).on('show', function () {
                num = Date.now() - num;
                expect(num > 100).toBe(true);
                expect(num < 200).toBe(true);
                done();
            });
        });

        it('options.duration 500', function (done) {
            var num = Date.now();
            new Dialog({
                duration: 500
            }).on('show', function () {
                num = Date.now() - num;
                expect(num > 500).toBe(true);
                expect(num < 1000).toBe(true);
                done();
            });
        });

        it('events queue', function (done) {
            var queue = [];
            var pushQueueHandle = function (type) {
                return function () {
                    queue.push(type);
                };
            };

            var app = new Dialog({
                duration: 100,
                ok: pushQueueHandle('ok')
            });

            app.on('destroy', pushQueueHandle('destroy'));
            app.on('show', pushQueueHandle('show'));
            app.on('close', pushQueueHandle('close'));

            // 显示之后才触发关闭
            // 模拟按套路出牌
            app.one('show', function () {
                app.$wrap.find('.zui-dialog-button').triggerHandler('click');
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('show,ok,close,destroy');
                done();
            });
        });
    });
});
