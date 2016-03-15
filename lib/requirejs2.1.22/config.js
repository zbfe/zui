requirejs.config({
    baseUrl: '/src/',
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
