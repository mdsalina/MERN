const {response}=require('express');
const {validationResult}=require('express-validator');

const validarCampos = (req, res=response, next) => {
    const { validationResult } = require('express-validator');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    next(); //Si no hay errores, se ejecuta el siguiente middleware
}

module.exports = {
    validarCampos
}