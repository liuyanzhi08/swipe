define(['../src/swipe.js'], function(Swipe) {
  describe('Swipe', function(){
    var container, swipe, wrap, slides, containerWidth, containerHeight, wrapWidth, navItems;
    beforeEach(function() {
      container = document.getElementById('mySwipe');
      swipe && swipe.kill();
      swipe = new Swipe(container);
      wrap = swipe.wrap;
      slides = swipe.slides;
      containerWidth = container.offsetWidth;
      wrapWidth = wrap.offsetWidth; 
      swipe.set('nav', 'on');
      navItems = container.querySelector('.swipe-nav').children;

      // For demo
      // var submit = document.getElementById('index_submit');
      // var input = document.getElementById('index_input');
      // submit.addEventListener('click', function(e) {
      //   var index = parseInt(input.value);
      //   index = isNaN(index) ? 0 : index;
      //   console.log(index);
      //   swipe.slideTo(index);
      // })
      // input.addEventListener('keydown', function(e) {
      //   if (e.keyCode == 13) {
      //     submit.click();
      //   }
      // })
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

    describe('slideTo(index)', function(){
      it('slideTo(current index), it should do nothing', function(){
        var oldTransform = swipe.wrap.style.webkitTransform;
        swipe.slideTo(swipe.index, function() {
          var newTransform = swipe.wrap.style.webkitTransform;
          newTransform.should.equal(oldTransform) ;
        });
      })

      it('slideTo(index between min and max, it should slideTo(index))', function(){
        var random = Math.floor(Math.random() * swipe.length);
        swipe.slideTo(random, function() {
          var offset = swipe.width * (0 - random);
          var transform = swipe.wrap.style.webkitTransform;
          if (transform) transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;
        });
      })

      it('slideTo(index bigger than max), it should slideTo(max)', function(){
        swipe.slideTo(9999, function() {
          var offset = swipe.width * (0 - (swipe.length - 1));
          var transform = swipe.wrap.style.webkitTransform;
          transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;
        });
      })

      it('slideTo(index bigger than min), it should slideTo(min)', function(){
        swipe.slideTo(-1111, function() {
          var transform = swipe.wrap.style.webkitTransform;
         transform.should.equal('translate3d(0px, 0px, 0px)') ;
        });
      })
    })

    describe('next()', function(){
      it('when current slide is the last one, it should slideTo(0)', function(){
        swipe.slideTo(swipe.length - 1);
        swipe.stop().next();
        swipe.index.should.equal(0);
      })
    })

    describe('prev()', function(){
      it('when current slide is the first one, it should slideTo(max)', function(){
        swipe.slideTo(0);
        swipe.stop().prev();
        swipe.index.should.equal(swipe.length - 1);
      })
    })

    describe('nav', function(){
      it('size of nav items should be length of slides', function(){
        navItems.length.should.equal(swipe.length);
      })

      it('can switch between show and hide', function(){
        swipe.set('nav', 'on');
        swipe.nav.style.display.should.equal('block');
        swipe.set('nav', 'off');
        swipe.nav.style.display.should.equal('none');
      })

      it('should indicate the current index', function(){
        swipe.nav.children[swipe.index].classList
                                       .contains('swipe-nav-item-on')
                                       .should.equal(true);

        swipe.slideTo(5, function() {
          swipe.nav.children[swipe.index].classList
                                       .contains('swipe-nav-item-on')
                                       .should.equal(true);
        });
        
      })
    })

    // describe('resize', function(){
    //   it('something', function(){
    //   })
    // })

    //  describe('touch', function(){
    //   it('something', function(){
    //   })
    // })
  })

})
