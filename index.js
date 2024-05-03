
let tableBody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];


// Retrieve tasks array from local storage or create an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add the new task to the tasks array
tasks.push(tasks);

// Event listener for clicking the "Save changes" button
document.getElementById("save-task-btn").addEventListener("click", function() {
    // Retrieve the values from the input fields
    let taskName = document.getElementById("task-name").value;
    let startDate = new Date(document.getElementById("start-date").value);
    let Duration = parseInt(document.getElementById("task-duration").value);

    // Calculate the end date
    let endDate = new Date(startDate.getTime() + Duration * 24 * 60 * 60 * 1000);

    // Format start date, end date, and duration
    let formattedStartDate = formatDate(startDate);
    let formattedEndDate = formatDate(endDate);

    // Store task details in an object
    let task = {
        taskName: taskName,
        startDate: formattedStartDate,
        Duration: Duration,
        endDate: formattedEndDate
    };


    // Retrieve tasks array from local storage or create an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Populate the table with the tasks
    populateTable(task);
});


// Function to format date in YYYY-MM-DD format
function formatDate(date) {
    // Get day, month, and year components
    let day = date.getDate();
    let month = date.getMonth() + 1; // Month is zero-based, so we add 1
    let year = date.getFullYear();

    // Pad single digit day and month with leading zero
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    // Construct formatted date string in YYYY-MM-DD format
    return `${year}-${month}-${day}`;
}


// Function to populate table with tasks
function populateTable(task) {
    let row = document.createElement("tr");
    let endDateFormatId = "end-date-" + Date.now();
    row.innerHTML = `
        <td><input class="gant-input" type="text" value="${task.taskName}"></td>
        <td><input class="gant-input" type="date" value="${task.startDate}" readonly></td>
        <td><input class="gant-input" id="${endDateFormatId}" type="date" value="${task.endDate}" readonly></td>
        <td>
            <input class="gant-input durationInput" type="number" value="${task.Duration}"><span>- Days</span>
        </td>
        <td><input class="gant-input" type="text" value=""></td>
        <td>
            <button class="button" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
            </button>
        </td>
    `;

    tableBody.appendChild(row);

    let durationField = row.querySelector(".durationInput");

    durationField.addEventListener('input', function(event) {
    // Access the task object through closure
    let tempVar = parseInt(event.target.value);

    // Ensure the input is within the range 0 to 100
    if (tempVar == 0) {
       alert("Duration must be grater than 0");
    } 

    let ED = calculateEndDate(task.startDate, tempVar);

    // Update task's Duration and endDate properties
    task.Duration = tempVar;
    task.endDate = ED;

    // Retrieve tasks array from local storage or create an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the corresponding task in the tasks array
    tasks = tasks.map(item => item.taskName === task.taskName ? task : item);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    let endDateField = row.querySelector("#" + endDateFormatId);
    endDateField.value = ED;
});

}

// Function to calculate end date
function calculateEndDate(startDate, days) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(startDateObj.getTime() + days * 24 * 60 * 60 * 1000);
    const year = endDateObj.getFullYear();
    const month = String(endDateObj.getMonth() + 1).padStart(2, '0');
    const day = String(endDateObj.getDate()).padStart(2, '0');
    const endDate = `${year}-${month}-${day}`;
    return endDate;
}   

// Load tasks from local storage when the page loads
window.addEventListener('load', function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => populateTable(task));
});





