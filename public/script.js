
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


// 3.Auth section controller

// This function will be called when the user selects an option from the auth select list.
function authSelected() {
    // Get the value of the selected option.
    var selectedValue = document.getElementById('authTypeSelector').value;
  
    // Do something with the selected value.
    if (selectedValue === 'none') {

        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "hidden";
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "hidden";
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";

    } else if (selectedValue === 'basic') {

        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","username")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "visible";
        element2.setAttribute("placeholder","password")
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";
        
    } else if (selectedValue === 'apikey') {
        
        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","Key")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "visible";
        element2.setAttribute("placeholder","Value")
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "visible";

    } else if (selectedValue === 'bearer') {
        var element1 = document.getElementById("authInput1");
        element1.style.visibility = "visible";
        element1.setAttribute("placeholder","Bearer Token")
        var element2 = document.getElementById("authInput2");
        element2.style.visibility = "hidden";
        var element3 = document.getElementById('apikeyAuthType');
        element3.style.visibility = "hidden";
    }
  }
  
  // Add an event listener to the auth select list.
  document.getElementById('authTypeSelector').addEventListener("change", authSelected);