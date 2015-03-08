define(function() {
  function Swipe(container) {
    this.container = container;
    this.wrap = this.container.children[0];
    this.slides = this.wrap.children;
    this.length = this.slides.length;
    this.width = this.container.offsetWidth;

    this.speed = 300;
    this.index = 0;
    this.classes = {
      nav: 'swipe-nav',
      navItem: 'swipe-nav-item',
      navOn: 'swipe-nav-item-on'
    };
    this.queue = [];

    this.setup(); 
    this.bind();
  }

  Swipe.prototype.setup = function() {
    // Set container
    this.container.style.overflow = 'hidden';
    this.container.style.position = 'relative';

    // Set wrap
    this.wrap.style.position = 'relative';
    this.wrap.style.width = this.width * this.length + 'px';

    // Set slides   
    for(var i = 0; i < this.length; i++) {
      var slide = this.slides[i];
      slide.style.position = 'relative';
      slide.style.float = 'left';
      this.slides[i].style.width = this.width + 'px';
    }
  }

  Swipe.prototype.slideTo = function(index, callback, queue) {
    if (index > this.length - 1) index = this.length - 1;
    if (index < 0) index = 0;
    if (typeof callback != 'function') { queue = callback; callback = null };

    // Not sliding and not enqueue, so do nothing
    if (this.sliding && !queue) return;

    // Sliding, so enqueque
    if (this.sliding && queue) {
      var slide = {
        index: index,
        callback: callback
      }
      this.queue.push(slide);
      return;
    }

    // Not sliding, so enforce slide
    if (index == this.index) {
      // Current index, no need to transition, immediately trigger callback
      callback && callback();
      this.dequeue();
      return;
    }

    this.sliding = true;
    this.index = index;
    this.callback = callback;

    var offset = this.width * (0 - index);
    var style = this.wrap.style;
    style.webkitTransitionDuration = this.speed + 'ms';
    style.webkitTransform = 'translate3D(' + offset + 'px, 0px, 0px)';
  }

  Swipe.prototype.stop = function() {
    return this;
  }

  Swipe.prototype.bind = function() {
    var that = this;
    this.events = {
      handleEvent: function(e) {
        switch (e.type) {
           case 'touchstart': ; break;
           case 'touchmove': ; break;
           case 'touchend': ; break;
           case 'transitionend': 
             that.sliding = false;
             that.nav && that.setNav(); // Set nav

             that.callback && that.callback();
             // Enforce the next slide in queue
             that.dequeue();
             break;
           case 'resize': ; break;
         }
      }
    }
    this.container.addEventListener('transitionend', this.events);
  }

  Swipe.prototype.dequeue = function() {
     var nextSlide = this.queue.shift();
     nextSlide && this.slideTo(nextSlide.index, nextSlide.callback);
  }

  Swipe.prototype.next = function(callback, queue) {
    if (typeof callback != 'function') queue = callback;

    var index = this.index;
    if (queue) {
      var lastSlide = this.queue[this.queue.length - 1];
      if (lastSlide) index = lastSlide.index;
    }

    if (index >= this.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }

    this.slideTo(index, callback, queue);
  }

  Swipe.prototype.prev = function(callback, queue) {
    if (typeof callback != 'function') queue = callback;

    var index = this.index;
    if (queue) {
      var lastSlide = this.queue[this.queue.length - 1];
      if (lastSlide) index = lastSlide.index;
    }

    if (index <= 0) {
      index = this.length - 1;
    } else {
      index = index - 1;
    }
    this.slideTo(index, callback, queue);
  }

  Swipe.prototype.set = function(key, value) {
    switch (key) {
      case 'nav':
        if (!this.nav) {
          this.createNav();
        } 
        if (value == 'on') {
          this.nav.style.display = 'block';
          this.setNav();
        } else {
          this.nav.style.display = 'none';
        }
        
        break;
    }
  }

  Swipe.prototype.createNav = function() {
    this.nav = document.createElement('div');
    this.nav.className = this.classes.nav;
    for (var i = 0; i < this.length; i++) {
      var navItem = document.createElement('span');
      navItem.className = this.classes.navItem;
      this.nav.appendChild(navItem);
    }
    this.container.appendChild(this.nav);
  }

  Swipe.prototype.setNav = function() {
    for (var i = 0; i < this.length; i++) {
      this.nav.children[i].classList.remove(this.classes.navOn);
    }
    this.nav.children[this.index].classList.add(this.classes.navOn);
  }

  Swipe.prototype.kill = function() {
    this.container.removeChild(this.nav);
    this.container.removeEventListener('transitionend', this.events);
  }
  return Swipe;
})
