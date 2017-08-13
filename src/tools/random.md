# tools/random

> xiaowu <fe.xiaowu@gmail.com>

生成随机数方法

### use

```js
require([
    'tools/random'
], function (random) {
    random();

    random.getByLength();

    random.getGuid();
});
```

### api

#### random

```js
/**
 * 获取随机数
 *
 * @param  {number} start 开始索引
 * @param  {number} end   结束索引
 *
 * @return {number}       结束
 */
```

#### getByLength

```js
/**
 * 获取指定长度的随机数
 *
 * @param  {number} [len=6] 位数
 *
 * @return {number}     随机数
 */
```

#### getGuid

```js
/**
 * 获取唯一id
 *
 * @param  {string} type 标识
 *
 * @return {number}      id标识
 */
```

### example

#### 生成随机数

```runjs
require([
    'tools/random'
], function (random) {
    alert('随机数: ' + random());
});
```

#### 生成区间随机数

```runjs
require([
    'tools/random'
], function (random) {
    alert('随机数(1-10): ' + random(1, 10));
});
```

#### 生成指定长度随机数

```runjs
require([
    'tools/random'
], function (random) {
    alert('随机数长度为4' + random.getByLength(4));
});
```

#### 生成唯一id

```runjs
require([
    'tools/random'
], function (random) {
    alert('全局标识' + random.getGuid());
    alert('全局标识' + random.getGuid());

    alert('全局标识(自定义key)' + random.getGuid('key'));
    alert('全局标识(自定义key)' + random.getGuid('key'));
});
```