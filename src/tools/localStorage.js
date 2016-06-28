/**
 * @file localStorage
 * @author schoeu1110@gmail.com
 * @module tools/localStorage
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    var localStorage = window.localStorage;
    var ls = {};

    /**
     * localStorage get操作
     * @param {string} key  标志
     * @return {string}    值
     * */
    ls.get = function (key) {
        key = key || '';
        var result;
        var val;
        var value = localStorage.getItem(key);
        try {
            val = JSON.parse(value);
            if ($.isPlainObject(val) && val.__exprire < Date.now()) {
                result = val.value;
            }
        }
        catch (e) {
            // catch
        }
        return result || '';
    };

    /**
     * localStorage set操作
     * @param {string} key  标志
     * @param {string|object} value  值
     * @param {number} time  过期时间,可选
     * */
    ls.set = function (key, value, time) {
        time = time || 0;
        if (arguments.length > 1) {
            if ($.isPlainObject(value)) {
                try {
                    var val = {
                        __exprire: Date.now() + time,
                        value: value
                    };
                    value = JSON.stringify(val);
                }
                catch (e) {
                }
            }
            localStorage.setItem(key, value);
        }
    };

    /**
     * localStorage 移除操作
     * @param {string} key  需要移除的key值
     * */
    ls.remove = function (key) {
        localStorage.removeItem(key);
    };

    /**
     * localStorage 清除操作
     * */
    ls.clear = function () {
        localStorage.clear();
    };

    /**
     * localStorage 获取localStorage长度
     * */
    ls.length = function () {
        return localStorage.length;
    };

    return ls;
});
