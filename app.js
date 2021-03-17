const express=require("express");
const {sequelize,User} =require("./models");


const app=express();
app.use(express.json())


app.post('/users',async (req,res)=>{
    const {name,email,role}=req.body
    
     try {
        const user=await User.create({name,email,role})
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    } 
})

app.get("/users",async (req,res)=>{
    try {
        const users=await User.findAll()

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})

app.get("/users/:uuid",async (req,res)=>{
    const uuid=req.params.uuid;
    try {
        const users=await User.findOne({where:{uuid}})

        return res.json(users)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
})


app.listen({port:5000},async ()=>{
    console.log("serving up on http://localhost:5000")
    await sequelize.authenticate()
    console.log("db connected")
})
    


