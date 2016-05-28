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

            self._listener = {};

            // 如果有参数则认为需要合并配置
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

        _getListener: function (event) {
            var listener = this._listener;
            if (!listener[event]) {
                listener[event] = [];
            }
            return listener[event]
        },

        on: function (event, callback) {
            var self = this;

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

        one: function (event, callback) {
            var self = this;

            if ('function' === typeof callback) {
                self.on(event, function () {
                    self.off(event, callback);
                    return callback.apply(this, [].slice.call(arguments));
                });
            }

            return self;
        },

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

        _access: function (events, callback) {
            if ('string' !== typeof events) {
                return;
            }

            events.trim().split(/\s+/).forEach(function (key) {
                callback(key);
            });
        },

        trigger: function (event, data) {
            var self = this;

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

        get: function (key) {
            return key ? this._options[key] : this._options;
        },

        set: function (key, value) {
            if (key && 'string' === typeof key && 'undefined' !== typeof value) {
                this._options[key] = value;
            }
            return this;
        }
    });

    return Zui;
});
