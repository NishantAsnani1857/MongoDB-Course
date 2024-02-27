const { Decimal128 } = require('mongodb')
const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    description: {
        type:String,
        require:true
    },
    price: {
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    }
})



const data=mongoose.model('data',productSchema)

module.exports=data