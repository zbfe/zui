/**
 * @file 下浮层多选测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'popup/base',
    'popup/multiple',
    'zepto'
], function (Base, Multiple, $) {
    'use strict';

    describe('popup/multiple', function () {
        var animationTimeout = Base.animationTimeout * 1.2;
        var tempData = function () {
            return [
                {
                    text: 'text'
                }
            ]
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

        it('._popup', function () {
            var app = new Multiple({
                data: tempData()
            });

            expect(typeof app._popup).toBe('object');
        });

        it('options.onCancel', function (done) {
            var app = new Multiple({
                data: tempData(),
                onCancel: function (a) {
                    expect(a).toBeUndefined();
                    done();
                }
            });

            app._popup.$wrap.find('.zui-popup-mask').triggerHandler('click');
        });

        it('options.data empty', function () {
            var temp1;
            var temp2;

            try {
                new Multiple();
            }
            catch (e) {
                temp1 = true;
            }

            try {
                new Multiple({
                    data: []
                });
            }
            catch (e) {
                temp2 = true;
            }

            expect(temp1).toBe(true);
            expect(temp2).toBe(true);
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

        it('options.title', function () {
            var title = Date.now();

            expect($('body').html().indexOf(title) === -1).toBe(true);

            new Multiple({
                data: tempData(),
                title: title
            });

            expect($('body').html().indexOf(title) === -1).toBe(false);
        });

        it('options.onSelect null', function (done) {
            new Multiple({
                data: tempData(),
                onSelect: null
            });
            expect($('.zui-popup-multiple').length).toBe(1);
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
            setTimeout(function () {
                expect($('.zui-popup-multiple').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('options.onSelect', function (done) {
            var app = new Multiple({
                data: tempData(),
                onSelect: function (data) {
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
                }
            });
            $('.zui-popup-multiple-header-all').eq(0).triggerHandler('click');
        });

        it('options.onSelect old', function (done) {
            var app = new Multiple({
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
                ],
                onSelect: function (data) {
                    expect(data.old.length).toBe(1);
                    expect(data.old[0]).toBe(0);
                    expect(data.oldValue[0]).toBe('value1');
                    done();
                }
            });
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('options.onSelect old=>new', function (done) {
            var app = new Multiple({
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
                ],
                onSelect: function (data) {
                    expect(data.value.length).toBe(1);
                    expect(data.value[0]).toBe('value2');
                    expect(data.index.length).toBe(1);
                    expect(data.index[0]).toBe(1);
                    expect(data.old.length).toBe(1);
                    expect(data.old[0]).toBe(0);
                    expect(data.oldValue[0]).toBe('value1');
                    done();
                }
            });
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(1).triggerHandler('click');
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('options.onSelect data', function (done) {
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
            var app = new Multiple({
                data: data,
                onSelect: function () {
                    expect(data[0].selected).toBe(false);
                    expect(data[1].selected).toBe(true);
                    done();
                }
            });
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(1).triggerHandler('click');
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('options.onSelect(data.event=none)', function (done) {
            var app = new Multiple({
                data: tempData(),
                onSelect: function (data) {
                    expect(typeof data.event).toBe('string');
                    expect(data.event).toBe('none');
                    done();
                }
            });
            $('.zui-popup-multiple-header-done').eq(0).triggerHandler('click');
        });

        it('options.onSelect(data.event=change)', function (done) {
            var app = new Multiple({
                data: tempData(),
                onSelect: function (data) {
                    expect(typeof data.event).toBe('string');
                    expect(data.event).toBe('change');
                    done();
                }
            });
            $('.zui-popup-multiple-header-all').eq(0).triggerHandler('click');
        });

        it('options.data selected', function () {
            var app = new Multiple({
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
            var app = new Multiple({
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

        it('all trigger', function (done) {
            var app = new Multiple({
                data: tempData(),
                onSelect: function (data) {
                    expect(typeof data).toBe('object');
                    done();
                }
            });

            $('.zui-popup-multiple-header-all').triggerHandler('click');
        });

        it('all trigger - disabled', function (done) {
            var flag = true;
            var app = new Multiple({
                data: [
                    {
                        text: '1',
                        selected: 1
                    }
                ],
                onSelect: function () {
                    flag = false;
                }
            });

            $('.zui-popup-multiple-header-all').triggerHandler('click');
            setTimeout(function () {
                expect(flag).toBe(true);
                done();
            }, animationTimeout);
        });

        it('click item', function (done) {
            var app = new Multiple({
                data: tempData(),
                onSelect: function (data) {
                    expect(data.index.length).toBe(1);
                    expect(data.index[0]).toBe(0);
                    done();
                }
            });

            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-list > li').eq(0).triggerHandler('click');
            $('.zui-popup-multiple-header-done').triggerHandler('click');
        });

        it('close', function () {
            expect(typeof new Multiple({data: tempData()}).close).toBe('function');
        });

        it('close()', function (done) {
            expect($('.zui-popup-multiple').length).toBe(0);
            var app = new Multiple({
                data: tempData()
            });
            expect($('.zui-popup-multiple').length).toBe(1);
            app.close();
            setTimeout(function () {
                expect($('.zui-popup-multiple').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('close().close()', function () {
            var app = new Multiple({
                data: tempData()
            });

            expect(app.close().close()).toBe(app);
        });

    });
});
