
window.Timeline = function() {
	// --------------------------------------------------
	// 
	// 
	//  CLASS: Element
	// 
	// 
	// --------------------------------------------------

	// Element class wrapper for help
	var Element = function(element) {
		// Array shorthand object
		var _Array = new Array();
		// If element is a string, then pass it to document.createElement
		if(element instanceof String) element = document.createElement(element);
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

			//  __________________________________________________
			// / Setup elements                                   \ 
			// \__________________________________________________/
		};

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
		element = new Element(element || "<div />");
		// Add the timeline class to the element
		element.addClass("timeline");
		// Store the element in this object for reference
		this.element = element;
		// Initialize the events array
		this.events = [];
	};

	// --------------------------------------------------
	// addEvent
	// --------------------------------------------------
	this.addEvent = function(event) {
		// Create the event
		event = new TimelineEvent(event);
		// Add this event to the internal list of events
		this.events.push(event);
		// Sort the events by date
		this.events.sort(function(a, b) {return a.date - b.date});
		// Update the overview bar
		this.updateOverview();
	};

	// --------------------------------------------------
	// updateOverview
	// --------------------------------------------------
	this.updateOverview = function() {
		for(var i=0; i<this.events.length; ++i) {
		}
	};

	// Run the initialize function
	this.initialize.apply(this, arguments);
};

