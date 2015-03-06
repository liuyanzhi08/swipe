define(['../src/swipe.js'], function(Swipe) {
	describe('Swipe', function(){
	  var container, swipe, wrap, slides, containerWidth, containerHeight, wrapWidth;
	  before(function() {
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

	  describe('prev()', function(){
	    it('something', function(){
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
