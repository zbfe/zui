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
            check: function () {

            },
            message: ''
        },

        email: {
            check: /1/,
            message: ''
        },

        minlength: {
            check: 1
        },

        maxlength: {
            check: function (value, rule) {

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

    };

    /**
     * 添加规则
     *
     * @param {string|Object} key  规则名或者数据
     * @param {string|RegExt|Function} check 验证数据
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
     */
    Form.removeRule = function (key) {
        delete Form.rulesData[key];
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
