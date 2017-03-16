/**
 * @file cookie测试
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'tools/cookie'
], function (cookie) {
    'use strict';

    describe('tools/cookie', function () {
        afterAll(function () {
            var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
            (keys || []).forEach(function (key) {
                document.cookie = key + '=0;expires=' + new Date(0).toUTCString();
            });
        });

        it('set', function () {
            expect('function' === typeof cookie.set).toBe(true);
            expect(document.cookie.indexOf('tools.cookie.set') === -1).toBe(true);
            cookie.set('tools.cookie.set', 1);
            expect(document.cookie.indexOf('tools.cookie.set') === -1).toBe(false);
            expect(cookie.set()).toBe(cookie);
            expect(cookie.set(true, true)).toBe(cookie);
            expect(cookie.set(true)).toBe(cookie);
            expect(cookie.set(false)).toBe(cookie);

            expect(cookie.set(false, true)).toBe(cookie);
            expect(cookie.get('false')).toBe('true');
        });

        it('get', function () {
            expect('function' === typeof cookie.get).toBe(true);
        });

        it('remove', function () {
            expect('function' === typeof cookie.remove).toBe(true);
            expect(cookie.remove()).toBe(cookie);
        });

        it('set -> get', function () {
            expect(cookie.get('set -> get')).toBe('');
            cookie.set('set -> get', 1);
            expect(cookie.get('set -> get')).toBe('1');
            cookie.set('测试', '成功');
            expect(cookie.get('测试')).toBe('成功');
        });

        it('set -> get -> remove -> get', function () {
            expect(cookie.get('4444')).toBe('');
            cookie.set('4444', 1);
            expect(cookie.get('4444')).toBe('1');
            cookie.remove('4444');
            expect(cookie.get('4444')).toBe('');
        });

        it('options.path', function () {
            expect(cookie.get('options.path')).toBe('');
            cookie.set('options.path', 1, {
                path: '/'
            });
            expect(cookie.get('options.path')).toBe('1');

            expect(cookie.get('options.path2')).toBe('');
            cookie.set('options.path2', 1, {
                path: '/a/b/c'
            });
            expect(cookie.get('options.path2')).toBe('');

            expect(cookie.get('options.path3')).toBe('');
            cookie.set('options.path3', 1, {
                path: ''
            });
            expect(cookie.get('options.path3')).toBe('1');
        });

        it('options.domain', function () {
            cookie.set('options.domain', 1, {
                domain: 'a.com'
            });
            expect(cookie.get('options.domain')).toBe('');
        });

        it('options.secure', function () {
            cookie.set('options.secure', 1, {
                secure: 1
            });
            expect(cookie.get('options.secure')).toBe('');
        });

        it('options.expires', function (done) {
            expect(cookie.get('options.expires')).toBe('');
            cookie.set('options.expires', 1, {
                expires: 500
            });
            setTimeout(function () {
                expect(cookie.get('options.expires')).toBe('');
                done();
            }, 1000);
        });
    });
});
