let user = null;
let appointments = [];
let doctorSchedule = {
    'Dr. Smith': ['9:00 AM', '10:00 AM', '11:00 AM'],
    'Dr. Brown': ['9:30 AM', '11:00 AM', '1:00 PM'],
    'Dr. Lee': ['10:00 AM', '11:30 AM', '2:00 PM']
};

// User Authentication
function login() {
    const username = document.getElementById("username").value;
    if (username) {
        user = username;
        document.getElementById("authSection").style.display = "none";
        document.getElementById("appointmentSection").style.display = "block";
        updateAvailableSlots();
    } else {
        alert("Please enter your name.");
    }
}

// Update available time slots based on selected doctor
function updateAvailableSlots() {
    const doctor = document.getElementById("doctor").value;
    const timeSelect = document.getElementById("time");
    timeSelect.innerHTML = '';

    doctorSchedule[doctor].forEach(slot => {
        const option = document.createElement("option");
        option.value = slot;
        option.textContent = slot;
        timeSelect.appendChild(option);
    });
}

// Book an appointment
function bookAppointment() {
    const doctor = document.getElementById("doctor").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const patientName = document.getElementById("patientName").value;

    if (doctor && date && time && patientName) {
        const appointment = { doctor, date, time, patientName };
        appointments.push(appointment);

        // Display appointment in list
        const listItem = document.createElement("li");
        listItem.innerHTML = `${patientName} has an appointment with ${doctor} on ${date} at ${time}`;
        document.getElementById("appointmentsList").appendChild(listItem);

        // Add to calendar
        $('#calendar').fullCalendar('renderEvent', {
            title: `${patientName} - ${doctor}`,
            start: `${date}T${time}`,
            allDay: false
        });

        // Send reminder (simulated)
        setTimeout(() => {
            alert(`Reminder: Your appointment with ${doctor} is scheduled for ${date} at ${time}.`);
        }, 5000); // reminder after 5 seconds for demo purposes

        // Reset form
        document.getElementById("appointmentForm").reset();
    } else {
        alert("Please fill in all fields.");
    }
}

// Simulate payment process
function simulatePayment() {
    document.getElementById("paymentStatus").textContent = "Payment successful!";
}

// View appointment history
function viewAppointmentHistory() {
    const historyList = document.getElementById("appointmentHistoryList");
    historyList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Appointment #${index + 1}: ${appointment.patientName} with ${appointment.doctor} on ${appointment.date} at ${appointment.time}`;
        historyList.appendChild(listItem);
    });
}

// Initialize calendar
$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: [],
        editable: true,
        droppable: true
    });
});
