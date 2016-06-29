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
        constructor: function (options) {
            var self;

            // 初始化zui
            Lazyload.super.constructor.call(self, Lazyload.defaults, options);

            // 筛选出没有加载过的
            var $elem = $(self.get('elem')).filter(function () {
                return !$(this).data('lazyload-load');
            });

            // 如果元素不存在
            if (!$elem.length) {
                return;
            }

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
            }

        },

        /**
         * 显式加载
         *
         * @param  {string|HTMLelement} $elem 要加载的元素，如果为空则加载所有
         *
         * @return {Object}       this
         */
        load: function ($elem) {
            var self = this;

            if ($elem) {
                $($elem).each(function () {
                    self.__load($(this).data('lazyload-load'));
                });
            }
            else {
                Object.keys(self.$dom).forEach(function (key) {
                    self.__load(key);
                });

                /**
                 * 全部加载完成
                 *
                 * @event loadall
                 */
                self.trigger('loadall');
            }

            return this;
        },

        /**
         * 获取事件空间名
         *
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
            this.trigger('loaditem', this.$dom[key]);

            // 删除这个dom，以防止下次循环她
            delete this.$dom[key];
        },

        /**
         * 检查是否可见
         */
        __check: function () {
            var self = this;
            var options = self.get();
            var scrollTop = $window.scrollTop();
            var height = $window.height();
            var key;
            var $elem;
            var offset;

            for (key in self.$dom) {
                if (!self.$dom.hasOwnProperty(key)) {
                    continue;
                }

                $elem = self.$dom[key];
                offset = $elem.offset();

                // 高级可见必须元素在可视范围
                if ($elem.is(':visible') && scrollTop + height >= (offset.top + options.threshold) && (offset.top + $elem.height() >= scrollTop)) {
                    self.__load(key);
                }

            }

            // 加载全部了
            if (Object.keys(self.$dom).length === 0) {

                /**
                 * 全部加载完成
                 *
                 * @event loadall
                 */
                self.trigger('loadall');
            }

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
