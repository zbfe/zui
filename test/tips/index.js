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

    it('zui.Tips({content: str})', function () {
        var str = getGuid();

        new zui.Tips({
            content: str
        });

        expect($('.zui-tips-wrap').html().indexOf(str) > -1).toBe(true);
    });


    // lock=true
    // autoClose=true
    // _timer=true
    // _closed
});
