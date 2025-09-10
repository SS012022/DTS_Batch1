import express from 'express'
import multer from 'multer'
import path from 'path'
const app=express()

const staticpath=path.join(process.cwd(),'public');
app.use(express.static(staticpath))

app.use(express.urlencoded({extended:false}))
app.set('view engine', 'ejs')
app.get("/",(req,res)=>{
    res.send("Ready for upload - downlaod")
})
app.get("/api",(req,res)=>{
    res.render("a")
})
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        return cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})
const upload=multer({storage})

app.post("/upload",upload.single('image'),(req,res)=>{
    return res.redirect("/api")
})

app.get("/download/:file",(req,res)=>{
    var file=req.params.file;
    var fileLocation=path.join("./uploads",file);
    res.download(fileLocation,file)
})
app.listen(8080,()=>{
    console.log("connected")
})


// for performance check