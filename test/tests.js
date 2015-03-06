define(['../src/swipe.js'], function(Swipe) {
	describe('Swipe', function(){
	  var container, swipe, wrap, slides, containerWidth, containerHeight, wrapWidth;
	  beforeEach(function() {
	  	container = document.getElementById('mySwipe');
	  	swipe = new Swipe(container);
	  	wrap = swipe.wrap;
	  	slides = swipe.slides;
	  	containerWidth = container.offsetWidth;
	    wrapWidth = wrap.offsetWidth; 

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

	  describe('slideTo(index)', function(done){
      it('slideTo(current index), it should do nothing', function(){
        var oldTransform = swipe.wrap.style.webkitTransform;
        swipe.slideTo(swipe.index);
        var newTransform = swipe.wrap.style.webkitTransform;
        newTransform.should.equal(oldTransform) ;
      })

	    it('slideTo(index between min and max, it should slideTo(index))', function(){
	    	var random = Math.floor(Math.random() * swipe.length);
	    	swipe.slideTo(random, done);
	    	var offset = swipe.width * (0 - random);
    		var transform = swipe.wrap.style.webkitTransform;
        if (transform) transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;
	    })

	    it('slideTo(index bigger than max), it should slideTo(max)', function(done){
	    	swipe.slideTo(9999, done);
	    	var offset = swipe.width * (0 - (swipe.length - 1));
    		var transform = swipe.wrap.style.webkitTransform;
				transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;
	    })

	    it('slideTo(index bigger than min), it should slideTo(min)', function(done){
	    	swipe.slideTo(-1111, done);
	    	var transform = swipe.wrap.style.webkitTransform;
				transform.should.equal('translate3d(0px, 0px, 0px)') ;
	    })
	  })

	  describe('next()', function(done){
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

	  describe('dots', function(){
	    it('something', function(){
	    })
	  })
	})

})
