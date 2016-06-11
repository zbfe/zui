/**
 * @file 上传base测试用例
 * @author fe.xiaowu@gmail.com
 */


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
        it('options.extname', function () {});
        it('options.multiple', function () {});
        it('options.action', function () {});
        it('options.elem', function () {});
        it('options.data', function () {});
        it('options.size', function () {});
        it('options.limit', function () {});
        it('options.filename', function () {});

        it('start()', function () {});
        it('destroy()', function () {});
        it('_changeHandle()', function () {});
        it('_uploads()', function () {});
        it('_upload()', function () {});
        it('_addfile()', function () {});

        // events
        it('events queued', function () {});
        it('event.success', function () {});
        it('event.error', function () {});
        it('event.progress', function () {});
        it('event.complete', function () {});
        it('event.queued', function () {});
    });
});
