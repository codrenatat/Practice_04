const express = require('express');
const path = require('path');
const productRouter = require('../routes/products');
const adminProductRouter = require('../routes/admin_products');
const router = express.Router();

function validateAdmin(req, res, next) {
    if (req.get('x-token') === 'admin') {
        next(); 
    } else {
        res.status(403).send('Solo se aceptan administradores');
    }
}

router.use('/products', productRouter);
router.use('/admin/products', validateAdmin, adminProductRouter);

router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/../views/home.html'));
});
router.get('/home', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/../views/home.html'));
});
router.get('/shopping_cart', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/../views/shopping_cart.html'));
});

module.exports = router