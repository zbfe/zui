/**
 * @file html5预览图片
 * @author fe.xiaowu
 * @todo canvas缩略图
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');

    var Preview = Zui.extend({
        constructor: function () {
            // 初始化
            Preview.super.constructor.call(this);
        },

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
    });

    return Preview;
});
