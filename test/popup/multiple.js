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
    });
});
