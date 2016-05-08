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
            text: '../lib/requirejs2.1.22/plugins/text',
            tpl: '../lib/requirejs2.1.22/plugins/text',
            css: '../lib/requirejs2.1.22/plugins/css',
            zepto: '../lib/zepto',
            test: '../test'
        },
        shim: {
            zepto: {
                exports: 'Zepto'
            }
        }
    });
})();
