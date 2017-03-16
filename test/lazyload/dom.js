/**
 * @file 延迟加载dom元素测试
 * @author xiaowu <fe.xiaowu@gmail.com>
 */

define([
    'lazyload/dom',
    'zepto'
], function (Lazyload, $) {
    'use strict';

    describe('lazyload/dom', function () {
        it('load', function (done) {
            var $elem = $('<div />').html([
                '<script type="text/template">',
                    '<em>ok</em>',
                '</script>'
            ].join('')).appendTo('body');

            new Lazyload({
                elem: $elem,
                loadElem: 'script'
            });

            setTimeout(function () {
                expect($elem.find('em').html()).toBe('ok');
                $elem.remove();
                done();
            }, 500);
        });

        it('load - textarea', function (done) {
            var $elem = $('<div />').html([
                '<textarea>',
                    '<em>ok</em>',
                '</textarea>'
            ].join('')).appendTo('body');

            new Lazyload({
                elem: $elem
            });

            setTimeout(function () {
                expect($elem.find('em').html()).toBe('ok');
                $elem.remove();
                done();
            }, 500);
        });
    });
});
