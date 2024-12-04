const express = require("express");
const webPush = require("web-push");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importar cors

const app = express();
const PORT = 3000;

// Habilitar CORS para cualquier origen
app.use(cors());

// Claves VAPID generadas
const publicVapidKey = "BCuLFZqF38SveSSe7iKG0zOudzq1G6lwqquDI5-blzUJYzyXMRASoEmKR3jdp7ZrgQZQHXMq4-BSHSdfzUR3dMs";
const privateVapidKey = "QVR581GJDaB8rAFOAb9YRaBuWUrAD-4msUkbm9MBEe8";

// Configurar web-push con las claves VAPID
webPush.setVapidDetails(
  "mailto:tu_email@example.com", // Cambia esto por tu correo
  publicVapidKey,
  privateVapidKey
);

// Middleware para manejar JSON
app.use(bodyParser.json());

// Ruta para servir la clave pública al cliente
app.get("/vapidPublicKey", (req, res) => {
  res.send({ publicKey: publicVapidKey });
});

// Ruta para suscripciones
app.post("/subscribe", (req, res) => {
    const subscription = req.body;
    console.log(subscription);
    
  
    const payload = JSON.stringify({
      title: "¡Bienvenido!",
      body: "Has activado las notificaciones push correctamente.",
    });
  
    webPush
      .sendNotification(subscription, payload)
      .then(() => res.status(201).send("Notificación enviada"))
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error enviando la notificación");
      });
  });
  

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
