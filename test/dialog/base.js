/**
 * @file 对话框基类测试
 * @author schoeu1110@gmail.com
 */
define([
    'dialog/base',
    'zepto'
], function (Base, $) {
    'use strict';

    describe('dialog/base', function () {
        afterEach(function () {
            $('.zui-dialog-musk').remove();
        });
    });
});
