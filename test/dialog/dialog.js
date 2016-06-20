/**
 * @file 对话框基类测试
 * @author schoeu1110@gmail.com
 */
define([
    'dialog/dialog',
    'zepto'
], function (Dialog, $) {
    'use strict';

    describe('dialog/dialog', function () {
        afterEach(function () {
            $('.zui-dialog-musk').remove();
        });

        it('Dialog("content")', function () {
            var app = new Dialog('内容');
            expect($('.zui-dialog-wrap').length).toBe(1);
            app.ele.find('.zui-dialog-btns').triggerHandler('click');
        });

        it('Dialog({content:"content"})', function () {
            var app = new Dialog({content: '内容'});
            expect($('.zui-dialog-wrap').length).toBe(1);
            app.ele.find('.zui-dialog-btns').triggerHandler('click');
        });

        it('Vertical buttons', function (){
            new Dialog({content:'内容', horizontal:false});
            expect($('.zui-dialog-btngroup-v').length).toBe(1);
        });

        it('Vertical buttons', function (){
            new Dialog({content:'内容', horizontal:false});
            expect($('.zui-dialog-btngroup-v').length).toBe(1);
            expect($('.zui-dialog-btngroup-h').length).toBe(0);
        });

        it('Horizontal buttons', function (){
            new Dialog({content:'内容', horizontal:true});
            expect($('.zui-dialog-btngroup-v').length).toBe(0);
            expect($('.zui-dialog-btngroup-h').length).toBe(1);
        });

        it('Default horizontal buttons', function (){
            new Dialog({content:'内容'});
            expect($('.zui-dialog-btngroup-v').length).toBe(0);
            expect($('.zui-dialog-btngroup-h').length).toBe(1);
        });

        it('Default hidden', function (){
            new Dialog({content:'内容'});
            expect($('.zui-dialog-wrap-mask').css('display')).toEqual('none');
        });

        it('Dialog show style check', function (){
            var app = new Dialog({content:'内容'});
            app.show();
            expect($('.zui-dialog-wrap-mask').css('display')).toEqual('block');
        });

        it('Button click action', function (){
            var app = new Dialog({content:'内容'});
            app.show();
            app.ele.find('.zui-dialog-btns').first().trigger('click');

            setTimeout(function(){
                expect($('.zui-dialog-wrap-mask').length).toBe(0);
            }, 400);
        });

        it('Default for two buttons', function (){
            var app = new Dialog({content:'内容'});
            app.show();
            expect(app.ele.find('.zui-dialog-btns').length).toBe(1);
        });

        it('Test title value', function (){
            var app = new Dialog({content:'内容', title:'test'});
            app.show();
            var text = app.ele.find('.zui-dialog-header').text();
            expect(text).toEqual('test');
        });

        it('Html content test', function (){
            var app = new Dialog({content:'<span class="zui-dialog-test"></span>', title:'test'});
            app.show();
            expect(app.ele.find('.zui-dialog-test').length).toBe(1);
        });

        it('Custom button', function (){
            var app = new Dialog({content:'内容', buttons:[
                {text:'按钮1',callback:function(){}},
                {text:'按钮2',callback:function(){}},
                {text:'按钮3',callback:function(){}}
            ]});
            app.show();
            expect(app.ele.find('.zui-dialog-btns').length).toBe(3);
        });

        it('Event: show', function (){
            var app = new Dialog({content:'内容'});
            var value = 0;
            app.show();
            app.on('show', function(){
                value = 1;
            });
            setTimeout(function(){
                expect(value).toEqual('1');
            },400);

        });

        it('Event: hide', function (){
            var app = new Dialog({content:'内容'});
            var value = 0;
            app.show();
            app.hide();
            app.on('hide', function(){
                value = 1;
            });
            setTimeout(function(){
                expect(value).toEqual('1');
            },400);

        });

        it('Event: destroy', function (){
            var app = new Dialog({content:'内容'});
            var value = 0;
            app.destroy();
            app.on('destroy', function(){
                value = 1;
            });
            setTimeout(function(){
                expect(value).toEqual('1');
            },400);

        });

    });
});
