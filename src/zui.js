/**
 * @file class类
 * @author fe.xiaowu
 */

define(function (require) {
    // Class
    var Class = require('Class');

    var $ = require('zepto');

    /**
     * zui基类
     */
    var Zui = Class.extend({
        // 构造函数
        constructor: function () {
            var self = this;
            var args = [].slice.call(arguments);

            // 事件队列空间
            self._listener = {};

            // 如果有参数则认为需要合并配置，如： ({a: 1}, {b:2}, {a:3}) => {a:3, b:2}
            if (args.length > 0) {
                args.unshift(true, {});
                self._options = $.extend.apply($, args);
            }
            else {
                self._options = {};
            }

            // 绑定销毁时清空
            self.on('destroy', function () {
                self._listener = {};

                for (var key in self) {
                    if (key === '_closed') {
                        // console.log('白名单：' + key);
                    }
                    else if (self.hasOwnProperty(key)) {
                        delete self[key];
                        // console.log('已销毁自定义字段：' + key);
                    }
                    else {
                        // console.log(key + '为原型上字段！');
                    }
                }
            });
        },

        /**
         * 获取事件队列
         *
         * @private
         * @param  {string} event 事件名
         * @return {Array}       事件队列
         */
        _getListener: function (event) {
            var listener = this._listener;

            // 如果没有注册过，则先注册下
            if (!listener[event]) {
                listener[event] = [];
            }

            return listener[event];
        },

        /**
         * 事件数据处理，主要处理多个事件分隔
         *
         * @private
         * @param  {string}   events   事件名
         * @param  {Function} callback 处理回调
         */
        _access: function (events, callback) {
            if ('string' !== typeof events) {
                return;
            }

            events.trim().split(/\s+/).forEach(function (key) {
                callback(key);
            });
        },

        /**
         * 绑定事件
         *
         * @param  {string}   event    事件名，多个事件则以空格分隔
         * @param  {Function} callback 触发回调
         * @return {Object}            this
         *
         * @example
         *     on('close', function () {});
         *     on('close show', function () {});
         */
        on: function (event, callback) {
            var self = this;

            // 如果事件名不是字符或者回调不是函数，则忽略，这是有问题额
            if ('string' !== typeof event || 'function' !== typeof callback) {
                return self;
            }

            self._access(event, function (key) {
                self._getListener(key).push({
                    callback: callback
                });
            });

            return this;
        },

        /**
         * 绑定事件 - 一次性
         *
         * @param  {string}   event    事件名，多个事件则以空格分隔
         * @param  {Function} callback 触发回调
         * @return {Object}            this
         *
         * @example
         *     one('close', function () {});
         *     one('close show', function () {});
         */
        one: function (event, callback) {
            var self = this;

            // 如果回调是方法才执行
            if ('function' === typeof callback) {
                self.on(event, function () {
                    self.off(event, callback);
                    return callback.apply(this, [].slice.call(arguments));
                });
            }

            return self;
        },

        /**
         * 卸载事件
         *
         * @param  {string}   event    事件名，多个事件则以空格分隔
         * @param  {Function|undefined} callback 触发回调，如果为空则卸载全部的event事件
         * @return {Object}            this
         *
         * @example
         *     off('close');
         *     off('close show', function () {});
         *     off('close', function () {});
         */
        off: function (event, callback) {
            var self = this;

            self._access(event, function (key) {
                var listeners = self._getListener(key);
                var i;

                if ('function' === typeof callback) {
                    for (i = 0; i < listeners.length; i++) {
                        if (callback === listeners[i].callback) {
                            listeners.splice(i--, 1);
                        }
                    }
                }
                else {
                    listeners.length = 0;
                }
            });

            return self;
        },

        /**
         * 触发事件
         *
         * @param  {string} event 事件名，多个事件则以空格分隔
         * @param  {Array} data  触发数据
         * @return {Object}       this
         *
         * @example
         *     trigger('click');
         *     trigger('close show');
         *     trigger('click', 'ok');
         *     trigger('click', {ok: 1});
         *     trigger('click', [1, 2, 3]);
         */
        trigger: function (event, data) {
            var self = this;

            // 如果有数据或者不是数组
            if (data && !Array.isArray(data)) {
                data = [data];
            }
            else {
                data = [];
            }

            self._access(event, function (key) {
                self._getListener(key).forEach(function (val) {
                    val.callback.apply(self, data);
                });
            });

            return self;
        },

        /**
         * 获取配置
         *
         * @param  {string|undefined} key 配置key，如果为空则获取整个配置
         *
         * @return {*}     值
         */
        get: function (key) {
            return key ? this._options[key] : this._options;
        },

        /**
         * 设置配置
         *
         * @param {string} key   配置key
         * @param {*} value 配置值
         * @return {Object} this
         */
        set: function (key, value) {
            if (key && 'string' === typeof key && 'undefined' !== typeof value) {
                this._options[key] = value;
            }
            return this;
        }
    });

    return Zui;
});
