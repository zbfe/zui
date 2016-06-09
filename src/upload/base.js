/**
 * @file 上传基类 - html5 ajax2并发上传
 * @author fe.xiaowu
 *
 * @events
 *     1. success - 上传成功：{file}
 *     2. error - 有错误：{status, file, msg}
 *     3. progress - 上传进度：{file, loaded, total}
 *     4. complete - 完成上传（成功、失败都会触发）：{success, error}
 *     5. queued - 添加到队列： file
 */

define(function (require) {
    'use strict';

    var $ = require('zepto');
    var Zui = require('zui');

    var uid = 0;

    var Base = Zui.extend({
        constructor: function (options) {
            var self = this;

            // 初始化
            Base.super.constructor.call(self, Base.defaults, options);

            if (!window.FormData) {
                throw new Error('不支持');
            }

            self.$elem = $(self.get('elem'));

            // 如果元素不存在
            if (!self.$elem.length) {
                throw new Error('options.elem is empty');
            }

            // 需要上传文件的队列
            self._queued = [];

            // 设置是否多选并绑定事件
            self.$elem.prop('multiple', !!self.get('multiple')).on('change.zui-upload', function (event) {
                self._changeHandle(event, this);
            });
        },

        /**
         * 开始上线
         *
         * @return {Object} this
         */
        start: function () {
            var self = this;
            var queued = self._queued;

            // 队列里没有数据
            if (!queued.length) {
                return self.trigger('error', {
                    status: Base.status.ERROR_EMPTY,
                    msg: '上传队列为空'
                });
            }

            /**
             * 检查是否还有文件上传
             *
             * @inner
             */
            function check() {
                // 正在上传数-1
                self._uploading -= 1;

                // 如果上传队列还有数据则再次触发上传
                if (self._queued.length) {
                    self._uploads();
                }
                // 如果上传队列没有文件并且当前没有上传，那么就说明已经全部上传完成
                else if (self._uploading === 0) {
                    self.trigger('complete', {
                        success: self._successFile,
                        error: self._errorFile
                    });
                }
            }

            // 正在上传数
            self._uploading = 0;

            // 失败文件
            self._errorFile = [];

            // 成功文件
            self._successFile = [];

            self._uploads();

            // 成功时判断还有没有文件需要上传
            self.on('success', function (file) {
                // 添加到成功队列
                self._successFile.push(file);

                check();
            }).on('error', function (event) {
                if (event.status !== Base.status.ERROR_UPLOAD) {
                    return;
                }

                // 添加到失败文件队列
                self._errorFile.push(event.data);

                check();
            }).on('complete', function () {
                delete self._successFile;
                delete self._errorFile;
                delete self._uploading;
            });
        },

        /**
         * 销毁
         *
         * @return {Object} this
         */
        destroy: function () {
            var self = this;

            if (self.is('destroy')) {
                return self;
            }

            // 卸载事件
            self.$elem.off('change.zui-upload');

            self.is('destroy', true);

            self.trigger('destroy');

            return self;
        },

        /**
         * 文本框change触发事件
         *
         * @private
         * @param  {Object} event 事件对象
         * @param  {HTMLelement} that  触发input源dom
         *
         * @return {undefined}
         */
        _changeHandle: function (event, that) {
            var self = this;
            var files = event.target.files || event.dataTransfer.files || [];

            // 如果不是数组则是个对象
            if (!Array.isArray(files)) {
                files = Object.keys(files).map(function (key) {
                    return files[key];
                });
            }

            // 如果没有文件
            if (!files.length) {
                return;
            }

            // fix一直选一个文件
            setTimeout(function () {
                that.value = '';
            }, 100);

            // 筛选扩展名
            files = files.filter(function (val) {
                // 如果验证失败则追加到失败里面
                if (!self._checkExtname(val)) {
                    self.trigger('error', {
                        status: Base.status.ERROR_EXTNAME,
                        file: val,
                        msg: '文件扩展名不合法'
                    });
                    return false;
                }

                // 如果验证文件大小失败
                if (!self._checkSize(val)) {
                    self.trigger('error', {
                        status: Base.status.ERROR_SIZE,
                        file: val,
                        msg: '文件大小超出'
                    });
                    return false;
                }

                return true;
            });

            // 如果筛选之后还没有文件
            if (!files.length) {
                return;
            }

            // 添加文件到队列
            files.forEach(function (file) {
                self._addfile(file);
            });
        },

        /**
         * 从队列里并发上传
         *
         * @private
         */
        _uploads: function () {
            var self = this;

            // 截取需要上传的数据
            var data = self._queued.splice(0, self.get('limit') - self._uploading);

            data.forEach(function (file) {
                self._upload(file);
            });
        },

        /**
         * 单个上传
         *
         * @private
         * @param {Object} file 文件对象
         */
        _upload: function (file) {
            var self = this;
            var xhr = new XMLHttpRequest();
            var rdData;
            var data = self.get('data');

            // 绑定进度事件
            xhr.upload.addEventListener('progress', function (event) {
                event.file = file;
                self.trigger('progress', event);
            }, false);

            // 绑定xhr回调
            xhr.onreadystatechange = function () {
                var res;

                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        try {
                            res = JSON.parse(xhr.responseText);
                        }
                        catch (e) {
                            self.trigger('error', {
                                status: Base.status.ERROR_UPLOAD,
                                file: file,
                                msg: '解析json失败'
                            });
                        }

                        if (res) {
                            if (res.status === 0) {
                                res.file = file;
                                self.trigger('success', res);
                            }
                            else {
                                self.trigger('error', {
                                    status: Base.status.ERROR_UPLOAD,
                                    file: file,
                                    msg: 'json.status错误'
                                });
                            }
                            res = null;
                        }
                    }
                    else {
                        self.trigger('error', {
                            status: Base.status.ERROR_UPLOAD,
                            file: file,
                            msg: '后端服务响应失败'
                        });
                    }

                    xhr = null;
                }
            };

            // 追加数据
            rdData = new window.FormData();
            rdData.append(self.get('filename'), file);

            // 追加配置数据
            Object.keys(data).forEach(function (key) {
                rdData.append(key, data[key]);
            });

            // 发送吧
            xhr.open('POST', self.get('action'), true);
            xhr.send(rdData);

            // 销毁时都取消了
            self.on('destroy', function () {
                xhr.abort();
            });
        },

        /**
         * 添加文件到队列
         *
         * @private
         * @param {Object} file 文件对象
         */
        _addfile: function (file) {
            var self = this;

            // 打上全局标识
            file.id = ++uid;

            // 触发下队列事件
            self.trigger('queued', file);

            self._queued.push(file);
        },

        /**
         * 检查扩展名
         *
         * @private
         * @param  {Object} file 文件对象
         *
         * @return {boolean}      是否验证通过
         */
        _checkExtname: function (file) {
            var extname = this.get('extname');

            // 如果为任意验证
            if (extname === '*') {
                return true;
            }

            return new RegExp('image\\/(' + extname.replace(/,/g, '|') + ')').test(file.type);
        },

        /**
         * 检查文件大小
         *
         * @private
         * @param  {Object} file 文件对象
         *
         * @return {boolean}      是否验证通过
         */
        _checkSize: function (file) {
            return this.get('size') >= file.size;
        }
    });

    /**
     * 状态码常量
     *
     * @type {Object}
     */
    Base.status = {
        // 扩展名错误
        ERROR_EXTNAME: 1,
        // 文件大小超出
        ERROR_SIZE: 2,
        // 文件列表为空
        ERROR_EMPTY: 3,
        // 上传失败
        ERROR_UPLOAD: 4
    };

    /**
     * 默认参数
     *
     * @type {Object}
     */
    Base.defaults = {

        /**
         * 文件提交路径 默认根路径
         *
         * @type string
         */
        action: '/',

        /**
         * file元素
         *
         * @type {HTMLelement}
         */
        elem: null,

        /**
         * 向后端发送的数据
         *
         * @type {Object}
         */
        data: {},

        /**
         * 是否多选
         *
         * @type {Boolean}
         */
        multiple: false,

        /**
         * 允许的文件扩展名
         *
         * @type {String}
         */
        extname: 'jpg,png,jpeg,gif',

        /**
         * 单个文件大小，单位是b
         *
         * @type {number}
         */
        size: 1024 * 1024 * 5,

        /**
         * 上传并发数
         *
         * @type {number}
         */
        limit: 2,

        /**
         * 上传表单名
         *
         * @type {String}
         */
        filename: 'image'
    };

    return Base;
});
