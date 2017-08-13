/**
 * @file hash
 * @author schoeu1110@gmail.com
 * @module tools/hash
 */

define(function (require) {
    'use strict';
    var hash = {};

    /**
     * hash get操作
     * @param {string} key  标志
     * @return {string}    值
     * */
    hash.get = function (key) {

    };

    /**
     * hash set操作
     * @param {string} key  标志
     * @param {string|object} value  值
     * @param {number} time  过期时间,可选
     * */
    hash.set = function (key, value, time) {

    };

    /**
     * hash 移除操作
     * @param {string} key  需要移除的key值
     * */
    hash.remove = function (key) {
    };

    /**
     * hash 清除操作
     * */
    hash.clear = function () {
    };

    /**
     * hash 获取hash存储值长度
     * */
    hash.length = function () {
    };

    return hash;
});
