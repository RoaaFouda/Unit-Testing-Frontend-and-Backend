

const express = require('express');
const cors=require('cors');
var todoRoutes=require('./routes/todo')
var userRoutes=require('./routes/user')
var todosModel=require('./models/todo');
const { connectToDatabase } = require('./db.connection');

require("dotenv").config();



var app = express()

app.use(cors({
    origin:'*',
}))
app.use(express.json())

//handling routes
app.use("/user",userRoutes)
app.use('/todo',todoRoutes)

app.get('/',async function(req,res){
    var todos= await todosModel.find()
    res.status(200).json({todos})
})

module.exports=app
//not found
app.use('*',function(req,res,next){
  res.status(404).json({message:'NOT FOUND'})
})

connectToDatabase().then(() => {
    console.log("connected to DB");
}).catch((err) => {

    console.log(err);
})


var port = 3333
app.listen(port, () => {
    console.log(`server listening successfully on port ${port}`);
})



//cors

//www.example.com             ex.www.example.com