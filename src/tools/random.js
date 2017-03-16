/**
 * @file 随机数
 * @author fe.xiaowu@gmail.com
 * @module tools/random
 */

define(function () {
    'use strict';

    var cache = {};

    /**
     * 获取随机数
     *
     * @param  {number} start 开始索引
     * @param  {number} end   结束索引
     *
     * @return {number}       结束
     */
    var random = function (start, end) {
        if ('undefined' === typeof start) {
            return Math.round(Math.random() * 1e6);
        }

        return Math.round(Math.random() * (end - start) + start);
    };

    /**
     * 获取指定长度的随机数
     *
     * @param  {number} [len=6] 位数
     *
     * @return {number}     随机数
     */
    random.getByLength = function (len) {
        if ('undefined' === typeof len || 'number' !== typeof len) {
            len = 6;
        }

        return random(1 + new Array(len).join('0') - 0, 1 + new Array(len + 1).join('0') - 1);
    };

    /**
     * 获取唯一id
     *
     * @param  {string} type 标识
     *
     * @return {number}      id标识
     */
    random.getGuid = function (type) {
        if ('undefined' === typeof type || 'string' !== typeof type) {
            type = 'guidcache';
        }

        if (!cache[type]) {
            cache[type] = 0;
        }

        return cache[type] += 1;
    };

    return random;
});
