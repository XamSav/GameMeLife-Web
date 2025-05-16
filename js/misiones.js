const misionNameinput = document.getElementById("misionName");
const misionDescriptionTA = document.getElementById("misionDescription");
const misionDifficulty = document.getElementById("misionDifficulty");
const misionDate = document.getElementById("misionDate");
const agragarbtn = document.getElementById("agregarbtn");
agregarbtn.addEventListener("click", agragarbtnMision());
function agragarbtnMision() {
    const name = misionName.value;
    const description = misionDescription.value;
    const difficulty = misionDifficulty.value;
    const date = misionDate.value;

    if (name && description && difficulty && date) {
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