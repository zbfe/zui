/**
 * @file karma-requirejs使用的加载器
 * @author xiaowu
 */

var allTestFiles = [];

// Get a list of all the test files to include
Object.keys(window.__karma__.files).forEach(function (file) {
    if (String(file).indexOf('/test/') > -1) {
        // Normalize paths to RequireJS module names.
        // If you require sub-dependencies of test files to be loaded as-is (requiring file extension)
        // then do not normalize the paths
        var normalizedTestModule = file.replace(/^\/base\/|\.js$/g, '');
        allTestFiles.push(normalizedTestModule);
    }

});

console.log(111, allTestFiles);

require.config({
    baseUrl: '/base/src/',
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
    },

    
});

require.config({
    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});

