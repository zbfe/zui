/**
 * @file 提示层测试用例
 * @author xiaowu
 */


define([
    'tips/loading',
    'tips/index',
    'zepto'
], function (loading, Tips, $) {
    describe('tips/loading', function () {
        afterEach(function () {
            $('.zui-tips-wrap').remove();
        });

        it('loading', function () {
            expect(typeof loading).toBe('function');
            expect(loading).toBe(loading.show);
        });

        it('loading.show', function () {
            expect(typeof loading.show).toBe('function');
            expect(loading.show).toBe(loading);
        });

        it('loading.hide', function () {
            expect(typeof loading.hide).toBe('function');
        });

        it('loading()', function () {
            loading();
            expect($('.zui-tips-loading').length).toBe(1);
            expect($('.zui-tips-loading').html().indexOf('数据加载中') > -1).toBe(true);
        });

        it('loading().show()', function () {
            expect(loading().show()).toBe(loading);
        });

        it('loading.show()', function () {
            loading.show();
            expect($('.zui-tips-loading').length).toBe(1);
            expect(loading.show().show()).toBe(loading);
        });

        it('loading.show().show()', function () {
            expect(loading.show().show()).toBe(loading);
        });

        it('loading.show(str)', function () {
            loading.show('真的');
            expect($('.zui-tips-loading').html().indexOf('真的') > -1).toBe(true);
            expect($('.zui-tips-loading').length).toBe(1);
        });

        it('loading.hide()', function (done) {
            loading.hide();

            loading.show();
            expect($('.zui-tips-loading').length).toBe(1);

            loading.hide();

            /* eslint-disable max-nested-callbacks */
            setTimeout(function () {
                expect($('.zui-tips-loading').length).toBe(0);
                done();
            }, Tips.animationTimeout * 1.2);

            /* eslint-enable max-nested-callbacks */
        });

        it('loading.hide().hide()', function () {
            expect(loading.hide().hide()).toBe(loading);
        });
    });
});
