//required packages
require('dotenv').config();
//connect to mongo db
require('./models');
const express = require('express');
const cors = require('cors');

//app config/middleware
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json()); //allows us to parse json

// app.use ((req,res,next)=>{
//     console.log("I am from the middleware");
//     res.locals.myData = "I am data that passed out from middleware"
//     // console.log(res.locals.myData);
//     //tell express to next thing
//     next()
// })
const middleware = (req,res,next)=>{
    console.log("I am from the middleware");
    res.locals.myData = "I am data that passed out from middleware"
    console.log(res.locals.myData);
    //tell express to next thing
    next()
}

//routes and controllers
//route specific middleware
app.get('/',middleware, (req, res) => {
    res.send({message: 'Hello from the server!🦄'});
});

// api routes -- middleware between app.get and app.use 
app.use('/api/v1/users', require('./controllers/api-v1/users'));
// listen on port
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} 🎧`);
}   );