/**
 * @file Dialog
 * @author schoeu
 */


// TODO 留坑待完成

(function (zui) {

    /**
     * Dialog构造函数
     */
    var Dialog = zui.Dialog = function (options) {
        var self = this;
        var loop = function () {};
        self.opts = $.extend({
            title: '提示',
            content: '',
            buttons: [{
                text: '确定',
                onConfirm: loop
            },
            {
                text: '取消',
                onCancel: loop
            }]
        }, options);


        self._init();
    };

    Dialog.prototype = {
        _init: function () {
            var $tempWrap = $('<div class="zui-dialog-wrap">');
            this.$mask = $('<div class="zui-dialog-mask">').appendTo($tempWrap);
            this.$wrap = $tempWrap.appendTo($('body'));
            this._eventProcess();
        },
        _render: function () {

        },
        show: function () {
            this.$wrap.addClass('zui-dialog-show');
        },
        hide: function () {
            this.$wrap.remove();
        },
        _eventProcess: function () {

        }
    };


})(window.zui);
