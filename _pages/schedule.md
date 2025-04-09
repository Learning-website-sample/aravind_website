---
layout: page
title: Schedule
permalink: /schedule/
---

# LangLunches Schedule

All sessions are held on Tuesdays at 12:00 and 12:30.

<div class="calendar-legend">
    <div class="legend-item">
        <div class="legend-color" style="background: #e6ffe6;"></div>
        <span>Available Tuesday</span>
    </div>
    <div class="legend-item">
        <div class="legend-color" style="background: #90EE90;"></div>
        <span>One Booking</span>
    </div>
    <div class="legend-item">
        <div class="legend-color" style="background: #ff6b6b;"></div>
        <span>Fully Booked</span>
    </div>
</div>

<div class="calendar-container">
    <div class="calendar-grid">
        {% assign current_date = site.time | date: "%Y-%m-%d" %}
        {% assign current_year = current_date | date: "%Y" %}
        {% assign current_month = current_date | date: "%m" | plus: 0 %}
        
        {% for month_offset in (0..5) %}
            {% assign month = current_month | plus: month_offset %}
            {% if month > 12 %}
                {% assign month = month | minus: 12 %}
                {% assign year = current_year | plus: 1 %}
            {% else %}
                {% assign year = current_year %}
            {% endif %}
            
            {% assign month_start_date = year | append: "-" | append: month | append: "-01" %}
            {% assign month_start_timestamp = month_start_date | date: "%s" | plus: 0 %}
            {% assign days_in_month = month_start_timestamp | date: "%t" | plus: 0 %}
            {% assign first_day = month_start_date | date: "%w" | plus: 0 %}
            
            <div class="month-container">
                <h3>{{ month_start_date | date: "%B %Y" }}</h3>
                <div class="calendar-grid">
                    <div class="calendar-header">Sun</div>
                    <div class="calendar-header">Mon</div>
                    <div class="calendar-header">Tue</div>
                    <div class="calendar-header">Wed</div>
                    <div class="calendar-header">Thu</div>
                    <div class="calendar-header">Fri</div>
                    <div class="calendar-header">Sat</div>
                    
                    {% for i in (1..first_day) %}
                        <div class="calendar-empty"></div>
                    {% endfor %}
                    
                    {% for day in (1..days_in_month) %}
                        {% assign current_day = month_start_date | date: "%s" | plus: 86400 | times: forloop.index0 | date: "%Y-%m-%d" %}
                        {% assign day_of_week = current_day | date: "%w" | plus: 0 %}
                        {% assign is_tuesday = day_of_week == 2 %}
                        {% assign is_past = current_day < current_date %}
                        
                        {% assign day_events = site.data.events.events | where: "date", current_day | first %}
                        {% assign has_events = day_events != nil %}
                        {% assign is_full = has_events and day_events.slots.size >= 2 %}
                        
                        <div class="calendar-day {% if is_tuesday and not is_past %}calendar-tuesday{% endif %} {% if has_events %}calendar-event{% endif %} {% if is_full %}calendar-full{% endif %} {% if is_past %}calendar-past{% endif %}"
                             data-date="{{ current_day }}"
                             {% if has_events %}
                             data-events="{% for slot in day_events.slots %}{% if slot.title %}<b>Presentation:</b> {{ slot.title }} by {{ slot.speaker }}{% if forloop.index < day_events.slots.size %}<br>{% endif %}{% endif %}{% endfor %}"
                             {% endif %}>
                            {{ day }}
                        </div>
                    {% endfor %}
                </div>
            </div>
        {% endfor %}
    </div>
</div>

<dialog id="eventDialog">
    <div id="eventContent"></div>
    <button type="button" onclick="this.closest('dialog').close()">Close</button>
</dialog>

<dialog id="bookingDialog">
    <div id="bookingContent"></div>
    <form id="bookingForm" action="https://github.com/Learning-website-sample/aravind_website/issues/new" method="get" target="_blank">
        <input type="hidden" id="slotDate" name="slotDate">
        <div class="form-group">
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="title">Presentation Title:</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div class="form-group">
            <button type="submit">Submit Booking Request</button>
            <button type="button" onclick="this.closest('dialog').close()">Cancel</button>
        </div>
    </form>
</dialog>

<style>
.calendar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin-bottom: 30px;
}

.calendar-header {
    text-align: center;
    font-weight: bold;
    padding: 10px;
    background: #f0f0f0;
}

.calendar-day {
    text-align: center;
    padding: 10px;
    border: 1px solid #ddd;
    background: #f9f9f9;
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.calendar-tuesday {
    background: #e6ffe6;
    cursor: pointer;
}

.calendar-tuesday:hover {
    background: #d4ffd4;
}

.calendar-event {
    background: #90EE90;
    cursor: pointer;
}

.calendar-event:hover {
    background: #7fdd7f;
}

.calendar-full {
    background: #ff6b6b;
    cursor: pointer;
}

.calendar-full:hover {
    background: #ff5252;
}

.calendar-past {
    background: #f0f0f0;
    color: #999;
    cursor: not-allowed;
}

.calendar-empty {
    background: #f9f9f9;
}

.month-container {
    margin-bottom: 40px;
}

.month-container h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

dialog {
    padding: 20px;
    border-radius: 5px;
    border: 1px solid #ddd;
    max-width: 500px;
    width: 90%;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

button {
    padding: 8px 16px;
    background: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
}

button:hover {
    background: #45a049;
}

.calendar-legend {
    display: flex;
    gap: 20px;
    margin: 20px auto;
    justify-content: center;
    max-width: 1200px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 4px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.legend-color {
    width: 20px;
    height: 20px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const eventDialog = document.getElementById('eventDialog');
    const bookingDialog = document.getElementById('bookingDialog');
    const eventContent = document.getElementById('eventContent');
    const bookingContent = document.getElementById('bookingContent');
    const bookingForm = document.getElementById('bookingForm');
    const slotDateInput = document.getElementById('slotDate');
    let selectedDate = null;

    // Load events from Jekyll's data
    function loadEvents() {
        try {
            const events = {{ site.data.events.events | jsonify }};
            return events || [];
        } catch (error) {
            console.error('Error loading events:', error);
            return [];
        }
    }

    // Format date for display
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Handle clicks on calendar days
    document.querySelectorAll('.calendar-tuesday, .calendar-event, .calendar-full').forEach(day => {
        day.addEventListener('click', function() {
            const date = this.getAttribute('data-date');
            const events = this.getAttribute('data-events');
            const allEvents = loadEvents();
            const dayEvents = allEvents.find(e => e.date === date);
            
            if (dayEvents && dayEvents.slots.length >= 2) {
                // Show event details for full days
                eventContent.innerHTML = `
                    <h3>Events on ${formatDate(date)}</h3>
                    <div class="event-details">
                        ${events}
                    </div>
                `;
                eventDialog.showModal();
                return;
            }
            
            if (events) {
                // Show event details and booking form for days with one booking
                bookingContent.innerHTML = `
                    <h3>Current Events on ${formatDate(date)}</h3>
                    <div class="event-details">
                        ${events}
                    </div>
                    <hr>
                    <h3>Book an Additional Slot</h3>
                    <p>There is still one slot available on this day.</p>
                `;
                bookingDialog.showModal();
                selectedDate = date;
                slotDateInput.value = date;
            } else {
                // Show booking form for empty days
                bookingContent.innerHTML = `
                    <h3>Book a Presentation Slot</h3>
                    <p>Date: ${formatDate(date)}</p>
                    <p>Time: 12:00 PM - 12:30 PM</p>
                `;
                bookingDialog.showModal();
                selectedDate = date;
                slotDateInput.value = date;
            }
        });
    });

    // Handle booking form submission
    bookingForm.addEventListener('submit', function(e) {
        const formData = new FormData(this);
        const date = formData.get('slotDate');
        const name = formData.get('name');
        const title = formData.get('title');
        
        // Create GitHub issue title and body
        const issueTitle = `Booking Request: ${title} on ${formatDate(date)}`;
        const issueBody = `## Booking Request\n\n` +
            `- **Date:** ${formatDate(date)}\n` +
            `- **Time:** 12:00 PM - 12:30 PM\n` +
            `- **Speaker:** ${name}\n` +
            `- **Title:** ${title}\n\n` +
            `Please review this booking request and update the events data file accordingly.`;
        
        // Set the form action with the issue parameters
        this.action = `https://github.com/Learning-website-sample/aravind_website/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=booking-request`;
    });

    // Handle dialog close buttons
    document.querySelectorAll('dialog button[type="button"]').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('dialog').close();
        });
    });
});
</script>
