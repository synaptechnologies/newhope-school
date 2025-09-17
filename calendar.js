// This file contains the calendar functionality for the website
// You can edit the events array below to add, modify, or remove events

document.addEventListener('DOMContentLoaded', function() {
    // Events array - you can edit this to add, modify, or remove events
    const events = [
        {
            title: "First Day of School",
            date: "2023-09-10",
            time: "8:00 AM",
            description: "Welcome back to school for the 2023-2024 academic year!"
        },
        {
            title: "Parent-Teacher Meeting",
            date: "2023-09-25",
            time: "4:00 PM",
            description: "An opportunity for parents to meet with teachers and discuss their child's progress."
        },
        {
            title: "Mid-Term Examinations",
            date: "2023-10-15",
            time: "8:00 AM",
            description: "Mid-term examinations for all students."
        },
        {
            title: "Science Fair",
            date: "2023-11-05",
            time: "9:00 AM",
            description: "Annual science fair showcasing students' innovative projects."
        },
        {
            title: "Cultural Day",
            date: "2023-11-20",
            time: "10:00 AM",
            description: "Celebration of our diverse cultures through performances, food, and exhibitions."
        },
        {
            title: "End of Term Examinations",
            date: "2023-12-05",
            time: "8:00 AM",
            description: "End of term examinations for all students."
        },
        {
            title: "Christmas Concert",
            date: "2023-12-15",
            time: "5:00 PM",
            description: "Annual Christmas concert featuring performances by our students."
        },
        {
            title: "End of Term",
            date: "2023-12-20",
            time: "12:00 PM",
            description: "Last day of term before the Christmas break."
        },
        {
            title: "Beginning of Second Term",
            date: "2024-01-08",
            time: "8:00 AM",
            description: "First day of the second term."
        },
        {
            title: "Sports Day",
            date: "2024-02-15",
            time: "9:00 AM",
            description: "Annual sports day featuring various athletic competitions."
        }
    ];
    
    // Current date for calendar
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Function to display events on the homepage
    function displayEvents() {
        const eventsContainer = document.getElementById('events-container');
        
        if (!eventsContainer) return;
        
        // Clear existing content
        eventsContainer.innerHTML = '';
        
        // Get current date
        const today = new Date();
        
        // Filter upcoming events (events that are today or in the future)
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        }).slice(0, 3); // Show only the next 3 events
        
        // Display each event
        upcomingEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-time">
                        <i class="far fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                </div>
            `;
            
            eventsContainer.appendChild(eventCard);
        });
        
        // If no upcoming events, show a message
        if (upcomingEvents.length === 0) {
            eventsContainer.innerHTML = '<p>No upcoming events at the moment. Please check back later.</p>';
        }
    }
    
    // Function to generate calendar
    function generateCalendar(month, year) {
        const calendarGrid = document.getElementById('calendar-grid');
        const monthYearElement = document.getElementById('month-year');
        
        if (!calendarGrid || !monthYearElement) return;
        
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Set month and year in header
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        monthYearElement.textContent = `${monthNames[month]} ${year}`;
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Get first day of month and number of days in month
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Add empty cells for days before the first day of the month
        for (let i = firstDay; i > 0; i--) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = daysInPrevMonth - i + 1;
            dayElement.appendChild(dayNumber);
            calendarGrid.appendChild(dayElement);
        }
        
        // Add cells for each day of the month
        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            // Check if this day is today
            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayElement.classList.add('today');
            }
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);
            
            // Check if there are events on this day
            const dayEvents = events.filter(event => {
                const eventDate = new Date(event.date);
                return eventDate.getFullYear() === year && 
                       eventDate.getMonth() === month && 
                       eventDate.getDate() === day;
            });
            
            if (dayEvents.length > 0) {
                dayElement.classList.add('has-event');
                
                // Add event indicators
                dayEvents.slice(0, 2).forEach(event => {
                    const eventIndicator = document.createElement('div');
                    eventIndicator.className = 'event-indicator';
                    eventIndicator.textContent = event.title;
                    eventIndicator.title = `${event.title} - ${event.time}`;
                    dayElement.appendChild(eventIndicator);
                });
                
                // If there are more than 2 events, add a "+more" indicator
                if (dayEvents.length > 2) {
                    const moreIndicator = document.createElement('div');
                    moreIndicator.className = 'event-indicator';
                    moreIndicator.textContent = `+${dayEvents.length - 2} more`;
                    dayElement.appendChild(moreIndicator);
                }
            }
            
            calendarGrid.appendChild(dayElement);
        }
        
        // Add empty cells for days after the last day of the month
        const totalCells = calendarGrid.children.length - 7; // Subtract day headers
        const remainingCells = 42 - totalCells; // 6 rows x 7 days = 42 cells
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day other-month';
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayElement.appendChild(dayNumber);
            calendarGrid.appendChild(dayElement);
        }
    }
    
    // Function to display upcoming events list
    function displayUpcomingEvents() {
        const eventsList = document.getElementById('events-list');
        
        if (!eventsList) return;
        
        // Clear existing content
        eventsList.innerHTML = '';
        
        // Get current date
        const today = new Date();
        
        // Filter upcoming events (events that are today or in the future)
        const upcomingEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= today;
        });
        
        // Sort events by date
        upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Display each event
        upcomingEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-time">
                        <i class="far fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                </div>
            `;
            
            eventsList.appendChild(eventCard);
        });
        
        // If no upcoming events, show a message
        if (upcomingEvents.length === 0) {
            eventsList.innerHTML = '<p>No upcoming events at the moment. Please check back later.</p>';
        }
    }
    
    // Function to display past events list
    function displayPastEvents() {
        const pastEventsList = document.getElementById('past-events-list');
        
        if (!pastEventsList) return;
        
        // Clear existing content
        pastEventsList.innerHTML = '';
        
        // Get current date
        const today = new Date();
        
        // Filter past events (events that are before today)
        const pastEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate < today;
        });
        
        // Sort events by date (most recent first)
        pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        // Display each event
        pastEvents.forEach(event => {
            const eventDate = new Date(event.date);
            const formattedDate = eventDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';
            eventCard.innerHTML = `
                <div class="event-date">
                    <div class="day">${eventDate.getDate()}</div>
                    <div class="month">${eventDate.toLocaleDateString('en-US', { month: 'short' })}</div>
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <div class="event-time">
                        <i class="far fa-clock"></i>
                        <span>${event.time}</span>
                    </div>
                </div>
            `;
            
            pastEventsList.appendChild(eventCard);
        });
        
        // If no past events, show a message
        if (pastEvents.length === 0) {
            pastEventsList.innerHTML = '<p>No past events to display.</p>';
        }
    }
    
    // Calendar navigation
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const currentMonthBtn = document.getElementById('current-month');
    
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    if (currentMonthBtn) {
        currentMonthBtn.addEventListener('click', function() {
            currentMonth = currentDate.getMonth();
            currentYear = currentDate.getFullYear();
            generateCalendar(currentMonth, currentYear);
        });
    }
    
    // Call the functions to display events and calendar
    displayEvents();
    generateCalendar(currentMonth, currentYear);
    displayUpcomingEvents();
    displayPastEvents();
    
    // Function to format date for display
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Function to add a new event (you can call this function from the browser console)
    window.addEvent = function(title, date, time, description) {
        events.push({
            title: title,
            date: date,
            time: time,
            description: description
        });
        
        // Sort events by date
        events.sort((a, b) => new Date(a.date) - new Date(b.date));
        
        // Refresh the displays
        displayEvents();
        generateCalendar(currentMonth, currentYear);
        displayUpcomingEvents();
        displayPastEvents();
        
        console.log('Event added successfully!');
    };
    
    // Function to remove an event by index (you can call this function from the browser console)
    window.removeEvent = function(index) {
        if (index >= 0 && index < events.length) {
            events.splice(index, 1);
            displayEvents();
            generateCalendar(currentMonth, currentYear);
            displayUpcomingEvents();
            displayPastEvents();
            console.log('Event removed successfully!');
        } else {
            console.log('Invalid event index!');
        }
    };
    
    // Function to list all events (you can call this function from the browser console)
    window.listEvents = function() {
        console.log('All Events:');
        events.forEach((event, index) => {
            console.log(`${index}: ${event.title} - ${formatDate(event.date)} at ${event.time}`);
        });
    };
    
    // Instructions for editing events (displayed in console)
    console.log('Calendar Instructions:');
    console.log('To add a new event, use: addEvent("Title", "YYYY-MM-DD", "HH:MM AM/PM", "Description")');
    console.log('To remove an event, use: removeEvent(index)');
    console.log('To list all events, use: listEvents()');
    console.log('Current events:');
    listEvents();
});