const router = require('express').Router();
const AddItems = require('../models/addItems.model');
// const User = require('../models/user.model');
const verfiy = require('./verifyToken')
const { requireAuth } = require('./verifyToken')
//AddItems is the schema
//CRUD Operations:   (create -read-update-delete)
// 
//GET all items   retreva all the data and the schema structure from the mongoo db by .find method 
router.route('/').get( (req, res) => {
  AddItems.find() 
  .then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
  
});

//POST(CREATE) new item
// in side the post request i will create items and i get the data from request.body --> . the name of the attribute in the schema 
router.route('/add').post((req, res) => {
  const userName = req.body.userName;
  const itemName = req.body.itemName;
  const category = req.body.category;
  const type = req.body.type;
  const description = req.body.description;
  const image=req.body.image; 
 console.log(image+"wooow")


  const newItem = new AddItems ({
    userName,
    itemName,
    category,
    type,
    description,
    image,
  
  });
    // saving the new item in the data base by .save method 
  newItem.save()
  .then(() => res.json("Item Added!"))
  .catch(err => res.status(400).json("Error: " + err));
});

//GET item by ID  becouse i want to delete and update this items  /we will use find by id method and how ? by get the id by (req.params.id)
router.route("/:id").get((req, res) => {
  AddItems.findById(req.params.id)
  .then(items => res.json(items))
  .catch(err => res.status(400).json("Error: " + err));
});

//DELETE item by ID
router.route("/:id").delete((req, res) => {
  AddItems.findByIdAndDelete(req.params.id)
  .then(() => res.json('Item is deleted!'))
  .catch(err => res.status(400).json("Error: " + err));
});

//UPDATE item by ID
router.route("/update/:id", ).post((req, res) => {
  AddItems.findById(req.params.id)
  .then(items => {
    items.itemName = req.body.itemName;
    items.category = req.body.category;
    items.type = req.body.type;
    items.description = req.body.description;
    items.image = req.body.image;
    items.save()
    .then(() => res.json("Item is updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
  })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;

