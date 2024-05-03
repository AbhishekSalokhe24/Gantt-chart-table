
let tableBody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];


// Retrieve tasks array from local storage or create an empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];



// {
//     start: '2018-10-01',
//     end: '2018-10-08',
//     name: 'Redesign website',
//     id: "Task 0",
//     group_id: "design",
//     progress: 20
//   },


// start: '2018-10-03',
// end: '2018-10-06',
// name: 'Write new content',
// id: "Task 1",
// group_id: "development",
// progress: 5,
// dependencies: 'Task 0'



if(Object.keys(tasks).length > 0){
    var gantt_chart = new Gantt(".gantt-target", tasks, {
        header_height: 50,
        column_width: 100,
        step: 24,
        view_modes: ["Quarter Day", "Half Day", "Day", "Week", "Month"],
        bar_height: 25,
        bar_corner_radius: 5,
        arrow_curve: 5,
        padding: 20,
        // view_mode: "Day",
        date_format: "DD-MM-YYYY",
        // language: "en", // or 'es', 'it', 'ru', 'ptBr', 'fr', 'tr', 'zh', 'de', 'hu'
        custom_popup_html: null,
        groups: [
            {
                id: 'design',
                name: 'Web Design',
                bar_class: 'bar-design'
            },
            {
                id: 'development',
                name: 'Development',
                bar_class: 'bar-development'
            },
            {
                id: 'integration',
                name: 'Integration & Deployment',
                bar_class: 'bar-integration'
            }
        ],
        // on_click: function (task) {
        //     console.log(task);
        // },
        // on_dependency_added: function (task) {
        //     console.log("added dependency to: " + task);
        // },
        // on_dependency_removed: function (task) {
        //     console.log("removed dependency from: " + task);
        // },
        // on_date_change: function (task, start, end) {
        //     console.log(task, start, end);
        // },
        // on_progress_change: function (task, progress) {
        //     console.log(task, progress);
        // },
        // on_view_change: function (mode) {
        //     console.log(mode);
        // },
        // view_mode: 'Month',
        view_mode: 'Day',
        language: 'en'
    });
}




// Function to update Gantt chart view mode
function updateViewMode() {
    var viewModeSelect = document.getElementById("viewModeSelect");
    var selectedViewMode = viewModeSelect.options[viewModeSelect.selectedIndex].value;
    gantt_chart.change_view_mode(selectedViewMode);
}

// Event listener for view mode selector change
document.getElementById("viewModeSelect").addEventListener("change", updateViewMode);





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
        name: taskName,
        start: formattedStartDate,
        Duration: Duration,
        end: formattedEndDate,
        id: 1,
        group_id: "development",
        progress: 5,
        dependencies: 'Task 0'
    };


    // Retrieve tasks array from local storage or create an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Add the new task to the tasks array
    tasks.push(task);

    // Save the tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Populate the table with the tasks
    populateTable(task);


    // Reload the page
// location.reload();

gantt_chart.refresh(tasks);

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
        <td><input class="gant-input" type="text" value="${task.name}"></td>
        <td><input class="gant-input" type="date" value="${task.start}" ></td>
        <td><input class="gant-input" id="${endDateFormatId}" type="date" value="${task.end}" ></td>
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

    let ED = calculateEndDate(task.start, tempVar);

    // Update task's Duration and endDate properties
    task.Duration = tempVar;
    task.end = ED;

    // Retrieve tasks array from local storage or create an empty array
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Update the corresponding task in the tasks array
    tasks = tasks.map(item => item.name === task.name ? task : item);

    // Save the updated tasks array back to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    let endDateField = row.querySelector("#" + endDateFormatId);
    endDateField.value = ED;

    gantt_chart.refresh(tasks);
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





