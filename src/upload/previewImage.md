# upload/previewImage

> fe.xiaowu

html5上传预览，目前只是文件`Blob`引用，后续考虑使用`canvas`来裁切并生成缩略图

### use

```js
require([
    'upload/previewImage'
], function (PreviewImage) {
    var url = new Base().createObjectURL(fileObject);
});
```