/**
 * @file 提示层
 * @author xiaowu
 */

(function (zui) {

    /**
     * 构造函数
     *
     * @param {Object} options 配置参数或者提示内容
     * @param {Function} options.onShow 显示回调
     * @param {Function} options.onClose 关闭回调
     * @param {boolean} options.lock 是否锁定屏幕
     * @param {boolean} options.autoClose 是否自动关闭
     * @param {number} [options.time=2000] 自动关闭时间
     */
    var Tips = zui.Tips = function (options) {
        // 如果值为一个字符串，则认为这是一个内容
        if ('string' === typeof options) {
            options = {
                content: options
            };
        }

        // 合并参数
        this.options = $.extend({
            autoClose: true,
            time: 2000
        }, options);

        // 初始化
        this._init();
    };

    $.extend(Tips.prototype, {
        _init: function () {
            var self = this;
            var options = self.options;
            var $inner;

            self.$wrap = $('<div />').addClass('zui-tips-wrap');

            $inner = $('<div />').addClass('zui-tips-inner').text(options.content || 'loading');

            // 如果要锁屏
            if (options.lock === true) {
                self.$wrap.addClass('zui-tips-wrap-mask');
            }

            // 把dom插入到页面中
            self.$wrap.append($inner).appendTo('body');

            // 强制重排
            self.$wrap[0].offsetWidth;

            // 添加显示类
            self.$wrap.addClass('zui-tips-wrap-show');

            // 如果有自动关闭，则延迟关闭
            if (options.autoClose) {
                self._timer = setTimeout(self.close.bind(this), options.time);
            }

        },

        /**
         * 关闭
         *
         * @return {Object} this
         */
        close: function () {
            var self = this;

            // 如果已经关闭
            if (self._closed) {
                return self;
            }

            // 如果有延迟时间，则清除，防止自动关闭和手动冲突
            if (self._timer) {
                clearTimeout(self._timer);
                delete self._timer;
            }

            // 移除显示的类，就是隐藏了，交给css3控制了
            self.$wrap.removeClass('zui-tips-wrap-show');

            // 延迟是为了让css3的动画执行完成
            setTimeout(function () {
                self.$wrap.remove();
                delete self.$wrap;
            }, 300);

            // 打上关闭标识，防止重复关闭
            self._closed = true;

            return self;
        }
    });
})(window.zui);
