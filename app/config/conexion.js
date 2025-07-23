const mongoose = require('mongoose')
const CONFIG = require('./Configuracion')
const e = require('express')

module.exports={
    conection : null,
    connect : ()=>{
        if(this.conection)return this.conection
        return mongoose.connect(CONFIG.DB)
        .then(conn =>{
            this.conection = conn
            console.log('la conexion se realizo con exito')
        })
        .catch(e => console.log('error en la conexion', e))
    }

}