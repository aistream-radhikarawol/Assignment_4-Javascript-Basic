// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter");

// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";


// Save tasks to localStorage
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}


// Display tasks
function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    // Apply filter
    if (currentFilter === "completed") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed === true;
        });

    } else if (currentFilter === "pending") {

        filteredTasks = tasks.filter(function(task) {
            return task.completed === false;
        });

    }


    // Show empty message
    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }


    // Create task elements
    filteredTasks.forEach(function(task) {

        const li = document.createElement("li");

        li.className = "task";

        if (task.completed) {
            li.classList.add("completed");
        }


        // Left section
        const leftSection = document.createElement("div");

        leftSection.className = "task-left";


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;


        checkbox.addEventListener("change", function() {

            toggleTask(task.id);

        });


        // Task text
        const span = document.createElement("span");

        span.className = "task-text";

        span.textContent = task.text;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "delete-btn";


        deleteButton.addEventListener("click", function() {

            deleteTask(task.id);

        });


        // Build task
        leftSection.appendChild(checkbox);

        leftSection.appendChild(span);

        li.appendChild(leftSection);

        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });

}


// Add new task
function addTask() {

    const text = taskInput.value.trim();


    // Check empty input
    if (text === "") {

        alert("Please enter a task.");

        return;

    }


    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    renderTasks();


    // Clear input
    taskInput.value = "";

    taskInput.focus();

}


// Delete task
function deleteTask(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;

    });

    saveTasks();

    renderTasks();

}


// Mark task complete / pending
function toggleTask(id) {

    tasks = tasks.map(function(task) {

        if (task.id === id) {

            task.completed = !task.completed;

        }

        return task;

    });

    saveTasks();

    renderTasks();

}


// Filter tasks
filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class
        filterButtons.forEach(function(btn) {

            btn.classList.remove("active");

        });


        // Add active class
        button.classList.add("active");


        // Get selected filter
        currentFilter = button.dataset.filter;


        renderTasks();

    });

});


// Add task when button is clicked
addBtn.addEventListener("click", addTask);


// Add task when Enter is pressed
taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Display saved tasks when page loads
renderTasks();