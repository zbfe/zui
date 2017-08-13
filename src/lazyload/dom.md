# lazyload/dom

> xiaowu

在 [lazyload/base](src/lazyload/base.md) 基础上扩展延迟加载`dom`元素，同base一样，目标元素必须有宽高，在滚动时判断目标元素是否可见，可见时加载该元素内的`options.loadElem`元素，比如加载一个`textarea`文本域

### use

```js
require([
    'lazyload/dom'
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
 * @param {string|HTMLElement} [options.loadElem=textarea] 要加载的元素
 */
```

### example

#### 滚动加载

```runhtml
<style type="text/css">
    .demo {
        height: 300px; 
        background-color: #ccc; 
        margin-bottom: 10px; 
    }

    /*默认让文本域隐藏*/
    .demo textarea {
        display: none; 
    }
</style>
<div class="demo">
    <textarea>111</textarea>
</div>
<div class="demo">
    <textarea>
        222
        <script>
            console.log('其实js也能加载');
        </script>
    </textarea>
</div>
<div class="demo">
    <script type="text/template">
        我是模板字符串 333,看到我你就得弹个alert
        <script>
            alert(333);
        </script>
    </script>
</div>

<script>
    require([
        'lazyload/dom'
    ], function (Lazyload) {
        var app = new Lazyload({
            elem: '.demo',
            loadElem: 'textarea, script[type="text/template"]'
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