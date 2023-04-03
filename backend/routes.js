const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const User = require('./model/model')

const router = express.Router()


const getUsers = expressAsyncHandler(async(req, res)=>{
    const users = await User.find()
    res.status(200).json({
        message: 'Found list',
        status: res.statusCode,
        names: users
    })
})


const logUser = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {password, email} = req.body

    // validate Response
    if(!password || !email){
        console.log("no info given");
        res.status(400).json({
            message: 'error: No info Given',
            status: res.statusCode,
        })
    }

    const getEmail = await User.findOne({email})
    if(getEmail){
        if(getEmail.password == password){
            res.status(200).json({
                id: getEmail._id,
                name: getEmail.username,
                email: getEmail.email,
                message: 'Login Successfull',
                status: res.statusCode,
            })
        }
        else{
            res.status(400).json({
                message: 'wrong password',
                status: res.statusCode,
            })
        }
    }
    else{
        res.status(400).json({
            message: 'email not found',
            status: res.statusCode,
        })
    }

})

const addUserInfo = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {username, password, email} = req.body

    // validate Response
    if(!username|| !password|| !email){
        console.log("no info given");
        res.status(400).json({
            message: 'error: No info Given',
            status: res.statusCode,
        })
        return
    }

    // check for dup email or user 
    const getEmail = await User.findOne({email})
    const getUsername = await User.findOne({username})
    if(getEmail){
        res.status(400).json({
            message: 'error: email is already in use',
            status: res.statusCode,
        })
        return
    }
    if(getUsername){
        res.status(400).json({
            status: res.statusCode,
            message: 'error: username is already in use'
        })
        return
    }

    const newUser = await User.create({
        username,
        email,
        password,
    })

    if(newUser){
        res.status(201).json({
            id: newUser._id,
            user: newUser.username,
            email: newUser.email,
            message: 'User Created',
            status: res.statusCode,
        })
    }
})


// const updateUser = expressAsyncHandler(async(req, res)=>{
//     // Get the request form the header
//     const {id, newName} = req.body

//     // validate Response
//     if(id == '' || newName == ''){
//         console.log("no id or name given");
//         res.status(400).json({
//             message: 'error: No id or name Given'
//         })
//     }

//     const NoiseMake = await User.findByIdAndUpdate(id, {name: newName})
//     if(NoiseMake){
//         res.status(200).json({
//             UpdateID: NoiseMake._id,
//             message: 'noise maker updated'
//         })
//     }
//     else{
//         res.status(400).json({
//             message: 'err: id not found'
//         })
//     }
// })
const delUser = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {id} = req.body

    // validate Response
    if(id == ''){
        console.log("no id given");
        res.status(400).json({
            status: res.statusCode,
            message: 'error: No id Given'
        })
    }

    const user = await User.findByIdAndDelete(id)
    if(user){
        res.status(200).json({
            UpdateID: user._id,
            status: res.statusCode,
            message: 'User deleted'
        })
    }
    else{
        res.status(400).json({
            status: res.statusCode,
            message: 'err: id not found'
        })
    }
})

router.get('/user/', getUsers)
router.post('/user/addUser', addUserInfo)
router.post('/user/logUser', logUser)
router.delete('/user/delUser', delUser)

module.exports = router