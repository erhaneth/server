const jwt = require('jsonwebtoken')
const db = require('../../models')

const autLockedRoute = async (req, res, next) =>{
 try {
    //jwt from the client sent in the headers
    const authHeader = req.headers.authorization
    //decode the jwt -- will throw  if signature is invalid
    const decode = jwt.verify(authHeader, process.env.JWT_SECRET)
    //find user in the db sent the jwt
    const foundUser = await db.User.findById(decode.id)

    //mpunt the user on the res.locals, so the downstream route has the logged user in
    res.locals.user = foundUser
    next()
 } catch (error) {
    //when there is an authenctication error
    console.warn(error);
    res.status(401).json({msg:"User auth failed😖"})
 }
}

module.exports = autLockedRoute