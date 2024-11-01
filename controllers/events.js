const { response } = require('express');
const Evento = require('../models/Evento');
const e = require('express');

const getEventos = async(req, res) => {
    
    const eventos = await Evento.find()
                                .populate('user','name'); //traer la informacion del usuario que creo el evento
    res.json({
        ok: true,
        eventos
    });
}

const crearEvento = async(req, res) => {
    //verificar que el body tenga la informacion necesaria
    const evento = new Evento(req.body);
    
    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.json({
            ok: true,
            evento: eventoGuardado});


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const actualizarEvento = async(req, res) => {

    const eventoId = req.params.id; //obtener el id del evento
    const uid = req.uid; //obtener el id del usuario
    try {
        const evento = await Evento.findById(eventoId); //buscar el evento por el id
        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true}); //actualizar el evento
        res.json({
            ok: true,
            evento: eventoActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const eliminarEvento = async(req, res) => {

    const eventoId = req.params.id; //obtener el id del evento
    const uid = req.uid; //obtener el id del usuario

    try {
        const evento = await Evento.findById(eventoId); //buscar el evento por el id
        console.log(evento);
        if(!evento){
            res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id'
            });
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete(eventoId); //actualizar el evento
        res.json({
            ok: true,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }


}  

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
} //Exportar las funciones para que puedan ser utilizadas en otro archivo