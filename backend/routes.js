const express = require('express')
const expressAsyncHandler = require('express-async-handler')
const User = require('./model/model')

const router = express.Router()




const getUsers = expressAsyncHandler(async(req, res)=>{
    res.status(200).json({
        user: 'punk'
    })
})

const addUser = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {name} = req.body

    // validate Response
    if(!name){
        console.log("no name given");
        res.status(400).json({
            message: 'error: No Name Given'
        })
    }

    const NoiseMake = User.create({
        name: name
    })
    if(NoiseMake){
        res.status(200).json({
            newNoiseMaker: NoiseMake.name,
            message: 'added to the db list'
        })
    }
})
const updateUser = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {id, newName} = req.body

    // validate Response
    if(!id || !newName){
        console.log("no id or name given");
        res.status(400).json({
            message: 'error: No id or name Given'
        })
    }

    const NoiseMake = User.findByIdAndUpdate(id, {name: newName})
    if(NoiseMake){
        res.status(200).json({
            UpdateID: NoiseMake._id,
            message: 'noise maker updated'
        })
    }
    else{
        res.status(400).json({
            message: 'err: id not found'
        })
    }
})
const delUser = expressAsyncHandler(async(req, res)=>{
    // Get the request form the header
    const {id} = req.body

    // validate Response
    if(!id){
        console.log("no id given");
        res.status(400).json({
            message: 'error: No id Given'
        })
    }

    const NoiseMake = User.findByIdAndDelete(id)
    if(NoiseMake){
        res.status(200).json({
            UpdateID: NoiseMake._id,
            message: 'noise maker deleted'
        })
    }
    else{
        res.status(400).json({
            message: 'err: id not found'
        })
    }
})

router.get('/user/', getUsers)
router.post('/user/addUser', addUser)
router.put('/user/updUser', updateUser)
router.delete('/user/delUser', delUser)

module.exports = router