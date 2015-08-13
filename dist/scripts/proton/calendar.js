$(document).ready(function() {
	!verboseBuild || console.log('-- starting proton.calendar build');
    
    proton.calendar.build();
});

proton.calendar = {
	build: function () {
		// Initiate calendar events
		proton.calendar.events();
		proton.calendar.makeCalendar();
		proton.calendar.bindDragEvent();

		!verboseBuild || console.log('            proton.calendar build DONE');

	},
	events: function () {
		!verboseBuild || console.log('            proton.calendar binding events');

	},
	makeCalendar: function (template) {
		!verboseBuild || console.log('            proton.calendar.makeCalendar()');
		
		// fullcalendar
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		$('.calendar').each(function() {
			$(this).fullCalendar({
				header: {
					left: 'prev,next',
					center: 'title',
					right: ' ',
                    editable: false,
                    droppable: false,
                    resizable: false
				},
                defaultEventMinutes: 30,
                defaultView: 'agendaWeek',
				editable: true,
				droppable: true,
                resizable: false,
                minTime: 6,
                maxTime: 24,
                eventAfterAllRender: function() {
                    $('.header-calendar-cont').appendTo('.fc-header-right');
                    $('.fc-event-hori.fc-event-end').appendTo
                },
				drop: function(date, allDay) { // this function is called when something is dropped
					
						// retrieve the dropped element's stored Event Object
						var originalEventObject = $(this).data('eventObject');
						
						// we need to copy it, so that multiple events don't have a reference to the same object
						var copiedEventObject = $.extend({}, originalEventObject);
						
						// assign it the date that was reported
						copiedEventObject.start = date;
						copiedEventObject.allDay = allDay;
						
						// render the event on the calendar
						// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
						$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
						
						// is the "remove after drop" checkbox checked?
						if ($('#drop-remove').is(':checked')) {
							// if so, remove the element from the "Draggable Events" list
							$(this).remove();
						}
						
					}


			});
		});
		$('.calendar .fc-button').addClass('btn').addClass('btn-info').addClass('btn-xs');
	},
	addDragEvent: function($this){
		// Documentation here:
		// http://arshaw.com/fullcalendar/docs/event_data/Event_Object/
		var eventObject = {
			title: $.trim($this.text()) // use the element's text as the event title
		};
		
		$this.data('eventObject', eventObject);
		
		$this.draggable({
			zIndex: 999,
			revert: true,
			revertDuration: 0  
		});
	},
	bindDragEvent: function () {
		$('.custom-events .bootstrap-tagsinput span').each(function() {
			proton.calendar.addDragEvent($(this));
		});
		$('.custom-events .bootstrap-tagsinput input').on('keyup', function(event, element) {
			// console.log('change: ' + element.val());
		});
	}
}