const express=require("express");
const mongoose= require("mongoose");
const app=express()
const cors=require("cors")
const multer=require("multer")
const dotenv=require("dotenv")
const path=require("path")
const cookieParser=require("cookie-parser")
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')



dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"https://cricbazz.netlify.app",credentials:true}))
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)



const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")
    } catch (error) {
        console.log(error)
    }
}
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


const port=process.env.PORT || 5000

app.listen(port,()=>{
    connectDB()
    console.log("app is running on port" + port)
})