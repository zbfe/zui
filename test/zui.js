/**
 * @file Class测试用例
 * @author fe.xiaowu@gmail.com
 */

define([
    'zui'
], function (Zui) {
    'use strict';

    describe('zui', function () {
        it('Zui.extend', function () {
            expect(typeof Zui).toBe('function');
            expect(typeof Zui.extend).toBe('function');
        });
    });
});
