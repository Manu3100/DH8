const db = require('./database/models');

db.venta.findAll()
.then((resultados) => {console.log(resultados) })