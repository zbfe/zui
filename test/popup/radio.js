/**
 * @file 下浮层单选测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'popup/base',
    'popup/radio',
    'zepto'
], function (Base, Radio, $) {
    'use strict';

    describe('popup/radio', function () {
        var animationTimeout = Base.animationTimeout * 1.2;
        var tempData = [
            {
                text: 'text'
            }
        ];

        afterEach(function () {
            $('.zui-popup-wrap').remove();
        });

        it('base', function () {
            expect(typeof Radio).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-radio').length).toBe(0);

            new Radio({
                data: tempData
            });

            expect($('.zui-popup-radio').length).toBe(1);
        });

        it('options.data empty', function () {
            var temp1;
            var temp2;

            try {
                new Radio();
            }
            catch (e) {
                temp1 = true;
            }

            try {
                new Radio({
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
            new Radio({
                data: [
                    {
                        text: '我是一个兵'
                    }
                ]
            });

            expect($('.zui-popup-radio').html().indexOf('我是一个兵') > -1).toBe(true);
        });

        it('options.title', function () {
            var title = Date.now();

            expect($('body').html().indexOf(title) === -1).toBe(true);

            new Radio({
                data: tempData,
                title: title
            });

            expect($('body').html().indexOf(title) === -1).toBe(false);
        });

        it('options.onSelect', function (done) {
            var app = new Radio({
                data: tempData,
                onSelect: function (data) {
                    expect(this).toBe(app);
                    expect(data.index).toBe(0);
                    expect(data.value).toBeUndefined();
                    expect(data.old).toBeUndefined();
                    expect(data.oldValue).toBeUndefined();
                    done();
                }
            });

            $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');
        });

        it('options.onSelect old', function (done) {
            var app = new Radio({
                data: [
                    {
                        text: 1
                    },
                    {
                        text: 2,
                        selected: true
                    }
                ],
                onSelect: function (data) {
                    expect(this).toBe(app);
                    expect(data.index).toBe(0);
                    expect(data.value).toBeUndefined();
                    expect(data.old).toBe(1);
                    expect(data.oldValue).toBeUndefined();
                    done();
                }
            });

            $('.zui-popup-radio-list > li').eq(0).trigger('click');
        });

        it('多选中的验证只选中第一个', function () {
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

        it('关闭后再弹出是否选中', function (done) {
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
                data: data,
                onSelect: function (data) {
                    expect(data.index).toBe(1);
                    expect(data.old).toBe(0);
                    expect(data.value).toBe('222');
                    expect(data.oldValue).toBe('111');
                }
            });

            $('.zui-popup-radio-list > li').eq(1).triggerHandler('click');

            setTimeout(function () {
                new Radio({
                    data: data,
                    onSelect: function (data) {
                        expect(data.index).toBe(0);
                        expect(data.old).toBe(1);
                        expect(data.value).toBe('111');
                        expect(data.oldValue).toBe('222');
                        done();
                    }
                });
                $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');
            }, animationTimeout);
        });

        it('close', function () {
            expect(typeof new Radio({data: tempData}).close).toBe('function');
        });

        it('close()', function (done) {
            expect($('.zui-popup-radio').length).toBe(0);
            var app = new Radio({
                data: tempData
            });
            expect($('.zui-popup-radio').length).toBe(1);
            app.close();
            setTimeout(function () {
                expect($('.zui-popup-radio').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('close().close()', function () {
            var app = new Radio({
                data: tempData
            });

            expect(app.close().close()).toBe(app);
        });

        it('Element click close', function (done) {
            var app = new Radio({
                data: tempData
            });

            expect($('.zui-popup-radio').length).toBe(1);

            $('.zui-popup-radio-list > li').eq(0).triggerHandler('click');

            setTimeout(function () {
                expect($('.zui-popup-radio').length).toBe(0);
                app.close().close();
                done();
            }, animationTimeout);
        });
    });
});
