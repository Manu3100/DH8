function detalleVentaData(sequelize, DataTypes){

    let a = 'detalle_venta';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        fecha:{type: DataTypes.STRING},
        monto_total:{type: DataTypes.DECIMAL}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const detalleVenta = sequelize.define(a,c,cg)
    
    detalleVenta.associate = function(models) {
        
        detalleVenta.hasMany(models.venta,{
            as: 'detalleVenta',
            foreignKey: "detalle_venta_id"
        });
    }
    return detalleVenta;
    }
    
    
    module.exports = detalleVentaData;