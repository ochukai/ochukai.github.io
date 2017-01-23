$(function () {

	console.log('I am Oliver~');

	var $oliBackTop = $("#oli-back-top");
	// scroll to top
	$oliBackTop.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$oliBackTop.fadeIn();
		} else {
			$oliBackTop.fadeOut();
		}
	});

	// scroll body to 0px on click
	$oliBackTop.on('click', function () {
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		
		return false;
	});


});