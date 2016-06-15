/**
 * @file 弹出下浮层 - 单选
 * @author fe.xiaowu@gmail.com
 *
 * @events
 *     1. cancel
 *     2. close
 *     3. destroy
 *     4. select
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    // 引用css
    require('css!./radio.css');

    var Radio = Base.extend({

        /**
         * 构造函数
         *
         * @param {Object} options 参数参数
         */
        constructor: function (options) {
            var self = this;
            var html;

            // 合并参数
            options = $.extend({}, Radio.defaults, options);

            // 如果没有data或者为空，则报错
            if (!options.data || !options.data.length) {
                throw new Error('options.data is empty');
            }

            // 拼标题
            html = [
                '<div class="zui-popup-radio-header">' + options.title + '</div>'
            ].join('');

            // 处理只让第一个选中
            // 为了避免传的数据不规范
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

            // 准备弹出来的数据
            options.content = html;

            // 初始化zui
            Radio.super.constructor.call(self, options);

            // 绑定点击列表时触发事件并关闭
            self.$wrap.find('.zui-popup-radio-list > li').on('click', function () {
                var index = $(this).index();
                var old = self.$wrap.find('.zui-popup-radio-selected').eq(0).index();

                // 重置选项
                options.data.forEach(function (val, i) {
                    val.selected = i === index;
                });

                self.trigger('select', {
                    index: index,
                    value: options.data[index].value,
                    old: old === -1 ? undefined : old,
                    oldValue: (options.data[old] || '').value,
                    event: old === index ? 'none' : 'change'
                });

                self.close();
            });

            html = null;
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     * @param {string} [options.title=请选择] 标题
     * @param {Array} data 数据列表
     * @param {string} data[].text 菜单显示之本
     * @param {string} data[].value 菜单的值
     * @param {boolean} [data[].selected=false] 是否选中菜单
     */
    Radio.defaults = {
        data: [],
        title: '请选择',
        className: 'zui-popup-radio'
    };

    return Radio;
});
