const googleMapKey = "AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"; // Tu clave API de Google Maps

const obtenerUbicacion = () => {
    const ubicacion = document.querySelector("#ubicacion");
    const mapa = document.querySelector("#ubicacionMapa");

    if (navigator.geolocation) {
        // Mensaje inicial
        ubicacion.innerHTML = "Buscando tu ubicación...";

        // Obtiene la ubicación
        navigator.geolocation.getCurrentPosition(
            (posicion) => {
                const latitude = posicion.coords.latitude;
                const longitude = posicion.coords.longitude;

                // Muestra latitud y longitud
                ubicacion.innerHTML = `Latitud: ${latitude} <br>Longitud: ${longitude}`;

                // Muestra el mapa
                mapa.innerHTML = `
                    <iframe
                        width="100%"
                        height="250"
                        frameborder="0"
                        src="https://www.google.com/maps/embed/v1/view?key=${googleMapKey}&center=${latitude},${longitude}&zoom=17"
                        allowfullscreen>
                    </iframe>
                `;
            },
            (error) => {
                // Manejo de errores
                let mensajeError = "";
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        mensajeError = "Permiso denegado para obtener la ubicación.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        mensajeError = "La información de ubicación no está disponible.";
                        break;
                    case error.TIMEOUT:
                        mensajeError = "El tiempo para obtener la ubicación se agotó.";
                        break;
                    default:
                        mensajeError = "Ocurrió un error al intentar obtener tu ubicación.";
                }
                ubicacion.innerHTML = mensajeError;
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    } else {
        ubicacion.innerHTML = "Tu navegador no soporta la geolocalización.";
    }
};
