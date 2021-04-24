const db = require("../util/database")

module.exports = class Users {
    constructor(name,email,password){
        this.name=name,
        this.email=email,
        this.password=password
    }


    save() {
        return db.execute(
          'INSERT INTO users (userName,email,password) VALUES (?,?,?)',
          [this.name, this.email,this.password]
        );
    }

    static login(email,password){
      var a="'"+email+"'"
      var b="'"+password+"'"
      return db.execute(`Select * from users where email=${a} and password=${b}`)
    }

    static findById(id) {
        return db.execute('SELECT * FROM users WHERE users.id = ?', [id]);
      }

}