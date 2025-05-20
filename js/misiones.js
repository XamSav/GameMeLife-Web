const misionNameinput = document.getElementById("misionName");
const misionDescriptionTA = document.getElementById("misionDescription");
const misionDifficulty = document.getElementById("misionDifficulty");
const misionDate = document.getElementById("misionDate");
const agregarbtn = document.getElementById("agregarbtn");
const listaMisiones = document.getElementById("missionList");

agregarbtn.addEventListener("click", agregarbtnMision);
function agregarbtnMision() {
    const name = misionNameinput.value;
    const description = misionDescriptionTA.value;
    const difficulty = misionDifficulty.value;
    const date = misionDate.value;
    const lista = listaMisiones.value;

    // Check if all fields are filled and date is not before today
    if (name && description && difficulty && date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set to midnight for comparison
        const selectedDate = new Date(date);
        if (selectedDate < today) {
            alert("La fecha no puede ser inferior al día de hoy.");
            return;
        }
        const newMission = {
            name: name,
            description: description,
            difficulty: difficulty,
            date: date
        };
        // Assuming you have a function to handle adding the mission to a list or database
        addMissionToList(newMission);
        // Clear the form fields
        misionNameinput.value = "";
        misionDescriptionTA.value = "";
        misionDifficulty.value = "";
        misionDate.value = "";
    } else {
        alert("Please fill in all fields.");
    }
}
function addMissionToList(mission) {
    // Create a new list item for the mission
    const listItem = document.createElement("li");
    listItem.className = "mission-item";
    listItem.innerHTML = `
         <div class="Name-li"><p>${mission.name}</p></div>
                       <div class="Descripción-li"><p>${mission.description}</p></div>
                       <div class="Fecha-li"><p>Fecha</p></div>
                       <div class="Dificultad-li"><p>${mission.description}</p></div>
                       <div class="btn">
                            <button class="delete-btn" title="Eliminar">
                               <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
<g transform=""><g fill="#1b1f3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" 
    stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
    <path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" 
    stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" 
    style="mix-blend-mode: normal"><g transform="scale(16,16)">
    <path d="M8,9.704l-3.943,3.942l-1.703,-1.703l3.942,-3.943l-3.942,-3.943l1.703,-1.703l3.943,3.942l3.943,-3.942l1.703,1.703l-3.942,3.943l3.942,3.943l-1.703,1.703z"
     fill="#f78f8f"></path>
     <path d="M11.943,2.707l1.35,1.35l-3.589,3.589l-0.354,0.354l0.354,0.354l3.589,3.589l-1.35,1.35l-3.589,-3.589l-0.354,-0.354l-0.354,0.354l-3.589,3.589l-1.35,-1.35l3.589,-3.589l0.354,
     -0.354l-0.354,-0.354l-3.589,-3.589l1.35,-1.35l3.589,3.589l0.354,0.354l0.354,-0.354l3.589,-3.589M11.943,2l-3.943,3.943l-3.943,-3.943l-2.057,2.057l3.943,
     3.943l-3.943,3.943l2.057,2.057l3.943,-3.943l3.943,3.943l2.057,-2.057l-3.943,-3.943l3.943,-3.943l-2.057,-2.057z" fill="#c74343"></path></g></g></g>
</svg>
                        
                            </button>
                          </div>
    `;

    // Add event listener to the delete button inside this list item
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        listaMisiones.removeChild(listItem);
    });

    // Append the new list item to the mission list
    listaMisiones.appendChild(listItem);
}
