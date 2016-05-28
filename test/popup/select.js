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
            var temp1;
            var temp2;

            try {
                new Select();
            }
            catch (e) {
                temp1 = true;
            }

            try {
                new Select({
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
            new Select({
                data: [
                    {
                        text: '我是一个兵'
                    }
                ]
            });

            expect($('.zui-popup-select').html().indexOf('我是一个兵') > -1).toBe(true);
        });

        it('event cancel', function (done) {
            new Select({
                data: tempData
            }).on('cancel', function (a) {
                expect(a).toBeUndefined();
                done();
            });

            $('.zui-popup-select-cancel').trigger('click');
        });

        it('event cancel:null', function (done) {
            var app = new Select({
                data: tempData
            });

            app.close = done;

            expect($('.zui-popup-select-cancel').length).toBe(1);
            $('.zui-popup-select-cancel').trigger('click');
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

        it('event select:null', function (done) {
            var app = new Select({
                data: tempData
            });

            app.close = done;
            expect($('.zui-popup-select-cancel').length).toBe(1);
            $('.zui-popup-select-item').eq(0).trigger('click');
        });

        it('close', function () {
            expect(typeof new Select({data: tempData}).close).toBe('function');
        });

        it('close()', function (done) {
            expect($('.zui-popup-select').length).toBe(0);
            var app = new Select({
                data: tempData
            });
            expect($('.zui-popup-select').length).toBe(1);
            app.close();
            setTimeout(function () {
                expect($('.zui-popup-select').length).toBe(0);
                done();
            }, animationTimeout);
        });

        it('close().close()', function () {
            var app = new Select({
                data: tempData
            });

            expect(app.close().close()).toBe(app);
        });
    });
});
