# tools/scrollTo

> xiaowu

### use

```js
require([
    'tools/scrollTo'
], function (scrollTo) {
    scrollTo(x, y, duration, easing, callback);
});
```

### example

```runhtml
<style>
    button {
        background-color: #ccc;
    }
</style>
<button id="scrollTo-y-1">滚动到top -100</button>
<button id="scrollTo-y-2">滚动到top 100</button>
<button id="scrollTo-y-3">滚动到top 10000</button>
<br>
<button id="scrollTo-x-1">滚动到left -500</button>
<button id="scrollTo-x-2">滚动到left 100</button>
<button id="scrollTo-x-3">滚动到left 10000</button>

<script>
    require([
        'tools/scrollTo',
        'zepto'
    ], function (scrollTo, $) {
        $('html').width(1000);
        $('#scrollTo-y-1').on('click', function () {
            scrollTo(null, -100);
        });

        $('#scrollTo-y-2').on('click', function () {
            scrollTo(null, 100);
        });

        $('#scrollTo-y-3').on('click', function () {
            scrollTo(null, 10000);
        });

        $('#scrollTo-x-1').on('click', function () {
            scrollTo(-500);
        });
        $('#scrollTo-x-2').on('click', function () {
            scrollTo(100);
        });
        $('#scrollTo-x-3').on('click', function () {
            scrollTo(10000);
        });
    });
</script>
```