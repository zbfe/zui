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
        var animationTimeout = Base.animationTimeout * 1.2;

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
            new Base();

            $('.zui-popup-mask').trigger('click');

            setTimeout(function () {
                expect($('.zui-popup-wrap').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('base.close', function () {
            var app = new Base();

            expect(typeof app.close).toBe('function');
        });

        it('base.close()', function (done) {
            var app = new Base();

            expect($('.zui-popup-wrap').length).toBe(1);

            expect(app.close()).toBe(app);

            setTimeout(function () {
                expect($('.zui-popup-wrap').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('base.close().close()', function () {
            var app = new Base();

            expect(app.close().close()).toBe(app);
        });

        it('options.className', function (done) {
            expect($('.xxoo').length).toBe(0);
            var app = new Base({
                className: 'xxoo'
            });

            expect($('.xxoo').length).toBe(1);

            app.close();

            setTimeout(function () {
                expect($('.xxoo').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('.$wrap', function (done) {
            var app = new Base();

            expect(typeof app.$wrap !== 'undefined').toBe(true);
            expect(app.$wrap.get(0).className.indexOf('zui-popup-wrap') > -1).toBe(true);

            app.close();

            setTimeout(function () {
                expect(typeof app.$wrap !== 'undefined').toBe(false);
                done();
            }, animationTimeout);
        });

        it('options.content', function () {
            var app = new Base({
                content: 'xxoo'
            });

            expect(app.$wrap.html().indexOf('xxoo') > -1).toBe(true);
        });

        it('event cancel', function (done) {
            new Base({
                content: 'xxoo'
            }).on('cancel', function (a) {
                expect(a).toBeUndefined();
                done();
            }).$wrap.find('.zui-popup-mask').triggerHandler('click');
        });
    });
});
