/**
 * @file url处理方法
 * @author fe.xiaowu@gmail.com
 * @module tools/url
 */

define(function (require) {
    'use strict';

    var Url = {};

    /**
     * 转码
     *
     * @description 添加try是为了防止抛异常
     * @param  {string} URIComponent 内容
     * @link https://github.com/blearjs/blear.utils.uri/blob/master/src/index.js
     *
     * @return {string}
     */
    Url.encode = function (URIComponent) {
        try {
            return encodeURIComponent(URIComponent).replace(/[!'()*]/g, function (c) {
                return '%' + c.charCodeAt(0).toString(16);
            });
        }
        catch (err) {
            return '';
        }
    };

    /**
     * 解码
     *
     * @description 添加try是为了防止抛异常
     * @param  {string} URIComponent 内容
     * @link https://github.com/blearjs/blear.utils.uri/blob/master/src/index.js
     *
     * @return {string}
     */
    Url.decode = function (URIComponent) {
        try {
            return decodeURIComponent(URIComponent);
        }
        catch (err) {
            return '';
        }
    };

    return Url;
});
