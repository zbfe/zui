/**
 * @file 延迟加载
 * @author fe.xiaowu <fe.xiaowu@gmail.com>
 * @module lazyload/base
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Zui = require('zui');
    var $window = $(window);

    var guid = 0;

    var Lazyload = Zui.extend({

        /**
         * 构造函数
         *
         * @name Lazyload
         * @class
         * @requires zui
         * @requires zepto
         *
         * @param  {Object} options 配置参数
         * @param {selector|HTMLElement} options.elem 目标元素
         * @param {string|null} [options.event=scroll] 事件，如果不需要滚动加载可为空
         * @param {number} options.threshold 滚动加载偏移值
         */
        constructor: function (options) {
            var self = this;

            // 初始化zui
            Lazyload.super.constructor.call(self, Lazyload.defaults, options);

            // 筛选出没有加载过的
            var $elem = $(self.get('elem')).filter(function () {
                return !$(this).data('lazyload-load');
            });

            // 缓存一个dom对象，以索引为key，索引也会写到lazyload-load属性上
            self.$dom = {};

            $elem.each(function (key) {
                self.$dom[++key] = $(this).data('lazyload-load', key);
            });

            $elem = null;

            self._guid = guid++;

            // 如果是滚动事件
            if (self.get('event') === 'scroll') {
                $window.on(self.__getEventName('scroll resize'), function () {
                    self.__check();
                });

                self.on('loadall', function () {
                    $window.off(self.__getEventName('scroll resize'));
                });

                setTimeout(self.__check.bind(self));
            }

            // 绑定加载完成则销毁
            self.on('loadall', function () {
                self.trigger('destroy');
            });

            // 绑定销毁时打个标识
            self.on('destroy', function () {
                self.is('destroy', true);
            });
        },

        /**
         * 显式加载
         *
         * @description 主要用于非滚动加载时主动的去加载
         * @param  {string|HTMLelement} $elem 要加载的元素，如果为空则加载所有
         *
         * @return {Object}       this
         */
        load: function ($elem) {
            var self = this;

            // 如果已经销毁了
            if (self.is('destroy')) {
                return self;
            }

            if ($elem) {
                $($elem).each(function () {
                    self.__load($(this).data('lazyload-load'));
                });
            }
            else {
                Object.keys(self.$dom).forEach(function (key) {
                    self.__load(key);
                });
            }

            // 检查下是否完成
            self.__checkAll();

            return this;
        },

        /**
         * 获取事件空间名
         *
         * @private
         * @param  {string} name 事件名
         *
         * @return {string}      事件名.空间名
         */
        __getEventName: function (name) {
            var self = this;
            return name.split(/\s+/).map(function (val) {
                return val + '.lazyload' + self._guid;
            }).join(' ');
        },

        /**
         * 移除单个元素
         *
         * @private
         * @param  {string} key 元素key
         */
        __load: function (key) {
            // 如果为空
            if ('undefined' === typeof key) {
                return;
            }

            /**
             * 加载单个
             *
             * @event loaditem
             */
            this.trigger('loaditem', {
                elem: this.$dom[key].get(0),
                key: key
            });

            // 删除这个dom，以防止下次循环她
            delete this.$dom[key];
        },

        /**
         * 检查是否加载完成
         *
         * @private
         */
        __checkAll: function () {
            // 加载全部了
            if (Object.keys(this.$dom).length === 0) {

                /**
                 * 全部加载完成
                 *
                 * @event loadall
                 */
                this.trigger('loadall');
            }
        },

        /**
         * 检查是否可见
         *
         * @private
         */
        __check: function () {
            var self = this;
            var options = self.get();
            var top = $window.scrollTop();
            var height = $window.height();

            // 循环dom
            Object.keys(self.$dom).forEach(function (key) {
                var $elem = self.$dom[key];

                // 如果没有显示
                // 先不处理隐藏元素
                // if ($elem.css('visibility') === 'hidden' || $elem.css('display') === 'none') {
                //     return;
                // }

                var offset = $elem.offset();

                // 底部是否显示
                var bottomIsVisible = top + height >= (offset.top + options.threshold);

                // 顶部是否显示
                var topIsVisible = offset.top + $elem.height() - options.threshold >= top;

                // 高级可见必须元素在可视范围
                if (bottomIsVisible && topIsVisible) {
                    self.__load(key);
                }
            });

            // 检查下是否完成
            self.__checkAll();
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Lazyload.defaults = {
        elem: null,
        event: 'scroll',
        threshold: 0
    };

    return Lazyload;
});
