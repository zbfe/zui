/**
 * @file 弹出下浮层 - 多选
 * @author fe.xiaowu@gmail.com
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Base = require('./base');

    // 引用css
    require('css!./multiple.css');

    function Multiple(options) {
        this.options = $.extend({}, Multiple.defaults, options);

        // 如果没有data或者为空，则报错
        if (!this.options.data || !this.options.data.length) {
            throw new Error('options.data is empty');
        }

        this.__init();
    }

    $.extend(Multiple.prototype, {
        __initAll: function () {
            var $all = this._popup.$wrap.find('.zui-popup-radio-header-all');
            var isAll = this._popup.$wrap.find('.zui-popup-radio-selected').length === this.options.data.length;

            $all[isAll ? 'addClass' : 'removeClass']('zui-popup-radio-header-disabled');
        },
        __init: function () {
            var self = this;
            var options = self.options;
            var html = '';
            var $wrap;

            var isAll = options.data.every(function (val) {
                return !!val.selected;
            });

            // 拼标题
            html += [
                '<div class="zui-popup-radio-header">',
                '   <div class="zui-popup-radio-header-all">全部</div>',
                '   <div class="zui-popup-radio-header-title">' + options.title + '</div>',
                '   <div class="zui-popup-radio-header-done">完成</div>',
                '</div>'
            ].join('');

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
                className: 'zui-popup-radio'
            });

            $wrap = self._popup.$wrap;

            $wrap.find('.zui-popup-radio-list > li').on('click', function () {
                $(this).toggleClass('zui-popup-radio-selected');
                self.__initAll();
            });

            $wrap.find('.zui-popup-radio-header-done').on('click', function () {
                var index = $wrap.find('.zui-popup-radio-selected').map(function () {
                    return $(this).index();
                }).get();

                var old = [];
                options.data.forEach(function (val, i) {
                    if (val.selected) {
                        old.push(i);
                    }

                    val.selected = $.inArray(i, index) !== -1;
                });

                options.onSelect({
                    index: index,
                    value: index.map(function (val) {
                        return (options.data[val] || '').value;
                    }),
                    old: old,
                    oldValue: old.map(function (val) {
                        return (options.data[val] || '').value;
                    }),
                    event: String(index) === String(old) ? 'none' : 'change'
                });

                self.close();
            });

            $wrap.find('.zui-popup-radio-header-all').on('click', function () {
                if ($(this).hasClass('zui-popup-radio-header-disabled')) {
                    return false;
                }

                $wrap.find('.zui-popup-radio-list > li').addClass('zui-popup-radio-selected');
                $wrap.find('.zui-popup-radio-header-done').triggerHandler('click');
            });

            self.__initAll();
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
    Multiple.defaults = {
        data: [],
        title: '菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1菜单1',
        onSelect: null,
        onCancel: null
    };

    return Multiple;
});
