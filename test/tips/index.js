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
        var animationTimeout = Tips.animationTimeout * 1.2;

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
            var flag = true;

            try {
                types.forEach(function (key) {
                    new Tips(key);
                });
            }
            catch (e) {
                flag = false;
            }

            expect(flag).toBe(true);
        });

        it('Tips(str)', function () {
            var str = getGuid();

            new Tips(str);
            expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
        });

        it('Tips({className})', function () {
            expect($('.test-test').length).toBe(0);
            new Tips({
                className: 'test-test'
            });
            expect($('.test-test').length).toBe(1);
        });

        it('{content: str}', function () {
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
                done();
            });
        });

        it('time: 1', function (done) {
            new Tips({
                time: 1
            }).on('show', function () {
                setTimeout(function () {
                    expect($('.zui-tips-wrap').length).toBe(0);
                    done();
                }, 1 + animationTimeout);
            });

            expect($('.zui-tips-wrap').length).toBe(1);
        });

        it('time: 1 => close', function (done) {
            var start = Date.now();

            new Tips({
                time: 1
            }).on('close', function () {
                var diff = Tips.animationTimeout + Tips.animationTimeout + 1;
                expect(Date.now() - start - diff < 100).toBe(true);
                done();
            });
        });

        it('{lock: true}', function () {
            new Tips({
                lock: true
            });

            expect($('.zui-tips-wrap.zui-tips-wrap-mask').length).toBe(1);
        });

        it('{lock: false}', function () {
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
                time: null
            });

            expect($('.zui-tips-wrap').length).toBe(1);

            app.close();

            setTimeout(function () {
                expect($('.zui-tips-wrap').length).toBe(0);
                done();
            }, animationTimeout + 100);
        });

        it('close() 返回值', function () {
            var app = new Tips();

            expect(app).toEqual(app.close());
        });

        it('close().close()', function () {
            var flag = true;

            try {
                new Tips().close().close().close().close();
            }
            catch (e) {
                flag = false;
            }

            expect(flag).toBe(true);
        });

        it('time => close()', function (done) {
            var app = new Tips({
                time: 1
            });

            setTimeout(function () {
                var flag = true;
                try {
                    app.close().close();
                }
                catch (e) {
                    flag = false;
                }
                expect(flag).toBe(true);
                done();
            }, 1 + animationTimeout);
        });

        it('close() => time', function (done) {
            var app = new Tips({
                time: 1
            });

            app.close();

            setTimeout(function () {
                expect(app.is('close')).toBe(true);
                done();
            }, 1 + animationTimeout);
        });

        it('event show', function (done) {
            var app = new Tips({
            });

            app.on('show', function () {
                expect(this).toEqual(app);
                done();
            });
        });

        it('event close', function (done) {
            var app = new Tips({
            });

            app.on('close', function () {
                expect(this).toEqual(app);
                app.close().close();
                done();
            });
        });

        it('close 次数', function (done) {
            var flag = 0;
            var app = new Tips({
                time: 1
            }).on('close', function () {
                flag += 1;
            });

            app.close().close().close();

            setTimeout(function () {
                expect(flag).toBe(1);
                done();
            }, 1 + animationTimeout + animationTimeout);
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
