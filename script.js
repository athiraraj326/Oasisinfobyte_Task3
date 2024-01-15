const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("date").value;
    const priority = document.getElementById("priority").value;

    if (title && description && date && priority) {
        const task = {
            title,
            description,
            date,
            priority,
            completed: false
        };

        saveTask(task);

        taskForm.reset();

        loadTasks();
    } else {
        alert("Please fill in all fields.");
    }
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <span>${task.description}</span>
            <span>${task.date}</span>
            <span>${task.priority}</span>
            <button onclick="editTask('${task.title}')">Edit</button>
            <button onclick="deleteTask('${task.title}')">Delete</button>
            <button onclick="markComplete('${task.title}')">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
    });
}

function showCompletedTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const completedTasks = tasks.filter(task => task.completed);
    displayTasks(completedTasks);
}

function showIncompleteTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const incompleteTasks = tasks.filter(task => !task.completed);
    displayTasks(incompleteTasks);
}

function showAllTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    displayTasks(tasks);
}

function displayTasks(tasks) {
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}</span>
            <span>${task.date}</span>
            <span>${task.priority}</span>
            <button onclick="editTask('${task.title}')">Edit</button>
            <button onclick="deleteTask('${task.title}')">Delete</button>
            <button onclick="markComplete('${task.title}')">${task.completed ? 'Undo' : 'Complete'}</button>
        `;
        taskList.appendChild(li);
    });
}

function editTask(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskToEdit = tasks.find(task => task.title === title);

    if (taskToEdit) {
        document.getElementById("title").value = taskToEdit.title;
        document.getElementById("description").value = taskToEdit.description;
        document.getElementById("date").value = taskToEdit.date;
        document.getElementById("priority").value = taskToEdit.priority;

        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}
function deleteTask(title) {
    if (confirm(`Are you sure you want to delete the task: ${title}`)) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.title !== title);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        loadTasks();
    }
}

function markComplete(title) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.title === title) {
            task.completed = !task.completed;
        }
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}