/**
 * @file 提示层测试用例
 * @author xiaowu
 */

/* globals zui */
describe('Tips', function () {
    var types = [
        '',
        0,
        false,
        true,
        1,
        null,
        undefined,
        function () {},
        {},
        []
    ];

    var guid = 0;
    var getGuid = function () {
        guid += 1;
        return 'zui-tips-' + guid;
    };

    afterEach(function () {
        $('.zui-tips-wrap').remove();
    });

    it('zui.Tips', function () {
        expect(typeof zui.Tips).toBe('function');
    });

    it('zui.Tips()', function () {
        var flag = true;
        try {
            var tips = zui.Tips;
            tips();
        }
        catch (e) {
            flag = false;
        }

        expect(flag).toBe(false);
    });

    it('check params', function () {
        var flag = true;

        try {
            types.forEach(function (key) {
                new zui.Tips(key);
            });
        }
        catch (e) {
            flag = false;
        }

        expect(flag).toBe(true);
    });

    it('zui.Tips(str)', function () {
        var str = getGuid();

        new zui.Tips(str);
        expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
    });

    it('{content: str}', function () {
        var str = getGuid();

        new zui.Tips({
            content: str
        });

        expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
    });

    it('autoClose: true', function (done) {
        var app =new zui.Tips({
            autoClose: true
        });

        expect(typeof app._timer).toBe('number');

        setTimeout(function () {
            expect($('.zui-tips-wrap').length).toBe(0);
            done();
        }, app.options.time + 500);
    });

    it('autoClose: false', function (done) {
        new zui.Tips({
            autoClose: false,
            time: 200
        });

        expect($('.zui-tips-wrap').length).toBe(1);

        setTimeout(function() {
            expect($('.zui-tips-wrap').length).toBe(1);
            done();
        }, 200 + 500 + 200);
    });

    it('time: 200', function (done) {
        new zui.Tips({
            autoClose: true,
            time: 200
        });

        expect($('.zui-tips-wrap').length).toBe(1);

        setTimeout(function () {
            expect($('.zui-tips-wrap').length).toBe(0);
            done();
        }, 200 + 500);
    });

    it('{lock: true}', function () {
        new zui.Tips({
            lock: true
        });

        expect($('.zui-tips-wrap.zui-tips-wrap-mask').length).toBe(1);
    });

    it('close()', function (done) {
        var app = new zui.Tips({
            autoClose: false
        });

        expect($('.zui-tips-wrap').length).toBe(1);

        app.close();

        setTimeout(function () {
            expect($('.zui-tips-wrap').length).toBe(0);
            done();
        }, 500);
    });

    it('close().close()', function () {
        var flag = true;

        try {
            new zui.Tips().close().close().close().close();
        }
        catch (e) {
            flag = false;
        }

        expect(flag).toBe(true);
    });

    it('autoClose => close()', function (done) {
        var app = new zui.Tips({
            autoClose: true,
            time: 500
        });

        setTimeout(function () {
            var flag = true;
            try {
                app.close().close();
            }
            catch (e) {
                flag = false;
            }
            expect(flag).toBe(true);
            done();
        }, 500 + 500);
    });

    it('close() => autoClose', function (done) {
        var app = new zui.Tips({
            autoClose: true,
            time: 500
        });

        app.close();

        setTimeout(function () {
            expect(app._closed).toBe(true);
            done();
        }, 500 + 500);
    });

    // lock=true
    // autoClose=true
    // _timer=true
    // _closed
});
