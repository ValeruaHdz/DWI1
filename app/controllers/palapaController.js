const palapaModel = require('../models/palapaModel')

function BuscarTodo(req,res) {
    palapaModel.find({})
    .then(bebidas =>{
        if(bebidas.length){
            return res.status(200).send({bebidas})
        }
        return res.status(204).send({mensaje:"No hay nada que mostrar"})
    })
    .catch(e =>{return res.status(404).send({mensaje:`error al solicitar la informacion ${e}`})})
}

function agregar(req,res){
    //console.log(req.body)
    new palapaModel(req.body).save()
    .then(info => {
        return res.status(200).send({
            mensaje:"La informacion se guardo con exito", 
            info
        })
    })
    .catch(e => {
        return res.status(404).send({
            mensaje:`Error al guardar la informacion ${e}`
        })
    })
}


function buscarBebida(req, res, next){
    let consulta = {}
    consulta[req.params.key] = req.params.value
    console.log(consulta)
    palapaModel.find(consulta)
    .then(bebidas => {
        if(!bebidas.length)return next()
            req.body.bebidas = bebidas
            return next()
    })
    .catch(e => {
        req.body.e = e
        return next()
    })
}

function mostrarBebida(req, res) {
    if (req.body.e)
        return res.status(404).send({ mensaje: `Error al buscar la bebida` });

    if (!req.body.bebidas)
        return res.status(204).send({ mensaje: "No hay información que mostrar" });

    const bebidas = req.body.bebidas; 

    return res.status(200).send({ bebidas });
}


function eliminarBebida(req, res) {
    const bebidas = req.body.bebidas
    if (!bebidas || !bebidas.length) {
        return res.status(404).send({ mensaje: "No se encontró la bebida a eliminar" })
    }

    palapaModel.deleteOne({ _id: bebidas[0]._id })
    .then(() => {
        return res.status(200).send({ mensaje: "Bebida Eliminada" })
    })
    .catch(e => {
        return res.status(404).send({ mensaje: "Error al eliminar la bebida", e })
    })
}

function actualizarBebida(req, res) {
    if (req.body.e) {
        return res.status(404).send({ mensaje: "Error al buscar la bebida", error: req.body.e });
    }

    const bebidas = req.body.bebidas;
    if (!bebidas || !bebidas.length) {
        return res.status(404).send({ mensaje: "No se encontró la bebida a actualizar" });
    }

    // Construir la misma consulta que se usó en buscarBebida
    const consulta = {};
    consulta[req.params.key] = req.params.value;

    // Los nuevos datos están en req.body, pero eliminamos "bebidas" para no actualizar eso
    const nuevosDatos = { ...req.body };
    delete nuevosDatos.bebidas;

    palapaModel.updateOne(consulta, nuevosDatos)
        .then(() => {
            return res.status(200).send({ mensaje: "Bebida actualizada correctamente" });
        })
        .catch(e => {
            return res.status(500).send({ mensaje: "Error al actualizar la bebida", error: e });
        });
}


module.exports = {
    BuscarTodo,
    agregar,
    buscarBebida,
    mostrarBebida,
    eliminarBebida,
    actualizarBebida
}