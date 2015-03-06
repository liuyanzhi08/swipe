define(function() {
	function Swipe(container) {
		this.container = container;
		this.wrap = this.container.children[0];
		this.slides = this.wrap.children;
		this.length = this.slides.length;
		this.width = this.container.offsetWidth;

		this.setup();
	}

	Swipe.prototype.setup = function() {
		// Set container
		this.container.style.overflow = 'hidden';
		this.container.style.position = 'relative';

		// Set wrap
		// var containerStyle = getComputedStyle(this.container);
		// this.wrap.style.height = containerStyle.height;
		// this.wrap.style.width = parseInt(containerStyle.width) * this.length + 'px';
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

	Swipe.prototype.slides = function() {

	}

	// Utility function
	function getEdgeHeight(ele) {
		var style = getComputedStyle(ele);

		var marginTop = parseInt(style.marginTop);
		var borderTop = parseInt(style.borderTopWidth);
		var paddingTop = parseInt(style.paddingTop);

		var marginBottom = parseInt(style.marginBottom);
		var borderBottom = parseInt(style.borderBottomWidth);
		var paddingBottom = parseInt(style.paddingBottom);

		var edgeHeight = marginTop + borderTop + paddingTop
						 + marginBottom + borderBottom + paddingBottom;
		return edgeHeight;
	}

	function getEdgeWidth(ele) {
		var style = getComputedStyle(ele);

		var marginLeft = parseInt(style.marginLeft);
		var borderLeft= parseInt(style.borderLeftWidth);
		var paddingLeft = parseInt(style.paddingLeft);

		var marginRight = parseInt(style.marginRight);
		var borderRight = parseInt(style.borderRightWidth);
		var paddingRight = parseInt(style.paddingRight);

		var edgeWidth = marginLeft + borderLeft + paddingLeft
						 + marginRight + borderRight + paddingRight;
		return edgeWidth;
	}
	return Swipe;
})
