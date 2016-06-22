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
     * @type {string} key  标志
     * @return {string}    值
     * */
    ls.get = function (key) {
        key = key || '';
        return localStorage.getItem(key);
    };

    ls.set = function (key, value) {
        if (arguments.length > 1) {
            var temp;
            if ($.isPlainObject(value)) {
                try {
                    temp = JSON.parse(value);
                }
                catch (e) {
                    temp = '';
                }
            }
            else {
                temp = value;
            }
            localStorage.setItem(key, temp);
        }
    };

    ls.remove = function (key) {
        localStorage.removeItem(key);
    };

    ls.clear = function () {
        localStorage.clear();
    };

    return ls;
});
