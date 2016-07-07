/**
 * @file 下浮层基类测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'popup/base',
    'zepto'
], function (Base, $) {
    'use strict';

    describe('popup/base', function () {
        afterEach(function () {
            $('.zui-popup-wrap').remove();
        });

        it('base', function () {
            expect(typeof Base).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-wrap').length).toBe(0);

            new Base();

            expect($('.zui-popup-wrap').length).toBe(1);
        });

        it('mask Element', function () {
            expect($('.zui-popup-mask').length).toBe(0);

            new Base();

            expect($('.zui-popup-mask').length).toBe(1);
        });

        it('mask click', function (done) {
            new Base({
                duration: 1
            }).on('show', function () {
                $('.zui-popup-mask').trigger('click');
            }).on('close', function () {
                expect($('.zui-popup-mask').length).toBe(0);
                done();
            });
        });

        it('.close', function () {
            var app = new Base();

            expect(typeof app.close).toBe('function');
        });

        it('.close()', function (done) {
            var app = new Base({
                duration: 50
            });

            expect($('.zui-popup-wrap').length).toBe(1);

            expect(app.close().close()).toBe(app);

            setTimeout(function () {
                expect($('.zui-popup-wrap').length).toBe(0);
                done();
            }, 100);
        });

        it('options.height', function () {
            var app = new Base({
                height: 100,
                className: 'xxoo-height'
            });

            expect($('.xxoo-height').height()).toBe(100);

            var app2 = new Base({
                className: 'xxoo-height2',
                height: '80%'
            });
            expect($('.xxoo-height2').height()).toBe(window.innerHeight * .8);
        });

        it('options.className', function (done) {
            expect($('.xxoo').length).toBe(0);
            var app = new Base({
                className: 'xxoo'
            });

            expect($('.xxoo').length).toBe(1);

            app.on('close', function () {
                expect($('.xxoo').length).toBe(0);
                done();
            });
            app.close();
        });

        it('.$wrap', function (done) {
            var app = new Base();

            expect(typeof app.$wrap !== 'undefined').toBe(true);
            expect(app.$wrap.get(0).className.indexOf('zui-popup-wrap') > -1).toBe(true);

            app.on('destroy', function () {
                expect(typeof app.$wrap !== 'undefined').toBe(false);
                done();
            });

            app.close();
        });

        it('options.content', function () {
            var app = new Base({
                content: 'xxoo'
            });

            expect(app.$wrap.html().indexOf('xxoo') > -1).toBe(true);
        });

        it('event cancel', function (done) {
            new Base({
                duration: 1
            }).on('cancel', function (a) {
                expect(a).toBeUndefined();
                done();
            }).on('show', function () {
                this.$wrap.find('.zui-popup-mask').triggerHandler('click');
            });
        });

        it('event show', function (done) {
            new Base({
                duration: 1
            }).on('show', function (a) {
                expect(a).toBeUndefined();
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

            var app = new Base({
                duration: 1
            });

            app.on('destroy', pushQueueHandle('destroy'));
            app.on('show', pushQueueHandle('show'));
            app.on('cancel', pushQueueHandle('cancel'));
            app.on('close', pushQueueHandle('close'));

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('show,cancel,close,destroy');
                done();
            });

            app.on('show', function () {
                app.$wrap.find('.zui-popup-mask').triggerHandler('click');    
            });
        });
    });
});
