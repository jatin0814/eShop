const path = require('path');
const isAuth = require('../middleware/isAuth')
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();


router.get('/products',isAuth, shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart',isAuth, shopController.getCart);

router.post('/cart',isAuth, shopController.postCart);

router.post('/cart-delete-item', shopController.postCartDeleteProduct);

//router.get('/orders', shopController.getOrders);
//router.post('/orders', shopController.postOrders);

//router.get('/checkout', shopController.getCheckout);

module.exports = router;
