/**
 * @file 弹出下浮层，模拟下拉
 * @author fe.xiaowu
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    // 引用css
    require('css!./select.css');

    /**
     * 构造函数
     *
     * @param {Object} options 配置对象
     * @param {Array} options.data 数据列表，[{value, text}]
     * @param {Function} options.onSelect 选择回调，this为当前实例，参数为{value, index}
     * @param {Function} options.onCancel 取消回调，this为当前实例
     */
    function Select(options) {
        this.options = $.extend({}, Select.defaults, options);

        // 如果没有data或者为空，则报错
        if (!this.options.data || !this.options.data.length) {
            throw new Error('options.data is empty');
        }

        this.__init();
    }

    $.extend(Select.prototype, {

        /**
         * 初始化
         *
         * @private
         */
        __init: function () {
            var self = this;
            var options = self.options;
            var html = '';

            // 拼列表
            html += [
                '<ul class="zui-popup-select-list">'
            ].join('');
            options.data.forEach(function (val) {
                html += [
                    '<li class="zui-popup-select-item">',
                    '   <div class="zui-popup-select-text">' + val.text + '</div>',
                    '</li>'
                ].join('');
            });
            html += [
                '</ul>'
            ].join('');

            // 拼取消按钮
            html += [
                '<div class="zui-popup-select-cancel">',
                '   <div class="zui-popup-select-item">取消</div>',
                '</div>'
            ].join('');

            // 弹出来
            self._popup = new Base({
                content: html,
                className: 'zui-popup-select'
            });

            // 点击取消
            self._popup.$wrap.find('.zui-popup-select-cancel').on('click', function () {
                self.close();
                if ('function' === typeof options.onCancel) {
                    options.onCancel.call(self);
                }
            });

            // 点击菜单
            self._popup.$wrap.find('.zui-popup-select-list .zui-popup-select-item').on('click', function () {
                var index;

                self.close();

                if ('function' === typeof options.onSelect) {
                    index = $(this).index();

                    options.onSelect.call(self, {
                        index: index,
                        value: options.data[index].value
                    });
                }
            });
        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            if (!self._popup) {
                return self;
            }

            self._popup.close();
            delete self._popup;

            return self;
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Select.defaults = {
        data: [],
        onSelect: null,
        onCancel: null
    };

    return Select;
});
