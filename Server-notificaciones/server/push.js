const vapid = require("./vapid.json");
const urlsafe = require("urlsafe-base64");
const fs = require("fs");
const webpush =require("web-push")

module.exports.getKeys = () =>{
    return urlsafe.decode(vapid.publicKey);
}

let suscripciones = [];
//let suscripciones = require("./sub-db.json");

module.exports.addsuscripcion = (suscripcion) =>{
    suscripciones.push(suscripcion);
    console.log(suscripcion);
    fs.writeFileSync(`${__dirname}/sub-db.json`, JSON.stringify(suscripciones))
    
}
webpush.setVapidDetails(
    "mailto: fernandofchr@gmail.com",
    vapid.publicKey,
    vapid.privateKey
);

module.exports.sendNotificationPush = (notificacion) =>{
    suscripciones.forEach( suscripcion =>{
        webpush.sendNotification(suscripcion, JSON.stringify(notificacion))
    })
}