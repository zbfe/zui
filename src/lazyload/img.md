# lazyload/img

> xiaowu

在 [lazyload/base](src/lazyload/base.md) 基础上扩展延迟加载图片，同base一样，目标元素（图片）必须有宽高，一般是`src`属性设置一个空图片，真实图片源在`data-src`里存放，当滚动判断到可见时则加载这个图片（`data-src`->`src`）

### use

```js
require([
    'lazyload/img'
], function (Lazyload) {
    var options = {};
    var app = new Lazyload(options);
});
```

### events

同 [lazyload/base#events](src/lazyload/base.md#events) 一致


### api - options

在base基础上再次扩展

```js
/**
 * @param {string} options.attr 图片源所在属性
 */
```

### example

#### 滚动加载

```html
<div class="demo"><img src="http://static.meishichina.com/v6/img/blank.gif" alt="延迟加载" data-src="http://dummyimage.com/300x300" width="300" height="300"></div>
<div class="demo"><img src="http://static.meishichina.com/v6/img/blank.gif" alt="延迟加载" data-src="http://dummyimage.com/300x300" width="300" height="300"></div>
<div class="demo"><img src="http://static.meishichina.com/v6/img/blank.gif" alt="延迟加载" data-src="http://dummyimage.com/300x300" width="300" height="300"></div>



<script>
    require([
        'lazyload/img'
    ], function (Lazyload) {
        var app = new Lazyload({
            elem: '.demo img'
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