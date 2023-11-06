const express = require('express');
const path = require('node:path');
const fs = require('node:fs');

let oficialProducts = require('../data/products.json');

function getProducts(){
    return oficialProducts.products;
}

function getProductById(uuid){
    const product = oficialProducts.products.find(product => product.uuid === uuid);

    if (product) {
        return product;
    } else {
        throw 'Product not found';
    }
}

function createProduct(product) {
    // Crea un nuevo Producto a partir del objeto dado
    fs.readFile('../Practica3/app/data/products.json', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            let currentproducts = JSON.parse(data);
            currentproducts.products.push(product);
            fs.writeFile('../Practica3/app/data/products.json', JSON.stringify(currentproducts), function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Product added");
                }
            });
        }
    });
}

function updateProduct(uuid, updatedProduct){
    fs.readFile('../Practica3/app/data/products.json', 'utf8', function (error, data) {
        if (error) {
            console.log(error);
        } else {
            let existingProduct = JSON.parse(data);

            // Busca el índice del producto por medio del uuid
            const index = existingProduct.products.findIndex(p => p.uuid === uuid);

            if (index !== -1) {
                // Actualiza el producto existente con los nuevos datos
                existingProduct.products[index] = updatedProduct;

                fs.writeFile('../Practica3/app/data/products.json', JSON.stringify(existingProduct), function (error) {
                    if (error) {
                        console.log("Error: " + error);
                    } else {
                        console.log("Product updated");
                    }
                });
            } else {
                console.log("Product not found");
            }
        }
    });
}

function deleteProduct(uuid){
    fs.readFile('../Practica3/app/data/products.json','utf8',function(error,data)
    {
        if(error)
        {
            console.log(error);
        }
        else{
            let currentproducts = JSON.parse(data);
            let index = currentproducts.products.findIndex(element => element.uuid == uuid);
            console.log(index)
            currentproducts.products.splice(index,1);

            fs.writeFile('../Practica3/app/data/products.json',JSON.stringify(currentproducts),function(error)
            {
                if(error)
                {
                    console.log(error);
                }
                else{
                    console.log("Product deleted");
                }
            })
        }
    })
}

function findProduct(query) {
    //Asigna el valor de categoría y título por medio de la división del :
    let [categoryQ, titleQ] = query.split(':').map(part => part.trim());
        let oficialProductos = oficialProducts.products;
        //Si el query contienen categoría y título
        if (categoryQ && titleQ) {
            //Filtra oficialProducts por el título
            let titleMatch = oficialProductos.filter(product => product.title.includes(titleQ));
            //Filtra oficialProducts por la categoría
            let categoryMatch = oficialProductos.filter(product => product.category.includes(categoryQ));
            //Intersección de lo dos flitrados
            let filteredProducts = categoryMatch.filter(product => titleMatch.includes(product));
            return filteredProducts;
        } 
        //Si solo se da la categoría
        else if(query.includes(':')){
            //Filtra oficialProducts por la categoría
            let categoryMatch = oficialProductos.filter(product => product.category.includes(categoryQ));
            return categoryMatch;

        } 
        //Si solo se da el título
        else {
            //Filtra oficialProducts por el título
            let titleMatch = oficialProductos.filter(product => product.title.includes(query));
            return titleMatch;
        }
    }
    


exports.getProducts = getProducts;
exports.getProductById = getProductById;
exports.createProduct = createProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
exports.findProduct = findProduct;