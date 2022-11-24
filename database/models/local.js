function localData(sequelize, DataTypes){

    let a = 'local';
    
    let c = {
        id:{type: DataTypes.TINYINT, primaryKey: true, autoincrement: true},
        nombre:{type: DataTypes.STRING}
    }
    
    let cg = {camelcase: false, timestamps: false, freezeTableName: true};
    
    const local = sequelize.define(a,c,cg)
    
    return local;
    }
    
    module.exports = localData;