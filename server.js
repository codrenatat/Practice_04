const cors = require('cors');

const express = require('express');
const fs = require('fs');
const router = require("./app/controllers/router");
const app = express();
const port = 3000;

app.use(cors({methods : ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(express.static('app'));
app.use('/views', express.static('views'));

app.use(express.json());
app.use(router);

app.get('/',(req,res)=>{
    console.log('E-commerce app Practica 3');
    res.send('E-commerce app Practica 3');
})

app.listen(port, ()=>{
    console.log('Applicación de ejemplo corriendo en puerto' + port)
});
