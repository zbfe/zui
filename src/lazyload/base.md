# lazyload/base

> xiaowu

延迟加载基类，在窗口滚动时判断目标元素是否可见，可见则触发事件。目标元素必须具备有效的宽和高，因为如果没有宽高页面默认加载时，会一下全部加载，也就是所谓的"塌方"

### use

```js
require([
    'lazyload/base'
], function (Lazyload) {
    var options = {};
    var app = new Lazyload(options);
});
```

### events

* loaditem - 加载单个元素，每个元素只触发一次
* loadall - 全部加载结束
* destroy - 销毁后


### api - options

```js
/**
 * @param {selector|HTMLElement} options.elem 目标元素
 * @param {string|null} [options.event=scroll] 事件，如果不需要滚动加载可为空
 * @param {number} options.threshold 滚动加载偏移值
 */
```

### api - #load

```js
/**
 * 显式加载
 *
 * @description 主要用于非滚动加载时主动的去加载
 * @param  {string|HTMLelement} $elem 要加载的元素，如果为空则加载所有
 *
 * @return {Object}       this
 */
```

### example

#### 滚动加载

```html
<div class="demo" style="height:100px">1</div>
<div class="demo" style="height:100px">2</div>
<div class="demo" style="height:100px">3</div>

<script>
    require([
        'lazyload/base'
    ], function (Lazyload) {
        var app = new Lazyload({
            elem: '.demo'
        });

        app.on('loaditem', function (data) {
            // 该元素内部的key
            console.log(data.key);

            // 被加载元素的 HTMLElement dom对象
            console.log(data.elem);
        });

        app.on('loadall', function () {
            console.log('loadall');
        });
    });
</script>
```

#### 手动加载

常用于非默认显示元素的加载，比如`tab`切换

```html
<div class="demo demo-1" style="height:100px">1</div>
<div class="demo demo-2" style="height:100px">2</div>
<div class="demo demo-3" style="height:100px">3</div>

<button class="load-1">加载1</button>
<button class="load-2">加载2</button>
<button class="load-3">加载3</button>

<script>
    require([
        'zepto',
        'lazyload/base'
    ], function ($, Lazyload) {
        var app = new Lazyload({
            elem: '.demo',
            event: null
        });

        app.on('loaditem', function (data) {
            // 该元素内部的key
            console.log(data.key);

            // 被加载元素的 HTMLElement dom对象
            console.log(data.elem);
        });

        app.on('loadall', function () {
            console.log('loadall');
        });

        $('.load-1').on('click', function () {
            app.load($('.demo').eq(0));
        });
        $('.load-2').on('click', function () {
            app.load('.demo-2');
        });
        $('.load-3').on('click', function () {
            app.load('.demo-3');
        });
    });
</script>
```