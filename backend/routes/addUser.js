const router = require('express').Router();
const AddUser = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
router.route('/').get((req, res) => {
      AddUser.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/adduser').post(async (req, res) => {
  //checking if the number already signed up
  //i am not sure we need this since we already put  unique:true in the schema
  const numberadded = await AddUser.findOne({phone: req.body.phone})
  if (numberadded) return res.status(401).send("there is an account with this number,do you want to log in?");
    //checking if the username is used
  const useradded = await AddUser.findOne({username: req.body.username})
  if (useradded) return res.status(402).send("there is an account with this username,please choose another one?");
  const username = req.body.username;
  //hashing password
  //sorry it is a mass it is leterlly 2 am
  const salt = await bcrypt.genSalt(10)
   const hashedPassword =  await bcrypt.hash(req.body.password, salt)
  const phone = req.body.phone;
  const address = req.body.address;
//every thing is readdy here we send the data to the server  
   const newUser = new AddUser({username:username,password:hashedPassword, phone: phone, address:address });
   try{
   const saveUser= await newUser.save()
      res.send({saveUser:newUser._id})
     // const token = jwt.sign({_id: newUser._id}, process.env.JWT_SECRET )
    //   console.log(token)
    //localStorage.setItem('token', token)
     //res.header('addUser-token',token).send(token);
     //res.json({ token: token})
     console.log(token)
   }catch(err){
     res.status(400).send(err)
   }
    });
    
    ///login
    router.route('/login').post(async (req, res) => {
    //checking if the username is signed up 
      const user = await AddUser.findOne({username: req.body.username})
      if (!user) {return res.status(400).send("there is no account with this username,please check your username?")};
    //checking if password is correct
      const validpassword = await bcrypt.compare(req.body.password, user.password)
      if (!validpassword) return res.status(400).send('Password not correct');
      
      //creat and send a token
      const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET );
     res.send({token :token,user:user});
    res.json({auth:true , token:token , userInfo:user })
     //console.log(res.header)
       });
    module.exports= router









    /////// Maysaa








// const router = require('express').Router();
// const AddUser = require('../models/user.model');
// //validation 
// // const Joi = require('@hapi/joi');
// const bcrypt = require('bcrypt');
// const jwt =require('jsonwebtoken');






// router.route('/').get((req, res) => {
//       AddUser.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
  
 
//   });

//    // make some validation
// //    const userSchema = {
// //     username:Joi.string()
// //             .min(6)
// //             .required()
// //     ,
// //     password :Joi.string()
// //               .min(6)
// //               .required(),
// //     phone:Joi.number() 
// //           .min(10)
// //           .required()

// // }    ;




//   router.route('/adduser').post(async (req, res) => {
 
//   // const validation = Joi.validate(req.body , userSchema);
//   // res.send(validation)
//   //checking if the number already signed up
//   //i am not sure we need this since we already put  unique:true in the schema

//   // define user and get data from form (it from request)
//       // const user = new AddUser({
//       //   username:req.body.username,
//       //   password : req.body.password,
//       //   phone:req.body.phone,
//       //   address:req.body.address,
//       //   image:req.body.image
//       // })
//       // // if every thing good go to try to save the data
//       // try{

//       //   const savedUser = await user.save();
//       //   res.send(savedUser)
//           // validate the  schema
//           // const validation = Joi.validate(req.body , userSchema);

//       // }
//       // // if have any error it must go to catch 
//       // catch(err){
//       //   res.status(400).send(err);
//       // }
//}
