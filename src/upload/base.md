# upload/base

> fe.xiaowu

html5(xhr2)并发上传

### use

```js
require([
    'upload/base'
], function (Base) {
    var options = {};
    new Base(options);
});
```

### events

#### success

上传成功事件，回调参数如：

```js
/**
 * @param {Object} res 后端返回数据对象
 * @param {Object} file 当前上传文件对象
 */
function (res, file) {};
```

#### error

错误事件（不只是上传错误），回调参数如：

```js
/**
 * @param {Object} event 当前错误信息对象
 * @param {number} event.status 错误状态，同错误码常量对应
 * @param {string} event.msg 错误信息
 * @param {Object} file 当前上传文件对象
 */
function (event, file) {};
```

#### progress

上传进度事件，回调参数如：

```js
/**
 * @param {Object} event ProgressEvent
 * @param {Object} file 当前上传文件对象
 */
function (event, file) {};
```

#### complete

上传完成事件，不管成功还是失败都会触发，回调参数如：

```js
/**
 * @param {Object} data 上传数据
 * @param {Array} data.success 上传成功的文件对象数组
 * @param {Array} data.error 上传失败的文件对象数组
 */
function (data) {};
```

#### queued

添加文件到队列事件，回调参数如：

```js
/**
 * @param {Object} file 当前上传文件对象
 */
function (file) {};
```


#### destroy

销毁后事件

### api - options

```js
/**
 * @param {string} options.action 后端上传接口路径
 * @param {HTMLelement|string} options.elem 上传file文本框对象
 * @param {Object} options.data 向后端发送的数据（post形式）
 * @param {boolean} [options.multiple=false] 是否多文件上传，主要控制文本框的`multiple`属性
 * @param {string} [options.extname=jpg,png,jpeg,gif] 上传文件扩展名白名单，*表示全部
 * @param {number} [options.size=1024 * 1024 * 5] 上传文件单个文件大小，单位b
 * @param {number} [options.limit=2] 上传并发数
 * @param {number} [options.filename=image] 上传文件的域名
 */
```

### api - #start

```js
/**
 * 开始上传
 *
 * @return {Object} this
 */
```

### api - #destroy

```js
/**
 * 销毁
 *
 * @return {Object} this
 */
```

### example

#### 一个多文件上传

```runhtml

<input id="test-upload-base-file" type="file" />

<div id="test-upload-base-log"></div>

<button id="test-upload-base-start">开始上传</button>

<script>
require([
    'upload/base'
], function (Upload) {
    var app = new Upload({
        elem: '#test-upload-base-file',
        multiple: true
    });
    var log = function (str) {
        $('#test-upload-base-log').append('<p>' + str + '</p>');
    };


    app.on('queued', function (file) {
        log('添加到队列，文件名：' + file.name + '，大小：' + file.size);
    });

    app.on('success', function (res, file) {
        log('上传成功，后端返回：' + JSON.stringify(res) + '，文件名：' + file.name);
    });

    app.on('complete', function (data) {
        log('上传完成，成功' + data.success.length + '个，失败' + data.error.length + '个');
    });

    app.on('progress', function (event, file) {
        log('进度：' + JSON.stringify(event) + '，文件名：' + file.name);
    });

    app.on('error', function (event, file) {
        log('上传失败，错误信息：' + JSON.stringify(event) + '，文件名：' + file.name);
    });

    $('#test-upload-base-start').on('click', function () {
        app.start();
    });
});
</script>
```

#### 选择文件后自动上传

```runhtml

<input id="test-upload-base-file-2" type="file" />

<div id="test-upload-base-log-2"></div>

<script>
require([
    'upload/base'
], function (Upload) {
    var app = new Upload({
        elem: '#test-upload-base-file-2',
        multiple: true
    });
    var log = function (str) {
        $('#test-upload-base-log-2').append('<p>' + str + '</p>');
    };


    app.on('queued', function (file) {
        log('添加到队列，文件名：' + file.name + '，大小：' + file.size);
        this.start();
    });

    app.on('complete', function (data) {
        log('上传完成，成功' + data.success.length + '个，失败' + data.error.length + '个');
    });
    app.on('error', function (event, file) {
        log('上传失败，错误信息：' + JSON.stringify(event) + '，文件名：' + file.name);
    });
});
</script>
```

#### 上传前预览

需要用到 [upload/previewImage](src/upload/previewImage.md) 模块

```runhtml

<input id="test-upload-base-file-3" type="file" />

<div id="test-upload-base-log-3"></div>

<script>
require([
    'upload/base',
    'upload/previewImage'
], function (Upload, Preview) {
    var app = new Upload({
        elem: '#test-upload-base-file-3',
        multiple: true
    });
    var log = function (str) {
        $('#test-upload-base-log-3').append('<p>' + str + '</p>');
    };

    app.on('queued', function (file) {
        log('添加到队列，文件名：' + file.name + '，大小：' + file.size);
        log('<img src="' + Preview.createObjectURL(file) + '" height=200>');
    });
});
</script>
```