/* node modules setup */ 
import express, { json, response } from 'express'
import axios from 'axios'

const app = express()
const port = 3000
app.use(express.static('public'))
app.set('view engine', 'ejs');

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
    }else{
        axiosConfig.params = {} //We need to define it as an object inorder push key-value pairs into it
        axiosConfig.params[paramKeys] = paramValues
    }
    // Add authentication if required
    if(authType=='apikey' && apiKeyAuthType=='addToQueryParams'){
        axiosConfig.params[authInput1] = authInput2
    }

    //3.Headers
    let headers = {}; //Create an object first to contain all parameters
    if(Array.isArray(headerKeys)){
        for(let i=0;i<headerKeys.length;i++){
            headers[headerKeys[i]] = headerValues[i]
        }
    }else{
        if(headerKeys.length!=0){
            headers[headerKeys] = headerValues
        } 
    }
    if(authType=='apikey' && apiKeyAuthType=='addToHeader'){
        if(authInput1.length!=0){
            headers[authInput1] = authInput2
        }
    }
    //Now add other authentications here
    else if(authType=="basic"){
        const encodedCredentials = btoa(`${authInput1}:${authInput2}`);
        headers.Authorization = `Basic ${encodedCredentials}`
    }else if(authType=="bearer"){
        headers.Authorization = `Bearer ${authInput1}`
    }
    // if headers is empty , just dont add it
    if(Object.entries(headers).length === 0){
        console.log("No headers");
    } 
    else axiosConfig.headers = headers

    //4.Axios reqbody
    if(axiosReqBody.length!=0){
        axiosConfig = JSON.parse(axiosReqBody)
    }
    console.log(axiosConfig);

    // Finally use axios to make request
    axios(axiosConfig)
    .then(response => {
        res.render('main.ejs', { apiResponse : JSON.stringify(response.data,null,2) })
    }).catch(err => {
        res.render('main.ejs', { apiResponse : JSON.stringify(err.message,null,2) })
    })
})  

/* SERVER */ 
app.listen(port,()=>{
    console.log("Server started !");
})


