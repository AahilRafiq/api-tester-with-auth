

// 1. Add new Parameter key pair value
const addParamBtn = document.getElementById('addParamBtn')
addParamBtn.addEventListener('click',()=>{
    const divCopy = document.getElementById('firstParam').cloneNode(true);
    document.getElementById('newParamsContainer').appendChild(divCopy);
})