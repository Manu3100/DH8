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
    
    const producto = sequelize.define(a,c,cg)

    producto.associate = function(models) {
        
        producto.hasMany(models.venta,{
            as: 'productoVenta',
            foreignKey: "producto_id"
        });

        producto.belongsTo(models.usuario,{
            as: 'productoUsuario',
            foreignKey: "admin_id"
        });

        producto.belongsTo(models.categoria,{
            as: 'productoCategoria',
            foreignKey: "categoria_id"
        });
    }
    return producto;
    }
    
    module.exports = productosData;