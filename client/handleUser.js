const getUser = JSON.parse(localStorage.getItem('user'))

if(getUser){
    console.log(getUser);
    document.getElementsByClassName('info')[0].innerText = getUser.name
    document.getElementsByClassName('info')[1].innerText = getUser.email
}else{
    location.href = './signin.html'
}


const logOutBttn = document.getElementById('logoutbttn')
logOutBttn.addEventListener('click', (e)=>{
    localStorage.removeItem('user')
    location.href = './signin.html'
})