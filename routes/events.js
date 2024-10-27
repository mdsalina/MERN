/* 
    Rutas de eventos / events
    host + /api/events
*/

const {Router} = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos,crearEvento,actualizarEvento,eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
// todas tienen que pasar por la validacion del JWT

router.use(validarJWT); //todas las rutas tienen que pasar por la validacion del JWT

//obtener eventos
router.get('/',getEventos); //router.get('/', validarJWT,getEventos); esta es otra forma de hacerlo

//crear un nuevo evento
router.post('/',
    [check('title','El titulo es obligatorio').not().isEmpty(), 
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos],
    crearEvento);

//actualizar evento
router.put('/:id',actualizarEvento);

//borrar evento
router.delete('/:id',eliminarEvento);

module.exports = router; //Exportar el router para que pueda ser utilizado en otro archivo