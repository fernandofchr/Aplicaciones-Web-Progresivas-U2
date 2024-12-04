// Botones
const enableButton = document.getElementById("enableGeo");
const disableButton = document.getElementById("disableGeo");
const geoOutput = document.getElementById("geoOutput");
const geoMessage = document.getElementById("geoMessage");

// Función para habilitar la geolocalización
enableButton.addEventListener("click", () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                geoOutput.classList.remove("d-none", "alert-danger");
                geoOutput.classList.add("alert-success");
                geoMessage.textContent = `Geolocalización habilitada. Latitud: ${latitude}, Longitud: ${longitude}`;
            },
            (error) => {
                geoOutput.classList.remove("d-none", "alert-success");
                geoOutput.classList.add("alert-danger");
                geoMessage.textContent = "Error al obtener la ubicación. Verifica tus permisos.";
            }
        );
    } else {
        geoOutput.classList.remove("d-none", "alert-success");
        geoOutput.classList.add("alert-danger");
        geoMessage.textContent = "Geolocalización no está disponible en este navegador.";
    }
});

// Función para deshabilitar la geolocalización (solo simula el mensaje)
disableButton.addEventListener("click", () => {
    geoOutput.classList.remove("d-none", "alert-success");
    geoOutput.classList.add("alert-warning");
    geoMessage.textContent = "Geolocalización deshabilitada.";
});
