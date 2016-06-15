/**
 * @file cookie操作
 * @author fe.xiaowu@gmail.com
 * @module tools/cookie
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');

    /**
     * cookie操作
     *
     * @type {Object}
     */
    var cookie = {};

    /**
     * 默认参数
     *
     * @type {Object}
     */
    cookie.defaults = {
        path: '/',
        expires: 3600000,
        secure: location.protocol === 'https:',
        domain: !/\./.test(location.hostname) ? '' : location.hostname
    };

    /**
     * 获取cookie
     *
     * @param  {string} name 名称
     *
     * @return {string}      值
     */
    cookie.get = function (name) {
        name = encodeURIComponent(name);

        if (document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)')) !== null) {
            return decodeURIComponent(RegExp.$2);
        }

        return '';
    };

    /**
     * 设置cookie
     *
     * @param {string} name    名称
     * @param {string} value   值
     * @param {Object} options 配置参数
     * @param {string} [options.path=/] 路径
     * @param {string} [options.domain=hostname] 域
     * @param {boolean} [options.secure=https环境] 是否加密
     * @param {number} [options.expires=1小时] 过期时间，单位毫秒
     *
     * @return {Object} cookie
     */
    cookie.set = function (name, value, options) {
        // 如果没有数据
        if ('undefined' === typeof name || 'undefined' === typeof value) {
            return cookie;
        }
        var ret = [encodeURIComponent(name) + '=' + encodeURIComponent(value)];

        // 合并配置
        options = $.extend({}, cookie.defaults, options);

        // 处理过期时间
        var d = new Date();
        d.setTime(d.getTime() + options.expires);
        ret.push('expires=' + d.toUTCString());

        // 如果有路径
        if (options.path) {
            ret.push('path=' + options.path);
        }

        // 如果有域
        if (options.domain) {
            ret.push('domain=' + options.domain);
        }

        // 如果有安全设置
        if (options.secure) {
            ret.push('secure=true');
        }

        // 设置cookie
        document.cookie = ret.join(';');

        return cookie;
    };

    /**
     * 删除cookie
     *
     * @param  {string} name 名称
     * @param {Object} options 配置
     *
     * @return {Object}      cookie
     */
    cookie.remove = function (name, options) {
        options = options || {};
        options.expires = -1;

        return cookie.set(name, '', options);
    };

    return cookie;
});
