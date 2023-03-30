const bttnSubmit = document.getElementById('subButton')
const createName = document.getElementById('nameCreate')
const userList = document.getElementById('userList')

bttnSubmit.addEventListener('click', (e)=>{
    e.preventDefault()
    // check for blank name error
    if(createName.value != ''){
        // run Update Ui
        UpdateUi(createName.value)
    }
    else{
        alert('Name Can Not Be Blank')
        createName.focus()
    }

    // Reset the Input
    createName.value = ''
})


function UpdateUi(name){
    // Ceate the nodes [the html elements]
    const parent = document.createElement('li')
    const text = document.createElement('h2')
    const actionGroup = document.createElement('div')
    const updateButton = document.createElement('button')
    const delButton = document.createElement('button')

    // styles
    delButton.classList.add('warning')
    actionGroup.classList.add('actions')

    // bttnInfo
    updateButton.innerText = 'Update Name'
    delButton.innerText = 'Delete Name'

    // button Actions
    delButton.onclick = (e)=>{
        // Hiding the name when del is clicked
        parent.style.display = 'none'
    }
    updateButton.onclick = (e)=>{
        // Using the prompt function  to get the new name
        const newName = prompt('Add a new Name')
        text.innerText = newName
    }

    // update name
    text.textContent = name

    userList.appendChild(parent)
    parent.appendChild(text)
    parent.appendChild(actionGroup)
    actionGroup.append(updateButton)
    actionGroup.append(delButton)
}