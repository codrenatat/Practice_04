const express = require('express');
const router = express.Router();

const ProductObj = require('../controllers/products');
const products = require('../controllers/data_handler');

router.post('/', (req,res) => {

    let product = req.body;
    try {
        // Define la lista de atributos requeridos
        const requiredAttributes = ['title', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
        const missingAttributes = [];
        

        // Verifica si todos los atributos requeridos están presentes
        for (const attr of requiredAttributes) {
            if (!product.hasOwnProperty(attr)) {
                missingAttributes.push(attr);
            }
        }

        // Si hay atributos faltantes, lanza una excepción
        if (missingAttributes.length > 0) {
            res.status(400);
            res.send(`Faltan los siguientes atributos: ${missingAttributes.join(', ')}`)

        }

        let newProduct = new ProductObj(product.title,product.description,product.imageUrl,product.unit,product.stock,product.price,product.category);
        products.createProduct(newProduct);
        res.status(201);
        res.send("Producto " + newProduct._title + " creado correctamente");
    } catch (error) {
        // Si faltan atributos requeridos, maneja la excepción y muestra los atributos faltantes en el mensaje de error
        res.status(400)
    }
});

router.put('/:id', (req,res) => {
    let id = req.params.id;
    id = id.split(":").join("");
    let product = req.body; 
    try {
        // Define la lista de atributos requeridos
        const requiredAttributes = ['title', 'description', 'imageUrl', 'unit', 'stock', 'pricePerUnit', 'category'];
        const missingAttributes = [];

        // Verifica si todos los atributos requeridos están presentes
        for (const attr of requiredAttributes) {
            if (!product.hasOwnProperty(attr)) {
                missingAttributes.push(attr);
            }
        }

        // Si hay atributos faltantes, lanza una excepción
        if (missingAttributes.length > 0) {
            res.status(400);
            res.send(`Faltan los siguientes atributos: ${missingAttributes.join(', ')}`)

        }
        let UpdatedProduct = products.getProductById(id);
        if(UpdatedProduct === undefined){
            res.status(404);
            res.send("Error: Producto no encontrado");
        }
        else{
            let newProduct = new ProductObj(product.title,product.description,product.imageUrl,product.unit,product.stock,product.pricePerUnit,product.category);
            console.log(newProduct)
            products.updateProduct(id, newProduct);
            res.status(200);
            
            res.send("Producto " + product.title + " actualizado correctamente");
        }

    } catch (error) {
        // Si faltan atributos requeridos, maneja la excepción y muestra los atributos faltantes en el mensaje de error
        res.status(400)
    }

})

router.delete('/:id', (req,res) => {
    console.log("Delete request received");
    let id = req.params.id;
    id = id.split(":").join("");
    let DeleteProduct = products.getProductById(id);
    if(DeleteProduct === undefined){
        res.status(404);
        res.send("Producto no encontrado");
    }
    else{
        products.deleteProduct(id);
        res.status(200);
        res.send('Producto eliminado correctamente')
    }
})

module.exports = router;