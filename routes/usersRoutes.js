/*const express = require('express');
const router= express.Router();
const usersModel=require('../models/UsersModels.js')

router.post('/register',
async(req, res)=>{
    try{
        const users=
                await usersModel.create(req.body)
            res.
            status(201).
            json({
                success:true,
                data:users
            })
    }catch(err){
        res.
        status(400).
        json({
            success:false,
            message:err.message
        })
    }
    */
