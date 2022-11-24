function productosData(sequelize, DataTypes){

    let a = 'producto';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        nombre:{type: DataTypes.STRING},
        precio:{type: DataTypes.DECIMAL},
        fecha_creacion:{type: DataTypes.DATE},
        fecha_baja:{type: DataTypes.DATE, allowNull: true},
        imagen:{type: DataTypes.STRING},
        admin_id:{type: DataTypes.TINYINT},
        categoria_id:{type: DataTypes.TINYINT}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const productos = sequelize.define(a,c,cg)
    
    return productos;
    }
    
    module.exports = productosData;