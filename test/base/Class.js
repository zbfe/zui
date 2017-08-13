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
            }).toThrowError(TypeError);
        });

        // 不new会实例化失败
        it('not new', function () {
            var app = Class.extend({
                constructor: function () {},
                test: function () {}
            });

            expect(function () {
                app().test();
            }).toThrowError(TypeError);
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
                undefined
            ].forEach(function (key) {
                expect(function () {
                    Class.extend(key);
                }).toThrowError(TypeError);
            });
        });

        it('child extend', function () {
            var num = 0;

            var A = Class.extend({
                constructor: function () {
                    num += 1;
                },

                type: 'a',

                ona: function () {
                    num += 1;
                }
            });

            var B = A.extend({
                constructor: function () {
                    num += 1;
                    B.super.constructor.call(this);
                },

                type: 'b',

                onb: function () {
                    num += 1;
                }
            });

            var C = B.extend({
                constructor: function () {
                    num += 1;
                    C.super.constructor.call(this);
                },

                type: 'c',

                onc: function () {
                    num += 1;
                }
            });

            var app;

            app = new A();
            expect(num).toBe(1);
            expect(app.type).toBe('a');
            app.ona();
            expect(num).toBe(2);

            num = 0;

            app = new B();
            expect(B.super.type).toBe('a');
            expect(num).toBe(2);
            expect(app.type).toBe('b');
            app.onb();
            expect(num).toBe(3);
            app.ona();
            expect(num).toBe(4);


            num = 0;

            app = new C();
            expect(C.super.type).toBe('b');
            expect(num).toBe(3);
            expect(app.type).toBe('c');
            app.onc();
            expect(num).toBe(4);
            app.onb();
            expect(num).toBe(5);
            app.ona();
            expect(num).toBe(6);
        });
    });
});
