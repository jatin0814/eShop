const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');
//const Users = require('./models/user')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// app.use((req,res,next)=>{
//    db.execute("select * from users where userId=1").then(user=>{
//        console.log(user[0][0])
//         req.user = user[0][0]
//         next();
//    }).catch(err=>{
//        console.log(err);
//    })
// })

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)
app.use(errorController.get404);

// Users.findById(1).then(([user])=>{
//     if (user.length===0){
//         user = new Users(null,"test","test@test.com","password")
//         user.save().then(result=>{
//             //console.log(result)
//         })
//     }
// })


app.listen(3000);

console.log("App is Up!!")