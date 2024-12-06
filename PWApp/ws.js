self.addEventListener("push", event =>{
    console.log("SW push: ", event.data.text());
    const datos = JSON.parse(event.data.text());
    const titulo = datos.titulo;
    const contenido = datos.contenido;
    const opciones = {
        body: contenido
    }
    event.waitUntil(self.registration.showNotification(titulo, opciones));
    
})