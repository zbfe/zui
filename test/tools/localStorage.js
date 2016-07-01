/**
 * @file localStorage测试
 * @author schoeu1110@gmail.com
 */

define([
    'tools/localStorage'
], function (ls) {
    'use strict';

    describe('tools/localStorage', function () {

        it('set function', function () {
            expect('function' === typeof ls.set).toBe(true);
        });

        it('get function', function () {
            expect('function' === typeof ls.get).toBe(true);
        });

        it('remove function', function () {
            expect('function' === typeof ls.remove).toBe(true);
        });

        it('clear function', function () {
            expect('function' === typeof ls.clear).toBe(true);
        });

        it('set -> get (simple)', function () {
            ls.set('test', 1);
            expect(ls.get('test')).toBe(1);
        });

        it('set(function) -> get', function () {
            ls.set('fn', function(){});
            expect(ls.get('fn')).toBe('');
        });

        it('set -> get -> remove -> get', function () {
            expect(ls.get('b')).toBe('');
            ls.set('a', '2');
            expect(ls.get('a')).toBe('2');
            ls.remove('a');
            expect(ls.get('a')).toBe('');
        });

        it('clear', function () {
            ls.set('c', 1);
            ls.set('d', 1);
            expect(ls.get('d')).toBe('1');
            ls.clear();
            expect(ls.get('c')).toBe('');
            expect(ls.get('d')).toBe('');
        });

        it('time to remove', function (done) {
            ls.set('c', 1, 2000);
            expect(ls.get('c')).toBe('1');
            setTimeout(function () {
                expect(ls.get('c')).toBe('');
                done();
            }, 3000);
        });
    });
});
