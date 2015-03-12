define(['../src/swipe.js'], function(Swipe) {
  describe('Swipe', function(){
    var container, swipe, wrap, slides;
    function getTransitionOffset(ele){
        var reg = /translate3d\(([-\d]+)px, 0px, 0px\)/;
        var str = ele.style.webkitTransform;
        var match = str.match(reg);
        var ret = 0;
        if (match) ret = +match[1];
        return ret;
    }

    before(function() {
      container = document.getElementById('mySwipe');
      swipe = new Swipe(container, {auto:0});
      wrap = swipe.wrap;
      slides = swipe.slides;
    })

    describe('setup()', function(){
      it('should set the width and height of the slides as the same with the container', function(){
        var containerWidth = container.offsetWidth;
        for (var i = 0, len = slides.length; i < len; i++) {
          slides[i].offsetWidth.should.equal(containerWidth);
        }
      })

      it('should set the width of wrap as the sum of all slides', function() {
        var sum = 0;
        var wrapWidth = wrap.offsetWidth; 
        for (var i = 0, len = slides.length; i < len; i++) {
          sum += slides[i].offsetWidth;
        }
        (wrapWidth - sum > 0 ).should.equal(true);
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


    describe('slideTo()', function(){
      it('slideTo(current index), it should do nothing', function() {
        var random = Math.floor(Math.random() * swipe.length);
        var oldOffset, oldIdex;
        swipe.slideTo(random, function(){
          oldOffset = getTransitionOffset(wrap);
          oldIdex = swipe.getIndex();
        }, true);
        
        swipe.slideTo(random, function() {
          var newOffset = getTransitionOffset(wrap);
          newOffset.should.equal(oldOffset);
          swipe.index.should.equal(oldIdex);
        }, true);
      })

      it('slideTo(index bigger than max), it should slideTo(max)', function() {
        swipe.slideTo(9999, function() {
          var slideInitOffset = 3 * swipe.width;
          var slideTransitionOffset = getTransitionOffset(slides[3]);
          var slideCalculateOffset = slideInitOffset + slideTransitionOffset;
          var wrapOffset =  getTransitionOffset(wrap);
          slideCalculateOffset.should.equal(-wrapOffset);
          swipe.index.should.equal(3);
        }, true);
      })

      it('slideTo(index bigger than min), it should slideTo(min)', function() {
        swipe.slideTo(-1111, function() {
          var slideInitOffset = 0;
          var slideTransitionOffset = getTransitionOffset(slides[0]);
          var slideCalculateOffset = slideInitOffset + slideTransitionOffset;
          var wrapOffset =  getTransitionOffset(wrap);
          slideCalculateOffset.should.equal(-wrapOffset);
          swipe.index.should.equal(0);
        }, true);
      })

      it('slideTo(index between min and max, it should slideTo(index))', function() {
        var random = Math.floor(Math.random() * swipe.length);
        swipe.slideTo(random, function() {
          var slideInitOffset = random * swipe.width;;
          var slideTransitionOffset = getTransitionOffset(slides[random]);
          var slideCalculateOffset = slideInitOffset + slideTransitionOffset;
          var wrapOffset =  getTransitionOffset(wrap);
          slideCalculateOffset.should.equal(-wrapOffset);
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
        var navItems = container.querySelector('.swipe-nav').children;
        navItems.length.should.equal(swipe.length);
      })

      it('can switch between show and hide', function() {
        swipe.set('nav', false);
        swipe.nav.style.display.should.equal('none');
        swipe.set('nav', true);
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
      before(function() {
        window.resizeBy(-2, -2);
      })
      after(function() {
        window.resizeBy(2, 2);
      })
      it('should reset the width and height of the slides as the same with the container(runs only in IE))', function(){
        var containerWidth = container.offsetWidth;
        for (var i = 0, len = slides.length; i < len; i++) {
          slides[i].offsetWidth.should.equal(containerWidth);
        }
      })

      it('should reset the width of wrap as the sum of all slides(runs only in IE)', function() {
        var wrapWidth = wrap.offsetWidth;
        var sum = 0;
        for (var i = 0, len = slides.length; i < len; i++) {
          sum += slides[i].offsetWidth;
        }
        (wrapWidth - sum > 0).should.equal(true);
      })
    })

    describe('continuous', function() {
      it('when it is the last slide, next() should animate to the first slide', function() {
        swipe.slideTo(swipe.length - 1, true);
        swipe.next(function(){
          swipe.index.should.equal(0);
        }, true);
      })

      it('when it is the first slide, prev() should animate to the last slide', function() {
        swipe.slideTo(0, true);
        swipe.prev(function(){
          swipe.index.should.equal(3);
        }, true);
      })
    })

    describe('touch', function() {
      it('should support touch(but I do not know how to test it)', function() {
      })
    })
  })

})
