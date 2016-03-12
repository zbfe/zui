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
            this.$wrap = $('<div class="zui-dialog-wrap">');
            this.$mask = $('<div class="zui-dialog-mask">').appendTo(this.$wrap);
            this._eventProcess();
        },
        _render: function () {
            this.$wrap.appendTo($('body'));
        },
        show: function () {

        },
        hide: function () {
            this.$wrap.remove();
        },
        _eventProcess: function () {

        }
    };


})(window.zui);
