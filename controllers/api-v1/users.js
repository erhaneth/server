const router = require('express').Router();
const db = require('../../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// post /users/register  - register a new user
router.post('/register', async (req, res) => {
    try {
        //check if user exist in the db
        const findUser = await db.User.findOne({
            email: req.body.email
        })

        //disallow users registering twice
        if(findUser) {
            return res.status(404).json({
                message:"user already exist!"})
        }
        //hash the user's password
        const password = req.body.password;
        const salt = 12;
        const hashedPassword = await bcrypt.hash(password,salt)

        //create new user with hashed password 
        const newUser = new db.User({
            name : req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await newUser.save()

        //sign the user in by sending a valid jwt token back
        //create payload
        const payload = {
            name: newUser.name,
            email: newUser.email,
            id: newUser.id
        }

        //sign a tokn token that will send back and encode token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'} )
        res.json( {token})

    } catch (err) {
        console.log(err);
        //validation error
        if(err.message === "ValidationError"){
            res.status(400).json({msg: err.message})
        } else {

            res.status(500).json({ message: 'Server error 500' });
        }

    }   
});
//post /users/login - login a user -- validate user credentials
router.post('/login', async (req, res) => {
    //all the data coming in on the req.body
     try {
        //try to find user in db
        const foundUser = await db.User.findOne({
            email: req.body.email
        })
        //if the user is not found, return a status of 400 that let user know login failed
        if(!foundUser) {
            return res.status(400).json({
                message:"incorrect email or password!"})
        }
        //check if the entered password matches the hash in the db
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password)

        //if they dont match, return a status of 400 that let user know login failed
         if(!isMatch){
            return res.status(400).json({
                message:"incorrect email or password!"
            })
         }

        //create jwt payload 
        const payload = {
          name: foundUser.name,
          email: foundUser.email,
          id: foundUser.id
        }

        //sign the jwt and send it back
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.json({token})
        //handle errors
    } catch (err) {
        console.log(err);
        
        res.status(500).json({ message: 'Something went wrong' });
    }
});
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZXJoYW4iLCJlbWFpbCI6ImVyZGFsb0BnbWFpbC5jb20iLCJpZCI6IjYzMzFjNjIxNTQxODI3NDVlY2Y4ZDA4YSIsImlhdCI6MTY2NDIwNjM2OSwiZXhwIjoxNjY0MjkyNzY5fQ.oLr1M1H5gMwarRK_80chX-Ju4fIJW8OL8gtD-ewkZD0

// Get /auth-locked - a protected route that requires a valid token
router.get('/auth-locked',authLockedRoute, async (req, res) => {
    try {
        res.send({message: 'welcome to secret auth-locked route'});
    } catch (e) {
        console.log(e);

        res.status(500).json({ message: 'Something went wrong' });
    }
});


module.exports = router;