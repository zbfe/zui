/**
 * @file localStorage
 * @author schoeu1110@gmail.com
 * @module tools/localStorage
 */

define(function (require) {
    'use strict';

    var localStorage = window.localStorage;
    var ls = {};

    /**
     * 如果禁用ls或不知道ls的浏览器上直接返回空对象
     * **/
    if (!localStorage) {
        return ls;
    }
    /**
     * localStorage get操作
     * @param {string} key  标志
     * @return {string}    值
     * */
    ls.get = function (key) {
        key = key || '';
        var val;
        var value = localStorage.getItem(key);
        try {
            val = JSON.parse(value) || {};
            if (val.__exprire && (val.__exprire > Date.now()) || !val.__exprire) {
                return val.value || '';
            }
            else {
                return '';
            }
        }
        catch (e) {
            // catch
        }
    };

    /**
     * localStorage set操作
     * @param {string} key  标志
     * @param {string|object} value  值
     * @param {number} time  过期时间,可选
     * */
    ls.set = function (key, value, time) {
        time = time || 0;
        var exprire = 0;
        if (time) {
            exprire = Date.now() + time;
        }
        if (arguments.length > 1) {
            try {
                var val = {
                    __exprire: exprire,
                    value: value
                };
                value = JSON.stringify(val);
            }
            catch (e) {
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
