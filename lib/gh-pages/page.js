/**
 * @file pages
 * @author fe.xiaowu@gmail.com
 */

(function (callback) {
    require([
        'tips/loading'
    ], function (loading) {
        callback(window.jQuery, loading);
    });
})(function ($, loading) {
    'use strict';

    /**
     * 滚动时是否使用动画
     *
     * @type {Boolean}
     */
    var scrollIsAnimate = true;

    /**
     * 转义html
     *
     * @param  {string} str 字符串
     *
     * @return {string}     转义后的字符
     */
    var escapeHtml = function (str) {
        var obj = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            /* eslint-disable quotes */
            "'": '&#39;'
            /* eslint-enable quotes */
        }
        return String(str).replace(/[&<>"']/g, function ($0) {
            return obj[$0];
        });
    };
    var renderer = new marked.Renderer();
    var uid = 0;
    renderer.code = function (code, lang) {
        var html = '<pre><code class="lang-' + lang + '">' + escapeHtml(code) + '</code></pre>';

        // 如果不是运行js
        if (lang !== 'runjs') {
            return html;
        }

        // 拼要运行的代码
        html += [
            '<div>',
            '   <button class="runjs-btn" id="J-runjs-' + uid + '">点我运行</button>',
            '</div>',
            '<script>',
            '   document.getElementById("J-runjs-' + uid + '").onclick = function () {',
            '       try {',
            '           ' + code,
            '       }',
            '       catch (e) {',
            '           alert("运行出错");',
            '           console.log(e);',
            '       }',
            '   }',
            '</script>'
        ].join('');

        uid += 1;

        return html;
    };
    marked.setOptions({
        // highlight: function (code, lang, callback) {
        //     if (lang !== 'runjs') {
        //         return code;
        //     }
        //     return code + '<div>csdcs</div>';
        // },
        renderer: renderer
    });

    /**
     * 渲染markdown内容到页面中
     *
     * @param  {string} html md文档内容
     */
    var render = function (html) {
        $('#main').html(marked(html));

        if (scrollIsAnimate) {
            scrollToAnchor();
        }

        scrollIsAnimate = true;
    };

    /**
     * 滚动到锚点
     */
    var scrollToAnchor = function () {
        var top;

        try {
            top = $('#' + parseHash().anchor).offset().top;
        }
        catch (e) {
            top = 0;
        }

        $('html, body').animate({
            scrollTop: top
        }, 500);
    };

    /**
     * 解析hash，主要处理2层hash
     *
     * @return {Object} {url, anchor}
     */
    var parseHash = function () {
        var hash = location.hash.substr(1);
        var data = {
            url: 'README.md',
            anchor: ''
        };
        if (hash) {
            hash = hash.split('#');
            data = {
                url: hash[0],
                anchor: decodeURIComponent(hash[1] || '').replace(/\//g, '-')
            }
        }

        return data;
    };

    var uri = null;
    var getMd = function () {
        if (!uri) {
            uri = parseHash().url;
        }
        else {
            if (uri === parseHash().url) {
                return scrollToAnchor();
            }
            else {
                uri = parseHash().url;
            }
        }

        loading.show();

        $.ajax({
            url: uri,
            cache: false,
            dataType: 'text',
            success: function (html) {
                if (String(html).indexOf('<title>') > -1) {
                    render('渲染出错了～');
                }
                else {
                    render(html);
                }
            },
            error: function () {
                render('咦，加载出错了～');
            },
            complete: function () {
                loading.hide();
            }
        });
    };
    
    // 绑定点击委托，判断是不是点击的md，再判断是不是点击的锚点
    $('body').on('click', 'a', function () {
        var url = $(this).attr('href');

        if (url.indexOf('.md') > -1) {
            history.pushState(null, null, '#' + url);
            getMd();
            return false;
        }
        else if (url.indexOf('#') === 0) {
            history.pushState(null, null, '#' + parseHash().url + url);
            getMd();
            return false;
        }
    });

    // 绑定hash事件，hash改变时不使用动画滚动
    window.onhashchange = function () {
        scrollIsAnimate = false;
        getMd();
    };

    getMd();
});