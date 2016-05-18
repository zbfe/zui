/**
 * @file 弹出下浮层 - 单选
 * @author fe.xiaowu@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    // 引用css
    require('css!./radio.css');

    /**
     * 构造函数
     *
     * @param {Object} options 配置对象
     * @param {string} [options.title=请选择] 标题
     * @param {Array} options.data 数据列表，[{value, text, selected}]
     * @param {Function} options.onSelect 选择回调，this为当前实例，参数为{value, index, old, oldValue}
     * @param {Function} options.onCancel 取消回调，this为当前实例
     */
    function Radio(options) {
        this.options = $.extend({}, Radio.defaults, options);

        // 如果没有data或者为空，则报错
        if (!this.options.data || !this.options.data.length) {
            throw new Error('options.data is empty');
        }

        this.__init();
    }

    $.extend(Radio.prototype, {

        /**
         * 初始化
         *
         * @private
         */
        __init: function () {
            var self = this;
            var options = self.options;
            var html = '';

            // 拼标题
            html += [
                '<div class="zui-popup-radio-header">' + options.title + '</div>'
            ].join('');

            // 处理只让第一个选中
            options.data.filter(function (val) {
                return !!val.selected;
            }).forEach(function (val, index) {
                if (index !== 0) {
                    delete val.selected;
                }
            });

            // 拼列表
            html += [
                '<ul class="zui-popup-radio-list">'
            ].join('');
            html += options.data.map(function (val) {
                return [
                    val.selected ? '<li class="zui-popup-radio-selected">' : '<li>',
                    '       <div class="zui-popup-radio-text">' + val.text + '</div>',
                    '       <i class="zui-popup-radio-icon"></i>',
                    '</li>'
                ].join('');
            }).join('');
            html += [
                '</ul>'
            ].join('');

            // 弹出来
            self._popup = new Base({
                content: html,
                className: 'zui-popup-radio',
                onCancel: options.onCancel
            });

            // 绑定点击列表时触发事件并关闭
            self._popup.$wrap.find('.zui-popup-radio-list > li').on('click', function () {
                var index = $(this).index();
                var old = self._popup.$wrap.find('.zui-popup-radio-selected').eq(0).index();

                // 重置选项
                options.data.forEach(function (val, i) {
                    val.selected = i === index;
                });

                options.onSelect.call(self, {
                    index: index,
                    value: options.data[index].value,
                    old: old === -1 ? undefined : old,
                    oldValue: (options.data[old] || '').value,
                    event: old === index ? 'none' : 'change'
                });

                self.close();
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
    Radio.defaults = {
        data: [],
        title: '请选择',
        onSelect: function () {},
        onCancel: null
    };

    return Radio;
});
