
var YUN_REST_URL = '/lightSwitch';
var RED_SWITCH = 7;
var GREEN_SWITCH = 8;

$(function() {

	$.ajax([YUN_REST_URL, RED_SWITCH].join('/'), function(data) {
		console.log(data);
	});

	// $.get([YUN_REST_URL, GREEN_SWITCH].join('/'));

	var $input = $('input[type="checkbox"]');
	$input.on('change', function(event) {

		// only one switch can be active at a time (radio behavior)
		// force all other active switches to an inactive state
		// if ($input.not(this).prop('checked')) {
		// 	$input.not(this).prop('checked', false);
		// 	setTimeout(function() {
		// 		createjs.Sound.play('off');
		// 	}, 50);
		// }

		// throttle clicks to our poor button to prevent abuse
		$input.prop('disabled', true);
		setTimeout(function() {
			$input.prop('disabled', false);
		}, 1000);

		var inputID = $(this).data('id');
		var checked = $(this).prop('checked');

		if (checked) {
			$.ajax([YUN_REST_URL, inputID, 1].join('/'));
		} else {
			$.ajax([YUN_REST_URL, inputID, 0].join('/'));
		}

		console.log('switch:', inputID, '-', checked ? ' ON' : 'OFF');
	});
});
