const openFormBtn = document.getElementById("openForm");
const closeFormBtn = document.getElementById("closeForm");
const taskForm = document.getElementById("taskForm");
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

}