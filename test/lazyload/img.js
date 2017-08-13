/**
 * @file 延迟加载图片测试
 * @author xiaowu <fe.xiaowu@gmail.com>
 */

define([
    'lazyload/img',
    'zepto'
], function (Lazyload, $) {
    'use strict';
    var img = 'http://static.meishichina.com/v6/img/blank.gif';
    var img2 = 'http://static.meishichina.com/v6/img/blank.gif?1';

    describe('lazyload/img', function () {
        it('load', function (done) {
            var $elem = $('<img />').attr({
                'src': img,
                'data-src': img2
            }).appendTo('body');

            new Lazyload({
                elem: $elem
            });

            // 延迟一秒判断
            setTimeout(function () {
                expect($elem.attr('data-src')).toBeUndefined();
                expect($elem.attr('src')).toBe(img2);
                $elem.remove();
                done();
            }, 500);
        });

        it('options.attr', function (done) {
            var $elem = $('<img />').attr({
                'src': img,
                'data-src': img2
            }).appendTo('body');

            new Lazyload({
                elem: $elem,
                attr: 'data-xxoo'
            });

            // 延迟一秒判断
            setTimeout(function () {
                expect($elem.attr('data-src')).toBe(img2);
                expect($elem.attr('src')).toBe(img);
                $elem.remove();
                done();
            }, 500);
        });
    });
});
