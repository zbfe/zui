/**
 * @file 提示层测试用例
 * @author fe.xiaowu@gmail.com
 */

define([
    'tips/index',
    'zepto'
], function (Tips, $) {
    'use strict';

    describe('tips/index', function () {
        var types = [
            '',
            0,
            false,
            true,
            1,
            null,
            undefined, function () {},
            {},
            []
        ];

        var guid = 0;
        var getGuid = function () {
            guid += 1;
            return 'zui-tips-' + guid;
        };

        afterEach(function () {
            $('.zui-tips-wrap').remove();
        });

        it('Tips', function () {
            expect(typeof Tips).toBe('function');
        });

        it('check params', function () {
            types.forEach(function (key) {
                new Tips(key);
            });
        });

        it('Tips(str)', function () {
            var str = getGuid();

            new Tips(str);
            expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
        });

        it('options.className', function () {
            expect($('.test-test').length).toBe(0);
            new Tips({
                className: 'test-test'
            });
            expect($('.test-test').length).toBe(1);
        });

        it('options.content', function () {
            var str = getGuid();

            new Tips({
                content: str
            });

            expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
        });

        it('callback this', function (done) {
            var app = new Tips({
                time: null
            });

            app.on('show', function () {
                this.close();
                expect($('.zui-tips-wrap').length).toBe(1);
                expect(this).toBe(app);
            });

            app.on('close', function () {
                expect(this).toBe(app);
                expect($('.zui-tips-wrap').length).toBe(0);
            });

            app.on('destroy', function () {
                expect(this).toBe(app);
                expect($('.zui-tips-wrap').length).toBe(0);
                done();
            });
        });

        it('options.time', function (done) {
            var start = Date.now();

            new Tips({
                time: 1,
                duration: 1
            }).on('show', function () {
                expect($('.zui-tips-wrap').length).toBe(1);
            }).on('close', function () {
                expect(Date.now() - start < 100).toBe(true);
                expect($('.zui-tips-wrap').length).toBe(0);
                done();
            });
        });

        it('options.lock = true', function () {
            new Tips({
                lock: true
            });

            expect($('.zui-tips-wrap.zui-tips-wrap-mask').length).toBe(1);
        });

        it('options.lock = false', function () {
            new Tips({
                lock: false
            });

            expect($('.zui-tips-wrap.zui-tips-wrap-mask').length).toBe(0);
        });

        it('.$wrap', function (done) {
            var app = new Tips({
                time: 100
            }).on('close', function () {
                expect(typeof app.$wrap === 'undefined').toBe(false);
            }).on('destroy', function () {
                expect(typeof app.$wrap === 'undefined').toBe(true);
                done();
            });

            expect(typeof app.$wrap !== 'undefined').toBe(true);
        });

        it('close()', function (done) {
            var app = new Tips({
                time: null,
                duration: 1
            });

            expect($('.zui-tips-wrap').length).toBe(1);

            expect(app.close().close().close()).toBe(app);

            setTimeout(function () {
                expect($('.zui-tips-wrap').length).toBe(0);
                done();
            }, 20);
        });

        it('close() => options.time', function (done) {
            var app = new Tips({
                time: 1000,
                duration: 1
            });

            app.close();

            setTimeout(function () {
                expect(app.is('close')).toBe(true);
                done();
            }, 100 + 20);
        });

        it('event show', function (done) {
            var app = new Tips({
            });

            app.on('show', function () {
                expect(this).toEqual(app);
                done();
            });
        });

        it('event close,destroy', function (done) {
            var flag = 0;
            var app = new Tips({
                time: 1,
                duration: 1
            }).on('close', function () {
                expect(this).toEqual(app);
                flag += 1;
            }).on('destroy', function () {
                expect(this).toEqual(app);
                expect(flag).toBe(1);
                done();
            });

            app.close().close().close();
        });

        it('events queue', function (done) {
            var queue = [];
            var pushQueueHandle = function (type) {
                return function () {
                    queue.push(type);
                };
            };

            var app = new Tips({
                time: 100
            });

            app.on('destroy', pushQueueHandle('destroy'));
            app.on('show', pushQueueHandle('show'));
            app.on('close', pushQueueHandle('close'));

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('show,close,destroy');
                done();
            });
        });
    });
});
