/**
 * @file html5预览图片
 * @author fe.xiaowu
 * @todo canvas缩略图
 */

define(function (require) {
    'use strict';

    /**
     * 预览
     *
     * @type {Object}
     */
    var Preview = {

        /**
         * 转换对象为blob链接
         *
         * @param  {Object} file 文件对象
         *
         * @return {string}      文件路径
         */
        createObjectURL: function (file) {
            var url = window.URL || window.webkitURL;

            if (url) {
                return url.createObjectURL(file);
            }

            return '';
        }
    };

    return Preview;
});
