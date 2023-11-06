const express = require('express');
const router = express.Router();
const fs = require('node:fs');
const products = require('../controllers/data_handler');

router.get('/',(req,res) => {
    console.log("Products working!");
    let params = req.query;
    let result;
    if(Object.keys(params).length === 0){
        fs.readFile('./app/data/products.json','utf-8',(err,data)=>{
            if(err){
                console.log("err"+err);
            }
            else{
                console.log("Working!");
                console.table(JSON.parse(data));
                result = data;
                res.send(result);
            }
        });
    }
    else{
        let query;
        if(params.category === undefined)
            params.category = "";
        if(params.title === undefined)
            params.title = "";
        
        query = params.category;
        query += ":";
        query += params.title;
        result = products.findProduct(query);
        
        if(result.length === 0){
            res.status(404);
            res.send("Product not found");
        }
        else{
        console.table(result);
        res.send(result);
        }
    }
});


router.post('/cart', (req,res) => {
    let x = req.body;
    let listProducts = Object.values(x);
    let tempProducts = []


    if(Array.isArray(listProducts)){
        for(let i = 0; i < listProducts[0].length; i++){
            if (products.getProductById(listProducts[0][i].uuid)){
                tempProducts.push(listProducts[0][i]);
            }
            else{
                res.status(404);
                res.status(404).json({ message: 'producto no encontrado'});
            }
        }
        res.status(202).json({ message: 'Siguientes productos agregados correctamente al carrito', products: tempProducts });
    }
    else{
        res.sendStatus(404);
    }

})


router.get('/:id',(req,res) => {
    let id = req.params.id;
    
    id = id.split(":").join("");
    let result = products.getProductById(id);
    if(result != null){
        console.table(result);
        res.status(202)
        res.send(result);
        
    }
    else{
        res.status(404);
        res.send("Product not found");
    }
});


module.exports = router;