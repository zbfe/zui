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
        var tempData = [
            {
                text: 'text'
            }
        ];

        afterEach(function () {
            $('.zui-popup-wrap').remove();
        });

        it('base', function () {
            expect(typeof Multiple).toBe('function');
        });

        it('create Element', function () {
            expect($('.zui-popup-multiple').length).toBe(0);

            new Multiple({
                data: tempData
            });

            expect($('.zui-popup-multiple').length).toBe(1);
        });

        it('._popup', function () {
            var app = new Multiple({
                data: tempData
            });

            expect('object' === typeof app._popup).toBe(true);
        });

        it('options.onCancel', function (done) {
            var app = new Multiple({
                data: tempData,
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
                data: tempData,
                title: title
            });

            expect($('body').html().indexOf(title) === -1).toBe(false);
        });

        it('options.onSelect', function (done) {
            var app = new Multiple({
                data: tempData,
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
    });
});
