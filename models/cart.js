const db = require("../util/database")

module.exports = class Cart {
    constructor(userId,productId){
        this.userID=userId,
        this.productId=productId
    }

    save(){
      var a="'"+this.productId+"'"
      var b="'"+this.userID+"'"
      return db.execute(`INSERT INTO cart(userId,productId) VALUES (${b},${a});`)
    }

    static fetchCart(id){
      return db.execute(`select productId from cart where userId=${id}`)
    }

    static deleteCart(prodId){
      return db.execute(`DELETE FROM cart WHERE productId=${prodId};`)
    }
  }
