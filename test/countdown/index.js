/**
 * @file 倒计时测试用例
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'countdown/index'
], function (Countdown) {
    'use strict';

    describe('countdown/index', function () {
        it('new Countdown()', function () {
            expect(function () {
                new Countdown();
            }).toThrowError(TypeError);

            expect(function () {
                new Countdown();
            }).toThrowError('options.end not number');
        });

        it('options.end', function (done) {
            expect(function () {
                new Countdown({
                    end: 'str'
                });
            }).toThrowError(TypeError);

            expect(function () {
                new Countdown({
                    end: true
                });
            }).toThrowError(TypeError);

            var app = new Countdown({
                end: new Date(Date.now() + 100).getTime()
            });

            app.on('end', done);
        });

        it('options.duration', function (done) {
            var num = 0;
            var app = new Countdown({
                end: new Date(Date.now() + 400).getTime(),
                duration: 100
            });

            app.on('check', function () {
                num += 1;
            });

            app.on('destroy', function () {
                expect(num).toBe(4);
                done();
            });
        });

        it('#getDiffTime', function () {
            var app = new Countdown({
                end: new Date(Date.now() + 400).getTime()
            });

            expect(app.getDiffTime() < 410 && app.getDiffTime() > 390).toBe(true);
            app.destroy();
            expect(app.getDiffTime()).toBe(0);
        });

        it('#destroy', function (done) {
            var app = new Countdown({
                end: new Date(Date.now() + 400).getTime()
            });
            var num = 0;

            app.on('check', function () {
                num += 0;
            });

            expect(app.destroy().destroy().destroy()).toEqual(app);

            setTimeout(function () {
                expect(num).toBe(0);
                done();
            });
        });

        it('#getTime', function () {
            var app = new Countdown({
                end: new Date(Date.now() + 1000).getTime()
            });

            app._getTime = function () {
                return {
                    d: 1,
                    h: 2,
                    i: 3,
                    s: 4,
                    u: 5
                };
            };

            expect(typeof app.getTime()).toBe('string');
            expect(app.getTime('{test}')).toBe('{test}');
            expect(app.getTime('{111}{222}{333}{test3}')).toBe('{test3}');

            expect(app.getTime('{d}')).toBe('1');
            expect(app.getTime('{dd}')).toBe('01');
            expect(app.getTime('{ddd}')).toBe('001');

            expect(app.getTime('{h}')).toBe('2');
            expect(app.getTime('{i}')).toBe('3');
            expect(app.getTime('{s}')).toBe('4');

            expect(app.getTime('{u}')).toBe('5');
            expect(app.getTime('{uu}')).toBe('05');
            expect(app.getTime('{uuu}')).toBe('005');
        });

        it('#_pad', function () {
            var app = new Countdown({
                end: new Date(Date.now() + 1000).getTime()
            });

            expect(app._pad(1)).toBe('01');
            expect(app._pad(0)).toBe('00');
            expect(app._pad(true)).toBe('true');
            expect(app._pad(1, 1)).toBe('1');
            expect(app._pad(1, 2)).toBe('01');
            expect(app._pad(1, 3)).toBe('001');
            expect(app._pad(1, 5)).toBe('00001');
        });

        it('#_getTime', function () {
            var app = new Countdown({
                end: new Date(Date.now() + 1000).getTime()
            });

            // 返回值
            expect(typeof app._getTime(1000)).toBe('object');

            // 毫秒验证
            expect(app._getTime(100)).toEqual({
                d: 0,
                h: 0,
                i: 0,
                s: 0,
                u: 100
            });

            // 秒验证
            expect(app._getTime(3000)).toEqual({
                d: 0,
                h: 0,
                i: 0,
                s: 3,
                u: 0
            });

            // 分验证
            expect(app._getTime(1000 * 60 * 3)).toEqual({
                d: 0,
                h: 0,
                i: 3,
                s: 0,
                u: 0
            });

            // 小时验证
            expect(app._getTime(1000 * 60 * 60 * 3)).toEqual({
                d: 0,
                h: 3,
                i: 0,
                s: 0,
                u: 0
            });

            // 天验证
            expect(app._getTime(1000 * 60 * 60 * 24 * 3)).toEqual({
                d: 3,
                h: 0,
                i: 0,
                s: 0,
                u: 0
            });

            expect(app._getTime(3 + 3000 + 1000 * 60 * 3 + 1000 * 60 * 60 * 3 + 1000 * 60 * 60 * 24 * 3)).toEqual({
                d: 3,
                h: 3,
                i: 3,
                s: 3,
                u: 3
            });
        });

        it('events queue', function (done) {
            var app = new Countdown({
                end: new Date(Date.now() + 100).getTime()
            });

            var queue = [];

            app.on('check', function () {
                queue.push('check');
            }).on('end', function () {
                queue.push('end');
            }).on('destroy', function () {
                queue.push('destroy');
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toBe('check,end,destroy');
                done();
            });
        });
        it('event check', function (done) {
            var app = new Countdown({
                end: new Date(Date.now() + 100).getTime()
            });

            app.on('check', function (a) {
                expect(a).toBeUndefined();
                done();
            });
        });
        it('event end', function (done) {
            var app = new Countdown({
                end: new Date(Date.now() + 100).getTime()
            });

            app.on('end', function (a) {
                expect(a).toBeUndefined();
                done();
            });
        });
    });
});
