if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/js/sw.js").then((registration) => {
      console.log("SW registrado con éxito:", registration);
    }).catch((error) => {
      console.log("Error al registrar el SW:", error);
    });
  }
  
  
  if ("Notification" in window && navigator.serviceWorker) {
      Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
              navigator.serviceWorker.ready.then((registration) => {
                  registration.showNotification("¡Hola!", {
                      body: "Notificación desde tu PWA",
                      icon: "img/icons/icon-192x192.png",
                    });
                });
            }
        });
    }
    
    
 