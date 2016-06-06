(function () {
    var baseUrl;

    // 如果是github-pages
    if (location.host === 'zbfe.github.io') {
        baseUrl = '/zui/src/';
    }
    else if (/https?:/.test(location.protocol)) {
        baseUrl = '/src/';
    }
    else {
        baseUrl = location.href.substr(0, location.href.indexOf('/zui/') + 5) + 'src/';
    }

    requirejs.config({
        baseUrl: baseUrl,
        paths: {
            text: '../lib/requirejs/plugins/text',
            tpl: '../lib/requirejs/plugins/text',
            css: '../lib/requirejs/plugins/css',
            zepto: '../lib/zepto',
            // Class: '../lib/Class',
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
