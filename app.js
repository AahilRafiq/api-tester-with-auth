/* node modules setup */ 
import express from 'express'
import axios from 'axios'

const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.render('main.ejs')
})

app.post('/endpoint',express.urlencoded({extended:true}),(req,res)=>{
    console.log(req.body);
})  

/* SERVER */ 
app.listen(port,()=>{
    console.log("Server started !");
})