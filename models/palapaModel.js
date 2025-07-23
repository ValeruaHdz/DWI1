const mongoose = require('mongoose')
const palapaSchema = mongoose.Schema({
    nombre:{
        type:String,
        required: true
    },
    descripcion:{
        type:String,
        required: true
    },
    precio:{
        type:Number,
        required: true
    },
    capacidad:{
        type:Number,
        required: true
    },
    existencia:{
        type:Number,
        required: true,
        default: 10
    }
})

const palapaModel = mongoose.model('bebidas',palapaSchema)

module.exports= palapaModel;