/**
 * @file Class测试用例
 * @author fe.xiaowu@gmail.com
 */

define([
    'Class'
], function (Class) {
    'use strict';

    describe('Class', function () {
        it('Class.extend', function () {
            expect(typeof Class).toBe('object');
            expect(typeof Class.extend).toBe('function');
        });

        it('new', function (done) {
            var App = Class.extend({
                constructor: function (a) {
                    expect(a).toBe(1);
                    done();
                }
            });

            new App(1);
        });

        // 没有constructor则实例化失败
        it('new - not constructor', function () {
            var App = Class.extend({
                test: function () {}
            });

            expect(function () {
                new App().test();
            }).toThrowError(/constructor/);
        });

        // 不new会实例化失败
        it('not new', function () {
            var app = Class.extend({
                constructor: function () {},
                test: function () {}
            });

            expect(function () {
                app().test();
            }).toThrowError(/undefined is not an object/);
        });

        it('super', function () {
            var App = Class.extend({
                constructor: function (a) {
                    expect(a).toBe(1);
                    expect(this.a).toBe(1);
                },
                a: 0
            });

            var App2 = App.extend({
                a: 1,
                constructor: function () {
                    expect(this.a).toBe(1);
                    App2.super.constructor.call(this, this.a);
                    expect(App2.super.a).toBe(0);
                }
            });
            expect(typeof App2.extend).toBe('function');
            new App2();

            var App3 = App2.extend({
                a: 2,
                constructor: function () {
                    expect(this.a).toBe(2);
                    expect(App3.super.a).toBe(1);
                }
            });
            new App3();
            expect(typeof App3.extend).toBe('function');
        });

        it('check param', function () {
            [
                null,
                '',
                undefined,
                0,
                true,
                false,
                // function () {},
                // {},
                // [],
                // /1/
            ].forEach(function (key) {
                // Class.extend(key);
                expect(function () {
                    Class.extend(key);
                }).toThrowError(/is not an object/);
            });
        });
    });
});
