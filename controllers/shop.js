const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  //console.log(req.user)
  var token;
    const rawString = req.get('Cookie');
    if(rawString)
    {
        const b = rawString.split(";")
        for(i=0;i<b.length;i++){
        if(b[i].split("=")[0].trim()==="token"){
            token = b[i].split("=")[1]
        }}
    }
    var isLoggedIn;
    if(token){
        isLoggedIn = true
    }

  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products',
        isLogedin:isLoggedIn,
        user:req.user
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  var token;
    const rawString = req.get('Cookie');
    if(rawString)
    {
        const b = rawString.split(";")
        for(i=0;i<b.length;i++){
        if(b[i].split("=")[0].trim()==="token"){
            token = b[i].split("=")[1]
        }}
    }
    var isLoggedIn;
    if(token){
        isLoggedIn = true
    }
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(([product]) => {
      //console.log(product)
      res.render('shop/product-detail', {
        product: product[0],
        pageTitle: product.title,
        path: '/products',
        isLogedin:isLoggedIn,
        user:req.user
      });
    })
    .catch(err => console.log(err));
};

// exports.getIndex = (req, res, next) => {
//   var token;
//     const rawString = req.get('Cookie');
//     if(rawString)
//     {
//         const b = rawString.split(";")
//         for(i=0;i<b.length;i++){
//         if(b[i].split("=")[0].trim()==="token"){
//             token = b[i].split("=")[1]
//         }}
//     }
//     var isLoggedIn;
//     if(token){
//         isLoggedIn = true
//     }
//   Product.fetchAll()
//     .then(([rows, fieldData]) => {
//       res.render('shop/index', {
//         prods: rows,
//         pageTitle: 'Shop',
//         path: '/'
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.getCart = (req, res, next) => {
  var token;
    const rawString = req.get('Cookie');
    if(rawString)
    {
        const b = rawString.split(";")
        for(i=0;i<b.length;i++){
        if(b[i].split("=")[0].trim()==="token"){
            token = b[i].split("=")[1]
        }}
    }
    var isLoggedIn;
    if(token){
        isLoggedIn = true
    }
    //console.log(isLoggedIn)
    const userId = req.user.id;
    Cart.fetchCart(userId).then(result=>{
      var productIds = result[0]
      productIds = productIds.map(p=>p.productId)
      var uniqueArray = [];
      for(i=0; i < productIds.length; i++){
        if(uniqueArray.indexOf(productIds[i]) === -1) {
            uniqueArray.push(productIds[i]);
        }
      }
      //console.log(uniqueArray)
      Product.fetchAll().then(products=>{
        var prods = products[0]
        var cartProducts = []
        for(i=0;i<uniqueArray.length;i++){
          for(j=0;j<prods.length;j++){
              if(prods[j].productId===uniqueArray[i]){
                cartProducts.push(prods[j])
              }
          }
        }
        //console.log(cartProducts)
        res.render('shop/cart', {
          products: cartProducts,
          isLogedin:isLoggedIn,
          pageTitle: 'Cart',
          path: '/cart',
          user:req.user
        });
      })  
    }).catch(err=>{
      console.log(err)
    })

  };


exports.postCart = (req, res, next) => {
  const userId = req.user.id;
  const prodId = req.body.productId;
  const cart = new Cart(userId,prodId)
  cart.save().then(result=>{
    console.log(result)
    res.redirect('/products');
  }).catch(err=>{
    console.log(err)
  })
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Cart.deleteCart(prodId).then(result=>{
    res.redirect('/cart')
  }).catch(err=>{
    console.log(err)
  })
};

// exports.getOrders = (req, res, next) => {
//   var token;
//     const rawString = req.get('Cookie');
//     if(rawString)
//     {
//         const b = rawString.split(";")
//         for(i=0;i<b.length;i++){
//         if(b[i].split("=")[0].trim()==="token"){
//             token = b[i].split("=")[1]
//         }}
//     }
//     var isLoggedIn;
//     if(token){
//         isLoggedIn = true
//     }
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'Your Orders',
//     isLogedin:isLoggedIn
//   });
// };

