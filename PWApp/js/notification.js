if (navigator.serviceWorker) {
    navigator.serviceWorker.register("/ws.js");
}

const revisarSuscripcion = (activada) =>{
    if (activada) {
        console.log("Notificaiones push activadas");
        document.querySelector("#btnActivarNotificacion").disabled = true;
        document.querySelector("#btnDesactivarNotificacion").disabled = false;
    }else{
        console.log("Notificaciones push desactivadas");
        document.querySelector("#btnActivarNotificacion").disabled = false;
        document.querySelector("#btnDesactivarNotificacion").disabled = true
    }
}
revisarSuscripcion();

const obtenerLlavePublica = async () =>{
    const respuesta = await fetch("http://localhost:3000/api/key");
    const llave = await respuesta.arrayBuffer();
    return new Uint8Array(llave);
}
// obtenerLlavePublica().then(console.log);

const activarNotificaciones = () =>{
    navigator.serviceWorker.ready.then(swRegistrado =>{
        obtenerLlavePublica().then(llave =>{
            swRegistrado.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: llave
            }).then( respuesta => respuesta.toJSON())
                .then(sucripcion =>{
                    console.log(sucripcion);
                    // revisarSuscripcion(sucripcion);
                    fetch("http://localhost:3000/api/suscribe", {
                        method: "POST",
                        headers:{
                            "Content-Type" : "application/json"

                        },
                        body:JSON.stringify(sucripcion)
                    }).then( revisarSuscripcion )
                    .catch( desactivarNotificaciones)
                })
        })
    })
}

const desactivarNotificaciones = () =>{
    navigator.serviceWorker.ready.then(swRegistrado =>{
        swRegistrado.pushManager.getSubscription().then(suscripcion =>{
            suscripcion.unsubscribe().then( ()=>revisarSuscripcion(false))
        })
    })

}
