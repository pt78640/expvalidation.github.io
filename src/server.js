const express=require('express');
const connect=require('./config/db');
const userController=require('./controllers/user.controller');
const app=express();
app.use('/user',userController)
app.use(express.json());
const start=async()=>{
    await connect();
    app.listen(3000,()=>{
        console.log("server is live in 3000")
    })
}
module.exports=start;