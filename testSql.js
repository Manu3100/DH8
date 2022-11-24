const db = require('./database/models');

db.usuario.findAll()
.then((resultados) => {console.log(resultados) })