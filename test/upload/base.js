/**
 * @file 上传base测试用例
 * @author fe.xiaowu@gmail.com
 */

/* eslint-disable max-nested-callbacks */
define([
    'upload/base',
    'zepto'
], function (Base, $) {
    'use strict';

    describe('upload/base', function () {
        it('not support FormData', function () {
            var back = window.FormData;

            window.FormData = null;

            expect(function () {
                new Base();
            }).toThrowError(Error);

            expect(function () {
                new Base();
            }).toThrowError(/FormData/);

            window.FormData = back;
        });

        it('elem is empty', function () {
            expect(function () {
                new Base({
                    elem: ''
                });
            }).toThrowError(/elem/);

            expect(function () {
                new Base({
                    elem: ''
                });
            }).toThrowError(Error);
        });

        // options
        it('options.elem', function (done) {
            var app = new Base({
                elem: $('<input />')
            });

            expect(!!app.$elem).toBe(true);
            expect(app.$elem.length).toBe(1);

            app._changeHandle = function (event, that) {
                expect(that).toEqual(app.$elem.get(0));
                done();
            };
            app.$elem.trigger('change');
        });
        it('options.extname', function () {
            var app;

            app = new Base({
                elem: $('<div />'),
                extname: '*'
            });
            expect(app._checkExtname({
                type: 'image/png'
            })).toBe(true);

            app = new Base({
                elem: $('<div />'),
                extname: 'png'
            });
            expect(app._checkExtname({
                type: 'image/jpg'
            })).toBe(false);

            app = new Base({
                elem: $('<div />'),
                extname: 'png,jpg'
            });
            expect(app._checkExtname({
                type: 'image/jpg'
            })).toBe(true);
            expect(app._checkExtname({
                type: 'image/png'
            })).toBe(true);
            expect(app._checkExtname({
                type: 'image/gif'
            })).toBe(false);
        });
        it('options.multiple', function () {
            var $elem = $('<input />');
            new Base({
                elem: $elem,
                multiple: true
            });
            expect($elem.prop('multiple')).toBe(true);

            new Base({
                elem: $elem,
                multiple: false
            });
            expect($elem.prop('multiple')).toBe(false);
        });
        it('options.action', function () {
            var app = new Base({
                elem: $('<div />'),
                action: 'action'
            });

            expect(app.get('action')).toBe('action');
        });
        it('options.data', function (done) {
            var app = new Base({
                elem: $('<div />'),
                action: '/upload/base/data',
                data: {
                    a: 1,
                    b: 2
                }
            });

            app._upload({
                file: true
            });

            app.on('success', function (res, file) {
                expect(res.a).toBe(true);
                expect(res.b).toBe(true);
                expect(file).toEqual({
                    file: true
                });
                done();
            });
        });
        it('options.size', function () {
            var app;

            app = new Base({
                elem: $('<div />'),
                size: 1
            });
            expect(app._checkSize({
                size: 10
            })).toBe(false);

            app = new Base({
                elem: $('<div />'),
                size: 100
            });
            expect(app._checkSize({
                size: 90
            })).toBe(true);
        });
        it('options.limit', function () {
            var app = new Base({
                elem: $('<div />'),
                limit: 3
            });

            // mock
            app._upload = function () {};
            app._uploading = 0;

            // 模拟队列
            app._queued = [];
            new Array(30).join(',').split(',').forEach(function (val, index) {
                app._queued.push({
                    id: index + 1
                });
            });

            // 默认30个
            expect(app._queued.length).toBe(30);

            // 开始并发上传
            app._check();

            // 并发上传了3个
            expect(app._queued.length).toBe(27);

            // 正在上传1个
            app._uploading = 1;
            app._check();

            // 又去掉2个  并发3-1=2
            expect(app._queued.length).toBe(25);
        });
        it('options.filename', function (done) {
            var app = new Base({
                elem: $('<div />'),
                action: '/upload/base/filename',
                filename: 'testfilename'
            });

            app._upload({});

            app.on('success', function (res) {
                expect(res.filename).toBe(true);
                done();
            });
        });

        it('start() - empty queued', function (done) {
            var app;

            app = new Base({
                elem: $('<div />')
            });

            app.on('error', function (data, file) {
                expect(data.status).toBe(Base.status.ERROR_EMPTY);
                expect($.isEmptyObject(file)).toBe(true);
                expect(file.name).toBeUndefined();
                expect(file.size).toBeUndefined();
                done();
            });

            expect(app.start()).toEqual(app);
        });
        it('start().start()', function () {
            var num = 0;
            var app;

            app = new Base({
                elem: $('<div />')
            });

            app._queued = [
                {
                    file: 'test'
                }
            ];

            app._check = function () {
                num += 1;
            };

            expect(app.start().start().start()).toEqual(app);

            expect(num).toBe(1);
        });
        it('destroy()', function () {
            var app = new Base({
                elem: $('<input />')
            });

            expect(app.destroy().destroy()).toEqual(app);
        });
        it('destroy() xhr', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*'
            });

            app._upload({
                size: 100
            });

            app.on('destroy', function () {
                expect(this).toEqual(app);
                done();
            });

            app.destroy();
        });
        it('_changeHandle()', function (done) {
            var app = new Base({
                elem: $('<input />'),
                size: 1000
            });
            var num = 0;

            app._addfile = function () {
                num += 1;
            };

            // 空1
            app._changeHandle({
                target: {
                    files: []
                }
            });

            // 空2
            app._changeHandle({
                target: {},
                dataTransfer: {
                    files: []
                }
            });

            // 空3
            app._changeHandle({
                target: {},
                dataTransfer: {}
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            type: 'image/png',
                            size: 100
                        }
                    ]
                }
            }, {});

            app._changeHandle({
                target: {},
                dataTransfer: {
                    files: [
                        {
                            type: 'image/gif',
                            size: 100
                        }
                    ]
                }
            }, {});

            // 不知道为啥，真实环境里居然有非数组的
            app._changeHandle({
                target: {
                    files: {
                        0: {
                            type: 'image/png',
                            size: 100
                        }
                    }
                }
            }, {});

            setTimeout(function () {
                expect(num).toBe(3);
                done();
            });
        });

        it('_check', function () {
            var app = new Base({
                elem: $('<input />')
            });

            app.destroy();

            expect(app._check()).toBeUndefined();
        });

        it('_changeHandle() change value', function (done) {
            var app = new Base({
                elem: $('<input />')
            });
            var data = {};

            app._changeHandle({
                target: {
                    files: [
                        {
                            type: 'image/png',
                            size: 100
                        }
                    ]
                }
            }, data);

            expect(data).toEqual({});

            setTimeout(function () {
                expect(data).toEqual({
                    value: ''
                });
                done();
            }, 200);
        });
        it('_addfile()', function (done) {
            var app = new Base({
                elem: $('<input />')
            });

            app.one('queued', function (file) {
                expect($.isPlainObject(file)).toBe(true);
                done();
            });

            expect(app._queued.length).toBe(0);

            app._addfile({});

            expect(app._queued.length).toBe(1);
        });

        // events
        it('events queued - success', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*',
                size: 200
            });
            var queued = [];
            var addPushQueued = function (type) {
                return function () {
                    queued.push(type);
                };
            };

            app.on('queued', addPushQueued('queued'));
            app.on('success', addPushQueued('success'));
            app.on('error', addPushQueued('error'));
            app.on('destroy', addPushQueued('destroy'));
            app.on('complete', addPushQueued('complete'));

            app.on('destroy', function () {
                expect(queued.join(',')).toBe('queued,queued,success,success,complete,destroy');
                done();
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        },
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('complete', function () {
                this.destroy();
            });

            app.start();
        });
        it('events queued - error', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/500',
                extname: '*',
                size: 200
            });
            var queued = [];
            var addPushQueued = function (type) {
                return function () {
                    queued.push(type);
                };
            };

            app.on('queued', addPushQueued('queued'));
            app.on('success', addPushQueued('success'));
            app.on('error', addPushQueued('error'));
            app.on('destroy', addPushQueued('destroy'));
            app.on('complete', addPushQueued('complete'));

            app.on('destroy', function () {
                expect(queued.join(',')).toBe('queued,queued,error,error,complete,destroy');
                done();
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        },
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('complete', function () {
                this.destroy();
            });

            app.start();
        });
        it('event.success', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('success', function (res, file) {
                // res为后端返回
                expect($.isPlainObject(res)).toBe(true);
                expect(res.status).toBe(0);

                expect(this).toEqual(app);
                expect(typeof file).toBe('object');
                done();
            });

            app.start();
        });
        it('event.complete - success', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('complete', function (data) {
                expect(this).toEqual(app);
                expect(Array.isArray(data.success)).toBe(true);
                expect(data.success.length).toBe(1);
                expect(Array.isArray(data.error)).toBe(true);
                done();
            });

            app.start();
        });
        it('event.complete - error', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/500',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('complete', function (data) {
                expect(this).toEqual(app);
                expect(Array.isArray(data.success)).toBe(true);
                expect(Array.isArray(data.error)).toBe(true);
                expect(data.error.length).toBe(1);
                done();
            });

            app.start();
        });
        it('event.complete - error+success', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/random',
                extname: '*',
                limit: 2,
                size: 1000
            });
            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 1
                        },
                        {
                            size: 2
                        },
                        {
                            size: 3
                        },
                        {
                            size: 4
                        },
                        {
                            size: 5
                        },
                        {
                            size: 6
                        },
                        {
                            size: 7
                        },
                        {
                            size: 8
                        },
                        {
                            size: 9
                        },
                        {
                            size: 10
                        }
                    ]
                }
            }, {});

            app.on('complete', function (data) {
                expect(this).toEqual(app);
                expect(Array.isArray(data.success)).toBe(true);
                expect(Array.isArray(data.error)).toBe(true);
                done();
            });

            app.start();
        });
        it('event.error', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/404',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('error', function (data, file) {
                expect(data.status).toBe(Base.status.ERROR_UPLOAD);
                expect(this).toEqual(app);
                expect(typeof file).toBe('object');
                done();
            });

            app.start();
        });
        it('event.error ERROR_EXTNAME', function (done) {
            var app = new Base({
                elem: $('<input />'),
                extname: 'jpg'
            });

            app.on('error', function (data) {
                expect(data.msg).toBe('文件扩展名不合法');
                expect(data.status).toBe(Base.status.ERROR_EXTNAME);
                done();
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            type: 'rar',
                            size: 100
                        }
                    ]
                }
            }, {});
        });
        it('event.error ERROR_SIZE', function (done) {
            var app = new Base({
                elem: $('<input />'),
                extname: '*',
                size: 1
            });

            app.on('error', function (data) {
                expect(data.msg).toBe('文件大小超出');
                expect(data.status).toBe(Base.status.ERROR_SIZE);
                done();
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});
        });
        it('event.error ERROR_EMPTY', function (done) {
            var app = new Base({
                elem: $('<input />')
            });

            app.on('error', function (data) {
                expect(data.msg).toBe('上传队列为空');
                expect(data.status).toBe(Base.status.ERROR_EMPTY);
                done();
            });

            app.start();
        });
        it('event.error ERROR_UPLOAD', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/500',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('error', function (data) {
                expect(data.status).toBe(Base.status.ERROR_UPLOAD);
                expect(data.msg).toBe('后端服务响应失败');
                done();
            });

            app.start();
        });
        it('event.error parseerror', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/parseerror',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('error', function (data) {
                expect(data.msg).toBe('解析json失败');
                expect(data.status).toBe(Base.status.ERROR_UPLOAD);
                done();
            });

            app.start();
        });
        it('event.error code error', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/status1',
                extname: '*'
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('error', function (data) {
                expect(data.msg).toBe('json.status错误');
                expect(data.status).toBe(Base.status.ERROR_UPLOAD);
                done();
            });

            app.start();
        });
        it('event.progress', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*',
                size: 200
            });

            app.on('progress', function (event, file) {
                expect($.isPlainObject(file)).toBe(true);
                expect(file.size).toBe(100);
                expect(typeof event.total).toBe('number');
                expect(typeof event.loaded).toBe('number');
                expect(this).toEqual(app);
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            app.on('complete', done);

            app.start();
        });
        it('event.queued', function (done) {
            var app = new Base({
                elem: $('<input />'),
                action: '/upload/base/success',
                extname: '*',
                size: 200
            });
            var num = 0;

            app.on('queued', function (file) {
                // res为后端返回
                expect($.isPlainObject(file)).toBe(true);
                expect(file.size).toBe(100);

                expect(this).toEqual(app);

                num += 1;
            });

            app._changeHandle({
                target: {
                    files: [
                        {
                            size: 100
                        },
                        {
                            size: 100
                        }
                    ]
                }
            }, {});

            setTimeout(function () {
                expect(num).toBe(2);
                done();
            });
        });
    });
});
