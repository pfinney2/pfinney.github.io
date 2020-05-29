$(document).ready(function() {
	//declare the variables
	var today = new Date();
	var curMonth = today.getMonth() - 2;
	var curDay = today.getDate();
	

	//Two JSON requests - one for initial content and one for updates from clicks
	
	$.ajax({
		type: 'GET',
		url: 'script/dates.json',
		dataType: 'json',
		success: displayCurMonth(curMonth,curDay)
	});

	
	//html strings to start
	//...calendar cells
	//...paragraphs within calendar cells
	//...
	
	//first: write click function that retrieves JSON data, then call next function accordingly
	
	//click functions for sliding calendars
		//variables to pass for shorter function size
			//from left or right
			//month name link or calendar cell link
			//month name number
		//append cell dates
		//append cell paragraphs
	
	//click functions for revealing day details
		//append data (animate)

});

function displayCurMonth(cur_Month,cur_Day) {
	//alert(cur_Month + ", " + cur_Day);
	var monthsArray = ["January","February","March","Apri","May","June","July","August","September","October","November","December"];
	
	var monthHTML = '<table id="' +  monthsArray[cur_Month-1] + '" class="monthTable" cellpadding="0" cellspacing="0" border="0">' +
	'<tbody>' +
	'<tr class="weekdays">' +
	'<td>SUNDAY</td><td>MONDAY</td><td>TUESDAY</td><td>WEDNESDAY</td><td>THURSDAY</td><td>FRIDAY</td><td>SATURDAY</td>' +
	'</tr>'
	'<tr class="weekRow">';
	
	$.getJSON('script/dates.json',function(data) {
		
			//variables from JSON
			var monthName = monthsArray[cur_Month-1];
			var monthDays = data['months'][monthName]['days'];
			var startDate = data['months'][monthName]['start'];
			//alert(monthName + ", " + startDate + ", " + monthDays);
			
			var i = 1;
			var j = 1;
			while ( i <= 35 ) {
				while (( i >= startDate ) && ( j <= monthDays ) && (i <= 35)) {
					monthHTML += '<td id="'+ j + '" class="dateCell" valign="top"><p>' + j + ', ' + i + '</p></td>';
					if ((i % 7 == 0 ) && ( i == 35 )) {
						monthHTML += '</tr></tbody></table>';
					} else if ( i % 7 == 0 ) {
						monthHTML += '</tr><tr class="weekRow">';
					};
					j++;
					i++;
				};
				monthHTML +='<td class="dateCellOther" valign="top"></td>';
				i++;
			};
			
		
			$('#calendarContainer #innerContainer').append(monthHTML);
			
			//alert(parseInt(startDate) + parseInt(monthDays));
			
			if ((parseInt(startDate) + parseInt(monthDays)) > 35 ) {
				var extras = (startDate + monthDays - 35 - 1);
				doubleRow(extras,startDate);
				//alert(extras,startDate);
			};
			


	}); //end getJSON
	
	function doubleRow(extra_Days,start_Date) {
		var lastWeek = '<tr class="weekRow">';
		l = 1;
		e = 1;
		f = 1;
		g = ((7 - start_Date) + 23);
		while ( e <= extra_Days ) {
			lastWeek += '<td id="' + g + '" class="dateCell" style="border: 1px solid #F03; height: 24px;" valign="top">' + g + '</td>';
			e++;
			g++;
		};
		while ( l <= (7-extra_Days)) {
			lastWeek +='<td rowspan="2" id="' + g + '" class="dateCell" style="border: 1px solid #D0A;" valign="top">' + g + '</td>';
			l++;
			g++;
		};
		lastWeek +='</tr><tr>'
		while ( f <= extra_Days ) {
			lastWeek +='<td id="' + g + '" class="dateCell" style="border: 1px solid #F03; height: 24px;" valign="top">' + g + '</td>'
			f++;
			g++
		};
		lastWeek +='</tr>'
		$('#innerContainer table .weekRow:last').replaceWith(lastWeek);
	};//end doubleRow
};