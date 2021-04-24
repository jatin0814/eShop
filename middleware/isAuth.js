const jwt = require("jsonwebtoken");


module.exports = (req,res,next) => {
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
    
    //console.log(token)
    let decodedToken;
    try{
        decodedToken = jwt.verify(token,"secret")
        //console.log(decodedToken)
    }catch(err){
        err.statusCode=500;
        throw err
    }
    if(!decodedToken){
        const error = new error("User unauthenticated");
        error.statusCode=401;
        throw error
    }
    //console.log(decodedToken)
    req.user={id:decodedToken.id,username:decodedToken.username};
    next()
}