const collections = require('../config/collections')
const bcrypt = require('bcrypt')
const db = require('../config/connection')
module.exports = {
    register:({fullname,email,password}) => {
        return new Promise(async (resolve,reject)=>{
            //check whether the email exists
            let existing = await db.get().collection(collections.USERS).findOne({email})
            if(existing) {
                reject({code:1,message:"User already exists"})
            }else{
                // hash the password
            let hashPassword = await bcrypt.hash(password,10)
            // create the user
            try{
                await db.get().collection(collections.USERS).insertOne({fullname,email,hashPassword})
                let user = await db.get().collection(collections.USERS).findOne({email})
                resolve(user)
            }catch(err){
                reject({code:2,message:err})
            }
            }
            
        })
    },
    login:({email,password}) => {
        return new Promise(async (resolve,reject)=>{
            //check whether the user exists
            let existing = await db.get().collection(collections.USERS).findOne({email})
            if(existing){
                //check password
                let isMatching = await bcrypt.compare(password,existing.hashPassword)
                if(isMatching){
                    resolve(existing)
                }else{
                    reject({code:4,message:"Password is incorrect."})
                }
            }else{
                reject({code:3,message:"User does not exist."})
            }
        })
    }
}