Hello swipe
=========
**swipe** is a accurate touch slider for mordern browser.

[Try a demo.](http://7li.github.io/components/swipe/) or 
[Run tests.](http://7li.github.io/components/swipe/test/)

## Usage
Dom structure:

``` html
<div id='mySwipe'>
  <div class='swipe-wrap'>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
```

Js to init a swipe:

``` js
var swipe = new Swipe(document.getElementById('mySwipe'));
```

Some suggested init css example:

``` css
#mySwipe {
  width: 100%;
  margin: 0 auto;
}
.swipe-wrap {
  width: 100%;
  height: 185px;
  overflow: hidden;
}
.swipe-wrap div {
  background: yellow;
  text-align: center;
  float: left;
  width: 100%;
  height: 215px;
}
```

## Config Options

Swipe can take an optional second parameter– an object of key/value settings:

- **speed** Integer *(default:300)* - sliding speed

-	**threshould** Integer *(default:160)* - touch effect threshould.

- **auto** Integer *(default:2000, set 0 to turn off)* - begin with auto slideshow (time in milliseconds between slides)
- **nav** Boolean *(default:true)* - if or not show nav

### Example

``` js

var swipe = new Swipe(document.getElementById('mySwipe'), {
  speed: 400,
  auto: 3000,
  threshould: 100,
  nav: false
});

```

## Swipe API

Swipe exposes a few functions that can be useful for script control of your slider.

`prev(callback, queue)` slide to prev (callback: callback after transition finishes, queque: if or not to put in transition queque)

`next(callback, queue)` slide to next (callback: callback after transition finishes, queque: if or not to put in transition queque)

`getIndex(queue)` returns current slide index (queque: true to get the last index in queue)

`getLength()` returns the total amount of slides

`slideTo(index, callback, direction, queue)` slide to index  (index: target index, callback: callback after transition finishes, direction: 'left' or 'right', queque: if or not to put in transition queque,)

## Browser Support
Swipe is now compatible with all morden webkit browsers

## Who's using Swipe
Shoot me a [note](mailto:702368372atqqcom) if you want your logo here

## License
Copyright (c) 2015 lyz Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).
