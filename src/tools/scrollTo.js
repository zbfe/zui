/**
 * @file 移动端动画scrollTo
 * @author fe.xiaowu@gmail.com
 * @module tools/scrollTo
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');
    var $ = require('zepto');

    var $html = $('html');
    var $document = $(document);

    var _getPosition = function () {
        return {
            x: window.scrollX,
            y: window.scrollY,
            width: window.innerWidth,
            height: window.innerHeight,
            allWidth: $document.width(),
            allHeight: $document.height()
        };
    };

    var defaults = {
        duration: 300,
        easing: 'ease-out'
    };

    return function (x, y, duration, easing, callback) {
        var position = _getPosition();

        if ('number' !== typeof x) {
            x = position.x;
        }

        if ('number' !== typeof y) {
            y = position.y;
        }

        // 默认值
        easing = easing || defaults.easing;
        duration = duration || defaults.duration;

        if (x < 0) {
            x = 0;
        }

        if (y < 0) {
            y = 0;
        }

        // 如果滚出可视范围
        if (x + position.width > position.allWidth) {
            x = position.allWidth - position.width;
        }

        // 如果滚出可视范围
        if (y + position.height > position.allHeight) {
            y = position.allHeight - position.height;
        }

        // 计算滚动的目标值
        var translate = [
            position.x - x,
            position.y - y
        ].map(function (val) {
            return val + 'px';
        }).join(', ');

        $html.on('touchmove.scrollTo', false);

        // 开始
        $html.animate({
            transform: 'translate(' + translate + ')'
        }, duration, easing, function () {
            $html.css('transform', 'none');
            window.scrollTo(x, y);

            $html.off('touchmove.scrollTo');

            if ('function' === typeof callback) {
                callback();
            }

        });
    };
});
