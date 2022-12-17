function usuariosData(sequelize, DataTypes){

let a = 'usuario';

let c = {
    id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
    nombre:{type: DataTypes.STRING},
    apellido:{type: DataTypes.STRING},
    email:{type: DataTypes.STRING},
    clave:{type: DataTypes.STRING},
    imagen:{type: DataTypes.STRING},
    admin:{type: DataTypes.BOOLEAN},
    local_id:{type: DataTypes.TINYINT}
}

let cg = {camelcase: false, timestamps: false, freezeTableName: true};

const usuario = sequelize.define(a,c,cg)

usuario.associate = function(models) {
    
    usuario.hasMany(models.turno,{
        as: 'usuarioTurno',
        foreignKey: 'usuario_id'
    });
  
    usuario.hasMany(models.venta,{
        as: 'usuarioVenta',
        foreignKey: 'usuario_id'
    });

    usuario.hasMany(models.producto,{
        as: 'usuarioProducto',
        foreignKey: 'admin_id'
    });

    usuario.belongsTo(models.local,{
        as: 'usuarioLocal',
        foreignKey: 'local_id'
    })

}
return usuario;
}

module.exports = usuariosData;