let labels = document.querySelectorAll(".clickable");
labels.forEach((label) => {
    label.addEventListener("click", () => {
        label.style.top = "3%";
        label.style.left = "0%";
        label.style.color = "#ED5B25";
        label.style.fontSize = "16px";
    });
});

// registerBox
let register = document.querySelector(".register");
register.addEventListener("click", () => {
    registerContainer.style.display = "flex";
    registerContainer.style.display.justifyContent = "center";
    registerContainer.style.display.alignItems = "center";
});

let register1 = document.querySelector("#register-alt");
register1.addEventListener("click", () => {
    registerContainer.style.display = "flex";
    registerContainer.style.display.justifyContent = "center";
    registerContainer.style.display.alignItems = "center";
});

const registerContainer = document.getElementById("registerContainer");
const registerAlt = document.getElementById("register-alt");

// to disapper register-box
const close_reg = document.getElementById("close-reg");
close_reg.addEventListener("click", () => {
    registerContainer.style.display = "none";
});

//to pop-up login box
let login = document.querySelector(".login");
login.addEventListener("click", () => {
    loginContainer.style.display = "flex";
});

//to diappear login-box
const close_login = document.getElementById("close-login");
close_login.addEventListener("click", () => {
    loginContainer.style.display = "none";
});

registerAlt.addEventListener("click", () => {
    loginContainer.style.display = "none";
});

//Book-trains
const book_train = document.querySelector(".opt_1");
const booking = document.querySelector(".booking");

book_train.addEventListener("click", () => {
    if (booking) {
        book_train.style.borderBottom = "3px solid #ED5B25";
        booking.style.display = "flex";
    }
});

document.addEventListener("click", (event) => {
    if (event.target !== book_train && !booking.contains(event.target)) {
        book_train.style.borderBottom = "none";
        booking.style.display = "none";
    }
});


//PNR status
const pnr_status = document.querySelector(".opt_2");
const check = document.querySelector(".pnr_status");
pnr_status.addEventListener("click", () => {
    if (check) {
        pnr_status.style.borderBottom = "3px solid #ED5B25";
        check.style.display = "flex";
    }
});

document.addEventListener("click", (event) => {
    if (event.target !== pnr_status && !check.contains(event.target)) {
        pnr_status.style.borderBottom = "none";
        check.style.display = "none";
    }
});

//Running status
const run_status = document.querySelector(".opt_3")
const check2 = document.querySelector(".running_status")
run_status.addEventListener("click", () => {
    if (check2) {
        run_status.style.borderBottom = "3px solid #ED5B25";
        check2.style.display = "flex";
    }
});

document.addEventListener("click", (event) => {
    if (event.target !== run_status && !check2.contains(event.target)) {
        run_status.style.borderBottom = "none";
        check2.style.display = "none";
    }
})

//Train details
const train_detail = document.querySelector(".opt_4")
const check3 = document.querySelector(".train_details")
train_detail.addEventListener("click", () => {
    if (check3) {
        train_detail.style.borderBottom = "3px solid #ED5B25";
        check3.style.display = "flex";
    }
});

document.addEventListener("click", (event) => {
    if (event.target !== train_detail && !check3.contains(event.target)) {
        train_detail.style.borderBottom = "none";
        check3.style.display = "none";
    }
})

const trainDetailsContainer = document.getElementById("trainDetailsContainer");

// Function to display train details
function displayTrainDetails(train) {
    const trainDetailsHtml = `
        <div class="train">
          <h3>${train.trainName}</h3>
          <p>Departure: ${train.departure}</p>
          <p>Arrival: ${train.arrival}</p>
          <!-- Add more details as needed -->
        </div>
      `;
    trainDetailsContainer.innerHTML = trainDetailsHtml;
}

// Function to handle the "Search Trains" button click
function searchTrains() {
    // Replace this with your actual logic to fetch train details based on user input
    const userSearchInput = document.getElementById("from").value; // Example: Replace with actual input field ID
    const dummyTrainDetails = {
        trainName: "Express 123",
        departure: "10:00 AM",
        arrival: "2:00 PM",
        // Add more details as needed
    };

    // Call the function to display train details
    displayTrainDetails(dummyTrainDetails);
}

// Add an event listener to the "Search Trains" button
const searchTrainsButton = document.querySelector(".search-train");
searchTrainsButton.addEventListener("click", searchTrains);