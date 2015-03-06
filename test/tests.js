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
	    it('slideTo(index between min and max)', function(){
	    	var random = Math.floor(Math.random() * swipe.length);
	    	swipe.slideTo(random, done);
	    	var offset = swipe.width * (0 - random);
    		var transform = swipe.wrap.style.webkitTransform;
				transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;

	    	// For demo
    		var submit = document.getElementById('index_submit');
    		var input = document.getElementById('index_input');
    		submit.addEventListener('click', function(e) {
	    		var index = parseInt(input.value);
	    		index = isNaN(index) ? 0 : index;
	    		swipe.slideTo(index);
	    	})
	    	input.addEventListener('keydown', function(e) {
	    		if (e.keyCode == 13) {
	    			submit.click();
	    		}
	    	})
	    })

	    it('slideTo(index bigger than max), it should slideTo(max)', function(done){
	    	swipe.stop().slideTo(9999, done);
	    	var offset = swipe.width * (0 - (swipe.length - 1));
    		var transform = swipe.wrap.style.webkitTransform;
				transform.should.equal('translate3d(' + offset + 'px, 0px, 0px)') ;
	    })

	    it('slideTo(index bigger than min), it should slideTo(min)', function(done){
	    	swipe.stop().slideTo(-1111, done);
	    	var transform = swipe.wrap.style.webkitTransform;
				transform.should.equal('translate3d(0px, 0px, 0px)') ;
	    })
	  })

	  describe('next()', function(){
	    it('something', function(){
	    })
	  })

	  describe('dots', function(){
	    it('something', function(){
	    })
	  })
	})

})
