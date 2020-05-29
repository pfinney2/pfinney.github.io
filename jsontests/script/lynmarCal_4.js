$(document).ready(function() {
	//declare the variables
	var today = new Date();
	var curMonth = today.getMonth() + 1;
	var curDay = today.getDate();
	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var curMonthName = monthsArray[curMonth - 1];
	
	$('#monthLinks li').click(function() {
		var clickedMonth = $(this).attr('id');
		var newMonth = clickedMonth.replace("jumpTo","");
		var newMonthNumber = monthsArray.indexOf(newMonth);
		if (($('.startingMonth').attr('id') != newMonth)) {									   
			if(!$('#innerDatesContainer div:first').is(':animated')) {
				$('#innerDatesContainer div:first').addClass('viewedMonth');
				calendar((newMonthNumber + 1),false);
			};
			return false;
		};
  	});
	
		if (($('.currentMonth').length) < 1) {	//check to see of any calendar is in place
		$.ajax({
			type: 'GET',
			url: 'script/dates2.json',
			dataType: 'json',
			success: calendar(curMonth,true)
		});
	};
	



});//end doc ready func

function calendar(thisMonth,original) {
	
	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthName = monthsArray[thisMonth-1];
	
	$('#monthNameImg').html(monthName);
	
	$.getJSON('script/dates2.json',function(data) {
		//variables from JSON
		var theMonth = data['months'][monthName];
		//var monthDays = data['months'][monthName]['days'];
		//var startDate = data['months'][monthName]['start'];
		var extraClass = " firstTableDiv";
		console.log("success");
		//console.log(monthDays);
		//console.log(data['months'][monthName]['dates'][1]);
		if (original != true) {
			if (parseInt((data['months'][monthName]['number'])) < parseInt((data['months'][$('.startingMonth').attr('id')]['number']))) {
				var extraClass = " fromLeft";
			} else if (parseInt((data['months'][monthName]['number'])) > parseInt((data['months'][$('.startingMonth').attr('id')]['number']))) {
				var extraClass = " fromRight";
			};
		};
		

		var monthHTML = '<div id="' + monthName + '" class="datesDiv ' + extraClass + '" style="margin-top: 65px; margin-bottom: 10px;"><img src="http://www.lynmarestate.com/images/h2_allMonth.gif" width="481" height="20" /><table width="630" style="border-top: 1px solid #999; border-collapse: collapse;"><tbody>';
		
		if (data['months'][monthName]) {
			for (i = 0; i <= theMonth.dates.length; i++) {
			  for (key in theMonth['dates'][i]) {
				  monthHTML += '<tr height="45"><td width="170" style="border-bottom: 1px solid #999;"><img src="images/date_' + key + '.png" /></td><td style="border-bottom: 1px solid #999;">' + theMonth['dates'][i][key] + '</td><tr>';
				  console.log(key);
			  }
			}
			monthHTML += '</tbody></table></div>';		
		}
		
		if (original) {
			$('#datesContainer #innerDatesContainer').append(monthHTML);
			$('#datesContainer #innerDatesContainer div:first').addClass('startingMonth');
			//console.log("original calendar added");
		} else if (extraClass == " fromLeft") {
			prependCal(monthHTML,monthName);
		} else if (extraClass == " fromRight") {
			appendCal(monthHTML,monthName);
		};
		
//		if ((parseInt(startDate) + parseInt(monthDays) - 1) > 35 ) {
//			var extras = (parseInt(startDate) + parseInt(monthDays) - 35 - 1);
//			doubleRow(monthName,extras,startDate);
//		};
//		
//		appendDateText(theMonth);

	}); //end getJSON

};// end calenar functions

function appendDateText(the_Month) { //adds date text to the calendar from JSON data
	
	
	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthName = monthsArray[the_Month.number - 1];
	
	var today = new Date();
	$('#' + monthsArray[today.getMonth()] + ' ' + '#' + today.getDate() + '.dateCell').css("background-color", "#09F");
	
	if (the_Month.dates) { //inserts special dates into calendar
		$('#' + monthName + ' .dateCell').each(function() {		
			if (the_Month['dates'][$(this).attr('id')]) {
				for (key in the_Month['dates'][$(this).attr('id')]) {
					var eventText = '<p class="">' + (key) + '</p>';
				};
			};
			$(this).append(eventText);	
		});
	};//end appending date info into calendar
};

function prependCal(month_HTML,month_Name) {
	$('#innerDatesContainer').prepend(month_HTML);
	$('#innerDatesContainer div').animate({left: '+=632'}, 500, function() {
		$('.viewedMonth').remove();
		$('.fromLeft').css({
			'left': '0',
			'float': 'left'
		});
		$('.fromLeft').removeClass('fromLeft');
		$('#innerDatesContainer div:first').addClass('startingMonth');
		//updateRest(month_Name);
	});
};

function appendCal(month_HTML,month_Name) {
	$('#innerDatesContainer').append(month_HTML);
	$('#innerDatesContainer div').animate({left: '-=632'}, 500, function() {
		$('.viewedMonth').remove();
		$('.fromRight').css({
			'left': '0',
			'float': 'left'
		});
		//$('.fromRight').removeClass('fromRight');
		$('#innerDatesContainer div:first').addClass('startingMonth');
		//updateRest(month_Name);
	});
};

//function: click to navigate month via arrows

//function: click to navigate month via top list
//update top list to include underline under selected month
//