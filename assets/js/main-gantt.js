
  // Load tasks from local storage
// var tasks = loadTasksFromLocalStorage();
var tasks = [
  {
    start: '2018-10-01',
    end: '2018-10-08',
    name: 'Redesign website',
    id: "Task 0",
    group_id: "design",
    progress: 20
  },
  {
    start: '2018-10-03',
    end: '2018-10-06',
    name: 'Write new content',
    id: "Task 1",
    group_id: "development",
    progress: 5,
    dependencies: 'Task 0'
  },
  {
    start: '2018-10-04',
    end: '2018-10-08',
    name: 'Apply new styles',
    id: "Task 2",
    group_id: "development",
    progress: 10,
    dependencies: 'Task 1'
  },
  {
    start: '2018-10-08',
    end: '2018-10-09',
    name: 'Review',
    id: "Task 3",
    group_id: "integration",
    progress: 5,
    dependencies: 'Task 2'
  },
  {
    start: '2018-10-08',
    end: '2018-10-10',
    name: 'Deploy',
    id: "Task 4",
    group_id: "integration",
    progress: 0,
    dependencies: 'Task 2'
  },
  {
    start: '2018-10-11',
    end: '2018-10-11',
    name: 'Go Live!',
    id: "Task 5",
    group_id: "integration",
    progress: 0,
    dependencies: 'Task 4',
    custom_class: 'bar-milestone'
  }
]
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
console.log(gantt_chart);



// Function to update Gantt chart view mode
function updateViewMode() {
    var viewModeSelect = document.getElementById("viewModeSelect");
    var selectedViewMode = viewModeSelect.options[viewModeSelect.selectedIndex].value;
    gantt_chart.change_view_mode(selectedViewMode);
}

// Event listener for view mode selector change
document.getElementById("viewModeSelect").addEventListener("change", updateViewMode);



// // Function to convert table cell to input on click
// function toggleCellEditMode(cell) {
//     if (!cell.querySelector('input')) {
//       var value = cell.textContent.trim();
//       cell.innerHTML = '<input type="text" value="' + value + '">';
//     }
//   }

//   // Event listener for table cell click
//   document.getElementById("taskTable").addEventListener("click", function(event) {
//     var target = event.target;
//     if (target.classList.contains("editable")) {
//       toggleCellEditMode(target);
//     }
//   });

//   // Event listener for edit button click
//   document.getElementById("taskTable").addEventListener("click", function(event) {
//     var target = event.target;
//     if (target.classList.contains("edit-btn")) {
//       var row = target.closest("tr");
//       var cells = row.querySelectorAll(".editable");
//       cells.forEach(function(cell) {
//         toggleCellEditMode(cell);
//       });
//     }
//   });


 // Function to dynamically populate table with tasks
 function populateTable(tasks) {
    var tableBody = document.getElementById("taskTable").getElementsByTagName('tbody')[0];
    tasks.forEach(function(task) {
      var row = document.createElement("tr");
      row.innerHTML = `
        <td><input class="gant-input" type="text" value="${task.name}"></td>
        <td><input class="gant-input" type="date" value="${task.start}"></td>
        <td><input class="gant-input" type="date" value="${task.end}"></td>
        <td><input class="gant-input" type="text" value="${task.duration}"></td>
        <td><input class="gant-input" type="text" value="${task.predecessors}"></td>
        <td>
          <button class="button" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <span class="button__icon"><svg class="svg" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><line x1="12" x2="12" y1="5" y2="19"></line><line x1="5" x2="19" y1="12" y2="12"></line></svg></span>
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Call function to populate table with tasks
  populateTable(tasks);





   // Function to save tasks array to local storage
   function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Function to load tasks array from local storage
  function loadTasksFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
  }


  // Function to update Gantt chart with new tasks
  function updateGanttChart() {
    // Code to update Gantt chart with tasks
    console.log('Gantt chart updated with new task');
  }

  // Event listener for clicking the "Save changes" button
  document.getElementById("save-task-btn").addEventListener("click", function() {
    debugger
    var taskName = document.getElementById("task-name").value;
    // var taskDescr = document.getElementById("task-descr").value.trim();
    var startDate = new Date(document.getElementById("start-date").value);
    var duration = parseInt(document.getElementById("task-duration").value);

    // Calculate end date based on start date and duration
    var endDate = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000); // Add duration in milliseconds

    // Create a new task object
    var newTask = {
      start: startDate.toISOString().split('T')[0],
      end: endDate.toISOString().split('T')[0],
      name: taskName,
      id: "Task " + (tasks.length), // Generate a unique ID for the task
      group_id: "design", // Example group ID, you can customize this
      progress: 0, // Set initial progress
    //   description: taskDescr // Add description if needed
    };

    // Add the new task to the tasks array
    tasks.push(newTask);

    // Save the updated tasks array to local storage
    saveTasksToLocalStorage(tasks);

    // Update the Gantt chart with the new task
    updateGanttChart();

    location.reload();
  });