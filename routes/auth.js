var express = require('express');
var router = express.Router();
const authHelper = require('../helpers/authHelper')
router.get('/signup',(req,res)=>{
    res.render('auth/signup')
})

router.post('/signup',(req,res)=>{
    try{
        let {fullname,password,email} = req.body
        authHelper.register({fullname,password,email}).then(() => {
            res.json({status:"ok"})
        }).catch(err => {
            if(err.code && err.code == 1){
                res.status(400).json({status:"error",message:err.message})
            }else{

                res.status(400).json({status:"error",message:"Something went wrong.Try Again."})
            }
        })
        
    }catch(err){
        res.status(400).json({status:"error",message:"Something went wrong.Try Again."})
    }
})

module.exports = router;