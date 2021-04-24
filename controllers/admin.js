const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
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
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    isLogedin:isLoggedIn,
    user:req.user
  });
};

exports.postAddProduct = (req, res, next) => {
  const userId = req.user.id;
  //console.log("req.userId",req.userId.userId)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(userId, title, imageUrl, description, price);
  product
    .save()
    .then((product) => {
      console.log(product)
      res.redirect('/products');
    })
    .catch(err => console.log(err));
};




exports.getEditProduct = (req, res, next) => {
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
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  //console.log("Edit")
  Product.findById(prodId).then(([product,fieldData]) => {
    //console.log(product[0].id)
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product[0],
      isLogedin:isLoggedIn,
      user:req.user
    });
  });
};





exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("por",prodId)
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  Product.updateProduct(prodId,updatedTitle,updatedImageUrl,updatedDesc,updatedPrice).then(result=>{
    res.redirect('/admin/products');
  })
};

exports.getProducts = (req, res, next) => {
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
  //console.log("products")
  Product.fetchByUserId(req.user.id).then(([products,fieldData]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
      isLogedin:isLoggedIn,
      user:req.user
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId).then(result=>{
    res.redirect('/admin/products');
  });
};
