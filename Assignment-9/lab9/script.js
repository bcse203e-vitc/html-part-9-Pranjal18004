document.addEventListener("DOMContentLoaded", () => {
    const bookButtons = document.querySelectorAll(".book-btn");
    const modal = document.getElementById("appointmentModal");
    const closeModal = document.getElementById("closeModal");
    const appointmentForm = document.getElementById("appointmentForm");
    const appointmentsList = document.getElementById("appointmentsList");
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    appointmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const datetime = document.getElementById("datetime").value;
        const terms = document.getElementById("terms").checked;
        if (!name || !email || !phone || !service || !datetime || !terms) {
            alert("Please fill in all required fields and agree to the terms.");
            return;
        }
        
        if (!/^[a-zA-Z ]+$/.test(name)) {
            alert("Invalid name format.");
            return;
        }
        
        if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            alert("Invalid email format.");
            return;
        }
        
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone number must be 10 digits.");
            return;
        }
        const appointment = { name, email, phone, service, datetime, status: "Pending" };
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        modal.style.display = "none";
        alert(`Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`);
        displayAppointments();
    });
    function displayAppointments() {
        appointmentsList.innerHTML = "";
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.forEach((appointment) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `${appointment.name} - ${appointment.service} - ${appointment.datetime} - <strong>${appointment.status}</strong>`;
            appointmentsList.appendChild(listItem);
        });
    }

    displayAppointments();
});
