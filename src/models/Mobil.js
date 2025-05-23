const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Mobil = sequelize.define('Mobil', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nomor_mobil: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.ENUM('active', 'maintenance'),
            defaultValue: 'active'
        }
    }, {
        tableName: 'mobil',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });

    Mobil.associate = (models) => {
        Mobil.hasMany(models.Device, {
            foreignKey: 'mobil_id',
            as: 'devices'
        });
        
        Mobil.hasMany(models.DriverMobilSession, {
            foreignKey: 'mobil_id',
            as: 'sessions'
        });
    };

    return Mobil;
};
