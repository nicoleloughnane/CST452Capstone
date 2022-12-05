const {User} = require('../models/user');
const express = require('express');
const router = express.Router();
//user authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

//REGISTER a new user
router.post('/register', async(req, res) => {
    let encryptedPassword = await bcrypt.hashSync(req.body.password);
     let user = new User({
          email: req.body.email,
          password: encryptedPassword,
          firstName: req.body.firstName,
          lastName: req.body.lastName
        
     })
 
     user = await user.save();
 
     if(!user) {
         return res.status(400).send('the user cannot be created')
     }
     res.send(user);
 
 })



 //LOGIN an existing user
 router.post(`/login`, async (req, res) => {
    const user = await User.findOne({
        email: req.body.email
    })
    const secret = process.env.TOKEN_KEY;
    //email incorrect
    /* if(!user) {
        return res.status(400).send('The user was not found');
    } */
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign( 
            {
                userId: user.id
            },
            secret,
            {expiresIn: '1w'}
        )
        //success: authenticated user here
        res.status(200).send({user: user.email, token: token});
     } else {
        //email or password incorrect
        res.status(400).send('email or password incorrect');
     }
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

