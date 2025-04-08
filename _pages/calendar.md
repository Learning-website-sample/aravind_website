---
layout: page
title: Schedule
permalink: /calendar/
---

<div class="calendar-container">
  <iframe 
    src="https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID&ctz=Europe%2FBerlin&mode=WEEK&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&showTz=0&height=600" 
    style="border:solid 1px #777" 
    width="100%" 
    height="600" 
    frameborder="0" 
    scrolling="no">
  </iframe>
</div>

<div class="booking-modal" id="bookingModal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <h2>Book a Presentation Slot</h2>
    <form id="bookingForm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="title">Presentation Title:</label>
        <input type="text" id="title" name="title" required>
      </div>
      <div class="form-group">
        <label for="abstract">Brief Abstract:</label>
        <textarea id="abstract" name="abstract" required></textarea>
      </div>
      <input type="hidden" id="slotDate" name="slotDate">
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css' rel='stylesheet' />
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'></script>

<style>
.calendar-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 20px;
}

.booking-modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 5px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    slotMinTime: '12:00:00',
    slotMaxTime: '13:00:00',
    allDaySlot: false,
    events: '/data/schedule.json',
    eventClick: function(info) {
      if (!info.event.extendedProps.booked) {
        document.getElementById('slotDate').value = info.event.start.toISOString();
        document.getElementById('bookingModal').style.display = 'block';
      }
    }
  });
  calendar.render();

  // Modal handling
  var modal = document.getElementById('bookingModal');
  var span = document.getElementsByClassName('close')[0];
  
  span.onclick = function() {
    modal.style.display = 'none';
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  }

  // Form submission
  document.getElementById('bookingForm').onsubmit = function(e) {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    // For now, we'll just close the modal
    modal.style.display = 'none';
    alert('Thank you for your submission! We will contact you shortly.');
  }
});
</script> 