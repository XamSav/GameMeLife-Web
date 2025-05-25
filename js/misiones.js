// Obtener elementos del DOM
const misionNameinput = document.getElementById("misionName");
const misionDescriptionTA = document.getElementById("misionDescription");
const misionDifficulty = document.getElementById("misionDifficulty");
const misionDate = document.getElementById("misionDate");
const agregarbtn = document.getElementById("agregarbtn");
const listaMisiones = document.getElementById("missionList");

// Cargar misiones guardadas al iniciar
document.addEventListener("DOMContentLoaded", cargarMisionesGuardadas);

agregarbtn.addEventListener("click", agregarbtnMision);

function agregarbtnMision(e) {
    e.preventDefault(); // Prevenir que el formulario recargue la página

    const name = misionNameinput.value.trim();
    const description = misionDescriptionTA.value.trim();
    const difficulty = misionDifficulty.value;
    const date = misionDate.value;

    if (name && description && difficulty && date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(date);

        if (selectedDate < today) {
            alert("La fecha no puede ser inferior al día de hoy.");
            return;
        }

        const newMission = {
            name,
            description,
            difficulty,
            date
        };

        addMissionToList(newMission);
        guardarMisionLocal(newMission);

        // Limpiar campos
        misionNameinput.value = "";
        misionDescriptionTA.value = "";
        misionDifficulty.value = "";
        misionDate.value = "";
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function cuentaAtras(fechaStr) {
    const ahora = new Date();
    ahora.setSeconds(0, 0);
    const fechaMision = new Date(fechaStr);

    if (isNaN(fechaMision.getTime())) {
        return "Fecha inválida";
    }

    const diferencia = fechaMision - ahora;
    const semanas = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 7));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    if (dias > 7) {
        return `${semanas} semanas, ${dias} días , ${horas} horas restantes  ${minutos} minutos`;
    } else if (dias > 0) {
        return `${dias} días , ${horas} horas restantes y ${minutos} minutos`;
    } else if (horas > 0) {
        return `${horas} horas restantes y ${minutos} minutos`;
    } else if (diferencia > 0) {
        return "¡Es hoy!";
    } else {
        return "La fecha ya ha pasado";
    }
}

function addMissionToList(mission) {
    const listItem = document.createElement("li");
    listItem.className = "mission-item";

    // Contador dinámico
    const contadorP = document.createElement("p");
    contadorP.textContent = cuentaAtras(mission.date);

    const intervalo = setInterval(() => {
        const tiempoRestante = cuentaAtras(mission.date);
        contadorP.textContent = tiempoRestante;

        if (tiempoRestante === "La fecha ya ha pasado") {
            clearInterval(intervalo);
        }
    }, 1000);

    listItem.innerHTML = `
        <div class="Name-li"><p>${mission.name}</p></div>
        <div class="Descripción-li"><p>${mission.description}</p></div>
        <div class="Dificultad-li"><p>${mission.difficulty}</p></div>
    `;

    const fechaDiv = document.createElement("div");
    fechaDiv.className = "Fecha-li";
    fechaDiv.appendChild(contadorP);
    listItem.appendChild(fechaDiv);

    const btnDiv = document.createElement("div");
    btnDiv.className = "btn";
    btnDiv.innerHTML = `
        <button class="delete-btn" title="Eliminar">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0,0,256,256">
                <g transform=""><g fill="#1b1f3b" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" 
                    stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                        <path d="M0,256v-256h256v256z" id="bgRectangle"></path></g>
                        <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt"
                        stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0"
                        font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                        <g transform="scale(16,16)">
                            <path d="M8,9.704l-3.943,3.942l-1.703,-1.703l3.942,-3.943l-3.942,-3.943l1.703,
                            -1.703l3.943,3.942l3.943,-3.942l1.703,1.703l-3.942,3.943l3.942,3.943l-1.703,1.703z" fill="#f78f8f"></path>
                            <path d="M11.943,2.707l1.35,1.35l-3.589,3.589l-0.354,0.354l0.354,0.354l3.589,3.589l-1.35,1.35l-3.589,
                            -3.589l-0.354,-0.354l-0.354,0.354l-3.589,3.589l-1.35,-1.35l3.589,-3.589l0.354,-0.354l-0.354,-0.354l-3.589,-3.589l1.35,
                            -1.35l3.589,3.589l0.354,0.354l0.354,-0.354l3.589,-3.589M11.943,2l-3.943,3.943l-3.943,-3.943l-2.057,2.057l3.943,3.943l-3.943,
                            3.943l2.057,2.057l3.943,-3.943l3.943,3.943l2.057,-2.057l-3.943,-3.943l3.943,-3.943l-2.057,-2.057z" fill="#c74343"></path>
                        </g></g></g>
            </svg>
        </button>
    `;
    listItem.appendChild(btnDiv);

    // Botón eliminar
    btnDiv.querySelector(".delete-btn").addEventListener("click", () => {
        listaMisiones.removeChild(listItem);
        eliminarMisionLocal(mission);
        clearInterval(intervalo);
    });

    listaMisiones.appendChild(listItem);
}

// 👉 Guardar misión en localStorage
function guardarMisionLocal(mision) {
    const misionesGuardadas = JSON.parse(localStorage.getItem("misiones")) || [];
    misionesGuardadas.push(mision);
    localStorage.setItem("misiones", JSON.stringify(misionesGuardadas));
}

// 👉 Eliminar misión del localStorage
function eliminarMisionLocal(misionAEliminar) {
    let misionesGuardadas = JSON.parse(localStorage.getItem("misiones")) || [];
    misionesGuardadas = misionesGuardadas.filter(m => {
        return !(m.name === misionAEliminar.name &&
                 m.description === misionAEliminar.description &&
                 m.date === misionAEliminar.date &&
                 m.difficulty === misionAEliminar.difficulty);
    });
    localStorage.setItem("misiones", JSON.stringify(misionesGuardadas));
}

// 👉 Cargar misiones desde localStorage
function cargarMisionesGuardadas() {
    const misionesGuardadas = JSON.parse(localStorage.getItem("misiones")) || [];
    misionesGuardadas.forEach(addMissionToList);
}
