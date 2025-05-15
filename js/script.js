const openFormBtn = document.getElementById("openForm");
const closeFormBtn = document.getElementById("closeForm");
const taskForm = document.getElementById("taskForm");
var taskList = {//id : {name, description, status}
    "x" : {"name": "x", "description": "x", "status": "x"},
    "y" : {"name": "y", "description": "y", "status": "y"},
}
openFormBtn.addEventListener("click", openForm);
closeFormBtn.addEventListener("click", closeForm);

function openForm() {
    taskForm.classList.remove("hidden");
}

function closeForm() {
    
    taskForm.classList.add("hidden");
}

window.onload = function() {

}