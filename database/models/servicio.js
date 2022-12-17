function serviciosData(sequelize, DataTypes){

    let a = 'servicio';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        nombre:{type: DataTypes.STRING}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const servicio = sequelize.define(a,c,cg)
    
    servicio.associate = function(models) {
        
        servicio.belongsToMany(models.local,{
            as: 'servicioLocal',
            through: "local_servicio",
            foreignKey: "servicio_id",
            otherKey: "local_id"
        });
        servicio.hasMany(models.turno,{
            as: 'servicioTurno',
            foreignKey: 'servicio_id'
        });
    }

    return servicio;
    }
    
    module.exports = serviciosData;