
// 1. Add new Parameter key pair value
const addParamBtn = document.getElementById('addParamBtn')
addParamBtn.addEventListener('click',()=>{
    const divCopy = document.getElementById('firstParam').cloneNode(true);
    document.getElementById('newParamsContainer').appendChild(divCopy);
})

// 2. Add new Header key pair value
const addHeaderBtn = document.getElementById('addHeaderBtn')
addHeaderBtn.addEventListener('click',()=>{
    const divCopy = document.getElementById('firstHeader').cloneNode(true);
    document.getElementById('newHeadersContainer').appendChild(divCopy);
})