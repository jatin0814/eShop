const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'sql6.freemysqlhosting.net',
    user: 'sql6407949',
    database: 'sql6407949',
    password: 'XGxuzmhtbJ'
});

pool.execute("CREATE TABLE `users` (`userId` INT NOT NULL AUTO_INCREMENT,`userName` VARCHAR(100) NOT NULL,`password` VARCHAR(45) NOT NULL,`email` VARCHAR(45) NOT NULL,PRIMARY KEY (`userId`));",(err,res)=>{
    
})

pool.execute("CREATE TABLE `products` (`productId` INT NOT NULL AUTO_INCREMENT,`userId` INT NOT NULL,`title` VARCHAR(100) NOT NULL,`price` INT NOT NULL,`image` VARCHAR(255) NOT NULL,`description` VARCHAR(255) NOT NULL,PRIMARY KEY (`productId`));",(err,res)=>{
    
})

pool.execute("CREATE TABLE `cart` (`cartId` INT NOT NULL AUTO_INCREMENT,`userId` INT NOT NULL,`productId` INT NOT NULL,PRIMARY KEY (`cartId`));",(err,res)=>{
    
})


module.exports = pool.promise();


