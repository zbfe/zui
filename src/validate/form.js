/**
 * @file 表单验证
 * @author xiaowu <fe.xiaowu@gmail.com>
 * @module validate/form
 */

define(function (require) {
    'use strict';

    var Zui = require('zui');
    var $ = required('zepto');

    var Form = Zui.extend({
        constructor: function () {
            Form.super.constructor.call(this);
        }
    });

    /**
     * 默认规则数据
     *
     * @type {Object}
     */
    Form.rulesData = {
        required: {
            check: function (value) {
                return !!value;
            },
            message: '必须'
        },

        email: {
            check: /1/,
            message: ''
        },

        minlength: {
            check: function (value, rule) {
                return String(value).length >= rule;
            },
            check: 1
        },

        maxlength: {
            check: function (value, rule) {
                return String(value).length <= rule;
            }
        }
    };

    /**
     * 验证
     *
     * @param  {string} key   规则名称
     * @param  {string} value 要验证的值
     *
     * @return {boolean}       是否通过
     */
    Form.checkRule = function (key, value) {
        var data = Form.rulesData[key];

        // 如果没有规则数据
        if (!data || !value) {
            return false;
        }

        // 如果规则是字符串则必须相等
        if ('string' === typeof data.check) {
            return value === data.check;
        }

        // 如果是数字
        else if ('number' === typeof data.check) {
            return Number(data.check) === value;
        }

        // 如果是正则
        else if (data.check instanceof RegExp) {
            return data.check.test(value);
        }

        // 如果是方法
        else if ('function' === typeof data.check) {
            return data.check(value);
        }

        return false;
    };

    /**
     * 添加规则
     *
     * @param {string|Object} key  规则名或者数据
     * @param {string|RegExt|Function} check 验证数据
     * @return {Object} Form
     */
    Form.addRule = function (key, check, message) {
        if ('string' !== typeof key || !check) {
            return Form;
        }

        Form.rulesData[key] = {
            check: check,
            message: message
        };

        return Form;
    };

    /**
     * 删除规则
     *
     * @param  {string} key 规则名称
     * @return {Object} Form
     */
    Form.removeRule = function (key) {
        delete Form.rulesData[key];

        return Form;
    };

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Form.defaults = {
        elem: null,
        event: 'submit',
        ignoreElem: null,
        rules: {
            username: {
                required: true,
                minlength: 6,
                maxlength: 10
            }
        }
    };

    return Form;
});
