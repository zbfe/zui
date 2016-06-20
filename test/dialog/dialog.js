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

        it('vertical buttons', function (){
            new Dialog({content:'内容', horizontal:false});
            expect($('.zui-dialog-btngroup-v').length).toBe(1);
        });

        it('vertical buttons', function (){
            new Dialog({content:'内容', horizontal:false});
            expect($('.zui-dialog-btngroup-v').length).toBe(1);
            expect($('.zui-dialog-btngroup-h').length).toBe(0);
        });

        it('horizontal buttons', function (){
            new Dialog({content:'内容', horizontal:true});
            expect($('.zui-dialog-btngroup-v').length).toBe(0);
            expect($('.zui-dialog-btngroup-h').length).toBe(1);
        });

    });
});
