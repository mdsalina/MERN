const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario=async(req, res=response) => {

    const {email,password}=req.body;
    try {
        let usuario = await Usuario.findOne({email}); //busca un usuario con el email que se pasa por parametro si no lo encuetra devuelve null
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        
        usuario = new Usuario(req.body);


        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password=bcrypt.hashSync(password,salt);

        await usuario.save(); //guarda el usuario en la base de datos
        //Generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }


}

const loginUsuario=async(req, res=response) => {
    
    const {email,password}=req.body;

    try {
        const usuario = await Usuario.findOne({email}); //busca un usuario con el email que se pasa por parametro si no lo encuetra devuelve null
        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no existe con ese email'
            });
        }

        //Confirmar los passwords
        const validPassword = bcrypt.compareSync(password,usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id,usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const revalidarToken=async(req, res=response) => {
    const {uid,name}=req;


    //Generar un nuevo JWT y retornarlo en la respuesta
    const token = await generarJWT(uid,name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}