# Class

提供`Class`的继承，感谢 [@rauschma/class-js](https://github.com/rauschma/class-js?ref=zbfe)

### use

```js
require([
    'Class'
], function (Class) {
    // 基于Class扩展一个模块
    var Dialog = Class.extend({
        // 继承的模块必须包含`constructor`构造函数
        constructor: function () {
            Dialog.super.constructor.call(this);
        }
    });

    var app = new Dialog();
});
```