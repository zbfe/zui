/**
 * @file url方法测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'tools/url'
], function (Url) {
    'use strict';

    describe('tools/url', function () {
        it('.encode', function () {
            expect(Url.encode('')).toBe('');
            expect(Url.encode('!')).toBe('%21');
            expect(encodeURIComponent('!')).toBe('!');
            expect(encodeURIComponent('!') !== Url.encode('!')).toBe(true);
            expect(Url.encode('\uD800')).toBe('');

            // 原始方法异常测试
            var fn = function () {
                return encodeURIComponent('\uD800');
            };
            expect(fn).toThrowError();
        });

        it('.encode', function () {
            expect(Url.decode('')).toBe('');
            expect(Url.decode('%21')).toBe('!');
            expect(Url.decode('%2')).toBe('');
        });

        it('.encode -> .decode', function () {
            expect(Url.decode(Url.encode('!'))).toBe('!');
        });
    });
});
