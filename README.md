Hello swipe
=========
**swipe** is a accurate touch slider for mordern browser.

[Try a demo.](http://7li.github.io/components/swipe/test/)

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

- **auto** Integer - begin with auto slideshow (time in milliseconds between slides)

### Example

``` js

var swipe = new Swipe(document.getElementById('mySwipe'), {
  speed: 400,
  auto: 3000,
  threshould: 100
});

```

## Swipe API

Swipe exposes a few functions that can be useful for script control of your slider.

`prev()` slide to prev

`next()` slide to next

`getPos()` returns current slide index position

`getNumSlides()` returns the total amount of slides

`slide(index, duration)` slide to set index position (duration: speed of transition in milliseconds)

## Browser Support
Swipe is now compatible with all browsers, including IE7+. Swipe works best on devices that support CSS transforms and touch, but can be used without these as well. A few helper methods determine touch and CSS transition support and choose the proper animation methods accordingly.

## Who's using Swipe
<img src='http://swipejs.com/assets/swipe-cnn.png' width='170'>
<img src='http://swipejs.com/assets/swipe-airbnb.png' width='170'>
<img src='http://swipejs.com/assets/swipe-nhl.png' width='170'>
<img src='http://swipejs.com/assets/swipe-htc.png' width='170'>
<img src='http://swipejs.com/assets/swipe-thinkgeek.png' width='170'>
<img src='http://swipejs.com/assets/swipe-snapguide.png' width='170'>

Shoot me a [note](mailto:brad@birdsall.co) if you want your logo here

## License
Copyright (c) 2015 Brad Birdsall Licensed under the [The MIT License (MIT)](http://opensource.org/licenses/MIT).
