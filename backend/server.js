const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;


const exerciseRouter = require('./routes/exercises')
const userRouter = require('./routes/users') 
const mongoose = require('mongoose');

require('dotenv').config();
 

const uri = process.env.ATLAS_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {

//     console.log('MongoDB database connection establisted successfully')
//     const collection = client.db("test").collection("users");

//     app.use('/exercises', exerciseRouter)
//     app.use('/users', userRouter)
//     // // perform actions on the collection object
//     client.close();
// });
mongoose 
 .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   }) 
        
        

 const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDB database connection establisted successfully')
})
//  .then(() => console.log("Database connected!"))
//  .catch(err => console.log(err));


const app = express();
const port = process.eventNames.PORT || 5000;

app.use(cors());
app.use(express.json());

    app.use('/exercises', exerciseRouter)
    app.use('/users', userRouter)

app.listen(port, () => {
    console.log(`server is running on port:${port}`)
})