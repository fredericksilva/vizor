(function($) {
	$.fn.movable = function(options) {
	var $dragEl = $(this)
	
	if (options && options.handle) {
		$dragEl = options.handle;
	} else {
		$dragEl.prepend('<div class="drag-handle"></div>');
		$dragEl = $dragEl.find('.drag-handle');
	};

	var uimoved = (typeof uiEvent !== 'undefined') ? uiEvent.moved : 'uiMoved';
	var $dragged = $(this);
		$dragEl
			.on('mousedown touchstart', function(e) {
				var viewport = E2.dom.canvases;
				var x = $dragged.offset().left - e.pageX;
				var	y = $dragged.offset().top - e.pageY;
				var uiw = viewport.width();
				var uih = viewport.height();
				var co =  viewport.offset();
				var dhw = $dragEl.outerWidth(true);
				var dhh = $dragEl.outerHeight(true);
				var bhh = $dragged.find('.block-header').outerHeight(true);
				var minl = 0;
				var maxl = uiw - dhw;
				var mint = co.top; 
				var maxt = co.top + uih - dhh - bhh;
				var newLeft = x;
				var newTop = y;
				
				$(window)
					.on('mousemove.movable touchmove.movable', function(e) {
						newLeft = x + e.pageX;
						newTop = y + e.pageY;
						if (newLeft < minl)
							newLeft = 0;
						if (newLeft > maxl)
							newLeft = maxl;
						if (newTop < mint)
							newTop = mint;
						if (newTop > maxt)
							newTop = maxt;
						$dragged.css({
									'bottom': 'auto', 
									'right': 'auto'
									})
								.offset({
									left: newLeft,
									top: newTop
								});
						e.preventDefault();
						return false;
					})
					.one('mouseup touchend touchcancel', function() {
						$dragEl.trigger(uimoved);
						$(this).off('mousemove.movable touchmove.movable click.movable');
					});
				e.preventDefault();
				return false;
			})
			.one('mouseup touchend touchcancel', function() {
				$(this).off('mousemove.movable touchmove.movable click.movable');
			});
		return this;
	};
})(jQuery);