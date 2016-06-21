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

        it('options.end', function () {
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
                end: new Date(Date.now() + 1000).getTime()
            });

            expect(app.getDiffTime()).toBe(1000);
        });
    });
});