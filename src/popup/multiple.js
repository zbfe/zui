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

    function Radio(options) {
        this.options = $.extend({}, Radio.defaults, options);

        // 如果没有data或者为空，则报错
        if (!this.options.data || !this.options.data.length) {
            throw new Error('options.data is empty');
        }

        this.__init();
    }

    $.extend(Radio.prototype, {
        __init: function () {
            var self = this;
            var options = self.options;
            var html = '';

            // 拼标题
            html += [
                '<div class="zui-popup-radio-header">' + options.title + '</div>'
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

            self._popup.$wrap.find('.zui-popup-radio-list > li').on('click', function () {
                
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
        onSelect: null,
        onCancel: null
    };

    return Radio;
});
