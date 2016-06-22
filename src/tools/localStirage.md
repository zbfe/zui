# tools/cookie

> schoeu <schoeu1110@gmail.com>

提供操作`localStorage`的方法

### use

```js
require([
    'tools/localStorage'
], function (ls) {
    ls.set(key, value);
    ls.get(key);
    ls.remove(key);
    ls.clear();
});
```

### api

#### set

```js
/**
 * 设置localStorage
 *
 * @param {string} key    名称
 * @return {Object} localStorage
 */
```

#### get

```js
/**
 * 获取cookie
 *
 * @param  {string} name 名称
 *
 * @return {string}      值
 */
```

#### remove

```js
/**
 * 删除cookie
 *
 * @param  {string} key 名称
 *
 * @return {Object}      localStorage
 */
```

### example


```runjs
require([
    'tools/localStorage'
], function (ls) {
});
```
