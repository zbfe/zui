/**
 * @file 弹出下浮层，模拟下拉
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
    require('css!./select.css');

    var Select = Base.extend({

        /**
         * 构造函数
         *
         * @param {Object} options 参数参数
         */
        constructor: function (options) {
            var self = this;
            var html;

            // 合并参数
            options = $.extend({}, Select.defaults, options);

            // 如果没有data或者为空，则报错
            if (!options.data || !options.data.length) {
                throw new Error('options.data is empty');
            }

            // 拼列表
            html = [
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

            // 准备弹出来的数据
            options.content = html;

            // 初始化zui
            Select.super.constructor.call(self, options);

            // 点击取消
            self.$wrap.find('.zui-popup-select-cancel').on('click', function () {
                self.trigger('cancel');
                self.close();
            });

            // 点击菜单
            self.$wrap.find('.zui-popup-select-list .zui-popup-select-item').on('click', function () {
                var index = $(this).index();

                self.trigger('select', {
                    index: index,
                    value: self.get('data')[index].value
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
     * @param {Array} data 数据列表
     * @param {string} data[].text 菜单显示之本
     * @param {string} data[].value 菜单的值
     */
    Select.defaults = {
        data: [],
        className: 'zui-popup-select'
    };

    return Select;
});
