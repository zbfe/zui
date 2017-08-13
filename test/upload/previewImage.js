/**
 * @file 上传图片预览测试用例
 * @author fe.xiaowu@gmail.com
 */


define([
    'upload/previewImage'
], function (PreviewImage) {
    'use strict';

    describe('upload/previewImage', function () {
        it('URL.createObjectURL', function (done) {
            var url = window.URL;

            window.URL = {
                createObjectURL: function () {
                    done();
                    return '';
                }
            };

            expect(typeof PreviewImage.createObjectURL({})).toBe('string');
            expect(PreviewImage.createObjectURL({})).toBe('');

            window.URL = url;
        });

        it('webkitURL.createObjectURL', function (done) {
            var url = window.webkitURL;
            var url2 = window.URL;

            window.URL = null;
            window.webkitURL = {
                createObjectURL: function () {
                    done();
                    return '';
                }
            };

            expect(typeof PreviewImage.createObjectURL({})).toBe('string');
            expect(PreviewImage.createObjectURL({})).toBe('');

            window.webkitURL = url;
            window.URL = url2;
        });

        it('not support', function () {
            var url = window.webkitURL;
            var url2 = window.URL;

            window.URL = null;
            window.webkitURL = null;

            expect(typeof PreviewImage.createObjectURL({})).toBe('string');
            expect(PreviewImage.createObjectURL({})).toBe('');

            window.webkitURL = url;
            window.URL = url2;
        });
    });
});
