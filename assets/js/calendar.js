document.addEventListener('DOMContentLoaded', function() {
    const eventDialog = document.getElementById('eventDialog');
    const bookingDialog = document.getElementById('bookingDialog');
    const eventContent = document.getElementById('eventContent');
    const bookingContent = document.getElementById('bookingContent');
    const bookingForm = document.getElementById('bookingForm');
    const slotDateInput = document.getElementById('slotDate');

    // Add click handlers to calendar days
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.addEventListener('click', function() {
            const date = this.dataset.date;
            const events = this.dataset.events;
            const isPast = this.classList.contains('calendar-past');
            const isFull = this.classList.contains('calendar-full');
            const isWednesday = this.classList.contains('calendar-wednesday');

            if (isPast) {
                return; // Don't allow booking past dates
            }

            if (events) {
                // Show existing events
                eventContent.innerHTML = `<h3>${date}</h3><p>${events}</p>`;
                eventDialog.showModal();
            } else if (isWednesday && !isFull) {
                // Show booking dialog for available Wednesdays
                bookingContent.innerHTML = `<h3>Book a slot for ${date}</h3>`;
                slotDateInput.value = date;
                bookingDialog.showModal();
            }
        });
    });

    // Handle form submission
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const title = formData.get('title');
        const name = formData.get('name');
        const date = formData.get('slotDate');
        
        // Create the issue body
        const body = `## Booking Request\n\nDate: ${date}\nSpeaker: ${name}\nTitle: ${title}`;
        
        // Update the form action with the body
        this.action = `${this.action}?title=Booking%20Request%20for%20${date}&body=${encodeURIComponent(body)}`;
        
        // Submit the form
        this.submit();
    });
}); 