define(['../src/swipe.js'], function(Swipe) {
  describe('Swipe', function(){
    var container, swipe, wrap, slides, containerWidth, containerHeight, wrapWidth, navItems;
    before(function() {
      container = document.getElementById('mySwipe');
      swipe = new Swipe(container);
      wrap = swipe.wrap;
      slides = swipe.slides;
      containerWidth = container.offsetWidth;
      wrapWidth = wrap.offsetWidth; 
      swipe.set('nav', 'on');
      navItems = container.querySelector('.swipe-nav').children;
    })

    describe('setup()', function(){
      it('should set the width and height of the slides as the same with the container', function(){
        for (var i = 0, len = slides.length; i < len; i++) {
          slides[i].offsetWidth.should.equal(containerWidth);
        }
      })

      it('should set the width of wrap as the sum of all slides', function() {
        var sum = 0;
        for (var i = 0, len = slides.length; i < len; i++) {
          sum += slides[i].offsetWidth;
        }
        wrapWidth.should.equal(sum);
      })

    })

    describe('queue', function(){
      it('slides in queue should trigger in order', function() {
        var order = 0;
        swipe.slideTo(3, function() {
          order.should.equal(0);
          order++;
        }, true);
        swipe.slideTo(0, function() {
          order.should.equal(1);
          order++;
        }, true);
        swipe.slideTo(2, function() {
          order.should.equal(2);
          order++;
        }, true);
        swipe.slideTo(1, function() {
          order.should.equal(3);
          order++;
        }, true);
      })

      it('slide to current index, should also trigger callback', function() {
        var order = 0;
        swipe.slideTo(0, function() {
          // console.log(order);
          order.should.equal(0);
          order++;
        }, true);
        swipe.slideTo(2, function() {
          // console.log(order);
          order.should.equal(1);
          order++;
        }, true);
        swipe.slideTo(2, function() {
          // console.log(order);
          order.should.equal(2);
          order++;
        }, true);
        swipe.slideTo(2, function() {
          // console.log(order);
          order.should.equal(3);
          order++;
        }, true);
        swipe.slideTo(2, function() {
          // console.log(order);
          order.should.equal(4);
          order++;
        }, true);
        swipe.slideTo(3, function() {
          // console.log(order);
          order.should.equal(5);
          order++;
        }, true);
        swipe.slideTo(3, function() {
          // console.log(order);
          order.should.equal(6);
          order++;
        }, true);
        swipe.slideTo(3, function() {
          // console.log(order);
          order.should.equal(7);
          order++;
        }, true);

      })
    })


    describe('slideTo(index)', function(){
      it('slideTo(current index), it should do nothing', function() {
        var oldTransform = swipe.wrap.style.webkitTransform;
        var oldIdex = swipe.index;
        swipe.slideTo(swipe.index, function() {
          var newTransform = swipe.wrap.style.webkitTransform;
          oldTransform && newTransform.should.equal(oldTransform);
          swipe.index.should.equal(oldIdex);
        }, true);
      })

      it('slideTo(index bigger than max), it should slideTo(max)', function() {
        swipe.slideTo(9999, function() {
          var offset = swipe.width * (0 - (swipe.length - 1));
          var transform = swipe.wrap.style.webkitTransform;
          transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)');
          swipe.index.should.equal(3);
        }, true);
      })

      it('slideTo(index bigger than min), it should slideTo(min)', function() {
        swipe.slideTo(-1111, function() {
          var transform = swipe.wrap.style.webkitTransform;
          transform.should.equal('translate3d(0px, 0px, 0px)');
          swipe.index.should.equal(0);
        }, true);
      })

      it('slideTo(index between min and max, it should slideTo(index))', function() {
        var random = Math.floor(Math.random() * swipe.length);
        swipe.slideTo(random, function() {
          var offset = swipe.width * (0 - random);
          var transform = swipe.wrap.style.webkitTransform;
          transform && transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)');
          swipe.index.should.equal(random);
        }, true);
      })
    })

    describe('next()', function(){
      it('shoud set the index correctly', function() {
        swipe.slideTo(0, true);
        swipe.next(function() {
          swipe.index.should.equal(1);
        }, true);
        swipe.next(function() {
          swipe.index.should.equal(2);
        }, true);
        swipe.next(function() {
          swipe.index.should.equal(3);
        }, true);
        swipe.next(function() {
          swipe.index.should.equal(0);
        }, true);
      })
    })

    describe('prev()', function(){
      it('shoud set the index correctly', function() {
        swipe.slideTo(0, true);
        swipe.prev(function() {
          swipe.index.should.equal(3);
        }, true);
        swipe.prev(function() {
          swipe.index.should.equal(2);
        }, true);
        swipe.prev(function() {
          swipe.index.should.equal(1);
        }, true);
        swipe.prev(function() {
          swipe.index.should.equal(0);
        }, true);
      })
    })

    describe('nav', function(){
      it('size of nav items should be length of slides', function() {
        navItems.length.should.equal(swipe.length);
      })

      it('can switch between show and hide', function() {
        swipe.set('nav', 'off');
        swipe.nav.style.display.should.equal('none');
        swipe.set('nav', 'on');
        swipe.nav.style.display.should.equal('block');
      })

      it('should indicate the current index', function() {
        swipe.nav.children[swipe.index].classList
                                       .contains('swipe-nav-item-on')
                                       .should.equal(true);

        swipe.slideTo(5, function() {
          swipe.nav.children[3].classList
                                       .contains('swipe-nav-item-on')
                                       .should.equal(true);
        }, true);
        
      })
    })

    describe('resize', function() { 
      it('something', function() {
      })
    })

     describe('touch', function() {
      it('something', function() {
      })
    })
  })

})
