---
layout: page
title: Schedule
permalink: /calendar/
---

<div class="calendar-container">
  <div id="calendar"></div>
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
        <label for="title">Presentation Title:</label>
        <input type="text" id="title" name="title" required>
      </div>
      <input type="hidden" id="slotDate" name="slotDate">
      <input type="hidden" id="slotTime" name="slotTime">
      <button type="submit">Submit</button>
    </form>
  </div>
</div>

<link href='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.css' rel='stylesheet' />
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@5.11.3/main.min.js'></script>

<style>
.calendar-container { max-width: 1200px; margin: 20px auto; padding: 0 20px; }
.booking-modal { display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.4); }
.modal-content { background-color: #fefefe; margin: 15% auto; padding: 20px; border: 1px solid #888; width: 80%; max-width: 500px; border-radius: 5px; }
.close { color: #aaa; float: right; font-size: 28px; font-weight: bold; cursor: pointer; }
.form-group { margin-bottom: 15px; }
.form-group label { display: block; margin-bottom: 5px; }
.form-group input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
button { background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
button:hover { background-color: #45a049; }
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  fetch('/data/slots.yml')
    .then(response => response.text())
    .then(yaml => {
      const slots = jsyaml.load(yaml).slots;
      const events = slots.map(slot => ({
        title: slot.speaker ? `${slot.speaker}: ${slot.title}` : 'Available',
        start: `${slot.date}T${slot.time}`,
        end: `${slot.date}T${slot.time}`,
        backgroundColor: slot.speaker ? '#4CAF50' : '#ff9800',
        extendedProps: {
          booked: !!slot.speaker,
          date: slot.date,
          time: slot.time
        }
      }));

      var calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
        initialView: 'dayGridMonth',
        headerToolbar: { left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek' },
        slotMinTime: '12:00:00',
        slotMaxTime: '13:00:00',
        allDaySlot: false,
        events: events,
        eventClick: function(info) {
          if (!info.event.extendedProps.booked) {
            document.getElementById('slotDate').value = info.event.extendedProps.date;
            document.getElementById('slotTime').value = info.event.extendedProps.time;
            document.getElementById('bookingModal').style.display = 'block';
          }
        }
      });
      calendar.render();
    });

  // Modal handling
  document.querySelector('.close').onclick = () => document.getElementById('bookingModal').style.display = 'none';
  window.onclick = (event) => { if (event.target == document.getElementById('bookingModal')) document.getElementById('bookingModal').style.display = 'none'; }

  // Form submission
  document.getElementById('bookingForm').onsubmit = function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = {
      date: formData.get('slotDate'),
      time: formData.get('slotTime'),
      speaker: formData.get('name'),
      title: formData.get('title')
    };
    // Here you would send this to your backend
    document.getElementById('bookingModal').style.display = 'none';
    alert('Thank you for your submission! We will contact you shortly.');
  }
});
</script> 