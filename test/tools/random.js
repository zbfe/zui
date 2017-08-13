/**
 * @file 随机数测试
 * @author fe.xiaowu@gmail.com
 */

define([
    'tools/random'
], function (random) {
    'use strict';

    describe('tools/random', function () {
        it('random', function () {
            expect(typeof random).toBe('function');
            expect(typeof random()).toBe('number');

            var num = random(0, 1);
            expect(num === 0 || num === 1).toBe(true);

            for (var i = 0; i < 100; i++) {
                var num = random(i, 100);
                expect(typeof num).toBe('number');
                expect(num >=0 && num <= 100).toBe(true);
            }
        });

        it('getByLength', function () {
            expect(typeof random.getByLength).toBe('function');

            expect(typeof random.getByLength()).toBe('number');
            expect(typeof random.getByLength(function () {})).toBe('number');

            expect(String(random.getByLength()).length).toBe(6);
            expect(String(random.getByLength({})).length).toBe(6);
            expect(String(random.getByLength({})).length).toBe(6);
            expect(String(random.getByLength({})).length).toBe(6);

            [1, 2, 3, 4, 5, 10, 20].forEach(function (len) {
                expect(String(random.getByLength(len)).length).toBe(len);
            });
        });

        it('getGuid', function () {
            expect(typeof random.getGuid).toBe('function');

            expect(typeof random.getGuid()).toBe('number');
            expect(typeof random.getGuid(function () {})).toBe('number');

            expect(random.getGuid('test')).toBe(1);
            expect(random.getGuid('test')).toBe(2);
            expect(random.getGuid('test2')).toBe(1);
        });
    });
});
