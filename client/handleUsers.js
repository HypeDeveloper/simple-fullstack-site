const bttnSubmit = document.getElementById('subButton')
const createName = document.getElementById('nameCreate')
const userList = document.getElementById('userList')


// Get all registered user
getUsers()

bttnSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    // check for blank name error
    if(createName.value != ''){
        // run Update Ui
        postUser({name:createName.value})
    }
    else{
        alert('Name Can Not Be Blank')
        createName.focus()
    }

    // Reset the Input
    createName.value = ''
})


function UpdateUi(name, id){
    // Ceate the nodes [the html elements]
    const parent = document.createElement('li')
    const text = document.createElement('h2')
    const actionGroup = document.createElement('div')
    const updateButton = document.createElement('button')
    const delButton = document.createElement('button')

    // parent attb
    parent.id = id
    // styles
    delButton.classList.add('warning')
    actionGroup.classList.add('actions')

    // bttnInfo
    updateButton.innerText = 'Update Name'
    delButton.innerText = 'Delete Name'

    // button Actions
    delButton.onclick = (e)=>{
        delUser({
            id: id
        }, ()=>{
             // Hiding the name when del is clicked
            parent.style.display = 'none'
        })
       
    }
    updateButton.onclick = (e)=>{
        const newName = prompt('Add a new Name')
        putUser({
            id: id,
            newName: newName
        }, ()=>{
            // Using the prompt function  to get the new name
            text.innerText = newName
        })
    }

    // update name
    text.textContent = name

    userList.appendChild(parent)
    parent.appendChild(text)
    parent.appendChild(actionGroup)
    actionGroup.append(updateButton)
    actionGroup.append(delButton)
}

function getUsers(){
    fetch("http://localhost:4044/api/user")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            data.names.forEach(element => {
                UpdateUi(element.name, element._id)
            });
        });
}

function postUser(data){
    fetch("http://localhost:4044/api/user/addUser", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                UpdateUi(data.newNoiseMaker, data.id)
            })
            .catch((error) => {
                console.error("Error:", error);
            });
}

function putUser(data, callback){
    fetch("http://localhost:4044/api/user/updUser", {
            method: "PUT", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                callback()
            })
            .catch((error) => {
                console.error("Error:", error);
            });
}
function delUser(data, callback){
    console.log(data);
    fetch("http://localhost:4044/api/user/delUser", {
            method: "DELETE", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
                callback()
            })
            .catch((error) => {
                console.error("Error:", error);
            });
}