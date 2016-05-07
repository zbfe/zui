define(function (require) {
    var $ = require('zepto');

    // 加载样式
    require('css!./index.css');

    function Base(options) {
        this.options = $.extend({}, Base.defaults, options);
        this.__init();
    }

    $.extend(Base.prototype, {
        __init: function () {
            var self = this;
            var $wrap = this.$wrap = $('<div />').addClass('zui-popup-wrap');
            var $inner = $('<div />').addClass('zui-popup-inner '+ this.options.className).html(this.options.content);

            // 添加遮罩层
            $wrap.append('<div class="zui-popup-mask"></div>');

            $wrap.append($inner);

            $wrap.appendTo('body');

            $wrap.addClass('zui-popup-show');

            $inner.animate({
                transform: 'translateY(0)'
            }, 200);

            $wrap.find('.zui-popup-mask').on('click', self.close.bind(self)).on('touchmove', false);
        },

        close: function () {
            var self = this;

            if (self._closed) {
                return self;
            }

            self._closed = true;

            self.$wrap.removeClass('zui-popup-show');

            self.$wrap.find('.zui-popup-inner').animate({
                transform: 'translateY(100%)'
            }, 200, 'ease', function () {
                self.$wrap.remove();
                delete self.$wrap;
            });

            return self;
        }
    });

    Base.defaults = {
        className: '',
        content: ''
    };

    return Base;
});
