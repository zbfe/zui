/**
 * @file 异步请求基类测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'request/base',
    'zepto'
], function (Base, $) {
    'use strict';

    describe('request/base', function () {
        it('options.url', function () {});
        it('options.data', function () {});
        it('options.dataType', function () {});
        it('options.type', function () {});
        it('options.timeout', function () {});

        it('#request', function () {});
        it('#abort', function () {});

        it('events queue', function () {});
        it('event.complete', function () {});
        it('event.beforeSend', function () {});
        it('event.error', function () {});
        it('event.success', function () {});
        it('event.abort', function () {});
    });
});
