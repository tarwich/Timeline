
window.Timeline = function() {
	// Array shorthand object
	var _Array = new Array();
	
	// --------------------------------------------------
	// 
	// 
	//  CLASS: Date (helper)
	// 
	// 
	// --------------------------------------------------
	var Date = window.Timeline.Date = function(element) {
		// Convert element into a date
		var result = new window.Date(element || new window.Date());
		
		// --------------------------------------------------
		// format
		// --------------------------------------------------
		result.format = function(format) {
			var i18n = {
				days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
				months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
			};

			var formatters = {
				d    : /* Day of the month as digits without leading zero.       */ function(date) { return date.getDate()                                                } ,
				dd   : /* Day of the month as digits with leading zero.          */ function(date) { return ("0" + date.getDate()).slice(-2)                              } ,
				ddd  : /* Day of the week as a three-letter abbreviation.        */ function(date) { return i18n.days[date.getDay()].slice(0, 3)                          } ,
				dddd : /* Day of the week as its full name.                      */ function(date) { return i18n.days[date.getDay()]                                      } ,
				m    : /* Month as digits without leading zeros.                 */ function(date) { return date.getMonth()                                               } ,
				mm   : /* Month as digits with leading zeros.                    */ function(date) { return ("0" + date.getMonth()).slice(-2)                             } ,
				mmm  : /* Month as a three-letter abbreviation.                  */ function(date) { return i18n.months[date.getMonth()].slice(0, 3)                      } ,
				mmmm : /* Month as its full name.                                */ function(date) { return i18n.months[date.getMonth()]                                  } ,
				yy   : /* Year as last two digits with leading zeros             */ function(date) { return ("00"+date.getFullYear()).slice(-2)                           } ,
				yyyy : /* Year represented by four digits.                       */ function(date) { return date.getFullYear()                                            } ,
				h    : /* Hours without leading zeros (12-hour clock).           */ function(date) { return ("" + date.getHours() % 12).replace(/^0/, 12);                } ,
				hh   : /* Hours with leading zeros (12-hour clock).              */ function(date) { return ("0"+("" + date.getHours() % 12).replace(/^0/, 12)).slice(-2);} ,
				H    : /* Hours without leading zeros (24-hour clock).           */ function(date) { return ("" + date.getHours()).slice(-2);                             } ,
				HH   : /* Hours with leading zeros (24-hour clock).              */ function(date) { return ("0"+("" + date.getHours())).slice(-2);                       } ,
				M    : /* Minutes without leading zeros.                         */ function(date) { return date.getMinutes()                                             } ,
				MM   : /* Minutes with leading zeros.                            */ function(date) { return ("0"+date.getMinutes()).slice(-2)                             } ,
				s    : /* Seconds without leading zeros.                         */ function(date) { return date.getSeconds()                                             } ,
				ss   : /* Seconds with leading zeros.                            */ function(date) { return ("0"+date.getSeconds()).slice(-2)                             } ,
//              l    : /* or L  Milliseconds. l gives 3 digits. L gives 2 digits.*/ function(date) { return "Not supported"                                               } ,
				t    : /* Lowercase, single-character time marker string: a or p.*/ function(date) { return (date.getHours() > 11) ? "p"  : "a"                           } ,
				tt   : /* Lowercase, two-character time marker string: am or pm. */ function(date) { return (date.getHours() > 11) ? "pm" : "am"                          } ,
				T    : /* Uppercase, single-character time marker string: A or P.*/ function(date) { return (date.getHours() > 11) ? "P"  : "A"                           } ,
				TT   : /* Uppercase, two-character time marker string: AM or PM. */ function(date) { return (date.getHours() > 11) ? "PM" : "AM"                          } ,

				"\0" : function(date, format) { return format; },
			};
			
			// Break apart the format with word boundaries
			var parts = format.split(/\b/);
			// Initialize the result string
			var result = "";
			
			// Go through the components of the format
			for(var i=0; i<parts.length; ++i) {
				// Find the formatter
				var formatter = formatters[parts[i]] || formatters["\0"];
				// Format the component
				result += formatter(this, parts[i]);
			}

			return result;
		};
		
		return result;
	};
	
	// --------------------------------------------------
	// 
	// 
	//  CLASS: Element
	// 
	// 
	// --------------------------------------------------

	// Element class wrapper for help
	var Element = window.Timeline.Element = function(element) {
		// If element is a string, then pass it to document.createElement
		if(typeof(element) == "string") element = document.createElement(element);
		// Make sure element isn't nothing
		element = element || this;
		
		// --------------------------------------------------
		// addClass
		// --------------------------------------------------
		element.addClass = function() {
			// Break apart all the arugments into an array of class names
			this.className = _Array.join.apply(arguments, [" "]).split(/\s/)
			// Break apart the existing classes into an array of class names 
			// and add them to the original array
			.concat(this.className.split(/\s/))
			// Join the class names on space to put them back together
			.join(" ");
		};
		
		// And... return... this... 
		return element;
	};

	// --------------------------------------------------
	// 
	// 
	//  CLASS: HBox
	// 
	// 
	// --------------------------------------------------

	var HBox = window.Timeline.HBox = function(element) {
		// Make sure element exists
		element = element || Element("DIV");
		
		// --------------------------------------------------
		// distribute
		// --------------------------------------------------

		return element;
	};

	// --------------------------------------------------
	// 
	// 
	//  CLASS: TimelineEvent
	// 
	// 
	// --------------------------------------------------
	var TimelineEvent = function(event) {
		// Make sure event isn't nothing
		event = event || this;

		event.initialize = function() {
			// Apply defaults
			event.title       = event.title       || "Untitled this" ; 
			event.description = event.description || ""               ; 
			event.date        = event.date        || new Date()       ; 
			// Wrap the date
			event.date = Timeline.Date(event.date);
			
			//  __________________________________________________
			// / Setup elements                                   \ 
			// \__________________________________________________/
		};
		
		event.initialize();
		
		return event;
	};

	// --------------------------------------------------
	// 
	// 
	//  CLASS: Timeline
	// 
	// 
	// --------------------------------------------------
	
	// --------------------------------------------------
	// initialize
	// --------------------------------------------------
	this.initialize = function(element) {
		// If element is wrapped, then unwrap it
		element = element[0] || element;
		// Wrap element in an Element wrapper. If element is undefined, then 
		// create a new <div /> element
		element = Element(element || "DIV");
		// Add the timeline class to the element
		element.addClass("timeline");
		// Store the element in this object for reference
		this.element = element;
		// Initialize the events array
		this.events = [];
		// Make the overview element
		this.element.appendChild(this.overview = HBox());
		// Add the overview class
		this.overview.addClass("overview");
	};

	// --------------------------------------------------
	// addEvent
	// --------------------------------------------------
	this.addEvent = function(timelineEvent) {
		// Create the event
		timelineEvent = TimelineEvent(timelineEvent);
		// Add this event to the internal list of events
		this.events.push(timelineEvent);
		// Sort the events by date
		this.events.sort(function(a, b) {return a.date - b.date});
		// Update the overview bar
		this.updateOverview();
	};

	// --------------------------------------------------
	// updateOverview
	// --------------------------------------------------
	this.updateOverview = function() {
		var count, format, interval;

		// Fringe case of 1 event
		if(this.events.length == 1) count = 1, format = "ddd", interval = 0;
		
		// More than 1 event, calculate scale
		else {
			// Find out how much time the events span
			var difference = (this.events.slice(-1)[0].date - this.events[0].date) / 1000;
			
			if     (difference > 31536000*3) { format = 'yyyy'  , count = difference  / 31536000  , interval = 31536000;}
			else if(difference > 86400*30*3) { format = 'mmm'   , count = difference / (86400*30) , interval = 86400*30;}
			else if(difference > 86400*7 *3) { format = 'd mmm' , count = difference / (86400*7)  , interval = 86400*7 ;}
			else if(difference > 86400   *3) { format = 'dd'     , count = difference / (86400)    , interval = 86400   ;}
			else                             { format = 'hh:00' , count = difference / (3600)     , interval = 3600    ;}
			
		}

		// Ensure overview has enough elements to handle events
		for(var i=this.overview.childNodes.length; i<count; ++i) 
			// Add a new child
			this.overview.appendChild(Element("SPAN"));
		// Ensure overview doesn't have too many elements for the events
		for(var i=count; this.overview.childNodes.length>count;) {
			// Remove this (extra) node
			this.overview.removeChild(this.overview.childNodes[i]);
		}
		
		// Get the date of the first item
		var date = this.events[0].date;
		
		for(var i=0; i<count; ++i) {
			// Set the text of this label
			this.overview.childNodes[i].innerText = date.format(format);
			// Increment the date
			date.setSeconds(date.getSeconds() + interval);
		}
	};

	// Run the initialize function
	this.initialize.apply(this, arguments);
};

