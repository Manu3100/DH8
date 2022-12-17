function ventasData(sequelize, DataTypes){

    let a = 'venta';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        monto_unitario:{type: DataTypes.DECIMAL},
        cantidad:{type: DataTypes.TINYINT},
        usuario_id:{type: DataTypes.TINYINT},
        detalle_venta_id:{type: DataTypes.TINYINT},
        producto_id:{type: DataTypes.TINYINT}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const venta = sequelize.define(a,c,cg)

    venta.associate = function(models) {
        
        venta.belongsTo(models.usuario,{
            as: 'ventaUsuario',
            foreignKey: 'usuario_id'
        });

        venta.belongsTo(models.producto,{
            as: 'ventaProducto',
            foreignKey: 'producto_id'
        });

        venta.belongsTo(models.detalle_venta,{
            as: 'ventaDetalle',
            foreignKey: 'detalle_venta_id'
        });
    }
    return venta;
}
    
    module.exports =  ventasData;