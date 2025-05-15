const openFormBtn = document.getElementById("openForm");
const closeFormBtn = document.getElementById("closeForm");
const taskForm = document.getElementById("taskForm");
const saveBtn = document.getElementById("guardar-btn");
const txt = document.getElementById("taskName");
const descriptionTxt = document.getElementById("taskDescription");
const taskDifficulty = document.getElementById("taskDifficulty");
const taskFrequency = document.getElementById("taskFrequency");
const taskCategory = document.getElementById("taskCategory");
const taskStatus = document.getElementById("statusTask");
var taskList = {//id : {name, description, status}
    "x" : {"name": "x", "description": "x", "status": "x"},
    "y" : {"name": "y", "description": "y", "status": "y"},
}
const guardarBtn = document.getElementById("guardar-btn");

openFormBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);
saveBtn.addEventListener("click", guardarTarea);
function openForm() {
    taskForm.classList.remove("hidden");
}

function closeForm() {
    taskForm.classList.add("hidden");
}
function TaskModel(id, name, description) {
    var task = "<div class='task' id='" + id + "'>" +
        "<h3>" + name + "</h3>" +
        "<p>" + description + "</p>" +
        "<button class='delete-btn' onclick='deleteTask(" + id + ")'>Delete</button>" +
        "<button class='edit-btn' onclick='editTask(" + id + ")'>Edit</button>" +
        "</div>";
    return task;
}
function guardarTarea() {
    var taskName = txt.value;
    var taskDescription = descriptionTxt.value;
    var taskStatusValue = taskStatus.value;
    
    if (taskName && taskDescription && taskStatusValue) {
        const newTask = {
            name: taskName,
            description: taskDescription,
            status: taskStatusValue
        };
        const taskId = Date.now(); // Unique ID for the task
        taskList[taskId] = newTask;
        console.log(taskList);
        closeForm();
        agregarTarea(taskId, newTask);
        // Clear the form fields
        txt.value = "";
        descriptionTxt.value = "";
    } else {
        alert("Please fill in all fields.");
    }
}
function agregarTarea(id, tarea){
    //tarea = id : {name, description, status}
    switch (tarea.status) {
        case "pendiente":
            // Add to pending tasks
            document.getElementById("pending-tasks").innerHTML += TaskModel(id, tarea.name, tarea.description);
            break;
        case "en-curso":
            // Add to in-progress tasks
            document.getElementById("in-progress-tasks").innerHTML += TaskModel(id, tarea.name, tarea.description);
            break;
        case "completada":
            // Add to completed tasks
            document.getElementById("completed-tasks").innerHTML += TaskModel(id, tarea.name, tarea.description);
            break;
        default:
            console.error("Invalid task status:", tarea.status);
    }
}
function deleteTask(id) {
    // Remove task from taskList
    delete taskList[id];
    // Remove task from the DOM
    const taskElement = document.getElementById(id);
    if (taskElement) {
        taskElement.remove();
    }
}
