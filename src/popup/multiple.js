/**
 * @file 弹出下浮层 - 多选
 * @author fe.xiaowu@gmail.com
 *
 * @events
 *     1. cancel
 *     2. close
 *     3. destroy
 *     4. select
 *     5. clickDone
 *     6. clickAll
 *     7. clickItem
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    // 引用css
    require('css!./multiple.css');

    var Multiple = Base.extend({

        /**
         * 构造函数
         *
         * @param {Object} options 参数参数
         */
        constructor: function (options) {
            var self = this;
            var html;

            // 合并参数
            options = $.extend({}, Multiple.defaults, options);

            // 如果没有data或者为空，则报错
            if (!options.data || !options.data.length) {
                throw new Error('options.data is empty');
            }

            // 拼标题
            html = [
                '<div class="zui-popup-multiple-header">',
                '   <div class="zui-popup-multiple-header-all">全部</div>',
                '   <div class="zui-popup-multiple-header-title">' + options.title + '</div>',
                '   <div class="zui-popup-multiple-header-done">完成</div>',
                '</div>'
            ].join('');

            // 拼列表
            html += [
                '<ul class="zui-popup-multiple-list">'
            ].join('');
            html += options.data.map(function (val) {
                return [
                    val.selected ? '<li class="zui-popup-multiple-selected">' : '<li>',
                    '       <div class="zui-popup-multiple-text">' + val.text + '</div>',
                    '       <i class="zui-popup-multiple-icon"></i>',
                    '</li>'
                ].join('');
            }).join('');
            html += [
                '</ul>'
            ].join('');

            // 准备弹出来的数据
            options.content = html;

            // 初始化zui
            Multiple.super.constructor.call(self, options);

            // 绑定点击单个选项时
            self.$wrap.find('.zui-popup-multiple-list > li').on('click', function () {
                $(this).toggleClass('zui-popup-multiple-selected');
                self.__initAll();
            });

            // 点击完成时
            self.$wrap.find('.zui-popup-multiple-header-done').on('click', function (event, isTriggerAll) {
                var index = self.$wrap.find('.zui-popup-multiple-selected').map(function () {
                    return $(this).index();
                }).get();

                var old = [];
                options.data.forEach(function (val, i) {
                    if (val.selected) {
                        old.push(i);
                    }

                    val.selected = $.inArray(i, index) !== -1;
                });

                // 如果不是从全部按钮触发的
                if (!isTriggerAll) {
                    self.trigger('clickDone');
                }

                // 触发选择回调
                self.trigger('select', {
                    index: index,
                    value: index.map(function (val) {
                        return options.data[val].value;
                    }),
                    old: old,
                    oldValue: old.map(function (val) {
                        return options.data[val].value;
                    }),
                    event: String(index) === String(old) ? 'none' : 'change'
                });

                self.close();
            });

            // 点击全部时
            self.$wrap.find('.zui-popup-multiple-header-all').on('click', function () {
                if ($(this).hasClass('zui-popup-multiple-header-disabled')) {
                    return false;
                }

                self.$wrap.find('.zui-popup-multiple-list > li').addClass('zui-popup-multiple-selected');
                self.$wrap.find('.zui-popup-multiple-header-done').triggerHandler('click', [true]);

                // 解发下全选回调
                self.trigger('clickAll');
            });

            self.__initAll();
        },

        /**
         * 设置全选按钮的状态
         */
        __initAll: function () {
            var $all = this.$wrap.find('.zui-popup-multiple-header-all');
            var isAll = this.$wrap.find('.zui-popup-multiple-selected').length === this.get('data').length;

            $all[isAll ? 'addClass' : 'removeClass']('zui-popup-multiple-header-disabled');
        }
    });

    /**
     * 默认参数
     *
     * @type {Object}
     * @param {string} [options.title=请选择] 标题
     * @param {Array} options.data 数据列表，[{value, text, selected}]
     */
    Multiple.defaults = {
        data: [],
        title: '请选择',
        className: 'zui-popup-multiple'
    };

    return Multiple;
});
