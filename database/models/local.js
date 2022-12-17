function localData(sequelize, DataTypes){

    let a = 'local';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        nombre:{type: DataTypes.STRING}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const local = sequelize.define(a,c,cg)
    
    local.associate = function(models) {
        
        local.belongsToMany(models.servicio,{
            as: 'localServicio',
            through: "local_servicio",
            foreignKey: "local_id",
            otherKey: "servicio_id"
        });
        local.hasMany(models.turno,{
            as: 'localTurno',
            foreignKey: 'local_id'
        });
        local.hasMany(models.usuario,{
            as: 'localUsuario',
            foreignKey: 'local_id'
        });
    }
    return local;
    }
    
    
    module.exports = localData;