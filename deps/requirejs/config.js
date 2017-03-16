(function () {
    var baseUrl;

    // 如果是github-pages
    if (location.host === 'zbfe.github.io') {
        baseUrl = '/zui/src/';
    }

    // 如果是本地file文件则引用线上github-pages
    else if (location.protocol === 'file:') {
        baseUrl = 'http://zbfe.github.io/zui/src/';
    }

    // 如果不包含zui
    else if (location.href.indexOf('/zui/') === -1) {
        baseUrl = '/src/';
    }

    else {
        baseUrl = location.href.substr(0, location.href.indexOf('/zui/') + 5) + 'src/';
    }

    requirejs.config({
        baseUrl: baseUrl,
        paths: {
            text: '../deps/requirejs/plugins/text',
            tpl: '../deps/requirejs/plugins/text',
            css: '../deps/requirejs/plugins/css',
            zepto: '../deps/zepto',
            Class: 'base/Class',
            zui: 'base/zui',
            test: '../test'
        },
        shim: {
            zepto: {
                exports: 'Zepto'
            }
        },
        urlArgs: function (uri, url) {
            var args = '';

            // if (url.indexOf('.css') > -1) {
                args = 'v=' + Date.now();
            // }

            return (url.indexOf('?') === -1 ? '?' : '&') + args;;
        }
    });
})();
