# 生命周期

* 显示 - show: 可选
* 关闭 - hide: 可选
* 销毁 - destroy: 必选

凡是基于`zui`的模块必须在销毁时触发`destroy`事件

## 例子 - 弹出层

`show->close->destroy`，如果是取消则是`show->cancel->close->destroy`
