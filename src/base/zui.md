# zui

> fe.xiaowu

`zui`基类，提供事件驱动、标识判断、合并配置、获取配置等基础方法，`zui`继承于 [Class](src/base/Class.md)～

基于`zui`的模块需要在销毁实例时触发`destroy`事件，`zui`将销毁实例上的自定义属性～

### use

```js
require([
    'zui'
], function (Zui) {
    // 实例化zui
    var app = new Zui();

    // 基于zui扩展一个模块
    var Dialog = Zui.extend(...);

    var dialogApp = new Dialog();
});
```

## api

### 合并参数

zui提供多参数合并机制，如：

```js
new Zui({a: 1}, {b: 2}, {a: 3}); // => {a: 3, b: 2}
```

比如在子类时使用：

```js
// 基于zui扩展
var Dialog = Zui.extend({
    constructor: function (options) {
        // 合并配置
        // 用户options > 默认
        Dialog.super.constructor.call(this, Dialog.defaults, options);
    }
});

// 默认参数
Dialog.defaults = {
    a: 1
};

// 使用Dialog
var app = new Dialog(); // => {a: 1}

var app = new Dialog({a: 2}); // => {a: 2}
```

### #on

```js
/**
 * 绑定事件
 *
 * @param  {string}   event    事件名，多个事件则以空格分隔
 * @param  {Function} callback 触发回调
 * @return {Object}            this
 *
 * @example
 * // 绑定单个事件
 * on('close', function () {});
 *
 * @example
 * // 绑定多个事件（按顺序）
 * on('close show', function () {});
 */
```

### #one

一次性事件，参数同 [#on](#on) 一致

### #off

```js
/**
 * 卸载事件
 *
 * @param  {string}   event    事件名，多个事件则以空格分隔
 * @param  {Function=} callback 触发回调，如果为空则卸载全部的event事件
 * @return {Object}            this
 *
 * @example
 * // 关闭所有close事件
 * off('close');
 *
 * @example
 * // 关闭多个且回调相同的事件
 * off('close show', function () {});
 *
 * @example
 * // 关闭单个且回调相同的事件
 * off('close', function () {});
 */
```

### #trigger

```js
/**
 * 触发事件
 *
 * @param  {string} event 事件名，多个事件则以空格分隔
 * @param  {Array=} data  触发数据
 * @return {Object}       this
 *
 * @example
 * // 触发一个事件
 * trigger('click');
 *
 * @example
 * // 触发多个事件（按顺序触发）
 * trigger('close show');
 *
 * @example
 * // 触发事件时添加数据
 * trigger('click', 'ok');
 * trigger('click', {ok: 1});
 * trigger('click', [1, 2, 3]);
 */
```

### #get

```js
/**
 * 获取配置
 *
 * @param  {string=} key 配置key，如果为空则获取整个配置
 *
 * @return {*}     值
 *
 * @example
 * // 获取数据
 * get('key');
 *
 * // 获取多级数据
 * get('data.post.key');
 */
```

### #set

```js
/**
 * 设置配置
 *
 * @param {string} key   配置key
 * @param {*} value 配置值
 * @return {Object} this
 *
 * @example
 * // 设置数据
 * set('key', 'value');
 *
 * // 设置多级数据
 * set('data.post.key', 'value');
 */
```

### #is

```js
/**
 * 标识处理
 *
 * @description 主要用来判断标识，该标识在实例destroy也会存在
 * @param  {string}  key 键名
 * @param  {boolean|number}  value 结果
 *
 * @return {boolean|Object}     结果或者this
 */
```