const router = require('express').Router();
const AddItems = require('../models/addItems.model');
// const User = require('../models/user.model');
const verifyToken = require('./verifyToken')
// const { requireAuth } = require('./verifyToken')
//AddItems is the schema
//CRUD Operations:
// 
//GET all items
router.route('/').get( (req, res) => {
  AddItems.find() 
  .then(items => res.json(items))
  .catch(err => res.status(400).json('Error: ' + err));
  
});

//POST(CREATE) new item
router.route('/add').post(verifyToken,(req, res) => {
  const userName = req.body.userName;
  const itemName = req.body.itemName;
  const category = req.body.category;
  const description = req.body.description;
  const image=req.body.image;
  const type = req.body.type;

  const newItem = new AddItems ({
    userName,
    itemName,
    category,
    description,
    image,
    type
  });
  
  newItem.save()
  .then(() => res.json("Item Added!"))
  .catch(err => res.status(400).json("Error: " + err));
});

//GET item by ID
router.route("/:id").get(verifyToken,(req, res) => {
  AddItems.findById(req.params.id)
  .then(items => res.json(items))
  .catch(err => res.status(400).json("Error: " + err));
});

//DELETE item by ID
router.route("/:id").delete(verifyToken,(req, res) => {
  AddItems.findByIdAndDelete(req.params.id)
  .then(() => res.json('Item is deleted!'))
  .catch(err => res.status(400).json("Error: " + err));
});

//UPDATE item by ID
router.route("/update/:id").post(verifyToken,(req, res) => {
  AddItems.findById(req.params.id)
  .then(items => {
    items.itemName = req.body.itemName;
    items.category = req.body.category;
    items.description = req.body.description;
    items.type = req.body.type;
    items.image = req.body.image;
    items.save()
    .then(() => res.json("Item is updated!"))
    .catch(err => res.status(400).json('Error: ' + err));
  })
    .catch(err => res.status(400).json('Error: ' + err));
})


module.exports = router;