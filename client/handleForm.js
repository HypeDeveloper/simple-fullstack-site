const getForm = document.getElementById('formSignUp')
const getFormIn = document.getElementById('formSignIn')
const bttnSignUp = document.getElementById('bttnSignUp')

const baseUrl  = 'https://restate-pink.vercel.app/'

if(getForm){
    getForm.addEventListener('submit', (e)=>{
        const data = []
        let sendData = {}
        
        e.preventDefault()
        for (let i = 0; i < 4; i++) {
            const element = e.target[i];
            data.push(element.value)
        }
    
        if(data[1] != data[2]){
            alert('password does not match')
            return
        }else{
            fetch(baseUrl+"api/user/addUser", {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username : data[0],
                    password : data[1],
                    email : data[3],
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    alert(data.message)
                    if(data.status == 201){
                        location.href = './signin.html'
                    }
                })
        }
    })
}
else{
    getFormIn.addEventListener('submit', (e)=>{
        const data = []
        let sendData = {}
        
        e.preventDefault()
        for (let i = 0; i < 2; i++) {
            const element = e.target[i];
            data.push(element.value)
        }
    
        
        fetch(baseUrl+"api/user/logUser", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email : data[0],
                password : data[1],
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert(data.message)
                if(data.status == 200){
                    localStorage.setItem('user', JSON.stringify(data))
                    location.href = './welcomePage.html'
                }
            })
        
    })
}


