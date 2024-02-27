const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        require:true
    },
})



const user=mongoose.model('user',userSchema)

module.exports=user