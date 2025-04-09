// /assets/js/calendar.js

document.addEventListener("DOMContentLoaded", () => {
    const days = document.querySelectorAll(".calendar-wednesday, .calendar-event");
    const eventDialog = document.getElementById("eventDialog");
    const eventContent = document.getElementById("eventContent");
    const bookingDialog = document.getElementById("bookingDialog");
    const bookingForm = document.getElementById("bookingForm");
  
    days.forEach(day => {
      if (day.classList.contains("calendar-past")) return;
  
      day.addEventListener("click", () => {
        const date = day.getAttribute("data-date");
        const events = day.getAttribute("data-events");
  
        if (events) {
          eventContent.innerHTML = `<p>${events}</p>`;
          eventDialog.showModal();
        } else {
          document.getElementById("slotDate").value = date;
          bookingDialog.showModal();
        }
      });
    });
  
    bookingForm.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value;
      const title = document.getElementById("title").value;
      const date = document.getElementById("slotDate").value;
  
      const issueTitle = encodeURIComponent(`LangLunch Booking: ${date}`);
      const body = encodeURIComponent(`**Name**: ${name}\n**Presentation Title**: ${title}\n**Preferred Date**: ${date}`);
  
      const url = `https://github.com/Learning-website-sample/aravind_website/issues/new?title=${issueTitle}&body=${body}`;
      window.open(url, '_blank');
      bookingDialog.close();
      e.preventDefault();
    });
  });
  