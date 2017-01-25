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

	$('.post__main img').each(function (index, item) {
		var $img = $(this);
		var className = 'modalBox' + index;

		var $tpl = $('<div />');
		$tpl.addClass('modalBox').addClass(className).append($($img.prop('outerHTML')));
		$tpl.hide();

		$img.on('click', function () {
			$tpl.modalBox({
				onOpen: function () {
					$('body').addClass('modal-open');
				},
				onClose: function () {
					$('body').removeClass('modal-open');
				}
			});
		});

		$('body').append($tpl);
	});


});