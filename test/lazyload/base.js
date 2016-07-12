/**
 * @file 延迟加载基类测试
 * @author xiaowu <fe.xiaowu@gmail.com>
 */

define([
    'lazyload/base',
    'zepto'
], function (Lazyload, $) {
    'use strict';

    describe('lazyload/base', function () {
        afterEach(function () {
            $('.lazyload-base-test').remove();
        });

        it('options.elem is empty', function (done) {
            new Lazyload({
                elem: $('.lazyload-base-test')
            }).on('loaditem', function () {
                expect(1).toBeUndefined();
            }).on('loadall', function (a) {
                expect(a).toBeUndefined();
                done();
            });
        });
        it('options.elem', function (done) {
            var num = 0;
            var $elem = $('<div class="lazyload-base-test"></div><div class="lazyload-base-test"></div>');

            // 插入到页面中
            $elem.appendTo('body');

            // 假装已经加载过
            $elem.eq(1).data('lazyload-load', true);

            var app = new Lazyload({
                elem: $elem
            });

            app.on('loaditem', function () {
                num += 1;
            });

            app.on('loadall', function () {
                expect(num).toBe(1);
                done();
            });
        });

        // it('options.event', function (done) {
        //     var num = 0;
        //     var $elem = $('<div class="lazyload-base-test"></div><div class="lazyload-base-test"></div>');

        //     $elem.eq(0).height(window.innerHeight + 500).width(100);


        //     // 插入到页面中
        //     $elem.appendTo('body');
        //     console.log($("body").html())

        //     var app = new Lazyload({
        //         elem: $elem
        //     });

        //     app.on('loaditem', function (a) {
        //         console.log(a)
        //     });

        //     app.__check = function () {
        //         num += 1;
        //     };

        //     app.on('loadall', function () {
        //         console.log(num)
        //         done();
        //     });

        //     // window.scrollTo(window.innerHeight + 1000);
        // });
        // options.elem
        // options.event
        // options.threshold

        // lazyload-load
        // window.scroll, resize
        // scroll.namespace

        // #load, destroy之后
        // #__getEventName
        // #__load
        // #__checkAll
        // #__check

        // event.loadall
        // event.loaditem
        // event.destroy
        // event.queue
    });
});
