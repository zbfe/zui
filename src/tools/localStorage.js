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
        var value = localStorage.getItem(key);
        if (value && $.isPlainObject(value)) {
            try {
                value = JSON.parse(value);
            }
            catch (e) {
                // catch
            }
        }
        return value;
    };

    /**
     * localStorage set操作
     * @param {string} key  标志
     * @param {string|object} value  值
     * */
    ls.set = function (key, value, time) {
        var me = this;
        if (arguments.length > 1) {
            if ($.isPlainObject(value)) {
                try {
                    value = JSON.stringify(value);
                }
                catch (e) {
                }
            }
            localStorage.setItem(key, value);
        }
        setTimeout(function () {
            me.remove(key);
        }, time);
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
