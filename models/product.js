const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(userId, title, imageUrl, description, price) {
    this.userId = userId;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static updateProduct(id,updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice){
      var a="'"+updatedTitle+"'"
      var b="'"+updatedDesc+"'"
      var c="'"+updatedImageUrl+"'"
      console.log(`UPDATE products SET title=${a}, price=${updatedPrice}, image=${c}, description=${b} where productId=${id}`)
      //console.log(`UPDATE products SET title="${this.title}" price=${this.price} imageUrl="${this.imageUrl}" description="${this.description}" where id=${this.id}`)
    return db.execute(`UPDATE products SET title=${a}, price=${updatedPrice}, image=${c}, description=${b} where productId=${id}`)
  }

  save() {
    var a="'"+this.title+"'"
    var b="'"+this.description+"'"
    var c="'"+this.imageUrl+"'"
    return db.execute(
      `INSERT INTO products(userId,title,price,image,description) VALUES (${this.userId},${a},${this.price},${c},${b});`
    );
  }

  static deleteById(id) {
    return db.execute("DELETE FROM products where products.productId = ?",[id])
  }

  static fetchAll() {
    //console.log("infetchAAll")
    return db.execute('SELECT * FROM products');
  }
  static fetchByUserId(userId){
    return db.execute(`SELECT * FROM products where userId=${userId}`);
  }
  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.productId = ?', [id]);
  }
};


// `INSERT INTO shopping(ProductId,userId,title,price,image,description) VALUES (${this.userId},${a},${this.price},${c},${b});`