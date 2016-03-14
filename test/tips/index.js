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
    var animationTimeout = zui.Tips.animationTimeout;

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
        var app = new zui.Tips({
            autoClose: true,
            time: 50,
            onShow: function () {
                expect(typeof app._timer).toBe('number');    
            }
        });
        
        // 因为首先是animationTimeout显示完成后才会延迟time时间关闭，而再加个animationTimeout是动画结束时才删dom
        setTimeout(function () {
            expect($('.zui-tips-wrap').length).toBe(0);
            done();
        }, app.options.time + animationTimeout + animationTimeout + 100);
    });

    it('autoClose: false', function (done) {
        new zui.Tips({
            autoClose: false,
            time: 200
        });

        expect($('.zui-tips-wrap').length).toBe(1);

        setTimeout(function () {
            expect($('.zui-tips-wrap').length).toBe(1);
            done();
        }, 200 + animationTimeout + 10);
    });

    it('time: 200', function (done) {
        new zui.Tips({
            autoClose: true,
            time: 200,
            onShow: function () {
                setTimeout(function () {
                    expect($('.zui-tips-wrap').length).toBe(0);
                    done();
                }, 200 + animationTimeout + 100);
            }
        });

        expect($('.zui-tips-wrap').length).toBe(1);
    });

    it('time: 200 => onClose', function (done) {
        var start = Date.now();

        new zui.Tips({
            autoClose: true,
            time: 200,
            onClose: function () {
                var diff = animationTimeout + animationTimeout + 200;
                expect(Date.now() - start - diff < 100 ).toBe(true);
                done();
            }
        });
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
        }, animationTimeout);
    });

    it('close() 返回值', function () {
        var app = new zui.Tips();

        expect(app).toEqual(app.close().close());
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
        }, 500 + animationTimeout);
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
        }, 500 + animationTimeout);
    });

    it('onShow', function (done) {
        var app = new zui.Tips({
            onShow: function () {
                expect(this).toEqual(app);
                done();
            }
        });
    });

    it('onClose', function (done) {
        var app = new zui.Tips({
            onClose: function () {
                expect(this).toEqual(app);
                app.close().close();
                done();
            }
        });
    });

    it('onClose 次数', function (done) {
        var flag = 0;
        var app = new zui.Tips({
            time: 10,
            onClose: function () {
                flag += 1;
            }
        });

        app.close().close().close();

        setTimeout(function () {
            expect(flag).toBe(1);
            done();
        }, 10 + animationTimeout + animationTimeout + 100);
    });
});
