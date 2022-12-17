function categoriasData(sequelize, DataTypes){

let a = 'categoria';

let c = {
    id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
    nombre:{type: DataTypes.STRING}
}

let cg = {camelcase: false, timestamps: false, freezeTableName: true};

const categoria = sequelize.define(a,c,cg)

categoria.associate = function(models) {
    
    categoria.hasMany(models.producto,{
        as: 'categoriaProducto',
        foreignKey: "categoria_id"
    });
}
return categoria;
}

module.exports = categoriasData;