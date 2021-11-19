jQuery(document).ready(function($){
	var isLateralNavAnimating = false;
	var position = 'up';

	console.log('ready ' + position)
	
	//open/close lateral navigation
	$('.cd-nav-trigger').on('click', function(event){
		


		$('html, body').animate({ scrollTop: 0 }, 'slow');

		if (position == 'down') {

			position = 'up';
			console.log(position);
			$('.cd-nav-trigger').text('About');

		} else {
			position = 'down';
			console.log(position);
			$('.cd-nav-trigger').text('Close');

		}


		event.preventDefault();
		//stop if nav animation is running 
		if( !isLateralNavAnimating ) {
			if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true; 
			
			$('body').toggleClass('navigation-is-open');
			$('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
				//animation is over
				isLateralNavAnimating = false;
			});
		}

		console.log($( document ).height());


	});


	$("a[href='#contact']").click(function() {
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");

		return false;

	});



});