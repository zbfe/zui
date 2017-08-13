# tools/cookie

> xiaowu <fe.xiaowu@gmail.com>

提供操作`cookie`的方法

### use

```js
require([
    'tools/cookie'
], function (cookie) {
    cookie.set(name, value);
    cookie.get(name);
    cookie.remove(name);
});
```

### api

#### .set

```js
/**
 * 设置cookie
 *
 * @param {string} name    名称
 * @param {string} value   值
 * @param {Object} options 配置参数
 * @param {string} [options.path=/] 路径
 * @param {string} [options.domain=hostname] 域
 * @param {boolean} [options.secure=https环境] 是否加密
 * @param {number} [options.expires=1小时] 过期时间，单位毫秒
 *
 * @return {Object} cookie
 */
function (name, value, options){}
```

#### .get

```js
/**
 * 获取cookie
 *
 * @param  {string} name 名称
 *
 * @return {string}      值
 */
```

#### .remove

```js
/**
 * 删除cookie
 *
 * @param  {string} name 名称
 * @param {Object} options 配置
 *
 * @return {Object}      cookie
 */
funciton (name, options) {}
```

### example

#### 设置->读取->删除->读取

```runjs
require([
    'tools/cookie'
], function (cookie) {
    cookie.set('a', 1);
    alert(cookie.get('a'));
    cookie.remove('a');
    alert(cookie.get('a') || '空');
});
```


#### 设置过期时间

```runjs
require([
    'tools/cookie'
], function (cookie) {
    cookie.set('a', 1, {
        expires: 100
    });
    setTimeout(function () {
        alert(cookie.get('a') || '空');
    }, 200);
});
```