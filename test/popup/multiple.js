/**
 * @file 下浮层多选测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'popup/base',
    'popup/multiple',
    'zepto'
], function (Base, Multiple, $) {
    'use strict';

    describe('popup/multiple', function () {
        var eventsName = [
            'cancel',
            'close',
            'destroy',
            'select',
            'clickDone',
            'clickAll',
            'clickItem'
        ];
        var tempData = function () {
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
            expect(typeof Multiple).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-multiple').length).toBe(0);

            new Multiple({
                data: tempData()
            });

            expect($('.zui-popup-multiple').length).toBe(1);
        });

        it('options.data empty', function () {
            expect(function () {
                new Multiple();
            }).toThrowError(Error);

            expect(function () {
                new Multiple();
            }).toThrowError('options.data is empty');

            expect(function () {
                new Multiple({
                    data: []
                });
            }).toThrowError(Error);

            expect(function () {
                new Multiple({
                    data: []
                });
            }).toThrowError('options.data is empty');
        });

        it('options.data', function () {
            new Multiple({
                data: [
                    {
                        text: '我是一个兵'
                    }
                ]
            });

            expect($('.zui-popup-multiple').html().indexOf('我是一个兵') > -1).toBe(true);
        });

        it('options.data selected', function () {
            new Multiple({
                data: [
                    {
                        text: '测试1',
                        selected: true
                    },
                    {
                        text: '测试2',
                        selected: 1
                    },
                    {
                        text: '测试2'
                    }
                ]
            });

            expect($('.zui-popup-multiple-selected').length).toBe(2);
            expect($('.zui-popup-multiple-header-all').hasClass('zui-popup-multiple-header-disabled')).toBe(false);
        });

        it('options.data all selected', function () {
            new Multiple({
                data: [
                    {
                        text: '测试1',
                        selected: true
                    }
                ]
            });

            expect($('.zui-popup-multiple-selected').length).toBe(1);
            expect($('.zui-popup-multiple-header-all').hasClass('zui-popup-multiple-header-disabled')).toBe(true);
        });

        it('options.title', function () {
            var title = Date.now();

            expect($('body').html().indexOf(title) === -1).toBe(true);

            new Multiple({
                data: tempData(),
                title: title
            });

            expect($('body').html().indexOf(title) === -1).toBe(false);
        });

        it('event select null', function (done) {
            new Multiple({
                data: tempData()
            }).on('close', done);

            expect($('.zui-popup-multiple').length).toBe(1);
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('event select', function (done) {
            var app = new Multiple({
                data: tempData()
            }).on('select', function (data) {
                expect(this).toBe(app);
                expect(Array.isArray(data.index)).toBe(true);
                expect(Array.isArray(data.value)).toBe(true);
                expect(Array.isArray(data.old)).toBe(true);
                expect(Array.isArray(data.oldValue)).toBe(true);
                expect(data.index.length).toBe(1);
                expect(data.index).toContain(0);
                expect(data.value.length).toBe(1);
                expect(data.value[0]).toBeUndefined();
                expect(data.old.length).toBe(0);
                expect(data.oldValue.length).toBe(0);
                expect(typeof data.event).toBe('string');
                expect(data.event).toBe('change');
                done();
            });
            $('.zui-popup-multiple-header-all').eq(0).triggerHandler('click');
        });

        it('event select old', function (done) {
            new Multiple({
                data: [
                    {
                        text: 'text1',
                        selected: 1,
                        value: 'value1'
                    },
                    {
                        text: 'text2',
                        value: 'value2'
                    },
                    {
                        text: 'text3',
                        value: 'value3'
                    }
                ]
            }).on('select', function (data) {
                expect(data.old.length).toBe(1);
                expect(data.old[0]).toBe(0);
                expect(data.oldValue[0]).toBe('value1');
                done();
            });
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('event select old=>new', function (done) {
            new Multiple({
                data: [
                    {
                        text: 'text1',
                        selected: 1,
                        value: 'value1'
                    },
                    {
                        text: 'text2',
                        value: 'value2'
                    },
                    {
                        text: 'text3',
                        value: 'value3'
                    }
                ]
            }).on('select', function (data) {
                expect(data.value.length).toBe(1);
                expect(data.value[0]).toBe('value2');
                expect(data.index.length).toBe(1);
                expect(data.index[0]).toBe(1);
                expect(data.old.length).toBe(1);
                expect(data.old[0]).toBe(0);
                expect(data.oldValue[0]).toBe('value1');
                done();
            });
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(1).triggerHandler('click');
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('event select data', function (done) {
            var data = [
                {
                    text: 'text1',
                    selected: 1,
                    value: 'value1'
                },
                {
                    text: 'text2',
                    value: 'value2'
                },
                {
                    text: 'text3',
                    value: 'value3'
                }
            ];
            new Multiple({
                data: data
            }).on('select', function () {
                expect(data[0].selected).toBe(false);
                expect(data[1].selected).toBe(true);
                done();
            });
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(1).triggerHandler('click');
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('event select click item', function (done) {
            new Multiple({
                data: tempData()
            }).on('select', function (data) {
                expect(data.index.length).toBe(1);
                expect(data.index[0]).toBe(0);
                done();
            });

            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-header-done').triggerHandler('click');
        });

        it('event select(data.event=none)', function (done) {
            new Multiple({
                data: tempData()
            }).on('select', function (data) {
                expect(typeof data.event).toBe('string');
                expect(data.event).toBe('none');
                done();
            });
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('event select(data.event=change)', function (done) {
            new Multiple({
                data: tempData()
            }).on('select', function (data) {
                expect(typeof data.event).toBe('string');
                expect(data.event).toBe('change');
                done();
            });
            $('.zui-popup-multiple-header-all').eq(0).triggerHandler('click');
        });

        it('event clickDone', function (done) {
            new Multiple({
                data: tempData()
            }).on('clickDone', function (data) {
                expect(data).toBeUndefined();
                done();
            });

            $('.zui-popup-multiple-header-done').triggerHandler('click');
        });

        it('event clickAll', function (done) {
            new Multiple({
                data: tempData()
            }).on('clickAll', function (data) {
                expect(data).toBeUndefined();
                done();
            });

            $('.zui-popup-multiple-header-all').triggerHandler('click');
        });

        it('event clickAll - disabled', function (done) {
            var app = new Multiple({
                data: [
                    {
                        text: '1',
                        selected: 1
                    }
                ]
            }).on('clickAll', function () {
                expect(1).toBe(0);
            }).on('destroy', function (data) {
                expect(data).toBeUndefined();
                done();
            });

            $('.zui-popup-multiple-header-all').triggerHandler('click');

            setTimeout(function () {
                app.close();
            });
        });

        it('event clickItem', function (done) {
            new Multiple({
                data: tempData()
            }).on('clickItem', function (data) {
                expect(data).toBeUndefined();
                done();
            });

            $('.zui-popup-multiple-list > li').triggerHandler('click');
        });

        it('events queue - done->select->close->destroy', function (done) {
            var app = new Multiple({
                data: tempData()
            });
            var queue = [];

            eventsName.forEach(function (key) {
                app.on(key, function () {
                    queue.push(key);
                });
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('clickDone,select,close,destroy');
                done();
            });

            $('.zui-popup-multiple-header-done').triggerHandler('click');
        });

        it('events queue - clickItem->clickItem->all->select->close->destroy', function (done) {
            var app = new Multiple({
                data: tempData()
            });
            var queue = [];

            eventsName.forEach(function (key) {
                app.on(key, function () {
                    queue.push(key);
                });
            });

            app.on('destroy', function () {
                expect(queue.join(',')).toEqual('clickItem,clickItem,clickAll,select,close,destroy');
                done();
            });

            $('.zui-popup-multiple-list > li').triggerHandler('click');
            $('.zui-popup-multiple-list > li').triggerHandler('click');
            $('.zui-popup-multiple-header-all').triggerHandler('click');
        });
    });
});
