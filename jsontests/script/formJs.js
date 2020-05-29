// JavaScript Document
$(document).ready(function() {
	$('#myform').submit(function() {
		$(':input[required]').each(function) {
			if ($(this).val()==='') {
				$(this).after('<div class="error">This is a required field</div>');
				abort = true;
			});
		});
		if (abort) { return false; } else { return true; }
	});
});