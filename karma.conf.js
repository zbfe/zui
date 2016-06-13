// http 服务器
var httpServer = function (req, res, next) {
    var url = req.url;
    var temp;

    if (url.indexOf('/upload/base/data') === 0) {
        temp = '';
        req.on('data', function (data) {
            temp += data;
        });
        req.on('end', function () {
            temp = temp.toString();

            res.write(JSON.stringify({
                status: 0,
                a: temp.indexOf('name="a"') > -1,
                b: temp.indexOf('name="b"') > -1
            }));

            res.end();
        });
    }
    else if (url.indexOf('/upload/base/filename') === 0) {
        temp = '';
        req.on('data', function (data) {
            temp += data;
        });
        req.on('end', function () {
            temp = temp.toString();

            res.write(JSON.stringify({
                status: 0,
                filename: temp.indexOf('name="testfilename"') > -1
            }));

            res.end();
        });
    }
    else if (url.indexOf('/upload/base/success') === 0) {
        res.end(JSON.stringify({
            status: 0
        }));
    }
    else if (url.indexOf('/upload/base/500') === 0) {
        res.statusCode = 500;
        res.end(JSON.stringify({
            errcode: 500
        }));
    }
    else {
        next();
    }
};

var files = [
    {
        pattern: 'lib/zepto.js',
        included: false
    },
    {
        pattern: 'lib/requirejs/plugins/*.js',
        included: false
    },
    {
        pattern: 'src/**/*',
        included: false
    },
    {
        pattern: 'test/**/*.js',
        included: false
    },
    'lib/requirejs/config.js',
    // 加载初始化视图测试
    'karma.conf.require.js'
];

if (process.argv.slice(-1)[0].match(/--test\=(.*)$/)) {
    files[3].pattern = 'test/' + RegExp.$1;
    console.log([
        '============',
        '开始测试：' + files[3].pattern,
        '============'
    ].join('\n'));
}

// Karma configuration
// Generated on Sun Jan 24 2016 23:22:35 GMT+0800 (CST)
module.exports = function (config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'jasmine',
            'requirejs'
        ],
        // list of files / patterns to load in the browser
        files: files,
        // list of files to exclude
        exclude: [],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        coverageReporter: {
            // specify a common output directory
            dir: '.',
            reporters: [
                // { type: 'html', subdir: 'report-html' },
                {
                    type: 'lcov',
                    subdir: 'coverage'
                },
                {
                    type: 'text-summary'
                }
            ]
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            // 'coverage'
        ],
        // web server port
        port: 9876,
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            'PhantomJS'
        ],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,
        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        middleware: ['httpServer'],
         // plugins
        plugins: ['karma-*', {
            'middleware:httpServer': [
                'factory', function () {
                    return httpServer;
                }
            ]
        }]
    });
};
