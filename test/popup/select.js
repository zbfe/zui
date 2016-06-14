/**
 * @file 下浮层select测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'popup/base',
    'popup/select',
    'zepto'
], function (Base, Select, $) {
    'use strict';

    describe('popup/select', function () {
        var tempData = [
            {
                text: 'text'
            }
        ];

        afterEach(function () {
            $('.zui-popup-wrap').remove();
        });

        it('base', function () {
            expect(typeof Select).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-select').length).toBe(0);

            new Select({
                data: tempData
            });

            expect($('.zui-popup-select').length).toBe(1);
        });

        it('options.data empty', function () {
            expect(function () {
                new Select();
            }).toThrowError(Error);

            expect(function () {
                new Select();
            }).toThrowError('options.data is empty');

            expect(function () {
                new Select({
                    data: []
                });
            }).toThrowError(Error);

            expect(function () {
                new Select({
                    data: []
                });
            }).toThrowError('options.data is empty');
        });

        it('options.data', function () {
            new Select({
                data: [
                    {
                        text: '我是一个兵'
                    }
                ]
            });

            expect($('.zui-popup-select').html().indexOf('我是一个兵') > -1).toBe(true);
        });

        it('event select', function (done) {
            var app = new Select({
                data: tempData
            }).on('select', function (data) {
                expect(this).toBe(app);
                expect(data.index).toBe(0);
                expect(data.value).toBe(undefined);
                done();
            });

            $('.zui-popup-select-item').eq(0).trigger('click');
        });

        it('events queue', function (done) {
            var app = new Select({
                data: tempData
            });
            var queue = [];

            app.on('select', function () {
                queue.push('select');
            });

            app.on('cancel', function () {
                queue.push('cancel');
            });

            app.on('close', function () {
                queue.push('close');
            });

            app.on('destroy', function () {
                queue.push('destroy');
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('select,close,destroy');
                done();
            });

            $('.zui-popup-select-item').eq(0).trigger('click');
        });

        it('events queue - cancel', function (done) {
            var app = new Select({
                data: tempData
            });
            var queue = [];

            app.on('select', function () {
                queue.push('select');
            });

            app.on('cancel', function () {
                queue.push('cancel');
            });

            app.on('close', function () {
                queue.push('close');
            });

            app.on('destroy', function () {
                queue.push('destroy');
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('cancel,close,destroy');
                done();
            });

            $('.zui-popup-select-cancel').eq(0).trigger('click');
        });
    });
});
