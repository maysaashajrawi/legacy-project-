const jwt =require('jsonwebtoken');

// middleware function to check if the user have token 
module.exports =function (req, res,next){
        // check header if it have token 
        const token = req.header('user-tooken');
        // if not have tooken it must redirect to login
        if(!token) return res.redirect('/login');

        try{

            const verified = jwt.verify(token, process.env.JWT_SECRET , (err,decoded)=>{
                if(err){
                    res.json({auth:false , message:"you failed to authenticate"})
                }else{
                    console.log(req);
                    // req.userId = decoded.id
                    // next()
                    return;
                }

            })
            req.user = verified._id;
            console.log("hhhiiii",verified);
            // console.log("hellloo" , req)
            return res.json(verified)
            next();

        }
        catch(err){
            res.status(400).send('Invalid Token')
        }

 }

