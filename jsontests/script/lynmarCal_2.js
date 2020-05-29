$(document).ready(function() {
	//declare the variables
	var today = new Date();
	var curMonth = today.getMonth() + 1;
	var curDay = today.getDate();
	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var curMonthName = monthsArray[curMonth - 1];
	
	//alert('#' + curMonthName + ' ' + '#' + curDay);
	
	$('#calendarContainer #innerContainer').on("click", ".dateCell", function(evt) {
		//console.log("clicked " + $(this).attr('id'));
		updateFromDayClick($(this));
	});
	
	$('#calendarContainer #innerContainer').on("mouseenter", ".dateCell", function(evt) {
		$(this).addClass('highlighted');
		//console.log("hovering " + $(this).attr('id'));
	}).on("mouseleave", ".dateCell", function(evt) {
		$(this).removeClass('highlighted');
	});
	
	$('#' + curMonthName + ' ' + '#' + curDay).addClass('today');

	if (($('.currentMonth').length) < 1) {	//check to see of any calendar is in place
		$.ajax({
			type: 'GET',
			url: 'script/dates.json',
			dataType: 'json',
			success: calendar(curMonth,true)
		});
	};
	
	$('#monthLinks li').click(function() {
		var clickedMonth = $(this).attr('id');
		var newMonth = clickedMonth.replace("jumpTo","");
		var newMonthNumber = monthsArray.indexOf(newMonth);
		if (($('.startingMonth table').attr('id') != newMonth)) {									   
			if(!$('#innerContainer div').is(':animated')) {
				$('#innerContainer div').addClass('viewedMonth');
				calendar((newMonthNumber + 1),false);
			};
			return false;
		};
  	});


});//end doc ready func

function calendar(thisMonth,original) {

	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthName = monthsArray[thisMonth-1];
	
	$.getJSON('script/dates.json',function(data) {
		
		//variables from JSON
		var theMonth = data['months'][monthName];
		var monthDays = data['months'][monthName]['days'];
		var startDate = data['months'][monthName]['start'];
		var extraClass = " firstTableDiv";
		
		if (original != true) {
			if (parseInt((data['months'][monthName]['number'])) < parseInt((data['months'][$('.startingMonth table').attr('id')]['number']))) {
				var extraClass = " fromLeft";
			} else if (parseInt((data['months'][monthName]['number'])) > parseInt((data['months'][$('.startingMonth table').attr('id')]['number']))) {
				var extraClass = " fromRight";
			};
		};

		var monthHTML = '<div class="tableDiv' + extraClass + '"><table id="' +  monthName + '" class="monthTable" cellpadding="0" cellspacing="0" border="0">' +
		'<tbody>' +
		'<tr class="weekdays">' +
		'<td>SUNDAY</td><td>MONDAY</td><td>TUESDAY</td><td>WEDNESDAY</td><td>THURSDAY</td><td>FRIDAY</td><td>SATURDAY</td>' +
		'</tr>'
		'<tr class="weekRow">';
		
		var i = 1;
		var j = 1;
		while ( i <= 35 ) {
			while (( i >= startDate ) && ( j <= monthDays ) && (i <= 35)) {
				monthHTML += '<td id="'+ j + '" class="dateCell" valign="top"><p>' + j + '</p></td>';
				if ((i % 7 == 0 ) && ( i == 35 )) {
					monthHTML += '</tr></tbody></table></div>';
				} else if ( i % 7 == 0 ) {
					monthHTML += '</tr><tr class="weekRow">';
				};
				j++;
				i++;
			};
			monthHTML +='<td class="dateCellOther" valign="top"></td>';
			i++;
		};
		
		if (original) {
			$('#calendarContainer #innerContainer').append(monthHTML);
			$('#calendarContainer #innerContainer div').addClass('startingMonth');
		} else if (extraClass == " fromLeft") {
			prependCal(monthHTML,monthName);
		} else if (extraClass == " fromRight") {
			appendCal(monthHTML,monthName);
		};
		
		if ((parseInt(startDate) + parseInt(monthDays) - 1) > 35 ) {
			var extras = (parseInt(startDate) + parseInt(monthDays) - 35 - 1);
			doubleRow(monthName,extras,startDate);
		};
		
		appendDateText(theMonth);

	}); //end getJSON
	
	function doubleRow(month_Name,extra_Days,start_Date) {
		var lastWeek = '<tr class="weekRow">';
		l = 1;
		e = 1;
		f = 1;
		g = ((7 - start_Date) + 23);
		while ( e <= extra_Days ) {
			lastWeek += '<td id="' + g + '" class="dateCell" style="height: 34px;" valign="top">' + g + '</td>';
			e++;
			g++;
		};
		while ( l <= (7-extra_Days)) {
			lastWeek +='<td rowspan="2" id="' + g + '" class="dateCell" valign="top">' + g + '</td>';
			l++;
			g++;
		};
		lastWeek +='</tr><tr>'
		while ( f <= extra_Days ) {
			lastWeek +='<td id="' + g + '" class="dateCell" style="height: 34px;" valign="top">' + g + '</td>'
			f++;
			g++
		};
		lastWeek +='</tr>'
		$('#innerContainer #' + month_Name + ' .weekRow:last').replaceWith(lastWeek);
	};//end doubleRow
	updateRest(monthName);
};// end calenar functions

function appendDateText(the_Month) {
	//alert(the_Month.dates.length);
	
	var monthsArray = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	var monthName = monthsArray[the_Month.number - 1];
	
	var today = new Date();
	$('#' + monthsArray[today.getMonth()] + ' ' + '#' + today.getDate() + '.dateCell').css("background-color", "#6666FF");
	//$('#' + monthsArray[today.getMonth()] + ' ' + '#' + today.getDate() + '.dateCell').addClass('today');
	//alert('#' + monthsArray[today.getMonth()] + ' ' + '#' + today.getDate());
	
	if (the_Month.dates) {
		var dateText = the_Month.dates;
		$('#' + monthName + ' .dateCell').each(function() {		
			for (var i = 0; i <= dateText.length; i++) {
				for (key in dateText[i]) {
					if ((dateText[i].hasOwnProperty(key)) && (key == $(this).attr('id'))) {
						var eventText = '<p class="dateEvent">' + dateText[i][key] + '</p>';
					};
				};
			};
			$(this).append(eventText);	
		});
	};
};

function prependCal(month_HTML,month_Name) {
	$('#innerContainer').prepend(month_HTML);
	$('#innerContainer div').animate({left: '+=652'}, 500, function() {
		$('.viewedMonth').remove();
		$('.fromLeft').css({
			'left': '0',
			'float': 'left'
		});
		$('.fromLeft').removeClass('fromLeft');
		$('#innerContainer div').addClass('startingMonth');
		updateRest(month_Name);
	});
};

function appendCal(month_HTML,month_Name) {
	$('#innerContainer').append(month_HTML);
	$('#innerContainer div').animate({left: '-=652'}, 500, function() {
		$('.viewedMonth').remove();
		$('.fromRight').css({
			'left': '0',
			'float': 'left'
		});
		//$('.fromRight').removeClass('fromRight');
		$('#innerContainer div').addClass('startingMonth');
		updateRest(month_Name);
	});
};

function updateRest(month_Name) {
	$('#monthHeader').html(month_Name);
	$('#dayEvents').html(month_Name);
	$('#monthEvents').html(month_Name);
};

function updateFromDayClick(cellDate) {
	var month = $('.monthTable').attr('id');
	var monthDay = cellDate.attr('id');
	var daysArray = ["Sunday","Monday","Tuesday","Wednesday","Thursay","Friday","Saturday"];
	$.getJSON('script/dates.json',function(data) {
		var weekday = daysArray[(parseInt(monthDay) + parseInt(data['months'][month]['start']) + 5) % 7];						   
		var date = '<div style="position: aboslute; clear: both; background-color: #FB0F21; width: 300px; margin: 0;"><p style="padding: 12px; margin: 0;">' + weekday + ', ' + month + ' ' + monthDay + '</p></div>';
		//console.log(parseInt(monthDay) + ', ' + parseInt(data['months'][month]['start']));
		$('#dayEvents').html(date);
		
		var closedDatesArray = [];
		
		if (data['months'][month]['closed']) {
			var closedDates = data['months'][month]['closed'];	
			for (var i = 0; i <= closedDates.length; i++) {
				for (value in closedDates[i]) {
					if (closedDates[i].hasOwnProperty(value)) {
						closedDatesArray.push(value);
						//console.log(closedDatesArray);
					};
				};
			};	
		};
		//closed dates
		
		var eventBlurbs = '<div class="eventBlurb" style="position: absolute; margin: 0;"></div>';
		$('#dayEvents').append(eventBlurbs);
		
		var todaysEvents = [];
		
		//Conditions to check: closed, closed early, special day (bypass normal routine and customize everything), picnics, wine tasting, tours, special events defined in JSON doc, 
		
		if (data['months'][month]['dates']) { //find special dates
			var eventText = data['months'][month]['dates'];	
			for (var i = 0; i <= eventText.length; i++) {
				for (key in eventText[i]) {
					if ((eventText[i].hasOwnProperty(key)) && (key == monthDay)) {
						$('.eventBlurb').append('<p class="dateEvent">' + eventText[i][key] + '</p>');
						$('.eventBlurb p:hidden').fadeIn(200);
					};
				};
			};
		};
		
		//variables for regular offerings - Wine tasting, picnics, tours
		
		var picnics = 'Picnic Pairings<br />11 a.m. - 2 p.m. | <a href="#">Reserve</a>';
		var tasting = 'Wine tasting | 10 a.m. - 4:30 p.m.';
		var tours = 'Cave tour | 11 a.m.';
		var luxTasting = 'Lynmar Luxury Tasting <br /> <span class="times">11 a.m.</span>'
		
		function eventItem(id,offering) {
			var eventHTML = '<p id ="' + id + '" class="dateEvent">' + offering + '</p>';
			return eventHTML;
		}
		
		if (closedDatesArray.indexOf(monthDay) < 0) {
			if ((weekday != "Monday") && (weekday != "Tuesday")) {
				$('.eventBlurb').append('<p class="dateEvent">Picnics Available <a href="#">Reserve</a></p>');
				$('.eventBlurb p:hidden').fadeIn(400, function() {
					$('.eventBlurb').append('<p class="dateEvent">Wine Tasting Available</p>');
					$('.eventBlurb p:hidden').fadeIn(400);
				});
			};
			//$('.eventBlurbs').append('<p class="dateEvent" style="background-color: #99FF00; padding: 12px; margin: 0; display: none;">Wine Tasting Available</p>');
			//$('.eventBlurb p:hidden').fadeIn(400);
		} else {
			$('.eventBlurb').append('<p class="dateEvent">Tasting Room Closed</p>');
			$('.eventBlurb p:hidden').fadeIn(400);
		};
		//eventBlurbs += '</div>';
	});//end getJSON

}; //end UpdateFromDayClick