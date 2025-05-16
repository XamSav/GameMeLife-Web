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
        <p>${mission.name} - ${mission.description} - ${mission.difficulty}</p>
        <button class="delete-btn" title="Eliminar">
            <img src="../imagenes/delete.svg" alt="Delete" width="20" height="20"></button>
        </button>
    `;

    // Add event listener to the delete button inside this list item
    const deleteBtn = listItem.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
        listaMisiones.removeChild(listItem);
    });

    // Append the new list item to the mission list
    listaMisiones.appendChild(listItem);
}
