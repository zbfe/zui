/**
 * @file Class测试用例
 * @author fe.xiaowu@gmail.com
 */

define([
    'zui'
], function (Zui) {
    'use strict';

    /**
     * 空参数
     *
     * @type {Array}
     */
    var emptyTypes = [
        '',
        false,
        0,
        null,
        undefined
    ];

    /**
     * 全部类型的参数
     *
     * @type {Array}
     */
    var types = emptyTypes.concat([function () {},
        /1/,
        '1',
        1,
        true,
        {},
        []
    ]);

    /**
     * 检查参数
     *
     * @param  {Function} callback 回调
     *
     * @return {undefined}
     */
    var checkParam = function (callback) {
        if ('function' !== typeof callback) {
            return;
        }

        types.forEach(function (key) {
            emptyTypes.forEach(function (emptyKey) {
                callback(key, emptyKey);
            });
        });
    };

    describe('zui', function () {
        it('Zui', function () {
            expect(typeof Zui).toBe('function');
        });

        it('Zui.extend', function () {
            expect(typeof Zui).toBe('function');
            expect(typeof Zui.extend).toBe('function');
        });

        it('options empty', function () {
            var app = new Zui();
            expect(app.get()).toEqual({});
        });

        it('options', function () {
            var app;

            app = new Zui({
                a: 1
            });
            expect(app.get('a')).toBe(1);

            app = new Zui({
                a: 1
            }, {
                b: 2
            });
            expect(app.get('a')).toBe(1);
            expect(app.get('b')).toBe(2);

            app = new Zui({
                a: 1
            }, {
                b: 2
            }, {
                c: 3,
                a: 4
            });
            expect(app.get('a')).toBe(4);
            expect(app.get('b')).toBe(2);
            expect(app.get('c')).toBe(3);
        });

        it('.on,.one,.off,.trigger,.set check param and return', function () {
            var app = new Zui();

            checkParam(function (key, key2) {
                expect(app.on(key, key2)).toEqual(app);
                expect(app.one(key, key2)).toEqual(app);
                expect(app.off(key, key2)).toEqual(app);
                expect(app.trigger(key, key2)).toEqual(app);
            });
        });

        it('on event', function (done) {
            var app = new Zui();
            var i = 0;

            app.on('event', function () {
                i += 1;
            });

            app.trigger('event');
            app.trigger('event');
            app.trigger('event');

            expect(i).toBe(3);
            setTimeout(done);
        });

        it('on events', function (done) {
            var app = new Zui();
            var i = 0;

            app.on('event event2', function () {
                i += 1;
            });

            app.trigger('event');
            app.trigger('event2');

            expect(i).toBe(2);
            setTimeout(done);
        });

        it('on callback this', function (done) {
            var app = new Zui();

            app.on('callback', function () {
                expect(this).toEqual(app);
                done();
            });

            app.trigger('callback');
        });

        it('on callback param', function (done) {
            var app = new Zui();

            app.on('callback0', function (a) {
                expect(a).toBeUndefined();
            }).trigger('callback0');

            app.on('callback1', function (a, b) {
                expect(a).toBe(1);
                expect(b).toBeUndefined();
            }).trigger('callback1', 1);

            app.on('callback2', function (a) {
                expect(a).toBe(1);
            }).trigger('callback2', [
                1
            ]);

            app.on('callback3', function (a) {
                expect(a).toEqual({});
            }).trigger('callback3', {});

            app.on('callback4', function (a, b, c) {
                expect(a).toBe(1);
                expect(b).toBe(2);
                expect(c).toBe(3);
            }).trigger('callback4', [
                1,
                2,
                3
            ]);

            app.on('callback5', function (a) {
                expect(a.a).toBe(1);
            }).trigger('callback5', {
                a: 1
            });

            app.on('callback6', function (a) {
                expect(a.a).toBe(1);
            }).trigger('callback6', [
                {
                    a: 1
                }
            ]);

            setTimeout(done);
        });

        it('one event', function (done) {
            var app = new Zui();
            var i = 0;

            app.one('event', function () {
                i += 1;
            });

            app.trigger('event');
            app.trigger('event');
            app.trigger('event');

            expect(i).toBe(1);
            setTimeout(done);
        });

        it('one events', function (done) {
            var app = new Zui();
            var i = 0;

            app.one('event event2', function () {
                i += 1;
            });

            app.trigger('event');
            app.trigger('event2');

            expect(i).toBe(2);
            setTimeout(done);
        });

        it('one callback this', function (done) {
            var app = new Zui();

            app.one('callback', function () {
                expect(this).toEqual(app);
                done();
            });

            app.trigger('callback');
        });

        it('one callback param', function (done) {
            var app = new Zui();

            app.one('callback0', function (a) {
                expect(a).toBeUndefined();
            }).trigger('callback0');

            app.one('callback1', function (a, b) {
                expect(a).toBe(1);
                expect(b).toBeUndefined();
            }).trigger('callback1', 1);

            app.one('callback2', function (a) {
                expect(a).toBe(1);
            }).trigger('callback2', [
                1
            ]);

            app.one('callback3', function (a) {
                expect(a).toEqual({});
            }).trigger('callback3', {});

            app.one('callback4', function (a, b, c) {
                expect(a).toBe(1);
                expect(b).toBe(2);
                expect(c).toBe(3);
            }).trigger('callback4', [
                1,
                2,
                3
            ]);

            app.one('callback5', function (a) {
                expect(a.a).toBe(1);
            }).trigger('callback5', {
                a: 1
            });

            app.one('callback6', function (a) {
                expect(a.a).toBe(1);
            }).trigger('callback6', [
                {
                    a: 1
                }
            ]);

            setTimeout(done);
        });

        it('.off(key, callback)', function () {
            var app = new Zui();
            var num = 0;

            var fn = function () {
                num += 1;
            };

            app.on('1', fn);

            app.one('1 1', function () {
                num += 1;
            });

            app.one('1', function () {
                num += 1;
            });

            app.off('1', fn);
            app.off('1', function () {});

            app.trigger('1');
            app.trigger('1');
            app.trigger('1');

            expect(num).toBe(3);
        });

        it('.off(key)', function () {
            var app = new Zui();
            var num = 0;

            app.on('1', function () {
                num += 1;
            });

            app.one('1 1', function () {
                num += 1;
            });

            app.off('1');

            app.trigger('1');

            expect(num).toBe(0);
        });

        it('.trigger(key)', function (done) {
            var app = new Zui();

            app.on('1', function (a) {
                expect(a).toBeUndefined();
                done();
            });

            app.trigger('1');
        });

        it('.trigger(key, str)', function (done) {
            var app = new Zui();

            app.on('1', function (a, b) {
                expect(a).toBe('str');
                expect(b).toBeUndefined();
                done();
            });

            app.trigger('1', 'str');
        });

        it('.trigger(key, num)', function (done) {
            var app = new Zui();

            app.on('1', function (a, b) {
                expect(a).toBe(1);
                expect(b).toBeUndefined();
                done();
            });

            app.trigger('1', 1);
        });

        it('.trigger(key, {})', function (done) {
            var app = new Zui();

            app.on('1', function (a, b) {
                expect(a).toEqual({
                    a: 1
                });
                expect(b).toBeUndefined();
                done();
            });

            app.trigger('1', {
                a: 1
            });
        });

        it('.trigger(key, [1, 2])', function (done) {
            var app = new Zui();

            app.on('1', function (a, b, c) {
                expect(a).toBe(1);
                expect(b).toBe(2);
                expect(c).toBeUndefined();
                done();
            });

            app.trigger('1', [
                1,
                2
            ]);
        });

        it('.trigger this', function (done) {
            var app = new Zui();

            app.on('1', function () {
                expect(this).toEqual(app);
                done();
            });

            app.trigger('1');
        });

        it('.trigger(key, [1, 2])', function (done) {
            var app = new Zui();
            var num = 0;

            app.on('1', function () {
                num += 1;
            });

            app.trigger('1').trigger('1');

            expect(num).toBe(2);
            setTimeout(done);
        });

        // get && set
        it('.get', function () {
            var a = {
                a: 1
            };
            var app = new Zui(a);
            expect(app.get()).toEqual(a);

            app = new Zui();
            expect(app.get()).toEqual({});
        });

        it('.get(key)', function () {
            var a = {
                a: 1,
                b: {
                    c: {
                        d: 1
                    }
                }
            };
            var app = new Zui(a);
            expect(app.get('a')).toBe(1);
            expect(app.get('b.c.d')).toBe(1);
            expect(app.get('   b .   c.d')).toBe(1);
            expect(app.get('dba')).toBeUndefined();
            expect(app.get(1)).toBeUndefined();
            expect(app.get(true)).toBeUndefined();
            expect(app.get(null)).toBeUndefined();
            expect(app.get({})).toBeUndefined();
            expect(app.get(null)).toBeUndefined();
        });

        it('.set', function () {
            var app = new Zui();

            app.set('a', 1);
            app.set('null', null);
            app.set('false', false);
            app.set('a.b', 1);
            app.set('b', undefined);
            expect(app.get('b')).toBeUndefined();
            app.set('c.d.e.f', 1);
            app.set('  d.      d .   e.f', 1);

            app.set('1.0.1', 1);
            app.set('1.0.1.1.1.1', 1);
            expect(app.get('1.0.1')).toBe(1);
            expect(app.get('1.0.1.1.1.1')).toBeUndefined();

            app.set('1.0.1.1.1.1', 1);
            app.set('1.0.1', 1);
            expect(app.get('1.0.1')).toBe(1);
            expect(app.get('1.0.1.1.1.1')).toBeUndefined();

            expect(app.get('a')).toBe(1);
            expect(app.get('null')).toBe(null);
            expect(app.get('false')).toBe(false);
            expect(app.get('c.d.e.f')).toBe(1);
            expect(app.get('d.d.e.f')).toBe(1);
            expect(app.get('b')).toBeUndefined();
            expect(app.get('a.b')).toBeUndefined();
            expect(app.get('b.a.x.x.3')).toBeUndefined();
        });

        it('is', function () {
            var app = new Zui();

            expect(app.is('no')).toBe(false);
            app.is('yes', 1);
            expect(app.is('yes')).toBe(true);

            app.is(true, true);
            expect(app.is(true)).toBe(false);
        });

        it('event destroy', function (done) {
            var app = new Zui();

            app.a = 1;
            app.is('ok', 1);

            expect(app.a).toBe(1);
            expect(app.is('ok')).toBe(true);

            app.on('destroy', function () {
                expect(app.a).toBeUndefined();
                expect(app.is('ok')).toBe(true);

                app.on('test', function () {});
                app.set('destroy', true);
                expect(app.get('destroy')).toBe(true);

                setTimeout(done);
            });

            // 触发多个destroy
            app.trigger('destroy').trigger('destroy').trigger('destroy').on('test', function () {});
        });

        // _
        it('._getListener', function () {
            var app = new Zui();

            expect(Array.isArray(app._getListener('1'))).toBe(true);
        });

        it('._access', function () {
            var app = new Zui();
            var data = {};

            app._access('1 2  3  4  ', function (key) {
                data[key] = true;
            });

            expect(data).toEqual({
                1: true,
                2: true,
                3: true,
                4: true
            });
        });
    });
});
