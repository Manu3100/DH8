function turnosData(sequelize, DataTypes){

    let a = 'turno';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        fecha_solicitud:{type: DataTypes.DATE},
        fecha_turno:{type: DataTypes.DATE},
        fecha_baja:{type: DataTypes.DATE, allowNull: true},
        usuario_id:{type: DataTypes.TINYINT},
        local_id:{type: DataTypes.TINYINT},
        servicio_id:{type: DataTypes.TINYINT}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const turno = sequelize.define(a,c,cg)

    turno.associate = function(models) {
        turno.belongsTo(models.usuario,{
            as: 'turnoUsuario',
            foreignKey: 'usuario_id'
        })
    }
    
    return turno;
    }
    
    module.exports = turnosData;