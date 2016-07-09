# upload/previewImage

> fe.xiaowu

html5上传预览，目前只是文件`Blob`引用，后续考虑使用`canvas`来裁切并生成缩略图

### use

```js
require([
    'upload/previewImage'
], function (previewImage) {
    var url = previewImage.createObjectURL(fileObject);
});
```

### example

结合`upload/base`上传模块的例子：[upload/base#上传前预览](src/upload/base.md#上传前预览)