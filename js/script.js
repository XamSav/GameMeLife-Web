const openFormBtn = document.getElementById("openForm");
const closeFormBtn = document.getElementById("closeForm");
const taskForm = document.getElementById("taskForm");
var taskList = {//id : {name, description, status}
    "x" : {"name": "x", "description": "x", "status": "x"},
    "y" : {"name": "y", "description": "y", "status": "y"},
}
const guardarBtn = document.getElementById("guardar-btn");

openFormBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);

function openForm() {
    taskForm.classList.remove("hidden");
}

function closeForm() {
    taskForm.classList.add("hidden");
}

function guardarTarea() {
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskStatus = document.getElementById("taskStatus").value;
    
    if (taskName && taskDescription && taskStatus) {
        const newTask = {
            name: taskName,
            description: taskDescription,
            status: taskStatus
        };
        const taskId = Date.now(); // Unique ID for the task
        taskList[taskId] = newTask;
        console.log(taskList);
        closeForm();
    } else {
        alert("Please fill in all fields.");
    }
}
function agregarTarea(tarea){
    //tarea = id : {name, description, status}
    switch (tarea.status) {
        case "Pendiente":
            // Add to pending tasks
            break;
        case "En Progreso":
            // Add to in-progress tasks
            break;
        case "Completada":
            // Add to completed tasks
            break;
        default:
            console.error("Invalid task status:", tarea.status);
    }
}