/* node modules setup */ 
import express, { response } from 'express'
import axios from 'axios'

const app = express()
const port = 3000
app.use(express.static('public'))

// Home page render
app.get('/',(req,res)=>{
    res.render('main.ejs' , { apiResponse : "Make a request" })
})

app.post('/endpoint',express.urlencoded({extended:true}),(req,res)=>{

    // Organizing the data from the formData
    const endpoint = req.body.apireq_endpoint
    const reqType = req.body.apireq_type
    const paramKeys = req.body.paramKey
    const paramValues = req.body.paramValue
    const authType = req.body.authType
    const authInput1 = req.body.authInput1
    const authInput2 = req.body.authInput2
    const apiKeyAuthType = req.body.apikeyAuthtype
    const headerKeys = req.body.headerKey
    const headerValues = req.body.headerValue
    const axiosReqBody = req.body.axiosReqBody

    // 1.Setup the config file
    let axiosConfig;
    axiosConfig = {
        url:endpoint,
        method:reqType
    }

    // 2.Setup Parameters
    if(Array.isArray(paramKeys)){
        let parameters = {}; //Create an object first to contain all parameters
        for(let i=0;i<paramKeys.length;i++){
            parameters[paramKeys[i]] = paramValues[i]
        }
        axiosConfig.params = parameters
        console.log(axiosConfig);

    }else{
        axiosConfig.params = {} //We need to define it as an object inorder push key-value pairs into it
        axiosConfig.params[paramKeys] = paramValues
    }
    // Add authentication if required
    if(apiKeyAuthType=='addToQueryParams'){
        axiosConfig.params[authInput1] = authInput2
    }
    console.log(axiosConfig);
})  

/* SERVER */ 
app.listen(port,()=>{
    console.log("Server started !");
})