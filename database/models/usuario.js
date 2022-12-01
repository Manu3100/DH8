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

const usuarios = sequelize.define(a,c,cg)

usuarios.associate = function(models) {
    usuarios.hasMany(models.turno,{
        as: 'usuarioTurno',
        foreignKey: 'usuario_id'
    })
}
return usuarios;
}

module.exports = usuariosData;