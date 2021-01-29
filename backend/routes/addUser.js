const router = require('express').Router();
const AddUser = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
// retreve all the data from mongo db
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
  const image= req.body.image;
//every thing is readdy here we send the data to the server
const newUser = new AddUser({username:username,password:hashedPassword, phone: phone, address:address, image:image});
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
    ///loggingggg innnn
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
     //console.log(res.header)
       });
//GET users by ID  becouse i want to delete and update this user / we will use find by id method and how ? by get the id by (req.params.id)
router.route("/:id").get((req, res) => {
  AddUser.findById(req.params.id)
  .then(users => res.json(users))
  .catch(err => res.status(400).json("Error: " + err));
});
//DELETE user by ID
router.route("/:id").delete((req, res) => {
  AddUser.findByIdAndDelete(req.params.id)
  .then(() => res.json('User is deleted!'))
  .catch(err => res.status(400).json("Error: " + err));
})
//UPDATE user by ID
router.route("/update/:id", ).put((req, res) => {
  AddUser.findById(req.params.id)
  .then(users => {
  
    users.phone = req.body.phone;
    users.address= req.body.address;
    users.image= req.body.image;
    users.save()
    .then(() => res.json("Users is updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
  })
    .catch(err => res.status(400).json('Error: ' + err));
})
    module.exports= router;