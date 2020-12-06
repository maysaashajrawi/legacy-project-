const jwt =require('jsonwebtoken');
//var dotenv=require('dotenv');

const requireAuth =(req, res,next) => {
    const token = req.header('addUser-token');
if (token){
jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken)=> {
    if(err){
    res.redirect('/login');
    } else {
    console.log(decodedToken)
        next();
    }
   
})
}
else{
    res.redirect('/login');
}
// }

// module.exports = function (req, res,next){
// const token = req.header('addUser-token');
// if(!token) return res.redirect('/login');

// try{
// const verified = jwt.verify(token, process.env.JWT_SECRET)
// req.user = verified;
// // console.log(verified)
// next();

// }
// catch(err){
// res.status(400).send('fuckkkkkkkkkkkkk')
// }

 }

 module.exports={requireAuth}