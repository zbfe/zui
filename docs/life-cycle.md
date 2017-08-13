# 生命周期

* 显示 - show: 可选
* 关闭 - hide: 可选
* 销毁 - destroy: 必选

凡是基于`zui`的模块必须在销毁时触发`destroy`事件

## 事件绑定

针对继承`zui`的模块可使用`on`绑定，如：

```js
var app = new Dialog();

// 绑定显示事件
app.on('show', function () {
});

// 绑定一次性select事件
app.one('select', function () {
});

// 卸载全部show事件
app.off('show');
```

## 例子 - 弹出层

`show->close->destroy`，如果是取消则是`show->cancel->close->destroy`
