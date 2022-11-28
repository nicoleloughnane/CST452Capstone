const {User} = require('../models/user');
const express = require('express');
const router = express.Router();


//get all users
router.get(`/`, async (req, res) =>{
    const userList = await User.find();
    if(!userList) {
         res.status(500).json({success: false})
    }
     res.send(userList);
});

//get all users
router.get(`/:id`, async (req, res) =>{
     const user = await User.findById(req.params.id);
     if(!user) {
          res.status(500).json({message: 'User with the given ID not found'})
     }
      res.status(200).send(user);
 });

//post a new user
router.post('/', async(req, res) => {
     let user = new User({
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        
     })
 
     user = await user.save();
 
     if(!user) {
         return res.status(400).send('the user cannot be created')
     }
     res.send(user);
 
 })

 //UPDATE/PUT existing user
 router.put('/:id', async (req, res) => {
     const user = await User.findByIdAndUpdate(
         req.params.id, {
          email: req.body.email,
          password: req.body.password,
          firstName: req.body.firstName,
          lastName: req.body.lastName
         },
         {new: true}
     )
     if(!user) {
         return res.status(400).send('the user cannot be updated')
     }
     res.send(user);
 })

 //DELETE by ID
router.delete('/:id', (req, res)=> {
     User.findByIdAndRemove(req.params.id).then(user => {
         if(user) {
             return res.status(200).json({success: true, message: 'the user has been deleted'})
         } else {
             return res.status(404).json({success: false, message: "user not found"})
         }
     }).catch(err=> {
         return res.status(400).json({success: false, error: err})
     })
 }) 

 module.exports=router;

