/**
 * @file 上传基类
 * @author fe.xiaowu
 *
 * @events
 *     1. success
 *     2. error
 *     3. progress
 *     4. complete
 */

define(['zepto', 'zui'], function ($, Zui) {
    var Base = Zui.extend({
        constructor: function (options) {
            var self = this;

            // 初始化
            Base.super.constructor.call(self, Base.defaults, options);
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Base.defaults = {

        /**
         * 文件提交路径 默认根路径
         *
         * @type string
         */
        action: '/',

        /**
         * file元素
         *
         * @type {HTMLelement}
         */
        elem: null,

        /**
         * 向后端发送的数据
         *
         * @type {Object}
         */
        data: {},

        /**
         * 是否多选
         *
         * @type {Boolean}
         */
        multiple: false,

        /**
         * 允许的文件扩展名
         *
         * @type {String}
         */
        extname: 'jpg,png,jpeg,gif'
    };

    return Base;
});