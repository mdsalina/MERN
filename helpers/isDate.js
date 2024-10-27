const moment = require('moment'); //Importar la libreria moment 
const isDate = (value) => {
  if (!value) {
    return false;
  }

  const fecha = moment(value);
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = {isDate}; //Exportar la funcion para que pueda ser utilizada en otro archivo