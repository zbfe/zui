/**
 * @file 下浮层单选测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'popup/base',
    'popup/radio',
    'zepto'
], function (Base, Radio, $) {
    'use strict';

    describe('popup/radio', function () {
        var getTempData = function () {
            return [
                {
                    text: 'text'
                }
            ];
        };

        afterEach(function () {
            $('.zui-popup-wrap').remove();
        });

        it('base', function () {
            expect(typeof Radio).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-radio').length).toBe(0);

            new Radio({
                data: getTempData()
            });

            expect($('.zui-popup-radio').length).toBe(1);
        });

        it('Element click close', function (done) {
            new Radio({
                data: getTempData()
            }).on('close', done);

            expect($('.zui-popup-radio').length).toBe(1);

            $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');
        });

        it('options.data empty', function () {
            expect(function () {
                new Radio();
            }).toThrowError(Error);

            expect(function () {
                new Radio();
            }).toThrowError('options.data is empty');

            expect(function () {
                new Radio({
                    data: []
                });
            }).toThrowError(Error);

            expect(function () {
                new Radio({
                    data: []
                });
            }).toThrowError('options.data is empty');
        });

        it('options.data', function () {
            new Radio({
                data: [
                    {
                        text: '我是一个兵'
                    }
                ]
            });

            expect($('.zui-popup-radio').html().indexOf('我是一个兵') > -1).toBe(true);
        });

        it('options.data check selected', function () {
            new Radio({
                data: [
                    {
                        text: '1',
                        selected: true
                    },
                    {
                        text: '2',
                        selected: true
                    },
                    {
                        text: '3'
                    },
                    {
                        text: '4',
                        selected: true
                    }
                ]
            });

            expect($('.zui-popup-radio-selected').length).toBe(1);
        });

        it('options.data close=>open', function (done) {
            var data = [
                {
                    text: '111',
                    selected: true,
                    value: '111'
                },
                {
                    text: '2222',
                    selected: true,
                    value: '222'
                },
                {
                    text: '3333',
                    value: '333'
                }
            ];
            new Radio({
                data: data
            }).on('select', function (data) {
                expect(data.index).toBe(1);
                expect(data.old).toBe(0);
                expect(data.value).toBe('222');
                expect(data.oldValue).toBe('111');
            }).on('destroy', function () {
                new Radio({
                    data: data
                }).on('select', function (data) {
                    expect(data.index).toBe(0);
                    expect(data.old).toBe(1);
                    expect(data.value).toBe('111');
                    expect(data.oldValue).toBe('222');
                    done();
                });
                $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');
            });

            $('.zui-popup-radio-list > li').eq(1).triggerHandler('click');
        });

        it('options.title', function () {
            var title = Date.now();

            expect($('body').html().indexOf(title) === -1).toBe(true);

            new Radio({
                data: getTempData(),
                title: title
            });

            expect($('body').html().indexOf(title) === -1).toBe(false);
        });

        it('event select', function (done) {
            var app = new Radio({
                data: getTempData()
            }).on('select', function (data) {
                expect(this).toBe(app);
                expect(data.index).toBe(0);
                expect(data.value).toBeUndefined();
                expect(data.old).toBeUndefined();
                expect(data.oldValue).toBeUndefined();
                done();
            });

            $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');
        });

        it('event select old', function (done) {
            var app = new Radio({
                data: [
                    {
                        text: 1
                    },
                    {
                        text: 2,
                        selected: true
                    }
                ]
            }).on('select', function (data) {
                expect(this).toBe(app);
                expect(data.index).toBe(0);
                expect(data.value).toBeUndefined();
                expect(data.old).toBe(1);
                expect(data.oldValue).toBeUndefined();
                done();
            });

            $('.zui-popup-radio-list > li').eq(0).trigger('click');
        });

        it('event select(data.event=none)', function (done) {
            new Radio({
                data: [
                    {
                        text: 'text1',
                        selected: true
                    }
                ]
            }).on('select', function (data) {
                expect(typeof data.event).toBe('string');
                expect(data.event).toBe('none');
                done();
            });
            $('.zui-popup-radio-list > li').eq(0).trigger('click');
        });

        it('event select(data.event=change)', function (done) {
            new Radio({
                data: [
                    {
                        text: 'text1'
                    }
                ]
            }).on('select', function (data) {
                expect(typeof data.event).toBe('string');
                expect(data.event).toBe('change');
                done();
            });
            $('.zui-popup-radio-list > li').eq(0).trigger('click');
        });

        it('events queue', function (done) {
            var app = new Radio({
                data: getTempData()
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

            $('.zui-popup-radio-list > li').eq(0).trigger('click');
        });
    });
});
