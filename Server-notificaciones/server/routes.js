const express = require("express");
const router = express.Router();
const push = require("./push");

router.post("/suscribe", (req, res)=>{
    const suscripcion = req.body;
    console.log(suscripcion);
    push.addsuscripcion(suscripcion)
    res.json("suscribe");
})

router.get("/key", (req, res)=>{
    const llave = push.getKeys();
    res.send(llave);
})

router.post("/push", (req, res)=>{
    const notification = {
        titulo: req.body.titulo,
        contenido: req.body.contenido
    }
    push.sendNotificationPush(notification);
    res.json("metodo-push");
})

module.exports = router;