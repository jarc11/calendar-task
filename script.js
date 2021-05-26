window.addEventListener('load', (event) => {
	//Populate the calendar with this month's data
	today()
});

// Populate the table with the provided data
function populateCalendar(date) {

	var weekOneRow = document.getElementById("week1")
	var weekTwoRow = document.getElementById("week2")
	var weekThreeRow = document.getElementById("week3")
	var weekFourRow = document.getElementById("week4")
	var weekFiveRow = document.getElementById("week5")
	var weekSizeRow = document.getElementById("week6")

	var adjustedIndex = 0

	// Loop through the days
	for (var i = 0; i < daysInMonth((date.getMonth() + 1), date.getFullYear()); i++) {

		// Work out what day the date is
		var dateForDay = new Date(date.getFullYear(), date.getMonth(), (i + 1))

		var day = dateForDay.getDay()
		var dateNumber = dateForDay.getDate()

		//Get the indent for the first day of the week in that month, so we know which row to put the number in
		if (i == 0) {
			adjustedIndex = day
		} else {
			adjustedIndex++
		}

		// update the UI
		switch (true) {
		  case adjustedIndex <= 6:
		    weekOneRow.children[adjustedIndex].innerHTML = dateNumber
		    break;
		  case adjustedIndex >= 7 && adjustedIndex <= 13:
		    weekTwoRow.children[day].innerHTML = dateNumber
		    break;
		  case adjustedIndex >= 14 && adjustedIndex <= 20:
		    weekThreeRow.children[day].innerHTML = dateNumber
		    break;
		  case adjustedIndex >= 21 && adjustedIndex <= 27:
		   	weekFourRow.children[day].innerHTML = dateNumber
		    break;
		  case adjustedIndex >= 28 && adjustedIndex <= 34:
		  	weekFiveRow.children[day].innerHTML = dateNumber
		  	break;
		  case adjustedIndex >= 35:
		  	weekSizeRow.children[day].innerHTML = dateNumber
		  	break;
		  default:
		    break;
		}

	}

	//Keep track of what month/year currently being shown
	currentYear = date.getFullYear()
	currentMonth = date.getMonth()
	highlightCurrentDate()
	
}

// Decorates the td with a class if it's the current date
function highlightCurrentDate() {
	var date = new Date()
	if (currentYear == date.getFullYear() && currentMonth == date.getMonth()) {
		var tds = document.getElementsByTagName("td")
		for (var i = 0; i < tds.length; i++) {
    		if (tds[i].innerHTML == date.getDate()) {
    			tds[i].className = "is-selected"
    		}
		}
	}
}

// Update the table with the new data (called onchange for either field)
function jumpToDate() {
	// Clear previous date data
	clearCalendar()
	// And populate with the new one
	var date = new Date()
	date.setYear(document.getElementById("year").value)
	date.setMonth(document.getElementById("month").value)
	populateCalendar(date)
}

function clearCalendar() {
	var tds = document.getElementsByTagName("td")
	for (var i = 0; i < tds.length; i++) {
    	tds[i].innerHTML = ""
    	tds[i].removeAttribute("class")
	}
}

// Navigation functions
function today() {
	clearCalendar()
	populateCalendar(new Date())
	document.getElementById("year").value = currentYear
	document.getElementById("month").value = currentMonth
}

function backOneYear() {
	document.getElementById("year").value = currentYear - 1
	jumpToDate()
}

function forwardsOneYear() {
	document.getElementById("year").value = currentYear + 1
	jumpToDate()
}

function backOneMonth() {
	var year = currentYear
	var lastMonth = currentMonth - 1
	if (lastMonth == -1) {
		lastMonth = 11
		year = currentYear - 1
	}
	document.getElementById("month").value = lastMonth
	document.getElementById("year").value = year
	jumpToDate()
}

function forwardsOneMonth() {
	var nextYear = currentYear
	var nextMonth = currentMonth + 1
	if (nextMonth == 12) {
		nextMonth = 0
		nextYear = currentYear + 1
	}
	document.getElementById("month").value = nextMonth
	document.getElementById("year").value = nextYear
	jumpToDate()
}


// Helper functions/global variables

var currentYear
var currentMonth

//returns number of days in a month
function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate();
}
