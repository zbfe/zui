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

### api - destroy

```js
/**
 * 销毁
 *
 * @return {Object} this
 */
```