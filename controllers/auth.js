const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/shop');


exports.getLogin = (req,res,next) =>{
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
    res.setHeader('aa','sss')
    res.render('auth/login',
    {path:'/login',
    pageTitle:'Login',
    isLogedin:isLoggedIn,
    user:{username:""},
    oldInput:{
        email:"",
        password:"",
    }
});
}


exports.postLogin = (req,res,next) =>{
    const email = req.body.email;
    const password =req.body.password;
    User.login(email,password).then(user=>{
        if(user[0].length===0){
            return res.redirect('/')
        }
        //console.log(user[0])
        const loadedUser = user[0][0]
        //console.log(loadedUser)
        //console.log(loadedUser.email,loadedUser.userId)
        const token = jwt.sign({username:loadedUser.userName,id:loadedUser.userId},
            "secret",{
                expiresIn:"1h"
            }
        )
        res.setHeader('Set-Cookie',`token=${token}`)
        res.redirect('/products')
    }).catch(err=>{
        res.redirect('/')
        console.log("INERORRRRR",err)
    })

}


exports.getSignup = (req,res,next)=>{
    var token;
    req.user=""
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
   res.render('auth/signup',{path:'/signup',
   pageTitle:'Signup',
   isLogedin:isLoggedIn,
   user:{username:""},
   oldInput:{
       email:"",
       password:"",
       confirmPassword:""
   }
})
}

exports.postSignup = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const username = req.body.username;

    const user = new User(username,email,password);
    user.save().then(user=>{
        console.log(user)
        res.redirect('/');
    }).catch(err=>{
        res.redirect('/signup');
        console.log(err)
    })
}




exports.postLogout = (req,res,next) => {
    
    res.setHeader('Set-Cookie','token=')
    res.redirect('/')
}