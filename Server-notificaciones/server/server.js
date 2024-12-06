const bodyParser = require("body-parser");
const express= require("express");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended : true }));

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const routes = require("./routes");

app.use("/api", routes);

const puerto = 3000;
app.listen(puerto, err =>{
    if (err) throw new Error(err);

    console.log('Servidor corriendo en el puerto ', puerto );
})
